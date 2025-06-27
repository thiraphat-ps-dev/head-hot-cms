'use client'
import React from 'react'
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Stack,
  Button,
} from '@mui/material'
import Image from 'next/image'

// ตัวอย่างข้อมูล mock (ควร fetch จาก API จริงใน production)
const mockData = {
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

export default function HomeTableList() {
  const { productList, events } = mockData
  return (
    <Box sx={{ p: { xs: 2, md: 4 }, maxWidth: 1200, mx: 'auto' }}>
      <Typography variant="h4" mb={2} sx={{ fontWeight: 600, color: 'secondary.main' }}>
        Product List
      </Typography>
      <TableContainer component={Paper} sx={{ mb: 6 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Image</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Link</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {productList.map((product, idx) => (
              <TableRow key={idx}>
                <TableCell>
                  <Box sx={{ width: 60, height: 60, position: 'relative' }}>
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      style={{ objectFit: 'cover', borderRadius: 8 }}
                    />
                  </Box>
                </TableCell>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.description}</TableCell>
                <TableCell>฿{product.price}</TableCell>
                <TableCell>
                  <Button href={product.link} size="small" variant="outlined">
                    View
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Typography variant="h4" mb={2} sx={{ fontWeight: 600, color: 'secondary.main' }}>
        Events
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Image</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Link</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {events.map((event, idx) => (
              <TableRow key={idx}>
                <TableCell>
                  <Box sx={{ width: 60, height: 60, position: 'relative' }}>
                    <Image
                      src={event.image}
                      alt={event.title}
                      fill
                      style={{ objectFit: 'cover', borderRadius: 8 }}
                    />
                  </Box>
                </TableCell>
                <TableCell>{event.title}</TableCell>
                <TableCell>{event.description}</TableCell>
                <TableCell>{event.date}</TableCell>
                <TableCell>
                  <Button href={event.link} size="small" variant="outlined">
                    Read more
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  )
}
