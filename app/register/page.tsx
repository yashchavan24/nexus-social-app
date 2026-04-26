'use client'
import { motion } from 'framer-motion'
import { useState } from 'react'

const interests = ['WebDev', 'Design', 'AI/ML', 'IndieHacking', 'OpenSource', 'Mobile', 'DevOps', 'Blockchain']

export default function RegisterPage() {
  const [step, setStep] = useState(1)
  const [selected, setSelected] = useState<string[]>([])
  const [form, setForm] = useState({ name: '', email: '', username: '', password: '' })

  const toggleInterest = (i: string) => {
    setSelected(prev => prev.includes(i) ? prev.filter(x => x !== i) : [...prev, i])
  }

  return (
    <div style={{ minHeight: '100vh', background: '#09090f', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>

      {/* Grid */}
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)', backgroundSize: '40px 40px', WebkitMaskImage: 'radial-gradient(ellipse at center, black 40%, transparent 80%)' }} />
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 60% 50% at 50% 0%, rgba(124,106,255,0.15), transparent)' }} />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{ position: 'relative', zIndex: 10, width: '100%', maxWidth: '460px', margin: '0 16px' }}
      >
        <div style={{ background: '#111118', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '24px', padding: '40px' }}>

          {/* Logo */}
          <div style={{ textAlign: 'center', marginBottom: '8px' }}>
            <h1 style={{ fontSize: '32px', fontWeight: 900, background: 'linear-gradient(135deg, #a78bfa, #38bdf8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', margin: 0 }}>NEXUS</h1>
            <p style={{ color: '#6b7280', fontSize: '13px', marginTop: '4px' }}>
              {step === 1 ? 'Create your account' : step === 2 ? 'Choose your interests' : '🎉 You\'re all set!'}
            </p>
          </div>

          {/* Step indicator */}
          <div style={{ display: 'flex', gap: '6px', justifyContent: 'center', marginBottom: '28px', marginTop: '16px' }}>
            {[1, 2, 3].map(s => (
              <div key={s} style={{ height: '4px', width: s === step ? '32px' : '16px', borderRadius: '4px', background: s <= step ? 'linear-gradient(90deg, #7c6aff, #38bdf8)' : 'rgba(255,255,255,0.1)', transition: 'all 0.3s' }} />
            ))}
          </div>

          {/* Step 1 — Account details */}
          {step === 1 && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '10px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '6px' }}>Full Name</label>
                  <input placeholder="Arjun Kumar" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
                    style={{ width: '100%', background: '#1a1a24', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', padding: '10px 12px', fontSize: '13px', color: '#f1f0ff', outline: 'none', boxSizing: 'border-box' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '6px' }}>Username</label>
                  <input placeholder="@arjunbuilds" value={form.username} onChange={e => setForm({ ...form, username: e.target.value })}
                    style={{ width: '100%', background: '#1a1a24', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', padding: '10px 12px', fontSize: '13px', color: '#f1f0ff', outline: 'none', boxSizing: 'border-box' }} />
                </div>
              </div>
              <div style={{ marginBottom: '10px' }}>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '6px' }}>Email</label>
                <input type="email" placeholder="you@example.com" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}
                  style={{ width: '100%', background: '#1a1a24', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', padding: '10px 14px', fontSize: '13px', color: '#f1f0ff', outline: 'none', boxSizing: 'border-box' }} />
              </div>
              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '6px' }}>Password</label>
                <input type="password" placeholder="Min 8 characters" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })}
                  style={{ width: '100%', background: '#1a1a24', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', padding: '10px 14px', fontSize: '13px', color: '#f1f0ff', outline: 'none', boxSizing: 'border-box' }} />
              </div>
              <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => setStep(2)}
                style={{ width: '100%', padding: '13px', borderRadius: '12px', background: 'linear-gradient(135deg, #7c6aff, #6366f1)', border: 'none', color: 'white', fontSize: '15px', fontWeight: 700, cursor: 'pointer' }}>
                Continue →
              </motion.button>
              <p style={{ textAlign: 'center', fontSize: '13px', color: '#6b7280', marginTop: '16px' }}>
                Already have an account? <a href="/login" style={{ color: '#a78bfa', textDecoration: 'none' }}>Sign in</a>
              </p>
            </motion.div>
          )}

          {/* Step 2 — Interests */}
          {step === 2 && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
              <p style={{ fontSize: '13px', color: '#9ca3af', marginBottom: '16px', textAlign: 'center' }}>Pick at least 3 topics you care about</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '24px', justifyContent: 'center' }}>
                {interests.map(i => (
                  <motion.button key={i} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => toggleInterest(i)}
                    style={{ padding: '8px 16px', borderRadius: '20px', border: `1px solid ${selected.includes(i) ? '#7c6aff' : 'rgba(255,255,255,0.1)'}`, background: selected.includes(i) ? 'rgba(124,106,255,0.15)' : 'rgba(255,255,255,0.04)', color: selected.includes(i) ? '#a78bfa' : '#9ca3af', fontSize: '13px', fontWeight: 500, cursor: 'pointer', transition: 'all 0.2s' }}>
                    {selected.includes(i) ? '✓ ' : ''}{i}
                  </motion.button>
                ))}
              </div>
              <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => setStep(3)}
                disabled={selected.length < 3}
                style={{ width: '100%', padding: '13px', borderRadius: '12px', background: selected.length >= 3 ? 'linear-gradient(135deg, #7c6aff, #6366f1)' : 'rgba(255,255,255,0.05)', border: 'none', color: selected.length >= 3 ? 'white' : '#6b7280', fontSize: '15px', fontWeight: 700, cursor: selected.length >= 3 ? 'pointer' : 'not-allowed' }}>
                {selected.length >= 3 ? 'Join NEXUS →' : `Select ${3 - selected.length} more`}
              </motion.button>
            </motion.div>
          )}

          {/* Step 3 — Success */}
          {step === 3 && (
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '64px', marginBottom: '16px' }}>🎉</div>
              <h2 style={{ fontSize: '22px', fontWeight: 800, marginBottom: '8px', color: '#f1f0ff' }}>Welcome to NEXUS!</h2>
              <p style={{ color: '#9ca3af', fontSize: '14px', marginBottom: '28px', lineHeight: 1.6 }}>Your account is ready. Start connecting with amazing communities.</p>
              <motion.button whileHover={{ scale: 1.02, boxShadow: '0 8px 30px rgba(124,106,255,0.4)' }} whileTap={{ scale: 0.98 }}
                onClick={() => window.location.href = '/feed'}
                style={{ width: '100%', padding: '13px', borderRadius: '12px', background: 'linear-gradient(135deg, #7c6aff, #6366f1)', border: 'none', color: 'white', fontSize: '15px', fontWeight: 700, cursor: 'pointer' }}>
                Go to Feed →
              </motion.button>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  )
}