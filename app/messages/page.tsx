'use client'
import { motion } from 'framer-motion'
import { useState } from 'react'

const contacts = [
  { id: 1, name: 'Sarah R.', handle: 'sarahbuilds', avatar: 'SR', gradient: 'linear-gradient(135deg,#7c3aed,#2563eb)', online: true, lastMsg: 'omg the new realtime feature 🚀', time: '2m', unread: 2 },
  { id: 2, name: 'Marcus K.', handle: 'marcusdesigns', avatar: 'MK', gradient: 'linear-gradient(135deg,#0891b2,#0d9488)', online: false, lastMsg: 'Check out the design tokens I updated', time: '1h', unread: 1 },
  { id: 3, name: 'Priya J.', handle: 'priyabuilds', avatar: 'PJ', gradient: 'linear-gradient(135deg,#d97706,#b45309)', online: true, lastMsg: 'The AI moderation PR is ready for review', time: '3h', unread: 0 },
  { id: 4, name: 'Raj Kumar', handle: 'rajkumar', avatar: 'RK', gradient: 'linear-gradient(135deg,#059669,#047857)', online: false, lastMsg: 'Shipped! Check the thread 🎉', time: '1d', unread: 0 },
]

const initialMessages: Record<number, { from: string; text: string; time: string }[]> = {
  1: [
    { from: 'them', text: 'Hey! Just saw your post about NEXUS v2 🔥 The real-time features look incredible!', time: '2:01 PM' },
    { from: 'me', text: 'Thanks! Built with Supabase Realtime + Redis pub/sub. Getting <80ms latency globally 🚀', time: '2:03 PM' },
    { from: 'them', text: 'omg the new realtime feature 🚀 Want to collab on the notifications system?', time: '2:05 PM' },
  ],
  2: [
    { from: 'them', text: 'Hey, check out the updated design tokens I pushed to Figma!', time: '1:00 PM' },
    { from: 'me', text: 'Looks amazing! The color system is so much cleaner now', time: '1:05 PM' },
    { from: 'them', text: 'Check out the design tokens I updated', time: '1:10 PM' },
  ],
  3: [
    { from: 'them', text: 'The AI moderation PR is ready for review — took 3 days but zero false positives!', time: '10:00 AM' },
    { from: 'me', text: 'That\'s incredible! Will review it today 🔥', time: '10:30 AM' },
  ],
  4: [
    { from: 'them', text: 'Shipped! Check the thread 🎉 Hit $10k MRR!', time: 'Yesterday' },
    { from: 'me', text: 'LETS GOOO!! Congrats man 🎉🎉', time: 'Yesterday' },
  ],
}

