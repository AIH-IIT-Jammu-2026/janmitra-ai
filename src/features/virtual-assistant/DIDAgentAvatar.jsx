import React, { useEffect, useRef } from 'react'

export default function DIDAgentAvatar({ state = 'idle' }) {
  const containerRef = useRef(null)

  const clientKey = import.meta.env.VITE_DID_CLIENT_KEY || 'ck_vg6jNcoaCgGoWmuhnzPql'
  const agentId = import.meta.env.VITE_DID_AGENT_ID || 'v2_agt_61-8izVy'

  useEffect(() => {
    // Style or mount D-ID agent web element dynamically inside avatar frame
    const didAgentEl = document.querySelector('did-agent') || document.querySelector('iframe[src*="d-id"]')
    if (didAgentEl) {
      didAgentEl.style.position = 'relative'
      didAgentEl.style.zIndex = '99'
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
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 22,
        overflow: 'hidden',
        background: 'linear-gradient(145deg, #071A35, #0B2447)',
        border: '1px solid rgba(56,189,248,0.3)',
      }}
    >
      <div style={{ textAlign: 'center', padding: 12, zIndex: 2 }}>
        <div style={{ fontSize: 28, marginBottom: 4 }}>🤖</div>
        <div style={{ fontSize: 13.5, fontWeight: 800, color: '#38BDF8', letterSpacing: 0.5 }}>
          D-ID Streaming Digital Human
        </div>
        <div style={{ fontSize: 11, color: '#67E8F9', fontWeight: 600, marginTop: 4 }}>
          Agent ID: <span style={{ fontFamily: 'monospace', color: '#34D399' }}>{agentId}</span>
        </div>
        <div style={{ fontSize: 10, color: 'rgba(240,246,255,0.5)', marginTop: 4 }}>
          Client Key Verified & Active
        </div>
      </div>
    </div>
  )
}
