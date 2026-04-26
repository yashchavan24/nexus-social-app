 'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function ComposePost({ user }: { user: any }) {
  const [content, setContent]   = useState('')
  const [loading, setLoading]   = useState(false)
  const [focused, setFocused]   = useState(false)

  const handlePost = async () => {
    if (!content.trim()) return
    setLoading(true)
    await fetch('/api/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content, communityId: 'default' }),
    })
    setContent('')
    setLoading(false)
  }

  return (
    <div className="bg-[#111118] border border-white/[0.07] rounded-2xl p-4">
      <div className="flex gap-3">
        <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0"
          style={{ background: 'linear-gradient(135deg, #7c6aff, #38bdf8)' }}>
          {user?.name?.charAt(0) || 'U'}
        </div>
        <div className="flex-1">
          <textarea
            value={content}
            onChange={e => setContent(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            placeholder="What's on your mind? Share with your communities..."
            rows={focused ? 3 : 1}
            className="w-full bg-[#1a1a24] border border-white/10 focus:border-[#7c6aff] rounded-xl px-4 py-2.5 text-sm text-gray-300 placeholder-gray-600 outline-none transition-all resize-none"
          />
        </div>
      </div>

      <AnimatePresence>
        {(focused || content) && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="flex items-center gap-2 mt-3 ml-[52px]"
          >
            {['🖼️ Photo', '🎬 Video', '📊 Poll', '🔗 Link'].map(btn => (
              <button key={btn} className="px-3 py-1.5 rounded-lg text-xs font-medium border border-white/10 bg-white/5 text-gray-400 hover:border-[#7c6aff] hover:text-white transition-all">
                {btn}
              </button>
            ))}
            <motion.button
              whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
              onClick={handlePost} disabled={loading || !content.trim()}
              className="ml-auto px-5 py-1.5 rounded-xl text-sm font-bold text-white disabled:opacity-40 transition-all"
              style={{ background: 'linear-gradient(135deg, #7c6aff, #6366f1)' }}
            >
              {loading ? '...' : 'Post →'}
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
