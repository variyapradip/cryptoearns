'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { auth } from '@/lib/firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';


const TASKS = [
  { id: 1, title: 'Watch & Earn', desc: 'Watch a YouTube video and earn instantly.', reward: '0.01841', usd: '$0.01', icon: '▶', color: '#7c3aed', time: '~1 min' },
  { id: 2, title: 'Social Task', desc: 'Follow, like, and share on social platforms.', reward: '0.01841', usd: '$0.01', icon: '✦', color: '#3b82f6', time: '~2 min' },
  { id: 3, title: 'Quick Survey', desc: 'Complete a short survey and get paid in crypto.', reward: '0.25000', usd: '$0.14', icon: '📋', color: '#22c55e', time: '~5 min' },
  { id: 4, title: 'Play a Game', desc: 'Play a mobile game and earn while having fun.', reward: '14.0478', usd: '$7.63', icon: '🎮', color: '#f59e0b', time: '~10 min' },
  { id: 5, title: 'Passive Income', desc: 'Share bandwidth and earn 24/7 passively.', reward: '0.50000', usd: '$0.27', icon: '⚡', color: '#ec4899', time: 'passive' },
  { id: 6, title: 'Watch Ad', desc: 'Watch a short ad and receive crypto instantly.', reward: '0.00500', usd: '$0.00', icon: '📺', color: '#14b8a6', time: '~30 sec' },
];

