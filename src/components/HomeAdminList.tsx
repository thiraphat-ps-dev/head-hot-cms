import React from 'react'
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Button,
} from '@mui/material'
import Link from 'next/link'
import OpenInNewIcon from '@mui/icons-material/OpenInNew'

// Define the HomeDoc type based on the Home collection fields
interface HeroBanner {
  headline: string
  subheadline?: string
  image?: string // Use string for image URL or path
}

interface Product {
  // Define fields as needed, fallback to minimal
  [key: string]: unknown
}

interface Event {
  // Define fields as needed, fallback to minimal
  [key: string]: unknown
}

interface HomeDoc {
  id: string
  title: string
  heroBanner?: HeroBanner
  productList?: Product[]
  events?: Event[]
  published?: boolean
  publishAt?: string
  unpublishAt?: string
  updatedAt?: string
}

interface HomeAdminListProps {
  data?: {
    docs?: HomeDoc[]
  }
}

const formatDate = (dateStr?: string, color?: string) => {
  if (!dateStr) return <Typography color="text.secondary">-</Typography>
  return (
    <Typography variant="body2" color={color}>
      {new Date(dateStr).toLocaleString()}
    </Typography>
  )
}

const HomeAdminList: React.FC<HomeAdminListProps> = ({ data }) => {
  const docs = data?.docs || []
  const sortedDocs = React.useMemo(() => {
    return docs.slice().sort((a, b) => {
      if (a.published === b.published) {
        const aTime = a.updatedAt ? new Date(a.updatedAt).getTime() : 0
        const bTime = b.updatedAt ? new Date(b.updatedAt).getTime() : 0
        return bTime - aTime
      }
      return a.published ? -1 : 1
    })
  }, [docs])

  return (
    <Box sx={{ p: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h5" fontWeight={700} color="primary.main">
          Home List
        </Typography>
        <Link href="/admin/collections/home/create" style={{ textDecoration: 'none' }}>
          <Button variant="contained" color="primary" startIcon={<OpenInNewIcon />}>
            Create New
          </Button>
        </Link>
      </Box>
      <TableContainer component={Paper} sx={{ borderRadius: 3, boxShadow: 3 }}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: 'grey.100' }}>
              <TableCell sx={{ fontWeight: 700 }}>Title</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Hero Headline</TableCell>
              <TableCell sx={{ fontWeight: 700 }} align="center">
                Product Count
              </TableCell>
              <TableCell sx={{ fontWeight: 700 }} align="center">
                Event Count
              </TableCell>
              <TableCell sx={{ fontWeight: 700 }} align="center">
                Published
              </TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Scheduled Publish</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Scheduled Unpublish</TableCell>
              <TableCell sx={{ fontWeight: 700 }} align="center">
                Preview
              </TableCell>
              <TableCell sx={{ fontWeight: 700 }} align="center">
                Edit
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedDocs.map((row) => (
              <TableRow
                key={row.id}
                sx={{
                  backgroundColor: row.published ? 'rgba(56, 142, 60, 0.08)' : undefined,
                  transition: 'background 0.2s',
                  '&:hover': { backgroundColor: 'grey.50' },
                }}
              >
                <TableCell sx={{ fontWeight: 600 }}>{row.title}</TableCell>
                <TableCell>{row.heroBanner?.headline}</TableCell>
                <TableCell align="center">{row.productList?.length ?? 0}</TableCell>
                <TableCell align="center">{row.events?.length ?? 0}</TableCell>
                <TableCell align="center">
                  {row.published ? (
                    <Typography color="success.main" fontWeight={700}>
                      ● Published
                    </Typography>
                  ) : (
                    <Typography color="text.secondary">-</Typography>
                  )}
                </TableCell>
                <TableCell>{formatDate(row.publishAt, 'info.main')}</TableCell>
                <TableCell>{formatDate(row.unpublishAt, 'warning.main')}</TableCell>
                <TableCell align="center">
                  <Link
                    href={`/home/preview?id=${row.id}`}
                    target="_blank"
                    style={{ textDecoration: 'none' }}
                  >
                    <Button size="small" variant="outlined" startIcon={<OpenInNewIcon />}>
                      Preview
                    </Button>
                  </Link>
                </TableCell>
                <TableCell align="center">
                  <Link
                    href={`/admin/collections/home/${row.id}`}
                    style={{ textDecoration: 'none' }}
                  >
                    <Button size="small" variant="contained" color="secondary">
                      Edit
                    </Button>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  )
}

export default HomeAdminList
