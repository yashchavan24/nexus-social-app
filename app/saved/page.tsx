'use client'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { signOut, useSession } from 'next-auth/react'

const savedPosts = [
  { id: 1, author: 'Sarah R.', handle: 'sarahbuilds', avatar: 'SR', gradient: 'linear-gradient(135deg,#7c3aed,#2563eb)', community: 'WebDev', time: '2h ago', content: 'Just shipped NEXUS v2.0 with real-time collaborative spaces! Next.js 14 + Supabase Realtime + Redis. Getting <80ms latency globally 🚀', likes: 284, savedOn: 'Today', category: 'Tech' },
  { id: 2, author: 'Priya J.', handle: 'priyabuilds', avatar: 'PJ', gradient: 'linear-gradient(135deg,#d97706,#b45309)', community: 'AI/ML', time: '8h ago', content: 'We just open-sourced our AI content moderation layer! Built with Claude + vector search. Zero false positives in 3 months 🔥', likes: 512, savedOn: 'Today', category: 'AI' },
  { id: 3, author: 'Raj K.', handle: 'rajkumar', avatar: 'RK', gradient: 'linear-gradient(135deg,#059669,#047857)', community: 'IndieHacking', time: '1d ago', content: 'Hit $10k MRR today! 18 months of grinding, 3 pivots, countless rejections. Everything I learned building in public 🧵', likes: 892, savedOn: 'Yesterday', category: 'Business' },
  { id: 4, author: 'Marcus K.', handle: 'marcusdesigns', avatar: 'MK', gradient: 'linear-gradient(135deg,#0891b2,#0d9488)', community: 'Design', time: '2d ago', content: 'Dark mode-first design is 2025\'s most underrated practice. Your design system should default to dark. User retention spikes 34% 📊', likes: 156, savedOn: 'This week', category: 'Design' },
]

const categories = ['All', 'Tech', 'AI', 'Design', 'Business']

