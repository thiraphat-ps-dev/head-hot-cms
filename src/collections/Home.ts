import type { CollectionConfig } from 'payload'

export const Home: CollectionConfig = {
  slug: 'home',
  versions: {
    drafts: true, // เปิดใช้งาน versioning และ draft
  },
  admin: {
    useAsTitle: 'title',
    components: {
      views: {
        list: {
          // Use dot-slash path for Payload admin compatibility
          Component: './components/HomeAdminList',
        },
      },
    },
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Page Title',
      required: true,
    },
    {
      name: 'heroBanner',
      type: 'group',
      label: 'Hero Banner',
      fields: [
        {
          name: 'headline',
          type: 'text',
          label: 'Headline',
          required: true,
        },
        {
          name: 'subheadline',
          type: 'text',
          label: 'Subheadline',
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          label: 'Banner Image',
        },
        {
          name: 'cta',
          type: 'text',
          label: 'Call to Action',
        },
        {
          name: 'ctaLink',
          type: 'text',
          label: 'CTA Link',
        },
      ],
    },
    {
      name: 'productList',
      type: 'array',
      label: 'Product List',
      fields: [
        {
          name: 'name',
          type: 'text',
          label: 'Product Name',
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
          label: 'Product Description',
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          label: 'Product Image',
        },
        {
          name: 'price',
          type: 'number',
          label: 'Price',
        },
        {
          name: 'link',
          type: 'text',
          label: 'Product Link',
        },
      ],
    },
    {
      name: 'events',
      type: 'array',
      label: 'Events',
      fields: [
        {
          name: 'title',
          type: 'text',
          label: 'Event Title',
          required: true,
        },
        {
          name: 'date',
          type: 'date',
          label: 'Event Date',
        },
        {
          name: 'description',
          type: 'textarea',
          label: 'Event Description',
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          label: 'Event Image',
        },
        {
          name: 'link',
          type: 'text',
          label: 'Event Link',
        },
      ],
    },
    {
      name: 'scheduledPublishAt',
      type: 'date',
      label: 'Scheduled Publish At',
      required: false,
      admin: {
        position: 'sidebar',
        date: { pickerAppearance: 'dayAndTime' },
        description: 'ตั้งเวลาสำหรับเผยแพร่เนื้อหาอัตโนมัติ',
      },
    },
    {
      name: 'scheduledUnpublishAt',
      type: 'date',
      label: 'Scheduled Unpublish At',
      required: false,
      admin: {
        position: 'sidebar',
        date: { pickerAppearance: 'dayAndTime' },
        description: 'ตั้งเวลาสำหรับซ่อน/ถอดเนื้อหาอัตโนมัติ',
      },
    },
    {
      name: 'content',
      type: 'richText',
      label: 'Content',
      required: false,
    },
    {
      name: 'categories',
      type: 'relationship',
      relationTo: ['categories' as const],
      hasMany: true,
      label: 'Categories',
      required: false,
    },
  ],
  hooks: {
    afterChange: [
      async ({ doc, previousDoc, req, operation }) => {
        // เฉพาะกรณี publish (draft -> published)
        if (
          operation === 'update' &&
          doc._status === 'published' &&
          previousDoc?._status !== 'published'
        ) {
          const payload = req.payload
          // หา doc อื่นที่ published อยู่ (ยกเว้นตัวเอง)
          const others = await payload.find({
            collection: 'home',
            where: {
              _status: { equals: 'published' },
              id: { not_equals: doc.id },
            },
            limit: 100,
          })
          // Unpublish ทุก doc อื่น (สร้าง draft ใหม่ทับ published)
          await Promise.all(
            others.docs.map((other) =>
              payload.update({
                collection: 'home',
                id: other.id,
                data: {}, // ไม่ต้องแก้ field ใด แค่ save draft ใหม่
                draft: true,
              }),
            ),
          )
        }
        // Scheduling: ถ้า scheduledPublishAt ถึงเวลา ให้ publish อัตโนมัติ
        if (
          doc.scheduledPublishAt &&
          new Date(doc.scheduledPublishAt) <= new Date() &&
          doc._status !== 'published'
        ) {
          await req.payload.update({
            collection: 'home',
            id: doc.id,
            data: {},
            draft: false,
          })
        }
        // Scheduling: ถ้า scheduledUnpublishAt ถึงเวลา ให้ unpublish อัตโนมัติ
        if (
          doc.scheduledUnpublishAt &&
          new Date(doc.scheduledUnpublishAt) <= new Date() &&
          doc._status === 'published'
        ) {
          await req.payload.update({
            collection: 'home',
            id: doc.id,
            data: {},
            draft: true,
          })
        }
      },
    ],
  },
}

export default Home
