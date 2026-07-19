import { Link } from 'react-router-dom'
import NeuralBackground from '../components/NeuralBackground'
import { motion } from 'framer-motion'

export default function AboutPage() {
  return (
    <div style={{ minHeight: '100vh', background: '#040d1a', position: 'relative' }}>
      <NeuralBackground />
      <div style={{ position: 'relative', zIndex: 2, padding: '60px 40px', maxWidth: 800, margin: '0 auto', textAlign: 'center' }}>
        <Link to="/" style={{ color: 'rgba(240,246,255,0.4)', textDecoration: 'none', fontSize: 13, display: 'block', marginBottom: 40 }}>← Back to home</Link>
        <div style={{ fontSize: 64, marginBottom: 20 }}>🇮🇳</div>
        <h1 style={{ fontSize: 40, fontWeight: 800, fontFamily: 'Space Grotesk, sans-serif', marginBottom: 16 }}>
          <span className="gradient-text">JanMitra AI</span>
        </h1>
        <p style={{ fontSize: 18, color: 'rgba(240,246,255,0.6)', lineHeight: 1.8, marginBottom: 32 }}>
          JanMitra AI is a multilingual, AI-powered citizen assistance platform built to democratize access to India's government services. 
          Using cutting-edge multi-agent AI orchestration, it makes 100+ government schemes, healthcare, education, employment, and legal help accessible to every citizen — in their own language, on any device.
        </p>
        <div className="glass-card" style={{ padding: '24px 32px', marginBottom: 24, textAlign: 'left' }}>
          <h2 style={{ color: '#60A5FA', marginBottom: 12 }}>Built for the Hackathon</h2>
          <p style={{ color: 'rgba(240,246,255,0.6)', lineHeight: 1.7, fontSize: 14 }}>
            This prototype demonstrates the complete user experience of JanMitra AI including multi-agent orchestration, real-time AI responses, document analysis, and multilingual support — all running as a production-quality frontend prototype.
          </p>
        </div>
        <motion.a href="/login" whileHover={{ scale: 1.04 }} style={{ display: 'inline-block', padding: '13px 28px', background: 'linear-gradient(135deg, #2563EB, #1D4ED8)', borderRadius: 12, color: 'white', textDecoration: 'none', fontWeight: 700 }}>
          Try the Demo →
        </motion.a>
      </div>
    </div>
  )
}
