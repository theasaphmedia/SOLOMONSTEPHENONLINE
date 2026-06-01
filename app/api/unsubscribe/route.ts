import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const email = req.nextUrl.searchParams.get('email')
  if (!email) return NextResponse.redirect(new URL('/unsubscribe?error=missing', req.url))

  try {
    const { sql } = await import('@/lib/db')
    await sql`DELETE FROM ss_newsletter WHERE email = ${email}`
    return NextResponse.redirect(new URL(`/unsubscribe?success=1&email=${encodeURIComponent(email)}`, req.url))
  } catch {
    return NextResponse.redirect(new URL('/unsubscribe?error=server', req.url))
  }
}

export async function POST(req: NextRequest) {
  const { email } = await req.json()
  if (!email) return NextResponse.json({ error: 'Email required' }, { status: 400 })

  try {
    const { sql } = await import('@/lib/db')
    await sql`DELETE FROM ss_newsletter WHERE email = ${email}`
    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
