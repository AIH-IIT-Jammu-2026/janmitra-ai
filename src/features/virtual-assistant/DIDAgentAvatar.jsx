import React, { useEffect, useRef } from 'react'

export default function DIDAgentAvatar({ state = 'idle' }) {
  const containerRef = useRef(null)

  useEffect(() => {
    // Dynamically position or style the D-ID agent web element if present
    const didAgentEl = document.querySelector('did-agent') || document.querySelector('iframe[src*="d-id"]')
    if (didAgentEl) {
      didAgentEl.style.zIndex = '9999'
    }
  }, [state])

  return (
    <div
      ref={containerRef}
      style={{
        width: '100%',
        height: '100%',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 22,
        overflow: 'hidden',
        background: 'linear-gradient(135deg, #071A35, #0B2447)',
      }}
    >
      <div style={{ textAlign: 'center', padding: 10 }}>
        <div style={{ fontSize: 24, marginBottom: 4 }}>🤖</div>
        <div style={{ fontSize: 13, fontWeight: 700, color: '#38BDF8' }}>
          D-ID Streaming Digital Human
        </div>
        <div style={{ fontSize: 11, color: 'rgba(240,246,255,0.6)', marginTop: 2 }}>
          Live Interactive Avatar Connected
        </div>
      </div>
    </div>
  )
}
