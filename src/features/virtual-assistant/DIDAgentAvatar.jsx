import React, { useEffect, useState } from 'react'
import janviAvatarReal from '../../assets/janvi_avatar_real.png'

export default function DIDAgentAvatar({ state = 'idle' }) {
  const [iframeError, setIframeError] = useState(false)
  const clientKey = import.meta.env.VITE_DID_CLIENT_KEY || 'ck_gY5CTYlKGBbWEf4Bc5HT3'
  const agentId = import.meta.env.VITE_DID_AGENT_ID || 'v2_agt_Wv_YTk5o'
  const shareUrl = `https://studio.d-id.com/agents/share?id=${agentId}&key=${clientKey}`

  useEffect(() => {
    // Inject D-ID SDK script module if missing
    let script = document.getElementById('did-agent-sdk-script')
    if (!script) {
      script = document.createElement('script')
      script.id = 'did-agent-sdk-script'
      script.type = 'module'
      script.src = 'https://agent.d-id.com/v2/index.js'
      script.setAttribute('data-mode', 'full')
      script.setAttribute('data-client-key', clientKey)
      script.setAttribute('data-agent-id', agentId)
      script.setAttribute('data-name', 'did-agent')
      script.setAttribute('data-monitor', 'true')
      script.setAttribute('data-target-id', 'did-agent-sdk-container')
      document.head.appendChild(script)
    }
  }, [clientKey, agentId])

  return (
    <div
      id="did-agent-sdk-container"
      style={{
        width: '100%',
        height: '100%',
        minHeight: 280,
        borderRadius: 18,
        overflow: 'hidden',
        position: 'relative',
        background: 'linear-gradient(145deg, #071A35, #0B2447)',
        border: '2px solid #00f2fe',
        boxShadow: '0 8px 32px rgba(0, 242, 254, 0.3)',
      }}
    >
      {/* 1. Primary Live D-ID Share Stream Iframe */}
      {!iframeError ? (
        <iframe
          src={shareUrl}
          title="Janvi AI - Live D-ID Digital Human"
          allow="microphone; camera; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          onError={() => setIframeError(true)}
          style={{
            width: '100%',
            height: '100%',
            minHeight: 280,
            border: 'none',
            borderRadius: 16,
            zIndex: 5,
            position: 'relative',
          }}
        />
      ) : null}

      {/* 2. D-ID Custom Web Component Element */}
      <did-agent
        data-mode="full"
        data-client-key={clientKey}
        data-agent-id={agentId}
        data-name="did-agent"
        data-monitor="true"
        data-target-id="did-agent-sdk-container"
        style={{ width: '100%', height: '100%', position: 'absolute', inset: 0, zIndex: 4 }}
      />

      {/* 3. Photorealistic AI Girl Fallback Backdrop */}
      <img
        src={janviAvatarReal}
        alt="Janvi AI Digital Human"
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          position: 'absolute',
          inset: 0,
          opacity: iframeError ? 1 : 0.4,
          zIndex: 1,
        }}
      />
    </div>
  )
}