export default function MessagesPage() {
  const [activeContact, setActiveContact] = useState(contacts[0])
  const [messages, setMessages] = useState(initialMessages)
  const [newMsg, setNewMsg] = useState('')

  const sendMessage = () => {
    if (!newMsg.trim()) return
    setMessages(prev => ({
      ...prev,
      [activeContact.id]: [...(prev[activeContact.id] || []), { from: 'me', text: newMsg, time: 'Now' }]
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
            <a key={tab} href={`/${tab.toLowerCase()}`} style={{ padding: '6px 14px', borderRadius: '8px', fontSize: '13px', fontWeight: 500, color: tab === 'Messages' ? '#a78bfa' : '#6b7280', background: tab === 'Messages' ? 'rgba(124,106,255,0.12)' : 'none', textDecoration: 'none' }}>{tab}</a>
          ))}
        </div>
      </nav>

      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '24px 16px', display: 'grid', gridTemplateColumns: '300px 1fr', gap: '12px', height: 'calc(100vh - 80px)' }}>

        {/* Contact list */}
        <div style={{ background: '#111118', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '16px', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
          <div style={{ padding: '16px', borderBottom: '1px solid rgba(255,255,255,0.07)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <h2 style={{ fontSize: '16px', fontWeight: 700, margin: 0 }}>Messages</h2>
            <button style={{ padding: '4px 10px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.05)', color: '#9ca3af', fontSize: '12px', cursor: 'pointer' }}>✎ New</button>
          </div>
          <div style={{ overflowY: 'auto', flex: 1 }}>
            {contacts.map(contact => (
              <div key={contact.id} onClick={() => setActiveContact(contact)}
                style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '12px 16px', cursor: 'pointer', background: activeContact.id === contact.id ? 'rgba(124,106,255,0.1)' : 'none', borderBottom: '1px solid rgba(255,255,255,0.04)', transition: 'background 0.2s' }}>
                <div style={{ position: 'relative', flexShrink: 0 }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: contact.gradient, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '13px', boxShadow: contact.online ? '0 0 0 2px #09090f, 0 0 0 4px #34d399' : 'none' }}>{contact.avatar}</div>
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2px' }}>
                    <span style={{ fontWeight: 600, fontSize: '14px' }}>{contact.name}</span>
                    <span style={{ fontSize: '11px', color: '#6b7280' }}>{contact.time}</span>
                  </div>
                  <div style={{ fontSize: '12px', color: '#6b7280', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{contact.lastMsg}</div>
                </div>
                {contact.unread > 0 && <div style={{ background: '#7c6aff', color: 'white', fontSize: '10px', fontWeight: 700, padding: '2px 6px', borderRadius: '20px', flexShrink: 0 }}>{contact.unread}</div>}
              </div>
            ))}
          </div>
        </div>

        {/* Chat window */}
        <div style={{ background: '#111118', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '16px', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>

          {/* Chat header */}
          <div style={{ padding: '14px 20px', borderBottom: '1px solid rgba(255,255,255,0.07)', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: activeContact.gradient, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '12px' }}>{activeContact.avatar}</div>
            <div>
              <div style={{ fontWeight: 600, fontSize: '15px' }}>{activeContact.name}</div>
              <div style={{ fontSize: '12px', color: activeContact.online ? '#34d399' : '#6b7280' }}>{activeContact.online ? '● Active now' : '● Offline'}</div>
            </div>
            <div style={{ marginLeft: 'auto', display: 'flex', gap: '8px' }}>
              {['📞', '📹'].map(icon => (
                <button key={icon} style={{ padding: '6px 10px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.05)', fontSize: '14px', cursor: 'pointer' }}>{icon}</button>
              ))}
            </div>
          </div>

          {/* Messages */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {(messages[activeContact.id] || []).map((msg, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                style={{ display: 'flex', gap: '8px', flexDirection: msg.from === 'me' ? 'row-reverse' : 'row', alignItems: 'flex-end' }}>
                {msg.from === 'them' && (
                  <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: activeContact.gradient, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', fontWeight: 700, flexShrink: 0 }}>{activeContact.avatar}</div>
                )}
                <div style={{ maxWidth: '70%', padding: '10px 14px', borderRadius: msg.from === 'me' ? '14px 4px 14px 14px' : '4px 14px 14px 14px', background: msg.from === 'me' ? 'linear-gradient(135deg, #7c6aff, #6366f1)' : '#1a1a24', fontSize: '13px', lineHeight: 1.5, color: msg.from === 'me' ? 'white' : '#d1d5db' }}>
                  {msg.text}
                  <div style={{ fontSize: '10px', color: msg.from === 'me' ? 'rgba(255,255,255,0.5)' : '#6b7280', marginTop: '4px', textAlign: 'right' }}>{msg.time}</div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Input */}
          <div style={{ padding: '14px 16px', borderTop: '1px solid rgba(255,255,255,0.07)', display: 'flex', gap: '10px', alignItems: 'center' }}>
            <input value={newMsg} onChange={e => setNewMsg(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && sendMessage()}
              placeholder={`Message ${activeContact.name}...`}
              style={{ flex: 1, background: '#1a1a24', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '24px', padding: '10px 16px', fontSize: '13px', color: '#f1f0ff', outline: 'none' }} />
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={sendMessage}
              style={{ padding: '10px 18px', borderRadius: '24px', background: 'linear-gradient(135deg, #7c6aff, #6366f1)', border: 'none', color: 'white', fontWeight: 700, fontSize: '13px', cursor: 'pointer' }}>
              Send →
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  )
}