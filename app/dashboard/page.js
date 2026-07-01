'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { auth } from '@/lib/firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';

const TASKS = [
  { id: 1, title: 'Watch & Earn',   desc: 'Watch a YouTube video and earn instantly.',         reward: '0.01841', usd: '$0.01', icon: '▶',  color: '#7c3aed', time: '~1 min' },
  { id: 2, title: 'Social Task',    desc: 'Follow, like, and share on social platforms.',       reward: '0.01841', usd: '$0.01', icon: '✦',  color: '#3b82f6', time: '~2 min' },
  { id: 3, title: 'Quick Survey',   desc: 'Complete a short survey and get paid in crypto.',    reward: '0.25000', usd: '$0.14', icon: '📋', color: '#22c55e', time: '~5 min' },
  { id: 4, title: 'Play a Game',    desc: 'Play a mobile game and earn while having fun.',      reward: '14.0478', usd: '$7.63', icon: '🎮', color: '#f59e0b', time: '~10 min' },
  { id: 5, title: 'Passive Income', desc: 'Share bandwidth and earn 24/7 passively.',          reward: '0.50000', usd: '$0.27', icon: '⚡', color: '#ec4899', time: 'passive' },
  { id: 6, title: 'Watch Ad',       desc: 'Watch a short ad and receive crypto instantly.',     reward: '0.00500', usd: '$0.00', icon: '📺', color: '#14b8a6', time: '~30 sec' },
];

