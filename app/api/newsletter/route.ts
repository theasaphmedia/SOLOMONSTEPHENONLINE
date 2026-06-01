import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { email, name } = body

    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Valid email required' }, { status: 400 })
    }

    // Save to database
    try {
      const { sql } = await import('@/lib/db')
      await sql`
        CREATE TABLE IF NOT EXISTS ss_newsletter (
          id SERIAL PRIMARY KEY,
          email TEXT UNIQUE NOT NULL,
          name TEXT DEFAULT '',
          subscribed_at TIMESTAMPTZ DEFAULT NOW()
        )
      `
      await sql`
        INSERT INTO ss_newsletter (email, name, subscribed_at)
        VALUES (${email}, ${name || ''}, NOW())
        ON CONFLICT (email) DO NOTHING
      `
    } catch (dbErr) {
      console.error('DB insert error (non-fatal):', dbErr)
    }

    const { Resend } = await import('resend')
    const resend = new Resend(process.env.RESEND_API_KEY)

    // Notify Solomon of the new subscriber
    await resend.emails.send({
      from: 'Solomon Stephen <info@solomonstephen.com>',
      to: 'theasaphmedia@gmail.com',
      subject: `New newsletter subscriber: ${email}`,
      html: `
        <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; background: #1A2E1A; color: white; padding: 40px; border-radius: 12px;">
          <h2 style="color: #C9A84C; margin-bottom: 8px;">New Subscriber</h2>
          <p style="color: rgba(255,255,255,0.4); font-size: 13px; margin-bottom: 32px;">via solomonstephen.com newsletter signup</p>
          <table style="width: 100%; border-collapse: collapse;">
            ${name ? `<tr>
              <td style="padding: 12px 0; border-bottom: 1px solid rgba(201,168,76,0.15); color: rgba(255,255,255,0.5); font-size: 12px; letter-spacing: 0.1em; text-transform: uppercase; width: 120px;">Name</td>
              <td style="padding: 12px 0; border-bottom: 1px solid rgba(201,168,76,0.15); color: white;">${name}</td>
            </tr>` : ''}
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid rgba(201,168,76,0.15); color: rgba(255,255,255,0.5); font-size: 12px; letter-spacing: 0.1em; text-transform: uppercase;">Email</td>
              <td style="padding: 12px 0; border-bottom: 1px solid rgba(201,168,76,0.15); color: #C9A84C;">${email}</td>
            </tr>
          </table>
          <p style="margin-top: 28px; color: rgba(255,255,255,0.35); font-size: 12px;">Consider adding this person to your mailing list.</p>
        </div>
      `,
    })

    // Send a welcome email to the subscriber
    await resend.emails.send({
      from: 'Solomon Stephen <info@solomonstephen.com>',
      to: email,
      subject: 'Welcome — you\'re connected with Solomon Stephen',
      html: `
        <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; background: #0D1B0D; color: white; padding: 48px 40px; border-radius: 12px;">
          <div style="font-size: 11px; letter-spacing: 0.3em; text-transform: uppercase; color: rgba(201,168,76,0.6); margin-bottom: 32px;">The Worship Nation</div>
          <h1 style="font-size: 28px; font-weight: 400; color: #FAF7F2; line-height: 1.2; margin: 0 0 24px;">
            ${name ? `${name}, you're` : 'You\'re'} now connected.
          </h1>
          <p style="font-size: 15px; line-height: 1.85; color: rgba(255,255,255,0.55); margin: 0 0 32px;">
            Thank you for signing up. You'll hear from me when new music drops, events are announced,
            or something worth saying is ready to be said.
          </p>
          <p style="font-size: 15px; line-height: 1.85; color: rgba(255,255,255,0.55); margin: 0 0 40px;">
            In the meantime — come to a gathering. The Mid Day Worship Experience holds every Wednesday
            at 12 PM at TWN Studios, Ajah, Lagos. Come as you are.
          </p>
          <div style="border-top: 1px solid rgba(201,168,76,0.2); padding-top: 28px;">
            <p style="font-size: 13px; color: rgba(255,255,255,0.25); margin: 0 0 8px;">
              Solomon Stephen · <a href="https://solomonstephen.com" style="color: rgba(201,168,76,0.5); text-decoration: none;">solomonstephen.com</a>
            </p>
            <p style="font-size: 11px; color: rgba(255,255,255,0.15); margin: 0;">
              <a href="https://solomonstephen.com/unsubscribe?email=${encodeURIComponent(email)}" style="color: rgba(255,255,255,0.25); text-decoration: underline;">Unsubscribe</a>
            </p>
          </div>
        </div>
      `,
    })

    return NextResponse.json({ success: true })

  } catch (error) {
    console.error('Newsletter error:', error)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
