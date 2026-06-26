'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        background: 'rgba(13,15,26,0.85)',
        backdropFilter: 'blur(14px)',
        borderBottom: '1px solid #1e2340',
        height: 64,
        display: 'flex', alignItems: 'center',
        padding: '0 32px',
        justifyContent: 'space-between',
      }}>
        {/* Logo */}
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 20 }}>
          <span style={{
            width: 34, height: 34, borderRadius: 10,
            background: 'linear-gradient(135deg, #7c3aed, #3b82f6)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 16, fontWeight: 800,
          }}>₿</span>
          <span style={{ background: 'linear-gradient(90deg, #9d5cff, #3b82f6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            CryptoEarns
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="nav-links" style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
          {['Earn', 'Markets', 'Referrals', 'Help'].map(item => (
            <Link key={item} href="#" style={{ fontSize: 14, fontWeight: 500, color: '#8892b0', transition: 'color .2s' }}
              onMouseEnter={e => e.target.style.color = '#f0f2ff'}
              onMouseLeave={e => e.target.style.color = '#8892b0'}>
              {item}
            </Link>
          ))}
        </div>

        {/* Right Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <Link className="mb_menu" href="/login" style={{
            fontSize: 14, fontWeight: 600, color: '#9d5cff',
            padding: '8px 18px', borderRadius: 8,
            border: '1px solid #3a2a6e',
          }}>Log in</Link>
          <Link className="mb_menu" href="/register" style={{
            fontSize: 14, fontWeight: 600,
            padding: '8px 20px', borderRadius: 8,
            background: 'linear-gradient(135deg, #7c3aed, #3b82f6)',
            color: '#fff',
          }}>Get Started</Link>

          {/* Burger */}
          <button
            onClick={() => setOpen(!open)}
            style={{ display: 'none', flexDirection: 'column', gap: 5, padding: 6 }}
            className="burger"
            aria-label="Menu"
          >
            {[0,1,2].map(i => (
              <span key={i} style={{ display: 'block', width: 22, height: 2, background: '#8892b0', borderRadius: 2 }} />
            ))}
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      {open && (
        <div style={{
          position: 'fixed', top: 64, left: 0, right: 0, bottom: 0,
          background: '#0d0f1a', zIndex: 99,
          display: 'flex', flexDirection: 'column',
          padding: 32, gap: 24,
        }}>
          {['Earn', 'Markets', 'Referrals', 'Help'].map(item => (
            <Link key={item} href="#" style={{ fontSize: 18, fontWeight: 600, color: '#f0f2ff' }} onClick={() => setOpen(false)}>{item}</Link>
          ))}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 16 }}>
            <Link href="/login" style={{ textAlign: 'center', padding: '12px', border: '1px solid #3a2a6e', borderRadius: 10, fontWeight: 600, color: '#9d5cff' }} onClick={() => setOpen(false)}>Log in</Link>
            <Link href="/register" style={{ textAlign: 'center', padding: '12px', background: 'linear-gradient(135deg,#7c3aed,#3b82f6)', borderRadius: 10, fontWeight: 600, color: '#fff' }} onClick={() => setOpen(false)}>Get Started</Link>
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .nav-links { display: none !important; }
          .burger { display: flex !important; }
        }
      `}</style>
    </>
  );
}
