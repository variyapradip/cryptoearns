import './globals.css';
import LayoutContent from '../components/LayoutContent';

export const metadata = {
  title: 'CryptoEarns — Earn, Trade & Grow',
  description: 'Complete tasks, watch videos, and earn real crypto.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Space+Grotesk:wght@500;700&display=swap"
          rel="stylesheet"
        />
      </head>

      <body>
        <LayoutContent>
          {children}
        </LayoutContent>
      </body>
    </html>
  );
}