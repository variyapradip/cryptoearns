import Link from 'next/link';

export default function Footer() {
  return (
    <footer style={{
      borderTop: '1px solid #1e2340',
      background: '#0a0c18',
      padding: '48px 32px 32px',
    }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 40, marginBottom: 48 }}>
          {/* Brand */}
          <div>
            <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: 18, marginBottom: 12,
              background: 'linear-gradient(90deg,#9d5cff,#3b82f6)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>
              CryptoEarns
            </div>
            <p style={{ fontSize: 13, color: '#8892b0', lineHeight: 1.7 }}>
              The easiest way to earn, buy, and grow your crypto portfolio.
            </p>
          </div>

          {[
            { title: 'Platform', links: ['Earn', 'Buy Crypto', 'Markets', 'Referrals'] },
            { title: 'Company', links: ['About', 'Blog', 'Careers', 'Press'] },
            { title: 'Legal', links: ['Terms of Use', 'Privacy Policy', 'Help Center'] },
          ].map(col => (
            <div key={col.title}>
              <p style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#4a5380', marginBottom: 16 }}>{col.title}</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {col.links.map(l => (
                  <Link key={l} href="#" style={{ fontSize: 14, color: '#8892b0', transition: 'color .2s' }}
                    onMouseEnter={e => e.target.style.color='#f0f2ff'}
                    onMouseLeave={e => e.target.style.color='#8892b0'}>
                    {l}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div style={{ borderTop: '1px solid #1e2340', paddingTop: 24, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
          <p style={{ fontSize: 13, color: '#4a5380' }}>© 2025 CryptoEarns. All rights reserved.</p>
          <div style={{ display: 'flex', gap: 16 }}>
            {['𝕏', '💬', '📱', 'in'].map((icon, i) => (
              <Link key={i} href="#" style={{
                width: 34, height: 34, borderRadius: 8, border: '1px solid #252a45',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 13, color: '#8892b0',
              }}>{icon}</Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
