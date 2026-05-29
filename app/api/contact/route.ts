import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { firstName, lastName, email, subject, message } = body

    if (!firstName || !email || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const { Resend } = await import('resend')
    const resend = new Resend(process.env.RESEND_API_KEY)

    await resend.emails.send({
      from: 'Solomon Stephen <info@solomonstephen.com>',
      to: 'theasaphmedia@gmail.com',
      subject: `New message: ${subject || 'General Enquiry'} — ${firstName} ${lastName}`,
      html: `
        <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; background: #1A2E1A; color: white; padding: 40px; border-radius: 12px;">
          <h2 style="color: #C9A84C; margin-bottom: 8px;">New Message</h2>
          <p style="color: rgba(255,255,255,0.4); font-size: 13px; margin-bottom: 32px;">via solomonstephen.com contact form</p>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid rgba(201,168,76,0.15); color: rgba(255,255,255,0.5); font-size: 12px; letter-spacing: 0.1em; text-transform: uppercase; width: 120px;">Name</td>
              <td style="padding: 12px 0; border-bottom: 1px solid rgba(201,168,76,0.15); color: white;">${firstName} ${lastName}</td>
            </tr>
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid rgba(201,168,76,0.15); color: rgba(255,255,255,0.5); font-size: 12px; letter-spacing: 0.1em; text-transform: uppercase;">Email</td>
              <td style="padding: 12px 0; border-bottom: 1px solid rgba(201,168,76,0.15); color: #C9A84C;">${email}</td>
            </tr>
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid rgba(201,168,76,0.15); color: rgba(255,255,255,0.5); font-size: 12px; letter-spacing: 0.1em; text-transform: uppercase;">Subject</td>
              <td style="padding: 12px 0; border-bottom: 1px solid rgba(201,168,76,0.15); color: white;">${subject || 'General Enquiry'}</td>
            </tr>
          </table>
          <div style="margin-top: 32px;">
            <p style="color: rgba(255,255,255,0.5); font-size: 12px; letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 12px;">Message</p>
            <p style="color: rgba(255,255,255,0.85); font-size: 15px; line-height: 1.8; white-space: pre-wrap;">${message}</p>
          </div>
          <div style="margin-top: 40px; padding-top: 24px; border-top: 1px solid rgba(201,168,76,0.2);">
            <p style="color: rgba(255,255,255,0.25); font-size: 12px;">Reply directly to this email to respond to ${firstName}.</p>
          </div>
        </div>
      `,
      replyTo: email,
    })

    return NextResponse.json({ success: true })

  } catch (error) {
    console.error('Contact error:', error)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}