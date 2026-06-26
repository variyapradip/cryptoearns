'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const COLOR_MAP = {
  bitcoin: '#f7931a', ethereum: '#627eea', tether: '#26a17b',
  'binancecoin': '#f3ba2f', solana: '#9945ff', 'usd-coin': '#2775ca',
  cardano: '#0033ad', 'staked-ether': '#627eea', avalanche: '#e84142',
  polkadot: '#e6007a', dogecoin: '#c2a633', chainlink: '#2a5ada',
  'shiba-inu': '#e07a24', 'wrapped-bitcoin': '#f7931a', 'tron': '#ff060a',
  'uniswap': '#ff007a', 'leo-token': '#fab62f', 'dai': '#f5ac37',
};

const TASKS = [
  { id: 1, title: 'Watch & Earn',   desc: 'Watch YouTube videos and earn crypto instantly.',             reward: '0.01841', usd: '$0.01', icon: '▶',  color: '#7c3aed' },
  { id: 2, title: 'Social Tasks',   desc: 'Follow, like, and share on social media platforms.',          reward: '0.01841', usd: '$0.01', icon: '✦',  color: '#3b82f6' },
  { id: 3, title: 'Surveys',        desc: 'Complete quick surveys and get paid in real crypto.',         reward: '0.25000', usd: '$0.14', icon: '📋', color: '#22c55e' },
  { id: 4, title: 'Play Games',     desc: 'Play mobile games and earn while having fun.',                reward: '14.0478', usd: '$7.63', icon: '🎮', color: '#f59e0b' },
  { id: 5, title: 'Passive Income', desc: 'Share bandwidth and earn 24/7 without lifting a finger.',    reward: '0.50000', usd: '$0.27', icon: '⚡', color: '#ec4899' },
  { id: 6, title: 'Referrals',      desc: 'Invite friends and earn a percentage of their earnings.',    reward: '5% cut',  usd: 'forever', icon: '👥', color: '#14b8a6' },
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

function GlowBlob({ color, style }) {
  return (
    <div style={{
      position: 'absolute', width: 500, height: 500, borderRadius: '50%',
      background: `radial-gradient(circle, ${color}22 0%, transparent 70%)`,
      pointerEvents: 'none', ...style,
    }} />
  );
}

function CoinBadge({ coin }) {
  const up = coin.change >= 0;
  return (
    <div style={{
      background: '#141728', border: '1px solid #252a45', borderRadius: 12,
      padding: '14px 20px', display: 'flex', alignItems: 'center', gap: 12,
      minWidth: 180, transition: 'border-color .2s, transform .2s',
    }}
      onMouseEnter={e => { e.currentTarget.style.borderColor = '#3a3a60'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = '#252a45'; e.currentTarget.style.transform = 'translateY(0)'; }}>
      {coin.image ? (
        <img src={coin.image} alt={coin.symbol} style={{ width: 36, height: 36, borderRadius: '50%' }} />
      ) : (
        <div style={{ width: 36, height: 36, borderRadius: '50%', background: (coin.color || '#9d5cff') + '22', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, color: coin.color || '#9d5cff' }}>
          {coin.symbol?.slice(0, 1).toUpperCase()}
        </div>
      )}
      <div>
        <div style={{ fontSize: 13, fontWeight: 700 }}>{coin.symbol?.toUpperCase()}</div>
        <div style={{ fontSize: 11, color: '#8892b0' }}>{coin.name}</div>
      </div>
      <div style={{ marginLeft: 'auto', textAlign: 'right' }}>
        <div style={{ fontSize: 13, fontWeight: 600 }}>${coin.price?.toLocaleString()}</div>
        <div style={{ fontSize: 11, color: up ? '#22c55e' : '#f43f5e', fontWeight: 600 }}>
          {up ? '▲' : '▼'} {Math.abs(coin.change)}%
        </div>
      </div>
    </div>
  );
}

function TaskCard({ task }) {
  return (
    <div style={{
      background: '#141728', border: '1px solid #252a45', borderRadius: 16,
      padding: '28px 24px', display: 'flex', flexDirection: 'column', gap: 16,
      transition: 'border-color .2s, transform .2s', cursor: 'pointer',
    }}
      onMouseEnter={e => { e.currentTarget.style.borderColor = task.color + '60'; e.currentTarget.style.transform = 'translateY(-4px)'; }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = '#252a45'; e.currentTarget.style.transform = 'translateY(0)'; }}>
      <div style={{ width: 48, height: 48, borderRadius: 12, background: task.color + '20', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 }}>
        {task.icon}
      </div>
      <div>
        <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 6 }}>{task.title}</h3>
        <p style={{ fontSize: 13, color: '#8892b0', lineHeight: 1.6 }}>{task.desc}</p>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 'auto' }}>
        <span style={{ fontSize: 13, fontWeight: 700, color: task.color }}>⬆ {task.reward}</span>
        <span style={{ fontSize: 11, background: task.color + '20', color: task.color, padding: '2px 8px', borderRadius: 20, fontWeight: 600 }}>~{task.usd}</span>
      </div>
    </div>
  );
}

