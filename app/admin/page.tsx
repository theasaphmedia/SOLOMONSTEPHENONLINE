'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import Image from 'next/image'

type Tab = 'events' | 'blog' | 'devotionals' | 'announcements' | 'prayer' | 'subscribers' | 'press'

interface Event { id: string; title: string; date: string; time: string; location: string; description: string; type: string; is_online: boolean; link: string; flyer_url: string; published: boolean }
interface BlogPost { id: string; title: string; excerpt: string; body: string; cover_url: string; category: string; published: boolean; published_at: string }
interface Devotional { id: string; title: string; scripture: string; body: string; published: boolean; published_at: string }
interface Announcement { id: string; title: string; body: string; link: string; link_label: string; expires_at: string; published: boolean }
interface PressFact { id: string; label: string; value: string; sort_order: number }
interface PressRelease { id: string; year: string; title: string; type: string; description: string; sort_order: number }

function CharCounter({ value, max }: { value: string; max: number }) {
  const len = value.length
  const color = len > max ? '#ef4444' : len > max * 0.85 ? '#f59e0b' : 'rgba(201,168,76,0.4)'
  return <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '11px', color, marginLeft: '8px' }}>{len}/{max}</span>
}

function ImageUploader({ value, onChange, label = 'Image' }: { value: string; onChange: (url: string) => void; label?: string }) {
  const [dragging, setDragging] = useState(false)
  const [uploading, setUploading] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const upload = async (file: File) => {
    if (!file.type.startsWith('image/')) return
    setUploading(true)
    const fd = new FormData()
    fd.append('file', file)
    const res = await fetch('/api/admin/upload', { method: 'POST', body: fd })
    if (res.ok) {
      const { url } = await res.json()
      onChange(url)
    }
    setUploading(false)
  }

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragging(false)
    const file = e.dataTransfer.files[0]
    if (file) upload(file)
  }

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) upload(file)
  }

  return (
    <div>
      <label style={{ display: 'block', fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase' as const, color: 'rgba(201,168,76,0.6)', marginBottom: '8px' }}>
        {label} <span style={{ color: 'rgba(250,247,242,0.3)', fontSize: '10px', fontStyle: 'italic', textTransform: 'none' as const, letterSpacing: 0 }}>(optional)</span>
      </label>

      {value ? (
        <div style={{ position: 'relative', borderRadius: '4px', overflow: 'hidden', border: '1px solid rgba(201,168,76,0.2)' }}>
          <Image src={value} alt="Preview" width={800} height={450} style={{ width: '100%', height: '180px', objectFit: 'cover', display: 'block' }} />
          <button onClick={() => onChange('')} style={{ position: 'absolute', top: '8px', right: '8px', background: 'rgba(0,0,0,0.7)', border: 'none', color: '#fff', borderRadius: '3px', padding: '4px 10px', cursor: 'pointer', fontSize: '12px' }}>Remove</button>
        </div>
      ) : (
        <div
          onClick={() => inputRef.current?.click()}
          onDragOver={e => { e.preventDefault(); setDragging(true) }}
          onDragLeave={() => setDragging(false)}
          onDrop={onDrop}
          style={{
            border: `2px dashed ${dragging ? '#C9A84C' : 'rgba(201,168,76,0.2)'}`,
            borderRadius: '4px', padding: '32px 20px', textAlign: 'center', cursor: 'pointer',
            background: dragging ? 'rgba(201,168,76,0.05)' : 'rgba(255,255,255,0.02)',
            transition: 'all 0.2s',
          }}
        >
          <div style={{ fontSize: '28px', marginBottom: '8px' }}>📎</div>
          <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '13px', color: 'rgba(250,247,242,0.6)', marginBottom: '6px' }}>
            {uploading ? 'Uploading...' : 'Drag & drop or click to browse'}
          </div>
          <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '11px', color: 'rgba(250,247,242,0.3)' }}>
            JPG, PNG, WebP — any size (16:9 looks best)
          </div>
        </div>
      )}
      <input ref={inputRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={onFileChange} />
    </div>
  )
}

