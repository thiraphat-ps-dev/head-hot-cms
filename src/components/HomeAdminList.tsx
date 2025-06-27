import React from 'react'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Typography from '@mui/material/Typography'

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
}

interface HomeAdminListProps {
  data?: {
    docs?: HomeDoc[]
  }
}

const HomeAdminList = (props: HomeAdminListProps) => {
  const docs = props?.data?.docs || []

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h5" mb={2}>
        Home List (Custom Table)
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Hero Headline</TableCell>
              <TableCell>Product Count</TableCell>
              <TableCell>Event Count</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {docs.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.title}</TableCell>
                <TableCell>{row.heroBanner?.headline}</TableCell>
                <TableCell>{row.productList?.length ?? 0}</TableCell>
                <TableCell>{row.events?.length ?? 0}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  )
}

export default HomeAdminList
