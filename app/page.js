'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';


// ── Color map for known coins ──
const COLOR_MAP = {
  bitcoin: '#f7931a', ethereum: '#627eea', solana: '#9945ff',
  binancecoin: '#f3ba2f', cardano: '#0033ad', polkadot: '#e6007a',
  dogecoin: '#c2a633', tether: '#26a17b', ripple: '#00aae4',
  avalanche: '#e84142', chainlink: '#2a5ada', 'usd-coin': '#2775ca',
};

const TASKS = [
  { id: 1, title: 'Watch & Earn', desc: 'Watch YouTube videos and earn crypto instantly.', reward: '0.01841', usd: '$0.01', icon: '▶', color: '#7c3aed' },
  { id: 2, title: 'Social Tasks', desc: 'Follow, like, and share on social media platforms.', reward: '0.01841', usd: '$0.01', icon: '✦', color: '#3b82f6' },
  { id: 3, title: 'Surveys', desc: 'Complete quick surveys and get paid in real crypto.', reward: '0.25000', usd: '$0.14', icon: '📋', color: '#22c55e' },
  { id: 4, title: 'Play Games', desc: 'Play mobile games and earn while having fun.', reward: '14.0478', usd: '$7.63', icon: '🎮', color: '#f59e0b' },
  { id: 5, title: 'Passive Income', desc: 'Share bandwidth and earn 24/7 without lifting a finger.', reward: '0.50000', usd: '$0.27', icon: '⚡', color: '#ec4899' },
  { id: 6, title: 'Referrals', desc: 'Invite friends and earn a percentage of their earnings.', reward: '5% cut', usd: 'forever', icon: '👥', color: '#14b8a6' },
];

const PARTNERS = [
  { name: 'TOROX',     bg: '#1e1535', accent: '#9d5cff' },
  { name: 'HangAds',   bg: '#0f1f1a', accent: '#22c55e' },
  { name: 'RevU',      bg: '#12182a', accent: '#3b82f6' },
  { name: 'PrimeEarn', bg: '#151c30', accent: '#6366f1' },
  { name: 'CPX',       bg: '#0f1f18', accent: '#10b981' },
];

const STATS = [
  { label: 'Active Users',    value: '2.4M+' },
  { label: 'Crypto Paid Out', value: '$18M+' },
  { label: 'Tasks Available', value: '10,000+' },
  { label: 'Countries',       value: '190+' },
];

// ── Glow blob ──
function GlowBlob({ color, style }) {
  return (
    <div
      className="glow-blob"
      style={{ background: `radial-gradient(circle, ${color}22 0%, transparent 70%)`, ...style }}
    />
  );
}

// ── Coin badge ──
function CoinBadge({ coin }) {
  const up = coin.change >= 0;
  return (
    <div className="coin-badge">
      {coin.image
        ? <img src={coin.image} alt={coin.symbol} className="coin-badge__img" />
        : <div className="coin-badge__fallback" style={{ background: coin.color + '22', color: coin.color }}>
            {coin.symbol.slice(0, 1)}
          </div>
      }
      <div>
        <div className="coin-badge__symbol">{coin.symbol}</div>
        <div className="coin-badge__name">{coin.name}</div>
      </div>
      <div className="coin-badge__price-wrap">
        <div className="coin-badge__price">
          {coin.price >= 1
            ? '$' + coin.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })
            : '$' + coin.price.toFixed(6)
          }
        </div>
        <div className={`coin-badge__change ${up ? 'coin-badge__change--up' : 'coin-badge__change--down'}`}>
          {up ? '▲' : '▼'} {Math.abs(coin.change)}%
        </div>
      </div>
    </div>
  );
}

// ── Task card ──
function TaskCard({ task }) {
  return (
    <div
      className="task-card"
      onMouseEnter={e => { e.currentTarget.style.borderColor = task.color + '60'; }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = ''; }}>
      <div className="task-card__icon" style={{ background: task.color + '20' }}>
        {task.icon}
      </div>
      <div>
        <h3 className="task-card__title">{task.title}</h3>
        <p className="task-card__desc">{task.desc}</p>
      </div>
      <div className="task-card__footer">
        <span className="task-card__reward" style={{ color: task.color }}>⬆ {task.reward}</span>
        <span className="task-card__usd" style={{ background: task.color + '20', color: task.color }}>~{task.usd}</span>
      </div>
    </div>
  );
}

