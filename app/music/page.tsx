'use client'

import { useEffect, useState, useRef, useCallback } from 'react'
import Image from 'next/image'
import Footer from '@/components/Footer'

declare global {
  interface Window { YT: any; onYouTubeIframeAPIReady: () => void }
}

const tracks = [
  { id: 'TnEp0kiJBfI', title: 'Latest Release',  year: '2025', scripture: '',             desc: 'The newest sound from Solomon Stephen — a fresh move of God captured in worship.' },
  { id: 'c8KAM_l151s', title: 'CROSSOVER',        year: '2024', scripture: 'Psalm 23',     desc: 'A prophetic declaration of passing through — beyond every limitation, into the fullness of God.' },
  { id: 'cB0LxEjVaIs', title: 'The Mighty God',   year: '2023', scripture: 'Isaiah 9:6',   desc: 'An encounter with the power and majesty of God — unstoppable, unshakeable, reigning above all.' },
  { id: 'EPA7cFLHg2c', title: 'AIKU',             year: '2023', scripture: 'Rev 1:17–18',  desc: 'Death could not hold Him. A bold, triumphant anthem declaring the resurrection power of Jesus.' },
  { id: '6TYabI5QCO4', title: 'Awesome God',      year: '2022', scripture: 'Psalm 48:1',   desc: 'A live worship experience capturing the atmosphere of surrender and awe in the presence of God.' },
  { id: 'q1-eDXBpMkY', title: 'Alagbada Ina',     year: '2022', scripture: 'Exodus 3:2',   desc: 'The God clothed in fire — a Yoruba-infused anthem from the burning bush encounter.' },
  { id: 'Ao_ZC3oHi9c', title: 'There Is No One',  year: '2021', scripture: 'Isaiah 46:9',  desc: 'A tender declaration of the uniqueness and incomparability of God. Intimate. Personal. True.' },
]

const CHANNEL = 'https://www.youtube.com/@thesolomonsteph'

function fmtTime(s: number): string {
  if (!isFinite(s) || s < 0) return '0:00'
  return `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}`
}

const PlayIcon  = () => <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><polygon points="6,3 19,11 6,19" fill="currentColor"/></svg>
const PauseIcon = () => <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><rect x="5" y="3" width="4" height="16" rx="1" fill="currentColor"/><rect x="13" y="3" width="4" height="16" rx="1" fill="currentColor"/></svg>
const PrevIcon  = () => <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><polygon points="14,2 4,9 14,16" fill="currentColor"/><rect x="3" y="2" width="2.5" height="14" rx="1" fill="currentColor"/></svg>
const NextIcon  = () => <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><polygon points="4,2 14,9 4,16" fill="currentColor"/><rect x="12.5" y="2" width="2.5" height="14" rx="1" fill="currentColor"/></svg>
const RepeatIcon = () => <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M3 7V5a2 2 0 012-2h8l2 2"/><path d="M15 11v2a2 2 0 01-2 2H5l-2-2"/><polyline points="1,5 3,3 5,5"/><polyline points="17,11 15,13 13,11"/></svg>

