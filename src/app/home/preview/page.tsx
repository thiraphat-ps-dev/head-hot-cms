'use client'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Image from 'next/image'
import { Box, Typography, Stack, Paper, Divider, Chip, CircularProgress } from '@mui/material'
import type { Home, Media } from '@/payload-types'
import { useSearchParams } from 'next/navigation'

function getImageUrl(img?: number | Media | null): string | undefined {
  if (!img) return undefined
  if (typeof img === 'object' && 'url' in img && typeof img.url === 'string' && img.url) {
    return img.url
  }
  return undefined
}

function renderRichTextContent(content: Home['content']) {
  // Minimal plain text fallback for Payload Lexical richText
  if (!content || typeof content !== 'object' || !('root' in content)) return null
  const root = (
    content as {
      root?: { children?: Array<{ key?: string; children?: Array<{ text?: string }> }> }
    }
  ).root
  if (!root || !Array.isArray(root.children)) return null
  return root.children.map((block, i) => {
    if (block && Array.isArray(block.children)) {
      return (
        <div key={block.key ?? i}>
          {block.children.map((c) => (typeof c.text === 'string' ? c.text : '')).join(' ')}
        </div>
      )
    }
    return null
  })
}

export default function HomePreviewPage() {
  const searchParams = useSearchParams()
  const id = searchParams.get('id')
  const [doc, setDoc] = useState<Home | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!id) {
      setError('Not found')
      setLoading(false)
      return
    }
    const apiBase = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, '') || 'http://localhost:3000'
    if (!/^https?:\/\//.test(apiBase)) {
      setError('NEXT_PUBLIC_API_URL must be an absolute URL (e.g. https://domain.com)')
      setLoading(false)
      return
    }
    setLoading(true)
    axios
      .get(`${apiBase}/api/home/${id}`, { withCredentials: true })
      .then((res) => {
        const d: Home | undefined = res.data?.doc ?? res.data
        if (!d?.id) {
          setError('Not found')
          setDoc(null)
        } else {
          setDoc(d)
          setError(null)
        }
      })
      .catch((_err) => {
        setError('Not found')
        setDoc(null)
      })
      .finally(() => setLoading(false))
  }, [id])

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <CircularProgress />
      </Box>
    )
  }
  if (error || !doc) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <Typography color="error">Not found</Typography>
      </Box>
    )
  }

  const products = Array.isArray(doc.productList)
    ? doc.productList.filter((p) => typeof p?.id === 'string' && !!p.id)
    : []
  const events = Array.isArray(doc.events)
    ? doc.events.filter((e) => typeof e?.id === 'string' && !!e.id)
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
            >
              {renderRichTextContent(doc.content)}
            </Box>
          </Box>
        )}
      </Paper>
    </Box>
  )
}
