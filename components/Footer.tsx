'use client'
import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'

const pages = [
  { href: '/about',       label: 'About'      },
  { href: '/music',       label: 'Music'      },
  { href: '/studios',     label: 'Studios'    },
  { href: '/books',       label: 'Books'      },
  { href: '/events',      label: 'Events'     },
  { href: '/gallery',     label: 'Gallery'    },
  { href: '/contact',     label: 'Contact'    },
  { href: '/tai-digital', label: 'TAI Digital'},
  { href: '/press',       label: 'Press'      },
]

const socials = [
  { label: 'Instagram',  url: 'https://www.instagram.com/thesolomonsteph' },
  { label: 'YouTube',    url: 'https://www.youtube.com/@thesolomonsteph' },
  { label: 'Facebook',   url: 'https://www.facebook.com/thesolomonsteph' },
  { label: 'TikTok',     url: 'https://www.tiktok.com/@thesolomonsteph' },
  { label: 'TWN',        url: 'https://www.instagram.com/theworshipnation_twn' },
  { label: 'Studios',    url: 'https://www.instagram.com/twnstudiosglobal' },
]

function FooterNewsletter() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    setLoading(true)
    try {
      await fetch('/api/newsletter', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      setSent(true)
    } finally { setLoading(false) }
  }

  if (sent) return (
    <div style={{ fontFamily:"'DM Sans',sans-serif", fontSize:'12px', color:'rgba(201,168,76,0.6)', letterSpacing:'.05em' }}>
      ✓ You&apos;re subscribed.
    </div>
  )

  return (
    <form onSubmit={submit} style={{ display:'flex', gap:'8px', flexWrap:'wrap' }}>
      <input
        type="email" required placeholder="your@email.com" value={email}
        onChange={e => setEmail(e.target.value)}
        style={{ flex:1, minWidth:'160px', background:'rgba(250,247,242,0.05)', border:'1px solid rgba(250,247,242,0.1)', color:'#FAF7F2', fontFamily:"'DM Sans',sans-serif", fontSize:'12px', padding:'10px 14px', outline:'none' }}
        onFocus={e => (e.target.style.borderColor='rgba(201,168,76,0.4)')}
        onBlur={e => (e.target.style.borderColor='rgba(250,247,242,0.1)')}
      />
      <button type="submit" disabled={loading}
        style={{ fontFamily:"'DM Sans',sans-serif", fontSize:'9px', letterSpacing:'.2em', textTransform:'uppercase', padding:'10px 18px', background:'rgba(201,168,76,0.15)', border:'1px solid rgba(201,168,76,0.3)', color:'#C9A84C', cursor:'pointer', transition:'all .3s', opacity: loading ? 0.6 : 1 }}
      >{loading ? '…' : 'Join'}</button>
    </form>
  )
}

export default function Footer() {
  return (
    <footer style={{ background: '#0D1B0D', color: '#FAF7F2' }}>
      <style>{`
        /* Desktop */
        .ft-body { display: grid; grid-template-columns: 1fr 1fr; gap: clamp(24px,5vw,80px); padding: clamp(56px,7vw,96px) clamp(24px,4vw,64px); max-width: 1280px; margin: 0 auto; }
        .ft-pages { display: grid; grid-template-columns: 1fr 1fr; gap: 10px 40px; }
        .ft-link { font-family:'DM Sans',sans-serif; font-size:13px; color:rgba(250,247,242,0.38); text-decoration:none; transition:color .3s; }
        .ft-link:hover { color:#C9A84C; }
        .ft-social-row { display:flex; flex-wrap:wrap; gap:8px 20px; }
        .ft-social { font-family:'DM Sans',sans-serif; font-size:12px; color:rgba(250,247,242,0.35); text-decoration:none; transition:color .3s; }
        .ft-social:hover { color:#C9A84C; }
        .ft-label { font-family:'DM Sans',sans-serif; font-size:9px; letter-spacing:0.3em; text-transform:uppercase; color:rgba(201,168,76,0.4); margin-bottom:16px; }
        .ft-right { display:flex; flex-direction:column; gap:32px; align-items:flex-end; }
        .ft-pages-label { text-align:right; }
        .ft-pages .ft-link { text-align:right; }
        .ft-bar { border-top:1px solid rgba(201,168,76,0.07); padding:18px clamp(24px,4vw,64px); }
        .ft-bar-inner { max-width:1280px; margin:0 auto; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:6px; }

        /* Mobile */
        @media(max-width:640px) {
          .ft-body { grid-template-columns:1fr; gap:36px; padding:44px 24px 36px; }
          .ft-right { align-items:flex-start; }
          .ft-pages { grid-template-columns:1fr 1fr 1fr; gap:10px 16px; }
          .ft-pages-label { text-align:left; }
          .ft-pages .ft-link { text-align:left; font-size:12px; }
          .ft-social-row { gap:8px 14px; }
          .ft-social { font-size:11px; }
          .ft-selar { display:none; }
          .ft-bar { padding:14px 24px; }
          .ft-bar-inner { flex-direction:column; align-items:flex-start; gap:4px; }
          .ft-bar-inner p { font-size:10px; }
        }
      `}</style>

      <div className="ft-body">
        {/* LEFT */}
        <div style={{ display:'flex', flexDirection:'column', gap:'28px' }}>
          <Link href="/" style={{ display:'inline-block' }}>
            <Image
              src="/images/solomon-stephen-logo.svg"
              alt="Solomon Stephen"
              width={40} height={92}
              style={{ height:'56px', width:'auto', filter:'brightness(10) sepia(1) hue-rotate(5deg) saturate(0.6)' }}
            />
          </Link>

          <div>
            <p style={{ fontFamily:"'DM Sans',sans-serif", fontSize:'13px', lineHeight:1.9, color:'rgba(250,247,242,0.38)', maxWidth:'280px', margin:'0 0 6px' }}>
              Gospel Minister · Worship Leader<br />
              Author · Founder of TWN
            </p>
            <p style={{ fontFamily:"'DM Sans',sans-serif", fontSize:'11px', lineHeight:1.7, color:'rgba(250,247,242,0.2)', margin:0 }}>
              Ajah, Lagos — Nigeria
            </p>
          </div>

          <div>
            <p className="ft-label">Connect</p>
            <div className="ft-social-row">
              {socials.map(s => (
                <a key={s.label} href={s.url} target="_blank" rel="noopener noreferrer" className="ft-social">{s.label}</a>
              ))}
            </div>
          </div>

          <div>
            <p className="ft-label">Stay Updated</p>
            <FooterNewsletter />
          </div>
        </div>

        {/* RIGHT */}
        <div className="ft-right">
          <div style={{ width:'100%' }}>
            <p className="ft-label ft-pages-label">Pages</p>
            <div clas