'use client'
import React from 'react'
import Image from 'next/image'
import { Box, Typography, Button, Card, CardContent, Stack } from '@mui/material'

// ตัวอย่างข้อมูล mock (ควร fetch จาก API จริงใน production)
const mockData = {
  heroBanner: {
    headline: 'Welcome to Head Hot CMS!',
    subheadline: 'The best CMS for your business.',
    image: '/banner.jpg',
    cta: 'Get Started',
    ctaLink: '/signup',
  },
  productList: [
    {
      name: 'Product 1',
      description: 'Description for product 1',
      image: '/product1.jpg',
      price: 100,
      link: '/product/1',
    },
    {
      name: 'Product 2',
      description: 'Description for product 2',
      image: '/product2.jpg',
      price: 200,
      link: '/product/2',
    },
  ],
  events: [
    {
      title: 'Event 1',
      date: '2024-07-01',
      description: 'Event 1 details',
      image: '/event1.jpg',
      link: '/event/1',
    },
  ],
}

export default function HomePage() {
  const { heroBanner, productList, events } = mockData
  return (
    <Box sx={{ p: { xs: 2, md: 4 }, maxWidth: 1200, mx: 'auto' }}>
      {/* Hero Banner */}
      <Box
        sx={{
          mb: 6,
          textAlign: 'center',
          bgcolor: 'primary.light',
          borderRadius: 4,
          py: 6,
          px: 2,
          boxShadow: 2,
        }}
      >
        <Image
          src={heroBanner.image}
          alt="Hero Banner"
          width={600}
          height={300}
          style={{
            maxWidth: 600,
            width: '100%',
            borderRadius: 16,
            boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
            objectFit: 'cover',
          }}
          priority
        />
        <Typography variant="h3" mt={3} sx={{ fontWeight: 700, color: 'primary.main' }}>
          {heroBanner.headline}
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>
          {heroBanner.subheadline}
        </Typography>
        <Button
          variant="contained"
          color="primary"
          href={heroBanner.ctaLink}
          sx={{ mt: 2, px: 4, py: 1.5, fontSize: 18, borderRadius: 8 }}
        >
          {heroBanner.cta}
        </Button>
      </Box>

      {/* Product List */}
      <Typography variant="h4" mb={2} sx={{ fontWeight: 600, color: 'secondary.main' }}>
        Products
      </Typography>
      <Stack direction="row" flexWrap="wrap" gap={4} mb={8}>
        {productList.map((product, idx) => (
          <Box key={idx} sx={{ flex: '1 1 300px', minWidth: 280, maxWidth: 360 }}>
            <Card
              sx={{
                borderRadius: 4,
                boxShadow: 3,
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <Box sx={{ width: '100%', height: 180, position: 'relative' }}>
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  style={{ objectFit: 'cover', borderTopLeftRadius: 16, borderTopRightRadius: 16 }}
                  sizes="(max-width: 600px) 100vw, 360px"
                />
              </Box>
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  {product.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  {product.description}
                </Typography>
                <Typography variant="subtitle1" color="primary" sx={{ fontWeight: 700 }}>
                  ฿{product.price}
                </Typography>
                <Button size="small" href={product.link} sx={{ mt: 2, borderRadius: 6 }}>
                  View
                </Button>
              </CardContent>
            </Card>
          </Box>
        ))}
      </Stack>

      {/* Events */}
      <Typography variant="h4" mb={2} sx={{ fontWeight: 600, color: 'secondary.main' }}>
        Events
      </Typography>
      <Stack direction="row" flexWrap="wrap" gap={4}>
        {events.map((event, idx) => (
          <Box key={idx} sx={{ flex: '1 1 300px', minWidth: 280, maxWidth: 360 }}>
            <Card
              sx={{
                borderRadius: 4,
                boxShadow: 2,
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <Box sx={{ width: '100%', height: 160, position: 'relative' }}>
                <Image
                  src={event.image}
                  alt={event.title}
                  fill
                  style={{ objectFit: 'cover', borderTopLeftRadius: 16, borderTopRightRadius: 16 }}
                  sizes="(max-width: 600px) 100vw, 360px"
                />
              </Box>
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  {event.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  {event.description}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {event.date}
                </Typography>
                <Button size="small" href={event.link} sx={{ mt: 2, borderRadius: 6 }}>
                  Read more
                </Button>
              </CardContent>
            </Card>
          </Box>
        ))}
      </Stack>
    </Box>
  )
}
