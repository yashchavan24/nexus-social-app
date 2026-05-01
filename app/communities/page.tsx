'use client'
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'

const initialCommunities = [
  { id: 1, name: 'WebDev Central', slug: 'webdev', icon: '🌐', color: '#a78bfa', members: '142k', online: '2.4k', desc: 'Everything web development — frontend, backend, devops, and everything in between.', trending: true, joined: false },
  { id: 2, name: 'Design Systems', slug: 'design', icon: '🎨', color: '#38bdf8', members: '89k', online: '1.1k', desc: 'Share your design tokens, component libraries, and accessibility guides.', joined: true },
  { id: 3, name: 'AI Builders', slug: 'ai', icon: '🤖', color: '#fbbf24', members: '201k', online: '5.7k', desc: 'Build and ship AI-powered products. Share prompts, evals, and deployment tips.', trending: true, joined: false },
  { id: 4, name: 'Indie Hackers', slug: 'indie', icon: '💡', color: '#34d399', members: '67k', online: '890', desc: 'Bootstrapped founders sharing revenue, failures, and lessons from building in public.', joined: true },
  { id: 5, name: 'Open Source', slug: 'opensource', icon: '🔓', color: '#f87171', members: '310k', online: '8.2k', desc: 'Contribute, discover, and celebrate open source projects from around the world.', joined: false },
  { id: 6, name: 'DevOps & Cloud', slug: 'devops', icon: '☁️', color: '#818cf8', members: '95k', online: '1.8k', desc: 'CI/CD, containers, Kubernetes, AWS, GCP, Azure — everything infrastructure.', joined: false },
]

const communityMessages: Record<string, { author: string; text: string; time: string; avatar: string }[]> = {
  design: [
    { author: 'Ana Lima', text: 'Just released our new color system! Dark mode tokens are chef\'s kiss 🎨', time: '2m ago', avatar: 'AL' },
    { author: 'Marcus K.', text: 'Love the contrast ratios! WCAG AAA compliant?', time: '5m ago', avatar: 'MK' },
    { author: 'Sarah R.', text: 'Yes! Fully accessible and tested across 12 browsers 🙌', time: '8m ago', avatar: 'SR' },
  ],
  indie: [
    { author: 'Raj K.', text: 'Hit $10k MRR today! 18 months of grinding 🎉', time: '1m ago', avatar: 'RK' },
    { author: 'Priya J.', text: 'LETS GOOO!! Congrats! What was the breakthrough?', time: '3m ago', avatar: 'PJ' },
    { author: 'Raj K.', text: 'Honestly — just shipped consistently every week. No magic formula 🚀', time: '5m ago', avatar: 'RK' },
  ],
}

