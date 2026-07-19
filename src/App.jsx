import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useState, createContext, useContext } from 'react'
import LandingPage from './pages/LandingPage'
import LoginPage from './pages/LoginPage'
import DashboardPage from './pages/DashboardPage'
import ChatPage from './pages/ChatPage'
import DocumentsPage from './pages/DocumentsPage'
import ArchitecturePage from './pages/ArchitecturePage'
import AboutPage from './pages/AboutPage'

export const AuthContext = createContext(null)

export function useAuth() {
  return useContext(AuthContext)
}

function App() {
  const [user, setUser] = useState(null)

  const login = () => setUser({ name: 'Tanushri', email: 'tanushri@example.com', avatar: 'T' })
  const logout = () => setUser(null)

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/dashboard" element={user ? <DashboardPage /> : <Navigate to="/login" />} />
          <Route path="/chat" element={user ? <ChatPage /> : <Navigate to="/login" />} />
          <Route path="/chat/:agentId" element={user ? <ChatPage /> : <Navigate to="/login" />} />
          <Route path="/documents" element={user ? <DocumentsPage /> : <Navigate to="/login" />} />
          <Route path="/architecture" element={<ArchitecturePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </AuthContext.Provider>
  )
}

export default App
