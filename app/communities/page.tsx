'use client'
import { motion } from 'framer-motion'
import { useState } from 'react'

const communities = [
  { id: 1, name: 'WebDev Central', slug: 'webdev', icon: '🌐', color: '#a78bfa', members: '142k', online: '2.4k', desc: 'Everything web development — frontend, backend, devops, and everything in between.', trending: true },
  { id: 2, name: 'Design Systems', slug: 'design', icon: '🎨', color: '#38bdf8', members: '89k', online: '1.1k', desc: 'Share your design tokens, component libraries, and accessibility guides.', joined: true },
  { id: 3, name: 'AI Builders', slug: 'ai', icon: '🤖', color: '#fbbf24', members: '201k', online: '5.7k', desc: 'Build and ship AI-powered products. Share prompts, evals, and deployment tips.', trending: true },
  { id: 4, name: 'Indie Hackers', slug: 'indie', icon: '💡', color: '#34d399', members: '67k', online: '890', desc: 'Bootstrapped founders sharing revenue, failures, and lessons from building in public.', joined: true },
  { id: 5, name: 'Open Source', slug: 'opensource', icon: '🔓', color: '#f87171', members: '310k', online: '8.2k', desc: 'Contribute, discover, and celebrate open source projects from around the world.' },
  { id: 6, name: 'DevOps & Cloud', slug: 'devops', icon: '☁️', color: '#818cf8', members: '95k', online: '1.8k', desc: 'CI/CD, containers, Kubernetes, AWS, GCP, Azure — everything infrastructure.' },
  { id: 7, name: 'Mobile Dev', slug: 'mobile', icon: '📱', color: '#fb923c', members: '78k', online: '1.2k', desc: 'React Native, Flutter, Swift, Kotlin — build beautiful mobile experiences.' },
  { id: 8, name: 'Blockchain', slug: 'blockchain', icon: '⛓️', color: '#a3e635', members: '54k', online: '670', desc: 'Web3, DeFi, NFTs, and the future of decentralized applications.' },
]

