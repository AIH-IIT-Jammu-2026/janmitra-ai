import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { supabase, isSupabaseConfigured } from '../clients/supabaseClient'
import NeuralBackground from '../components/NeuralBackground'

export default function LoginPage() {
  const [isSignUp, setIsSignUp] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  // Google Sign In Handler
  const handleGoogleClick = async () => {
    setLoading(true)
    setError('')

    if (isSupabaseConfigured) {
      try {
        const { error } = await supabase.auth.signInWithOAuth({
          provider: 'google',
          options: {
            redirectTo: `${window.location.origin}/chat`,
          },
        })
        if (error) {
          setError(error.message)
          setLoading(false)
        }
      } catch (err) {
        console.error('Supabase Google OAuth Exception:', err)
        setError('Failed to initiate Google sign in with Supabase.')
        setLoading(false)
      }
    } else {
      // Supabase URL is missing in .env, log directly into demo mode without breaking page redirect
      setLoading(false)
      navigate('/chat')
    }
  }

  // Password validation rules
  const hasUppercase = /[A-Z]/.test(password)
  const hasLowercase = /[a-z]/.test(password)
  const hasNumber = /[0-9]/.test(password)
  const hasSymbol = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)
  const isMinLength = password.length >= 8

  const isPasswordValid = hasUppercase && hasLowercase && hasNumber && hasSymbol && isMinLength

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (!email || !password) {
      setError('Please fill in all fields.')
      return
    }

    if (isSignUp && !isPasswordValid) {
      setError('Password does not meet all security requirements.')
      return
    }

    setLoading(true)

    if (isSupabaseConfigured) {
      try {
        if (isSignUp) {
          const { error } = await supabase.auth.signUp({
            email,
            password,
            options: { data: { full_name: name } },
          })
          if (error) {
            setError(error.message)
            setLoading(false)
            return
          }
        } else {
          const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
          })
          if (error) {
            setError(error.message)
            setLoading(false)
            return
          }
        }
      } catch (err) {
        console.warn('Auth Exception:', err)
      }
    }

    setLoading(false)
    navigate('/chat')
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #040d1a 0%, #071A35 50%, #040d1a 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        position: 'relative',
      }}
    >
      <NeuralBackground />

      <div style={{ position: 'relative', zIndex: 2, width: '100%', maxWidth: 460 }}>
        {/* Back to landing */}
        <Link
          to="/"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            color: 'rgba(240,246,255,0.6)',
            textDecoration: 'none',
            fontSize: 13,
            marginBottom: 24,
            transition: 'color 0.2s',
          }}
        >
          ← Back to Home
        </Link>

        {/* Brand Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} style={{ textAlign: 'center', marginBottom: 28 }}>
          <div
            style={{
              width: 58,
              height: 58,
              background: 'linear-gradient(135deg, #2563EB, #38BDF8)',
              borderRadius: 16,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 30,
              margin: '0 auto 14px',
              boxShadow: '0 0 35px rgba(37,99,235,0.5)',
            }}
          >
            🇮🇳
          </div>
          <h1 style={{ fontSize: 24, fontWeight: 800, color: '#F0F6FF', fontFamily: 'Space Grotesk, sans-serif', marginBottom: 6 }}>
            JanMitra AI
          </h1>
          <p style={{ color: 'rgba(240,246,255,0.5)', fontSize: 13 }}>India's Multi-Agent Citizen Assistance Platform</p>
        </motion.div>

        {/* Card */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-card" style={{ padding: 32 }}>
          {/* Tab buttons */}
          <div style={{ display: 'flex', background: 'rgba(255,255,255,0.04)', borderRadius: 10, padding: 4, marginBottom: 24 }}>
            <button
              onClick={() => { setIsSignUp(false); setError(''); }}
              style={{
                flex: 1,
                padding: '9px 16px',
                border: 'none',
                borderRadius: 8,
                background: !isSignUp ? 'rgba(37,99,235,0.3)' : 'transparent',
                color: !isSignUp ? '#60A5FA' : 'rgba(240,246,255,0.5)',
                fontWeight: 600,
                fontSize: 13,
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
            >
              Sign In
            </button>
            <button
              onClick={() => { setIsSignUp(true); setError(''); }}
              style={{
                flex: 1,
                padding: '9px 16px',
                border: 'none',
                borderRadius: 8,
                background: isSignUp ? 'rgba(37,99,235,0.3)' : 'transparent',
                color: isSignUp ? '#60A5FA' : 'rgba(240,246,255,0.5)',
                fontWeight: 600,
                fontSize: 13,
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
            >
              Create Account
            </button>
          </div>

          {/* Google Sign In Button */}
          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            onClick={handleGoogleClick}
            type="button"
            style={{
              width: '100%',
              padding: '12px 20px',
              background: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(56,189,248,0.2)',
              borderRadius: 12,
              color: '#F0F6FF',
              fontSize: 14,
              fontWeight: 500,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 10,
              marginBottom: 20,
              transition: 'all 0.2s',
              fontFamily: 'Inter, sans-serif',
            }}
          >
            <svg width="18" height="18" viewBox="0 0 18 18">
              <path fill="#4285F4" d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.615z" />
              <path fill="#34A853" d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.859-3.048.859-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 009 18z" />
              <path fill="#FBBC05" d="M3.964 10.71A5.41 5.41 0 013.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 000 9c0 1.452.348 2.827.957 4.042l3.007-2.332z" />
              <path fill="#EA4335" d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 00.957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z" />
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
          <form onSubmit={handleSubmit}>
            {isSignUp && (
              <div style={{ marginBottom: 16 }}>
                <label style={{ fontSize: 13, color: 'rgba(240,246,255,0.7)', display: 'block', marginBottom: 6, fontWeight: 500 }}>
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Rahul Sharma"
                  style={{
                    width: '100%',
                    padding: '12px 14px',
                    borderRadius: 10,
                    background: 'rgba(11,36,71,0.6)',
                    border: '1px solid rgba(56,189,248,0.2)',
                    color: '#F0F6FF',
                    fontSize: 14,
                    outline: 'none',
                  }}
                />
              </div>
            )}

            <div style={{ marginBottom: 16 }}>
              <label style={{ fontSize: 13, color: 'rgba(240,246,255,0.7)', display: 'block', marginBottom: 6, fontWeight: 500 }}>
                Email Address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="citizen@gov.in"
                style={{
                  width: '100%',
                  padding: '12px 14px',
                  borderRadius: 10,
                  background: 'rgba(11,36,71,0.6)',
                  border: '1px solid rgba(56,189,248,0.2)',
                  color: '#F0F6FF',
                  fontSize: 14,
                  outline: 'none',
                }}
              />
            </div>

            <div style={{ marginBottom: 16 }}>
              <label style={{ fontSize: 13, color: 'rgba(240,246,255,0.7)', display: 'block', marginBottom: 6, fontWeight: 500 }}>
                Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                style={{
                  width: '100%',
                  padding: '12px 14px',
                  borderRadius: 10,
                  background: 'rgba(11,36,71,0.6)',
                  border: `1px solid ${isSignUp && password && !isPasswordValid ? 'rgba(239,68,68,0.5)' : 'rgba(56,189,248,0.2)'}`,
                  color: '#F0F6FF',
                  fontSize: 14,
                  outline: 'none',
                }}
              />
            </div>

            {/* Password Criteria Checklist (For Sign Up) */}
            {isSignUp && password && (
              <div
                style={{
                  marginBottom: 20,
                  padding: '12px 14px',
                  background: 'rgba(7,26,53,0.6)',
                  border: '1px solid rgba(56,189,248,0.15)',
                  borderRadius: 10,
                  fontSize: 12,
                }}
              >
                <div style={{ fontWeight: 600, color: '#38BDF8', marginBottom: 8 }}>Password Requirements:</div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6 }}>
                  <span style={{ color: hasUppercase ? '#34D399' : '#F87171' }}>
                    {hasUppercase ? '✓' : '✗'} 1 Uppercase (A-Z)
                  </span>
                  <span style={{ color: hasLowercase ? '#34D399' : '#F87171' }}>
                    {hasLowercase ? '✓' : '✗'} 1 Lowercase (a-z)
                  </span>
                  <span style={{ color: hasNumber ? '#34D399' : '#F87171' }}>
                    {hasNumber ? '✓' : '✗'} 1 Number (0-9)
                  </span>
                  <span style={{ color: hasSymbol ? '#34D399' : '#F87171' }}>
                    {hasSymbol ? '✓' : '✗'} 1 Symbol (!@#$%^&*)
                  </span>
                  <span style={{ color: isMinLength ? '#34D399' : '#F87171' }}>
                    {isMinLength ? '✓' : '✗'} Min 8 Characters
                  </span>
                </div>
              </div>
            )}

            {error && (
              <div
                style={{
                  color: '#F87171',
                  fontSize: 13,
                  marginBottom: 16,
                  textAlign: 'center',
                  padding: '10px 12px',
                  background: 'rgba(239,68,68,0.12)',
                  borderRadius: 8,
                  border: '1px solid rgba(239,68,68,0.25)',
                }}
              >
                {error}
              </div>
            )}

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading || (isSignUp && !isPasswordValid)}
              style={{
                width: '100%',
                padding: '14px 20px',
                fontSize: 15,
                fontWeight: 700,
                color: 'white',
                background:
                  isSignUp && !isPasswordValid
                    ? 'rgba(37,99,235,0.4)'
                    : 'linear-gradient(135deg, #2563EB, #1D4ED8)',
                border: 'none',
                borderRadius: 12,
                cursor: isSignUp && !isPasswordValid ? 'not-allowed' : 'pointer',
                boxShadow: '0 0 20px rgba(37,99,235,0.4)',
                transition: 'all 0.2s',
                fontFamily: 'Space Grotesk, sans-serif',
              }}
            >
              {loading ? (
                <span>Processing...</span>
              ) : isSignUp ? (
                'Create Account & Get Started ➔'
              ) : (
                'Sign In & Get Started ➔'
              )}
            </motion.button>
          </form>
        </motion.div>
      </div>
    </div>
  )
}
