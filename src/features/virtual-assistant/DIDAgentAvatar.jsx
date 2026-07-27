import React, { useState } from 'react'
import janviAvatarReal from '../../assets/janvi_avatar_real.png'

export default function DIDAgentAvatar({ state = 'idle' }) {
  const [iframeError, setIframeError] = useState(false)
  const agentId = 'v2_agt_CrZmANpk'
  const clientKey = 'ck_YLIzeueGNcMsKZQsIEBd-'
  const shareKey = 'Y2tfeWxmMmhJVG82akJoSlZ2RkNQZmpY'
  const shareUrl = `https://studio.d-id.com/agents/share?id=${agentId}&key=${shareKey}`

  return (
    <div
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
      {/* 1. Primary Live D-ID Share Stream Iframe (New Active Agent v2_agt_CrZmANpk) */}
      {!iframeError ? (
        <iframe
          key={agentId}
          src={shareUrl}
          title="Janvi AI - Live D-ID Digital Human (v2_agt_CrZmANpk)"
          allow="microphone; camera; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          onError={() => setIframeError(true)}
          style={{
            width: '100%',
            height: '100%',
            minHeight: 280,
            border: 'none',
            borderRadius: 16,
            zIndex: 10,
            position: 'relative',
          }}
        />
      ) : (
        /* 2. Photorealistic AI Girl Fallback Backdrop */
        <img
          src={janviAvatarReal}
          alt="Janvi AI Digital Human"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            position: 'absolute',
            inset: 0,
            zIndex: 1,
          }}
        />
      )}
    </div>
  )
}
