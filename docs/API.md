# API Specification - JanMitra AI

## Endpoint: `POST /api/chat`

### Request Body
```json
{
  "message": "My father is a farmer and I need scholarship",
  "session_id": "123",
  "language": "en"
}
```

### Response Body
```json
{
  "response": "Detailed synthesized guidance markdown text...",
  "agents": ["Education", "Agriculture", "Government Schemes"],
  "action_plan": [
    {
      "title": "Apply PM-KISAN",
      "description": "Direct income support of ₹6,000/year",
      "priority": "High"
    }
  ],
  "sources": [
    {
      "name": "PM-KISAN Portal",
      "url": "https://pmkisan.gov.in"
    }
  ]
}
```
