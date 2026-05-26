'use client'

import { useEffect, useState, useRef, useCallback } from 'react'
import Image from 'next/image'
import Footer from '@/components/Footer'

declare global {
  interface Window { YT: any; onYouTubeIframeAPIReady: () => void }
}

interface Track {
  id: string
  title: string
  year: string
  scripture: string
  desc: string
  noEmbed?: boolean
}

const releaseTracks: Track[] = [
  { id: 'TnEp0kiJBfI', title: 'Latest Release',  year: '2025', scripture: '',             desc: 'The newest sound from Solomon Stephen — a fresh move of God captured in worship.' },
  { id: 'c8KAM_l151s', title: 'CROSSOVER',        year: '2024', scripture: 'Psalm 23',     desc: 'A prophetic declaration of passing through — beyond every limitation, into the fullness of God.' },
  { id: 'cB0LxEjVaIs', title: 'The Mighty God',   year: '2023', scripture: 'Isaiah 9:6',   desc: 'An encounter with the power and majesty of God — unstoppable, unshakeable, reigning above all.', noEmbed: true },
  { id: 'EPA7cFLHg2c', title: 'AIKU',             year: '2023', scripture: 'Rev 1:17–18',  desc: 'Death could not hold Him. A bold, triumphant anthem declaring the resurrection power of Jesus.' },
  { id: '6TYabI5QCO4', title: 'Awesome God',      year: '2022', scripture: 'Psalm 48:1',   desc: 'A live worship experience capturing the atmosphere of surrender and awe in the presence of God.' },
  { id: 'q1-eDXBpMkY', title: 'Alagbada Ina',     year: '2022', scripture: 'Exodus 3:2',   desc: 'The God clothed in fire — a Yoruba-infused anthem from the burning bush encounter.', noEmbed: true },
  { id: 'Ao_ZC3oHi9c', title: 'There Is No One',  year: '2021', scripture: 'Isaiah 46:9',  desc: 'A tender declaration of the uniqueness and incomparability of God. Intimate. Personal. True.', noEmbed: true },
]

const CHANNEL = 'https://www.youtube.com/@thesolomonsteph'

function fmtTime(s: number): string {
  if (!isFinite(s) || s < 0) return '0:00'
  return `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}`
}

const PlayIcon   = () => <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><polygon points="6,3 19,11 6,19" fill="currentColor"/></svg>
const PauseIcon  = () => <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><rect x="5" y="3" width="4" height="16" rx="1" fill="currentColor"/><rect x="13" y="3" width="4" height="16" rx="1" fill="currentColor"/></svg>
const PrevIcon   = () => <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><polygon points="14,2 4,9 14,16" fill="currentColor"/><rect x="3" y="2" width="2.5" height="14" rx="1" fill="currentColor"/></svg>
const NextIcon   = () => <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><polygon points="4,2 14,9 4,16" fill="currentColor"/><rect x="12.5" y="2" width="2.5" height="14" rx="1" fill="currentColor"/></svg>
const RepeatIcon = () => <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M3 7V5a2 2 0 012-2h8l2 2"/><path d="M15 11v2a2 2 0 01-2 2H5l-2-2"/><polyline points="1,5 3,3 5,5"/><polyline points="17,11 15,13 13,11"/></svg>
const YTIcon     = () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="5,3 19,12 5,21"/></svg>

