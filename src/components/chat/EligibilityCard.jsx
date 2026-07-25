import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function EligibilityCard({ data, onRecalculate }) {
  if (!data) return null

  const doc = data.document || {}
  const [profile, setProfile] = useState(data.citizen_profile || {})
  const [editing, setEditing] = useState(false)
  const [loading, setLoading] = useState(false)
  const confidence = data.confidence || {}
  const schemes = data.eligible_schemes || []
  const missingDocs = data.missing_documents || []
  const missingInfo = data.missing_information || []

  // Group schemes by domain category
  const categorizedSchemes = schemes.reduce((acc, scheme) => {
    const cat = scheme.category || '📑 Government Schemes'
    if (!acc[cat]) acc[cat] = []
    acc[cat].push(scheme)
    return acc
  }, {})

  const handleFieldChange = (field, val) => {
    setProfile((prev) => ({ ...prev, [field]: val }))
  }

  const handleSaveAndRecalculate = async () => {
    setLoading(true)
    try {
      const res = await fetch('http://localhost:8000/api/documents/evaluate-eligibility', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ citizen_profile: profile }),
      })
      if (res.ok) {
        const updatedData = await res.json()
        if (onRecalculate) onRecalculate(updatedData)
      }
    } catch (err) {
      console.warn('Recalculate error:', err)
    } finally {
      setLoading(false)
      setEditing(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      style={{
        marginTop: 16,
        marginBottom: 16,
        padding: '24px',
        background: 'rgba(7,26,53,0.85)',
        backdropFilter: 'blur(16px)',
        border: '1px solid rgba(56,189,248,0.25)',
        borderRadius: 16,
        boxShadow: '0 0 30px rgba(4,13,26,0.6)',
      }}
    >
      {/* ─── 1. DOCUMENT SUMMARY HEADER ─── */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingBottom: 16,
          borderBottom: '1px solid rgba(56,189,248,0.15)',
          marginBottom: 20,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: 12,
              background: 'rgba(37,99,235,0.2)',
              border: '1px solid rgba(37,99,235,0.4)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 22,
            }}
          >
            📄
          </div>
          <div>
            <div style={{ fontSize: 16, fontWeight: 700, color: '#F0F6FF', fontFamily: 'Space Grotesk, sans-serif' }}>
              {doc.type || 'Verified Certificate'}
            </div>
            <div style={{ fontSize: 12, color: 'rgba(240,246,255,0.5)', marginTop: 2 }}>
              Issuer: {doc.issuer || 'Government Authority'} · {doc.issue_date || '2025'}
            </div>
          </div>
        </div>

        <div style={{ textAlign: 'right' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              padding: '4px 10px',
              borderRadius: 16,
              background: 'rgba(16,185,129,0.15)',
              border: '1px solid rgba(16,185,129,0.3)',
              color: '#34D399',
              fontSize: 12,
              fontWeight: 600,
            }}
          >
            <span>Confidence: {Math.round((doc.confidence || 0.96) * 100)}%</span>
          </div>
          <div style={{ fontSize: 10, color: 'rgba(240,246,255,0.4)', marginTop: 4 }}>
            🔒 Processed In-Memory · Privacy Protected
          </div>
        </div>
      </div>

      {/* ─── 2. EXTRACTED CITIZEN PROFILE GRID ─── */}
      <div style={{ marginBottom: 24 }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 12,
          }}
        >
          <span style={{ fontSize: 13, fontWeight: 700, color: '#38BDF8', letterSpacing: 0.5, textTransform: 'uppercase' }}>
            👤 Extracted Citizen Profile
          </span>
          <button
            onClick={() => setEditing(!editing)}
            style={{
              background: 'rgba(37,99,235,0.15)',
              border: '1px solid rgba(37,99,235,0.3)',
              color: '#60A5FA',
              borderRadius: 8,
              padding: '4px 10px',
              fontSize: 12,
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            {editing ? 'Cancel' : '✏️ Edit Profile'}
          </button>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 10,
            background: 'rgba(4,13,26,0.6)',
            padding: 14,
            borderRadius: 12,
            border: '1px solid rgba(56,189,248,0.1)',
          }}
        >
          {/* Income */}
          <div>
            <div style={{ fontSize: 11, color: 'rgba(240,246,255,0.5)' }}>Annual Income</div>
            {editing ? (
              <input
                type="number"
                value={profile.income || ''}
                onChange={(e) => handleFieldChange('income', parseFloat(e.target.value))}
                style={{ width: '90%', padding: '4px 8px', borderRadius: 6, background: '#0a192f', color: '#fff', border: '1px solid #38BDF8', fontSize: 13 }}
              />
            ) : (
              <div style={{ fontSize: 14, fontWeight: 600, color: '#F0F6FF', marginTop: 2 }}>
                ₹{Number(profile.income || 0).toLocaleString('en-IN')}{' '}
                <span style={{ fontSize: 10, color: confidence.income === 'high' ? '#34D399' : '#FCD34D' }}>
                  {confidence.income === 'high' ? '✅' : '⚠️'}
                </span>
              </div>
            )}
          </div>

          {/* Category */}
          <div>
            <div style={{ fontSize: 11, color: 'rgba(240,246,255,0.5)' }}>Category</div>
            {editing ? (
              <input
                type="text"
                value={profile.category || ''}
                onChange={(e) => handleFieldChange('category', e.target.value)}
                style={{ width: '90%', padding: '4px 8px', borderRadius: 6, background: '#0a192f', color: '#fff', border: '1px solid #38BDF8', fontSize: 13 }}
              />
            ) : (
              <div style={{ fontSize: 14, fontWeight: 600, color: '#F0F6FF', marginTop: 2 }}>
                {profile.category || 'General'}{' '}
                <span style={{ fontSize: 10, color: '#34D399' }}>✅</span>
              </div>
            )}
          </div>

          {/* Land Acres */}
          <div>
            <div style={{ fontSize: 11, color: 'rgba(240,246,255,0.5)' }}>Land Holding</div>
            {editing ? (
              <input
                type="number"
                value={profile.land_acres || ''}
                onChange={(e) => handleFieldChange('land_acres', parseFloat(e.target.value))}
                style={{ width: '90%', padding: '4px 8px', borderRadius: 6, background: '#0a192f', color: '#fff', border: '1px solid #38BDF8', fontSize: 13 }}
              />
            ) : (
              <div style={{ fontSize: 14, fontWeight: 600, color: '#F0F6FF', marginTop: 2 }}>
                {profile.land_acres || 0} Acres <span style={{ fontSize: 10, color: '#34D399' }}>✅</span>
              </div>
            )}
          </div>

          {/* State */}
          <div>
            <div style={{ fontSize: 11, color: 'rgba(240,246,255,0.5)' }}>State</div>
            <div style={{ fontSize: 13, fontWeight: 500, color: 'rgba(240,246,255,0.85)', marginTop: 2 }}>
              {profile.state || 'Maharashtra'}
            </div>
          </div>

          {/* Occupation */}
          <div>
            <div style={{ fontSize: 11, color: 'rgba(240,246,255,0.5)' }}>Occupation</div>
            <div style={{ fontSize: 13, fontWeight: 500, color: 'rgba(240,246,255,0.85)', marginTop: 2 }}>
              {profile.occupation || 'Farmer'}
            </div>
          </div>

          {/* Age */}
          <div>
            <div style={{ fontSize: 11, color: 'rgba(240,246,255,0.5)' }}>Age</div>
            <div style={{ fontSize: 13, fontWeight: 500, color: 'rgba(240,246,255,0.85)', marginTop: 2 }}>
              {profile.age || 35} Yrs
            </div>
          </div>
        </div>

        {editing && (
          <div style={{ marginTop: 10, textAlign: 'right' }}>
            <button
              onClick={handleSaveAndRecalculate}
              disabled={loading}
              style={{
                padding: '6px 14px',
                background: 'linear-gradient(135deg, #2563EB, #1D4ED8)',
                color: 'white',
                border: 'none',
                borderRadius: 8,
                fontSize: 12,
                fontWeight: 700,
                cursor: 'pointer',
              }}
            >
              {loading ? 'Recalculating...' : 'Save & Recalculate Schemes ➔'}
            </button>
          </div>
        )}
      </div>

      {/* ─── 3. CATEGORIZED ELIGIBLE SCHEMES ─── */}
      <div>
        <div style={{ fontSize: 13, fontWeight: 700, color: '#34D399', letterSpacing: 0.5, textTransform: 'uppercase', marginBottom: 14 }}>
          🏆 Matched Schemes ({schemes.length})
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {Object.entries(categorizedSchemes).map(([category, schemeList]) => (
            <div key={category}>
              <div style={{ fontSize: 12, fontWeight: 700, color: '#60A5FA', marginBottom: 8, textTransform: 'uppercase' }}>
                {category}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {schemeList.map((scheme, idx) => (
                  <div
                    key={idx}
                    style={{
                      padding: 16,
                      background: 'rgba(11,36,71,0.5)',
                      border: '1px solid rgba(56,189,248,0.18)',
                      borderRadius: 12,
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                      <div style={{ fontSize: 15, fontWeight: 700, color: '#F0F6FF' }}>{scheme.name}</div>
                      <span
                        style={{
                          padding: '3px 10px',
                          borderRadius: 14,
                          fontSize: 11,
                          fontWeight: 700,
                          background: scheme.badge === 'Highly Eligible' ? 'rgba(16,185,129,0.2)' : 'rgba(37,99,235,0.2)',
                          color: scheme.badge === 'Highly Eligible' ? '#34D399' : '#60A5FA',
                          border: `1px solid ${scheme.badge === 'Highly Eligible' ? 'rgba(16,185,129,0.4)' : 'rgba(37,99,235,0.4)'}`,
                        }}
                      >
                        {scheme.badge}
                      </span>
                    </div>

                    <div style={{ fontSize: 13, color: '#38BDF8', fontWeight: 600, marginBottom: 10 }}>
                      🎁 Benefit: {scheme.benefit}
                    </div>

                    {/* Why Eligible Bullet Points */}
                    {scheme.why_eligible && (
                      <div style={{ marginBottom: 10, background: 'rgba(4,13,26,0.4)', padding: '8px 12px', borderRadius: 8 }}>
                        <div style={{ fontSize: 11, fontWeight: 600, color: 'rgba(240,246,255,0.6)', marginBottom: 4 }}>
                          Why Eligible:
                        </div>
                        {scheme.why_eligible.map((bullet, bIdx) => (
                          <div key={bIdx} style={{ fontSize: 12, color: 'rgba(240,246,255,0.85)', lineHeight: 1.5 }}>
                            {bullet}
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Apply Portal Button */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 }}>
                      <div style={{ fontSize: 11, color: 'rgba(240,246,255,0.5)' }}>
                        Docs Required: {scheme.required_documents?.join(', ')}
                      </div>
                      <a
                        href={scheme.official_url}
                        target="_blank"
                        rel="noreferrer"
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: 6,
                          padding: '6px 12px',
                          background: 'linear-gradient(135deg, #2563EB, #1D4ED8)',
                          color: 'white',
                          borderRadius: 8,
                          fontSize: 12,
                          fontWeight: 600,
                          textDecoration: 'none',
                          boxShadow: '0 0 12px rgba(37,99,235,0.4)',
                        }}
                      >
                        Open Official Portal ↗
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
