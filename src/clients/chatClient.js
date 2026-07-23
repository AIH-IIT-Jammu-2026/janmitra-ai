import { apiRequest } from './api'

/**
 * Sends chat message payload matching frozen FastAPI contract
 * @param {string} message User message text
 * @param {string} sessionId Active session ID
 * @param {string} language Selected language code (default 'en')
 */
export async function sendChatMessage(message, sessionId = '123', language = 'en') {
  return apiRequest('/chat', {
    method: 'POST',
    body: JSON.stringify({
      message,
      session_id: sessionId,
      language,
    }),
  })
}
