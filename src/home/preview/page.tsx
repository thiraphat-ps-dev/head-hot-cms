import React, { useEffect, useState } from 'react'

interface HomeData {
  _id: string
  title: string
  content: string
  // เพิ่ม field อื่น ๆ ตาม schema จริง
}

export default function HomePreviewPage() {
  const [data, setData] = useState<HomeData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetch('/api/payload/publish/home')
      .then(async (res) => {
        if (!res.ok) throw new Error('ไม่พบข้อมูลที่ publish')
        return res.json()
      })
      .then(setData)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <div>กำลังโหลด...</div>
  if (error) return <div>เกิดข้อผิดพลาด: {error}</div>
  if (!data) return <div>ไม่พบข้อมูล</div>

  return (
    <div style={{ maxWidth: 600, margin: '0 auto', padding: 24 }}>
      <h1>Preview: {data.title}</h1>
      <div style={{ whiteSpace: 'pre-line', marginTop: 16 }}>{data.content}</div>
      {/* เพิ่มการแสดงผล field อื่น ๆ ตามต้องการ */}
    </div>
  )
}
