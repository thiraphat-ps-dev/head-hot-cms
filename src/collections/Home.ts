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
  ],
}

export default Home