// ✅ Everything above is OUTSIDE the component — this is correct
// ✅ useState and useEffect must be INSIDE the component below

export default function HomePage() {
  const [ticker, setTicker] = useState(0);
  const [coins, setCoins] = useState([]);   // ✅ inside component

  // ── Fetch top 100 coins ──
  useEffect(() => {                          // ✅ inside component
    fetch(
      'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&x_cg_demo_api_key=CG-u4SgJBPm3dc5jrnCVQp8o1EJ'
    )
      .then(r => r.json())
      .then(data => {
        if (!Array.isArray(data)) return;
        setCoins(data.map(c => ({
          symbol: c.symbol.toUpperCase(),
          name:   c.name,
          image:  c.image,
          price:  c.current_price,
          change: parseFloat((c.price_change_percentage_24h ?? 0).toFixed(2)),
          color:  COLOR_MAP[c.id] || '#9d5cff',
        })));
      })
      .catch(err => console.error('CoinGecko error:', err));
  }, []);

  useEffect(() => {                          // ✅ inside component
    const t = setInterval(() => setTicker(p => p + 1), 3000);
    return () => clearInterval(t);
  }, []);

  return (
    <>
      <Navbar />
    

        {/* ── HERO ── */}
        <section className="hero-section">
          <GlowBlob color="#7c3aed" style={{ top: -100, left: -100 }} />
          <GlowBlob color="#3b82f6" style={{ bottom: -200, right: -100 }} />

          <div className="hero-inner hero-grid">

            {/* Left */}
            <div>
              <div className="hero-badge">
                <span className="hero-badge__dot" />
                Live · 2.4M+ Earners
              </div>

              <h1 className="hero-title">
                Earn Real Crypto<br />
                <span className="hero-title__gradient">
                  Doing Simple Tasks
                </span>
              </h1>

              <p className="hero-subtitle">
                Watch videos, complete surveys, play games, and get paid in real cryptocurrency. No investment needed — just your time.
              </p>

              <div className="hero-ctas">
                <Link href="/register" className="btn-primary">
                  Start Earning Free →
                </Link>
                <Link href="#how" className="btn-secondary">
                  How it works
                </Link>
              </div>

              {/* Trust badges */}
              <div className="hero-trust">
                {[['🔒', 'Secure'], ['⚡', 'Instant Payouts'], ['🌍', '190+ Countries']].map(([icon, label]) => (
                  <div key={label} className="hero-trust__item">
                    <span>{icon}</span>{label}
                  </div>
                ))}
              </div>
            </div>

            {/* Right — Live coin cards (top 6) */}
            <div className="hero-coins-grid hero-coins">
              {coins.slice(0, 6).map(c => <CoinBadge key={c.symbol} coin={c} />)}
            </div>
          </div>
        </section>

        {/* ── STATS STRIP ── */}
        <section className="stats-section">
          <div className="stats-inner stats-grid">
            {STATS.map(s => (
              <div key={s.label}>
                <div className="stat-value">{s.value}</div>
                <div className="stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ── HOW IT WORKS ── */}
        <section id="how" className="how-section">
          <div className="how-header">
            <p className="section-eyebrow">Simple Process</p>
            <h2 className="how-title">Start earning in 3 steps</h2>
            <p className="how-subtitle">No wallet setup, no technical knowledge needed. Sign up and start earning today.</p>
          </div>

          <div className="steps-inner steps-grid">
            {[
              { step: '01', title: 'Create Account', desc: 'Sign up for free in under 60 seconds. No credit card needed.', color: '#7c3aed' },
              { step: '02', title: 'Pick a Task', desc: 'Browse hundreds of tasks — videos, surveys, games, and more.', color: '#3b82f6' },
              { step: '03', title: 'Get Paid', desc: 'Earnings land in your wallet instantly. Withdraw anytime.', color: '#22c55e' },
            ].map(s => (
              <div key={s.step} className="step-card">
                <div className="step-card__bg-number" style={{ color: s.color + '12' }}>{s.step}</div>
                <div className="step-card__icon" style={{ background: s.color + '20', color: s.color }}>{s.step}</div>
                <h3 className="step-card__title">{s.title}</h3>
                <p className="step-card__desc">{s.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── FEATURED TASK HERO (like JumpTask banner) ── */}
        <section className="featured-section">
          <div className="featured-banner">
            <div className="featured-banner__glow" />
            <div>
              <span className="featured-tag">Featured Task</span>
              <h2 className="featured-title">
                #8807 Search & Watch a Video!
              </h2>
              <p className="featured-desc">
                Search for a video, watch it and earn. <strong>EASY crypto!</strong>
              </p>
              <div className="featured-cta-row">
                <Link href="/register" className="btn-sm-primary">
                  Learn more
                </Link>
                <div className="featured-reward">
                  <span className="featured-reward__amount">⬆ 0.03682</span>
                  <span className="featured-reward__usd">~$0.02</span>
                </div>
              </div>
            </div>
            {/* Play icon visual */}
            <div className="featured-play-icon hide-sm">▶</div>
          </div>
        </section>

        {/* ── EARN WAYS / TASK CARDS ── */}
        <section className="tasks-section">
          <div className="tasks-header">
            <div>
              <p className="tasks-eyebrow">All Ways to Earn</p>
              <h2 className="tasks-title">Pick your earning method</h2>
            </div>
            <Link href="/register" className="link-view-all">View all →</Link>
          </div>
          <div className="tasks-grid">
            {TASKS.map(t => <TaskCard key={t.id} task={t} />)}
          </div>
        </section>

        {/* ── PARTNERS ── */}
        <section className="partners-section">
          <div className="partners-inner">
            <div className="partners-header">
              <h2 className="partners-title">Partners</h2>
              <Link href="/register" className="link-view-all">View all →</Link>
            </div>
            <div className="partners-list">
              {PARTNERS.map(p => (
                <div
                  key={p.name}
                  className="partner-card"
                  style={{ background: p.bg }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = p.accent + '80'}
                  onMouseLeave={e => e.currentTarget.style.borderColor = ''}>
                  <div className="partner-card__name" style={{ color: p.accent }}>{p.name}</div>
                  <div className="partner-card__sub">Start here</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CRYPTO MARKET STRIP ── */}
        <section className="market-section">
          <div className="market-header">
            <div>
              <p className="market-eyebrow">Live Prices</p>
              <h2 className="market-title">Crypto Markets</h2>
            </div>
          </div>
          <div className="market-table">
            {coins.map((c, i) => (
              <div
                key={c.symbol + i}
                className="market-row"
                style={{ borderBottom: i < coins.length - 1 ? '1px solid #1e2340' : 'none' }}>
                {c.image
                  ? <img src={c.image} alt={c.symbol} className="market-row__img" />
                  : <div className="market-row__fallback" style={{ background: c.color + '20', color: c.color }}>{c.symbol[0]}</div>
                }
                <div>
                  <div className="market-row__name">{c.name}</div>
                  <div className="market-row__symbol">{c.symbol}</div>
                </div>
                <div className="market-row__price">
                  {c.price >= 1
                    ? '$' + c.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })
                    : '$' + c.price.toFixed(6)
                  }
                </div>
                <div className={`market-row__change ${c.change >= 0 ? 'market-row__change--up' : 'market-row__change--down'}`}>
                  {c.change >= 0 ? '▲' : '▼'} {Math.abs(c.change)}%
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── CTA BANNER ── */}
        <section className="cta-section">
          <div className="cta-inner">
            <div className="cta-inner__glow" />
            <p className="cta-eyebrow">Join Free Today</p>
            <h2 className="cta-title">
              Your crypto journey<br />starts right now
            </h2>
            <p className="cta-subtitle">
              Over 2.4 million people already earn crypto every day. Join them — it's completely free.
            </p>
            <Link href="/register" className="btn-cta">
              Create Free Account
            </Link>
          </div>
        </section>

     
   
    </>
  );
}