const HISTORY = [
  { id: 1, task: 'Watch & Earn',   amount: '+0.01841', usd: '+$0.01', date: 'Today, 10:42 AM',         status: 'completed' },
  { id: 2, task: 'Quick Survey',   amount: '+0.25000', usd: '+$0.14', date: 'Today, 09:15 AM',         status: 'completed' },
  { id: 3, task: 'Social Task',    amount: '+0.01841', usd: '+$0.01', date: 'Yesterday, 08:30 PM',     status: 'completed' },
  { id: 4, task: 'Watch & Earn',   amount: '+0.01841', usd: '+$0.01', date: 'Yesterday, 06:12 PM',     status: 'completed' },
  { id: 5, task: 'Play a Game',    amount: '+14.0478', usd: '+$7.63', date: 'Jun 24, 3:45 PM',         status: 'completed' },
  { id: 6, task: 'Passive Income', amount: '+0.50000', usd: '+$0.27', date: 'Jun 23, 11:00 AM',        status: 'completed' },
];

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser]         = useState(null);
  const [loading, setLoading]   = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      if (u) { setUser(u); } else { router.replace('/login'); }
      setLoading(false);
    });
    return () => unsub();
  }, [router]);

  const handleLogout = async () => {
    await signOut(auth);
    router.push('/');
  };

  if (loading) return (
    <div className="spinner-wrap">
      <div style={{ textAlign: 'center' }}>
        <div className="spinner" />
        <p className="spinner-text">Loading dashboard…</p>
      </div>
    </div>
  );

  const displayName = user?.displayName || user?.email?.split('@')[0] || 'Earner';
  const initials    = displayName.slice(0, 2).toUpperCase();

  const NAV_ITEMS = [
    { id: 'overview', icon: '⊞', label: 'Overview' },
    { id: 'tasks',    icon: '✦', label: 'Tasks' },
    { id: 'history',  icon: '📋', label: 'Earnings' },
  ];

  return (
    <div className="profile-page">
      {/* ── SIDEBAR ── */}
      <aside className="profile-sidebar">
        <Link href="/earn" className="profile-sidebar__logo">
          <span className="navbar-logo-icon">₿</span>
          <span className="navbar-logo-text" style={{ fontSize: 15 }}>CryptoEarns</span>
        </Link>

        <nav className="profile-sidebar__nav">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`sidebar-nav-btn${activeTab === item.id ? ' active' : ''}`}
            >
              <span className="sidebar-nav-icon">{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>

        <div className="profile-sidebar__footer">
          <div className="sidebar-user-box">
            <div className="sidebar-avatar">{initials}</div>
            <div style={{ overflow: 'hidden' }}>
              <div className="sidebar-username">{displayName}</div>
              <div className="sidebar-email">{user?.email}</div>
            </div>
          </div>
          <button onClick={handleLogout} className="sidebar-logout-btn">
            ↩ Sign Out
          </button>
        </div>
      </aside>

      {/* ── MAIN CONTENT ── */}
      <main className="profile-main">
        <Link href="/earn" className="back-btn">
          <span className="back-btn-icon">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5"/><path d="M12 19l-7-7 7-7"/>
            </svg>
          </span>
          <span>Back</span>
        </Link>

        {/* ── OVERVIEW TAB ── */}
        {activeTab === 'overview' && (
          <div>
            <div style={{ marginBottom: 32 }}>
              <p style={{ fontSize: 13, color: 'var(--text-gray)', marginBottom: 4 }}>Welcome back,</p>
              <h1 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 'clamp(1.4rem,3vw,1.9rem)', fontWeight: 700 }}>
                {displayName} 👋
              </h1>
            </div>

            <div className="balance-grid">
              {[
                { label: 'Total Balance',    value: '$8.07',  sub: '≈ 14.87 USDT', color: '#7c3aed', icon: '💰' },
                { label: 'Tasks Completed',  value: '6',      sub: 'this week',    color: '#3b82f6', icon: '✅' },
                { label: 'Pending Rewards',  value: '$0.28',  sub: 'processing',   color: '#22c55e', icon: '⏳' },
              ].map((card) => (
                <div key={card.label} className="balance-card">
                  <div className="balance-card__glow" style={{ background: card.color + '15' }} />
                  <div className="balance-card__icon">{card.icon}</div>
                  <div className="balance-card__value" style={{ color: card.color }}>{card.value}</div>
                  <div className="balance-card__label">{card.label}</div>
                  <div className="balance-card__sub">{card.sub}</div>
                </div>
              ))}
            </div>

            <div className="quick-actions-box">
              <h2 className="quick-actions-title">Quick Actions</h2>
              <div className="quick-actions-row">
                {[
                  { label: 'Start Earning', icon: '⚡', action: () => setActiveTab('tasks'),   cls: 'quick-action-btn quick-action-btn--primary' },
                  { label: 'View Earnings', icon: '📊', action: () => setActiveTab('history'), cls: 'quick-action-btn quick-action-btn--secondary' },
                  { label: 'Withdraw',      icon: '💸', action: () => {},                      cls: 'quick-action-btn quick-action-btn--secondary' },
                ].map((btn) => (
                  <button key={btn.label} onClick={btn.action} className={btn.cls}>
                    <span>{btn.icon}</span>{btn.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="activity-box">
              <div className="activity-header">
                <h2 className="activity-title">Recent Activity</h2>
                <button onClick={() => setActiveTab('history')} className="activity-view-btn">View all →</button>
              </div>
              {HISTORY.slice(0, 3).map((h, i) => (
                <div key={h.id} className="activity-row" style={{ borderBottom: i < 2 ? '1px solid #1a1e35' : 'none' }}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <div className="activity-icon">{TASKS.find((t) => t.title === h.task)?.icon || '✦'}</div>
                    <div>
                      <div className="activity-task">{h.task}</div>
                      <div className="activity-date">{h.date}</div>
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div className="activity-amount">{h.usd}</div>
                    <div className="activity-usdt">{h.amount} USDT</div>
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
              <p style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--purple-lt)', marginBottom: 8 }}>Available Now</p>
              <h1 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 'clamp(1.4rem,3vw,1.9rem)', fontWeight: 700 }}>Pick a Task & Earn</h1>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(260px,1fr))', gap: 18 }}>
              {TASKS.map((task) => (
                <div
                  key={task.id}
                  className="task-card"
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = task.color + '60'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = ''; }}
                >
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                    <div className="task-card__icon" style={{ background: task.color + '20' }}>{task.icon}</div>
                    <span style={{ fontSize: 11, background: 'var(--bg-card2)', color: 'var(--text-gray)', padding: '3px 10px', borderRadius: 20, fontWeight: 600 }}>{task.time}</span>
                  </div>
                  <div>
                    <h3 className="task-card__title">{task.title}</h3>
                    <p className="task-card__desc">{task.desc}</p>
                  </div>
                  <div className="task-card__footer" style={{ justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span className="task-card__reward" style={{ color: task.color }}>⬆ {task.reward}</span>
                      <span className="task-card__usd" style={{ background: task.color + '20', color: task.color }}>{task.usd}</span>
                    </div>
                    <button style={{ padding: '7px 16px', borderRadius: 8, background: task.color, color: '#fff', fontSize: 12, fontWeight: 700, border: 'none', transition: 'opacity .2s' }}
                      onMouseEnter={(e) => { e.currentTarget.style.opacity = '.8'; }}
                      onMouseLeave={(e) => { e.currentTarget.style.opacity = '1'; }}>
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
              <p style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--purple-lt)', marginBottom: 8 }}>Your Wallet</p>
              <h1 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 'clamp(1.4rem,3vw,1.9rem)', fontWeight: 700 }}>Earnings History</h1>
            </div>

            <div className="history-banner">
              <div className="history-banner__glow" />
              <div>
                <p className="history-total-label">Total Earned</p>
                <p className="history-total-value">$8.07</p>
                <p className="history-total-sub">≈ 14.87523 USDT lifetime</p>
              </div>
              <button className="history-withdraw-btn">💸 Withdraw</button>
            </div>

            <div className="history-table-wrap">
              <div className="history-table-head">
                {['Task', 'Amount', 'Date', 'Status'].map((h) => (
                  <div key={h} className="history-table-head-cell">{h}</div>
                ))}
              </div>
              {HISTORY.map((h, i) => (
                <div
                  key={h.id}
                  className="history-table-row"
                  style={{ borderBottom: i < HISTORY.length - 1 ? '1px solid #1a1e35' : 'none' }}
                >
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <div className="history-task-icon">{TASKS.find((t) => t.title === h.task)?.icon || '✦'}</div>
                    <span className="history-task-name">{h.task}</span>
                  </div>
                  <div>
                    <div className="history-amount">{h.usd}</div>
                    <div className="history-usdt">{h.amount} USDT</div>
                  </div>
                  <div className="history-date">{h.date}</div>
                  <div>
                    <span className="history-status">✓ {h.status}</span>
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