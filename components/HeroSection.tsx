"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"

export default function HeroSection() {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    setLoaded(true)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-[#060e06]">

      {/* Floating orbs */}
      <div
        className="absolute w-[500px] h-[500px] rounded-full animate-float-orb pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(201,168,76,0.1) 0%, transparent 70%)",
          top: "-5%",
          right: "-5%",
          filter: "blur(80px)",
        }}
      />
      <div
        className="absolute w-[400px] h-[400px] rounded-full animate-float-orb-reverse pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(26,46,26,0.4) 0%, transparent 70%)",
          bottom: "-10%",
          left: "-5%",
          filter: "blur(80px)",
        }}
      />

      {/* Gold top line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C9A84C]/40 to-transparent" />

      <div className="container-custom w-full relative z-10">
        <div className="grid lg:grid-cols-2 gap-20 items-center min-h-screen py-36">

          {/* Left — Text */}
          <div
            className={`transition-all duration-1000 ${
              loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            {/* Tag */}
            <div className="flex items-center gap-3 mb-10">
              <div className="h-px w-10 bg-[#C9A84C]" />
              <span className="text-[#C9A84C] text-xs tracking-[0.25em] uppercase font-medium">
                Gospel Minister · Worship Leader · Studio Founder
              </span>
            </div>

            {/* Headline */}
            <h1 className="font-display leading-[1.05] mb-8 space-y-1">
              <span className="block text-white font-light text-5xl lg:text-6xl">Where</span>
              <span className="block text-gradient-gold-white font-semibold italic text-5xl lg:text-6xl">Worship</span>
              <span className="block text-white font-light text-5xl lg:text-6xl">Meets</span>
              <span className="block text-gradient-gold font-semibold text-5xl lg:text-6xl">Excellence.</span>
            </h1>

            {/* Divider */}
            <div className="gold-line w-24 mb-8" />

            {/* Bio snippet */}
            <p className="text-white/55 text-base leading-relaxed max-w-md mb-10">
              Gospel minister, worship leader, music producer, author,
              and founder of TWN Studios — Lagos, Nigeria.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4 mb-16">
              <Link href="/music" className="btn-gold">
                ▶ Listen Now
              </Link>
              <Link href="/about" className="btn-outline-gold">
                Discover More →
              </Link>
            </div>

            {/* Stats */}
            <div className="flex gap-10 pt-8 border-t border-[#C9A84C]/15">
              {[
                { number: "10+", label: "Years Ministry" },
                { number: "2", label: "Books" },
                { number: "3", label: "Gatherings" },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="font-display text-2xl text-gradient-gold font-semibold">
                    {stat.number}
                  </p>
                  <p className="text-white/35 text-xs tracking-wider uppercase mt-1">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right — Photo */}
          <div
            className={`relative flex justify-center lg:justify-end transition-all duration-1000 delay-300 ${
              loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            {/* Glow */}
            <div
              className="absolute inset-0 rounded-2xl pointer-events-none"
              style={{
                background: "radial-gradient(ellipse at center, rgba(201,168,76,0.12) 0%, transparent 70%)",
                filter: "blur(40px)",
              }}
            />

            {/* Photo frame */}
            <div className="relative group">
              {/* Gold border */}
              <div
                className="absolute -inset-[1px] rounded-2xl transition-all duration-500 group-hover:opacity-100 opacity-60"
                style={{
                  background: "linear-gradient(135deg, rgba(201,168,76,0.5), transparent, rgba(201,168,76,0.3))",
                }}
              />

              {/* Photo */}
              <div className="relative overflow-hidden rounded-2xl w-[300px] lg:w-[340px]">
                <Image
                  src="/images/solomon-photo.png"
                  alt="Solomon Stephen"
                  width={340}
                  height={440}
                  className="w-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  priority
                  style={{ aspectRatio: "3/4" }}
                />
                {/* Bottom gradient */}
                <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#060e06] to-transparent" />
              </div>

              {/* Floating badge */}
              <div className="absolute -bottom-5 -left-5 glass rounded-xl px-4 py-3 transition-all duration-300 group-hover:shadow-[0_0_30px_rgba(201,168,76,0.2)]">
                <p className="text-[#C9A84C] text-xs tracking-widest uppercase font-medium">TWN Studios</p>
                <p className="text-white text-sm font-medium">Ajah, Lagos</p>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#060e06] to-transparent pointer-events-none" />
    </section>
  )
}