export default function HomePage() {
  const [coins, setCoins]         = useState([]);
  const [loading, setLoading]     = useState(true);
  const [search, setSearch]       = useState('');
  const [page, setPage]           = useState(1);
  const PER_PAGE = 20;

  // Fetch top 100 coins
  useEffect(() => {
    const key = process.env.NEXT_PUBLIC_COINGECKO_KEY;
    const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=24h${key ? `&x_cg_demo_api_key=${key}` : ''}`;

    fetch(url)
      .then(r => r.json())
      .then(data => {
        if (!Array.isArray(data)) return;
        const mapped = data.map(c => ({
          id:     c.id,
          rank:   c.market_cap_rank,
          symbol: c.symbol.toUpperCase(),
          name:   c.name,
          image:  c.image,
          price:  c.current_price,
          change: parseFloat((c.price_change_percentage_24h ?? 0).toFixed(2)),
          cap:    c.market_cap,
          vol:    c.total_volume,
          color:  COLOR_MAP[c.id] || '#9d5cff',
        }));
        setCoins(mapped);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // Refresh prices every 60 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      const key = process.env.NEXT_PUBLIC_COINGECKO_KEY;
      const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false${key ? `&x_cg_demo_api_key=${key}` : ''}`;
      fetch(url)
        .then(r => r.json())
        .then(data => {
          if (!Array.isArray(data)) return;
          setCoins(data.map(c => ({
            id: c.id, rank: c.market_cap_rank,
            symbol: c.symbol.toUpperCase(), name: c.name, image: c.image,
            price: c.current_price,
            change: parseFloat((c.price_change_percentage_24h ?? 0).toFixed(2)),
            cap: c.market_cap, vol: c.total_volume,
            color: COLOR_MAP[c.id] || '#9d5cff',
          })));
        })
        .catch(() => {});
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  const fmt = n => {
    if (!n) return '—';
    if (n >= 1e12) return '$' + (n / 1e12).toFixed(2) + 'T';
    if (n >= 1e9)  return '$' + (n / 1e9).toFixed(2) + 'B';
    if (n >= 1e6)  return '$' + (n / 1e6).toFixed(2) + 'M';
    return '$' + n.toLocaleString();
  };

  const fmtPrice = p => {
    if (!p && p !== 0) return '—';
    if (p >= 1) return '$' + p.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    return '$' + p.toFixed(6);
  };

  const filtered = coins.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.symbol.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const paginated  = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);
  const heroCoins  = coins.slice(0, 6);

  return (
    <>
      <Navbar />
      <main style={{ paddingTop: 64 }}>

        {/* ── HERO ── */}
        <section style={{ position: 'relative', minHeight: '92vh', display: 'flex', alignItems: 'center', overflow: 'hidden', padding: '80px 32px' }}>
          <GlowBlob color="#7c3aed" style={{ top: -100, left: -100 }} />
          <GlowBlob color="#3b82f6" style={{ bottom: -200, right: -100 }} />

          <div style={{ maxWidth: 1100, margin: '0 auto', width: '100%', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, alignItems: 'center' }} className="hero-grid">
            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#1a1e35', border: '1px solid #252a45', borderRadius: 20, padding: '6px 14px', fontSize: 12, fontWeight: 600, color: '#9d5cff', marginBottom: 28 }}>
                <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#22c55e', display: 'inline-block' }} />
                Live · 2.4M+ Earners
              </div>

              <h1 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 'clamp(2.2rem,5vw,3.6rem)', fontWeight: 700, lineHeight: 1.1, marginBottom: 24 }}>
                Earn Real Crypto<br />
                <span style={{ background: 'linear-gradient(90deg,#9d5cff,#3b82f6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                  Doing Simple Tasks
                </span>
              </h1>

              <p style={{ fontSize: 16, color: '#8892b0', lineHeight: 1.75, marginBottom: 36, maxWidth: 460 }}>
                Watch videos, complete surveys, play games, and get paid in real cryptocurrency. No investment needed — just your time.
              </p>

              <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
                <Link href="/register" style={{ padding: '14px 32px', borderRadius: 10, fontWeight: 700, fontSize: 15, background: 'linear-gradient(135deg,#7c3aed,#3b82f6)', color: '#fff', display: 'inline-block', transition: 'opacity .2s' }}
                  onMouseEnter={e => e.currentTarget.style.opacity = '.85'}
                  onMouseLeave={e => e.currentTarget.style.opacity = '1'}>
                  Start Earning Free →
                </Link>
                <Link href="#markets" style={{ padding: '14px 28px', borderRadius: 10, fontWeight: 600, fontSize: 15, border: '1px solid #252a45', color: '#8892b0', display: 'inline-block' }}>
                  View Markets
                </Link>
              </div>

              <div style={{ display: 'flex', gap: 24, marginTop: 40, flexWrap: 'wrap' }}>
                {[['🔒', 'Secure'], ['⚡', 'Instant Payouts'], ['🌍', '190+ Countries']].map(([icon, label]) => (
                  <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: '#8892b0' }}>
                    <span>{icon}</span>{label}
                  </div>
                ))}
              </div>
            </div>

            {/* Live coin badges — top 6 */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }} className="hero-coins">
              {loading
                ? Array(6).fill(0).map((_, i) => (
                    <div key={i} style={{ background: '#141728', border: '1px solid #252a45', borderRadius: 12, padding: '14px 20px', height: 68, opacity: 0.5 + i * 0.08 }} />
                  ))
                : heroCoins.map(c => <CoinBadge key={c.id} coin={c} />)
              }
            </div>
          </div>
        </section>

        {/* ── STATS STRIP ── */}
        <section style={{ background: '#0f1225', borderTop: '1px solid #1e2340', borderBottom: '1px solid #1e2340', padding: '32px 32px' }}>
          <div style={{ maxWidth: 900, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 24, textAlign: 'center' }} className="stats-grid">
            {STATS.map(s => (
              <div key={s.label}>
                <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 'clamp(1.6rem,3vw,2.4rem)', fontWeight: 700, background: 'linear-gradient(90deg,#9d5cff,#3b82f6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                  {s.value}
                </div>
                <div style={{ fontSize: 13, color: '#8892b0', marginTop: 4 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ── HOW IT WORKS ── */}
        <section id="how" style={{ padding: '96px 32px', maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 64 }}>
            <p style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#9d5cff', marginBottom: 12 }}>Simple Process</p>
            <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 'clamp(1.8rem,4vw,2.8rem)', fontWeight: 700, marginBottom: 16 }}>Start earning in 3 steps</h2>
            <p style={{ color: '#8892b0', maxWidth: 500, margin: '0 auto', lineHeight: 1.7 }}>No wallet setup, no technical knowledge needed. Sign up and start earning today.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 24 }} className="steps-grid">
            {[
              { step: '01', title: 'Create Account', desc: 'Sign up for free in under 60 seconds. No credit card needed.', color: '#7c3aed' },
              { step: '02', title: 'Pick a Task',    desc: 'Browse hundreds of tasks — videos, surveys, games, and more.', color: '#3b82f6' },
              { step: '03', title: 'Get Paid',       desc: 'Earnings land in your wallet instantly. Withdraw anytime.',   color: '#22c55e' },
            ].map(s => (
              <div key={s.step} style={{ background: '#141728', border: '1px solid #252a45', borderRadius: 16, padding: '36px 28px', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: -12, right: 16, fontFamily: "'Space Grotesk',sans-serif", fontSize: 72, fontWeight: 800, color: s.color + '12', lineHeight: 1 }}>{s.step}</div>
                <div style={{ width: 44, height: 44, borderRadius: 10, background: s.color + '20', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20, fontSize: 18, fontWeight: 700, color: s.color }}>{s.step}</div>
                <h3 style={{ fontSize: 17, fontWeight: 700, marginBottom: 10 }}>{s.title}</h3>
                <p style={{ fontSize: 14, color: '#8892b0', lineHeight: 1.7 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── FEATURED TASK BANNER ── */}
        <section style={{ padding: '0 32px 64px', maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ background: 'linear-gradient(135deg,#1a1035 0%,#141728 50%,#0f1a2e 100%)', border: '1px solid #252a45', borderRadius: 20, padding: '48px 48px', display: 'grid', gridTemplateColumns: '1fr auto', gap: 40, alignItems: 'center', position: 'relative', overflow: 'hidden' }} className="featured-banner">
            <div style={{ position: 'absolute', top: -80, right: 200, width: 300, height: 300, borderRadius: '50%', background: 'radial-gradient(circle,#7c3aed30,transparent 70%)', pointerEvents: 'none' }} />
            <div>
              <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#9d5cff', background: '#2a1a5e', padding: '4px 10px', borderRadius: 6 }}>Featured Task</span>
              <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 'clamp(1.4rem,3vw,2rem)', fontWeight: 700, margin: '16px 0 10px' }}>
                #8807 Search & Watch a Video!
              </h2>
              <p style={{ color: '#8892b0', fontSize: 14, marginBottom: 24, lineHeight: 1.6 }}>
                Search for a video, watch it and earn. <strong style={{ color: '#f0f2ff' }}>EASY crypto!</strong>
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                <Link href="/register" style={{ padding: '12px 28px', background: 'linear-gradient(135deg,#7c3aed,#3b82f6)', borderRadius: 10, fontWeight: 700, fontSize: 14, color: '#fff' }}>
                  Learn more
                </Link>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ fontWeight: 700, fontSize: 15 }}>⬆ 0.03682</span>
                  <span style={{ background: '#22c55e20', color: '#22c55e', padding: '3px 10px', borderRadius: 20, fontSize: 12, fontWeight: 600 }}>~$0.02</span>
                </div>
              </div>
            </div>
            <div style={{ width: 140, height: 140, borderRadius: 28, background: 'linear-gradient(135deg,#4c1d95,#1e40af)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 52, boxShadow: '0 0 60px #7c3aed40' }} className="hide-sm">
              ▶
            </div>
          </div>
        </section>

        {/* ── EARN WAYS ── */}
        <section style={{ padding: '0 32px 96px', maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 32 }}>
            <div>
              <p style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#9d5cff', marginBottom: 6 }}>All Ways to Earn</p>
              <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 'clamp(1.4rem,3vw,2rem)', fontWeight: 700 }}>Pick your earning method</h2>
            </div>
            <Link href="/register" style={{ fontSize: 13, color: '#9d5cff', fontWeight: 600 }}>View all →</Link>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 18 }} className="tasks-grid">
            {TASKS.map(t => <TaskCard key={t.id} task={t} />)}
          </div>
        </section>

        {/* ── PARTNERS ── */}
        <section style={{ background: '#0f1225', borderTop: '1px solid #1e2340', padding: '80px 32px' }}>
          <div style={{ maxWidth: 1100, margin: '0 auto' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 32 }}>
              <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 20, fontWeight: 700 }}>Partners</h2>
              <Link href="/register" style={{ fontSize: 13, color: '#9d5cff', fontWeight: 600 }}>View all →</Link>
            </div>
            <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
              {PARTNERS.map(p => (
                <div key={p.name} style={{ background: p.bg, border: '1px solid #252a45', borderRadius: 14, padding: '28px 36px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12, minWidth: 160, flex: 1, cursor: 'pointer', transition: 'border-color .2s' }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = p.accent + '80'}
                  onMouseLeave={e => e.currentTarget.style.borderColor = '#252a45'}>
                  <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 800, fontSize: 18, color: p.accent }}>{p.name}</div>
                  <div style={{ fontSize: 12, fontWeight: 600, color: '#8892b0' }}>Start here</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── TOP 100 CRYPTO MARKET TABLE ── */}
        <section id="markets" style={{ padding: '80px 32px', maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24, flexWrap: 'wrap', gap: 16 }}>
            <div>
              <p style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#9d5cff', marginBottom: 6 }}>Live Prices</p>
              <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 'clamp(1.4rem,3vw,2rem)', fontWeight: 700 }}>
                Top 100 Crypto Markets
              </h2>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              {/* Search */}
              <input
                value={search}
                onChange={e => { setSearch(e.target.value); setPage(1); }}
                placeholder="Search coin..."
                style={{
                  background: '#141728', border: '1px solid #252a45', borderRadius: 10,
                  padding: '10px 16px', color: '#f0f2ff', fontSize: 13, outline: 'none',
                  width: 200,
                }}
              />
              <div style={{ fontSize: 12, color: '#8892b0', whiteSpace: 'nowrap' }}>
                {loading ? 'Loading...' : `${filtered.length} coins · auto-refresh 60s`}
              </div>
            </div>
          </div>

          {/* Table */}
          <div style={{ background: '#141728', border: '1px solid #252a45', borderRadius: 16, overflow: 'hidden', overflowX: 'auto' }}>
            {/* Header */}
            <div style={{ display: 'grid', gridTemplateColumns: '50px 50px 2fr 1fr 1fr 1fr 1fr', alignItems: 'center', padding: '14px 20px', gap: 12, borderBottom: '1px solid #1e2340', fontSize: 11, fontWeight: 700, color: '#4a5280', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              <div>#</div>
              <div></div>
              <div>Name</div>
              <div style={{ textAlign: 'right' }}>Price</div>
              <div style={{ textAlign: 'right' }}>24h %</div>
              <div style={{ textAlign: 'right' }}>Market Cap</div>
              <div style={{ textAlign: 'right' }}>Volume (24h)</div>
            </div>

            {loading ? (
              Array(10).fill(0).map((_, i) => (
                <div key={i} style={{ display: 'grid', gridTemplateColumns: '50px 50px 2fr 1fr 1fr 1fr 1fr', alignItems: 'center', padding: '16px 20px', gap: 12, borderBottom: '1px solid #1e2340', opacity: 0.3 }}>
                  {Array(7).fill(0).map((_, j) => (
                    <div key={j} style={{ height: 14, background: '#252a45', borderRadius: 4 }} />
                  ))}
                </div>
              ))
            ) : paginated.map((c, i) => {
              const up = c.change >= 0;
              return (
                <div key={c.id} style={{
                  display: 'grid', gridTemplateColumns: '50px 50px 2fr 1fr 1fr 1fr 1fr',
                  alignItems: 'center', padding: '16px 20px', gap: 12,
                  borderBottom: i < paginated.length - 1 ? '1px solid #1e2340' : 'none',
                  transition: 'background .15s', cursor: 'pointer',
                }}
                  onMouseEnter={e => e.currentTarget.style.background = '#1a1e35'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>

                  {/* Rank */}
                  <div style={{ fontSize: 13, color: '#4a5280', fontWeight: 600 }}>{c.rank}</div>

                  {/* Icon */}
                  <div>
                    {c.image
                      ? <img src={c.image} alt={c.symbol} style={{ width: 32, height: 32, borderRadius: '50%' }} />
                      : <div style={{ width: 32, height: 32, borderRadius: '50%', background: c.color + '30', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 800, color: c.color }}>{c.symbol[0]}</div>
                    }
                  </div>

                  {/* Name */}
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 14 }}>{c.name}</div>
                    <div style={{ fontSize: 12, color: '#4a5280', fontWeight: 600 }}>{c.symbol}</div>
                  </div>

                  {/* Price */}
                  <div style={{ textAlign: 'right', fontWeight: 700, fontSize: 14 }}>{fmtPrice(c.price)}</div>

                  {/* 24h change */}
                  <div style={{ textAlign: 'right' }}>
                    <span style={{
                      display: 'inline-block', padding: '3px 8px', borderRadius: 6, fontSize: 12, fontWeight: 700,
                      background: up ? '#22c55e18' : '#f43f5e18',
                      color: up ? '#22c55e' : '#f43f5e',
                    }}>
                      {up ? '▲' : '▼'} {Math.abs(c.change)}%
                    </span>
                  </div>

                  {/* Market Cap */}
                  <div style={{ textAlign: 'right', fontSize: 13, color: '#8892b0' }}>{fmt(c.cap)}</div>

                  {/* Volume */}
                  <div style={{ textAlign: 'right', fontSize: 13, color: '#8892b0' }}>{fmt(c.vol)}</div>
                </div>
              );
            })}
          </div>

          {/* Pagination */}
          {!loading && totalPages > 1 && (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 8, marginTop: 24 }}>
              <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}
                style={{ padding: '8px 16px', background: page === 1 ? '#1a1e35' : '#252a45', border: '1px solid #252a45', borderRadius: 8, color: page === 1 ? '#4a5280' : '#f0f2ff', fontWeight: 600, fontSize: 13, cursor: page === 1 ? 'default' : 'pointer' }}>
                ← Prev
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                <button key={p} onClick={() => setPage(p)}
                  style={{ width: 36, height: 36, borderRadius: 8, border: '1px solid', fontWeight: 700, fontSize: 13, cursor: 'pointer', borderColor: p === page ? '#7c3aed' : '#252a45', background: p === page ? '#7c3aed' : 'transparent', color: p === page ? '#fff' : '#8892b0' }}>
                  {p}
                </button>
              ))}
              <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}
                style={{ padding: '8px 16px', background: page === totalPages ? '#1a1e35' : '#252a45', border: '1px solid #252a45', borderRadius: 8, color: page === totalPages ? '#4a5280' : '#f0f2ff', fontWeight: 600, fontSize: 13, cursor: page === totalPages ? 'default' : 'pointer' }}>
                Next →
              </button>
            </div>
          )}
        </section>

        {/* ── CTA BANNER ── */}
        <section style={{ padding: '0 32px 96px' }}>
          <div style={{ maxWidth: 800, margin: '0 auto', background: 'linear-gradient(135deg,#2d1b69 0%,#1e3a6e 100%)', borderRadius: 24, padding: '72px 48px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: -60, left: '50%', transform: 'translateX(-50%)', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle,#7c3aed25,transparent 70%)', pointerEvents: 'none' }} />
            <p style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#9d5cff', marginBottom: 16 }}>Join Free Today</p>
            <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 'clamp(1.8rem,4vw,3rem)', fontWeight: 700, marginBottom: 16 }}>
              Your crypto journey<br />starts right now
            </h2>
            <p style={{ color: '#8892b0', fontSize: 15, marginBottom: 36, lineHeight: 1.7 }}>
              Over 2.4 million people already earn crypto every day. Join them — it's completely free.
            </p>
            <Link href="/register" style={{ display: 'inline-block', padding: '16px 44px', borderRadius: 12, background: 'linear-gradient(135deg,#7c3aed,#3b82f6)', fontWeight: 700, fontSize: 16, color: '#fff', transition: 'opacity .2s' }}
              onMouseEnter={e => e.currentTarget.style.opacity = '.85'}
              onMouseLeave={e => e.currentTarget.style.opacity = '1'}>
              Create Free Account
            </Link>
          </div>
        </section>

      </main>
      <Footer />


    </>
  );
}
