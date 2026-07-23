import { apiRequest } from './api'

/**
 * Sends chat query to FastAPI backend
 * @param {string} query User prompt string
 * @returns {Promise<{text: string, agents: string[], action_plan: string[]}>}
 */
export async function sendChatMessage(query) {
  return apiRequest('/chat', {
    method: 'POST',
    body: JSON.stringify({ query }),
  })
}
