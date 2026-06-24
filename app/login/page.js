'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function LoginPage() {
  const [form, setForm] = useState({ email: '', password: '' });
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
      {/* Background glows */}
      <div style={{ position: 'absolute', top: -100, left: -100, width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle,#7c3aed18,transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: -100, right: -100, width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle,#3b82f618,transparent 70%)', pointerEvents: 'none' }} />

      <div style={{ width: '100%', maxWidth: 440, position: 'relative', zIndex: 1 }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: 10, fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: 22, textDecoration: 'none' }}>
            <span style={{ width: 38, height: 38, borderRadius: 10, background: 'linear-gradient(135deg,#7c3aed,#3b82f6)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>₿</span>
            <span style={{ background: 'linear-gradient(90deg,#9d5cff,#3b82f6)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>CryptoEarns</span>
          </Link>
        </div>

        <div style={{ background: '#141728', border: '1px solid #252a45', borderRadius: 20, padding: '40px 36px' }}>
          <h1 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 24, fontWeight: 700, marginBottom: 6, color: '#f0f2ff' }}>Welcome back</h1>
          <p style={{ fontSize: 14, color: '#8892b0', marginBottom: 32 }}>Sign in to your account</p>

          <form onSubmit={handle} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            {[
              { label: 'Email', key: 'email', type: 'email', placeholder: 'you@example.com' },
              { label: 'Password', key: 'password', type: 'password', placeholder: '••••••••' },
            ].map(f => (
              <div key={f.key}>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#8892b0', marginBottom: 8 }}>{f.label}</label>
                <input
                  type={f.type}
                  placeholder={f.placeholder}
                  value={form[f.key]}
                  onChange={e => setForm(p => ({ ...p, [f.key]: e.target.value }))}
                  required
                  style={{
                    width: '100%', padding: '12px 16px',
                    background: '#0d0f1a', border: '1px solid #252a45',
                    borderRadius: 10, color: '#f0f2ff', fontSize: 14,
                    outline: 'none', transition: 'border-color .2s',
                  }}
                  onFocus={e => e.target.style.borderColor = '#7c3aed'}
                  onBlur={e => e.target.style.borderColor = '#252a45'}
                />
              </div>
            ))}

            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Link href="#" style={{ fontSize: 13, color: '#9d5cff' }}>Forgot password?</Link>
            </div>

            <button type="submit" disabled={loading} style={{
              padding: '14px', borderRadius: 10, fontWeight: 700, fontSize: 15,
              background: 'linear-gradient(135deg,#7c3aed,#3b82f6)', color: '#fff',
              opacity: loading ? 0.7 : 1, cursor: loading ? 'wait' : 'pointer',
              transition: 'opacity .2s',
            }}>
              {loading ? 'Signing in…' : 'Sign In'}
            </button>
          </form>

          <div style={{ marginTop: 24, position: 'relative', textAlign: 'center' }}>
            <div style={{ position: 'absolute', top: '50%', left: 0, right: 0, height: 1, background: '#252a45' }} />
            <span style={{ position: 'relative', background: '#141728', padding: '0 12px', fontSize: 12, color: '#4a5380' }}>or continue with</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginTop: 20 }}>
            {['Google', 'Discord'].map(p => (
              <button key={p} style={{ padding: '11px', border: '1px solid #252a45', borderRadius: 10, color: '#8892b0', fontSize: 13, fontWeight: 600, background: 'transparent', transition: 'border-color .2s, color .2s' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = '#3a3a60'; e.currentTarget.style.color = '#f0f2ff'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = '#252a45'; e.currentTarget.style.color = '#8892b0'; }}>
                {p}
              </button>
            ))}
          </div>

          <p style={{ textAlign: 'center', fontSize: 13, color: '#8892b0', marginTop: 28 }}>
            Don't have an account?{' '}
            <Link href="/register" style={{ color: '#9d5cff', fontWeight: 600 }}>Sign up free</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