export default function SavedPage() {
  const { data: session } = useSession()
  const [saved, setSaved] = useState(savedPosts)
  const [activeCategory, setActiveCategory] = useState('All')
  const [search, setSearch] = useState('')

  const userInitial = session?.user?.name?.charAt(0) || 'U'

  const filtered = saved.filter(p =>
    (activeCategory === 'All' || p.category === activeCategory) &&
    p.content.toLowerCase().includes(search.toLowerCase())
  )

  const removeFromSaved = (id: number) => setSaved(prev => prev.filter(p => p.id !== id))

  return (
    <div style={{ minHeight: '100vh', background: '#09090f', color: '#f1f0ff' }}>
      <nav style={{ position: 'sticky', top: 0, zIndex: 100, background: 'rgba(9,9,15,0.85)', backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(255,255,255,0.07)', padding: '0 24px', display: 'flex', alignItems: 'center', height: '56px', gap: '24px' }}>
        <a href="/feed" style={{ fontSize: '20px', fontWeight: 900, background: 'linear-gradient(135deg, #a78bfa, #38bdf8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', textDecoration: 'none' }}>NEXUS</a>
        <div style={{ display: 'flex', gap: '4px', flex: 1 }}>
          {['Feed', 'Communities', 'Messages', 'Profile'].map(tab => (
            <a key={tab} href={`/${tab.toLowerCase()}`} style={{ padding: '6px 14px', borderRadius: '8px', fontSize: '13px', fontWeight: 500, color: '#6b7280', textDecoration: 'none' }}>{tab}</a>
          ))}
        </div>
        <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'linear-gradient(135deg, #7c6aff, #38bdf8)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '12px' }}>{userInitial}</div>
        <button onClick={() => signOut({ callbackUrl: '/login' })} style={{ padding: '6px 12px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.05)', color: '#9ca3af', fontSize: '12px', cursor: 'pointer' }}>Logout</button>
      </nav>

      <div style={{ maxWidth: '720px', margin: '0 auto', padding: '32px 16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
          <h1 style={{ fontSize: '26px', fontWeight: 900, margin: 0 }}>🔖 Saved Posts</h1>
          <span style={{ fontSize: '13px', color: '#6b7280', background: '#111118', border: '1px solid rgba(255,255,255,0.07)', padding: '4px 12px', borderRadius: '20px' }}>{filtered.length} posts</span>
        </div>
        <p style={{ color: '#6b7280', fontSize: '14px', marginBottom: '24px' }}>Posts you've bookmarked for later</p>

        {/* Search */}
        <div style={{ position: 'relative', marginBottom: '16px' }}>
          <span style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }}>🔍</span>
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search saved posts..."
            style={{ width: '100%', background: '#111118', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', padding: '10px 14px 10px 36px', fontSize: '14px', color: '#f1f0ff', outline: 'none', boxSizing: 'border-box' }} />
        </div>

        {/* Category filter */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '20px', flexWrap: 'wrap' }}>
          {categories.map(cat => (
            <button key={cat} onClick={() => setActiveCategory(cat)}
              style={{ padding: '6px 16px', borderRadius: '20px', border: '1px solid', fontSize: '13px', fontWeight: 500, cursor: 'pointer', borderColor: activeCategory === cat ? '#7c6aff' : 'rgba(255,255,255,0.1)', background: activeCategory === cat ? 'rgba(124,106,255,0.12)' : 'rgba(255,255,255,0.04)', color: activeCategory === cat ? '#a78bfa' : '#9ca3af' }}>
              {cat}
            </button>
          ))}
        </div>

        {/* Posts */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {filtered.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px', color: '#6b7280', background: '#111118', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '16px' }}>
              <div style={{ fontSize: '48px', marginBottom: '12px' }}>🔖</div>
              <p style={{ fontSize: '16px', fontWeight: 600, marginBottom: '4px' }}>No saved posts yet</p>
              <p style={{ fontSize: '13px' }}>Bookmark posts from your feed to read them later</p>
              <a href="/feed" style={{ display: 'inline-block', marginTop: '16px', padding: '8px 20px', borderRadius: '10px', background: 'linear-gradient(135deg, #7c6aff, #6366f1)', color: 'white', textDecoration: 'none', fontWeight: 600, fontSize: '13px' }}>Browse Feed →</a>
            </div>
          ) : filtered.map((post, i) => (
            <motion.div key={post.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              exit={{ opacity: 0, x: -20 }}
              style={{ background: '#111118', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '16px', padding: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: post.gradient, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '14px', flexShrink: 0 }}>{post.avatar}</div>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: '14px' }}>{post.author}</div>
                    <div style={{ fontSize: '12px', color: '#6b7280' }}>@{post.handle} · r/{post.community}</div>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                  <span style={{ fontSize: '11px', color: '#6b7280', background: '#1a1a24', padding: '3px 8px', borderRadius: '6px' }}>{post.savedOn}</span>
                  <span style={{ fontSize: '11px', color: '#a78bfa', background: 'rgba(124,106,255,0.1)', padding: '3px 8px', borderRadius: '6px' }}>{post.category}</span>
                  <button onClick={() => removeFromSaved(post.id)}
                    style={{ padding: '4px 8px', borderRadius: '6px', border: '1px solid rgba(248,113,113,0.2)', background: 'rgba(248,113,113,0.08)', color: '#f87171', fontSize: '11px', cursor: 'pointer' }}>
                    Remove
                  </button>
                </div>
              </div>
              <p style={{ fontSize: '14px', color: '#d1d5db', lineHeight: 1.65, marginBottom: '12px' }}>{post.content}</p>
              <div style={{ display: 'flex', gap: '12px' }}>
                <span style={{ fontSize: '12px', color: '#6b7280' }}>♥ {post.likes}</span>
                <a href="/feed" style={{ fontSize: '12px', color: '#a78bfa', textDecoration: 'none' }}>View full post →</a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}