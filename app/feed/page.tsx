'use client'
import { motion } from 'framer-motion'
import { useState } from 'react'

const posts = [
  { id: 1, author: 'Sarah R.', handle: 'sarahbuilds', avatar: 'SR', gradient: 'linear-gradient(135deg,#7c3aed,#2563eb)', community: 'WebDev', time: '2h ago', content: 'Just shipped NEXUS v2.0 with real-time collaborative spaces! The tech stack: Next.js 14 + Supabase Realtime + Redis for pub/sub. Performance is insane — <80ms latency globally 🚀', likes: 284, comments: 47, shares: 120 },
  { id: 2, author: 'Marcus K.', handle: 'marcusdesigns', avatar: 'MK', gradient: 'linear-gradient(135deg,#0891b2,#0d9488)', community: 'Design', time: '5h ago', content: 'Hot take: dark mode-first design is 2024\'s most underrated practice. Your design system should default to dark. Here\'s why the contrast ratios work better and user retention spikes 34% 📊', likes: 156, comments: 93, shares: 67 },
  { id: 3, author: 'Priya J.', handle: 'priyabuilds', avatar: 'PJ', gradient: 'linear-gradient(135deg,#d97706,#b45309)', community: 'AI/ML', time: '8h ago', content: 'We just open-sourced our AI content moderation layer for community platforms. Built with Claude + vector search. Zero false positives in 3 months of production 🔥', likes: 512, comments: 128, shares: 340 },
  { id: 4, author: 'Raj K.', handle: 'rajkumar', avatar: 'RK', gradient: 'linear-gradient(135deg,#059669,#047857)', community: 'IndieHacking', time: '1d ago', content: 'Hit $10k MRR today with my SaaS! 18 months of grinding, 3 pivots, countless rejections. Here\'s everything I learned building in public 🧵', likes: 892, comments: 234, shares: 567 },
]

