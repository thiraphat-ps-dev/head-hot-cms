import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@/payload.config'

// GET /api/payload/preview/home/[id]
export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params
  const payload = await getPayload({ config })
  // ดึงทั้ง draft และ published ของไอเท็มนี้ (ถ้ามี draft จะได้ draft, ถ้าไม่มีก็ published)
  const result = await payload.find({
    collection: 'home',
    where: { id: { equals: id } },
    limit: 1,
    draft: true,
  })
  if (result.docs.length === 0) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }
  return NextResponse.json(result.docs[0])
}
