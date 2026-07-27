import React, { useState } from 'react'
import janviAvatarReal from '../../assets/janvi_avatar_real.png'

export default function DIDAgentAvatar({ state = 'idle' }) {
  const [iframeError, setIframeError] = useState(false)
  const agentId = 'v2_agt_CrZmANpk'
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
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* 1. Primary Live D-ID Share Stream Iframe (Perfectly Centered) */}
      {!iframeError ? (
        <iframe
          key={agentId}
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
            zIndex: 10,
            position: 'relative',
            objectFit: 'cover',
            transform: 'scale(1.08)',
            transformOrigin: 'center center',
          }}
        />
      ) : (
        /* 2. Photorealistic AI Girl Fallback Backdrop (Centered) */
        <img
          src={janviAvatarReal}
          alt="Janvi AI Digital Human"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center top',
            position: 'absolute',
            inset: 0,
            zIndex: 1,
          }}
        />
      )}
    </div>
  )
}
