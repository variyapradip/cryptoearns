'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  sendPasswordResetEmail,
} from 'firebase/auth';
import { auth } from '@/lib/firebase';

const googleProvider = new GoogleAuthProvider();

function friendlyError(code) {
  switch (code) {
    case 'auth/user-not-found':
    case 'auth/wrong-password':
    case 'auth/invalid-credential':     return 'Incorrect email or password.';
    case 'auth/invalid-email':          return 'Invalid email address.';
    case 'auth/too-many-requests':      return 'Too many attempts. Reset your password or try later.';
    case 'auth/popup-closed-by-user':   return 'Google sign-in was cancelled.';
    case 'auth/network-request-failed': return 'Network error. Check your connection.';
    default:                            return 'Something went wrong. Please try again.';
  }
}

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm]         = useState({ email: '', password: '' });
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState('');
  const [resetSent, setResetSent] = useState(false);

  const handle = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, form.email, form.password);
      router.replace('/earn');
    } catch (err) {
      setError(friendlyError(err.code));
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    setError('');
    setLoading(true);
    try {
      await signInWithPopup(auth, googleProvider);
      router.replace('/earn');
    } catch (err) {
      setError(friendlyError(err.code));
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    if (!form.email) return setError('Enter your email above, then click Forgot password.');
    setError('');
    try {
      await sendPasswordResetEmail(auth, form.email);
      setResetSent(true);
    } catch (err) {
      setError(friendlyError(err.code));
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-glow auth-glow--tl" />
      <div className="auth-glow auth-glow--br" />

      <div className="auth-inner auth-inner--sm">
        {/* Logo */}
        <div className="auth-logo-wrap">
          <Link href="/" className="auth-logo">
            <span className="auth-logo-icon">₿</span>
            <span className="auth-logo-text">CryptoEarns</span>
          </Link>
        </div>

        <div className="auth-card">
          <h1 className="auth-title">Welcome back</h1>
          <p className="auth-subtitle">Sign in to your account</p>

          {error     && <div className="auth-error">⚠ {error}</div>}
          {resetSent && <div className="auth-success">✓ Password reset email sent — check your inbox.</div>}

          <form onSubmit={handle} className="auth-form">
            {[
              { label: 'Email',    key: 'email',    type: 'email',    placeholder: 'you@example.com' },
              { label: 'Password', key: 'password', type: 'password', placeholder: '••••••••' },
            ].map((f) => (
              <div key={f.key}>
                <label className="auth-label">{f.label}</label>
                <input
                  type={f.type}
                  placeholder={f.placeholder}
                  value={form[f.key]}
                  onChange={(e) => setForm((p) => ({ ...p, [f.key]: e.target.value }))}
                  required
                  className="auth-input"
                />
              </div>
            ))}

            <div className="auth-forgot">
              <button type="button" onClick={handleForgotPassword} className="auth-forgot-btn">
                Forgot password?
              </button>
            </div>

            <button type="submit" disabled={loading} className="auth-submit">
              {loading ? 'Signing in…' : 'Sign In'}
            </button>
          </form>

          <div className="auth-divider">
            <div className="auth-divider-line" />
            <span className="auth-divider-text">or continue with</span>
          </div>

          <div className="auth-2col">
            <button onClick={handleGoogle} disabled={loading} className="auth-alt-btn">
              Google
            </button>
            <button disabled className="auth-alt-btn">Discord</button>
          </div>

          <p className="auth-footer">
            Don't have an account?{' '}
            <Link href="/register">Sign up free</Link>
          </p>
        </div>
      </div>
    </div>
  );
}