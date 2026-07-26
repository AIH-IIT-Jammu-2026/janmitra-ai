import { useState } from 'react'
import { sendChatMessage } from '../clients/chatClient'

const INITIAL_WELCOME = {
  id: 'welcome-1',
  sender: 'ai',
  isWelcome: true,
  text: `## Namaste! I am JanMitra AI 🙏\n\nWelcome to your intelligent citizen co-pilot. Ask me anything regarding **Government Schemes**, **Healthcare**, **Education**, **Employment**, **Agriculture**, or **Legal Rights**.`,
}

export function useChat() {
  const [messages, setMessages] = useState([INITIAL_WELCOME])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const sendMessage = async (messageText) => {
    if (!messageText.trim() || loading) return

    setError(null)
    const userMsg = {
      id: Date.now().toString(),
      sender: 'user',
      text: messageText,
    }

    setMessages((prev) => [...prev, userMsg])
    setLoading(true)

    try {
      const data = await sendChatMessage(messageText)

      const aiMsg = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: data.response || data.text || 'Response received from JanMitra AI.',
        agents: data.agents || [],
        actionPlan: data.action_plan || [],
        sources: data.sources || [],
      }

      setMessages((prev) => [...prev, aiMsg])
    } catch (err) {
      console.warn('Backend offline notice:', err.message)
      const fallbackMsg = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: `⚠️ **FastAPI Backend Offline**\n\nUnable to connect to \`http://localhost:8000/api/chat\`.\n\n*Please ensure your FastAPI backend server is running.*`,
        agents: ['System Warning'],
        actionPlan: [
          { title: 'Start FastAPI', description: 'Run: cd backend && uvicorn main:app --reload' },
          { title: 'Verify Port', description: 'Check that FastAPI server is listening on port 8000' },
        ],
      }
      setMessages((prev) => [...prev, fallbackMsg])
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return {
    messages,
    loading,
    error,
    sendMessage,
  }
}
