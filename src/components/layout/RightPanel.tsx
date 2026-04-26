 import { useState } from 'react'

const trending = [
  { tag: '#ReactConf2025',   count: '24.3k' },
  { tag: '#FullStackLaunch', count: '18.7k' },
  { tag: '#IndieHackers',    count: '12.1k' },
  { tag: '#OpenSource',      count: '9.8k'  },
]

const suggested = [
  { name: 'Tanvir N.',  bio: 'Senior @Vercel · Next.js core', gradient: 'linear-gradient(135deg,#7c3aed,#2563eb)' },
  { name: 'Ana Lima',   bio: 'Design @Figma · Open source',   gradient: 'linear-gradient(135deg,#0891b2,#0d9488)' },
  { name: 'Raj Kumar',  bio: 'Founder @IndieHQ · Shipping',   gradient: 'linear-gradient(135deg,#d97706,#b45309)' },
]

export default function RightPanel() {
  return (
    <aside className="flex flex-col gap-3 sticky top-20">

      {/* Trending */}
      <div className="bg-[#111118] border border-white/[0.07] rounded-2xl p-4">
        <h3 className="font-bold text-sm mb-4 flex items-center gap-2">🔥 Trending</h3>
        {trending.map((t, i) => (
          <div key={t.tag} className="flex items-center gap-3 py-2 border-b border-white/[0.05] last:border-0 cursor-pointer group">
            <span className="text-xs text-gray-500 w-4 font-mono">{i + 1}</span>
            <div className="flex-1">
              <p className="text-sm font-semibold group-hover:text-[#a78bfa] transition-colors">{t.tag}</p>
              <p className="text-xs text-gray-500">{t.count} posts</p>
            </div>
            <span className="text-xs text-green-400">↑</span>
          </div>
        ))}
      </div>

      {/* Who to follow */}
      <div className="bg-[#111118] border border-white/[0.07] rounded-2xl p-4">
        <h3 className="font-bold text-sm mb-4">✦ Who to Follow</h3>
        {suggested.map(s => (
          <SuggestItem key={s.name} {...s} />
        ))}
      </div>
    </aside>
  )
}

function SuggestItem({ name, bio, gradient }: any) {
  const [following, setFollowing] = useState(false)
  return (
    <div className="flex items-center gap-3 py-2 border-b border-white/[0.05] last:border-0">
      <div className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
        style={{ background: gradient }}>
        {name.charAt(0)}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold truncate">{name}</p>
        <p className="text-xs text-gray-500 truncate">{bio}</p>
      </div>
      <button onClick={() => setFollowing(!following)}
        className={`px-3 py-1 rounded-full text-xs font-semibold border transition-all ${
          following ? 'border-green-500 text-green-400 bg-green-500/10' : 'border-[#7c6aff] text-[#a78bfa] bg-[#7c6aff]/10 hover:bg-[#7c6aff] hover:text-white'}`}>
        {following ? 'Following' : 'Follow'}
      </button>
    </div>
  )
}
