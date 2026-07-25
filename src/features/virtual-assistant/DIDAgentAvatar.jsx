import React, { useEffect, useState } from 'react'
import janviAvatarReal from '../../assets/janvi_avatar_real.png'

export default function DIDAgentAvatar({ state = 'idle' }) {
  const [scriptLoaded, setScriptLoaded] = useState(false)
  const clientKey = import.meta.env.VITE_DID_CLIENT_KEY || 'ck_vg6jNcoaCgGoWmuhnzPql'
  const agentId = import.meta.env.VITE_DID_AGENT_ID || 'v2_agt_61-8izVy'

  useEffect(() => {
    // Dynamically inject D-ID Script with target-id set to 'did-avatar-container'
    const existingScript = document.getElementById('did-agent-script')
    if (existingScript) {
      existingScript.remove()
    }

    const script = document.createElement('script')
    script.id = 'did-agent-script'
    script.type = 'module'
    script.src = 'https://agent.d-id.com/v2/index.js'
    script.setAttribute('data-mode', 'full')
    script.setAttribute('data-client-key', clientKey)
    script.setAttribute('data-agent-id', agentId)
    script.setAttribute('data-name', 'did-agent')
    script.setAttribute('data-monitor', 'true')
    script.setAttribute('data-target-id', 'did-avatar-container')
    script.onload = () => setScriptLoaded(true)
    document.head.appendChild(script)

    return () => {
      // Cleanup script when modal closes
    }
  }, [clientKey, agentId])

  return (
    <div
      id="did-avatar-container"
      style={{
        width: '100%',
        height: '100%',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 22,
        overflow: 'hidden',
        background: 'linear-gradient(145deg, #071A35, #0B2447)',
      }}
    >
      {/* Background Image / Loading Frame until D-ID Streaming Video Connects */}
      <img
        src={janviAvatarReal}
        alt="Janvi Digital Human"
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
