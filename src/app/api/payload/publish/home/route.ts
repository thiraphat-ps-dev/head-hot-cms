import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@/payload.config'

// GET /api/payload/publish/home
export async function GET(req: NextRequest) {
  const payload = await getPayload({ config })
  // Find the published home document
  const result = await payload.find({
    collection: 'home',
    where: { published: { equals: true } },
    limit: 1,
  })
  if (result.docs.length === 0) {
    return NextResponse.json({ error: 'No published home found' }, { status: 404 })
  }
  return NextResponse.json(result.docs[0])
}