export default function CommunitiesPage() {
  const [joined, setJoined] = useState<number[]>([2, 4])
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('all')

  const filtered = communities.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) &&
    (filter === 'all' || (filter === 'joined' && joined.includes(c.id)) || (filter === 'trending' && c.trending))
  )

  const toggleJoin = (id: number) => setJoined(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id])

  return (
    <div style={{ minHeight: '100vh', background: '#09090f', color: '#f1f0ff' }}>

      {/* Navbar */}
      <nav style={{ position: 'sticky', top: 0, zIndex: 100, background: 'rgba(9,9,15,0.85)', backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(255,255,255,0.07)', padding: '0 24px', display: 'flex', alignItems: 'center', height: '56px', gap: '24px' }}>
        <a href="/feed" style={{ fontFamily: 'sans-serif', fontSize: '20px', fontWeight: 900, background: 'linear-gradient(135deg, #a78bfa, #38bdf8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', textDecoration: 'none' }}>NEXUS</a>
        <div style={{ display: 'flex', gap: '4px', flex: 1 }}>
          {['Feed', 'Communities', 'Messages', 'Profile'].map(tab => (
            <a key={tab} href={`/${tab.toLowerCase()}`} style={{ padding: '6px 14px', borderRadius: '8px', fontSize: '13px', fontWeight: 500, color: tab === 'Communities' ? '#a78bfa' : '#6b7280', background: tab === 'Communities' ? 'rgba(124,106,255,0.12)' : 'none', textDecoration: 'none' }}>{tab}</a>
          ))}
        </div>
        <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'linear-gradient(135deg, #7c6aff, #38bdf8)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '12px' }}>AK</div>
      </nav>

      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '32px 16px' }}>

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
          <div>
            <h1 style={{ fontSize: '28px', fontWeight: 900, margin: 0 }}>Explore Communities</h1>
            <p style={{ color: '#6b7280', fontSize: '14px', marginTop: '4px' }}>Find your people. Join conversations that matter.</p>
          </div>
          <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
            style={{ padding: '10px 20px', borderRadius: '12px', background: 'linear-gradient(135deg, #7c6aff, #6366f1)', border: 'none', color: 'white', fontWeight: 700, fontSize: '14px', cursor: 'pointer' }}>
            + Create Community
          </motion.button>
        </div>

        {/* Search + Filter */}
        <div style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
          <div style={{ position: 'relative', flex: 1 }}>
            <span style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', fontSize: '14px' }}>🔍</span>
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search communities..."
              style={{ width: '100%', background: '#111118', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', padding: '10px 14px 10px 36px', fontSize: '14px', color: '#f1f0ff', outline: 'none', boxSizing: 'border-box' }} />
          </div>
          <div style={{ display: 'flex', gap: '6px' }}>
            {['all', 'joined', 'trending'].map(f => (
              <button key={f} onClick={() => setFilter(f)}
                style={{ padding: '10px 16px', borderRadius: '12px', border: '1px solid', fontSize: '13px', fontWeight: 500, cursor: 'pointer', borderColor: filter === f ? '#7c6aff' : 'rgba(255,255,255,0.1)', background: filter === f ? 'rgba(124,106,255,0.12)' : 'rgba(255,255,255,0.04)', color: filter === f ? '#a78bfa' : '#9ca3af' }}>
                {f === 'all' ? 'All' : f === 'joined' ? '✓ Joined' : '🔥 Trending'}
              </button>
            ))}
          </div>
        </div>

        {/* Stats bar */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginBottom: '28px' }}>
          {[{ label: 'Total Communities', value: '1,240+', icon: '🌐' }, { label: 'Active Members', value: '2.4M+', icon: '👥' }, { label: 'Posts Today', value: '48.2k', icon: '📝' }].map(s => (
            <div key={s.label} style={{ background: '#111118', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '14px', padding: '16px', display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={{ fontSize: '24px' }}>{s.icon}</span>
              <div>
                <div style={{ fontSize: '20px', fontWeight: 800 }}>{s.value}</div>
                <div style={{ fontSize: '12px', color: '#6b7280' }}>{s.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Communities grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '14px' }}>
          {filtered.map((c, i) => (
            <motion.div key={c.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07 }}
              whileHover={{ y: -3, boxShadow: '0 12px 40px rgba(0,0,0,0.4)' }}
              style={{ background: '#111118', border: `1px solid ${joined.includes(c.id) ? 'rgba(52,211,153,0.2)' : 'rgba(255,255,255,0.07)'}`, borderRadius: '18px', padding: '20px', cursor: 'pointer', transition: 'all 0.25s' }}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', marginBottom: '12px' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: `${c.color}20`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', flexShrink: 0 }}>{c.icon}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontWeight: 700, fontSize: '15px' }}>{c.name}</span>
                    {c.trending && <span style={{ fontSize: '10px', padding: '2px 8px', borderRadius: '20px', background: 'rgba(251,191,36,0.1)', color: '#fbbf24', fontWeight: 600 }}>🔥 HOT</span>}
                  </div>
                  <div style={{ fontSize: '12px', color: '#6b7280', marginTop: '2px' }}>
                    {c.members} members · <span style={{ color: '#34d399' }}>● {c.online} online</span>
                  </div>
                </div>
              </div>
              <p style={{ fontSize: '13px', color: '#9ca3af', lineHeight: 1.6, marginBottom: '16px' }}>{c.desc}</p>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', gap: '-8px' }}>
                  {['#7c3aed', '#0891b2', '#d97706'].map((g, idx) => (
                    <div key={idx} style={{ width: '24px', height: '24px', borderRadius: '50%', background: g, border: '2px solid #111118', marginLeft: idx > 0 ? '-8px' : '0' }} />
                  ))}
                  <span style={{ fontSize: '11px', color: '#6b7280', marginLeft: '8px', alignSelf: 'center' }}>+{c.members} joined</span>
                </div>
                <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                  onClick={() => toggleJoin(c.id)}
                  style={{ padding: '7px 18px', borderRadius: '20px', border: `1px solid ${joined.includes(c.id) ? '#34d399' : c.color}`, background: joined.includes(c.id) ? 'rgba(52,211,153,0.1)' : `${c.color}15`, color: joined.includes(c.id) ? '#34d399' : c.color, fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}>
                  {joined.includes(c.id) ? '✓ Joined' : 'Join'}
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}