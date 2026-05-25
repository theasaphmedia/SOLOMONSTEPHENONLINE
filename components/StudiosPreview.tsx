import Link from "next/link"

const services = [
  {
    icon: "🎙️",
    title: "Recording",
    desc: "Professional vocal and instrument recording in an acoustically treated environment.",
  },
  {
    icon: "🎛️",
    title: "Mixing & Mastering",
    desc: "World-class mix engineering that translates across all playback systems.",
  },
  {
    icon: "🎹",
    title: "Music Production",
    desc: "Full production from concept to final track — beats, arrangements, and more.",
  },
  {
    icon: "🎬",
    title: "Video Recording",
    desc: "Professional video production for music videos, content, and live sessions.",
  },
  {
    icon: "📡",
    title: "Live Streaming",
    desc: "High-quality live stream setup for events, services, and online broadcasts.",
  },
  {
    icon: "🏛️",
    title: "Event Hosting",
    desc: "A fully equipped venue for up to 60 people — retreats, launches, and recordings.",
  },
]

export default function StudiosPreview() {
  return (
    <section
      className="relative section-padding overflow-hidden"
      style={{ background: "linear-gradient(180deg, #060e06 0%, #0d1a0d 50%, #060e06 100%)" }}
    >
      {/* Orbs */}
      <div
        className="absolute w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(201,168,76,0.06) 0%, transparent 70%)",
          top: "20%",
          right: "-10%",
          filter: "blur(80px)",
        }}
      />

      <div className="container-custom relative z-10">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-16">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-10 bg-[#C9A84C]" />
              <span className="text-[#C9A84C] text-xs tracking-[0.25em] uppercase font-medium">
                TWN Studios · Ajah, Lagos
              </span>
            </div>
            <h2 className="font-display text-4xl lg:text-5xl text-white font-light">
              Where Sound Meets{" "}
              <span className="text-gradient-gold font-semibold">Spirit</span>
            </h2>
            <p className="text-white/50 text-base mt-4 max-w-lg">
              A full-service recording studio and event venue built for artists,
              ministries, podcasters, and creators who refuse to compromise on quality.
            </p>
          </div>
          <Link href="/studios" className="btn-gold text-xs self-start sm:self-auto">
            Book A Session →
          </Link>
        </div>

        {/* Services grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-16">
          {services.map((service) => (
            <div
              key={service.title}
              className="glass rounded-xl p-6 group hover:shadow-[0_0_30px_rgba(201,168,76,0.08)] transition-all duration-500 hover:border-[#C9A84C]/30"
            >
              <span className="text-2xl mb-4 block">{service.icon}</span>
              <h3 className="text-white font-semibold text-base mb-2">{service.title}</h3>
              <p className="text-white/45 text-sm leading-relaxed">{service.desc}</p>
            </div>
          ))}
        </div>

        {/* Address banner */}
        <div
          className="glass rounded-2xl p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6"
        >
          <div className="h-[2px] absolute top-0 left-0 right-0 bg-gradient-to-r from-transparent via-[#C9A84C]/40 to-transparent" />
          <div>
            <p className="text-[#C9A84C] text-xs tracking-[0.2em] uppercase font-medium mb-2">
              Find Us
            </p>
            <p className="text-white font-medium">
              Kenny T. Kay Building (Green Tall Building)
            </p>
            <p className="text-white/50 text-sm">
              Beside Azkol Fuel Station, Langbasa Road, Ajah, Lagos
            </p>
          </div>
          <div className="flex gap-3">
            <Link href="/studios" className="btn-outline-gold text-xs">
              Learn More
            </Link>
            <Link href="/contact" className="btn-gold text-xs">
              Book Now
            </Link>
          </div>
        </div>

      </div>
    </section>
  )
}