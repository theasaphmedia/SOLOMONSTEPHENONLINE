"use client"

import Link from "next/link"
import Image from "next/image"

export default function AboutPreview() {
  return (
    <section className="relative section-padding bg-[#060e06] overflow-hidden">

      {/* Background orb */}
      <div
        className="absolute w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(26,46,26,0.6) 0%, transparent 70%)",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          filter: "blur(80px)",
        }}
      />

      <div className="container-custom relative z-10">

        {/* Section label */}
        <div className="flex items-center gap-3 mb-16">
          <div className="h-px w-10 bg-[#C9A84C]" />
          <span className="text-[#C9A84C] text-xs tracking-[0.25em] uppercase font-medium">
            About Solomon
          </span>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Left — Photo with overlay */}
          <div className="relative group">
            <div
              className="absolute -inset-[1px] rounded-2xl opacity-40 group-hover:opacity-70 transition-all duration-500"
              style={{
                background: "linear-gradient(135deg, rgba(201,168,76,0.4), transparent, rgba(201,168,76,0.2))",
              }}
            />
            <div className="relative overflow-hidden rounded-2xl">
              <Image
                src="/images/solomon-photo.png"
                alt="Solomon Stephen"
                width={600}
                height={700}
                className="w-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                style={{ aspectRatio: "4/5" }}
              />
              {/* Dark overlay */}
              <div
                className="absolute inset-0"
                style={{
                  background: "linear-gradient(to top, rgba(6,14,6,0.8) 0%, rgba(6,14,6,0.2) 50%, transparent 100%)",
                }}
              />
              {/* Text on photo */}
              <div className="absolute bottom-8 left-8 right-8">
                <p className="font-display text-2xl text-white font-light italic">
                  "Worship is not a moment —
                </p>
                <p className="font-display text-2xl text-gradient-gold font-semibold italic">
                  it's a movement."
                </p>
              </div>
            </div>
          </div>

          {/* Right — Text */}
          <div className="space-y-8">
            <h2 className="font-display text-4xl lg:text-5xl text-white font-light leading-tight">
              Worship. Teaching.{" "}
              <span className="text-gradient-gold font-semibold">Studio Excellence.</span>
            </h2>

            <div className="gold-line w-16" />

            <p className="text-white/60 text-base leading-relaxed">
              Solomon Stephen is a gospel minister, worship leader, music producer,
              author, and studio founder based in Lagos, Nigeria. He leads
              The Worship Nation — a ministry movement built on the conviction
              that worship is not a moment, it's a movement.
            </p>

            <p className="text-white/60 text-base leading-relaxed">
              Through TWN Studios, he serves artists, podcasters, and ministries
              with world-class recording, mixing, mastering, and production —
              all rooted in a spiritual foundation.
            </p>

            {/* Three pillars */}
            <div className="grid grid-cols-3 gap-4 pt-4">
              {[
                { title: "Ministry", desc: "Prophetic worship & teaching" },
                { title: "Studio", desc: "World-class production" },
                { title: "Author", desc: "Books that transform" },
              ].map((item) => (
                <div key={item.title} className="glass-gold rounded-xl p-4">
                  <p className="text-[#C9A84C] font-semibold text-sm mb-1">{item.title}</p>
                  <p className="text-white/50 text-xs leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>

            <Link href="/about" className="btn-outline-gold inline-flex mt-4">
              Full Story →
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}