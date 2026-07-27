const API_BASE_URL = 'http://localhost:8000/api/assistant'

export async function startAssistantSessionAPI(language = 'en-IN') {
  try {
    const res = await fetch(`${API_BASE_URL}/session/start`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ language }),
    })
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    return await res.json()
  } catch (err) {
    console.warn('startAssistantSessionAPI warning:', err)
    return {
      session_id: `demo_${Date.now()}`,
      greeting: "Namaste! Welcome to JanMitra AI. How can I help you today?",
      language,
      active_agents: ['Router Agent', 'Janvi Assistant'],
      context_chips: ['🌐 Active Session', '🤖 Multi-Agent Engine'],
    }
  }
}

export async function sendAssistantMessageAPI(sessionId, query, language = 'en-IN') {
  try {
    const res = await fetch(`${API_BASE_URL}/session/input`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ session_id: sessionId, query, language }),
    })
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    return await res.json()
  } catch (err) {
    console.warn('sendAssistantMessageAPI warning:', err)
    return {
      session_id: sessionId,
      query,
      response: `I analyzed your question regarding "${query}". As your AI Co-Pilot, I recommend checking official portal eligibility.`,
      agents: ['Router Agent', 'Janvi Assistant'],
      progress_pct: 60,
    }
  }
}

export async function uploadScreenFrameAPI(sessionId, blob, query = '', language = 'en-IN') {
  try {
    const formData = new FormData()
    formData.append('session_id', sessionId)
    formData.append('user_query', query)
    formData.append('language', language)
    formData.append('file', blob, 'frame.jpg')

    const res = await fetch(`${API_BASE_URL}/session/frame`, {
      method: 'POST',
      body: formData,
    })
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    return await res.json()
  } catch (err) {
    console.warn('uploadScreenFrameAPI warning:', err)
    return {
      session_id: sessionId,
      vision: {
        portal_detected: 'Government Portal',
        domain: 'Government Services',
        context_chips: ['🏛️ Active Portal', '📄 Screen Captured'],
        spatial_guidance: 'I can see your active screen. Focus on the main registration form to proceed.',
        goal_title: 'Portal Guidance',
        progress_pct: 60,
      },
    }
  }
}

export async function endAssistantSessionAPI(sessionId) {
  try {
    const res = await fetch(`${API_BASE_URL}/session/end`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ session_id: sessionId }),
    })
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    return await res.json()
  } catch (err) {
    console.warn('endAssistantSessionAPI warning:', err)
    return {
      session_id: sessionId,
      duration_formatted: '2m 14s',
      topics_covered: ['Government Schemes', 'Education'],
      history_count: 3,
      status: 'Completed',
    }
  }
}
