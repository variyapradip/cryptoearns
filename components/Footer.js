import Link from 'next/link';

export default function Footer() {
  const columns = [
    { title: 'Platform', links: ['Earn', 'Buy Crypto', 'Markets', 'Referrals'] },
    { title: 'Company',  links: ['About', 'Blog', 'Careers', 'Press'] },
    { title: 'Legal',    links: ['Terms of Use', 'Privacy Policy', 'Help Center'] },
  ];

  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-grid">
          {/* Brand */}
          <div>
            <div className="footer-brand-name">CryptoEarns</div>
            <p className="footer-brand-desc">
              The easiest way to earn, buy, and grow your crypto portfolio.
            </p>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <p className="footer-col-title">{col.title}</p>
              <div className="footer-col-links">
                {col.links.map((l) => (
                  <Link key={l} href="#" className="footer-link">{l}</Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="footer-bottom">
          <p className="footer-copy">© 2025 CryptoEarns. All rights reserved.</p>
          <div className="footer-socials">
            {['𝕏', '💬', '📱', 'in'].map((icon, i) => (
              <Link key={i} href="#" className="footer-social-icon">{icon}</Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}