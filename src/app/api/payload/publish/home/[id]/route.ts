import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@/payload.config'

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params
  const { published } = await req.json()
  const payload = await getPayload({ config })

  if (published) {
    // Find all other published documents
    const others = await payload.find({
      collection: 'home',
      where: { published: { equals: true }, id: { not_equals: id } },
    })
    // Unpublish all other documents
    await Promise.all(
      others.docs.map((doc) =>
        payload.update({
          collection: 'home',
          id: doc.id,
          data: { published: false },
        }),
      ),
    )
    // Publish the selected document and update updatedAt
    const updated = await payload.update({
      collection: 'home',
      id,
      data: { published, updatedAt: new Date().toISOString() },
    })
    return NextResponse.json(updated)
  } else {
    // Just unpublish this document
    const updated = await payload.update({
      collection: 'home',
      id,
      data: { published },
    })
    return NextResponse.json(updated)
  }
}
