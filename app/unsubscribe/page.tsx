'use client'

import { useSearchParams } from 'next/navigation'
import { useState, Suspense } from 'react'
import Link from 'next/link'
import Footer from '@/components/Footer'

function UnsubscribeContent() {
  const params = useSearchParams()
  const success = params.get('success')
  const email = params.get('email')
  const error = params.get('error')

  const [manualEmail, setManualEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)
  const [err, setErr] = useState('')

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true); setErr('')
    const res = await fetch('/api/unsubscribe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: manualEmail }),
    })
    if (res.ok) setDone(true)
    else setErr('Something went wrong. Please try again.')
    setLoading(false)
  }

  return (
    <main style={{ background: '#080E08', minHeight: '100vh', color: '#FAF7F2' }}>
      <section style={{ maxWidth: '560px', margin: '0 auto', padding: 'clamp(120px,14vw,160px) clamp(24px,5vw,48px) 80px', textAlign: 'center' }}>

        {success ? (
          <>
            <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(32px,5vw,48px)', fontWeight: 400, color: '#FAF7F2', marginBottom: '16px' }}>You're unsubscribed.</div>
            <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '14px', color: 'rgba(250,247,242,0.4)', lineHeight: 1.8, marginBottom: '32px' }}>
              {email ? `${email} has been removed` : 'Your email has been removed'} from our mailing list. You won't receive any more emails from us.
            </p>
            <Link href="/" style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '11px', letterSpacing: '0.16em', textTransform: 'uppercase', color: '#C9A84C', textDecoration: 'none' }}>← Back to Home</Link>
          </>
        ) : done ? (
          <>
            <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(32px,5vw,48px)', fontWeight: 400, color: '#FAF7F2', marginBottom: '16px' }}>Done.</div>
            <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '14px', color: 'rgba(250,247,242,0.4)', lineHeight: 1.8, marginBottom: '32px' }}>You've been unsubscribed successfully.</p>
            <Link href="/" style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '11px', letterSpacing: '0.16em', textTransform: 'uppercase', color: '#C9A84C', textDecoration: 'none' }}>← Back to Home</Link>
          </>
        ) : (
          <>
            <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '10px', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(201,168,76,0.5)', marginBottom: '16px' }}>Newsletter</div>
            <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(32px,5vw,48px)', fontWeight: 400, color: '#FAF7F2', marginBottom: '16px' }}>Unsubscribe</div>
            <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '14px', color: 'rgba(250,247,242,0.4)', lineHeight: 1.8, marginBottom: '32px' }}>Enter your email address to be removed from our mailing list.</p>
            {error && <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '12px', color: '#ef4444', marginBottom: '16px' }}>Something went wrong. Please try again.</p>}
            <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <input
                type="email" required value={manualEmail} onChange={e => setManualEmail(e.target.value)}
                placeholder="Your email address"
                style={{ background: 'rgba(250,247,242,0.04)', border: '1px solid rgba(201,168,76,0.2)', borderRadius: '3px', padding: '14px 16px', color: '#FAF7F2', fontFamily: "'DM Sans',sans-serif", fontSize: '14px', outline: 'none' }}
              />
              {err && <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '12px', color: '#ef4444', margin: 0 }}>{err}</p>}
              <button type="submit" disabled={loading} style={{ background: 'rgba(250,247,242,0.08)', border: '1px solid rgba(250,247,242,0.15)', color: 'rgba(250,247,242,0.7)', padding: '14px', fontFamily: "'DM Sans',sans-serif", fontSize: '11px', letterSpacing: '0.16em', textTransform: 'uppercase', cursor: 'pointer', borderRadius: '3px' }}>
                {loading ? 'Processing...' : 'Unsubscribe'}
              </button>
            </form>
            <Link href="/" style={{ display: 'block', marginTop: '24px', fontFamily: "'DM Sans',sans-serif", fontSize: '11px', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(250,247,242,0.3)', textDecoration: 'none' }}>← Back to Home</Link>
          </>
        )}
      </section>
      <Footer />
    </main>
  )
}

export default function UnsubscribePage() {
  return (
    <Suspense>
      <UnsubscribeContent />
    </Suspense>
  )
}
