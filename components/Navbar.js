'use client';
import { useState, useEffect } from "react";
import Link from "next/link";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../lib/firebase";
import { useRouter } from "next/navigation";


export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(null);
  const guestLinks = [
    { name: "Earn", href: "/earn" },
    { name: "Markets", href: "/markets" },
    { name: "Referrals", href: "/referrals" },
    { name: "Help", href: "/help" },
  ];
  const router = useRouter();

  const userLinks = [
    { name: "Earn", href: "/earn" },
    { name: "Bonus Code", href: "/bonuscode" },
    { name: "Help", href: "/help" },
  ];
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });


    
    return () => unsubscribe();
  }, []);
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
        <div
          className="nav-links"
          style={{ display: "flex", alignItems: "center", gap: 32 }}
        >
          {(user ? userLinks : guestLinks).map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="nav-link"
              style={{ fontSize: 14, fontWeight: 500 }}
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* Right Actions */}
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>

          {user ? (
            <>
            <div className="profile_box">
              <div className="profile_img">
              <img className="img-fluid" src={`/images/user.jpg`} alt="User" />
              </div>
              <div className="profile_earning-box">
                <span className="profile_lable">EARNING</span>
            
                  <span className="user_earning-text">1.058</span>
       
              </div>
              <Link className="full_link"
                href="/profile"
              ></Link>
            </div>
            </>
          ) : (
            <>
              <Link
                className="mb_menu"
                href="/login"
                style={{
                  fontSize: 14,
                  fontWeight: 600,
                  color: "#9d5cff",
                  padding: "8px 18px",
                  borderRadius: 8,
                  border: "1px solid #3a2a6e",
                }}
              >
                Log in
              </Link>

              <Link
                className="mb_menu"
                href="/register"
                style={{
                  fontSize: 14,
                  fontWeight: 600,
                  padding: "8px 20px",
                  borderRadius: 8,
                  background: "linear-gradient(135deg,#7c3aed,#3b82f6)",
                  color: "#fff",
                }}
              >
                Get Started
              </Link>
            </>
          )}

          <button
            onClick={() => setOpen(!open)}
            className="burger"
            aria-label="Menu"
            style={{ display: "none", flexDirection: "column", gap: 5, padding: 6 }}
          >
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                style={{
                  display: "block",
                  width: 22,
                  height: 2,
                  background: "#8892b0",
                  borderRadius: 2,
                }}
              />
            ))}
          </button>

        </div>
      </nav>

      {/* Mobile drawer */}
      {open && (
        <div
          style={{
            position: "fixed",
            top: 64,
            left: 0,
            right: 0,
            bottom: 0,
            background: "#0d0f1a",
            zIndex: 99,
            display: "flex",
            flexDirection: "column",
            padding: 32,
            gap: 24,
          }}
        >
          {(user ? userLinks : guestLinks).map((item) => (
            <Link
              key={item.name}
              href={item.href}
              onClick={() => setOpen(false)}
            >
              {item.name}
            </Link>
          ))}

          {user ? (
            <>
              <Link href="/profile" onClick={() => setOpen(false)}>
                My Profile
              </Link>

              <button
                onClick={handleLogout}
                className="logout-btn"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/login" onClick={() => setOpen(false)}>
                Log in
              </Link>

              <Link href="/register" onClick={() => setOpen(false)}>
                Get Started
              </Link>
            </>
          )}

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
