'use client'
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { signOut, useSession } from 'next-auth/react'

const allPosts = {
  'for-you': [
    { id: 1, author: 'Sarah R.', handle: 'sarahbuilds', avatar: 'SR', gradient: 'linear-gradient(135deg,#7c3aed,#2563eb)', community: 'WebDev', time: '2h ago', content: 'Just shipped NEXUS v2.0 with real-time collaborative spaces! Next.js 14 + Supabase Realtime + Redis. Getting <80ms latency globally 🚀', likes: 284, comments: 47, shares: 120 },
    { id: 2, author: 'Marcus K.', handle: 'marcusdesigns', avatar: 'MK', gradient: 'linear-gradient(135deg,#0891b2,#0d9488)', community: 'Design', time: '5h ago', content: 'Hot take: dark mode-first design is 2025\'s most underrated practice. Your design system should default to dark. User retention spikes 34% 📊', likes: 156, comments: 93, shares: 67 },
    { id: 3, author: 'Priya J.', handle: 'priyabuilds', avatar: 'PJ', gradient: 'linear-gradient(135deg,#d97706,#b45309)', community: 'AI/ML', time: '8h ago', content: 'We just open-sourced our AI content moderation layer. Built with Claude + vector search. Zero false positives in 3 months of production 🔥', likes: 512, comments: 128, shares: 340 },
    { id: 4, author: 'Raj K.', handle: 'rajkumar', avatar: 'RK', gradient: 'linear-gradient(135deg,#059669,#047857)', community: 'IndieHacking', time: '1d ago', content: 'Hit $10k MRR today! 18 months of grinding, 3 pivots, countless rejections. Here\'s everything I learned building in public 🧵', likes: 892, comments: 234, shares: 567 },
  ],
  'following': [
    { id: 5, author: 'Tanvir N.', handle: 'tanvirdev', avatar: 'TN', gradient: 'linear-gradient(135deg,#7c3aed,#2563eb)', community: 'WebDev', time: '1h ago', content: 'Next.js 15 just dropped and the performance improvements are insane. Server components are 40% faster in our benchmarks. Thread 🧵', likes: 423, comments: 87, shares: 210 },
    { id: 6, author: 'Ana Lima', handle: 'analima', avatar: 'AL', gradient: 'linear-gradient(135deg,#db2777,#9333ea)', community: 'Design', time: '3h ago', content: 'Just released our open source design system — 200+ components, dark mode by default, fully accessible. Link in bio! 🎨', likes: 334, comments: 56, shares: 189 },
  ],
  'trending': [
    { id: 7, author: 'Tech Daily', handle: 'techdaily', avatar: 'TD', gradient: 'linear-gradient(135deg,#ea580c,#dc2626)', community: 'AI/ML', time: '30m ago', content: 'GPT-5 vs Claude 4 benchmark results are in — and the results are SHOCKING. Full comparison thread with real code examples 👇', likes: 2840, comments: 892, shares: 3400 },
    { id: 8, author: 'Dev Weekly', handle: 'devweekly', avatar: 'DW', gradient: 'linear-gradient(135deg,#0284c7,#0891b2)', community: 'WebDev', time: '1h ago', content: 'The State of JavaScript 2025 survey results are out! TypeScript adoption hit 89%. React still #1 but Vue is closing the gap fast 📊', likes: 1560, comments: 430, shares: 2100 },
    { id: 9, author: 'Indie Makers', handle: 'indiemakers', avatar: 'IM', gradient: 'linear-gradient(135deg,#059669,#0d9488)', community: 'IndieHacking', time: '2h ago', content: '🔥 This week\'s indie maker wins: $0 to $50k MRR in 6 months. Here are the 5 strategies that actually worked.', likes: 987, comments: 203, shares: 876 },
  ],
  'ai-curated': [
    { id: 10, author: 'NEXUS AI ✦', handle: 'nexusai', avatar: 'AI', gradient: 'linear-gradient(135deg,#7c6aff,#38bdf8)', community: 'AI/ML', time: 'Just now', content: '✨ Based on your interests in WebDev and AI, here are today\'s top picks curated just for you. You\'ve been active in 4 communities this week!', likes: 0, comments: 0, shares: 0 },
    { id: 11, author: 'Sarah R.', handle: 'sarahbuilds', avatar: 'SR', gradient: 'linear-gradient(135deg,#7c3aed,#2563eb)', community: 'WebDev', time: '4h ago', content: 'AI recommended: This post matches your interest in real-time systems. Supabase just released edge functions with 10ms cold starts globally ⚡', likes: 445, comments: 67, shares: 123 },
  ],
}

