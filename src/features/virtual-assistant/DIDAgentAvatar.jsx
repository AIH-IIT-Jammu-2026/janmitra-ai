import React, { useEffect } from 'react'
import janviAvatarReal from '../../assets/janvi_avatar_real.png'

export default function DIDAgentAvatar({ state = 'idle' }) {
  const clientKey = import.meta.env.VITE_DID_CLIENT_KEY || 'ck_vg6jNcoaCgGoWmuhnzPql'
  const agentId = import.meta.env.VITE_DID_AGENT_ID || 'v2_agt_61-8izVy'

  useEffect(() => {
    // Inject or update D-ID Script targeting 'ai-assistant-container'
    let script = document.getElementById('did-agent-script')
    if (script) {
      script.remove()
    }

    script = document.createElement('script')
    script.id = 'did-agent-script'
    script.type = 'module'
    script.src = 'https://agent.d-id.com/v2/index.js'
    script.setAttribute('data-mode', 'full')
    script.setAttribute('data-client-key', clientKey)
    script.setAttribute('data-agent-id', agentId)
    script.setAttribute('data-name', 'did-agent')
    script.setAttribute('data-monitor', 'true')
    script.setAttribute('data-target-id', 'ai-assistant-container')
    document.head.appendChild(script)
  }, [clientKey, agentId])

  return (
    <div
      id="ai-assistant-container"
      style={{
        width: '100%',
        maxWidth: 400,
        height: 320,
        margin: '0 auto',
        borderRadius: 16,
        overflow: 'hidden',
        position: 'relative',
        background: 'linear-gradient(145deg, #071A35, #0B2447)',
        border: '1.5px solid rgba(56,189,248,0.3)',
        boxShadow: '0 0 35px rgba(56,189,248,0.2)',
      }}
    >
      {/* Photorealistic Indian Janvi AI Girl Backdrop while D-ID WebRTC Stream initializes */}
      <img
        src={janviAvatarReal}
        alt="Janvi Indian AI Digital Human"
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          position: 'absolute',
          inset: 0,
          opacity: 0.9,
          zIndex: 1,
        }}
      />
    </div>
  )
}
