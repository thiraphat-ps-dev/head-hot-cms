'use client'
import Checkbox from '@mui/material/Checkbox'
import React from 'react'

interface PublishedCellProps {
  id: string
  published: boolean
}

export default function PublishedCell(props: Readonly<PublishedCellProps>) {
  const { id, published } = props
  return (
    <Checkbox
      checked={published}
      onChange={async (e) => {
        await fetch(`/api/payload/publish/home/${id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ published: e.target.checked }),
        })
        window.location.reload()
      }}
      color="primary"
    />
  )
}
