import Link from 'next/link'
import Footer from '@/components/Footer'

export const metadata = {
  title: 'Privacy Policy — Solomon Stephen',
  description: 'How solomonstephen.com collects, uses, and protects your personal information.',
}

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div style={{ marginBottom: '48px' }}>
    <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(22px,2.5vw,30px)', fontWeight: 400, color: '#111240', margin: '0 0 16px', letterSpacing: '-0.01em' }}>{title}</h2>
    <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 'clamp(14px,1.4vw,16px)', lineHeight: 1.9, color: '#3D4B3D' }}>{children}</div>
  </div>
)

export default function PrivacyPage() {
  return (
    <>
      <main style={{ background: '#FAF7F2', minHeight: '100vh' }}>

        {/* Hero */}
        <section style={{ background: '#0D1B0D', paddingTop: 'clamp(120px,14vw,160px)', paddingBottom: 'clamp(48px,6vw,72px)', paddingLeft: 'clamp(24px,5vw,96px)', paddingRight: 'clamp(24px,5vw,96px)' }}>
          <div style={{ maxWidth: '720px' }}>
            <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '10px', letterSpacing: '0.35em', textTransform: 'uppercase', color: 'rgba(201,168,76,0.6)', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={{ width: '28px', height: '1px', background: '#C9A84C', display: 'inline-block' }} />
              Legal
            </div>
            <h1 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(40px,7vw,72px)', fontWeight: 400, color: '#FAF7F2', margin: '0 0 20px', lineHeight: 1.05, letterSpacing: '-0.02em' }}>
              Privacy Policy
            </h1>
            <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '13px', color: 'rgba(250,247,242,0.4)', margin: 0 }}>
              Last updated: June 2025
            </p>
          </div>
        </section>

        {/* Content */}
        <section style={{ maxWidth: '720px', margin: '0 auto', padding: 'clamp(56px,7vw,96px) clamp(24px,5vw,96px)' }}>

          <Section title="Who We Are">
            <p>This website is operated by Solomon Stephen Ministries. When we say "we", "us", or "our", we mean Solomon Stephen and The Worship Nation ministry team.</p>
            <p style={{ marginTop: '12px' }}>Website: <strong>solomonstephen.com</strong><br />Contact: <a href="/contact" style={{ color: '#C9A84C' }}>solomonstephen.com/contact</a></p>
          </Section>

          <Section title="What Information We Collect">
            <p>We collect information you voluntarily provide to us:</p>
            <ul style={{ paddingLeft: '20px', marginTop: '12px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <li><strong>Newsletter signup:</strong> Your name and email address when you subscribe to receive updates, devotionals, and ministry news.</li>
              <li><strong>Contact form:</strong> Your name, email, and message when you reach out to us.</li>
              <li><strong>Studio booking:</strong> Your name, email, and project details when you submit a studio booking enquiry.</li>
            </ul>
            <p style={{ marginTop: '12px' }}>We also collect anonymous usage data automatically via Google Analytics (see below).</p>
          </Section>

          <Section title="How We Use Your Information">
            <ul style={{ paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <li>To send you ministry updates, devotionals, and event announcements (newsletter subscribers only).</li>
              <li>To respond to your enquiries and messages.</li>
              <li>To process and follow up on studio booking requests.</li>
              <li>To understand how visitors use our website and improve our content (analytics).</li>
            </ul>
            <p style={{ marginTop: '12px' }}>We will never sell, rent, or share your personal information with third parties for marketing purposes.</p>
          </Section>

          <Section title="Google Analytics">
            <p>We use Google Analytics 4 (GA4) to understand how visitors interact with our site. This service collects anonymous data such as pages visited, time on site, and general location (country/city level). No personally identifiable information is sent to Google Analytics.</p>
            <p style={{ marginTop: '12px' }}>Google Analytics uses cookies to track sessions. You can opt out at any time using our cookie consent settings or by installing the <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" style={{ color: '#C9A84C' }}>Google Analytics Opt-out Browser Add-on</a>.</p>
          </Section>

          <Section title="Cookies">
            <p>We use the following cookies on this site:</p>
            <ul style={{ paddingLeft: '20px', marginTop: '12px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <li><strong>Analytics cookies (Google Analytics):</strong> Used to track anonymous usage statistics. Only set if you accept cookies.</li>
              <li><strong>Preference cookies:</strong> We store your cookie consent choice so we don't ask you again on every visit.</li>
            </ul>
            <p style={{ marginTop: '12px' }}>You can change your cookie preferences at any time by clearing your browser cookies or using our consent banner.</p>
          </Section>

          <Section title="Your Rights (NDPR & GDPR)">
            <p>Whether you are based in Nigeria (covered by the Nigeria Data Protection Regulation — NDPR) or the European Union (GDPR), you have the right to:</p>
            <ul style={{ paddingLeft: '20px', marginTop: '12px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <li>Access the personal data we hold about you.</li>
              <li>Request correction of inaccurate data.</li>
              <li>Request deletion of your data ("right to be forgotten").</li>
              <li>Withdraw consent to receive emails at any time by clicking "Unsubscribe" in any newsletter.</li>
            </ul>
            <p style={{ marginTop: '12px' }}>To exercise any of these rights, contact us via our <Link href="/contact" style={{ color: '#C9A84C' }}>contact page</Link>.</p>
          </Section>

          <Section title="Data Retention">
            <p>We retain your email address and name for as long as you remain subscribed to our newsletter. If you unsubscribe, your data is removed within 30 days. Contact form enquiries are retained for up to 12 months for follow-up purposes.</p>
          </Section>

          <Section title="Third-Party Services">
            <p>We use the following third-party services that may process your data:</p>
            <ul style={{ paddingLeft: '20px', marginTop: '12px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <li><strong>Google Analytics</strong> — website analytics</li>
              <li><strong>Vercel</strong> — website hosting</li>
              <li><strong>Neon (PostgreSQL)</strong> — secure database for newsletter and content storage</li>
              <li><strong>Vercel Blob</strong> — secure file storage for uploaded media</li>
            </ul>
            <p style={{ marginTop: '12px' }}>Each of these services has their own privacy policy and security standards.</p>
          </Section>

          <Section title="Changes to This Policy">
            <p>We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated date. We encourage you to review this page periodically.</p>
          </Section>

          <Section title="Contact Us">
            <p>If you have any questions about this Privacy Policy or how we handle your data, please get in touch via our <Link href="/contact" style={{ color: '#C9A84C' }}>contact page</Link>.</p>
          </Section>

        </section>

        <Footer />
      </main>
    </>
  )
}
