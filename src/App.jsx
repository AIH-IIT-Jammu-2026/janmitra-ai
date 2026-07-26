import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import ChatPage from './pages/ChatPage'
import ArchitecturePage from './pages/ArchitecturePage'
import LoginPage from './pages/LoginPage'
import DashboardPage from './pages/DashboardPage'
import DocumentsPage from './pages/DocumentsPage'
import { AssistantProvider } from './context/AssistantContext'
import VirtualAssistantModal from './features/virtual-assistant/VirtualAssistantModal'

function App() {
  return (
    <BrowserRouter>
      <AssistantProvider>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/chat" element={<ChatPage />} />
          <Route path="/architecture" element={<ArchitecturePage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/documents" element={<DocumentsPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<LoginPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <VirtualAssistantModal />
      </AssistantProvider>
    </BrowserRouter>
  )
}

export default App
