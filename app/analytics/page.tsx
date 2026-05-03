'use client'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { signOut, useSession } from 'next-auth/react'

const weekData = [40, 65, 45, 80, 55, 90, 70]
const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

export default function AnalyticsPage() {
  const { data: session } = useSession()
  const [period, setPeriod] = useState('week')
  const userInitial = session?.user?.name?.charAt(0) || 'U'

  const stats = [
    { label: 'Profile Views', value: '2,847', change: '+12%', icon: '👁️', color: '#38bdf8', up: true },
    { label: 'Post Impressions', value: '98.2k', change: '+24%', icon: '📊', color: '#a78bfa', up: true },
    { label: 'New Followers', value: '89', change: '+31%', icon: '👥', color: '#34d399', up: true },
    { label: 'Link Clicks', value: '1,234', change: '+8%', icon: '🔗', color: '#fbbf24', up: true },
    { label: 'Comments', value: '342', change: '-3%', icon: '💬', color: '#f87171', up: false },
    { label: 'Reshares', value: '567', change: '+45%', icon: '🔄', color: '#34d399', up: true },
  ]

  const topPosts = [
    { content: 'Just shipped NEXUS v2.0 with real-time features!', views: '12.4k', likes: 284, comments: 47 },
    { content: 'Open sourced our AI content moderation layer...', views: '8.9k', likes: 512, comments: 128 },
    { content: 'TypeScript strict mode should be the default...', views: '5.2k', likes: 178, comments: 63 },
  ]

  const maxVal = Math.max(...weekData)

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

      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '32px 16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
          <div>
            <h1 style={{ fontSize: '26px', fontWeight: 900, margin: 0 }}>📈 Analytics</h1>
            <p style={{ color: '#6b7280', fontSize: '14px', marginTop: '4px' }}>Track your growth and engagement</p>
          </div>
          <div style={{ display: 'flex', gap: '6px' }}>
            {['week', 'month', 'year'].map(p => (
              <button key={p} onClick={() => setPeriod(p)}
                style={{ padding: '6px 14px', borderRadius: '10px', border: '1px solid', fontSize: '13px', fontWeight: 500, cursor: 'pointer', borderColor: period === p ? '#7c6aff' : 'rgba(255,255,255,0.1)', background: period === p ? 'rgba(124,106,255,0.12)' : 'rgba(255,255,255,0.04)', color: period === p ? '#a78bfa' : '#9ca3af', textTransform: 'capitalize' }}>
                {p}
              </button>
            ))}
          </div>
        </div>

        {/* Stats grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginBottom: '24px' }}>
          {stats.map((s, i) => (
            <motion.div key={s.label}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07 }}
              style={{ background: '#111118', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '16px', padding: '18px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                <span style={{ fontSize: '22px' }}>{s.icon}</span>
                <span style={{ fontSize: '12px', fontWeight: 600, color: s.up ? '#34d399' : '#f87171', background: s.up ? 'rgba(52,211,153,0.1)' : 'rgba(248,113,113,0.1)', padding: '2px 8px', borderRadius: '20px' }}>
                  {s.change}
                </span>
              </div>
              <div style={{ fontSize: '26px', fontWeight: 900, marginBottom: '4px' }}>{s.value}</div>
              <div style={{ fontSize: '12px', color: '#6b7280' }}>{s.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Chart */}
        <div style={{ background: '#111118', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '16px', padding: '20px', marginBottom: '20px' }}>
          <h3 style={{ fontSize: '15px', fontWeight: 700, marginBottom: '20px' }}>📊 Impressions This Week</h3>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: '8px', height: '120px' }}>
            {weekData.map((val, i) => (
              <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', height: '100%', justifyContent: 'flex-end' }}>
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${(val / maxVal) * 100}%` }}
                  transition={{ delay: i * 0.1, duration: 0.6 }}
                  style={{ width: '100%', borderRadius: '6px 6px 0 0', background: i === 5 ? 'linear-gradient(180deg, #7c6aff, #6366f1)' : 'rgba(124,106,255,0.3)', minHeight: '4px' }}
                />
                <span style={{ fontSize: '11px', color: '#6b7280' }}>{days[i]}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Top posts */}
        <div style={{ background: '#111118', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '16px', padding: '20px', marginBottom: '20px' }}>
          <h3 style={{ fontSize: '15px', fontWeight: 700, marginBottom: '16px' }}>🏆 Top Performing Posts</h3>
          {topPosts.map((post, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '14px', padding: '12px 0', borderBottom: i < topPosts.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none' }}>
              <div style={{ width: '28px', height: '28px', borderRadius: '8px', background: 'linear-gradient(135deg, #7c6aff, #6366f1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '12px', flexShrink: 0 }}>{i + 1}</div>
              <div style={{ flex: 1, fontSize: '13px', color: '#d1d5db', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{post.content}</div>
              <div style={{ display: 'flex', gap: '12px', flexShrink: 0 }}>
                <span style={{ fontSize: '12px', color: '#6b7280' }}>👁️ {post.views}</span>
                <span style={{ fontSize: '12px', color: '#6b7280' }}>♥ {post.likes}</span>
                <span style={{ fontSize: '12px', color: '#6b7280' }}>💬 {post.comments}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Follower growth */}
        <div style={{ background: '#111118', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '16px', padding: '20px' }}>
          <h3 style={{ fontSize: '15px', fontWeight: 700, marginBottom: '16px' }}>👥 Audience Breakdown</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
            {[
              { label: 'WebDev Community', pct: 38, color: '#a78bfa' },
              { label: 'AI/ML Community', pct: 27, color: '#38bdf8' },
              { label: 'IndieHackers', pct: 21, color: '#34d399' },
              { label: 'Design Systems', pct: 14, color: '#fbbf24' },
            ].map(item => (
              <div key={item.label} style={{ background: '#1a1a24', borderRadius: '12px', padding: '14px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ fontSize: '13px', color: '#9ca3af' }}>{item.label}</span>
                  <span style={{ fontSize: '13px', fontWeight: 700, color: item.color }}>{item.pct}%</span>
                </div>
                <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: '4px', height: '6px', overflow: 'hidden' }}>
                  <motion.div initial={{ width: 0 }} animate={{ width: `${item.pct}%` }} transition={{ duration: 0.8, delay: 0.2 }}
                    style={{ height: '100%', borderRadius: '4px', background: item.color }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}