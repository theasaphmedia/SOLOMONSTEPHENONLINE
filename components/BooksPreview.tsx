import Link from "next/link"

const books = [
  {
    title: "The Cost of Ignorance",
    desc: "A prophetic call to pursue knowledge of God with intentionality and urgency.",
    link: "https://selar.com/v8561k6070",
    tag: "Theology",
  },
  {
    title: "Sons, Not Slaves",
    subtitle: "March Volume",
    desc: "A 31-day devotional journey into the identity of the believer as a son of God.",
    link: "https://selar.com/41x076wbk1",
    tag: "Devotional",
  },
  {
    title: "Sons, Not Slaves",
    subtitle: "April Volume",
    desc: "Continuing the journey — deeper into sonship, freedom, and covenant relationship.",
    link: "https://selar.com/5ep1bv5156",
    tag: "Devotional",
  },
]

export default function BooksPreview() {
  return (
    <section
      className="relative section-padding overflow-hidden"
      style={{ background: "linear-gradient(180deg, #0d1a0d 0%, #060e06 100%)" }}
    >
      {/* Orb */}
      <div
        className="absolute w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(201,168,76,0.05) 0%, transparent 70%)",
          bottom: "0%",
          left: "20%",
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
                Published Works
              </span>
            </div>
            <h2 className="font-display text-4xl lg:text-5xl text-white font-light">
              Words That{" "}
              <span className="text-gradient-gold font-semibold">Transform</span>
            </h2>
          </div>
          <Link href="/books" className="btn-outline-gold text-xs self-start sm:self-auto">
            All Books →
          </Link>
        </div>

        {/* Books grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {books.map((book) => (
            <div
              key={book.title + (book.subtitle || "")}
              className="glass rounded-2xl overflow-hidden group hover:shadow-[0_0_40px_rgba(201,168,76,0.1)] transition-all duration-500 flex flex-col"
            >
              {/* Book cover placeholder */}
              <div
                className="relative h-52 flex items-center justify-center overflow-hidden"
                style={{
                  background: "linear-gradient(135deg, #1A2E1A, #2a4a2a)",
                }}
              >
                <div className="absolute inset-0 opacity-20"
                  style={{
                    backgroundImage: "radial-gradient(circle at 30% 30%, rgba(201,168,76,0.3), transparent 60%)",
                  }}
                />
                <div className="relative text-center px-6">
                  <p className="font-display text-xl text-white font-semibold leading-tight mb-1">
                    {book.title}
                  </p>
                  {book.subtitle && (
                    <p className="text-[#C9A84C] text-sm">{book.subtitle}</p>
                  )}
                </div>
              </div>

              {/* Top line */}
              <div className="h-[1px] bg-gradient-to-r from-transparent via-[#C9A84C]/30 to-transparent" />

              <div className="p-6 flex flex-col flex-1">
                {/* Tag */}
                <span className="text-[#C9A84C] text-xs tracking-[0.2em] uppercase font-medium mb-3">
                  {book.tag}
                </span>

                <h3 className="font-display text-xl text-white font-light mb-1">
                  {book.title}
                </h3>
                {book.subtitle && (
                  <p className="text-[#C9A84C]/70 text-sm mb-3">{book.subtitle}</p>
                )}

                <div className="gold-line w-10 mb-4" />

                <p className="text-white/50 text-sm leading-relaxed flex-1 mb-6">
                  {book.desc}
                </p>

                <Link
                  href={book.link}
                  target="_blank"
                  className="btn-gold text-xs justify-center"
                >
                  Get This Book →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}