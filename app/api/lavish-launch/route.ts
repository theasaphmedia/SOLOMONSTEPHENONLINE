import { NextResponse } from 'next/server'
import { sql } from '@/lib/db'

const POST_BODY = `<h2>All Glory. All Power. All-Sufficient.</h2>
<p>Some songs don't argue their way to the heart — they simply arrive. <strong>LAVISH</strong> is that kind of song.</p>
<p>Built on a declaration as old as the gospel itself — <em>Jesus, so much glory, so much power, all-sufficient</em> — this new single is a meditation on a love that refuses to make sense. A love that had it all. Yet still came. Died. Rose.</p>
<blockquote>I don't know why you will love me so.</blockquote>
<p>That lyric — sung twice at the close of the song, as if once isn't enough to hold the weight of it — is the honest confession at the centre of everything worship is supposed to be. Not a performance. An encounter.</p>
<p><strong>LAVISH</strong> is available everywhere from Friday, June 6, 2026.</p>
<p>Pre-save it now and be among the first to hear it:</p>
<p><a href="https://play.yivera.com/lavish-solomon-stephen">play.yivera.com/lavish-solomon-stephen</a></p>`

export async function GET() {
  const results: string[] = []

  // ── 1. Blog post ────────────────────────────────────
  try {
    const existing = await sql`SELECT id FROM ss_blog WHERE slug = 'lavish-new-single-2026' LIMIT 1`
    if (existing.length === 0) {
      await sql`
        INSERT INTO ss_blog (title, slug, excerpt, body, cover_url, category, published_at, published)
        VALUES (
          'LAVISH — New Single Out Friday',
          'lavish-new-single-2026',
          'All glory. All power. All-sufficient in Himself — yet He came, died, and rose for you. LAVISH is out Friday, June 6.',
          ${POST_BODY},
          '/images/LAVISH - SOLOMON STEPHEN.jpg',
          'update',
          '2026-06-02',
          true
        )
      `
      results.push('blog post created')
    } else {
      results.push('blog post already exists')
    }
  } catch (e) { results.push('blog error: ' + String(e)) }

  // ── 2. Email blast ───────────────────────────────────
  try {
    const subscribers = await sql`SELECT email, name FROM ss_newsletter WHERE email IS NOT NULL`
    if (subscribers.length === 0) {
      results.push('no subscribers yet')
    } else {
      const { Resend } = await import('resend')
      const resend = new Resend(process.env.RESEND_API_KEY)
      let sent = 0
      for (const sub of subscribers) {
        try {
          await resend.emails.send({
            from: 'Solomon Stephen <info@solomonstephen.com>',
            to: sub.email,
            subject: 'LAVISH — Out This Friday 🎶',
            html: `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#080E08;font-family:'DM Sans',Arial,sans-serif;">
  <div style="max-width:600px;margin:0 auto;background:#080E08;color:#FAF7F2;">
    <div style="background:linear-gradient(135deg,#0D1B0D,#1A2E1A);padding:48px 40px 40px;text-align:center;border-bottom:1px solid rgba(201,168,76,0.15);">
      <img src="https://solomonstephen.com/images/LAVISH - SOLOMON STEPHEN.jpg" alt="LAVISH" style="width:200px;height:200px;object-fit:cover;border-radius:4px;box-shadow:0 16px 48px rgba(0,0,0,0.6);margin-bottom:32px;display:block;margin-left:auto;margin-right:auto;" />
      <div style="font-size:10px;letter-spacing:0.32em;text-transform:uppercase;color:rgba(201,168,76,0.7);margin-bottom:12px;">New Release · June 6, 2026</div>
      <h1 style="font-family:Georgia,serif;font-size:52px;font-weight:400;color:#FAF7F2;margin:0 0 8px;letter-spacing:-0.02em;">LAVISH</h1>
      <p style="font-size:13px;color:rgba(250,247,242,0.5);margin:0;">Solomon Stephen</p>
    </div>
    <div style="padding:40px;text-align:center;">
      <p style="font-size:15px;line-height:1.9;color:rgba(250,247,242,0.7);margin:0 0 12px;">
        ${sub.name ? `Hi ${sub.name},` : 'Hi,'}
      </p>
      <p style="font-size:15px;line-height:1.9;color:rgba(250,247,242,0.7);margin:0 0 28px;">
        All glory. All power. All-sufficient in Himself — yet He came, died, and rose for you.<br>
        <strong style="color:#FAF7F2;">LAVISH</strong> is out this Friday, everywhere.
      </p>
      <a href="https://play.yivera.com/lavish-solomon-stephen" style="display:inline-block;background:#C9A84C;color:#0D1B0D;text-decoration:none;font-size:11px;font-weight:700;letter-spacing:0.16em;text-transform:uppercase;padding:16px 40px;border-radius:2px;margin-bottom:32px;">Pre-Save Now →</a>
      <p style="font-size:12px;line-height:1.8;color:rgba(250,247,242,0.35);margin:0;font-style:italic;">
        "I don't know why you will love me so."
      </p>
    </div>
    <div style="padding:24px 40px;border-top:1px solid rgba(201,168,76,0.1);text-align:center;">
      <p style="font-size:11px;color:rgba(250,247,242,0.2);margin:0;">
        You're receiving this because you subscribed at solomonstephen.com<br>
        <a href="https://solomonstephen.com/unsubscribe?email=${encodeURIComponent(sub.email)}" style="color:rgba(201,168,76,0.4);">Unsubscribe</a>
      </p>
    </div>
  </div>
</body>
</html>`,
          })
          sent++
        } catch {}
      }
      results.push(`emails sent: ${sent}/${subscribers.length}`)
    }
  } catch (e) { results.push('email error: ' + String(e)) }

  return NextResponse.json({ ok: true, results })
}
