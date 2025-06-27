import type { CollectionConfig } from 'payload'

export const Home: CollectionConfig = {
  slug: 'home',
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
      name: 'published',
      type: 'checkbox',
      label: 'Published',
      defaultValue: false,
      admin: { position: 'sidebar' },
    },
    {
      name: 'publishAt',
      type: 'date',
      label: 'Scheduled Publish At',
      admin: {
        position: 'sidebar',
        date: { pickerAppearance: 'dayAndTime' },
      },
    },
    {
      name: 'unpublishAt',
      type: 'date',
      label: 'Scheduled Unpublish At',
      admin: {
        position: 'sidebar',
        date: { pickerAppearance: 'dayAndTime' },
      },
    },
    {
      name: 'content',
      type: 'richText',
      label: 'Content',
      required: false,
    },
  ],
  hooks: {
    beforeChange: [
      async ({ data, req, operation, originalDoc, context }) => {
        // Only enforce on create/update
        if ((operation === 'create' || operation === 'update') && data.published) {
          const payload = req.payload
          // Unpublish all other docs
          const others = await payload.find({
            collection: 'home',
            where: {
              published: { equals: true },
              id: { not_equals: originalDoc?.id || undefined },
            },
          })
          await Promise.all(
            others.docs.map((doc) =>
              payload.update({
                collection: 'home',
                id: doc.id,
                data: { published: false },
              }),
            ),
          )
        }
        return data
      },
    ],
  },
}

export default Home
