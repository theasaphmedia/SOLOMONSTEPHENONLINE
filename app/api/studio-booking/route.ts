import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, email, phone, service, date, notes } = body

    if (!name || !email) {
      return NextResponse.json({ error: 'Name and email required' }, { status: 400 })
    }

    const { Resend } = await import('resend')
    const resend = new Resend(process.env.RESEND_API_KEY)

    await resend.emails.send({
      from: 'TWN Studios <info@solomonstephen.com>',
      to: 'theasaphmedia@gmail.com',
      subject: `Studio Booking Enquiry — ${name}${service ? ' · ' + service : ''}`,
      replyTo: email,
      html: `
        <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; background: #080B08; color: white; padding: 40px; border-radius: 12px;">
          <h2 style="color: #C9A84C; margin-bottom: 6px;">New Studio Booking</h2>
          <p style="color: rgba(255,255,255,0.35); font-size: 13px; margin-bottom: 32px;">via TWN Studios booking form</p>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid rgba(201,168,76,0.1); color: rgba(255,255,255,0.4); font-size: 11px; letter-spacing: 0.12em; text-transform: uppercase; width: 130px;">Name</td>
              <td style="padding: 12px 0; border-bottom: 1px solid rgba(201,168,76,0.1); color: white; font-size: 15px;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid rgba(201,168,76,0.1); color: rgba(255,255,255,0.4); font-size: 11px; letter-spacing: 0.12em; text-transform: uppercase;">Email</td>
              <td style="padding: 12px 0; border-bottom: 1px solid rgba(201,168,76,0.1); color: #C9A84C;">${email}</td>
            </tr>
            ${phone ? `<tr>
              <td style="padding: 12px 0; border-bottom: 1px solid rgba(201,168,76,0.1); color: rgba(255,255,255,0.4); font-size: 11px; letter-spacing: 0.12em; text-transform: uppercase;">Phone</td>
              <td style="padding: 12px 0; border-bottom: 1px solid rgba(201,168,76,0.1); color: white;">${phone}</td>
            </tr>` : ''}
            ${service ? `<tr>
              <td style="padding: 12px 0; border-bottom: 1px solid rgba(201,168,76,0.1); color: rgba(255,255,255,0.4); font-size: 11px; letter-spacing: 0.12em; text-transform: uppercase;">Service</td>
              <td style="padding: 12px 0; border-bottom: 1px solid rgba(201,168,76,0.1); color: white;">${service}</td>
            </tr>` : ''}
            ${date ? `<tr>
              <td style="padding: 12px 0; border-bottom: 1px solid rgba(201,168,76,0.1); color: rgba(255,255,255,0.4); font-size: 11px; letter-spacing: 0.12em; text-transform: uppercase;">Preferred Date</td>
              <td style="padding: 12px 0; border-bottom: 1px solid rgba(201,168,76,0.1); color: white;">${date}</td>
            </tr>` : ''}
          </table>
          ${notes ? `<div style="margin-top: 28px;">
            <p style="color: rgba(255,255,255,0.4); font-size: 11px; letter-spacing: 0.12em; text-transform: uppercase; margin-bottom: 10px;">Project Notes</p>
            <p style="color: rgba(255,255,255,0.75); font-size: 14px; line-height: 1.8; white-space: pre-wrap;">${notes}</p>
          </div>` : ''}
          <div style="margin-top: 36px; padding-top: 20px; border-top: 1px solid rgba(201,168,76,0.15);">
            <p style="color: rgba(255,255,255,0.2); font-size: 12px;">Reply directly to respond to ${name}. Reply-to is set to their email address.</p>
          </div>
        </div>
      `,
    })

    // Confirmation to enquirer
    await resend.emails.send({
      from: 'TWN Studios <info@solomonstephen.com>',
      to: email,
      subject: 'Your studio enquiry — TWN Studios',
      html: `
        <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; background: #080B08; color: white; padding: 48px 40px; border-radius: 12px;">
          <div style="font-size: 11px; letter-spacing: 0.3em; text-transform: uppercase; color: rgba(201,168,76,0.6); margin-bottom: 28px;">TWN Studios</div>
          <h1 style="font-size: 28px; font-weight: 400; color: #F0EDE8; margin: 0 0 20px; line-height: 1.2;">We got your message, ${name.split(' ')[0]}.</h1>
          <p style="font-size: 15px; line-height: 1.85; color: rgba(255,255,255,0.5); margin: 0 0 20px;">
            Your studio enquiry has been received. We typically respond within 24 hours to confirm availability and session details.
          </p>
          ${service ? `<p style="font-size: 14px; color: rgba(201,168,76,0.6); margin: 0 0 32px;">Enquiry for: <strong style="color: #C9A84C;">${service}</strong></p>` : ''}
          <div style="border-top: 1px solid rgba(201,168,76,0.15); padding-top: 24px; margin-top: 16px;">
            <p style="font-size: 13px; color: rgba(255,255,255,0.25); margin: 0;">
              TWN Studios · Langbasa Road, Ajah, Lagos · 
              <a href="https://solomonstephen.com/studios" style="color: rgba(201,168,76,0.5); text-decoration: none;">solomonstephen.com/studios</a>
            </p>
          </div>
        </div>
      `,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Studio booking error:', error)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
