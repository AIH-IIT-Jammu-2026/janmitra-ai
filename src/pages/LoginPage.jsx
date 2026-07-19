import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import NeuralBackground from '../components/NeuralBackground'
import { useAuth } from '../App'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    // Simulate auth
    await new Promise(r => setTimeout(r, 1200))
    if (email && password) {
      login()
      navigate('/dashboard')
    } else {
      setError('Please enter valid credentials')
      setLoading(false)
    }
  }

  const handleGoogle = async () => {
    setLoading(true)
    await new Promise(r => setTimeout(r, 800))
    login()
    navigate('/dashboard')
  }

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #040d1a 0%, #071A35 50%, #040d1a 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20, position: 'relative' }}>
      <NeuralBackground />

      <div style={{ position: 'relative', zIndex: 2, width: '100%', maxWidth: 440 }}>
        {/* Back to landing */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'rgba(240,246,255,0.5)', textDecoration: 'none', fontSize: 13, marginBottom: 24, transition: 'color 0.2s' }}>
          ← Back to home
        </Link>

        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ textAlign: 'center', marginBottom: 32 }}
        >
          <div style={{
            width: 64, height: 64,
            background: 'linear-gradient(135deg, #2563EB, #38BDF8)',
            borderRadius: 18,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 32, margin: '0 auto 16px',
            boxShadow: '0 0 40px rgba(37,99,235,0.5)',
          }}>🇮🇳</div>
          <h1 style={{ fontSize: 24, fontWeight: 700, color: '#F0F6FF', fontFamily: 'Space Grotesk, sans-serif', marginBottom: 8 }}>Welcome to JanMitra AI</h1>
          <p style={{ color: 'rgba(240,246,255,0.5)', fontSize: 14 }}>India's Citizen Intelligence Platform</p>
        </motion.div>

        {/* Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-card"
          style={{ padding: 32 }}
        >
          <h2 style={{ fontSize: 18, fontWeight: 600, color: '#F0F6FF', marginBottom: 6, textAlign: 'center' }}>Sign In</h2>
          <p style={{ fontSize: 13, color: 'rgba(240,246,255,0.45)', textAlign: 'center', marginBottom: 24 }}>Use any email and password for demo</p>

          {/* Google */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleGoogle}
            style={{
              width: '100%', padding: '12px 20px',
              background: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(255,255,255,0.12)',
              borderRadius: 12, color: '#F0F6FF',
              fontSize: 14, fontWeight: 500,
              cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
              marginBottom: 20, transition: 'all 0.2s',
              fontFamily: 'Inter, sans-serif',
            }}
          >
            <svg width="18" height="18" viewBox="0 0 18 18">
              <path fill="#4285F4" d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.615z"/>
              <path fill="#34A853" d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.859-3.048.859-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 009 18z"/>
              <path fill="#FBBC05" d="M3.964 10.71A5.41 5.41 0 013.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 000 9c0 1.452.348 2.827.957 4.042l3.007-2.332z"/>
              <path fill="#EA4335" d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 00.957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z"/>
            </svg>
            Continue with Google
          </motion.button>

          {/* Divider */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
            <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.08)' }} />
            <span style={{ fontSize: 12, color: 'rgba(240,246,255,0.3)' }}>or</span>
            <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.08)' }} />
          </div>

          {/* Form */}
          <form onSubmit={handleLogin}>
            <div style={{ marginBottom: 16 }}>
              <label style={{ fontSize: 13, color: 'rgba(240,246,255,0.6)', display: 'block', marginBottom: 6, fontWeight: 500 }}>Email Address</label>
              <input
                className="glass-input"
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="citizen@india.gov.in"
                style={{ padding: '12px 14px' }}
              />
            </div>
            <div style={{ marginBottom: 20 }}>
              <label style={{ fontSize: 13, color: 'rgba(240,246,255,0.6)', display: 'block', marginBottom: 6, fontWeight: 500 }}>Password</label>
              <input
                className="glass-input"
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                style={{ padding: '12px 14px' }}
              />
            </div>

            {error && (
              <div style={{ color: '#F87171', fontSize: 13, marginBottom: 16, textAlign: 'center', padding: '8px 12px', background: 'rgba(239,68,68,0.1)', borderRadius: 8, border: '1px solid rgba(239,68,68,0.2)' }}>
                {error}
              </div>
            )}

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              className="btn-primary"
              style={{ width: '100%', padding: '13px 20px', fontSize: 15, position: 'relative', overflow: 'hidden' }}
            >
              {loading ? (
                <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                  <motion.span
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    style={{ display: 'inline-block', width: 16, height: 16, border: '2px solid rgba(255,255,255,0.3)', borderTopColor: 'white', borderRadius: '50%' }}
                  />
                  Signing in...
                </span>
              ) : 'Sign In →'}
            </motion.button>
          </form>

          <p style={{ textAlign: 'center', marginTop: 20, fontSize: 13, color: 'rgba(240,246,255,0.4)' }}>
            Don't have an account?{' '}
            <button onClick={handleGoogle} style={{ background: 'none', border: 'none', color: '#60A5FA', cursor: 'pointer', fontSize: 13, fontWeight: 500 }}>
              Create one free
            </button>
          </p>
        </motion.div>

        {/* Demo hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          style={{ textAlign: 'center', marginTop: 16, padding: '10px 16px', background: 'rgba(56,189,248,0.06)', borderRadius: 10, border: '1px solid rgba(56,189,248,0.12)' }}
        >
          <span style={{ fontSize: 12, color: 'rgba(240,246,255,0.5)' }}>
            🎯 <strong style={{ color: '#38BDF8' }}>Demo Mode</strong> — Enter any email & password to explore
          </span>
        </motion.div>
      </div>
    </div>
  )
}
