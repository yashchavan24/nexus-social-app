'use client'
import { motion, AnimatePresence } from 'framer-motion'
import { useState, useRef } from 'react'
import { signOut, useSession } from 'next-auth/react'

const allPosts: Record<string, any[]> = {
  'for-you': [
    { id: 1, author: 'Sarah R.', handle: 'sarahbuilds', avatar: 'SR', gradient: 'linear-gradient(135deg,#7c3aed,#2563eb)', community: 'WebDev', time: '2h ago', content: 'Just shipped NEXUS v2.0 with real-time collaborative spaces! Next.js 14 + Supabase Realtime + Redis for pub/sub. Performance is insane — <80ms latency globally 🚀', likes: 284, comments: 47, shares: 120, hashtags: ['#NextJS', '#Supabase', '#WebDev'] },
    { id: 2, author: 'Marcus K.', handle: 'marcusdesigns', avatar: 'MK', gradient: 'linear-gradient(135deg,#0891b2,#0d9488)', community: 'Design', time: '5h ago', content: 'Hot take: dark mode-first design is 2025\'s most underrated practice. Your design system should default to dark. User retention spikes 34% 📊', likes: 156, comments: 93, shares: 67, hashtags: ['#Design', '#DarkMode', '#UX'] },
    { id: 3, author: 'Priya J.', handle: 'priyabuilds', avatar: 'PJ', gradient: 'linear-gradient(135deg,#d97706,#b45309)', community: 'AI/ML', time: '8h ago', content: 'We just open-sourced our AI content moderation layer! Built with Claude + vector search. Zero false positives in 3 months of production 🔥', likes: 512, comments: 128, shares: 340, hashtags: ['#AI', '#OpenSource', '#Claude'] },
    { id: 4, author: 'Raj K.', handle: 'rajkumar', avatar: 'RK', gradient: 'linear-gradient(135deg,#059669,#047857)', community: 'IndieHacking', time: '1d ago', content: 'Hit $10k MRR today! 18 months of grinding, 3 pivots, countless rejections. Here\'s everything I learned building in public 🧵', likes: 892, comments: 234, shares: 567, hashtags: ['#IndieHacking', '#SaaS', '#BuildInPublic'] },
  ],
  'following': [
    { id: 5, author: 'Tanvir N.', handle: 'tanvirdev', avatar: 'TN', gradient: 'linear-gradient(135deg,#7c3aed,#2563eb)', community: 'WebDev', time: '1h ago', content: 'Next.js 15 just dropped and the performance improvements are insane. Server components are 40% faster in our benchmarks 🚀', likes: 423, comments: 87, shares: 210, hashtags: ['#NextJS', '#React', '#WebDev'] },
    { id: 6, author: 'Ana Lima', handle: 'analima', avatar: 'AL', gradient: 'linear-gradient(135deg,#db2777,#9333ea)', community: 'Design', time: '3h ago', content: 'Just released our open source design system — 200+ components, dark mode by default, fully accessible. Link in bio! 🎨', likes: 334, comments: 56, shares: 189, hashtags: ['#Design', '#OpenSource', '#Figma'] },
    { id: 7, author: 'Raj Kumar', handle: 'rajkumar', avatar: 'RK', gradient: 'linear-gradient(135deg,#d97706,#b45309)', community: 'IndieHacking', time: '6h ago', content: 'Lesson learned: Don\'t build for everyone. Niche down hard. Our best month came when we focused on ONE customer type 💡', likes: 567, comments: 123, shares: 234, hashtags: ['#StartupTips', '#IndieHacking'] },
  ],
  'trending': [
    { id: 8, author: 'Tech Daily', handle: 'techdaily', avatar: 'TD', gradient: 'linear-gradient(135deg,#ea580c,#dc2626)', community: 'AI/ML', time: '30m ago', content: 'Breaking: Claude 4 benchmark results are out — and they\'re SHOCKING. Full comparison with GPT-5 with real code examples 👇', likes: 2840, comments: 892, shares: 3400, hashtags: ['#AI', '#Claude', '#LLM'] },
    { id: 9, author: 'Dev Weekly', handle: 'devweekly', avatar: 'DW', gradient: 'linear-gradient(135deg,#0284c7,#0891b2)', community: 'WebDev', time: '1h ago', content: 'State of JavaScript 2025 survey results are out! TypeScript adoption hit 89%. React still #1 but Vue is closing the gap fast 📊', likes: 1560, comments: 430, shares: 2100, hashtags: ['#JavaScript', '#TypeScript', '#React'] },
    { id: 10, author: 'Indie Makers', handle: 'indiemakers', avatar: 'IM', gradient: 'linear-gradient(135deg,#059669,#0d9488)', community: 'IndieHacking', time: '2h ago', content: '🔥 This week\'s indie wins: $0 to $50k MRR in 6 months. The 5 strategies that actually worked — no BS, just results.', likes: 987, comments: 203, shares: 876, hashtags: ['#IndieHacking', '#SaaS', '#Startup'] },
    { id: 11, author: 'Open Source Hub', handle: 'oshub', avatar: 'OS', gradient: 'linear-gradient(135deg,#7c3aed,#6d28d9)', community: 'OpenSource', time: '3h ago', content: 'Top 10 GitHub repos that blew up this week. #1 got 15k stars in 24 hours. The power of open source community is unreal ⭐', likes: 3200, comments: 567, shares: 4100, hashtags: ['#OpenSource', '#GitHub'] },
  ],
  'ai-curated': [
    { id: 12, author: 'NEXUS AI ✦', handle: 'nexusai', avatar: '✦', gradient: 'linear-gradient(135deg,#7c6aff,#38bdf8)', community: 'AI/ML', time: 'Just now', content: '✨ Good morning! Based on your activity in WebDev and AI communities, here are today\'s top picks curated just for you. You\'ve engaged with 23 posts this week — keep it up! 🎯', likes: 0, comments: 0, shares: 0, hashtags: [] },
    { id: 13, author: 'Sarah R.', handle: 'sarahbuilds', avatar: 'SR', gradient: 'linear-gradient(135deg,#7c3aed,#2563eb)', community: 'WebDev', time: '4h ago', content: 'AI Pick for you 🤖: Supabase just released edge functions with 10ms cold starts globally. This changes everything for serverless ⚡', likes: 445, comments: 67, shares: 123, hashtags: ['#Supabase', '#Serverless', '#EdgeFunctions'] },
    { id: 14, author: 'Priya J.', handle: 'priyabuilds', avatar: 'PJ', gradient: 'linear-gradient(135deg,#d97706,#b45309)', community: 'AI/ML', time: '6h ago', content: 'AI Pick for you 🤖: Vector databases are the new SQL. Here\'s a practical guide to choosing between Pinecone, Weaviate, and pgvector for your use case.', likes: 678, comments: 145, shares: 289, hashtags: ['#AI', '#VectorDB', '#MachineLearning'] },
  ],
}

