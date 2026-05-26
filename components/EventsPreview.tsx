import Link from "next/link"

const events = [
  {
    tag: "Every Wednesday · Noon",
    name: "Mid Day Worship Experience",
    short: "MDWE",
    desc: "A corporate worship and prophetic devotion encounter designed to shift the atmosphere of your week.",
    color: "#C9A84C",
  },
  {
    tag: "Last Saturday Before Final Sunday",
    name: "The Slaughter House",
    short: "TSH",
    desc: "A high-energy night of worship and declaration in the throne room. Intense. Transformative. Unforgettable.",
    color: "#a8873a",
  },
  {
    tag: "Last Sunday of Every Month",
    name: "Synantesis",
    short: "TSH",
    desc: "Encountering Jesus in an atmosphere of Word, prayer, and prophetic ministry. A sacred gathering of presence.",
    color: "#C9A84C",
  },
]

export default function EventsPreview() {
  return (
    <section className="relative section-padding overflow-hidden"
      style={{ background: "linear-gradient(180deg, #060e06 0%, #0d1a0d 100%)" }}
    >
      {/* Gold orb */}
      <div
        className="absolute w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(201,168,76,0.06) 0%, transparent 70%)",
          top: "0%",
          right: "10%",
          filter: "blur(60px)",
        }}
      />

      <div className="container-custom relative z-10">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-16">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-10 bg-[#C9A84C]" />
              <span className="text-[#C9A84C] text-xs tracking-[0.25em] uppercase font-medium">
                TWN Gatherings
              </span>
            </div>
            <h2 className="font-display text-4xl lg:text-5xl text-white font-light">
              Join The{" "}
              <span className="text-gradient-gold font-semibold">Movement</span>
            </h2>
          </div>
          <Link href="/events" className="btn-outline-gold text-xs self-start sm:self-auto">
            All Events →
          </Link>
        </div>

        {/* Events grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {events.map((event, index) => (
            <div
              key={event.name}
              className="glass rounded-2xl overflow-hidden group hover:shadow-[0_0_40px_rgba(201,168,76,0.1)] transition-all duration-500"
            >
              {/* Top gold accent line */}
              <div
                className="h-[2px]"
                style={{ background: `linear-gradient(90deg, transparent, ${event.color}, transparent)` }}
              />

              <div className="p-8">
                {/* Tag */}
                <span
                  className="text-xs tracking-[0.2em] uppercase font-medium"
                  style={{ color: event.color }}
                >
                  {event.tag}
                </span>

                {/* Name */}
                <h3 className="font-display text-2xl text-white font-light mt-4 mb-1 leading-tight">
                  {event.name}
                </h3>

                <div className="gold-line w-12 my-4" />

                {/* Description */}
                <p className="text-white/50 text-sm leading-relaxed mb-8">
                  {event.desc}
                </p>

                {/* Location */}
                <div className="flex items-center gap-2 pt-4 border-t border-[#C9A84C]/10">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#C9A84C]" />
                  <span className="text-white/40 text-xs tracking-wide">
                    TWN Studios, Ajah Lagos
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}