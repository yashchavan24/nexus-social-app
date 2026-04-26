 'use client'
import { motion } from 'framer-motion'
import { useState } from 'react'

interface PostCardProps {
  post: {
    id: string
    content: string
    imageUrl?: string
    createdAt: string
    author: { name: string; image?: string; username?: string }
    community: { name: string; slug: string }
    likes: any[]
    comments: any[]
  }
  index?: number
}

export default function PostCard({ post, index = 0 }: PostCardProps) {
  const [liked, setLiked]       = useState(false)
  const [likeCount, setLikeCount] = useState(post.likes.length)
  const [bookmarked, setBookmarked] = useState(false)

  const toggleLike = async () => {
    setLiked(!liked)
    setLikeCount(liked ? likeCount - 1 : likeCount + 1)
    await fetch(`/api/posts/${post.id}/like`, { method: 'POST' })
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08 }}
      whileHover={{ y: -2 }}
      className="bg-[#111118] border border-white/[0.07] hover:border-white/[0.12] rounded-2xl p-4 cursor-pointer transition-all"
      style={{ boxShadow: 'none' }}
      onMouseEnter={e => (e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,0,0,0.4)')}
      onMouseLeave={e => (e.currentTarget.style.boxShadow = 'none')}
    >
      {/* Community badge */}
      <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-1 rounded-full mb-3"
        style={{ background: 'rgba(124,106,255,0.1)', color: '#a78bfa' }}>
        🌐 r/{post.community.name}
      </span>

      {/* Author row */}
      <div className="flex items-start gap-3 mb-3">
        <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0"
          style={{ background: 'linear-gradient(135deg, #7c3aed, #2563eb)' }}>
          {post.author.name?.charAt(0).toUpperCase()}
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-sm">{post.author.name}</span>
          </div>
          <span className="text-xs text-gray-500">@{post.author.username || 'user'} · {new Date(post.createdAt).toLocaleDateString()}</span>
        </div>
      </div>

      {/* Content */}
      <p className="text-sm text-gray-300 leading-relaxed mb-3">{post.content}</p>

      {/* Image if any */}
      {post.imageUrl && (
        <img src={post.imageUrl} alt="post" className="w-full rounded-xl mb-3 object-cover max-h-64" />
      )}

      {/* Actions */}
      <div className="flex items-center gap-1 pt-3 border-t border-white/[0.07]">
        <button onClick={toggleLike}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm transition-all hover:bg-white/5 ${liked ? 'text-red-400' : 'text-gray-500'}`}>
          {liked ? '♥' : '♡'} {likeCount}
        </button>
        <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm text-gray-500 hover:bg-white/5 transition-all">
          💬 {post.comments.length}
        </button>
        <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm text-gray-500 hover:bg-white/5 transition-all">
          ↗ Share
        </button>
        <button onClick={() => setBookmarked(!bookmarked)}
          className={`ml-auto px-3 py-1.5 rounded-lg text-sm transition-all hover:bg-white/5 ${bookmarked ? 'text-[#a78bfa]' : 'text-gray-500'}`}>
          🔖
        </button>
      </div>
    </motion.div>
  )
}
