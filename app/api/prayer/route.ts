import { NextRequest, NextResponse } from 'next/server'

const attempts = new Map<string, { count: number; resetAt: number }>()

function isRateLimited(ip: string): boolean {
  const now = Date.now()
  const record = attempts.get(ip)
  if (!record || now > record.resetAt) {
    attempts.set(ip, { count: 1, resetAt: now + 60 * 60 * 1000 })
    return false
  }
  record.count++
  return record.count > 3
}

export async function GET() {
  try {
    const { sql } = await import('@/lib/db')
    await sql`
      CREATE TABLE IF NOT EXISTS ss_prayer_requests (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT DEFAULT '',
        request TEXT NOT NULL,
        created_at TIMESTAMPTZ DEFAULT NOW(),
        prayed BOOLEAN DEFAULT FALSE
      )
    `
    const rows = await sql`SELECT * FROM ss_prayer_requests ORDER BY created_at DESC`
    return NextResponse.json(rows)
  } catch {
    return NextResponse.json([], { status: 200 })
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const { id } = await req.json()
    const { sql } = await import('@/lib/db')
    await sql`UPDATE ss_prayer_requests SET prayed = TRUE WHERE id = ${id}`
    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0].trim() ?? 'unknown'
    if (isRateLimited(ip)) return NextResponse.json({ error: 'Too many requests' }, { status: 429 })

    const { name, email, request, _honeypot } = await req.json()
    if (_honeypot) return NextResponse.json({ ok: true })
    if (!name || !request || request.length < 5) return NextResponse.json({ error: 'Missing fields' }, { status: 400 })

    const { sql } = await import('@/lib/db')
    await sql`
      CREATE TABLE IF NOT EXISTS ss_prayer_requests (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT DEFAULT '',
        request TEXT NOT NULL,
        created_at TIMESTAMPTZ DEFAULT NOW(),
        prayed BOOLEAN DEFAULT FALSE
      )
    `
    await sql`INSERT INTO ss_prayer_requests (name, email, request) VALUES (${name}, ${email || ''}, ${request})`

    const { Resend } = await import('resend')
    const resend = new Resend(process.env.RESEND_API_KEY)

    await resend.emails.send({
      from: 'Solomon Stephen <info@solomonstephen.com>',
      to: 'theasaphmedia@gmail.com',
      subject: `Prayer Request — ${name}`,
      html: `
        <div style="font-family:Georgia,serif;max-width:600px;margin:0 auto;background:#0D1B0D;color:white;padding:40px;border-radius:12px;">
          <h2 style="color:#C9A84C;margin-bottom:8px;">Prayer Request</h2>
          <p style="color:rgba(255,255,255,0.4);font-size:13px;margin-bottom:32px;">via solomonstephen.com/live</p>
          <table style="width:100%;border-collapse:collapse;">
            <tr>
              <td style="padding:12px 0;border-bottom:1px solid rgba(201,168,76,0.15);color:rgba(255,255,255,0.5);font-size:12px;letter-spacing:0.1em;text-transform:uppercase;width:120px;">Name</td>
              <td style="padding:12px 0;border-bottom:1px solid rgba(201,168,76,0.15);color:white;">${name}</td>
            </tr>
            ${email ? `<tr><td style="padding:12px 0;border-bottom:1px solid rgba(201,168,76,0.15);color:rgba(255,255,255,0.5);font-size:12px;letter-spacing:0.1em;text-transform:uppercase;">Email</td><td style="padding:12px 0;border-bottom:1px solid rgba(201,168,76,0.15);color:#C9A84C;">${email}</td></tr>` : ''}
          </table>
          <div style="margin-top:28px;">
            <p style="color:rgba(255,255,255,0.5);font-size:12px;letter-spacing:0.1em;text-transform:uppercase;margin-bottom:12px;">Prayer Request</p>
            <p style="color:rgba(255,255,255,0.85);font-size:15px;line-height:1.8;white-space:pre-wrap;">${request}</p>
          </div>
        </div>
      `,
      replyTo: email || undefined,
    })

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error('Prayer request error:', error)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
