'use client';

import { usePathname } from 'next/navigation';
import Navbar from './Navbar';
import Footer from './Footer';

export default function LayoutContent({ children }) {
  const pathname = usePathname();

  const hideFooter =
    pathname.startsWith('/profile') ||
    pathname.startsWith('/login') ||
    pathname.startsWith('/register');

  return (
    <>
      <Navbar />

      <main className="main">
        {children}
      </main>

      {!hideFooter && <Footer />}
    </>
  );
}