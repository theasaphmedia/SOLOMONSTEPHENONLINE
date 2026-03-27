import { Mail, Instagram, Youtube, Twitter } from "lucide-react";

const FooterCTA = () => {
  return (
    <footer>
      {/* CTA Strip */}
      <div
        className="py-24 relative overflow-hidden"
        style={{ background: "hsl(var(--primary))" }}
      >
        {/* Gold accent line at top */}
        <div
          className="absolute top-0 left-0 right-0 h-px"
          style={{ background: "linear-gradient(to right, transparent, hsl(var(--gold) / 0.5), transparent)" }}
          aria-hidden="true"
        />

        <div className="container mx-auto px-6 max-w-3xl text-center">
          <p
            className="font-sans text-xs tracking-[0.3em] uppercase mb-6"
            style={{ color: "hsl(var(--gold) / 0.7)" }}
          >
            Stay Connected
          </p>
          <h2
            className="font-serif font-light mb-6"
            style={{
              fontSize: "clamp(2rem, 6vw, 3.5rem)",
              color: "hsl(var(--hero-fg))",
              lineHeight: 1.15,
            }}
          >
            Walk With Us In{" "}
            <em
              className="not-italic"
              style={{ color: "hsl(var(--gold))" }}
            >
              Worship
            </em>
          </h2>
          <p
            className="font-sans text-sm leading-relaxed mb-10 max-w-lg mx-auto"
            style={{ color: "hsl(var(--hero-fg) / 0.55)" }}
          >
            Join thousands receiving new music, teachings, and updates from Solomon Stephen and The Worship Nation.
          </p>

          {/* Email signup */}
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto mb-14"
          >
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 px-5 py-3 font-sans text-sm outline-none"
              style={{
                background: "hsl(var(--hero-fg) / 0.07)",
                border: "1px solid hsl(var(--hero-fg) / 0.15)",
                color: "hsl(var(--hero-fg))",
                caretColor: "hsl(var(--gold))",
              }}
              aria-label="Email address"
            />
            <button
              type="submit"
              className="font-sans text-xs font-medium tracking-wider uppercase px-7 py-3 transition-opacity hover:opacity-80"
              style={{
                background: "hsl(var(--gold))",
                color: "hsl(var(--hero-bg))",
                border: "none",
                cursor: "pointer",
                letterSpacing: "0.12em",
              }}
            >
              Subscribe
            </button>
          </form>

          {/* Social links */}
          <div className="flex items-center justify-center gap-6">
            {[
              { icon: Instagram, label: "Instagram", href: "#" },
              { icon: Youtube, label: "YouTube", href: "#" },
              { icon: Twitter, label: "Twitter / X", href: "#" },
              { icon: Mail, label: "Email", href: "mailto:info@solomonstephen.com" },
            ].map(({ icon: Icon, label, href }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="transition-all"
                style={{ color: "hsl(var(--hero-fg) / 0.45)" }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.color = "hsl(var(--gold))";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.color = "hsl(var(--hero-fg) / 0.45)";
                }}
              >
                <Icon size={20} strokeWidth={1.5} />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div
        className="py-5"
        style={{ background: "hsl(var(--hero-bg))" }}
      >
        <div className="container mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p
            className="font-sans text-xs"
            style={{ color: "hsl(var(--hero-fg) / 0.3)" }}
          >
            © {new Date().getFullYear()} Solomon Stephen. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a
              href="https://theworshipnation.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-sans text-xs transition-colors"
              style={{ color: "hsl(var(--hero-fg) / 0.3)", textDecoration: "none" }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "hsl(var(--gold))")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "hsl(var(--hero-fg) / 0.3)")}
            >
              The Worship Nation
            </a>
            <span style={{ color: "hsl(var(--hero-fg) / 0.15)" }}>·</span>
            <a
              href="https://theworshipnation.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-sans text-xs transition-colors"
              style={{ color: "hsl(var(--hero-fg) / 0.3)", textDecoration: "none" }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "hsl(var(--gold))")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "hsl(var(--hero-fg) / 0.3)")}
            >
              TWN Studios
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterCTA;
