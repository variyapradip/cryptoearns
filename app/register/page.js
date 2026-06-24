'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function RegisterPage() {
  const [form, setForm] = useState({ name: '', email: '', password: '', ref: '' });
  const [loading, setLoading] = useState(false);

  const handle = async (e) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(r => setTimeout(r, 1200));
    setLoading(false);
    alert('Connect Firebase Auth here!');
  };

  return (
    <div style={{ minHeight: '100vh', background: '#0d0f1a', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24, position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: -100, right: -100, width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle,#7c3aed18,transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: -100, left: -100, width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle,#3b82f618,transparent 70%)', pointerEvents: 'none' }} />

      <div style={{ width: '100%', maxWidth: 460, position: 'relative', zIndex: 1 }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: 10, fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: 22, textDecoration: 'none' }}>
            <span style={{ width: 38, height: 38, borderRadius: 10, background: 'linear-gradient(135deg,#7c3aed,#3b82f6)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>₿</span>
            <span style={{ background: 'linear-gradient(90deg,#9d5cff,#3b82f6)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>CryptoEarns</span>
          </Link>
        </div>

        <div style={{ background: '#141728', border: '1px solid #252a45', borderRadius: 20, padding: '40px 36px' }}>
          <h1 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 24, fontWeight: 700, marginBottom: 6, color: '#f0f2ff' }}>Create account</h1>
          <p style={{ fontSize: 14, color: '#8892b0', marginBottom: 32 }}>Start earning crypto for free today</p>

          <form onSubmit={handle} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {[
              { label: 'Full Name', key: 'name',     type: 'text',     placeholder: 'John Doe' },
              { label: 'Email',     key: 'email',    type: 'email',    placeholder: 'you@example.com' },
              { label: 'Password',  key: 'password', type: 'password', placeholder: 'Min 8 characters' },
              { label: 'Referral Code (optional)', key: 'ref', type: 'text', placeholder: 'EARN5000' },
            ].map(f => (
              <div key={f.key}>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#8892b0', marginBottom: 8 }}>{f.label}</label>
                <input
                  type={f.type}
                  placeholder={f.placeholder}
                  value={form[f.key]}
                  onChange={e => setForm(p => ({ ...p, [f.key]: e.target.value }))}
                  required={f.key !== 'ref'}
                  style={{
                    width: '100%', padding: '12px 16px',
                    background: '#0d0f1a', border: '1px solid #252a45',
                    borderRadius: 10, color: '#f0f2ff', fontSize: 14, outline: 'none',
                  }}
                  onFocus={e => e.target.style.borderColor = '#7c3aed'}
                  onBlur={e => e.target.style.borderColor = '#252a45'}
                />
              </div>
            ))}

            {/* Perks list */}
            <div style={{ background: '#0d0f1a', border: '1px solid #1e2340', borderRadius: 10, padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: 8 }}>
              {['Free to join — no card needed', 'Instant crypto payouts', 'Bonus 0.5 USDT on signup'].map(perk => (
                <div key={perk} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: '#8892b0' }}>
                  <span style={{ color: '#22c55e', fontWeight: 700 }}>✓</span> {perk}
                </div>
              ))}
            </div>

            <button type="submit" disabled={loading} style={{
              padding: '14px', borderRadius: 10, fontWeight: 700, fontSize: 15,
              background: 'linear-gradient(135deg,#7c3aed,#3b82f6)', color: '#fff',
              opacity: loading ? 0.7 : 1, cursor: loading ? 'wait' : 'pointer',
              marginTop: 4,
            }}>
              {loading ? 'Creating account…' : 'Create Free Account'}
            </button>

            <p style={{ fontSize: 11, color: '#4a5380', textAlign: 'center', lineHeight: 1.6 }}>
              By signing up you agree to our{' '}
              <Link href="#" style={{ color: '#9d5cff' }}>Terms of Use</Link> and{' '}
              <Link href="#" style={{ color: '#9d5cff' }}>Privacy Policy</Link>.
            </p>
          </form>

          <p style={{ textAlign: 'center', fontSize: 13, color: '#8892b0', marginTop: 24 }}>
            Already have an account?{' '}
            <Link href="/login" style={{ color: '#9d5cff', fontWeight: 600 }}>Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
