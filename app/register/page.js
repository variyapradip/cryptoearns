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

const FIELDS = [
  { label: 'Full Name', key: 'name',     type: 'text',     placeholder: 'John Doe' },
  { label: 'Email',     key: 'email',    type: 'email',    placeholder: 'you@example.com' },
  { label: 'Password',  key: 'password', type: 'password', placeholder: 'Min 6 characters' },
  { label: 'Referral Code (optional)', key: 'ref', type: 'text', placeholder: 'EARN5000' },
];

const PERKS = ['Free to join — no card needed', 'Instant crypto payouts', 'Bonus 0.5 USDT on signup'];

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
    <div className="auth-page">
      <div className="auth-glow auth-glow--tr" />
      <div className="auth-glow auth-glow--bl" />

      <div className="auth-inner">
        <div className="auth-logo-wrap">
          <Link href="/" className="auth-logo">
            <span className="auth-logo-icon">₿</span>
            <span className="auth-logo-text">CryptoEarns</span>
          </Link>
        </div>

        <div className="auth-card">
          <h1 className="auth-title">Create account</h1>
          <p className="auth-subtitle">Start earning crypto for free today</p>

          {/* Google button */}
          <button onClick={handleGoogle} disabled={loading} className="auth-google-btn">
            <svg width="16" height="16" viewBox="0 0 48 48">
              <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
              <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
              <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
              <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.18 1.48-4.97 2.35-8.16 2.35-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
            </svg>
            Continue with Google
          </button>

          <div className="auth-divider">
            <div className="auth-divider-line" />
            <span className="auth-divider-text">or sign up with email</span>
          </div>

          {/* Error message */}
          {error && (
            <div className="auth-error">⚠ {error}</div>
          )}

          <form onSubmit={handle} className="auth-form">
            {FIELDS.map((f) => (
              <div key={f.key}>
                <label className="auth-label">{f.label}</label>
                <input
                  type={f.type}
                  placeholder={f.placeholder}
                  value={form[f.key]}
                  onChange={(e) => setForm((p) => ({ ...p, [f.key]: e.target.value }))}
                  required={f.key !== 'ref'}
                  className="auth-input"
                />
              </div>
            ))}

            {/* Perks list */}
            <div className="auth-perks">
              {PERKS.map((perk) => (
                <div key={perk} className="auth-perk">
                  <span className="auth-perk-check">✓</span> {perk}
                </div>
              ))}
            </div>

            <button type="submit" disabled={loading} className="auth-submit">
              {loading ? 'Creating account…' : 'Create Free Account'}
            </button>

            <p className="auth-legal">
              By signing up you agree to our{' '}
              <Link href="#">Terms of Use</Link> and{' '}
              <Link href="#">Privacy Policy</Link>.
            </p>
          </form>

          <p className="auth-footer">
            Already have an account?{' '}
            <Link href="/login">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}