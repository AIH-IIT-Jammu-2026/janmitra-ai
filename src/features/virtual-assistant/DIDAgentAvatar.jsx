import React from 'react'

export default function DIDAgentAvatar({ state = 'idle' }) {
  const shareUrl = 'https://studio.d-id.com/agents/share?id=v2_agt_61-8izVy&key=Y2tfZ1k1Q1RZbEtHQmJXRWY0QmM1SFQz'

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
      <iframe
        src={shareUrl}
        title="Janvi AI - Live D-ID Digital Human"
        allow="microphone; camera; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        style={{
          width: '100%',
          height: '100%',
          minHeight: 280,
          border: 'none',
          borderRadius: 16,
        }}
      />
    </div>
  )
}
