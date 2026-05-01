'use client'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { useSession, signOut } from 'next-auth/react'

const userPosts = [
  { id: 1, content: 'Just shipped NEXUS v2.0 with real-time features! Next.js 14 + Supabase + Redis. Getting <80ms latency globally 🚀', likes: 284, comments: 47, time: '2h ago' },
  { id: 2, content: 'Open sourced our AI moderation layer today. Zero false positives in 3 months of production. Link in bio 👇', likes: 512, comments: 128, time: '1d ago' },
  { id: 3, content: 'Hot take: TypeScript strict mode should be the default for every new project. The DX improvements are insane.', likes: 178, comments: 63, time: '3d ago' },
]

export default function ProfilePage() {
  const { data: session } = useSession()
  const [activeTab, setActiveTab] = useState('posts')
  const [likedPosts, setLikedPosts] = useState<number[]>([])
  const [isEditing, setIsEditing] = useState(false)
  const [profile, setProfile] = useState({
    name: '',
    bio: 'Full-stack developer · Building cool things 🚀',
    location: 'India',
    website: 'github.com',
    role: 'Software Engineer',
  })

  const userName = session?.user?.name || profile.name || 'User'
  const userEmail = session?.user?.email || ''
  const userImage = session?.user?.image || null
  const userHandle = userEmail.split('@')[0] || 'user'
  const userInitial = userName.charAt(0).toUpperCase()

  return (
    <div style={{ minHeight: '100vh', background: '#09090f', color: '#f1f0ff' }}>

      {/* Navbar */}
      <nav style={{ position: 'sticky', top: 0, zIndex: 100, background: 'rgba(9,9,15,0.85)', backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(255,255,255,0.07)', padding: '0 24px', display: 'flex', alignItems: 'center', height: '56px', gap: '24px' }}>
        <a href="/feed" style={{ fontSize: '20px', fontWeight: 900, background: 'linear-gradient(135deg, #a78bfa, #38bdf8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', textDecoration: 'none' }}>NEXUS</a>
        <div style={{ display: 'flex', gap: '4px', flex: 1 }}>
          {['Feed', 'Communities', 'Messages', 'Profile'].map(tab => (
            <a key={tab} href={`/${tab.toLowerCase()}`} style={{ padding: '6px 14px', borderRadius: '8px', fontSize: '13px', fontWeight: 500, color: tab === 'Profile' ? '#a78bfa' : '#6b7280', background: tab === 'Profile' ? 'rgba(124,106,255,0.12)' : 'none', textDecoration: 'none' }}>{tab}</a>
          ))}
        </div>
        <button onClick={() => signOut({ callbackUrl: '/login' })}
          style={{ padding: '6px 12px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.05)', color: '#9ca3af', fontSize: '12px', cursor: 'pointer' }}>
          Logout
        </button>
      </nav>

      <div style={{ maxWidth: '720px', margin: '0 auto', padding: '24px 16px' }}>

        {/* Edit Modal */}
        {isEditing && (
          <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }}>
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
              style={{ background: '#111118', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '20px', padding: '28px', width: '100%', maxWidth: '480px' }}>
              <h2 style={{ fontSize: '18px', fontWeight: 800, marginBottom: '20px' }}>Edit Profile</h2>
              {[
                { label: 'Display Name', key: 'name', placeholder: userName, value: profile.name },
                { label: 'Bio', key: 'bio', placeholder: 'Tell people about yourself', value: profile.bio },
                { label: 'Location', key: 'location', placeholder: 'Where are you based?', value: profile.location },
                { label: 'Website', key: 'website', placeholder: 'yourwebsite.com', value: profile.website },
                { label: 'Role', key: 'role', placeholder: 'Your job title', value: profile.role },
              ].map(field => (
                <div key={field.key} style={{ marginBottom: '14px' }}>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '6px' }}>{field.label}</label>
                  <input value={field.value} onChange={e => setProfile(prev => ({ ...prev, [field.key]: e.target.value }))}
                    placeholder={field.placeholder}
                    style={{ width: '100%', background: '#1a1a24', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', padding: '10px 14px', fontSize: '14px', color: '#f1f0ff', outline: 'none', boxSizing: 'border-box' }} />
                </div>
              ))}
              <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
                <button onClick={() => setIsEditing(false)}
                  style={{ flex: 1, padding: '10px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.05)', color: '#9ca3af', fontSize: '14px', cursor: 'pointer' }}>
                  Cancel
                </button>
                <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                  onClick={() => setIsEditing(false)}
                  style={{ flex: 1, padding: '10px', borderRadius: '10px', background: 'linear-gradient(135deg, #7c6aff, #6366f1)', border: 'none', color: 'white', fontSize: '14px', fontWeight: 700, cursor: 'pointer' }}>
                  Save Changes ✓
                </motion.button>
              </div>
            </motion.div>
          </div>
        )}

        {/* Profile card */}
        <div style={{ background: '#111118', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '20px', overflow: 'hidden', marginBottom: '16px' }}>

          {/* Banner */}
          <div style={{ height: '140px', background: 'linear-gradient(135deg, #312e81, #1e3a5f, #064e3b)', position: 'relative' }}>
            <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(124,106,255,0.3) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(56,189,248,0.2) 0%, transparent 50%)' }} />
          </div>

          {/* Avatar + info */}
          <div style={{ padding: '0 24px 24px' }}>
            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '16px' }}>
              <div style={{ position: 'relative', marginTop: '-40px' }}>
                {userImage ? (
                  <img src={userImage} alt={userName}
                    style={{ width: '80px', height: '80px', borderRadius: '50%', border: '4px solid #09090f', objectFit: 'cover' }} />
                ) : (
                  <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'linear-gradient(135deg, #7c6aff, #38bdf8)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px', fontWeight: 900, border: '4px solid #09090f' }}>
                    {userInitial}
                  </div>
                )}
                <div style={{ position: 'absolute', bottom: '4px', right: '4px', width: '16px', height: '16px', borderRadius: '50%', background: '#34d399', border: '2px solid #09090f' }} />
              </div>
              <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                onClick={() => setIsEditing(true)}
                style={{ padding: '8px 20px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.15)', background: 'rgba(255,255,255,0.05)', color: '#f1f0ff', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}>
                ✎ Edit Profile
              </motion.button>
            </div>

            <h2 style={{ fontSize: '22px', fontWeight: 900, margin: '0 0 4px' }}>
              {profile.name || userName} <span style={{ color: '#a78bfa', fontSize: '18px' }}>✦</span>
            </h2>
            <p style={{ color: '#6b7280', fontSize: '14px', margin: '0 0 8px' }}>
              @{userHandle} · <span style={{ color: '#34d399' }}>● Online</span>
            </p>
            <p style={{ color: '#9ca3af', fontSize: '14px', lineHeight: 1.6, margin: '0 0 14px' }}>{profile.bio}</p>

            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
              <span style={{ fontSize: '13px', color: '#9ca3af' }}>🏢 {profile.role}</span>
              <span style={{ fontSize: '13px', color: '#9ca3af' }}>📍 {profile.location}</span>
              <span style={{ fontSize: '13px', color: '#a78bfa' }}>🔗 {profile.website}</span>
              <span style={{ fontSize: '13px', color: '#9ca3af' }}>✉️ {userEmail}</span>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', background: '#111118', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '16px', overflow: 'hidden', marginBottom: '16px' }}>
          {[{ num: '284', label: 'Posts' }, { num: '12.4k', label: 'Followers' }, { num: '843', label: 'Following' }, { num: '98.2k', label: 'Reach' }].map((s, i) => (
            <div key={s.label} style={{ padding: '18px', textAlign: 'center', borderRight: i < 3 ? '1px solid rgba(255,255,255,0.07)' : 'none' }}>
              <div style={{ fontSize: '22px', fontWeight: 900 }}>{s.num}</div>
              <div style={{ fontSize: '12px', color: '#6b7280', marginTop: '2px' }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: '4px', background: '#111118', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '12px', padding: '4px', marginBottom: '16px' }}>
          {['posts', 'replies', 'media', 'analytics'].map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              style={{ flex: 1, padding: '8px', borderRadius: '8px', fontSize: '13px', fontWeight: 500, cursor: 'pointer', border: 'none', background: activeTab === tab ? 'rgba(124,106,255,0.15)' : 'none', color: activeTab === tab ? '#a78bfa' : '#6b7280', textTransform: 'capitalize' }}>
              {tab}
            </button>
          ))}
        </div>

        {/* Posts tab */}
        {activeTab === 'posts' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {userPosts.map((post, i) => (
              <motion.div key={post.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                style={{ background: '#111118', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '16px', padding: '16px' }}>
                <div style={{ display: 'flex', gap: '12px', marginBottom: '12px' }}>
                  {userImage ? (
                    <img src={userImage} style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }} />
                  ) : (
                    <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'linear-gradient(135deg, #7c6aff, #38bdf8)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '14px', flexShrink: 0 }}>{userInitial}</div>
                  )}
                  <div>
                    <div style={{ fontWeight: 600, fontSize: '14px' }}>{profile.name || userName} <span style={{ color: '#a78bfa' }}>✦</span></div>
                    <div style={{ fontSize: '12px', color: '#6b7280' }}>@{userHandle} · {post.time}</div>
                  </div>
                </div>
                <p style={{ fontSize: '14px', color: '#d1d5db', lineHeight: 1.65, marginBottom: '14px' }}>{post.content}</p>
                <div style={{ display: 'flex', gap: '4px', paddingTop: '10px', borderTop: '1px solid rgba(255,255,255,0.07)' }}>
                  <button onClick={() => setLikedPosts(prev => prev.includes(post.id) ? prev.filter(x => x !== post.id) : [...prev, post.id])}
                    style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '5px 10px', borderRadius: '8px', border: 'none', background: 'none', color: likedPosts.includes(post.id) ? '#f87171' : '#6b7280', fontSize: '13px', cursor: 'pointer' }}>
                    {likedPosts.includes(post.id) ? '♥' : '♡'} {post.likes + (likedPosts.includes(post.id) ? 1 : 0)}
                  </button>
                  <button style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '5px 10px', borderRadius: '8px', border: 'none', background: 'none', color: '#6b7280', fontSize: '13px', cursor: 'pointer' }}>💬 {post.comments}</button>
                  <button style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '5px 10px', borderRadius: '8px', border: 'none', background: 'none', color: '#6b7280', fontSize: '13px', cursor: 'pointer' }}>↗ Share</button>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {activeTab === 'replies' && (
          <div style={{ textAlign: 'center', padding: '48px', color: '#6b7280', background: '#111118', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '16px' }}>
            <div style={{ fontSize: '40px', marginBottom: '12px' }}>💬</div>
            <p>No replies yet</p>
          </div>
        )}

        {activeTab === 'media' && (
          <div style={{ textAlign: 'center', padding: '48px', color: '#6b7280', background: '#111118', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '16px' }}>
            <div style={{ fontSize: '40px', marginBottom: '12px' }}>🖼️</div>
            <p>No media yet</p>
          </div>
        )}

        {activeTab === 'analytics' && (
          <div style={{ background: '#111118', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '16px', padding: '24px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '20px' }}>📈 Analytics Overview</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
              {[{ label: 'Profile Views', value: '2,847', change: '+12%', color: '#34d399' }, { label: 'Post Impressions', value: '98.2k', change: '+24%', color: '#38bdf8' }, { label: 'Link Clicks', value: '1,234', change: '+8%', color: '#a78bfa' }, { label: 'New Followers', value: '89', change: '+31%', color: '#fbbf24' }].map(stat => (
                <div key={stat.label} style={{ background: '#1a1a24', borderRadius: '12px', padding: '16px' }}>
                  <div style={{ fontSize: '12px', color: '#6b7280', marginBottom: '8px' }}>{stat.label}</div>
                  <div style={{ fontSize: '24px', fontWeight: 800, marginBottom: '4px' }}>{stat.value}</div>
                  <div style={{ fontSize: '12px', color: stat.color, fontWeight: 600 }}>{stat.change} this week</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}