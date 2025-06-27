import payload from 'payload'
import dotenv from 'dotenv'

dotenv.config()

async function runScheduler() {
  await payload.init({ config: require.resolve('../payload.config') })

  const now = new Date()

  // 1. Publish: หา home ที่ publishAt <= now, published=false
  const toPublish = await payload.find({
    collection: 'home',
    where: {
      publishAt: { less_than_equal: now.toISOString() },
      published: { equals: false },
    },
  })

  if (toPublish.docs.length > 0) {
    // Unpublish อันอื่นก่อน (enforce publish ได้ทีละ 1 อัน)
    await Promise.all(
      toPublish.docs.map(async (doc) => {
        // Unpublish อันอื่น
        const others = await payload.find({
          collection: 'home',
          where: { published: { equals: true }, id: { not_equals: doc.id } },
        })
        await Promise.all(
          others.docs.map((other) =>
            payload.update({
              collection: 'home',
              id: other.id,
              data: { published: false },
            }),
          ),
        )
        // Publish ตัวนี้
        await payload.update({
          collection: 'home',
          id: doc.id,
          data: { published: true },
        })
      }),
    )
    console.log(`[${now.toISOString()}] Published scheduled home(s).`)
  }

  // 2. Unpublish: หา home ที่ unpublishAt <= now, published=true
  const toUnpublish = await payload.find({
    collection: 'home',
    where: {
      unpublishAt: { less_than_equal: now.toISOString() },
      published: { equals: true },
    },
  })
  await Promise.all(
    toUnpublish.docs.map((doc) =>
      payload.update({
        collection: 'home',
        id: doc.id,
        data: { published: false },
      }),
    ),
  )
  if (toUnpublish.docs.length > 0) {
    console.log(`[${now.toISOString()}] Unpublished scheduled home(s).`)
  }

  process.exit(0)
}

runScheduler().catch((err) => {
  console.error(err)
  process.exit(1)
})
