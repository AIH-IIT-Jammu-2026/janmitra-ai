/**
 * Message object structure helper for JanMitra AI chat
 * @typedef {Object} ChatMessage
 * @property {string|number} id
 * @property {'user'|'ai'|'system'} sender
 * @property {string} text
 * @property {string[]} [agents] List of agent names involved (e.g. ['Education', 'Agriculture'])
 * @property {string[]} [actionPlan] Structured checklist items
 * @property {string} [timestamp]
 */

export function createChatMessage({ id, sender, text, agents = [], actionPlan = [] }) {
  return {
    id: id || Date.now() + Math.random().toString(36).substr(2, 4),
    sender,
    text,
    agents,
    actionPlan,
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
  }
}
