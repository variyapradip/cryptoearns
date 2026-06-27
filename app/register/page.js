'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  updateProfile,
} from 'firebase/auth';
import { auth } from '@/lib/firebase';

const googleProvider = new GoogleAuthProvider();

function friendlyError(code) {
  switch (code) {
    case 'auth/email-already-in-use':   return 'This email is already registered. Try signing in.';
    case 'auth/invalid-email':          return 'Invalid email address.';
    case 'auth/weak-password':          return 'Password is too weak. Use at least 6 characters.';
    case 'auth/popup-closed-by-user':   return 'Google sign-in was cancelled.';
    case 'auth/network-request-failed': return 'Network error. Check your connection.';
    default:                            return 'Something went wrong. Please try again.';
  }
}

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm]       = useState({ name: '', email: '', password: '', ref: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState('');

  // ── Email / Password register ──
  const handle = async (e) => {
    e.preventDefault();
    setError('');
    if (form.password.length < 6) return setError('Password must be at least 6 characters.');
    setLoading(true);
    try {
      const cred = await createUserWithEmailAndPassword(auth, form.email, form.password);
      await updateProfile(cred.user, { displayName: form.name });
      router.push('/earn');
    } catch (err) {
      setError(friendlyError(err.code));
    } finally {
      setLoading(false);
    }
  };

  // ── Google register / login ──
  const handleGoogle = async () => {
    setError('');
    setLoading(true);
    try {
      await signInWithPopup(auth, googleProvider);
      router.push('/earn');
    } catch (err) {
      setError(friendlyError(err.code));
    } finally {
      setLoading(false);
    }
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

          {/* Google button */}
          <button
            onClick={handleGoogle}
            disabled={loading}
            style={{
              width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
              padding: '12px', background: '#1a1e35', border: '1px solid #252a45',
              borderRadius: 10, color: '#f0f2ff', fontSize: 14, fontWeight: 600,
              cursor: loading ? 'wait' : 'pointer', marginBottom: 20, transition: 'border-color .2s',
            }}
            onMouseEnter={e => e.currentTarget.style.borderColor = '#3a3a60'}
            onMouseLeave={e => e.currentTarget.style.borderColor = '#252a45'}>
            <svg width="16" height="16" viewBox="0 0 48 48">
              <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
              <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
              <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
              <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.18 1.48-4.97 2.35-8.16 2.35-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
            </svg>
            Continue with Google
          </button>

          <div style={{ position: 'relative', textAlign: 'center', marginBottom: 20 }}>
            <div style={{ position: 'absolute', top: '50%', left: 0, right: 0, height: 1, background: '#252a45' }} />
            <span style={{ position: 'relative', background: '#141728', padding: '0 12px', fontSize: 12, color: '#4a5380' }}>or sign up with email</span>
          </div>

          {/* Error message */}
          {error && (
            <div style={{ background: '#f43f5e18', border: '1px solid #f43f5e40', color: '#f87171', borderRadius: 8, padding: '10px 14px', fontSize: 13, marginBottom: 16 }}>
              ⚠ {error}
            </div>
          )}

          <form onSubmit={handle} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {[
              { label: 'Full Name', key: 'name',     type: 'text',     placeholder: 'John Doe' },
              { label: 'Email',     key: 'email',    type: 'email',    placeholder: 'you@example.com' },
              { label: 'Password',  key: 'password', type: 'password', placeholder: 'Min 6 characters' },
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
                    transition: 'border-color .2s',
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
              marginTop: 4, border: 'none', transition: 'opacity .2s',
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
