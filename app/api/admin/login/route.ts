import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'

// Simple in-memory rate limiter (resets on server restart)
const attempts = new Map<string, { count: number; resetAt: number }>()

function getIP(req: NextRequest) {
  return req.headers.get('x-forwarded-for')?.split(',')[0].trim() ?? 'unknown'
}

function isRateLimited(ip: string): boolean {
  const now = Date.now()
  const record = attempts.get(ip)
  if (!record || now > record.resetAt) {
    attempts.set(ip, { count: 1, resetAt: now + 15 * 60 * 1000 }) // 15 min window
    return false
  }
  record.count++
  if (record.count > 5) return true // max 5 attempts per 15 min
  return false
}

export async function POST(req: NextRequest) {
  const ip = getIP(req)

  if (isRateLimited(ip)) {
    return NextResponse.json({ error: 'Too many attempts. Try again in 15 minutes.' }, { status: 429 })
  }

  const { username, password } = await req.json()
  if (
    username !== process.env.ADMIN_USERNAME ||
    password !== process.env.ADMIN_PASSWORD
  ) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
  }

  // Clear failed attempts on success
  attempts.delete(ip)

  const cookieStore = await cookies()
  cookieStore.set('ss_admin', 'true', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24 * 7,
    path: '/',
  })
  return NextResponse.json({ ok: true })
}

export async function DELETE() {
  const cookieStore = await cookies()
  cookieStore.delete('ss_admin')
  return NextResponse.json({ ok: true })
}