export default function AdminPage() {
  const [authed, setAuthed] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loginError, setLoginError] = useState('')
  const [tab, setTab] = useState<Tab>('events')
  const [events, setEvents] = useState<Event[]>([])
  const [blog, setBlog] = useState<BlogPost[]>([])
  const [devotionals, setDevotionals] = useState<Devotional[]>([])
  const [announcements, setAnnouncements] = useState<Announcement[]>([])
  const [saving, setSaving] = useState(false)
  const [msg, setMsg] = useState('')

  const [ev, setEv] = useState({ title: '', date: '', time: '', location: '', description: '', type: 'special', is_online: false, link: '', flyer_url: '' })
  const [bl, setBl] = useState({ title: '', excerpt: '', body: '', cover_url: '', category: 'article', published_at: new Date().toISOString().split('T')[0] })
  const [dv, setDv] = useState({ title: '', scripture: '', body: '', published_at: new Date().toISOString().split('T')[0] })
  const [an, setAn] = useState({ title: '', body: '', link: '', link_label: '', expires_at: '' })
  const [pressFacts, setPressFacts] = useState<PressFact[]>([])
  const [pressReleases, setPressReleases] = useState<PressRelease[]>([])
  const [newFact, setNewFact] = useState({ label: '', value: '' })
  const [newRelease, setNewRelease] = useState({ year: '', title: '', release_type: 'Single', description: '' })

  const load = useCallback(async (t: Tab) => {
    const res = await fetch(`/api/admin/${t}`)
    if (res.ok) {
      const data = await res.json()
      if (t === 'events') setEvents(data)
      else if (t === 'blog') setBlog(data)
      else if (t === 'devotionals') setDevotionals(data)
      else if (t === 'press') { setPressFacts(data.facts || []); setPressReleases(data.releases || []) }
      else setAnnouncements(data)
    }
  }, [])

  useEffect(() => { if (authed) load(tab) }, [authed, tab, load])

  const login = async () => {
    setLoginError('')
    const res = await fetch('/api/admin/login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ username, password }) })
    if (res.ok) setAuthed(true)
    else setLoginError('Invalid credentials')
  }

  const logout = async () => {
    await fetch('/api/admin/login', { method: 'DELETE' })
    setAuthed(false)
  }

  const flash = (m: string) => { setMsg(m); setTimeout(() => setMsg(''), 3000) }

  const saveEvent = async () => {
    if (!ev.title || !ev.date) return flash('Title and date are required')
    setSaving(true)
    await fetch('/api/admin/events', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(ev) })
    setEv({ title: '', date: '', time: '', location: '', description: '', type: 'special', is_online: false, link: '', flyer_url: '' })
    await load('events')
    flash('Event published!')
    setSaving(false)
  }

  const deleteEvent = async (id: string) => {
    await fetch('/api/admin/events', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id }) })
    await load('events')
    flash('Deleted')
  }

  const saveBlog = async () => {
    if (!bl.title || !bl.body) return flash('Title and body are required')
    setSaving(true)
    await fetch('/api/admin/blog', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(bl) })
    setBl({ title: '', excerpt: '', body: '', cover_url: '', category: 'article', published_at: new Date().toISOString().split('T')[0] })
    await load('blog')
    flash('Post published!')
    setSaving(false)
  }

  const deleteBlog = async (id: string) => {
    await fetch('/api/admin/blog', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id }) })
    await load('blog')
    flash('Deleted')
  }

  const saveDevotional = async () => {
    if (!dv.title || !dv.body) return flash('Title and body are required')
    setSaving(true)
    await fetch('/api/admin/devotionals', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(dv) })
    setDv({ title: '', scripture: '', body: '', published_at: new Date().toISOString().split('T')[0] })
    await load('devotionals')
    flash('Devotional published!')
    setSaving(false)
  }

  const deleteDevotional = async (id: string) => {
    await fetch('/api/admin/devotionals', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id }) })
    await load('devotionals')
    flash('Deleted')
  }

  const saveAnnouncement = async () => {
    if (!an.title) return flash('Title is required')
    setSaving(true)
    await fetch('/api/admin/announcements', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(an) })
    setAn({ title: '', body: '', link: '', link_label: '', expires_at: '' })
    await load('announcements')
    flash('Announcement published!')
    setSaving(false)
  }

  const deleteAnnouncement = async (id: string) => {
    await fetch('/api/admin/announcements', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id }) })
    await load('announcements')
    flash('Deleted')
  }

  const saveFact = async () => {
    if (!newFact.label || !newFact.value) return flash('Label and value are required')
    setSaving(true)
    await fetch('/api/admin/press', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ type: 'fact', ...newFact }) })
    setNewFact({ label: '', value: '' })
    await load('press')
    flash('Fact saved!')
    setSaving(false)
  }

  const deleteFact = async (id: string) => {
    await fetch('/api/admin/press', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id, type: 'fact' }) })
    await load('press')
    flash('Deleted')
  }

  const saveRelease = async () => {
    if (!newRelease.title) return flash('Title is required')
    setSaving(true)
    await fetch('/api/admin/press', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ type: 'release', ...newRelease }) })
    setNewRelease({ year: '', title: '', release_type: 'Single', description: '' })
    await load('press')
    flash('Release saved!')
    setSaving(false)
  }

  const deleteRelease = async (id: string) => {
    await fetch('/api/admin/press', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id, type: 'release' }) })
    await load('press')
    flash('Deleted')
  }

  const S = {
    page: { minHeight: '100vh', background: '#080E08', color: '#FAF7F2', fontFamily: "'DM Sans',sans-serif" } as React.CSSProperties,
    header: { background: '#0D1B0D', borderBottom: '1px solid rgba(201,168,76,0.12)', padding: '16px clamp(20px,4vw,48px)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' } as React.CSSProperties,
    body: { maxWidth: '900px', margin: '0 auto', padding: 'clamp(24px,4vw,48px) clamp(20px,4vw,48px)' } as React.CSSProperties,
    tabs: { display: 'flex', gap: '4px', marginBottom: '32px', borderBottom: '1px solid rgba(201,168,76,0.1)' } as React.CSSProperties,
    tab: (active: boolean): React.CSSProperties => ({ background: 'none', border: 'none', cursor: 'pointer', padding: '10px 20px', fontFamily: "'DM Sans',sans-serif", fontSize: '12px', letterSpacing: '0.12em', textTransform: 'uppercase', color: active ? '#C9A84C' : 'rgba(250,247,242,0.4)', borderBottom: active ? '2px solid #C9A84C' : '2px solid transparent', marginBottom: '-1px', transition: 'all 0.2s' }),
    card: { background: '#0D1B0D', border: '1px solid rgba(201,168,76,0.1)', borderRadius: '4px', padding: '24px', marginBottom: '16px' } as React.CSSProperties,
    label: { display: 'block', fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase' as const, color: 'rgba(201,168,76,0.6)', marginBottom: '8px' },
    input: { width: '100%', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(201,168,76,0.15)', borderRadius: '3px', padding: '10px 14px', color: '#FAF7F2', fontFamily: "'DM Sans',sans-serif", fontSize: '14px', outline: 'none', boxSizing: 'border-box' as const },
    textarea: { width: '100%', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(201,168,76,0.15)', borderRadius: '3px', padding: '10px 14px', color: '#FAF7F2', fontFamily: "'DM Sans',sans-serif", fontSize: '14px', outline: 'none', resize: 'vertical' as const, boxSizing: 'border-box' as const },
    btn: { background: '#C9A84C', color: '#080E08', border: 'none', borderRadius: '3px', padding: '12px 28px', fontFamily: "'DM Sans',sans-serif", fontSize: '11px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase' as const, cursor: 'pointer' },
    btnDel: { background: 'none', border: '1px solid rgba(239,68,68,0.3)', color: 'rgba(239,68,68,0.7)', borderRadius: '3px', padding: '6px 14px', fontFamily: "'DM Sans',sans-serif", fontSize: '11px', cursor: 'pointer' },
    row: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' } as React.CSSProperties,
    flash: { position: 'fixed' as const, bottom: '24px', right: '24px', background: '#C9A84C', color: '#080E08', padding: '12px 24px', borderRadius: '3px', fontWeight: 700, fontSize: '13px', zIndex: 9999 },
    item: { borderTop: '1px solid rgba(201,168,76,0.07)', padding: '16px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' } as React.CSSProperties,
  }

  if (!authed) return (
    <div style={{ ...S.page, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ width: '100%', maxWidth: '360px', padding: '0 24px' }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '28px', marginBottom: '8px' }}>Solomon Stephen</div>
          <div style={{ fontSize: '11px', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'rgba(201,168,76,0.6)' }}>Admin</div>
        </div>
        <div style={{ background: '#0D1B0D', border: '1px solid rgba(201,168,76,0.12)', borderRadius: '4px', padding: '32px' }}>
          <label style={S.label}>Username</label>
          <input style={{ ...S.input, marginBottom: '14px' }} type="text" value={username} onChange={e => setUsername(e.target.value)} onKeyDown={e => e.key === 'Enter' && login()} placeholder="Admin username" autoFocus autoComplete="username" />
          <label style={S.label}>Password</label>
          <input style={{ ...S.input, marginBottom: '16px' }} type="password" value={password} onChange={e => setPassword(e.target.value)} onKeyDown={e => e.key === 'Enter' && login()} placeholder="Admin password" autoComplete="current-password" />
          {loginError && <div style={{ color: '#ef4444', fontSize: '13px', marginBottom: '12px' }}>{loginError}</div>}
          <button style={{ ...S.btn, width: '100%' }} onClick={login}>Enter</button>
        </div>
      </div>
    </div>
  )

  return (
    <div style={S.page}>
      <header style={S.header}>
        <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '20px' }}>Solomon Stephen <span style={{ color: '#C9A84C' }}>/ Admin</span></div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <a href="/" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '7px', background: 'none', border: '1px solid rgba(201,168,76,0.2)', color: 'rgba(250,247,242,0.6)', borderRadius: '3px', padding: '8px 16px', cursor: 'pointer', fontSize: '12px', fontFamily: "'DM Sans',sans-serif", textDecoration: 'none', letterSpacing: '0.06em' }}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15,3 21,3 21,9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
            View Site
          </a>
          <button onClick={logout} style={{ background: 'none', border: '1px solid rgba(239,68,68,0.25)', color: 'rgba(239,68,68,0.6)', borderRadius: '3px', padding: '8px 16px', cursor: 'pointer', fontSize: '12px', fontFamily: "'DM Sans',sans-serif", letterSpacing: '0.06em' }}>Log out</button>
        </div>
      </header>

      <div style={S.body}>
        <div style={S.tabs}>
          {(['events', 'blog', 'devotionals', 'announcements', 'prayer', 'subscribers', 'press'] as Tab[]).map(t => (
            <button key={t} style={S.tab(tab === t)} onClick={() => setTab(t)}>
              {t === 'events' ? '📅 Events' : t === 'blog' ? '✍️ Blog' : t === 'devotionals' ? '📖 Devotionals' : t === 'announcements' ? '📢 Announcements' : t === 'press' ? '🎙️ Press' : t === 'prayer' ? '🙏 Prayer' : '📧 Subscribers'}
            </button>
          ))}
        </div>

        {/* ── EVENTS ── */}
        {tab === 'events' && (
          <div>
            <div style={S.card}>
              <div style={{ fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(201,168,76,0.6)', marginBottom: '20px' }}>Add New Event</div>
              <div style={{ marginBottom: '14px' }}>
                <label style={S.label}>Title <CharCounter value={ev.title} max={60} /></label>
                <input style={S.input} value={ev.title} onChange={e => setEv({ ...ev, title: e.target.value })} placeholder="Event title" maxLength={80} />
              </div>
              <div style={{ ...S.row, marginBottom: '14px' }}>
                <div>
                  <label style={S.label}>Date</label>
                  <input style={S.input} type="date" value={ev.date} onChange={e => setEv({ ...ev, date: e.target.value })} />
                </div>
                <div>
                  <label style={S.label}>Time</label>
                  <input style={S.input} value={ev.time} onChange={e => setEv({ ...ev, time: e.target.value })} placeholder="e.g. 6:00 PM" />
                </div>
              </div>
              <div style={{ ...S.row, marginBottom: '14px' }}>
                <div>
                  <label style={S.label}>Type</label>
                  <select style={S.input} value={ev.type} onChange={e => setEv({ ...ev, type: e.target.value })}>
                    <option value="special">Special Event</option>
                    <option value="mdwe">MDWE</option>
                    <option value="tsh">The Slaughter House</option>
                    <option value="synantesis">Synantesis</option>
                    <option value="concert">Concert</option>
                    <option value="conference">Conference</option>
                  </select>
                </div>
                <div>
                  <label style={S.label}>Location</label>
                  <input style={S.input} value={ev.location} onChange={e => setEv({ ...ev, location: e.target.value })} placeholder="Venue or Online" />
                </div>
              </div>
              <div style={{ marginBottom: '14px' }}>
                <label style={S.label}>Description <CharCounter value={ev.description} max={200} /></label>
                <textarea style={{ ...S.textarea, minHeight: '80px' }} value={ev.description} onChange={e => setEv({ ...ev, description: e.target.value })} placeholder="Short description" maxLength={500} />
              </div>
              <div style={{ marginBottom: '14px' }}>
                <label style={S.label}>Registration / Stream Link</label>
                <input style={S.input} value={ev.link} onChange={e => setEv({ ...ev, link: e.target.value })} placeholder="https://" />
              </div>
              <div style={{ marginBottom: '14px' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
                  <input type="checkbox" checked={ev.is_online} onChange={e => setEv({ ...ev, is_online: e.target.checked })} />
                  <span style={{ fontSize: '13px', color: 'rgba(250,247,242,0.6)' }}>Online / Livestream event</span>
                </label>
              </div>
              <div style={{ marginBottom: '20px' }}>
                <ImageUploader value={ev.flyer_url} onChange={url => setEv({ ...ev, flyer_url: url })} label="Event Flyer" />
              </div>
              <button style={S.btn} onClick={saveEvent} disabled={saving}>{saving ? 'Publishing...' : 'Publish Event'}</button>
            </div>

            {events.length > 0 && (
              <div style={S.card}>
                <div style={{ fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(201,168,76,0.6)', marginBottom: '16px' }}>Published Events ({events.length})</div>
                {events.map(e => (
                  <div key={e.id} style={S.item}>
                    <div>
                      <div style={{ fontSize: '15px', marginBottom: '4px' }}>{e.title}</div>
                      <div style={{ fontSize: '12px', color: 'rgba(250,247,242,0.4)' }}>{e.date} {e.time && `· ${e.time}`} {e.location && `· ${e.location}`}</div>
                    </div>
                    <button style={S.btnDel} onClick={() => deleteEvent(e.id)}>Delete</button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ── BLOG ── */}
        {tab === 'blog' && (
          <div>
            <div style={S.card}>
              <div style={{ fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(201,168,76,0.6)', marginBottom: '20px' }}>Write New Post</div>
              <div style={{ marginBottom: '14px' }}>
                <label style={S.label}>Title <CharCounter value={bl.title} max={80} /></label>
                <input style={S.input} value={bl.title} onChange={e => setBl({ ...bl, title: e.target.value })} placeholder="Post title" maxLength={120} />
              </div>
              <div style={{ ...S.row, marginBottom: '14px' }}>
                <div>
                  <label style={S.label}>Category</label>
                  <select style={S.input} value={bl.category} onChange={e => setBl({ ...bl, category: e.target.value })}>
                    <option value="article">Article</option>
                    <option value="testimony">Testimony</option>
                    <option value="update">Ministry Update</option>
                    <option value="teaching">Teaching</option>
                  </select>
                </div>
                <div>
                  <label style={S.label}>Date</label>
                  <input style={S.input} type="date" value={bl.published_at} onChange={e => setBl({ ...bl, published_at: e.target.value })} />
                </div>
              </div>
              <div style={{ marginBottom: '14px' }}>
                <label style={S.label}>Excerpt <CharCounter value={bl.excerpt} max={160} /></label>
                <input style={S.input} value={bl.excerpt} onChange={e => setBl({ ...bl, excerpt: e.target.value })} placeholder="Short summary shown on blog listing" maxLength={300} />
              </div>
              <div style={{ marginBottom: '14px' }}>
                <label style={S.label}>Body</label>
                <textarea style={{ ...S.textarea, minHeight: '220px' }} value={bl.body} onChange={e => setBl({ ...bl, body: e.target.value })} placeholder="Full post content..." />
              </div>
              <div style={{ marginBottom: '20px' }}>
                <ImageUploader value={bl.cover_url} onChange={url => setBl({ ...bl, cover_url: url })} label="Cover Image" />
              </div>
              <button style={S.btn} onClick={saveBlog} disabled={saving}>{saving ? 'Publishing...' : 'Publish Post'}</button>
            </div>

            {blog.length > 0 && (
              <div style={S.card}>
                <div style={{ fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(201,168,76,0.6)', marginBottom: '16px' }}>Published Posts ({blog.length})</div>
                {blog.map(p => (
                  <div key={p.id} style={S.item}>
                    <div>
                      <div style={{ fontSize: '15px', marginBottom: '4px' }}>{p.title}</div>
                      <div style={{ fontSize: '12px', color: 'rgba(250,247,242,0.4)' }}>{p.published_at} · {p.category}</div>
                    </div>
                    <button style={S.btnDel} onClick={() => deleteBlog(p.id)}>Delete</button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ── DEVOTIONALS ── */}
        {tab === 'devotionals' && (
          <div>
            <div style={S.card}>
              <div style={{ fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(201,168,76,0.6)', marginBottom: '20px' }}>Add Devotional</div>
              <div style={{ marginBottom: '14px' }}>
                <label style={S.label}>Title <CharCounter value={dv.title} max={80} /></label>
                <input style={S.input} value={dv.title} onChange={e => setDv({ ...dv, title: e.target.value })} placeholder="Devotional title" maxLength={120} />
              </div>
              <div style={{ ...S.row, marginBottom: '14px' }}>
                <div>
                  <label style={S.label}>Scripture Reference</label>
                  <input style={S.input} value={dv.scripture} onChange={e => setDv({ ...dv, scripture: e.target.value })} placeholder="e.g. John 3:16" />
                </div>
                <div>
                  <label style={S.label}>Date</label>
                  <input style={S.input} type="date" value={dv.published_at} onChange={e => setDv({ ...dv, published_at: e.target.value })} />
                </div>
              </div>
              <div style={{ marginBottom: '20px' }}>
                <label style={S.label}>Body</label>
                <textarea style={{ ...S.textarea, minHeight: '220px' }} value={dv.body} onChange={e => setDv({ ...dv, body: e.target.value })} placeholder="Devotional content..." />
              </div>
              <button style={S.btn} onClick={saveDevotional} disabled={saving}>{saving ? 'Publishing...' : 'Publish Devotional'}</button>
            </div>

            {devotionals.length > 0 && (
              <div style={S.card}>
                <div style={{ fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(201,168,76,0.6)', marginBottom: '16px' }}>Published Devotionals ({devotionals.length})</div>
                {devotionals.map(d => (
                  <div key={d.id} style={S.item}>
                    <div>
                      <div style={{ fontSize: '15px', marginBottom: '4px' }}>{d.title}</div>
                      <div style={{ fontSize: '12px', color: 'rgba(250,247,242,0.4)' }}>{d.published_at} {d.scripture && `· ${d.scripture}`}</div>
                    </div>
                    <button style={S.btnDel} onClick={() => deleteDevotional(d.id)}>Delete</button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ── ANNOUNCEMENTS ── */}
        {tab === 'announcements' && (
          <div>
            <div style={S.card}>
              <div style={{ fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(201,168,76,0.6)', marginBottom: '20px' }}>Add Announcement</div>
              <div style={{ marginBottom: '14px' }}>
                <label style={S.label}>Title <CharCounter value={an.title} max={80} /></label>
                <input style={S.input} value={an.title} onChange={e => setAn({ ...an, title: e.target.value })} placeholder="Announcement title" maxLength={120} />
              </div>
              <div style={{ marginBottom: '14px' }}>
                <label style={S.label}>Body <CharCounter value={an.body} max={300} /></label>
                <textarea style={{ ...S.textarea, minHeight: '100px' }} value={an.body} o