export default function MusicPage() {
  const [activeIdx, setActiveIdx]     = useState(0)
  const [isPlaying, setIsPlaying]     = useState(false)
  const [playerReady, setPlayerReady] = useState(false)
  const [progress, setProgress]       = useState(0)
  const [curTime, setCurTime]         = useState(0)
  const [dur, setDur]                 = useState(0)
  const [repeat, _setRepeat]          = useState(false)
  const [liveVideos, setLiveVideos]   = useState<any[]>([])
  const [liveErr, setLiveErr]         = useState(false)

  const playerRef    = useRef<any>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const tickRef      = useRef<ReturnType<typeof setInterval> | null>(null)
  const repeatRef    = useRef(false)
  const loadedRef    = useRef(0)
  const carouselRef  = useRef<HTMLDivElement>(null)

  const setRepeat = (v: boolean) => { repeatRef.current = v; _setRepeat(v) }

  // ── YouTube IFrame API ──
  useEffect(() => {
    function initPlayer() {
      if (!containerRef.current) return
      const div = document.createElement('div')
      containerRef.current.appendChild(div)
      playerRef.current = new window.YT.Player(div, {
        videoId: tracks[0].id,
        playerVars: { autoplay: 0, rel: 0, modestbranding: 1, iv_load_policy: 3 },
        events: {
          onReady: () => setPlayerReady(true),
          onStateChange: (e: any) => {
            const S = window.YT.PlayerState
            if (e.data === S.PLAYING) { setIsPlaying(true); setDur(playerRef.current?.getDuration() ?? 0) }
            else if (e.data === S.PAUSED)  { setIsPlaying(false) }
            else if (e.data === S.ENDED)   {
              setIsPlaying(false)
              if (repeatRef.current) { playerRef.current?.seekTo(0, true); playerRef.current?.playVideo() }
              else setActiveIdx(prev => {
                const next = (prev + 1) % tracks.length
                setTimeout(() => { playerRef.current?.loadVideoById(tracks[next].id); loadedRef.current = next }, 60)
                return next
              })
            }
          },
        },
      })
    }
    if (typeof window === 'undefined') return
    if (window.YT?.Player) initPlayer()
    else {
      window.onYouTubeIframeAPIReady = initPlayer
      if (!document.querySelector('script[src*="youtube.com/iframe_api"]')) {
        const s = document.createElement('script'); s.src = 'https://www.youtube.com/iframe_api'; document.head.appendChild(s)
      }
    }
    return () => { if (tickRef.current) clearInterval(tickRef.current); playerRef.current?.destroy?.() }
  }, [])

  // ── Progress tick ──
  useEffect(() => {
    if (tickRef.current) clearInterval(tickRef.current)
    if (isPlaying) {
      tickRef.current = setInterval(() => {
        const t = playerRef.current?.getCurrentTime() ?? 0
        const d = playerRef.current?.getDuration() ?? 0
        setCurTime(t); setDur(d); setProgress(d > 0 ? t / d : 0)
      }, 300)
    }
    return () => { if (tickRef.current) clearInterval(tickRef.current) }
  }, [isPlaying])

  const togglePlay = useCallback(() => {
    if (!playerReady) return
    isPlaying ? playerRef.current?.pauseVideo() : playerRef.current?.playVideo()
  }, [isPlaying, playerReady])

  const selectTrack = useCallback((idx: number) => {
    if (idx === activeIdx) { togglePlay(); return }
    setActiveIdx(idx); loadedRef.current = idx
    setProgress(0); setCurTime(0); setDur(0)
    if (playerReady) playerRef.current?.loadVideoById(tracks[idx].id)
  }, [activeIdx, playerReady, togglePlay])

  const goPrev = useCallback(() => selectTrack((activeIdx - 1 + tracks.length) % tracks.length), [activeIdx, selectTrack])
  const goNext = useCallback(() => selectTrack((activeIdx + 1) % tracks.length), [activeIdx, selectTrack])

  const seekFF = useCallback(() => {
    if (!playerReady) return
    playerRef.current?.seekTo(Math.min((playerRef.current?.getCurrentTime() ?? 0) + 15, dur), true)
  }, [playerReady, dur])

  const seekRW = useCallback(() => {
    if (!playerReady) return
    playerRef.current?.seekTo(Math.max((playerRef.current?.getCurrentTime() ?? 0) - 15, 0), true)
  }, [playerReady])

  const handleSeek = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!playerReady || !dur) return
    const r = (e.clientX - e.currentTarget.getBoundingClientRect().left) / e.currentTarget.offsetWidth
    const t = r * dur
    playerRef.current?.seekTo(t, true)
    setProgress(r); setCurTime(t)
  }, [playerReady, dur])

  // ── Live services fetch ──
  useEffect(() => {
    fetch('/api/youtube-archive')
      .then(r => r.json())
      .then(d => setLiveVideos(d.videos ?? []))
      .catch(() => setLiveErr(true))
  }, [])

  // ── Scroll animations ──
  useEffect(() => {
    const obs = new IntersectionObserver(
      es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('is-visible'); obs.unobserve(e.target) } }),
      { threshold: 0.06, rootMargin: '0px 0px -40px 0px' }
    )
    document.querySelectorAll('.rv,.rv-left,.rv-right,.rv-scale').forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [liveVideos])

  return (
    <main style={{ background: '#FAF7F2', overflowX: 'hidden' }}>
      <style>{`
        .rv{opacity:0;transform:translateY(32px);transition:opacity .85s cubic-bezier(.16,1,.3,1),transform .85s cubic-bezier(.16,1,.3,1)}
        .rv.is-visible{opacity:1;transform:none}
        .rv-left{opacity:0;transform:translateX(-40px);transition:opacity .85s cubic-bezier(.16,1,.3,1),transform .85s cubic-bezier(.16,1,.3,1)}
        .rv-left.is-visible{opacity:1;transform:none}
        .rv-right{opacity:0;transform:translateX(40px);transition:opacity .85s cubic-bezier(.16,1,.3,1),transform .85s cubic-bezier(.16,1,.3,1)}
        .rv-right.is-visible{opacity:1;transform:none}
        .rv-scale{opacity:0;transform:scale(.94);transition:opacity .85s cubic-bezier(.16,1,.3,1),transform .85s cubic-bezier(.16,1,.3,1)}
        .rv-scale.is-visible{opacity:1;transform:none}
        .d1{transition-delay:.08s}.d2{transition-delay:.16s}.d3{transition-delay:.24s}
        .eyebrow{font-family:'DM Sans',sans-serif;font-size:10px;letter-spacing:.32em;text-transform:uppercase;color:#C9A84C;display:flex;align-items:center;gap:12px}
        .eyebrow::before{content:'';width:28px;height:1px;background:#C9A84C}
        .wc{display:inline-block;overflow:hidden;vertical-align:bottom}
        .wi{display:inline-block;animation:wordIn 1s cubic-bezier(.16,1,.3,1) both}
        @keyframes wordIn{from{transform:translateY(108%)}to{transform:translateY(0)}}
        @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-16px)}}
        @keyframes pulse-glow{0%,100%{opacity:.3;transform:scale(1)}50%{opacity:.55;transform:scale(1.06)}}
        @keyframes heroIn{from{opacity:0;transform:translateY(28px)}to{opacity:1;transform:none}}
        .ctrl-btn{background:none;border:none;cursor:pointer;padding:10px;color:rgba(250,247,242,.55);transition:color .25s,background .25s;display:flex;align-items:center;justify-content:center;border-radius:50%}
        .ctrl-btn:hover{color:#C9A84C}
        .ctrl-btn.on{color:#C9A84C}
        .ctrl-btn.big{background:rgba(201,168,76,.12);padding:16px;color:#FAF7F2;border-radius:50%}
        .ctrl-btn.big:hover{background:rgba(201,168,76,.22);color:#C9A84C}
        .prog-bar{height:3px;background:rgba(201,168,76,.15);cursor:pointer;border-radius:2px;position:relative;transition:height .2s}
        .prog-bar:hover{height:5px}
        .prog-fill{height:100%;background:#C9A84C;border-radius:2px;transition:width .3s linear;position:relative}
        .prog-fill::after{content:'';position:absolute;right:-5px;top:50%;transform:translateY(-50%);width:10px;height:10px;background:#C9A84C;border-radius:50%;opacity:0;transition:opacity .2s}
        .prog-bar:hover .prog-fill::after{opacity:1}
        .q-row{padding:14px 0;border-top:1px solid rgba(201,168,76,.07);cursor:pointer;display:flex;align-items:center;gap:16px;transition:background .25s;padding-left:8px;padding-right:8px}
        .q-row:hover{background:rgba(201,168,76,.05)}
        .q-row:last-child{border-bottom:1px solid rgba(201,168,76,.07)}
        .thumb-card{text-decoration:none;display:block;transition:transform .5s cubic-bezier(.16,1,.3,1)}
        .thumb-card:hover{transform:translateY(-6px)}
        .thumb-img{transition:transform .8s cubic-bezier(.16,1,.3,1);object-fit:cover}
        .thumb-card:hover .thumb-img{transform:scale(1.06)!important}
        .play-overlay{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;background:rgba(13,27,13,0);transition:background .3s}
        .thumb-card:hover .play-overlay,.live-card:hover .play-overlay{background:rgba(13,27,13,.45)}
        .play-circle{width:52px;height:52px;border-radius:50%;background:rgba(201,168,76,.92);display:flex;align-items:center;justify-content:center;opacity:0;transform:scale(.8);transition:opacity .3s,transform .3s}
        .thumb-card:hover .play-circle,.live-card:hover .play-circle{opacity:1;transform:scale(1)}
        .live-card{text-decoration:none;display:block;transition:transform .4s cubic-bezier(.16,1,.3,1)}
        .live-card:hover{transform:translateY(-5px)}
        .pill{display:inline-flex;align-items:center;gap:8px;padding:10px 22px;border:1px solid rgba(201,168,76,.25);font-family:'DM Sans',sans-serif;font-size:11px;letter-spacing:.1em;text-transform:uppercase;color:#3D4B3D;transition:all .3s;text-decoration:none}
        .pill:hover{border-color:#C9A84C;color:#C9A84C;background:rgba(201,168,76,.05)}
        .player-grid{display:grid;grid-template-columns:55% 45%;min-height:560px}
        @media(max-width:900px){.player-grid{grid-template-columns:1fr}}
        .queue-scroll{max-height:calc(100vh - 100px);overflow-y:auto}
        @media(max-width:900px){.queue-scroll{max-height:380px}}
        ::-webkit-scrollbar{width:4px}::-webkit-scrollbar-track{background:transparent}::-webkit-scrollbar-thumb{background:rgba(201,168,76,.2);border-radius:2px}
        .stream-pill{display:inline-flex;align-items:center;padding:7px 16px;border:1px solid rgba(250,247,242,.1);font-family:'DM Sans',sans-serif;font-size:10px;letter-spacing:.14em;text-transform:uppercase;color:rgba(250,247,242,.45);text-decoration:none;transition:all .3s;border-radius:1px}
        .stream-pill:hover{border-color:rgba(201,168,76,.4);color:#C9A84C}
        .carousel-track{display:flex;overflow-x:auto;scroll-snap-type:x mandatory;-webkit-overflow-scrolling:touch;gap:clamp(12px,1.5vw,22px);scrollbar-width:none;padding-bottom:4px}
        .carousel-track::-webkit-scrollbar{display:none}
        .carousel-card{scroll-snap-align:start;flex:0 0 calc(33.333% - 16px);min-width:0}
        @media(max-width:900px){.carousel-card{flex:0 0 calc(50% - 12px)}}
        @media(max-width:600px){.carousel-card{flex:0 0 82%}}
        .carousel-btn{background:rgba(250,247,242,.06);border:1px solid rgba(201,168,76,.2);color:rgba(250,247,242,.6);cursor:pointer;padding:12px 20px;font-size:18px;transition:all .3s;line-height:1;font-family:'DM Sans',sans-serif}
        .carousel-btn:hover{border-color:#C9A84C;color:#C9A84C;background:rgba(201,168,76,.08)}
        .carousel-btn:active{transform:scale(.94)}
      `}</style>

      {/* ══ HERO — Artist profile split ══ */}
      <section style={{ minHeight:'100vh', display:'grid', gridTemplateColumns:'1fr 48%', background:'#000', position:'relative' }}>
        {/* LEFT — text panel */}
        <div style={{ display:'flex', flexDirection:'column', justifyContent:'flex-end', padding:'clamp(120px,14vw,160px) clamp(32px,5vw,72px) clamp(48px,7vw,80px)', position:'relative', zIndex:2 }}>
          <div style={{ animation:'heroIn .9s .2s both' }}>
            <div style={{ fontFamily:'DM Sans,sans-serif', fontSize:'9px', letterSpacing:'.45em', textTransform:'uppercase', color:'rgba(201,168,76,.45)', marginBottom:'clamp(24px,4vw,48px)' }}>
              Solomon Stephen · Music
            </div>
            <h1 style={{ fontFamily:'Cormorant Garamond,serif', fontSize:'clamp(56px,9vw,120px)', fontWeight:400, lineHeight:.88, color:'#fff', margin:'0 0 clamp(24px,3vw,40px)', letterSpacing:'-.03em' }}>
              Sound<br />from the<br /><em style={{ color:'#C9A84C' }}>Secret Place.</em>
            </h1>
            <p style={{ fontFamily:'DM Sans,sans-serif', fontSize:'clamp(13px,1.3vw,15px)', lineHeight:1.9, color:'rgba(255,255,255,.38)', maxWidth:'380px', margin:'0 0 clamp(32px,4vw,56px)' }}>
              Every song is an invitation. Not performance — presence. A doorway into the reality of God that Solomon carries in his own life.
            </p>
            {/* Track count pills */}
            <div style={{ display:'flex', gap:'8px', flexWrap:'wrap' }}>
              {[['07','Original Releases'],['2021','–  2025'],['YouTube','Channel']].map(([a,b]) => (
                <div key={a} style={{ padding:'8px 16px', border:'1px solid rgba(255,255,255,.08)', background:'rgba(255,255,255,.03)' }}>
                  <div style={{ fontFamily:'Cormorant Garamond,serif', fontSize:'18px', color:'#C9A84C', lineHeight:1 }}>{a}</div>
                  <div style={{ fontFamily:'DM Sans,sans-serif', fontSize:'9px', letterSpacing:'.18em', textTransform:'uppercase', color:'rgba(255,255,255,.3)', marginTop:'3px' }}>{b}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT — full-height photo */}
        <div style={{ position:'relative', overflow:'hidden' }}>
          <Image src="/images/gallery-solomon-worship-intense.jpg" alt="Solomon Stephen" fill priority
            style={{ objectFit:'cover', objectPosition:'center 20%' }} />
          {/* Left-edge fade into black */}
          <div style={{ position:'absolute', inset:0, background:'linear-gradient(to right, #000 0%, transparent 40%)' }} />
          {/* Bottom fade */}
          <div style={{ position:'absolute', inset:0, background:'linear-gradient(to top, rgba(0,0,0,.5) 0%, transparent 50%)' }} />
        </div>

        {/* Mobile: stack */}
        <style>{`@media(max-width:800px){section:first-of-type{grid-template-columns:1fr!important;grid-template-rows:auto 55vw}}`}</style>
      </section>

      {/* ══ PREMIUM PLAYER ══ */}
      <section style={{ background:'#070D07' }}>
        <div className="player-grid">

          {/* Left: video + controls */}
          <div style={{ padding:'clamp(32px,4vw,56px)', display:'flex', flexDirection:'column', gap:'20px', borderRight:'1px solid rgba(201,168,76,.08)' }}>
            <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
              <div className="eyebrow" style={{ color:'rgba(201,168,76,.55)' }}>Now Playing</div>
              <div style={{ fontFamily:'DM Sans', fontSize:'10px', letterSpacing:'.22em', color:'rgba(201,168,76,.35)', textTransform:'uppercase' }}>{activeIdx + 1} / {tracks.length}</div>
            </div>

            {/* YT embed container */}
            <div ref={containerRef} style={{ aspectRatio:'16/9', width:'100%', background:'#000', overflow:'hidden', borderRadius:'2px', border:'1px solid rgba(201,168,76,.07)' }} />

            {/* Track info */}
            <div style={{ borderLeft:'2px solid rgba(201,168,76,.3)', paddingLeft:'16px' }}>
              <h2 style={{ fontFamily:'Cormorant Garamond,serif', fontSize:'clamp(22px,3vw,34px)', fontWeight:400, color:'#FAF7F2', margin:'0 0 6px', lineHeight:1.1 }}>
                {tracks[activeIdx].title}
              </h2>
              <div style={{ fontFamily:'DM Sans', fontSize:'11px', letterSpacing:'.14em', textTransform:'uppercase', color:'rgba(201,168,76,.65)' }}>
                {tracks[activeIdx].scripture ? `${tracks[activeIdx].scripture} · ` : 'New Release · '}{tracks[activeIdx].year}
              </div>
            </div>

            {/* Progress */}
            <div>
              <div className="prog-bar" onClick={handleSeek}>
                <div className="prog-fill" style={{ width:`${progress * 100}%` }} />
              </div>
              <div style={{ display:'flex', justifyContent:'space-between', marginTop:'8px' }}>
                <span style={{ fontFamily:'DM Sans', fontSize:'11px', color:'rgba(250,247,242,.4)', fontVariantNumeric:'tabular-nums' }}>{fmtTime(curTime)}</span>
                <span style={{ fontFamily:'DM Sans', fontSize:'11px', color:'rgba(250,247,242,.22)', fontVariantNumeric:'tabular-nums' }}>{fmtTime(dur)}</span>
              </div>
            </div>

            {/* Controls */}
            <div style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:'6px' }}>
              <button className={`ctrl-btn${repeat ? ' on' : ''}`} onClick={() => setRepeat(!repeat)} title="Repeat" aria-label="Repeat">
                <RepeatIcon />
              </button>
              <button className="ctrl-btn" onClick={seekRW} aria-label="Rewind 15s" title="–15s" style={{ fontFamily:'DM Sans', fontSize:'13px', color:'rgba(250,247,242,.45)' }}>‹15</button>
              <button className="ctrl-btn" onClick={goPrev} aria-label="Previous"><PrevIcon /></button>
              <button className="ctrl-btn big" onClick={togglePlay} aria-label={isPlaying ? 'Pause' : 'Play'}>
                {isPlaying ? <PauseIcon /> : <PlayIcon />}
              </button>
              <button className="ctrl-btn" onClick={goNext} aria-label="Next"><NextIcon /></button>
              <button className="ctrl-btn" onClick={seekFF} aria-label="Forward 15s" title="+15s" style={{ fontFamily:'DM Sans', fontSize:'13px', color:'rgba(250,247,242,.45)' }}>15›</button>
            </div>

            {/* Stream links */}
            <div style={{ display:'flex', gap:'10px', flexWrap:'wrap', paddingTop:'16px', borderTop:'1px solid rgba(201,168,76,.07)' }}>
              <a href="https://open.spotify.com/artist/7l1GQgXjGCQxlXRxIlHnJw" target="_blank" rel="noopener noreferrer" className="stream-pill">Spotify</a>
              <a href="https://music.apple.com/ng/artist/solomon-stephen/1440574453" target="_blank" rel="noopener noreferrer" className="stream-pill">Apple Music</a>
              <a href={CHANNEL} target="_blank" rel="noopener noreferrer" className="stream-pill">YouTube</a>
            </div>
          </div>

          {/* Right: Queue */}
          <div className="queue-scroll" style={{ padding:'clamp(32px,4vw,56px) clamp(24px,3vw,44px)' }}>
            <div style={{ fontFamily:'DM Sans', fontSize:'10px', letterSpacing:'.28em', textTransform:'uppercase', color:'rgba(201,168,76,.4)', marginBottom:'24px' }}>Queue</div>

            {tracks.map((t, i) => (
              <div key={t.id} className="q-row" onClick={() => selectTrack(i)}
                style={{ background: i === activeIdx ? 'rgba(201,168,76,.05)' : 'transparent', borderRadius:'1px' }}
              >
                <span style={{ fontFamily:'DM Sans', fontSize:'10px', letterSpacing:'.2em', color: i === activeIdx ? '#C9A84C' : 'rgba(250,247,242,.22)', minWidth:'28px', flexShrink:0 }}>
                  {i === activeIdx && isPlaying ? '▶' : String(i + 1).padStart(2, '0')}
                </span>
                <div style={{ flex:1, minWidth:0 }}>
                  <div style={{ fontFamily:'Cormorant Garamond,serif', fontSize:'clamp(15px,1.7vw,19px)', fontWeight:400, color: i === activeIdx ? '#C9A84C' : '#FAF7F2', whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis', lineHeight:1.2 }}>{t.title}</div>
                  <div style={{ fontFamily:'DM Sans', fontSize:'10px', color:'rgba(250,247,242,.28)', marginTop:'3px' }}>{t.scripture || 'New Release'}</div>
                </div>
                <div style={{ fontFamily:'DM Sans', fontSize:'10px', color:'rgba(250,247,242,.22)', flexShrink:0 }}>{t.year}</div>
              </div>
            ))}

            <div style={{ marginTop:'40px', paddingTop:'32px', borderTop:'1px solid rgba(201,168,76,.08)' }}>
              <p style={{ fontFamily:'Cormorant Garamond,serif', fontSize:'clamp(15px,1.8vw,19px)', fontStyle:'italic', color:'rgba(250,247,242,.3)', lineHeight:1.75, margin:0 }}>
                "I don't write songs — I document encounters."
              </p>
              <div style={{ fontFamily:'DM Sans', fontSize:'10px', letterSpacing:'.18em', color:'rgba(201,168,76,.4)', marginTop:'12px' }}>— Solomon Stephen</div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ VISUAL LIBRARY ══ */}
      <section style={{ padding:'clamp(72px,9vw,120px) clamp(24px,4vw,80px)', background:'#FAF7F2' }}>
        <div style={{ maxWidth:'1280px', margin:'0 auto' }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-end', flexWrap:'wrap', gap:'24px', marginBottom:'clamp(40px,5vw,64px)' }}>
            <div>
              <div className="eyebrow rv" style={{ marginBottom:'16px' }}>Visual Library</div>
              <h2 className="rv d1" style={{ fontFamily:'Cormorant Garamond,serif', fontSize:'clamp(36px,5.5vw,64px)', fontWeight:400, color:'#0D1B0D', lineHeight:1, margin:0 }}>On YouTube</h2>
            </div>
            <a href={CHANNEL} target="_blank" rel="noopener noreferrer" className="rv d2 pill">Subscribe →</a>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(240px,1fr))', gap:'clamp(16px,2vw,28px)' }}>
            {tracks.map((t, i) => (
              <a key={t.id} href={`https://www.youtube.com/watch?v=${t.id}`} target="_blank" rel="noopener noreferrer"
                className="thumb-card rv-scale" style={{ transitionDelay:`${i * 0.06}s` }}
              >
                <div style={{ position:'relative', aspectRatio:'16/9', overflow:'hidden', borderRadius:'2px', marginBottom:'14px', background:'#1A2E1A' }}>
                  <Image src={`https://img.youtube.com/vi/${t.id}/hqdefault.jpg`} alt={t.title} fill className="thumb-img" style={{ objectFit:'cover' }} unoptimized />
                  <div className="play-overlay">
                    <div className="play-circle">
                      <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><polygon points="6,3 15,9 6,15" fill="#1A2E1A"/></svg>
                    </div>
                  </div>
                </div>
                <div style={{ fontFamily:'Cormorant Garamond,serif', fontSize:'20px', fontWeight:400, color:'#0D1B0D', marginBottom:'4px', lineHeight:1.2 }}>{t.title}</div>
                <div style={{ fontFamily:'DM Sans', fontSize:'11px', color:'#8A9A8A' }}>{t.scripture ? `${t.scripture} · ` : ''}{t.year}</div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ══ LIVE SERVICES ══ */}
      {!liveErr && (
        <section style={{ background:'#111D11', padding:'clamp(72px,9vw,120px) clamp(24px,4vw,80px)' }}>
          <div style={{ maxWidth:'1280px', margin:'0 auto' }}>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-end', flexWrap:'wrap', gap:'24px', marginBottom:'clamp(40px,5vw,64px)' }}>
              <div>
                <div className="eyebrow rv" style={{ color:'rgba(201,168,76,.65)', marginBottom:'16px' }}>Archive</div>
                <h2 className="rv d1" style={{ fontFamily:'Cormorant Garamond,serif', fontSize:'clamp(36px,5.5vw,64px)', fontWeight:400, color:'#FAF7F2', lineHeight:1, margin:0 }}>Live Services</h2>
              </div>
              {/* Swipe arrows */}
              <div className="rv d2" style={{ display:'flex', gap:'10px' }}>
                <button className="carousel-btn" onClick={() => carouselRef.current?.scrollBy({ left: -(carouselRef.current.clientWidth * 0.9), behavior:'smooth' })} aria-label="Previous">←</button>
                <button className="carousel-btn" onClick={() => carouselRef.current?.scrollBy({ left: carouselRef.current.clientWidth * 0.9, behavior:'smooth' })} aria-label="Next">→</button>
              </div>
            </div>

            {liveVideos.length === 0 ? (
              <div style={{ display:'flex', gap:'20px', overflow:'hidden' }}>
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} style={{ flex:'0 0 calc(33.333% - 14px)', aspectRatio:'16/9', background:'rgba(255,255,255,.04)', borderRadius:'2px', animation:`pulse-glow 1.8s ease-in-out ${i * 0.15}s infinite` }} />
                ))}
              </div>
            ) : (
              <>
                <div ref={carouselRef} className="carousel-track">
                  {liveVideos.map((v: any) => (
                    <a key={v.id} href={`https://www.youtube.com/watch?v=${v.id}`} target="_blank" rel="noopener noreferrer"
                      className="live-card carousel-card"
                    >
                      <div style={{ position:'relative', aspectRatio:'16/9', overflow:'hidden', borderRadius:'2px', marginBottom:'14px', background:'#0D1B0D' }}>
                        <Image src={v.thumbnail} alt={v.title} fill style={{ objectFit:'cover', opacity:.82 }} unoptimized />
                        <div style={{ position:'absolute', top:'10px', left:'10px', background:'rgba(201,168,76,.92)', padding:'3px 9px', fontFamily:'DM Sans', fontSize:'9px', letterSpacing:'.16em', textTransform:'uppercase', color:'#0D1B0D', fontWeight:700 }}>
                          {v.category === 'Other' ? 'Live' : v.category}
                        </div>
                        <div className="play-overlay">
                          <div className="play-circle">
                            <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><polygon points="6,3 15,9 6,15" fill="#0D1B0D"/></svg>
                          </div>
                        </div>
                      </div>
                      <div style={{ fontFamily:'Cormorant Garamond,serif', fontSize:'18px', fontWeight:400, color:'#FAF7F2', marginBottom:'6px', lineHeight:1.3 }}>
                        {v.title.length > 52 ? v.title.slice(0, 52) + '…' : v.title}
                      </div>
                      <div style={{ fontFamily:'DM Sans', fontSize:'10px', color:'rgba(250,247,242,.33)', letterSpacing:'.06em' }}>{v.date}</div>
                    </a>
                  ))}
                </div>
                {/* Watch More */}
                <div style={{ display:'flex', justifyContent:'center', marginTop:'clamp(40px,5vw,60px)' }}>
                  <a href={CHANNEL} target="_blank" rel="noopener noreferrer"
                    style={{ fontFamily:'DM Sans', fontSize:'11px', letterSpacing:'.2em', textTransform:'uppercase', padding:'15px 44px', border:'1px solid rgba(201,168,76,.3)', color:'#C9A84C', textDecoration:'none', transition:'all .35s', display:'inline-flex', alignItems:'center', gap:'12px' }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background='rgba(201,168,76,.08)'; (e.currentTarget as HTMLElement).style.borderColor='#C9A84C'; (e.currentTarget as HTMLElement).style.letterSpacing='.26em' }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background='transparent'; (e.currentTarget as HTMLElement).style.borderColor='rgba(201,168,76,.3)'; (e.currentTarget as HTMLElement).style.letterSpacing='.2em' }}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polygon points="5,3 19,12 5,21"/></svg>
                    Watch More on YouTube
                  </a>
                </div>
              </>
            )}
          </div>
        </section>
      )}

      <Footer />
    </main>
  )
}