export default function CommunitiesPage() {
  const [communities, setCommunities] = useState(initialCommunities)
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('all')
  const [showCreate, setShowCreate] = useState(false)
  const [activeCommunity, setActiveCommunity] = useState<typeof initialCommunities[0] | null>(null)
  const [newMsg, setNewMsg] = useState('')
  const [messages, setMessages] = useState(communityMessages)
  const [newCommunity, setNewCommunity] = useState({ name: '', slug: '', desc: '', icon: '🌐' })

  const icons = ['🌐', '🎨', '🤖', '💡', '🔓', '☁️', '📱', '⛓️', '🎮', '🔬', '📊', '🎵']

  const filtered = communities.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) &&
    (filter === 'all' || (filter === 'joined' && c.joined) || (filter === 'trending' && c.trending))
  )

  const toggleJoin = (id: number) => {
    setCommunities(prev => prev.map(c => c.id === id ? { ...c, joined: !c.joined } : c))
  }

  const handleCreateCommunity = () => {
    if (!newCommunity.name.trim()) return
    const created = {
      id: Date.now(),
      name: newCommunity.name,
      slug: newCommunity.name.toLowerCase().replace(/\s+/g, '-'),
      icon: newCommunity.icon,
      color: '#a78bfa',
      members: '1',
      online: '1',
      desc: newCommunity.desc || 'A new community',
      joined: true,
    }
    setCommunities(prev => [created, ...prev])
    setNewCommunity({ name: '', slug: '', desc: '', icon: '🌐' })
    setShowCreate(false)
  }

  const sendMessage = () => {
    if (!newMsg.trim() || !activeCommunity) return
    const slug = activeCommunity.slug
    setMessages(prev => ({
      ...prev,
      [slug]: [...(prev[slug] || []), { author: 'You', text: newMsg, time: 'Just now', avatar: 'TC' }]
    }))
    setNewMsg('')
  }

  return (
    <div style={{ minHeight: '100vh', background: '#09090f', color: '#f1f0ff' }}>

      {/* Navbar */}
      <nav style={{ position: 'sticky', top: 0, zIndex: 100, background: 'rgba(9,9,15,0.85)', backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(255,255,255,0.07)', padding: '0 24px', display: 'flex', alignItems: 'center', height: '56px', gap: '24px' }}>
        <a href="/feed" style={{ fontSize: '20px', fontWeight: 900, background: 'linear-gradient(135deg, #a78bfa, #38bdf8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', textDecoration: 'none' }}>NEXUS</a>
        <div style={{ display: 'flex', gap: '4px', flex: 1 }}>
          {['Feed', 'Communities', 'Messages', 'Profile'].map(tab => (
            <a key={tab} href={`/${tab.toLowerCase()}`} style={{ padding: '6px 14px', borderRadius: '8px', fontSize: '13px', fontWeight: 500, color: tab === 'Communities' ? '#a78bfa' : '#6b7280', background: tab === 'Communities' ? 'rgba(124,106,255,0.12)' : 'none', textDecoration: 'none' }}>{tab}</a>
          ))}
        </div>
      </nav>

      {/* Community Chat Modal */}
      <AnimatePresence>
        {activeCommunity && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }}>
            <motion.div initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95 }}
              style={{ background: '#111118', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '20px', width: '100%', maxWidth: '600px', height: '500px', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>

              {/* Chat header */}
              <div style={{ padding: '16px 20px', borderBottom: '1px solid rgba(255,255,255,0.07)', display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: `${activeCommunity.color}20`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px' }}>{activeCommunity.icon}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700, fontSize: '15px' }}>r/{activeCommunity.name}</div>
                  <div style={{ fontSize: '12px', color: '#34d399' }}>● {activeCommunity.online} online</div>
                </div>
                <button onClick={() => setActiveCommunity(null)}
                  style={{ padding: '6px 12px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.05)', color: '#9ca3af', fontSize: '13px', cursor: 'pointer' }}>✕ Close</button>
              </div>

              {/* Messages */}
              <div style={{ flex: 1, overflowY: 'auto', padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {(messages[activeCommunity.slug] || []).length === 0 ? (
                  <div style={{ textAlign: 'center', color: '#6b7280', padding: '40px' }}>
                    <div style={{ fontSize: '40px', marginBottom: '8px' }}>👋</div>
                    <p>Be the first to say something in r/{activeCommunity.name}!</p>
                  </div>
                ) : (
                  (messages[activeCommunity.slug] || []).map((msg, i) => (
                    <motion.div key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                      style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                      <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'linear-gradient(135deg, #7c6aff, #38bdf8)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: 700, flexShrink: 0 }}>{msg.avatar}</div>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                          <span style={{ fontWeight: 600, fontSize: '13px' }}>{msg.author}</span>
                          <span style={{ fontSize: '11px', color: '#6b7280' }}>{msg.time}</span>
                        </div>
                        <div style={{ background: '#1a1a24', borderRadius: '4px 12px 12px 12px', padding: '8px 12px', fontSize: '13px', color: '#d1d5db', lineHeight: 1.5 }}>{msg.text}</div>
                      </div>
                    </motion.div>
                  ))
                )}
              </div>

              {/* Input */}
              <div style={{ padding: '12px 16px', borderTop: '1px solid rgba(255,255,255,0.07)', display: 'flex', gap: '8px' }}>
                <input value={newMsg} onChange={e => setNewMsg(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && sendMessage()}
                  placeholder={`Message r/${activeCommunity.name}...`}
                  style={{ flex: 1, background: '#1a1a24', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', padding: '10px 14px', fontSize: '13px', color: '#f1f0ff', outline: 'none' }} />
                <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={sendMessage}
                  style={{ padding: '10px 16px', borderRadius: '10px', background: 'linear-gradient(135deg, #7c6aff, #6366f1)', border: 'none', color: 'white', fontWeight: 700, fontSize: '13px', cursor: 'pointer' }}>Send →</motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Create Community Modal */}
      <AnimatePresence>
        {showCreate && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }}>
            <motion.div initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95 }}
              style={{ background: '#111118', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '20px', padding: '28px', width: '100%', maxWidth: '480px' }}>
              <h2 style={{ fontSize: '20px', fontWeight: 800, marginBottom: '6px' }}>Create Community</h2>
              <p style={{ color: '#6b7280', fontSize: '13px', marginBottom: '20px' }}>Build your own space for people who share your interests</p>

              {/* Icon picker */}
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '8px' }}>Pick an Icon</label>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {icons.map(icon => (
                    <button key={icon} onClick={() => setNewCommunity(p => ({ ...p, icon }))}
                      style={{ width: '40px', height: '40px', borderRadius: '10px', border: `2px solid ${newCommunity.icon === icon ? '#7c6aff' : 'rgba(255,255,255,0.1)'}`, background: newCommunity.icon === icon ? 'rgba(124,106,255,0.15)' : 'rgba(255,255,255,0.04)', fontSize: '18px', cursor: 'pointer' }}>
                      {icon}
                    </button>
                  ))}
                </div>
              </div>

              {[
                { label: 'Community Name', key: 'name', placeholder: 'e.g. React Developers' },
                { label: 'Description', key: 'desc', placeholder: 'What is this community about?' },
              ].map(f => (
                <div key={f.key} style={{ marginBottom: '14px' }}>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '6px' }}>{f.label}</label>
                  <input value={newCommunity[f.key as keyof typeof newCommunity]}
                    onChange={e => setNewCommunity(p => ({ ...p, [f.key]: e.target.value }))}
                    placeholder={f.placeholder}
                    style={{ width: '100%', background: '#1a1a24', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', padding: '10px 14px', fontSize: '14px', color: '#f1f0ff', outline: 'none', boxSizing: 'border-box' }} />
                </div>
              ))}

              <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
                <button onClick={() => setShowCreate(false)}
                  style={{ flex: 1, padding: '10px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.05)', color: '#9ca3af', fontSize: '14px', cursor: 'pointer' }}>Cancel</button>
                <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                  onClick={handleCreateCommunity}
                  style={{ flex: 1, padding: '10px', borderRadius: '10px', background: 'linear-gradient(135deg, #7c6aff, #6366f1)', border: 'none', color: 'white', fontSize: '14px', fontWeight: 700, cursor: 'pointer' }}>
                  Create Community 🚀
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '32px 16px' }}>

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
          <div>
            <h1 style={{ fontSize: '28px', fontWeight: 900, margin: 0 }}>Explore Communities</h1>
            <p style={{ color: '#6b7280', fontSize: '14px', marginTop: '4px' }}>Find your people. Join conversations that matter.</p>
          </div>
          <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
            onClick={() => setShowCreate(true)}
            style={{ padding: '10px 20px', borderRadius: '12px', background: 'linear-gradient(135deg, #7c6aff, #6366f1)', border: 'none', color: 'white', fontWeight: 700, fontSize: '14px', cursor: 'pointer' }}>
            + Create Community
          </motion.button>
        </div>

        {/* Search + Filter */}
        <div style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
          <div style={{ position: 'relative', flex: 1 }}>
            <span style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }}>🔍</span>
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

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginBottom: '28px' }}>
          {[{ label: 'Total Communities', value: `${communities.length}+`, icon: '🌐' }, { label: 'Active Members', value: '2.4M+', icon: '👥' }, { label: 'Posts Today', value: '48.2k', icon: '📝' }].map(s => (
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
              whileHover={{ y: -3 }}
              style={{ background: '#111118', border: `1px solid ${c.joined ? 'rgba(52,211,153,0.2)' : 'rgba(255,255,255,0.07)'}`, borderRadius: '18px', padding: '20px', cursor: 'pointer', transition: 'all 0.25s' }}
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
                {c.joined ? (
                  <button onClick={() => setActiveCommunity(c)}
                    style={{ padding: '6px 14px', borderRadius: '8px', border: '1px solid rgba(56,189,248,0.3)', background: 'rgba(56,189,248,0.08)', color: '#38bdf8', fontSize: '12px', fontWeight: 600, cursor: 'pointer' }}>
                    💬 Open Chat
                  </button>
                ) : <div />}
                <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                  onClick={() => toggleJoin(c.id)}
                  style={{ padding: '7px 18px', borderRadius: '20px', border: `1px solid ${c.joined ? '#34d399' : c.color}`, background: c.joined ? 'rgba(52,211,153,0.1)' : `${c.color}15`, color: c.joined ? '#34d399' : c.color, fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}>
                  {c.joined ? '✓ Joined' : 'Join'}
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}