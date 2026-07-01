'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../lib/firebase';
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(null);
  const router = useRouter();

  const guestLinks = [
    { name: 'Earn', href: '/earn' },
    { name: 'Markets', href: '/markets' },
    { name: 'Referrals', href: '/referrals' },
    { name: 'Help', href: '/help' },
  ];
  const userLinks = [
    { name: 'Earn', href: '/earn' },
    { name: 'Bonus Code', href: '/bonuscode' },
    { name: 'Help', href: '/help' },
  ];

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    setOpen(false);
    router.push('/');
  };

  const links = user ? userLinks : guestLinks;

  return (
    <>
      <nav className="navbar">
        {/* Logo */}
        <Link href="/" className="navbar-logo">
          <span className="navbar-logo-icon">₿</span>
          <span className="navbar-logo-text">CryptoEarns</span>
        </Link>

        {/* Desktop Links */}
        <div className="navbar-links">
          {links.map((item) => (
            <Link key={item.name} href={item.href} className="nav-link">
              {item.name}
            </Link>
          ))}
        </div>

        {/* Right Actions */}
        <div className="navbar-actions">
          {user ? (
            <div className="profile-box">
              <div className="profile-img">
                <img src="/images/user.jpg" alt="User" />
              </div>
              <div className="profile-earning-box">
                <span className="profile-label">EARNING</span>
                <span className="user-earning-text">1.058</span>
              </div>
              <Link className="full-link" href="/profile" />
            </div>
          ) : (
            <>
              <Link href="/login" className="btn-login mb_menu">Log in</Link>
              <Link href="/register" className="btn-getstarted mb_menu">Get Started</Link>
            </>
          )}

          <button
            onClick={() => setOpen(!open)}
            className="burger"
            aria-label="Menu"
          >
            <span className="burger-bar" />
            <span className="burger-bar" />
            <span className="burger-bar" />
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      {open && (
        <div className="mobile-drawer">
          {links.map((item) => (
            <Link key={item.name} href={item.href} onClick={() => setOpen(false)}>
              {item.name}
            </Link>
          ))}

          {user ? (
            <>
              <Link href="/profile" onClick={() => setOpen(false)}>My Profile</Link>
              <button onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <>
              <Link href="/login" onClick={() => setOpen(false)}>Log in</Link>
              <Link href="/register" onClick={() => setOpen(false)}>Get Started</Link>
            </>
          )}
        </div>
      )}
    </>
  );
}