export default function FeedPage() {
  const { data: session } = useSession()
  const [activeTab, setActiveTab] = useState('for-you')
  const [likedPosts, setLikedPosts] = useState<number[]>([])
  const [saved, setSaved] = useState<number[]>([])
  const [reshared, setReshared] = useState<number[]>([])
  const [postText, setPostText] = useState('')
  const [postHashtags, setPostHashtags] = useState('')
  const [postImage, setPostImage] = useState<string | null>(null)
  const [localPosts, setLocalPosts] = useState<any[]>([])
  const [showCompose, setShowCompose] = useState(false)
  const [shareModal, setShareModal] = useState<number | null>(null)
  const fileRef = useRef<HTMLInputElement>(null)

  const currentPosts = [...localPosts, ...(allPosts[activeTab] || [])]
  const userInitial = session?.user?.name?.charAt(0) || 'U'
  const userName = session?.user?.name || 'You'

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = () => setPostImage(reader.result as string)
      reader.readAsDataURL(file)
    }
  }

  const handlePost = () => {
    if (!postText.trim()) return
    const tags = postHashtags.split(' ').filter(t => t.startsWith('#') || (t && !t.startsWith('#') && t.trim()))
      .map(t => t.startsWith('#') ? t : `#${t}`)
    const newPost = {
      id: Date.now(),
      author: userName,
      handle: session?.user?.email?.split('@')[0] || 'user',
      avatar: userInitial,
      gradient: 'linear-gradient(135deg, #7c6aff, #38bdf8)',
      community: 'General',
      time: 'Just now',
      content: postText,
      image: postImage,
      likes: 0,
      comments: 0,
      shares: 0,
      hashtags: tags,
    }
    setLocalPosts(prev => [newPost, ...prev])
    setPostText('')
    setPostHashtags('')
    setPostImage(null)
    setShowCompose(false)
  }

  return (
    <div style={{ minHeight: '100vh', background: '#09090f', color: '#f1f0ff' }}>

      {/* Share Modal */}
      <AnimatePresence>
        {shareModal !== null && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setShareModal(null)}
            style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', zIndex: 300, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9 }}
              onClick={e => e.stopPropagation()}
              style={{ background: '#111118', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '20px', padding: '24px', width: '360px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '16px' }}>Share Post</h3>
              {[
                { icon: '💬', label: 'Share in Messages', action: () => { alert('Shared in Messages!'); setShareModal(null) } },
                { icon: '🔗', label: 'Copy Link', action: () => { navigator.clipboard.writeText(window.location.href); setShareModal(null) } },
                { icon: '🐦', label: 'Share on X (Twitter)', action: () => { window.open('https://twitter.com/intent/tweet?text=Check this out on NEXUS!'); setShareModal(null) } },
                { icon: '💼', label: 'Share on LinkedIn', action: () => { window.open('https://linkedin.com'); setShareModal(null) } },
              ].map(opt => (
                <button key={opt.label} onClick={opt.action}
                  style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 14px', borderRadius: '12px', border: 'none', background: 'rgba(255,255,255,0.04)', color: '#f1f0ff', fontSize: '14px', cursor: 'pointer', marginBottom: '8px', textAlign: 'left' }}>
                  <span style={{ fontSize: '20px' }}>{opt.icon}</span>
                  {opt.label}
                </button>
              ))}
              <button onClick={() => setShareModal(null)}
                style={{ width: '100%', padding: '10px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.1)', background: 'none', color: '#6b7280', fontSize: '13px', cursor: 'pointer', marginTop: '4px' }}>
                Cancel
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Compose Modal */}
      <AnimatePresence>
        {showCompose && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setShowCompose(false)}
            style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', zIndex: 300, display: 'flex', alignItems: 'flex-start', justifyContent: 'center', paddingTop: '80px', padding: '80px 16px 16px' }}>
            <motion.div initial={{ scale: 0.95, y: -20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95 }}
              onClick={e => e.stopPropagation()}
              style={{ background: '#111118', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '20px', padding: '24px', width: '100%', maxWidth: '560px' }}>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <h3 style={{ fontSize: '16px', fontWeight: 700 }}>Create Post</h3>
                <button onClick={() => setShowCompose(false)} style={{ background: 'none', border: 'none', color: '#6b7280', fontSize: '20px', cursor: 'pointer' }}>✕</button>
              </div>

              <div style={{ display: 'flex', gap: '12px', marginBottom: '12px' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'linear-gradient(135deg, #7c6aff, #38bdf8)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, flexShrink: 0 }}>{userInitial}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600, fontSize: '14px', marginBottom: '2px' }}>{userName}</div>
                  <select style={{ background: '#1a1a24', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '6px', padding: '2px 8px', fontSize: '12px', color: '#9ca3af', cursor: 'pointer' }}>
                    <option>🌐 Public</option>
                    <option>👥 Following</option>
                    <option>🔒 Private</option>
                  </select>
                </div>
              </div>

              <textarea value={postText} onChange={e => setPostText(e.target.value)}
                placeholder="What's on your mind? Share with your communities..."
                rows={4}
                style={{ width: '100%', background: '#1a1a24', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', padding: '12px 14px', fontSize: '14px', color: '#d1d5db', outline: 'none', resize: 'none', fontFamily: 'sans-serif', boxSizing: 'border-box', marginBottom: '10px' }} />

              <input value={postHashtags} onChange={e => setPostHashtags(e.target.value)}
                placeholder="#hashtag1 #hashtag2 #hashtag3"
                style={{ width: '100%', background: '#1a1a24', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', padding: '10px 14px', fontSize: '13px', color: '#a78bfa', outline: 'none', boxSizing: 'border-box', marginBottom: '12px' }} />

              {postImage && (
                <div style={{ position: 'relative', marginBottom: '12px' }}>
                  <img src={postImage} style={{ width: '100%', borderRadius: '12px', maxHeight: '200px', objectFit: 'cover' }} />
                  <button onClick={() => setPostImage(null)}
                    style={{ position: 'absolute', top: '8px', right: '8px', background: 'rgba(0,0,0,0.7)', border: 'none', color: 'white', borderRadius: '50%', width: '28px', height: '28px', cursor: 'pointer', fontSize: '14px' }}>✕</button>
                </div>
              )}

              <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
                <input ref={fileRef} type="file" accept="image/*" onChange={handleImageUpload} style={{ display: 'none' }} />
                {[
                  { icon: '🖼️', label: 'Photo', action: () => fileRef.current?.click() },
                  { icon: '📊', label: 'Poll', action: () => {} },
                  { icon: '😊', label: 'Emoji', action: () => {} },
                  { icon: '🔗', label: 'Link', action: () => {} },
                ].map(btn => (
                  <button key={btn.label} onClick={btn.action}
                    style={{ display: 'flex', alignItems: 'center', gap: '4px', padding: '6px 12px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.04)', color: '#9ca3af', fontSize: '12px', cursor: 'pointer' }}>
                    {btn.icon} {btn.label}
                  </button>
                ))}
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '12px', color: postText.length > 250 ? '#f87171' : '#6b7280' }}>{postText.length}/280</span>
                <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                  onClick={handlePost} disabled={!postText.trim()}
                  style={{ padding: '10px 24px', borderRadius: '12px', background: postText.trim() ? 'linear-gradient(135deg, #7c6aff, #6366f1)' : 'rgba(255,255,255,0.1)', border: 'none', color: postText.trim() ? 'white' : '#6b7280', fontWeight: 700, fontSize: '14px', cursor: postText.trim() ? 'pointer' : 'not-allowed' }}>
                  Post →
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

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
          <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'linear-gradient(135deg, #7c6aff, #38bdf8)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '12px' }}>{userInitial}</div>
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

          {/* Compose trigger */}
          <div style={{ background: '#111118', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '16px', padding: '16px', cursor: 'pointer' }} onClick={() => setShowCompose(true)}>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'linear-gradient(135deg, #7c6aff, #38bdf8)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '14px', flexShrink: 0 }}>{userInitial}</div>
              <div style={{ flex: 1, background: '#1a1a24', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '24px', padding: '10px 16px', fontSize: '14px', color: '#6b7280' }}>
                What's on your mind, {userName.split(' ')[0]}?
              </div>
            </div>
            <div style={{ display: 'flex', gap: '8px', marginTop: '12px', marginLeft: '52px' }}>
              {[{ icon: '🖼️', label: 'Photo' }, { icon: '📊', label: 'Poll' }, { icon: '#️⃣', label: 'Hashtag' }, { icon: '🔗', label: 'Link' }].map(btn => (
                <button key={btn.label} onClick={e => { e.stopPropagation(); setShowCompose(true) }}
                  style={{ display: 'flex', alignItems: 'center', gap: '4px', padding: '5px 10px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.03)', color: '#6b7280', fontSize: '12px', cursor: 'pointer' }}>
                  {btn.icon} {btn.label}
                </button>
              ))}
            </div>
          </div>

          {/* Posts */}
          <AnimatePresence mode="wait">
            <motion.div key={activeTab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
              style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {currentPosts.map((post, i) => (
                <motion.div key={post.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06 }}
                  whileHover={{ y: -2 }}
                  style={{ background: '#111118', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '16px', padding: '16px', cursor: 'pointer' }}
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
                  <p style={{ fontSize: '14px', lineHeight: 1.65, color: '#d1d5db', marginBottom: '10px' }}>{post.content}</p>

                  {/* Post image */}
                  {post.image && (
                    <img src={post.image} style={{ width: '100%', borderRadius: '12px', marginBottom: '10px', maxHeight: '300px', objectFit: 'cover' }} />
                  )}

                  {/* Hashtags */}
                  {post.hashtags && post.hashtags.length > 0 && (
                    <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '12px' }}>
                      {post.hashtags.map((tag: string) => (
                        <span key={tag} style={{ fontSize: '12px', color: '#38bdf8', background: 'rgba(56,189,248,0.08)', padding: '2px 8px', borderRadius: '20px', cursor: 'pointer' }}>{tag}</span>
                      ))}
                    </div>
                  )}

                  <div style={{ display: 'flex', gap: '4px', paddingTop: '12px', borderTop: '1px solid rgba(255,255,255,0.07)' }}>
                    <button onClick={() => setLikedPosts(prev => prev.includes(post.id) ? prev.filter(x => x !== post.id) : [...prev, post.id])}
                      style={{ display: 'flex', alignItems: 'center', gap: '5px', padding: '5px 10px', borderRadius: '8px', border: 'none', background: likedPosts.includes(post.id) ? 'rgba(248,113,113,0.1)' : 'none', color: likedPosts.includes(post.id) ? '#f87171' : '#6b7280', fontSize: '13px', cursor: 'pointer' }}>
                      {likedPosts.includes(post.id) ? '♥' : '♡'} {post.likes + (likedPosts.includes(post.id) ? 1 : 0)}
                    </button>
                    <button style={{ display: 'flex', alignItems: 'center', gap: '5px', padding: '5px 10px', borderRadius: '8px', border: 'none', background: 'none', color: '#6b7280', fontSize: '13px', cursor: 'pointer' }}>
                      💬 {post.comments}
                    </button>
                    <button onClick={() => setReshared(prev => prev.includes(post.id) ? prev.filter(x => x !== post.id) : [...prev, post.id])}
                      style={{ display: 'flex', alignItems: 'center', gap: '5px', padding: '5px 10px', borderRadius: '8px', border: 'none', background: reshared.includes(post.id) ? 'rgba(52,211,153,0.1)' : 'none', color: reshared.includes(post.id) ? '#34d399' : '#6b7280', fontSize: '13px', cursor: 'pointer' }}>
                      🔄 {post.shares + (reshared.includes(post.id) ? 1 : 0)}
                    </button>
                    <button onClick={() => setShareModal(post.id)}
                      style={{ display: 'flex', alignItems: 'center', gap: '5px', padding: '5px 10px', borderRadius: '8px', border: 'none', background: 'none', color: '#6b7280', fontSize: '13px', cursor: 'pointer' }}>
                      ↗ Share
                    </button>
                    <button onClick={() => setSaved(prev => prev.includes(post.id) ? prev.filter(x => x !== post.id) : [...prev, post.id])}
                      style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '5px', padding: '5px 10px', borderRadius: '8px', border: 'none', background: saved.includes(post.id) ? 'rgba(167,139,250,0.1)' : 'none', color: saved.includes(post.id) ? '#a78bfa' : '#6b7280', fontSize: '13px', cursor: 'pointer' }}>
                      {saved.includes(post.id) ? '🔖' : '🔖'}
                    </button>
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
              <div key={tag} onClick={() => setActiveTab('trending')} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 0', borderBottom: '1px solid rgba(255,255,255,0.05)', cursor: 'pointer' }}>
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