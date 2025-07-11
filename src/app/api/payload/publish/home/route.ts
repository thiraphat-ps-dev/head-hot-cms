import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@/payload.config'

// GET /api/payload/publish/home
export async function GET(_req: NextRequest) {
  const payload = await getPayload({ config })
  // Find the published home document (Payload Drafts)
  const result = await payload.find({
    collection: 'home',
    where: { _status: { equals: 'published' } },
    limit: 1,
    sort: '-updatedAt',
  })
  if (result.docs.length === 0) {
    return NextResponse.json({ error: 'No published home found' }, { status: 404 })
  }
  return NextResponse.json(result.docs[0])
}