const HISTORY = [
  { id: 1, task: 'Watch & Earn', amount: '+0.01841', usd: '+$0.01', date: 'Today, 10:42 AM', status: 'completed' },
  { id: 2, task: 'Quick Survey', amount: '+0.25000', usd: '+$0.14', date: 'Today, 09:15 AM', status: 'completed' },
  { id: 3, task: 'Social Task', amount: '+0.01841', usd: '+$0.01', date: 'Yesterday, 08:30 PM', status: 'completed' },
  { id: 4, task: 'Watch & Earn', amount: '+0.01841', usd: '+$0.01', date: 'Yesterday, 06:12 PM', status: 'completed' },
  { id: 5, task: 'Play a Game', amount: '+14.0478', usd: '+$7.63', date: 'Jun 24, 3:45 PM', status: 'completed' },
  { id: 6, task: 'Passive Income', amount: '+0.50000', usd: '+$0.27', date: 'Jun 23, 11:00 AM', status: 'completed' },
];

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      if (u) {
        setUser(u);
      } else {
        router.replace("/login");
      }

      setLoading(false);
    });

    return () => unsub();
  }, [router]);

  const handleLogout = async () => {
    await signOut(auth);
    router.push('/');
  };

  if (loading) return (
    <div style={{ minHeight: '100vh', background: '#0d0f1a', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{ width: 48, height: 48, borderRadius: '50%', border: '3px solid #252a45', borderTopColor: '#7c3aed', animation: 'spin 0.8s linear infinite', margin: '0 auto 16px' }} />
        <p style={{ color: '#8892b0', fontSize: 14 }}>Loading dashboard…</p>
      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );

  const displayName = user?.displayName || user?.email?.split('@')[0] || 'Earner';
  const initials = displayName.slice(0, 2).toUpperCase();

  return (
    <div style={{ minHeight: '100vh', background: '#0d0f1a', color: '#f0f2ff' }}>
      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        a { text-decoration: none; color: inherit; }
        button { cursor: pointer; border: none; font-family: inherit; }
        ::-webkit-scrollbar { width: 5px; }
        ::-webkit-scrollbar-track { background: #0d0f1a; }
        ::-webkit-scrollbar-thumb { background: #252a45; border-radius: 3px; }
      `}</style>

      {/* ── SIDEBAR ── */}
      <aside style={{
        position: 'fixed', top: 0, left: 0, bottom: 0, width: 220,
        background: '#0b0d18', borderRight: '1px solid #1a1e35',
        display: 'flex', flexDirection: 'column', zIndex: 100,
        padding: '15px 0',
      }}>
        {/* Logo */}
        <Link href="/earn" style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '0px 20px 14px', borderBottom: '1px solid #1a1e35' }}>
          <span style={{ width: 34, height: 34, borderRadius: 9, background: 'linear-gradient(135deg,#7c3aed,#3b82f6)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, flexShrink: 0 }}>₿</span>
          <span style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: 15, background: 'linear-gradient(90deg,#9d5cff,#3b82f6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>CryptoEarns</span>
        </Link>

        {/* Nav */}
        <nav style={{ flex: 1, padding: '20px 12px', display: 'flex', flexDirection: 'column', gap: 4 }}>
          {[
            { id: 'overview', icon: '⊞', label: 'Overview' },
            { id: 'tasks', icon: '✦', label: 'Tasks' },
            { id: 'history', icon: '📋', label: 'Earnings' },
          ].map(item => (
            <button key={item.id} onClick={() => setActiveTab(item.id)} style={{
              display: 'flex', alignItems: 'center', gap: 10,
              padding: '10px 12px', borderRadius: 10, width: '100%', textAlign: 'left',
              background: activeTab === item.id ? '#1a1e35' : 'transparent',
              color: activeTab === item.id ? '#f0f2ff' : '#8892b0',
              fontSize: 14, fontWeight: activeTab === item.id ? 600 : 400,
              transition: 'all .15s',
              borderLeft: activeTab === item.id ? '2px solid #7c3aed' : '2px solid transparent',
            }}>
              <span style={{ fontSize: 16 }}>{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>

        {/* User + logout */}
        <div style={{ padding: '16px 12px', borderTop: '1px solid #1a1e35' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', borderRadius: 10, background: '#141728', marginBottom: 8 }}>
            <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'linear-gradient(135deg,#7c3aed,#3b82f6)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, flexShrink: 0 }}>{initials}</div>
            <div style={{ overflow: 'hidden' }}>
              <div style={{ fontSize: 13, fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{displayName}</div>
              <div style={{ fontSize: 11, color: '#8892b0', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{user?.email}</div>
            </div>
          </div>
          <button onClick={handleLogout} style={{
            width: '100%', padding: '9px 12px', borderRadius: 10,
            background: 'transparent', border: '1px solid #252a45',
            color: '#8892b0', fontSize: 13, fontWeight: 600,
            transition: 'all .15s', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
          }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = '#f43f5e60'; e.currentTarget.style.color = '#f87171'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = '#252a45'; e.currentTarget.style.color = '#8892b0'; }}>
            ↩ Sign Out
          </button>
        </div>
      </aside>

      {/* ── MAIN CONTENT ── */}
      <main style={{ marginLeft: 220, padding: '32px 36px', minHeight: '100vh' }}>
        <Link href="/earn" className="back-btn">
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M19 12H5" />
            <path d="M12 19l-7-7 7-7" />
          </svg>

          <span>Back</span>
        </Link>
        {/* ── OVERVIEW TAB ── */}
        {activeTab === 'overview' && (
          <div>
            {/* Header */}
            <div style={{ marginBottom: 32 }}>
              <p style={{ fontSize: 13, color: '#8892b0', marginBottom: 4 }}>Welcome back,</p>
              <h1 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 'clamp(1.4rem,3vw,1.9rem)', fontWeight: 700 }}>{displayName} 👋</h1>
            </div>

            {/* Balance cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 18, marginBottom: 36 }}>
              {[
                { label: 'Total Balance', value: '$8.07', sub: '≈ 14.87 USDT', color: '#7c3aed', icon: '💰' },
                { label: 'Tasks Completed', value: '6', sub: 'this week', color: '#3b82f6', icon: '✅' },
                { label: 'Pending Rewards', value: '$0.28', sub: 'processing', color: '#22c55e', icon: '⏳' },
              ].map(card => (
                <div key={card.label} style={{ background: '#141728', border: '1px solid #252a45', borderRadius: 16, padding: '24px 22px', position: 'relative', overflow: 'hidden' }}>
                  <div style={{ position: 'absolute', top: -20, right: -20, width: 100, height: 100, borderRadius: '50%', background: card.color + '15', pointerEvents: 'none' }} />
                  <div style={{ fontSize: 22, marginBottom: 12 }}>{card.icon}</div>
                  <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 'clamp(1.4rem,2.5vw,2rem)', fontWeight: 700, color: card.color, marginBottom: 4 }}>{card.value}</div>
                  <div style={{ fontSize: 12, color: '#8892b0', fontWeight: 600 }}>{card.label}</div>
                  <div style={{ fontSize: 11, color: '#4a5380', marginTop: 2 }}>{card.sub}</div>
                </div>
              ))}
            </div>

            {/* Quick actions */}
            <div style={{ background: '#141728', border: '1px solid #252a45', borderRadius: 16, padding: '24px', marginBottom: 36 }}>
              <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 15, fontWeight: 700, marginBottom: 18, color: '#f0f2ff' }}>Quick Actions</h2>
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                {[
                  { label: 'Start Earning', icon: '⚡', action: () => setActiveTab('tasks'), bg: 'linear-gradient(135deg,#7c3aed,#3b82f6)' },
                  { label: 'View Earnings', icon: '📊', action: () => setActiveTab('history'), bg: '#1a1e35' },
                  { label: 'Withdraw', icon: '💸', action: () => { }, bg: '#1a1e35' },
                ].map(btn => (
                  <button key={btn.label} onClick={btn.action} style={{
                    display: 'flex', alignItems: 'center', gap: 8,
                    padding: '11px 20px', borderRadius: 10,
                    background: btn.bg, color: '#f0f2ff',
                    fontSize: 13, fontWeight: 600,
                    border: btn.bg === '#1a1e35' ? '1px solid #252a45' : 'none',
                    transition: 'opacity .2s',
                  }}
                    onMouseEnter={e => e.currentTarget.style.opacity = '.8'}
                    onMouseLeave={e => e.currentTarget.style.opacity = '1'}>
                    <span>{btn.icon}</span>{btn.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Recent activity preview */}
            <div style={{ background: '#141728', border: '1px solid #252a45', borderRadius: 16, padding: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
                <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 15, fontWeight: 700 }}>Recent Activity</h2>
                <button onClick={() => setActiveTab('history')} style={{ fontSize: 12, color: '#9d5cff', fontWeight: 600, background: 'none', border: 'none' }}>View all →</button>
              </div>
              {HISTORY.slice(0, 3).map((h, i) => (
                <div key={h.id} style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: '13px 0',
                  borderBottom: i < 2 ? '1px solid #1a1e35' : 'none',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{ width: 36, height: 36, borderRadius: 10, background: '#1a1e35', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 }}>
                      {TASKS.find(t => t.title === h.task)?.icon || '✦'}
                    </div>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 600 }}>{h.task}</div>
                      <div style={{ fontSize: 11, color: '#4a5380', marginTop: 2 }}>{h.date}</div>
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: 13, fontWeight: 700, color: '#22c55e' }}>{h.usd}</div>
                    <div style={{ fontSize: 11, color: '#4a5380' }}>{h.amount} USDT</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── TASKS TAB ── */}
        {activeTab === 'tasks' && (
          <div>
            <div style={{ marginBottom: 32 }}>
              <p style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#9d5cff', marginBottom: 8 }}>Available Now</p>
              <h1 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 'clamp(1.4rem,3vw,1.9rem)', fontWeight: 700 }}>Pick a Task & Earn</h1>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(280px,1fr))', gap: 18 }}>
              {TASKS.map(task => (
                <div key={task.id} style={{
                  background: '#141728', border: '1px solid #252a45', borderRadius: 16,
                  padding: '24px', display: 'flex', flexDirection: 'column', gap: 14,
                  transition: 'border-color .2s, transform .2s', cursor: 'pointer',
                }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = task.color + '60'; e.currentTarget.style.transform = 'translateY(-3px)'; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = '#252a45'; e.currentTarget.style.transform = 'translateY(0)'; }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                    <div style={{ width: 44, height: 44, borderRadius: 11, background: task.color + '20', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>{task.icon}</div>
                    <span style={{ fontSize: 11, background: '#1a1e35', color: '#8892b0', padding: '3px 10px', borderRadius: 20, fontWeight: 600 }}>{task.time}</span>
                  </div>
                  <div>
                    <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 6 }}>{task.title}</h3>
                    <p style={{ fontSize: 13, color: '#8892b0', lineHeight: 1.6 }}>{task.desc}</p>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 'auto' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span style={{ fontSize: 13, fontWeight: 700, color: task.color }}>⬆ {task.reward}</span>
                      <span style={{ fontSize: 11, background: task.color + '20', color: task.color, padding: '2px 8px', borderRadius: 20, fontWeight: 600 }}>{task.usd}</span>
                    </div>
                    <button style={{
                      padding: '7px 16px', borderRadius: 8,
                      background: task.color, color: '#fff',
                      fontSize: 12, fontWeight: 700, border: 'none',
                      transition: 'opacity .2s',
                    }}
                      onMouseEnter={e => e.currentTarget.style.opacity = '.8'}
                      onMouseLeave={e => e.currentTarget.style.opacity = '1'}>
                      Start
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── HISTORY TAB ── */}
        {activeTab === 'history' && (
          <div>
            <div style={{ marginBottom: 32 }}>
              <p style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#9d5cff', marginBottom: 8 }}>Your Wallet</p>
              <h1 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 'clamp(1.4rem,3vw,1.9rem)', fontWeight: 700 }}>Earnings History</h1>
            </div>

            {/* Total earned banner */}
            <div style={{
              background: 'linear-gradient(135deg,#2d1b69,#1e3a6e)',
              borderRadius: 16, padding: '28px 28px', marginBottom: 28,
              display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16,
              position: 'relative', overflow: 'hidden',
            }}>
              <div style={{ position: 'absolute', top: -40, right: -40, width: 200, height: 200, borderRadius: '50%', background: 'radial-gradient(circle,#7c3aed30,transparent 70%)', pointerEvents: 'none' }} />
              <div>
                <p style={{ fontSize: 12, color: '#8892b0', marginBottom: 6, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Total Earned</p>
                <p style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 'clamp(1.8rem,4vw,2.6rem)', fontWeight: 700, color: '#f0f2ff' }}>$8.07</p>
                <p style={{ fontSize: 13, color: '#8892b0', marginTop: 4 }}>≈ 14.87523 USDT lifetime</p>
              </div>
              <button style={{
                padding: '12px 28px', borderRadius: 10,
                background: 'linear-gradient(135deg,#7c3aed,#3b82f6)',
                color: '#fff', fontSize: 14, fontWeight: 700, border: 'none',
              }}>
                💸 Withdraw
              </button>
            </div>

            {/* History table */}
            <div style={{ background: '#141728', border: '1px solid #252a45', borderRadius: 16, overflow: 'hidden' }}>
              {/* Table header */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', padding: '14px 24px', borderBottom: '1px solid #1a1e35', background: '#0f1225' }}>
                {['Task', 'Amount', 'Date', 'Status'].map(h => (
                  <div key={h} style={{ fontSize: 11, fontWeight: 700, color: '#4a5380', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{h}</div>
                ))}
              </div>

              {HISTORY.map((h, i) => (
                <div key={h.id} style={{
                  display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr',
                  padding: '16px 24px', alignItems: 'center',
                  borderBottom: i < HISTORY.length - 1 ? '1px solid #1a1e35' : 'none',
                  transition: 'background .15s',
                }}
                  onMouseEnter={e => e.currentTarget.style.background = '#1a1e35'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{ width: 32, height: 32, borderRadius: 8, background: '#1a1e35', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14 }}>
                      {TASKS.find(t => t.title === h.task)?.icon || '✦'}
                    </div>
                    <span style={{ fontSize: 13, fontWeight: 600 }}>{h.task}</span>
                  </div>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: '#22c55e' }}>{h.usd}</div>
                    <div style={{ fontSize: 11, color: '#4a5380' }}>{h.amount} USDT</div>
                  </div>
                  <div style={{ fontSize: 12, color: '#8892b0' }}>{h.date}</div>
                  <div>
                    <span style={{ fontSize: 11, background: '#22c55e20', color: '#22c55e', padding: '3px 10px', borderRadius: 20, fontWeight: 600 }}>✓ {h.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </main>
    </div>
  );
}
