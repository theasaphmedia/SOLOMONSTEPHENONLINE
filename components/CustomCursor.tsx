"use client"
import { useEffect, useRef } from "react"
export default function CustomCursor() {
  const dotRef  = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return
    const dot  = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return
    let mx=-100,my=-100,rx=-100,ry=-100,raf:number
    const move = (e:MouseEvent) => { mx=e.clientX; my=e.clientY }
    const down = () => { dot.style.transform="translate(-50%,-50%) scale(2.2)"; ring.style.transform="translate(-50%,-50%) scale(0.6)" }
    const up   = () => { dot.style.transform="translate(-50%,-50%) scale(1)"; ring.style.transform="translate(-50%,-50%) scale(1)" }
    const enter = () => { ring.style.width="54px"; ring.style.height="54px"; ring.style.borderColor="rgba(201,168,76,0.8)" }
    const leave = () => { ring.style.width="36px"; ring.style.height="36px"; ring.style.borderColor="rgba(201,168,76,0.5)" }
    const attach = () => document.querySelectorAll("a,button,[role='button']").forEach(el => { el.addEventListener("mouseenter",enter); el.addEventListener("mouseleave",leave) })
    const obs = new MutationObserver(attach)
    obs.observe(document.body,{childList:true,subtree:true})
    attach()
    const tick = () => {
      dot.style.left=mx+"px"; dot.style.top=my+"px"
      rx+=(mx-rx)*0.14; ry+=(my-ry)*0.14
      ring.style.left=rx+"px"; ring.style.top=ry+"px"
      raf=requestAnimationFrame(tick)
    }
    document.addEventListener("mousemove",move)
    document.addEventListener("mousedown",down)
    document.addEventListener("mouseup",up)
    dot.style.opacity="1"; ring.style.opacity="0.4"
    document.documentElement.style.cursor="none"
    raf=requestAnimationFrame(tick)
    return () => { cancelAnimationFrame(raf); document.removeEventListener("mousemove",move); document.removeEventListener("mousedown",down); document.removeEventListener("mouseup",up); obs.disconnect(); document.documentElement.style.cursor="" }
  },[])
  return (
    <>
      <div ref={dotRef} style={{position:"fixed",pointerEvents:"none",zIndex:99999,width:7,height:7,borderRadius:"50%",background:"#C9A84C",left:-100,top:-100,transform:"translate(-50%,-50%)",transition:"transform 0.15s cubic-bezier(0.16,1,0.3,1)",opacity:0,boxShadow:"0 0 12px rgba(201,168,76,0.7)"}} />
      <div ref={ringRef} style={{position:"fixed",pointerEvents:"none",zIndex:99998,width:36,height:36,borderRadius:"50%",border:"1px solid rgba(201,168,76,0.5)",left:-100,top:-100,transform:"translate(-50%,-50%)",transition:"width 0.4s cubic-bezier(0.16,1,0.3,1),height 0.4s cubic-bezier(0.16,1,0.3,1),border-color 0.3s,transform 0.25s cubic-bezier(0.16,1,0.3,1)",opacity:0}} />
    </>
  )
}
