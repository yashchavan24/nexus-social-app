 import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import Sidebar from '@/components/layout/Sidebar'
import RightPanel from '@/components/layout/RightPanel'
import PostCard from '@/components/feed/PostCard'
import ComposePost from '@/components/feed/ComposePost'

export default async function FeedPage() {
  const session = await getServerSession()
  if (!session) redirect('/login')

  return (
    <div className="min-h-screen bg-[#09090f] text-white">
      <div className="max-w-6xl mx-auto px-4 py-6 grid grid-cols-[240px_1fr_300px] gap-4">
        <Sidebar />
        <main className="flex flex-col gap-4">
          <ComposePost user={session.user} />
          {/* Posts will load here */}
        </main>
        <RightPanel />
      </div>
    </div>
  )
}
