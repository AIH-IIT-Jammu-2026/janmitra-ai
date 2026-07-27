import React from 'react'
import ReactDOM from 'react-dom/client'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { LanguageProvider } from './context/LanguageContext'
import App from './App.jsx'
import './index.css'

const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID || 'dummy-client-id.apps.googleusercontent.com'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={googleClientId}>
      <LanguageProvider>
        <App />
      </LanguageProvider>
    </GoogleOAuthProvider>
  </React.StrictMode>,
)

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/sw.js")
      .then((reg) => console.log("Service Worker registered:", reg.scope))
      .catch((err) => console.error("Service Worker registration failed:", err))
  })
}