export default function FeedPage() {
  const { data: session } = useSession()
  const [activeTab, setActiveTab] = useState('for-you')
  const [likedPosts, setLikedPosts] = useState<number[]>([])
  const [saved, setSaved] = useState<number[]>([])
  const [postText, setPostText] = useState('')
  const [localPosts, setLocalPosts] = useState<any[]>([])

  const currentPosts = [...localPosts, ...(allPosts[activeTab as keyof typeof allPosts] || [])]

  const toggleLike = (id: number) => setLikedPosts(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id])
  const toggleSave = (id: number) => setSaved(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id])

  const handlePost = () => {
    if (!postText.trim()) return
    const newPost = {
      id: Date.now(),
      author: session?.user?.name || 'You',
      handle: session?.user?.email?.split('@')[0] || 'user',
      avatar: session?.user?.name?.charAt(0) || 'U',
      gradient: 'linear-gradient(135deg, #7c6aff, #38bdf8)',
      community: 'General',
      time: 'Just now',
      content: postText,
      likes: 0,
      comments: 0,
      shares: 0,
    }
    setLocalPosts(prev => [newPost, ...prev])
    setPostText('')
  }

  const userInitial = session?.user?.name?.charAt(0) || session?.user?.email?.charAt(0) || 'U'

  return (
    <div style={{ minHeight: '100vh', background: '#09090f', color: '#f1f0ff' }}>

      {/* Navbar */}
      <nav style={{ position: 'sticky', top: 0, zIndex: 100, background: 'rgba(9,9,15,0.85)', backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(255,255,255,0.07)', padding: '0 24px', display: 'flex', alignItems: 'center', height: '56px', gap: '24px' }}>
        <div style={{ fontSize: '20px', fontWeight: 900, background: 'linear-gradient(135deg, #a78bfa, #38bdf8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>NEXUS</div>
        <div style={{ display: 'flex', gap: '4px', flex: 1 }}>
          {['Feed', 'Communities', 'Messages', 'Profile'].map(tab => (
            <a key={tab} href={`/${tab.toLowerCase()}`} style={{ padding: '6px 14px', borderRadius: '8px', fontSize: '13px', fontWeight: 500, color: tab === 'Feed' ? '#a78bfa' : '#6b7280', background: tab === 'Feed' ? 'rgba(124,106,255,0.12)' : 'none', textDecoration: 'none' }}>{tab}</a>
          ))}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ position: 'relative' }}>
            <input placeholder="Search NEXUS..." style={{ background: '#1a1a24', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '10px', padding: '6px 12px 6px 30px', fontSize: '13px', color: '#f1f0ff', outline: 'none', width: '180px' }} />
            <span style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', fontSize: '11px' }}>🔍</span>
          </div>
          <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'linear-gradient(135deg, #7c6aff, #38bdf8)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '12px' }}>
            {userInitial}
          </div>
          <button onClick={() => signOut({ callbackUrl: '/login' })}
            style={{ padding: '6px 12px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.05)', color: '#9ca3af', fontSize: '12px', cursor: 'pointer' }}>
            Logout
          </button>
        </div>
      </nav>

      {/* Main layout */}
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '24px 16px', display: 'grid', gridTemplateColumns: '220px 1fr 280px', gap: '16px' }}>

        {/* Sidebar */}
        <aside>
          <div style={{ background: '#111118', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '16px', padding: '16px', marginBottom: '12px' }}>
            <p style={{ fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px', color: '#6b7280', marginBottom: '12px' }}>Navigate</p>
            {[{ icon: '🏠', label: 'Home Feed', href: '/feed', active: true }, { icon: '🌐', label: 'Communities', href: '/communities' }, { icon: '💬', label: 'Messages', href: '/messages' }, { icon: '🔖', label: 'Saved', href: '#' }, { icon: '📈', label: 'Analytics', href: '#' }].map(item => (
              <a key={item.label} href={item.href} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 10px', borderRadius: '10px', marginBottom: '2px', background: item.active ? 'rgba(124,106,255,0.12)' : 'none', color: item.active ? '#a78bfa' : '#9ca3af', fontSize: '14px', textDecoration: 'none' }}>
                <span style={{ width: '28px', height: '28px', background: '#1a1a24', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{item.icon}</span>
                {item.label}
              </a>
            ))}
          </div>
          <div style={{ background: '#111118', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '16px', padding: '16px', marginBottom: '12px' }}>
            <p style={{ fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px', color: '#6b7280', marginBottom: '12px' }}>My Communities</p>
            {[{ color: '#a78bfa', name: 'WebDev', count: 12 }, { color: '#38bdf8', name: 'Design' }, { color: '#34d399', name: 'IndieHackers' }, { color: '#fbbf24', name: 'AI_Builders', count: 3 }].map(c => (
              <div key={c.name} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '6px 8px', borderRadius: '8px', color: '#9ca3af', fontSize: '13px', cursor: 'pointer', marginBottom: '2px' }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: c.color }} />
                r/{c.name}
                {c.count && <span style={{ marginLeft: 'auto', background: '#7c6aff', color: 'white', fontSize: '10px', fontWeight: 700, padding: '1px 6px', borderRadius: '20px' }}>{c.count}</span>}
              </div>
            ))}
          </div>
          <div style={{ background: 'linear-gradient(135deg, rgba(124,106,255,0.12), rgba(56,189,248,0.08))', border: '1px solid rgba(124,106,255,0.3)', borderRadius: '16px', padding: '16px' }}>
            <p style={{ fontWeight: 700, fontSize: '13px', marginBottom: '6px' }}>Go Premium ✦</p>
            <p style={{ fontSize: '12px', color: '#9ca3af', marginBottom: '12px', lineHeight: 1.5 }}>Unlock AI features, analytics & no ads</p>
            <button style={{ width: '100%', padding: '8px', borderRadius: '10px', background: 'linear-gradient(135deg, #7c6aff, #6366f1)', border: 'none', color: 'white', fontWeight: 700, fontSize: '12px', cursor: 'pointer' }}>Upgrade ✦</button>
          </div>
        </aside>

        {/* Feed */}
        <main style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>

          {/* Tabs */}
          <div style={{ display: 'flex', gap: '4px', background: '#111118', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '12px', padding: '4px' }}>
            {[
              { id: 'for-you', label: '✦ For You' },
              { id: 'following', label: 'Following' },
              { id: 'trending', label: '🔥 Trending' },
              { id: 'ai-curated', label: '✨ AI Curated' },
            ].map(tab => (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                style={{ flex: 1, padding: '7px 12px', borderRadius: '8px', fontSize: '13px', fontWeight: 500, cursor: 'pointer', border: 'none', background: activeTab === tab.id ? 'rgba(124,106,255,0.15)' : 'none', color: activeTab === tab.id ? '#a78bfa' : '#6b7280', transition: 'all 0.2s' }}>
                {tab.label}
              </button>
            ))}
          </div>

          {/* Compose */}
          <div style={{ background: '#111118', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '16px', padding: '16px' }}>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'linear-gradient(135deg, #7c6aff, #38bdf8)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '14px', flexShrink: 0 }}>
                {userInitial}
              </div>
              <textarea value={postText} onChange={e => setPostText(e.target.value)}
                placeholder="What's on your mind? Share with your communities..."
                rows={postText ? 3 : 1}
                style={{ flex: 1, background: '#1a1a24', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', padding: '10px 14px', fontSize: '14px', color: '#d1d5db', outline: 'none', resize: 'none', fontFamily: 'sans-serif' }} />
            </div>
            {postText && (
              <div style={{ display: 'flex', gap: '8px', marginTop: '10px', marginLeft: '52px', alignItems: 'center' }}>
                {['🖼️ Photo', '📊 Poll', '🔗 Link'].map(btn => (
                  <button key={btn} style={{ padding: '5px 12px', borderRadius: '8px', fontSize: '12px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.04)', color: '#9ca3af', cursor: 'pointer' }}>{btn}</button>
                ))}
                <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
                  onClick={handlePost}
                  style={{ marginLeft: 'auto', padding: '6px 18px', borderRadius: '10px', background: 'linear-gradient(135deg, #7c6aff, #6366f1)', border: 'none', color: 'white', fontWeight: 700, fontSize: '13px', cursor: 'pointer' }}>
                  Post →
                </motion.button>
              </div>
            )}
          </div>

          {/* Posts */}
          <AnimatePresence mode="wait">
            <motion.div key={activeTab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {currentPosts.map((post, i) => (
                <motion.div key={post.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                  whileHover={{ y: -2 }}
                  style={{ background: '#111118', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '16px', padding: '16px', cursor: 'pointer', transition: 'border-color 0.2s' }}
                >
                  <span style={{ display: 'inline-flex', fontSize: '11px', fontWeight: 600, padding: '2px 10px', borderRadius: '20px', background: 'rgba(124,106,255,0.1)', color: '#a78bfa', marginBottom: '10px' }}>
                    🌐 r/{post.community}
                  </span>
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
            </motion.div>
          </AnimatePresence>
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
            {[
              { name: 'Tanvir N.', bio: 'Senior @Vercel', g: 'linear-gradient(135deg,#7c3aed,#2563eb)' },
              { name: 'Ana Lima', bio: 'Design @Figma', g: 'linear-gradient(135deg,#0891b2,#0d9488)' },
              { name: 'Raj Kumar', bio: 'Founder @IndieHQ', g: 'linear-gradient(135deg,#d97706,#b45309)' }
            ].map(u => <SuggestUser key={u.name} {...u} />)}
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