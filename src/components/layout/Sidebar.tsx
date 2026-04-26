 'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navItems = [
  { icon: '🏠', label: 'Home Feed',    href: '/feed' },
  { icon: '🌐', label: 'Communities',  href: '/communities' },
  { icon: '💬', label: 'Messages',     href: '/messages' },
  { icon: '🔖', label: 'Saved',        href: '/saved' },
  { icon: '📈', label: 'Analytics',    href: '/analytics' },
]

const communities = [
  { color: '#a78bfa', name: 'WebDev',        slug: 'webdev',       count: 12 },
  { color: '#38bdf8', name: 'DesignSystems',  slug: 'design',       count: 0 },
  { color: '#34d399', name: 'IndieHackers',   slug: 'indie',        count: 0 },
  { color: '#fbbf24', name: 'AI_Builders',    slug: 'ai',           count: 3 },
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="flex flex-col gap-3 sticky top-20">

      {/* Nav */}
      <div className="bg-[#111118] border border-white/[0.07] rounded-2xl p-4">
        <p className="text-[11px] font-semibold uppercase tracking-widest text-gray-500 mb-3">Navigate</p>
        {navItems.map(item => (
          <Link key={item.href} href={item.href}
            className={`flex items-center gap-3 px-3 py-2 rounded-xl text-sm transition-all mb-1
              ${pathname === item.href
                ? 'bg-[#7c6aff]/10 text-[#a78bfa]'
                : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}>
            <span className="w-7 h-7 bg-[#1a1a24] rounded-lg flex items-center justify-center text-sm">{item.icon}</span>
            {item.label}
          </Link>
        ))}
      </div>

      {/* Communities */}
      <div className="bg-[#111118] border border-white/[0.07] rounded-2xl p-4">
        <p className="text-[11px] font-semibold uppercase tracking-widest text-gray-500 mb-3">My Communities</p>
        {communities.map(c => (
          <Link key={c.slug} href={`/communities/${c.slug}`}
            className="flex items-center gap-3 px-2 py-1.5 rounded-xl text-sm text-gray-400 hover:text-white transition-all">
            <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: c.color }} />
            r/{c.name}
            {c.count > 0 && (
              <span className="ml-auto bg-[#7c6aff] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">{c.count}</span>
            )}
          </Link>
        ))}
        <Link href="/communities" className="text-[#a78bfa] text-xs px-2 mt-2 block hover:underline">+ Explore more</Link>
      </div>

      {/* Upgrade card */}
      <div className="bg-gradient-to-br from-[#7c6aff]/15 to-[#38bdf8]/10 border border-[#7c6aff]/30 rounded-2xl p-4">
        <p className="font-bold text-sm mb-1">Go Premium</p>
        <p className="text-xs text-gray-400 mb-3 leading-relaxed">Unlock AI features, analytics & no ads</p>
        <button className="w-full py-2 rounded-xl text-white text-xs font-bold"
          style={{ background: 'linear-gradient(135deg, #7c6aff, #6366f1)' }}>
          Upgrade ✦
        </button>
      </div>
    </aside>
  )
}
