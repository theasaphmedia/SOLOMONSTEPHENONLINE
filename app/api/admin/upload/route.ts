import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { put } from '@vercel/blob'

async function isAdmin() {
  const cookieStore = await cookies()
  return cookieStore.get('ss_admin')?.value === 'true'
}

export async function POST(req: NextRequest) {
  if (!await isAdmin()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const formData = await req.formData()
  const file = formData.get('file') as File
  if (!file) return NextResponse.json({ error: 'No file provided' }, { status: 400 })

  const filename = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9._-]/g, '_')}`
  const blob = await put(filename, file, { access: 'public' })

  return NextResponse.json({ url: blob.url })
}
