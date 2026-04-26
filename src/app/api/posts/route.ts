 import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { prisma } from '@/lib/prisma'

export async function GET() {
  const posts = await prisma.post.findMany({
    include: {
      author: true,
      community: true,
      likes: true,
      comments: true,
    },
    orderBy: { createdAt: 'desc' },
    take: 20,
  })
  return NextResponse.json(posts)
}

export async function POST(req: Request) {
  const session = await getServerSession()
  if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { content, communityId } = await req.json()
  if (!content?.trim()) return NextResponse.json({ error: 'Content required' }, { status: 400 })

  const post = await prisma.post.create({
    data: {
      content,
      communityId,
      authorId: session.user.id,
    },
    include: { author: true, community: true, likes: true, comments: true },
  })

  return NextResponse.json(post)
}
