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
import type { Home } from '../payload-types'

type HomeDoc = Home

interface HomeAdminListProps {
  data?: {
    docs?: HomeDoc[]
  }
}

const formatDate = (dateStr?: string | null, color?: string) => {
  if (!dateStr) return <Typography color="text.secondary">-</Typography>
  return (
    <Typography variant="body2" color={color}>
      {new Date(dateStr).toLocaleString()}
    </Typography>
  )
}

const HomeAdminList: React.FC<HomeAdminListProps> = ({ data }) => {
  const sortedDocs = React.useMemo(() => {
    const docs = data?.docs || []
    // Sort by updatedAt (latest first)
    return docs.slice().sort((a, b) => {
      const aTime = a.updatedAt ? new Date(a.updatedAt).getTime() : 0
      const bTime = b.updatedAt ? new Date(b.updatedAt).getTime() : 0
      return bTime - aTime
    })
  }, [data?.docs])

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
                <span>Status</span>
              </TableCell>
              <TableCell sx={{ fontWeight: 700 }} align="center">
                Preview
              </TableCell>
              <TableCell sx={{ fontWeight: 700 }} align="center">
                Edit
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedDocs.map(({ id, title, heroBanner, productList, events, _status }) => (
              <TableRow
                key={id}
                sx={{
                  transition: 'background 0.2s',
                  '&:hover': { backgroundColor: 'grey.50' },
                }}
              >
                <TableCell sx={{ fontWeight: 600 }}>
                  {title || <Typography color="text.secondary">-</Typography>}
                </TableCell>
                <TableCell>
                  {heroBanner?.headline || <Typography color="text.secondary">-</Typography>}
                </TableCell>
                <TableCell align="center">{productList?.length ?? 0}</TableCell>
                <TableCell align="center">{events?.length ?? 0}</TableCell>
                <TableCell align="center">
                  {_status === 'published' ? (
                    <Typography color="success.main" fontWeight={700}>
                      ● Published
                    </Typography>
                  ) : _status === 'draft' ? (
                    <Typography color="warning.main" fontWeight={700}>
                      Draft
                    </Typography>
                  ) : (
                    <Typography color="text.secondary">-</Typography>
                  )}
                </TableCell>
                <TableCell align="center">
                  <Link
                    href={`/home/preview?id=${id}`}
                    target="_blank"
                    style={{ textDecoration: 'none' }}
                  >
                    <Button size="small" variant="outlined" startIcon={<OpenInNewIcon />}>
                      Preview
                    </Button>
                  </Link>
                </TableCell>
                <TableCell align="center">
                  <Link href={`/admin/collections/home/${id}`} style={{ textDecoration: 'none' }}>
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
