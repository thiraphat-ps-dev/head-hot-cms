import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import config from '@/payload.config'
import React from 'react'
import Image from 'next/image'
import { Box, Typography, Stack, Paper, Divider, Chip } from '@mui/material'

type Media = { url: string }

type Product = {
  id: string
  name: string
  price?: number
  description?: string
  link?: string
  image?: number | Media
}

type Event = {
  id: string
  title: string
  date?: string
  description?: string
  link?: string
  image?: number | Media
}

function getImageUrl(img?: number | { url?: string | null }): string | undefined {
  if (!img) return undefined
  if (typeof img === 'object' && 'url' in img && typeof img.url === 'string' && img.url) {
    return img.url
  }
  return undefined
}

export default async function HomePreviewPage({
  searchParams,
}: Readonly<{ searchParams: { id?: string } }>) {
  const id = searchParams?.id
  if (!id) return notFound()

  const payload = await getPayload({ config })
  const doc = await payload.findByID({ collection: 'home', id })
  if (!doc) return notFound()

  // Normalize productList/events: filter only items with id (string)
  const products = Array.isArray(doc.productList)
    ? doc.productList.filter((p) => typeof p?.id === 'string')
    : []
  const events = Array.isArray(doc.events)
    ? doc.events.filter((e) => typeof e?.id === 'string')
    : []

  return (
    <Box maxWidth={800} mx="auto" my={5} p={3}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
        <Typography variant="h4" fontWeight={700} color="primary.main" mb={2}>
          {doc.title}
        </Typography>
        {doc.heroBanner?.headline && (
          <Typography variant="h5" fontWeight={600} mb={1}>
            {doc.heroBanner.headline}
          </Typography>
        )}
        {(() => {
          const url = getImageUrl(doc.heroBanner?.image ?? undefined)
          return url ? (
            <Box my={3}>
              <Image
                src={url}
                alt={doc.heroBanner.headline ?? 'Hero Banner'}
                width={600}
                height={300}
                style={{ objectFit: 'cover', width: '100%', height: 'auto', borderRadius: 12 }}
              />
            </Box>
          ) : null
        })()}
        <Divider sx={{ my: 3 }} />
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={4}>
          <Box flex={1}>
            <Typography variant="h6" fontWeight={600} mb={1}>
              Products
            </Typography>
            {products.length ? (
              <Stack spacing={1}>
                {products.map((p) => {
                  const url = getImageUrl(p.image ?? undefined)
                  return (
                    <Paper
                      key={p.id}
                      sx={{ p: 2, borderRadius: 2, display: 'flex', alignItems: 'center', gap: 2 }}
                    >
                      {url && (
                        <Image
                          src={url}
                          alt={p.name ?? 'Product'}
                          width={60}
                          height={60}
                          style={{ borderRadius: 8, objectFit: 'cover' }}
                        />
                      )}
                      <Box>
                        <Typography fontWeight={600}>{p.name}</Typography>
                        {p.price && <Typography color="text.secondary">฿{p.price}</Typography>}
                        {p.description && <Typography variant="body2">{p.description}</Typography>}
                        {p.link && (
                          <Chip
                            label="Link"
                            component="a"
                            href={p.link}
                            clickable
                            size="small"
                            sx={{ mt: 1 }}
                          />
                        )}
                      </Box>
                    </Paper>
                  )
                })}
              </Stack>
            ) : (
              <Typography color="text.secondary">No products.</Typography>
            )}
          </Box>
          <Box flex={1}>
            <Typography variant="h6" fontWeight={600} mb={1}>
              Events
            </Typography>
            {events.length ? (
              <Stack spacing={1}>
                {events.map((e) => {
                  const url = getImageUrl(e.image ?? undefined)
                  return (
                    <Paper
                      key={e.id}
                      sx={{ p: 2, borderRadius: 2, display: 'flex', alignItems: 'center', gap: 2 }}
                    >
                      {url && (
                        <Image
                          src={url}
                          alt={e.title ?? 'Event'}
                          width={60}
                          height={60}
                          style={{ borderRadius: 8, objectFit: 'cover' }}
                        />
                      )}
                      <Box>
                        <Typography fontWeight={600}>{e.title}</Typography>
                        {e.date && (
                          <Typography color="text.secondary">
                            {new Date(e.date).toLocaleDateString()}
                          </Typography>
                        )}
                        {e.description && <Typography variant="body2">{e.description}</Typography>}
                        {e.link && (
                          <Chip
                            label="Link"
                            component="a"
                            href={e.link}
                            clickable
                            size="small"
                            sx={{ mt: 1 }}
                          />
                        )}
                      </Box>
                    </Paper>
                  )
                })}
              </Stack>
            ) : (
              <Typography color="text.secondary">No events.</Typography>
            )}
          </Box>
        </Stack>
        {doc.content && (
          <Box mb={3}>
            <Typography variant="h6" fontWeight={600} mb={1}>
              Content
            </Typography>
            <Box
              sx={{
                background: '#fafafa',
                borderRadius: 2,
                p: 2,
                border: '1px solid #eee',
                mb: 2,
                overflowX: 'auto',
              }}
              dangerouslySetInnerHTML={{ __html: Array.isArray(doc.content) ? doc.content.map((block: any) => block.children?.map((c: any) => c.text).join(' ')).join('<br/>') : doc.content }}
            />
          </Box>
        )}
      </Paper>
    </Box>
  )
}
