import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json([])
}

export async function POST(req: Request) {
  const { content } = await req.json()
  return NextResponse.json({ id: '1', content })
}