export default function FeedPage() {
  const [likedPosts, setLikedPosts] = useState<number[]>([])
  const [saved, setSaved] = useState<number[]>([])
  const [activeTab, setActiveTab] = useState('for-you')
  const [postText, setPostText] = useState('')

  const toggleLike = (id: number) => setLikedPosts(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id])
  const toggleSave = (id: number) => setSaved(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id])

  return (
    <div style={{ minHeight: '100vh', background: '#09090f', color: '#f1f0ff' }}>

      {/* Navbar */}
      <nav style={{ position: 'sticky', top: 0, zIndex: 100, background: 'rgba(9,9,15,0.85)', backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(255,255,255,0.07)', padding: '0 24px', display: 'flex', alignItems: 'center', height: '56px', gap: '24px' }}>
        <div style={{ fontFamily: 'sans-serif', fontSize: '20px', fontWeight: 900, background: 'linear-gradient(135deg, #a78bfa, #38bdf8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>NEXUS</div>
        <div style={{ display: 'flex', gap: '4px', flex: 1 }}>
          {['Feed', 'Communities', 'Messages', 'Profile'].map(tab => (
            <a key={tab} href={`/${tab.toLowerCase()}`} style={{ padding: '6px 14px', borderRadius: '8px', fontSize: '13px', fontWeight: 500, color: tab === 'Feed' ? '#a78bfa' : '#6b7280', background: tab === 'Feed' ? 'rgba(124,106,255,0.12)' : 'none', textDecoration: 'none', transition: 'all 0.2s' }}>{tab}</a>
          ))}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ position: 'relative' }}>
            <input placeholder="Search NEXUS..." style={{ background: '#1a1a24', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '10px', padding: '6px 12px 6px 30px', fontSize: '13px', color: '#f1f0ff', outline: 'none', width: '180px' }} />
            <span style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', fontSize: '11px' }}>🔍</span>
          </div>
          <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'linear-gradient(135deg, #7c6aff, #38bdf8)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '12px', cursor: 'pointer' }}>AK</div>
        </div>
      </nav>

      {/* Main layout */}
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '24px 16px', display: 'grid', gridTemplateColumns: '220px 1fr 280px', gap: '16px' }}>

        {/* Sidebar */}
        <aside>
          <div style={{ background: '#111118', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '16px', padding: '16px', marginBottom: '12px' }}>
            <p style={{ fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px', color: '#6b7280', marginBottom: '12px' }}>Navigate</p>
            {[{ icon: '🏠', label: 'Home Feed', active: true }, { icon: '🌐', label: 'Communities' }, { icon: '💬', label: 'Messages' }, { icon: '🔖', label: 'Saved' }, { icon: '📈', label: 'Analytics' }].map(item => (
              <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 10px', borderRadius: '10px', marginBottom: '2px', background: item.active ? 'rgba(124,106,255,0.12)' : 'none', color: item.active ? '#a78bfa' : '#9ca3af', cursor: 'pointer', fontSize: '14px' }}>
                <span style={{ width: '28px', height: '28px', background: '#1a1a24', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px' }}>{item.icon}</span>
                {item.label}
              </div>
            ))}
          </div>
          <div style={{ background: '#111118', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '16px', padding: '16px', marginBottom: '12px' }}>
            <p style={{ fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px', color: '#6b7280', marginBottom: '12px' }}>My Communities</p>
            {[{ color: '#a78bfa', name: 'WebDev', count: 12 }, { color: '#38bdf8', name: 'Design' }, { color: '#34d399', name: 'IndieHackers' }, { color: '#fbbf24', name: 'AI_Builders', count: 3 }].map(c => (
              <div key={c.name} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '6px 8px', borderRadius: '8px', color: '#9ca3af', fontSize: '13px', cursor: 'pointer', marginBottom: '2px' }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: c.color, flexShrink: 0 }} />
                r/{c.name}
                {c.count && <span style={{ marginLeft: 'auto', background: '#7c6aff', color: 'white', fontSize: '10px', fontWeight: 700, padding: '1px 6px', borderRadius: '20px' }}>{c.count}</span>}
              </div>
            ))}
          </div>
          <div style={{ background: 'linear-gradient(135deg, rgba(124,106,255,0.12), rgba(56,189,248,0.08))', border: '1px solid rgba(124,106,255,0.3)', borderRadius: '16px', padding: '16px' }}>
            <p style={{ fontWeight: 700, fontSize: '13px', marginBottom: '6px' }}>Go Premium ✦</p>
            <p style={{ fontSize: '12px', color: '#9ca3af', marginBottom: '12px', lineHeight: 1.5 }}>Unlock AI features, analytics & no ads</p>
            <button style={{ width: '100%', padding: '8px', borderRadius: '10px', background: 'linear-gradient(135deg, #7c6aff, #6366f1)', border: 'none', color: 'white', fontWeight: 700, fontSize: '12px', cursor: 'pointer' }}>Upgrade</button>
          </div>
        </aside>

        {/* Feed */}
        <main style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>

          {/* Tabs */}
          <div style={{ display: 'flex', gap: '4px', background: '#111118', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '12px', padding: '4px' }}>
            {['for-you', 'following', 'trending', 'ai-curated'].map(tab => (
              <button key={tab} onClick={() => setActiveTab(tab)}
                style={{ flex: 1, padding: '7px 12px', borderRadius: '8px', fontSize: '13px', fontWeight: 500, cursor: 'pointer', border: 'none', background: activeTab === tab ? 'rgba(124,106,255,0.15)' : 'none', color: activeTab === tab ? '#a78bfa' : '#6b7280', transition: 'all 0.2s' }}>
                {tab === 'for-you' ? '✦ For You' : tab === 'following' ? 'Following' : tab === 'trending' ? '🔥 Trending' : '✨ AI Curated'}
              </button>
            ))}
          </div>

          {/* Compose */}
          <div style={{ background: '#111118', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '16px', padding: '16px' }}>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'linear-gradient(135deg, #7c6aff, #38bdf8)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '14px', flexShrink: 0 }}>AK</div>
              <textarea value={postText} onChange={e => setPostText(e.target.value)} placeholder="What's on your mind? Share with your communities..."
                rows={postText ? 3 : 1}
                style={{ flex: 1, background: '#1a1a24', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', padding: '10px 14px', fontSize: '14px', color: '#d1d5db', outline: 'none', resize: 'none', fontFamily: 'sans-serif' }} />
            </div>
            {postText && (
              <div style={{ display: 'flex', gap: '8px', marginTop: '10px', marginLeft: '52px', alignItems: 'center' }}>
                {['🖼️ Photo', '📊 Poll', '🔗 Link'].map(btn => (
                  <button key={btn} style={{ padding: '5px 12px', borderRadius: '8px', fontSize: '12px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.04)', color: '#9ca3af', cursor: 'pointer' }}>{btn}</button>
                ))}
                <button onClick={() => setPostText('')} style={{ marginLeft: 'auto', padding: '6px 18px', borderRadius: '10px', background: 'linear-gradient(135deg, #7c6aff, #6366f1)', border: 'none', color: 'white', fontWeight: 700, fontSize: '13px', cursor: 'pointer' }}>Post →</button>
              </div>
            )}
          </div>

          {/* Posts */}
          {posts.map((post, i) => (
            <motion.div key={post.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -2, boxShadow: '0 8px 32px rgba(0,0,0,0.4)' }}
              style={{ background: '#111118', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '16px', padding: '16px', cursor: 'pointer', transition: 'border-color 0.2s' }}
            >
              <span style={{ display: 'inline-flex', alignItems: 'center', fontSize: '11px', fontWeight: 600, padding: '2px 10px', borderRadius: '20px', background: 'rgba(124,106,255,0.1)', color: '#a78bfa', marginBottom: '10px' }}>🌐 r/{post.community}</span>
              <div style={{ display: 'flex', gap: '10px', marginBottom: '12px' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: post.gradient, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '14px', flexShrink: 0 }}>{post.avatar}</div>
                <div>
                  <div style={{ fontWeight: 600, fontSize: '14px' }}>{post.author}</div>
                  <div style={{ fontSize: '12px', color: '#6b7280' }}>@{post.handle} · {post.time}</div>
                </div>
              </div>
              <p style={{ fontSize: '14px', lineHeight: 1.65, color: '#d1d5db', marginBottom: '14px' }}>{post.content}</p>
              <div style={{ display: 'flex', gap: '4px', paddingTop: '12px', borderTop: '1px solid rgba(255,255,255,0.07)' }}>
                <button onClick={() => toggleLike(post.id)} style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '5px 10px', borderRadius: '8px', border: 'none', background: 'none', color: likedPosts.includes(post.id) ? '#f87171' : '#6b7280', fontSize: '13px', cursor: 'pointer' }}>
                  {likedPosts.includes(post.id) ? '♥' : '♡'} {post.likes + (likedPosts.includes(post.id) ? 1 : 0)}
                </button>
                <button style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '5px 10px', borderRadius: '8px', border: 'none', background: 'none', color: '#6b7280', fontSize: '13px', cursor: 'pointer' }}>💬 {post.comments}</button>
                <button style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '5px 10px', borderRadius: '8px', border: 'none', background: 'none', color: '#6b7280', fontSize: '13px', cursor: 'pointer' }}>↗ {post.shares}</button>
                <button onClick={() => toggleSave(post.id)} style={{ marginLeft: 'auto', padding: '5px 10px', borderRadius: '8px', border: 'none', background: 'none', color: saved.includes(post.id) ? '#a78bfa' : '#6b7280', fontSize: '13px', cursor: 'pointer' }}>🔖</button>
              </div>
            </motion.div>
          ))}
        </main>

        {/* Right panel */}
        <aside>
          <div style={{ background: '#111118', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '16px', padding: '16px', marginBottom: '12px' }}>
            <h3 style={{ fontSize: '15px', fontWeight: 700, marginBottom: '14px' }}>🔥 Trending</h3>
            {['#ReactConf2025', '#FullStackLaunch', '#IndieHackers', '#OpenSource'].map((tag, i) => (
              <div key={tag} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 0', borderBottom: '1px solid rgba(255,255,255,0.05)', cursor: 'pointer' }}>
                <span style={{ fontSize: '12px', color: '#6b7280', width: '16px' }}>{i + 1}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '13px', fontWeight: 600 }}>{tag}</div>
                  <div style={{ fontSize: '11px', color: '#6b7280' }}>{[24.3, 18.7, 12.1, 9.8][i]}k posts</div>
                </div>
                <span style={{ fontSize: '12px', color: '#34d399' }}>↑</span>
              </div>
            ))}
          </div>

          <div style={{ background: '#111118', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '16px', padding: '16px' }}>
            <h3 style={{ fontSize: '15px', fontWeight: 700, marginBottom: '14px' }}>✦ Who to Follow</h3>
            {[{ name: 'Tanvir N.', bio: 'Senior @Vercel', g: 'linear-gradient(135deg,#7c3aed,#2563eb)' }, { name: 'Ana Lima', bio: 'Design @Figma', g: 'linear-gradient(135deg,#0891b2,#0d9488)' }, { name: 'Raj Kumar', bio: 'Founder @IndieHQ', g: 'linear-gradient(135deg,#d97706,#b45309)' }].map(u => (
              <SuggestUser key={u.name} {...u} />
            ))}
          </div>
        </aside>
      </div>
    </div>
  )
}

function SuggestUser({ name, bio, g }: { name: string, bio: string, g: string }) {
  const [following, setFollowing] = useState(false)
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
      <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: g, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '12px', flexShrink: 0 }}>{name.charAt(0)}</div>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: '13px', fontWeight: 600 }}>{name}</div>
        <div style={{ fontSize: '11px', color: '#6b7280' }}>{bio}</div>
      </div>
      <button onClick={() => setFollowing(!following)}
        style={{ padding: '4px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: 600, cursor: 'pointer', border: `1px solid ${following ? '#34d399' : '#7c6aff'}`, background: following ? 'rgba(52,211,153,0.1)' : 'rgba(124,106,255,0.08)', color: following ? '#34d399' : '#a78bfa' }}>
        {following ? 'Following' : 'Follow'}
      </button>
    </div>
  )
}