export default function MusicPage() {
  const [activeTab, setActiveTab]     = useState<'releases' | 'live'>('releases')
  const [activeIdx, setActiveIdx]     = useState(0)
  const [isPlaying, setIsPlaying]     = useState(false)
  const [playerReady, setPlayerReady] = useState(false)
  const [progress, setProgress]       = useState(0)
  const [curTime, setCurTime]         = useState(0)
  const [dur, setDur]                 = useState(0)
  const [repeat, _setRepeat]          = useState(false)
  const [liveVideos, setLiveVideos]   = useState<any[]>([])
  const [liveErr, setLiveErr]         = useState(false)
  const [latestTitle, setLatestTitle] = useState('')

  const playerRef    = useRef<any>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const tickRef      = useRef<ReturnType<typeof setInterval> | null>(null)
  const repeatRef    = useRef(false)
  const activeTabRef = useRef<'releases' | 'live'>('releases')
  const liveVideosRef = useRef<any[]>([])
  const libCarRef    = useRef<HTMLDivElement>(null)

  const setRepeat = (v: boolean) => { repeatRef.current = v; _setRepeat(v) }

  useEffect(() => { activeTabRef.current = activeTab }, [activeTab])
  useEffect(() => { liveVideosRef.current = liveVideos }, [liveVideos])

  // Current track list
  const currentTracks: Track[] = activeTab === 'releases'
    ? releaseTracks
    : liveVideos.map((v: any) => ({
        id: v.id,
        title: v.title,
        year: String(v.date ?? '').slice(0, 4),
        scripture: v.category === 'Other' ? 'Live' : (v.category ?? 'Live'),
        desc: '',
      }))

  const currentTrack: Track = currentTracks[activeIdx] ?? releaseTracks[0]
  const isNoEmbed = activeTab === 'releases' && !!currentTrack.noEmbed
  const displayTitle = (currentTrack.id === 'TnEp0kiJBfI' && latestTitle) ? latestTitle : currentTrack.title

  // Fetch real title for latest release via oEmbed
  useEffect(() => {
    fetch('https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=TnEp0kiJBfI&format=json')
      .then(r => r.json())
      .then((d: any) => { if (d.title) setLatestTitle(d.title) })
      .catch(() => {})
  }, [])

  // Force-resize the YT iframe to fill container (YouTube resets dims on loadVideoById)
  const resizePlayer = () => {
    requestAnimationFrame(() => {
      try {
        const iframe = playerRef.current?.getIframe?.()
        if (iframe) {
          iframe.style.cssText = 'position:absolute!important;top:0!important;left:0!important;width:100%!important;height:100%!important;border:0!important;max-width:100%!important'
        }
      } catch (_) {}
    })
  }

  // YouTube IFrame API — init once
  useEffect(() => {
    function initPlayer() {
      if (!containerRef.current) return
      const div = document.createElement('div')
      containerRef.current.appendChild(div)
      playerRef.current = new window.YT.Player(div, {
        width: '100%',
        height: '100%',
        videoId: releaseTracks[0].id,
        playerVars: { autoplay: 0, rel: 0, modestbranding: 1, iv_load_policy: 3, playsinline: 1 },
        events: {
          onReady: () => { setPlayerReady(true); resizePlayer() },
          onStateChange: (e: any) => {
            const S = window.YT.PlayerState
            if (e.data === S.PLAYING) {
              setIsPlaying(true)
              setDur(playerRef.current?.getDuration() ?? 0)
              resizePlayer()
            } else if (e.data === S.PAUSED) {
              setIsPlaying(false)
            } else if (e.data === S.ENDED) {
              setIsPlaying(false)
              if (repeatRef.current) {
                playerRef.current?.seekTo(0, true)
                playerRef.current?.playVideo()
              } else {
                setActiveIdx(prev => {
                  const tab = activeTabRef.current
                  const list = tab === 'releases' ? releaseTracks : liveVideosRef.current
                  const next = (prev + 1) % Math.max(list.length, 1)
                  setTimeout(() => {
                    const nxt = list[next] as any
                    if (nxt && !nxt.noEmbed) { playerRef.current?.loadVideoById(nxt.id); resizePlayer() }
                  }, 60)
                  return next
                })
              }
            }
          },
        },
      })
    }
    if (typeof window === 'undefined') return
    if (window.YT?.Player) { initPlayer() }
    else {
      window.onYouTubeIframeAPIReady = initPlayer
      if (!document.querySelector('script[src*="youtube.com/iframe_api"]')) {
        const s = document.createElement('script')
        s.src = 'https://www.youtube.com/iframe_api'
        document.head.appendChild(s)
      }
    }
    return () => {
      if (tickRef.current) clearInterval(tickRef.current)
      playerRef.current?.destroy?.()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Progress tick
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
    if (!playerReady || isNoEmbed) return
    isPlaying ? playerRef.current?.pauseVideo() : playerRef.current?.playVideo()
  }, [isPlaying, playerReady, isNoEmbed])

  const selectTrack = useCallback((idx: number) => {
    if (idx === activeIdx) { togglePlay(); return }
    setActiveIdx(idx)
    setProgress(0); setCurTime(0); setDur(0); setIsPlaying(false)
    const tab = activeTabRef.current
    const list: any[] = tab === 'releases' ? releaseTracks : liveVideosRef.current
    const track = list[idx]
    if (track && !track.noEmbed && playerReady) {
      playerRef.current?.loadVideoById(track.id); resizePlayer()
    } else if (playerReady) {
      playerRef.current?.pauseVideo?.()
    }
  }, [activeIdx, playerReady, togglePlay])

  const goPrev = useCallback(() => {
    const list = activeTabRef.current === 'releases' ? releaseTracks : liveVideosRef.current
    selectTrack((activeIdx - 1 + list.length) % list.length)
  }, [activeIdx, selectTrack])

  const goNext = useCallback(() => {
    const list = activeTabRef.current === 'releases' ? releaseTracks : liveVideosRef.current
    selectTrack((activeIdx + 1) % list.length)
  }, [activeIdx, selectTrack])

  const seekFF = useCallback(() => {
    if (!playerReady || isNoEmbed) return
    playerRef.current?.seekTo(Math.min((playerRef.current?.getCurrentTime() ?? 0) + 15, dur), true)
  }, [playerReady, dur, isNoEmbed])

  const seekRW = useCallback(() => {
    if (!playerReady || isNoEmbed) return
    playerRef.current?.seekTo(Math.max((playerRef.current?.getCurrentTime() ?? 0) - 15, 0), true)
  }, [playerReady, isNoEmbed])

  const handleSeek = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!playerReady || !dur || isNoEmbed) return
    const r = (e.clientX - e.currentTarget.getBoundingClientRect().left) / e.currentTarget.offsetWidth
    const t = r * dur
    playerRef.current?.seekTo(t, true)
    setProgress(r); setCurTime(t)
  }, [playerReady, dur, isNoEmbed])

  const switchTab = useCallback((tab: 'releases' | 'live') => {
    if (tab === activeTab) return
    playerRef.current?.pauseVideo?.()
    setIsPlaying(false); setProgress(0); setCurTime(0); setDur(0); setActiveIdx(0)
    setActiveTab(tab)
    const live = liveVideosRef.current
    setTimeout(() => {
      if (tab === 'releases' && !releaseTracks[0].noEmbed && playerReady) {
        playerRef.current?.cueVideoById(releaseTracks[0].id)
      } else if (tab === 'live' && live[0] && playerReady) {
        playerRef.current?.cueVideoById(live[0].id)
      }
    }, 60)
  }, [activeTab, playerReady])

  // Live fetch
  useEffect(() => {
    fetch('/api/youtube-archive')
      .then(r => r.json())
      .then((d: any) => setLiveVideos(d.videos ?? []))
      .catch(() => setLiveErr(true))
  }, [])

  // Scroll animations
  useEffect(() => {
    const obs = new IntersectionObserver(
      es => es.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('is-visible'); obs.unobserve(e.target) }
      }),
      { threshold: 0.06, rootMargin: '0px 0px -40px 0px' }
    )
    document.querySelectorAll('.rv,.rv-left,.rv-right,.rv-scale').forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [liveVideos])

  const queueList = activeTab === 'releases' ? releaseTracks : currentTracks

  return (
    <main style={{ background: '#FAF7F2', overflowX: 'hidden' }}>
      <style>{`
        /* ── Animations ── */
        .rv{opacity:0;transform:translateY(32px);transition:opacity .85s cubic-bezier(.16,1,.3,1),transform .85s cubic-bezier(.16,1,.3,1)}
        .rv.is-visible{opacity:1;transform:none}
        .rv-left{opacity:0;transform:translateX(-40px);transition:opacity .85s cubic-bezier(.16,1,.3,1),transform .85s cubic-bezier(.16,1,.3,1)}
        .rv-left.is-visible{opacity:1;transform:none}
        .rv-right{opacity:0;transform:translateX(40px);transition:opacity .85s cubic-bezier(.16,1,.3,1),transform .85s cubic-bezier(.16,1,.3,1)}
        .rv-right.is-visible{opacity:1;transform:none}
        .rv-scale{opacity:0;transform:scale(.94);transition:opacity .85s cubic-bezier(.16,1,.3,1),transform .85s cubic-bezier(.16,1,.3,1)}
        .rv-scale.is-visible{opacity:1;transform:none}
        .d1{transition-delay:.08s}.d2{transition-delay:.16s}.d3{transition-delay:.24s}
        @keyframes heroIn{from{opacity:0;transform:translateY(28px)}to{opacity:1;transform:none}}
        @keyframes pulse-glow{0%,100%{opacity:.3;transform:scale(1)}50%{opacity:.55;transform:scale(1.06)}}
        @keyframes wave{0%,100%{transform:scaleY(.35)}50%{transform:scaleY(1)}}
        /* ── Layout ── */
        .eyebrow{font-family:'DM Sans',sans-serif;font-size:10px;letter-spacing:.32em;text-transform:uppercase;color:#C9A84C;display:flex;align-items:center;gap:12px}
        .eyebrow::before{content:'';width:28px;height:1px;background:#C9A84C}
        /* ── Player grid ── */
        .player-grid{display:grid;grid-template-columns:58% 42%}
        @media(max-width:860px){.player-grid{grid-template-columns:1fr;overflow:hidden;max-width:100vw}}
        /* ── Waveform ── */
        .waveform{display:inline-flex;align-items:center;gap:2px;height:22px;flex-shrink:0}
        .wbar{width:3px;border-radius:2px;background:#C9A84C;animation:wave 1.1s ease-in-out infinite;height:100%}
        /* ── Controls ── */
        .ctrl-btn{background:none;border:none;cursor:pointer;padding:10px;color:rgba(250,247,242,.45);transition:color .25s,background .25s;display:flex;align-items:center;justify-content:center;border-radius:50%}
        .ctrl-btn:hover:not(:disabled){color:#C9A84C}
        .ctrl-btn.on{color:#C9A84C}
        .ctrl-btn.big{background:rgba(201,168,76,.14);padding:18px;color:#FAF7F2;border-radius:50%}
        .ctrl-btn.big:hover:not(:disabled){background:rgba(201,168,76,.26);color:#C9A84C}
        .ctrl-btn:disabled{opacity:.2;cursor:default}
        /* ── Progress bar ── */
        .prog-bar{height:3px;background:rgba(201,168,76,.12);cursor:pointer;border-radius:2px;position:relative;transition:height .2s}
        .prog-bar:hover{height:5px}
        .prog-fill{height:100%;background:linear-gradient(to right,rgba(201,168,76,.65),#C9A84C);border-radius:2px;transition:width .3s linear;position:relative}
        .prog-fill::after{content:'';position:absolute;right:-5px;top:50%;transform:translateY(-50%);width:10px;height:10px;background:#C9A84C;border-radius:50%;opacity:0;transition:opacity .2s}
        .prog-bar:hover .prog-fill::after{opacity:1}
        /* ── Queue ── */
        .q-row{padding:14px 10px;border-top:1px solid rgba(201,168,76,.06);cursor:pointer;display:grid;grid-template-columns:28px 1fr auto;align-items:center;gap:16px;transition:background .25s;border-radius:2px}
        .q-row:hover{background:rgba(201,168,76,.06)}
        .q-row:last-child{border-bottom:1px solid rgba(201,168,76,.06)}
        .queue-scroll{overflow-y:auto}
        @media(min-width:861px){.queue-scroll{max-height:calc(100vh - 52px);position:sticky;top:0}}
        @media(max-width:860px){.queue-scroll{max-height:400px}}
        ::-webkit-scrollbar{width:3px}::-webkit-scrollbar-track{background:transparent}::-webkit-scrollbar-thumb{background:rgba(201,168,76,.18);border-radius:2px}
        /* ── Tabs ── */
        .tab-btn{background:none;border:none;cursor:pointer;font-family:'DM Sans',sans-serif;font-size:10px;letter-spacing:.22em;text-transform:uppercase;padding:18px 28px;color:rgba(250,247,242,.3);border-bottom:2px solid transparent;transition:color .25s,border-color .25s;white-space:nowrap}
        .tab-btn.active{color:#C9A84C;border-bottom-color:#C9A84C}
        .tab-btn:hover{color:rgba(201,168,76,.7)}
        /* ── Stream pills ── */
        .stream-pill{display:inline-flex;align-items:center;padding:7px 16px;border:1px solid rgba(250,247,242,.09);font-family:'DM Sans',sans-serif;font-size:10px;letter-spacing:.14em;text-transform:uppercase;color:rgba(250,247,242,.4);text-decoration:none;transition:all .3s;border-radius:1px}
        .stream-pill:hover{border-color:rgba(201,168,76,.4);color:#C9A84C}
        /* ── No-embed overlay ── */
        /* ── No-embed full-bleed frame ── */
        .no-embed-frame{position:absolute;inset:0;display:block;text-decoration:none;cursor:pointer;overflow:hidden}
        .no-embed-bg{position:absolute;inset:0;background:linear-gradient(160deg,#0a1a0a 0%,#0f2a0f 40%,#1a3a1a 70%,#0d1b0d 100%)}
        .no-embed-corner{position:absolute;width:20px;height:20px;border-color:rgba(201,168,76,.4);border-style:solid}
        .no-embed-corner-tl{top:16px;left:16px;border-width:1px 0 0 1px}
        .no-embed-corner-tr{top:16px;right:16px;border-width:1px 1px 0 0}
        .no-embed-corner-bl{bottom:16px;left:16px;border-width:0 0 1px 1px}
        .no-embed-corner-br{bottom:16px;right:16px;border-width:0 1px 1px 0}
        .no-embed-content{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:20px;text-align:center}
        .no-embed-watch-btn{display:inline-flex;align-items:center;gap:9px;padding:12px 28px;background:#C9A84C;color:#0D1B0D;font-family:'DM Sans',sans-serif;font-size:10px;letter-spacing:.18em;text-transform:uppercase;font-weight:700;transition:background .25s,transform .2s;border-radius:1px}
        .no-embed-frame:hover .no-embed-watch-btn{background:#d4b462;transform:scale(1.04)}
        .no-embed-frame:hover .no-embed-bg{background:linear-gradient(160deg,#0f2a0f 0%,#163516 40%,#224422 70%,#122212 100%)}
        /* ── Mobile: full-bleed video, constrained container ── */
        @media(max-width:860px){
          .player-left-col{padding-left:0!important;padding-right:0!important;padding-top:0!important;overflow:hidden}
          .player-header-pad{padding:clamp(20px,5vw,32px) clamp(16px,5vw,28px) 0}
          .player-body-pad{padding:0 clamp(16px,5vw,28px)}
          .yt-video-outer{
            width:100vw!important;
            padding-top:56.25vw!important;
            border-radius:0!important;
            border-left:0!important;
            border-right:0!important;
            border-top:0!important;
            margin-top:0!important;
          }
        }
        /* ── YouTube iframe fill — force containment ── */
        .yt-wrap{overflow:hidden!important}
        .yt-wrap>div,.yt-wrap iframe{display:block!important;position:absolute!important;top:0!important;left:0!important;width:100%!important;height:100%!important;border:0!important;max-width:100%!important;margin:0!important}
        /* ── Carousel ── */
        .carousel-track{display:flex;overflow-x:auto;scroll-snap-type:x mandatory;-webkit-overflow-scrolling:touch;gap:clamp(12px,1.5vw,22px);scrollbar-width:none;padding-bottom:4px}
        .carousel-track::-webkit-scrollbar{display:none}
        .carousel-card{scroll-snap-align:start;flex:0 0 calc(33.333% - 16px);min-width:0}
        @media(max-width:900px){.carousel-card{flex:0 0 calc(50% - 12px)}}
        @media(max-width:600px){.carousel-card{flex:0 0 84%}}
        .carousel-btn{background:rgba(250,247,242,.05);border:1px solid rgba(201,168,76,.18);color:rgba(250,247,242,.5);cursor:pointer;padding:12px 20px;font-size:18px;transition:all .3s;line-height:1;font-family:'DM Sans',sans-serif}
        .carousel-btn:hover{border-color:#C9A84C;color:#C9A84C;background:rgba(201,168,76,.08)}
        .carousel-btn:active{transform:scale(.94)}
        .carousel-btn-light{background:rgba(13,27,13,.04);border:1px solid rgba(13,27,13,.12);color:rgba(13,27,13,.45);cursor:pointer;padding:12px 20px;font-size:18px;transition:all .3s;line-height:1;font-family:'DM Sans',sans-serif}
        .carousel-btn-light:hover{border-color:#C9A84C;color:#C9A84C;background:rgba(201,168,76,.06)}
        /* ── Thumb cards ── */
        .thumb-card{text-decoration:none;display:block;transition:transform .5s cubic-bezier(.16,1,.3,1)}
        .thumb-card:hover{transform:translateY(-6px)}
        .thumb-img{transition:transform .8s cubic-bezier(.16,1,.3,1)!important;object-fit:cover}
        .thumb-card:hover .thumb-img{transform:scale(1.06)!important}
        .play-overlay{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;background:rgba(0,0,0,0);transition:background .3s}
        .thumb-card:hover .play-overlay,.live-card:hover .play-overlay{background:rgba(0,0,0,.42)}
        .play-circle{width:52px;height:52px;border-radius:50%;background:rgba(201,168,76,.92);display:flex;align-items:center;justify-content:center;opacity:0;transform:scale(.8);transition:opacity .3s,transform .3s}
        .thumb-card:hover .play-circle,.live-card:hover .play-circle{opacity:1;transform:scale(1)}
        .live-card{text-decoration:none;display:block;transition:transform .4s cubic-bezier(.16,1,.3,1)}
        .live-card:hover{transform:translateY(-5px)}
        /* ── Pill link ── */
        .pill{display:inline-flex;align-items:center;gap:8px;padding:10px 22px;border:1px solid rgba(201,168,76,.25);font-family:'DM Sans',sans-serif;font-size:11px;letter-spacing:.1em;text-transform:uppercase;color:#3D4B3D;transition:all .3s;text-decoration:none}
        .pill:hover{border-color:#C9A84C;color:#C9A84C;background:rgba(201,168,76,.05)}
        /* ── Mobile hero ── */
        @media(max-width:700px){
          .music-hero{padding:80px 24px clamp(40px,8vw,56px)!important}
          .music-hero h1{font-size:clamp(48px,14vw,76px)!important;line-height:.9!important}
          .music-hero p{font-size:13px!important;max-width:100%!important}
        }
      `}</style>

      {/* ══ HERO — full-bleed, home-style ══ */}
      <section style={{ height:'100vh', minHeight:'640px', position:'relative', overflow:'hidden', background:'#070D07' }}>
        {/* Full-bleed photo — objectPosition pushes up to cut excess headroom */}
        <Image src="/images/gallery-solomon-standing-deep.jpg" alt="Solomon Stephen" fill priority
          style={{ objectFit:'cover', objectPosition:'50% 40%' }} />
        {/* Bottom-to-top fade — anchors text legibility */}
        <div style={{ position:'absolute', inset:0, background:'linear-gradient(to top, rgba(7,13,7,0.97) 0%, rgba(7,13,7,0.80) 28%, rgba(7,13,7,0.30) 58%, transparent 82%)', zIndex:1 }} />
        {/* Left-side fade — draws eye to text */}
        <div style={{ position:'absolute', inset:0, background:'linear-gradient(to right, rgba(7,13,7,0.88) 0%, rgba(7,13,7,0.52) 32%, rgba(7,13,7,0.10) 58%, transparent 75%)', zIndex:1 }} />
        {/* Top navbar fade */}
        <div style={{ position:'absolute', top:0, left:0, right:0, height:'220px', background:'linear-gradient(to bottom, rgba(7,13,7,0.65) 0%, transparent 100%)', zIndex:1 }} />
        {/* Content */}
        <div className="music-hero" style={{ position:'absolute', inset:0, zIndex:2, display:'flex', flexDirection:'column', justifyContent:'flex-end', padding:'clamp(120px,14vw,160px) clamp(32px,5vw,72px) clamp(48px,7vw,80px)' }}>
          <div style={{ animation:'heroIn .9s .2s both' }}>
            <div style={{ fontFamily:'DM Sans,sans-serif', fontSize:'9px', letterSpacing:'.45em', textTransform:'uppercase', color:'rgba(201,168,76,.45)', marginBottom:'clamp(16px,2.5vw,28px)' }}>
              Solomon Stephen · Music
            </div>
            <h1 style={{ fontFamily:'Cormorant Garamond,serif', fontSize:'clamp(56px,9vw,120px)', fontWeight:400, lineHeight:.88, color:'#fff', margin:'0 0 clamp(20px,2.5vw,36px)', letterSpacing:'-.03em' }}>
              Sound<br />from the<br /><em style={{ color:'#C9A84C' }}>Secret Place.</em>
            </h1>
            <p style={{ fontFamily:'DM Sans,sans-serif', fontSize:'clamp(13px,1.3vw,15px)', lineHeight:1.9, color:'rgba(255,255,255,.38)', maxWidth:'380px', margin:'0 0 clamp(28px,3.5vw,48px)' }}>
              Every song is an invitation. Not performance — presence. A doorway into the reality of God.
            </p>
            <div style={{ display:'flex', gap:'8px', flexWrap:'wrap' }}>
              {[['07','Original Releases'],['2021','–  2025'],['YouTube','Channel']].map(([a, b]) => (
                <div key={a} style={{ padding:'8px 16px', border:'1px solid rgba(255,255,255,.08)', background:'rgba(255,255,255,.03)' }}>
                  <div style={{ fontFamily:'Cormorant Garamond,serif', fontSize:'18px', color:'#C9A84C', lineHeight:1 }}>{a}</div>
                  <div style={{ fontFamily:'DM Sans,sans-serif', fontSize:'9px', letterSpacing:'.18em', textTransform:'uppercase', color:'rgba(255,255,255,.3)', marginTop:'3px' }}>{b}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══ MUSIC PLAYER APP ══ */}
      <section style={{ background:'#070D07', paddingTop:'clamp(56px,7vw,96px)' }}>

        {/* Section label above tabs */}
        <div style={{ padding:'0 clamp(20px,3vw,48px)', marginBottom:'clamp(28px,3.5vw,48px)' }}>
          <div style={{ fontFamily:'DM Sans,sans-serif', fontSize:'9px', letterSpacing:'.42em', textTransform:'uppercase', color:'rgba(201,168,76,.35)', display:'flex', alignItems:'center', gap:'14px' }}>
            <span style={{ display:'inline-block', width:'28px', height:'1px', background:'rgba(201,168,76,.35)' }} />
            Solomon Stephen · Music Player
          </div>
        </div>

        {/* Tab bar */}
        <div style={{ borderBottom:'1px solid rgba(201,168,76,.09)', padding:'0 clamp(20px,3vw,48px)', display:'flex', alignItems:'stretch', overflow:'hidden' }}>
          <button className={`tab-btn${activeTab === 'releases' ? ' active' : ''}`} onClick={() => switchTab('releases')}>Releases</button>
          <button className={`tab-btn${activeTab === 'live' ? ' active' : ''}`} onClick={() => switchTab('live')}>Live</button>
          {isPlaying && (
            <div style={{ marginLeft:'auto', display:'flex', alignItems:'center', gap:'10px', paddingRight:'clamp(16px,2vw,32px)', overflow:'hidden', minWidth:0 }}>
              <div className="waveform">
                {[60,90,100,75,85,55].map((h, i) => (
                  <div key={i} className="wbar" style={{ animationDelay:`${i * 0.12}s`, height:`${h}%` }} />
                ))}
              </div>
              <span style={{ fontFamily:'DM Sans', fontSize:'10px', letterSpacing:'.12em', color:'rgba(201,168,76,.65)', textTransform:'uppercase', whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis', maxWidth:'180px' }}>
                {displayTitle}
              </span>
            </div>
          )}
        </div>

        <div className="player-grid">

          {/* ── Left: Media + Controls ── */}
          <div className="player-left-col" style={{ padding:'clamp(24px,3.5vw,44px)', display:'flex', flexDirection:'column', gap:'20px', borderRight:'1px solid rgba(201,168,76,.07)' }}>

            {/* Now playing label + count */}
            <div className="player-header-pad" style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:'4px' }}>
              <div className="eyebrow" style={{ color:'rgba(201,168,76,.5)' }}>Now Playing</div>
              <div style={{ fontFamily:'DM Sans', fontSize:'10px', letterSpacing:'.2em', color:'rgba(201,168,76,.28)', textTransform:'uppercase' }}>
                {activeIdx + 1}&thinsp;/&thinsp;{Math.max(currentTracks.length, releaseTracks.length)}
              </div>
            </div>

            {/* ── Media area — 16:9 responsive ── */}
            <div className="yt-video-outer" style={{ position:'relative', width:'100%', paddingTop:'56.25%', background:'#000', overflow:'hidden', borderRadius:'2px', border:'1px solid rgba(201,168,76,.07)', flexShrink:0, marginTop:'8px' }}>
              {/* YouTube iframe (always mounted; hidden when noEmbed) */}
              <div
                ref={containerRef}
                className="yt-wrap"
                style={{ position:'absolute', inset:0, display: isNoEmbed ? 'none' : 'block' }}
              />

              {/* No-embed fallback: full-bleed designed frame */}
              {isNoEmbed && (
                <a
                  href={`https://www.youtube.com/watch?v=${currentTrack.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="no-embed-frame"
                >
                  {/* Background: deep gradient */}
                  <div className="no-embed-bg" />
                  {/* Decorative corner marks */}
                  <div className="no-embed-corner no-embed-corner-tl" />
                  <div className="no-embed-corner no-embed-corner-tr" />
                  <div className="no-embed-corner no-embed-corner-bl" />
                  <div className="no-embed-corner no-embed-corner-br" />
                  {/* Content */}
                  <div className="no-embed-content">
                    <div style={{ fontFamily:'DM Sans,sans-serif', fontSize:'8px', letterSpacing:'.4em', textTransform:'uppercase', color:'rgba(201,168,76,.5)', marginBottom:'clamp(12px,2vw,20px)' }}>
                      Solomon Stephen
                    </div>
                    <div style={{ fontFamily:'Cormorant Garamond,serif', fontSize:'clamp(22px,4vw,44px)', fontWeight:400, color:'#FAF7F2', lineHeight:1, letterSpacing:'-.02em', textAlign:'center', marginBottom:'clamp(6px,1vw,10px)' }}>
                      {displayTitle}
                    </div>
                    {currentTrack.scripture && (
                      <div style={{ fontFamily:'DM Sans,sans-serif', fontSize:'9px', letterSpacing:'.2em', textTransform:'uppercase', color:'rgba(201,168,76,.55)', marginBottom:'clamp(20px,3vw,36px)' }}>
                        {currentTrack.scripture}
                      </div>
                    )}
                    {/* Watch button */}
                    <div className="no-embed-watch-btn">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/></svg>
                      Watch on YouTube
                    </div>
                  </div>
                </a>
              )}
            </div>

            {/* ── Below-video controls (padded on mobile) ── */}
            <div className="player-body-pad">

            {/* Track info */}
            <div style={{ display:'flex', gap:'14px', alignItems:'flex-start' }}>
              <div style={{ width:'3px', alignSelf:'stretch', background:'rgba(201,168,76,.28)', borderRadius:'2px', flexShrink:0 }} />
              <div style={{ flex:1, minWidth:0 }}>
                <h2 style={{ fontFamily:'Cormorant Garamond,serif', fontSize:'clamp(20px,2.8vw,34px)', fontWeight:400, color:'#FAF7F2', margin:'0 0 6px', lineHeight:1.1, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>
                  {displayTitle}
                </h2>
                <div style={{ fontFamily:'DM Sans', fontSize:'11px', letterSpacing:'.14em', textTransform:'uppercase', color:'rgba(201,168,76,.6)' }}>
                  {currentTrack.scripture ? `${currentTrack.scripture} · ` : ''}{currentTrack.year}
                </div>
                {currentTrack.desc && (
                  <p style={{ fontFamily:'DM Sans', fontSize:'12px', lineHeight:1.7, color:'rgba(250,247,242,.28)', margin:'10px 0 0', maxWidth:'500px' }}>
                    {currentTrack.desc}
                  </p>
                )}
              </div>
            </div>

            {/* Progress */}
            <div style={{ opacity: isNoEmbed ? .25 : 1 }}>
              <div className="prog-bar" onClick={handleSeek}>
                <div className="prog-fill" style={{ width:`${progress * 100}%` }} />
              </div>
              <div style={{ display:'flex', justifyContent:'space-between', marginTop:'8px' }}>
                <span style={{ fontFamily:'DM Sans', fontSize:'11px', color:'rgba(250,247,242,.35)', fontVariantNumeric:'tabular-nums' }}>{fmtTime(curTime)}</span>
                <span style={{ fontFamily:'DM Sans', fontSize:'11px', color:'rgba(250,247,242,.2)', fontVariantNumeric:'tabular-nums' }}>{fmtTime(dur)}</span>
              </div>
            </div>

            {/* Controls */}
            <div style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:'8px' }}>
              <button className={`ctrl-btn${repeat ? ' on' : ''}`} onClick={() => setRepeat(!repeat)} title="Repeat" aria-label="Repeat" disabled={isNoEmbed}>
                <RepeatIcon />
              </button>
              <button className="ctrl-btn" onClick={seekRW} aria-label="–15s" disabled={isNoEmbed}
                style={{ fontFamily:'DM Sans', fontSize:'12px', letterSpacing:'.02em' }}>‹15</button>
              <button className="ctrl-btn" onClick={goPrev} aria-label="Previous track"><PrevIcon /></button>
              <button className="ctrl-btn big" onClick={togglePlay} aria-label={isPlaying ? 'Pause' : 'Play'} disabled={isNoEmbed}>
                {isPlaying ? <PauseIcon /> : <PlayIcon />}
              </button>
              <button className="ctrl-btn" onClick={goNext} aria-label="Next track"><NextIcon /></button>
              <button className="ctrl-btn" onClick={seekFF} aria-label="+15s" disabled={isNoEmbed}
                style={{ fontFamily:'DM Sans', fontSize:'12px', letterSpacing:'.02em' }}>15›</button>
            </div>

            {/* Streaming links */}
            <div style={{ display:'flex', gap:'10px', flexWrap:'wrap', paddingTop:'20px', borderTop:'1px solid rgba(201,168,76,.07)' }}>
              <a href="https://open.spotify.com/artist/7l1GQgXjGCQxlXRxIlHnJw" target="_blank" rel="noopener noreferrer" className="stream-pill">Spotify</a>
              <a href="https://music.apple.com/ng/artist/solomon-stephen/1440574453" target="_blank" rel="noopener noreferrer" className="stream-pill">Apple Music</a>
              <a href={CHANNEL} target="_blank" rel="noopener noreferrer" className="stream-pill">YouTube</a>
            </div>

            </div>{/* /player-body-pad */}
          </div>

          {/* ── Right: Queue ── */}
          <div className="queue-scroll" style={{ padding:'clamp(24px,3.5vw,44px) clamp(20px,2.5vw,36px)' }}>
            <div style={{ fontFamily:'DM Sans', fontSize:'10px', letterSpacing:'.28em', textTransform:'uppercase', color:'rgba(201,168,76,.32)', marginBottom:'18px' }}>
              {activeTab === 'releases' ? 'Tracklist' : 'Live Archive'}
            </div>

            {/* Loading state for live tab */}
            {activeTab === 'live' && !liveErr && liveVideos.length === 0 && (
              <div style={{ display:'flex', flexDirection:'column', gap:'10px' }}>
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} style={{ height:'46px', background:'rgba(255,255,255,.025)', borderRadius:'2px', animation:`pulse-glow 1.8s ease-in-out ${i * .15}s infinite` }} />
                ))}
              </div>
            )}

            {activeTab === 'live' && liveErr && (
              <p style={{ fontFamily:'DM Sans', fontSize:'12px', color:'rgba(250,247,242,.22)', padding:'10px 0' }}>Could not load live archive.</p>
            )}

            {/* Track rows */}
            {queueList.map((t, i) => (
              <div
                key={t.id}
                className="q-row"
                onClick={() => selectTrack(i)}
                style={{ background: i === activeIdx ? 'rgba(201,168,76,.06)' : 'transparent' }}
              >
                {/* Number / playing indicator */}
                <div style={{ display:'flex', justifyContent:'center', color: i === activeIdx ? '#C9A84C' : 'rgba(250,247,242,.22)', fontFamily:'DM Sans', fontSize:'10px', letterSpacing:'.16em' }}>
                  {i === activeIdx && isPlaying ? (
                    <div className="waveform" style={{ height:'16px' }}>
                      {[100, 60, 90].map((h, j) => (
                        <div key={j} className="wbar" style={{ animationDelay:`${j * .14}s`, height:`${h}%` }} />
                      ))}
                    </div>
                  ) : (
                    String(i + 1).padStart(2, '0')
                  )}
                </div>

                {/* Info */}
                <div style={{ minWidth:0 }}>
                  <div style={{ fontFamily:'Cormorant Garamond,serif', fontSize:'clamp(14px,1.7vw,18px)', fontWeight:400, color: i === activeIdx ? '#C9A84C' : '#FAF7F2', whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis', lineHeight:1.2 }}>
                    {t.id === 'TnEp0kiJBfI' && latestTitle ? latestTitle : t.title}
                  </div>
                  <div style={{ fontFamily:'DM Sans', fontSize:'10px', color:'rgba(250,247,242,.24)', marginTop:'3px', display:'flex', alignItems:'center', gap:'6px' }}>
                    <span>{t.scripture || (activeTab === 'live' ? 'Live' : 'New Release')}</span>
                    {t.noEmbed && (
                      <span style={{ fontSize:'8px', letterSpacing:'.1em', textTransform:'uppercase', color:'rgba(201,168,76,.38)', border:'1px solid rgba(201,168,76,.2)', padding:'1px 5px', borderRadius:'1px', flexShrink:0 }}>
                        YT only
                      </span>
                    )}
                  </div>
                </div>

                {/* Year */}
                <div style={{ fontFamily:'DM Sans', fontSize:'10px', color:'rgba(250,247,242,.18)', flexShrink:0 }}>
                  {String(t.year).slice(0, 4)}
                </div>
              </div>
            ))}

            {/* Quote footer for releases */}
            {activeTab === 'releases' && (
              <div style={{ marginTop:'36px', paddingTop:'28px', borderTop:'1px solid rgba(201,168,76,.07)' }}>
                <p style={{ fontFamily:'Cormorant Garamond,serif', fontSize:'clamp(15px,1.8vw,18px)', fontStyle:'italic', color:'rgba(250,247,242,.26)', lineHeight:1.8, margin:0 }}>
                  &ldquo;I don&rsquo;t write songs — I document encounters.&rdquo;
                </p>
                <div style={{ fontFamily:'DM Sans', fontSize:'10px', letterSpacing:'.18em', color:'rgba(201,168,76,.35)', marginTop:'10px' }}>— Solomon Stephen</div>
              </div>
            )}
          </div>

        </div>
      </section>

      {/* ══ VISUAL LIBRARY — carousel ══ */}
      <section style={{ padding:'clamp(96px,10vw,140px) clamp(24px,4vw,80px)', background:'#FAF7F2' }}>
        <div style={{ maxWidth:'1280px', margin:'0 auto' }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-end', flexWrap:'wrap', gap:'24px', marginBottom:'clamp(40px,5vw,64px)' }}>
            <div>
              <div className="eyebrow rv" style={{ marginBottom:'16px' }}>Visual Library</div>
              <h2 className="rv d1" style={{ fontFamily:'Cormorant Garamond,serif', fontSize:'clamp(36px,5.5vw,64px)', fontWeight:400, color:'#0D1B0D', lineHeight:1, margin:0 }}>On YouTube</h2>
            </div>
            <div className="rv d2" style={{ display:'flex', gap:'10px', alignItems:'center', flexWrap:'wrap' }}>
              <button className="carousel-btn-light" onClick={() => libCarRef.current?.scrollBy({ left: -(libCarRef.current.clientWidth * .85), behavior:'smooth' })} aria-label="Previous">←</button>
              <button className="carousel-btn-light" onClick={() => libCarRef.current?.scrollBy({ left: libCarRef.current.clientWidth * .85, behavior:'smooth' })} aria-label="Next">→</button>
              <a href={CHANNEL} target="_blank" rel="noopener noreferrer" className="pill">Subscribe →</a>
            </div>
          </div>

          <div ref={libCarRef} className="carousel-track">
            {releaseTracks.map((t, i) => {
              const trackTitle = t.id === 'TnEp0kiJBfI' && latestTitle ? latestTitle : t.title
              return (
                <a
                  key={t.id}
                  href={`https://www.youtube.com/watch?v=${t.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="thumb-card carousel-card rv-scale"
                  style={{ transitionDelay:`${i * 0.06}s` }}
                >
                  <div style={{ position:'relative', aspectRatio:'16/9', overflow:'hidden', borderRadius:'2px', marginBottom:'14px', background:'#1A2E1A' }}>
                    {t.noEmbed ? (
                      <div style={{ position:'absolute', inset:0, background:'linear-gradient(135deg,#0D1B0D 0%,#1f3a1f 100%)', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:'10px', padding:'20px', textAlign:'center' }}>
                        <div style={{ fontFamily:'Cormorant Garamond,serif', fontSize:'clamp(14px,2vw,18px)', color:'#C9A84C', lineHeight:1.2 }}>{trackTitle}</div>
                        <div style={{ fontFamily:'DM Sans,sans-serif', fontSize:'9px', letterSpacing:'.2em', textTransform:'uppercase', color:'rgba(255,255,255,.3)' }}>{t.scripture}</div>
                        <div style={{ display:'flex', alignItems:'center', gap:'6px', color:'rgba(255,255,255,.35)', fontFamily:'DM Sans,sans-serif', fontSize:'9px', letterSpacing:'.14em', textTransform:'uppercase', marginTop:'4px' }}>
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="5,3 19,12 5,21"/></svg>
                          YouTube
                        </div>
                      </div>
                    ) : (
                      <Image
                        src={`https://img.youtube.com/vi/${t.id}/hqdefault.jpg`}
                        alt={trackTitle}
                        fill
                        className="thumb-img"
                        unoptimized
                      />
                    )}
                    <div className="play-overlay">
                      <div className="play-circle">
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><polygon points="6,3 15,9 6,15" fill="#1A2E1A"/></svg>
                      </div>
                    </div>
                  </div>
                  <div style={{ fontFamily:'Cormorant Garamond,serif', fontSize:'20px', fontWeight:400, color:'#0D1B0D', marginBottom:'4px', lineHeight:1.2 }}>{trackTitle}</div>
                  <div style={{ fontFamily:'DM Sans', fontSize:'11px', color:'#8A9A8A' }}>{t.scripture ? `${t.scripture} · ` : ''}{t.year}</div>
                </a>
              )
            })}
          </div>
        </div>
      </section>

      {/* ══ LIVE ARCHIVE CTA ══ */}
      <section style={{ background:'#111D11', padding:'clamp(64px,8vw,100px) clamp(24px,4vw,80px)', borderTop:'1px solid rgba(201,168,76,.1)' }}>
        <div style={{ maxWidth:'1280px', margin:'0 auto', display:'flex', flexDirection:'column', alignItems:'center', textAlign:'center', gap:'clamp(20px,3vw,28px)' }}>
          <div style={{ fontFamily:'DM Sans', fontSize:'10px', letterSpacing:'.35em', textTransform:'uppercase', color:'rgba(201,168,76,.6)' }}>Archive</div>
          <p style={{ fontFamily:'Cormorant Garamond,serif', fontSize:'clamp(26px,4vw,42px)', fontWeight:400, color:'#FAF7F2', margin:0, lineHeight:1.15 }}>
            Every service. Every moment. On YouTube.
          </p>
          <a
            href={CHANNEL}
            target="_blank"
            rel="noopener noreferrer"
            style={{ fontFamily:'DM Sans', fontSize:'11px', letterSpacing:'.2em', textTransform:'uppercase', padding:'16px 48px', border:'1px solid rgba(201,168,76,.35)', color:'#C9A84C', textDecoration:'none', transition:'all .35s', display:'inline-flex', alignItems:'center', gap:'12px', marginTop:'8px' }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background='rgba(201,168,76,.08)'; (e.currentTarget as HTMLElement).style.borderColor='#C9A84C' }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background='transparent'; (e.currentTarget as HTMLElement).style.borderColor='rgba(201,168,76,.35)' }}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M23.5 6.2a3 3 0 00-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 00.5 6.2 31.2 31.2 0 000 12a31.2 31.2 0 00.5 5.8 3 3 0 002.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 002.1-2.1A31.2 31.2 0 0024 12a31.2 31.2 0 00-.5-5.8zM9.7 15.5V8.5l6.3 3.5-6.3 3.5z"/></svg>
            Explore the full archive on YouTube
          </a>
        </div>
      </section>

      <Footer />
    </main>
  )
}
