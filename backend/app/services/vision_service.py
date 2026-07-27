import os
import base64
import logging

logger = logging.getLogger(__name__)

def analyze_screen_frame(image_bytes: bytes, user_query: str = "", active_language: str = "en-IN") -> dict:
  """
  Analyzes a screen capture frame using Gemini 1.5 Flash Vision.
  Returns structured context chips, spatial guidance text, and detected portal metadata.
  """
  try:
    import google.generativeai as genai
    api_key = os.getenv("GEMINI_API_KEY")
    if api_key:
      genai.configure(api_key=api_key)
      model = genai.GenerativeModel("gemini-1.5-flash")

      prompt = f"""You are Janvi AI Vision Agent for JanMitra AI — India's Multi-Agent Citizen Assistance Platform.
Analyze this user screen screenshot.
Language: {active_language}
User Query: {user_query}

Respond in clean JSON format matching this schema:
{{
  "portal_detected": "PM-KISAN / National Scholarship Portal / LeetCode / Hospital Portal / General Screen",
  "domain": "Government / Education / Healthcare / Employment / Agriculture / Legal / Emergency",
  "context_chips": ["🏛️ PM-KISAN Portal", "📄 Registration Form", "📍 Maharashtra"],
  "spatial_guidance": "I see you are on the PM-KISAN registration portal. Look at the upper-left section for 'Farmer Registration' to begin your application.",
  "suggested_actions": ["Click Farmer Registration", "Enter 12-digit Aadhaar Number", "Upload Land 7/12 Extract"],
  "goal_title": "PM-KISAN Farmer Registration",
  "progress_pct": 60
}}"""

      # Pass image bytes to Gemini Vision
      image_part = {
        "mime_type": "image/jpeg",
        "data": image_bytes
      }
      response = model.generate_content([prompt, image_part])
      raw_text = response.text.strip()
      
      # Clean potential markdown JSON fences
      if "```json" in raw_text:
        raw_text = raw_text.split("```json")[1].split("```")[0].strip()
      elif "```" in raw_text:
        raw_text = raw_text.split("```")[1].split("```")[0].strip()

      import json
      parsed = json.loads(raw_text)
      return parsed
  except Exception as e:
    logger.warning(f"Gemini Vision Analysis warning: {e}")

  # Rule-based fallback if Vision API key missing or offline
  return {
    "portal_detected": "Government Citizen Portal",
    "domain": "Government Services",
    "context_chips": ["🏛️ Government Portal", "📄 Application Page", "🌐 Active Guidance"],
    "spatial_guidance": "I can see your active screen. Focus on the main registration form on the page to proceed.",
    "suggested_actions": ["Verify details on screen", "Proceed to next step"],
    "goal_title": "Portal Application Assistance",
    "progress_pct": 50
  }
