'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useAdmin } from '@/lib/hooks/useAdmin';
import { useTasks } from '@/lib/hooks/useTasks';
import { createTask, updateTask, deleteTask, toggleTaskStatus } from '@/lib/adminTasks';

const TASK_TYPES = [
  { value: 'watch_video',   label: 'Watch Video' },
  { value: 'social_follow', label: 'Social Follow' },
  { value: 'survey',        label: 'Survey' },
  { value: 'game',          label: 'Game' },
  { value: 'passive',       label: 'Passive Income' },
  { value: 'watch_ad',      label: 'Watch Ad' },
];

const LINK_PLATFORMS = ['x', 'telegram', 'discord', 'instagram'];

const EMPTY_FORM = {
  title: '',
  subtitle: '',
  type: 'watch_video',
  status: 'active',
  icon: '✦',
  color: '#7c3aed',
  time: '',
  offerId: '',
  order: 0,
  reward: { crypto: '', currency: 'USDT', usd: '', isVariable: false },
  instructionsText: '',
  requiresSocialLink: false,
  linkPlatform: 'x',
  featured: false,
  badgeText: '',
  bannerImage: '',
};

function taskToForm(task) {
  return {
    title: task.title || '',
    subtitle: task.subtitle || '',
    type: task.type || 'watch_video',
    status: task.status || 'active',
    icon: task.icon || '✦',
    color: task.color || '#7c3aed',
    time: task.time || '',
    offerId: task.offerId || '',
    order: task.order ?? 0,
    reward: {
      crypto: task.reward?.crypto ?? '',
      currency: task.reward?.currency || 'USDT',
      usd: task.reward?.usd ?? '',
      isVariable: !!task.reward?.isVariable,
    },
    instructionsText: (task.instructions || []).join('\n'),
    requiresSocialLink: !!task.requiresSocialLink,
    linkPlatform: task.linkPlatform || 'x',
    featured: !!task.featured,
    badgeText: task.badgeText || '',
    bannerImage: task.bannerImage || '',
  };
}

function formToPayload(form) {
  return {
    title: form.title.trim(),
    subtitle: form.subtitle.trim(),
    type: form.type,
    status: form.status,
    icon: form.icon.trim() || '✦',
    color: form.color,
    time: form.time.trim(),
    offerId: form.offerId.trim(),
    order: Number(form.order) || 0,
    reward: {
      crypto: parseFloat(form.reward.crypto) || 0,
      currency: form.reward.currency.trim() || 'USDT',
      usd: parseFloat(form.reward.usd) || 0,
      isVariable: form.reward.isVariable,
    },
    instructions: form.instructionsText
      .split('\n')
      .map((s) => s.trim())
      .filter(Boolean),
    requiresSocialLink: form.requiresSocialLink,
    linkPlatform: form.requiresSocialLink ? form.linkPlatform : null,
    featured: form.featured,
    badgeText: form.badgeText.trim(),
    bannerImage: form.bannerImage.trim(),
  };
}

export default function AdminPage() {
  const { user, isAdmin, loading: authLoading } = useAdmin();
  const { tasks, loading: tasksLoading } = useTasks({ activeOnly: false });

  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);

  const openCreate = () => {
    setEditingId(null);
    setForm(EMPTY_FORM);
    setModalOpen(true);
  };

  const openEdit = (task) => {
    setEditingId(task.id);
    setForm(taskToForm(task));
    setModalOpen(true);
  };

  const closeModal = () => {
    if (saving) return;
    setModalOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = formToPayload(form);
      if (editingId) {
        await updateTask(editingId, payload);
      } else {
        await createTask(payload);
      }
      setModalOpen(false);
    } catch (err) {
      console.error('Save task failed:', err);
      alert('Could not save task. Check console for details.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (task) => {
    if (!confirm(`Delete "${task.title}"? This can't be undone.`)) return;
    try {
      await deleteTask(task.id);
    } catch (err) {
      console.error('Delete task failed:', err);
      alert('Could not delete task.');
    }
  };

  const handleToggle = async (task) => {
    try {
      await toggleTaskStatus(task.id, task.status);
    } catch (err) {
      console.error('Toggle status failed:', err);
    }
  };

  // ── Auth gates ──
  if (authLoading) {
    return (
      <div className="spinner-wrap">
        <div className="spinner-wrap__inner">
          <div className="spinner" />
          <p className="spinner-text">Checking access…</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="admin-denied">
        <p>You need to sign in to view this page.</p>
        <Link href="/login" className="btn-primary">Sign in</Link>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="admin-denied">
        <p>You don't have admin access.</p>
        <p className="admin-subtitle">Signed in as {user.email}</p>
      </div>
    );
  }

  return (
    <div className="admin-page">
      <div className="admin-header">
        <div>
          <h1 className="admin-title">Task Management</h1>
          <p className="admin-subtitle">{tasks.length} task{tasks.length !== 1 ? 's' : ''} total</p>
        </div>
        <button className="admin-add-btn" onClick={openCreate}>+ New Task</button>
      </div>

      <div className="admin-table-wrap">
        {tasksLoading ? (
          <div className="admin-empty">Loading tasks…</div>
        ) : tasks.length === 0 ? (
          <div className="admin-empty">No tasks yet. Click "New Task" to add one.</div>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Task</th>
                <th>Type</th>
                <th>Reward</th>
                <th>Status</th>
                <th>Order</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task) => (
                <tr key={task.id}>
                  <td>
                    <div className="admin-task-title">
                      <div className="admin-task-icon" style={{ background: (task.color || '#7c3aed') + '20' }}>
                        {task.icon}
                      </div>
                      {task.title}
                    </div>
                  </td>
                  <td>{TASK_TYPES.find((t) => t.value === task.type)?.label || task.type}</td>
                  <td>
                    {task.reward?.crypto} {task.reward?.currency} · ${task.reward?.usd}
                  </td>
                  <td>
                    <span className={`admin-badge admin-badge--${task.status}`}>{task.status}</span>
                  </td>
                  <td>{task.order ?? 0}</td>
                  <td>
                    <div className="admin-row-actions">
                      <button className="admin-icon-btn" onClick={() => handleToggle(task)} title="Toggle active/paused">⏻</button>
                      <button className="admin-icon-btn" onClick={() => openEdit(task)} title="Edit">✎</button>
                      <button className="admin-icon-btn admin-icon-btn--danger" onClick={() => handleDelete(task)} title="Delete">🗑</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {modalOpen && (
        <div className="admin-modal-overlay" onClick={closeModal}>
          <div className="admin-modal" onClick={(e) => e.stopPropagation()}>
            <h2 className="admin-modal-title">{editingId ? 'Edit Task' : 'New Task'}</h2>

            <form onSubmit={handleSubmit}>
              <div className="admin-form-grid">
                <div className="admin-field admin-form-grid--full">
                  <label>Title</label>
                  <input
                    value={form.title}
                    onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))}
                    required
                  />
                </div>

                <div className="admin-field admin-form-grid--full">
                  <label>Subtitle</label>
                  <input
                    value={form.subtitle}
                    onChange={(e) => setForm((p) => ({ ...p, subtitle: e.target.value }))}
                  />
                </div>

                <div className="admin-field">
                  <label>Type</label>
                  <select
                    value={form.type}
                    onChange={(e) => setForm((p) => ({ ...p, type: e.target.value }))}
                  >
                    {TASK_TYPES.map((t) => (
                      <option key={t.value} value={t.value}>{t.label}</option>
                    ))}
                  </select>
                </div>

                <div className="admin-field">
                  <label>Status</label>
                  <select
                    value={form.status}
                    onChange={(e) => setForm((p) => ({ ...p, status: e.target.value }))}
                  >
                    <option value="active">Active</option>
                    <option value="paused">Paused</option>
                    <option value="expired">Expired</option>
                  </select>
                </div>

                <div className="admin-field">
                  <label>Icon (emoji)</label>
                  <input
                    value={form.icon}
                    onChange={(e) => setForm((p) => ({ ...p, icon: e.target.value }))}
                    placeholder="▶"
                  />
                </div>

                <div className="admin-field">
                  <label>Accent Color</label>
                  <div className="admin-color-input">
                    <input
                      type="color"
                      value={form.color}
                      onChange={(e) => setForm((p) => ({ ...p, color: e.target.value }))}
                    />
                    <input
                      value={form.color}
                      onChange={(e) => setForm((p) => ({ ...p, color: e.target.value }))}
                    />
                  </div>
                </div>

                <div className="admin-field">
                  <label>Time estimate</label>
                  <input
                    value={form.time}
                    onChange={(e) => setForm((p) => ({ ...p, time: e.target.value }))}
                    placeholder="~1 min"
                  />
                </div>

                <div className="admin-field">
                  <label>Sort order</label>
                  <input
                    type="number"
                    value={form.order}
                    onChange={(e) => setForm((p) => ({ ...p, order: e.target.value }))}
                  />
                </div>

                <div className="admin-field">
                  <label>Reward (crypto amount)</label>
                  <input
                    type="number"
                    step="0.00001"
                    value={form.reward.crypto}
                    onChange={(e) => setForm((p) => ({ ...p, reward: { ...p.reward, crypto: e.target.value } }))}
                    required
                  />
                </div>

                <div className="admin-field">
                  <label>Currency</label>
                  <input
                    value={form.reward.currency}
                    onChange={(e) => setForm((p) => ({ ...p, reward: { ...p.reward, currency: e.target.value } }))}
                  />
                </div>

                <div className="admin-field">
                  <label>Reward (USD)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={form.reward.usd}
                    onChange={(e) => setForm((p) => ({ ...p, reward: { ...p.reward, usd: e.target.value } }))}
                    required
                  />
                </div>

                <div className="admin-field">
                  <label>Offer ID</label>
                  <input
                    value={form.offerId}
                    onChange={(e) => setForm((p) => ({ ...p, offerId: e.target.value }))}
                    placeholder="auto or paste from partner"
                  />
                </div>

                <div className="admin-field admin-form-grid--full">
                  <label>Instructions (one per line)</label>
                  <textarea
                    value={form.instructionsText}
                    onChange={(e) => setForm((p) => ({ ...p, instructionsText: e.target.value }))}
                    placeholder={'Link your X account\nClick Follow'}
                  />
                </div>

                <div className="admin-form-grid--full">
                  <label className="admin-checkbox-row">
                    <input
                      type="checkbox"
                      checked={form.reward.isVariable}
                      onChange={(e) => setForm((p) => ({ ...p, reward: { ...p.reward, isVariable: e.target.checked } }))}
                    />
                    Reward can vary slightly
                  </label>
                  <label className="admin-checkbox-row">
                    <input
                      type="checkbox"
                      checked={form.requiresSocialLink}
                      onChange={(e) => setForm((p) => ({ ...p, requiresSocialLink: e.target.checked }))}
                    />
                    Requires linking a social account
                  </label>
                </div>

                {form.requiresSocialLink && (
                  <div className="admin-field">
                    <label>Link platform</label>
                    <select
                      value={form.linkPlatform}
                      onChange={(e) => setForm((p) => ({ ...p, linkPlatform: e.target.value }))}
                    >
                      {LINK_PLATFORMS.map((p) => (
                        <option key={p} value={p}>{p}</option>
                      ))}
                    </select>
                  </div>
                )}

                <div className="admin-form-grid--full">
                  <label className="admin-checkbox-row">
                    <input
                      type="checkbox"
                      checked={form.featured}
                      onChange={(e) => setForm((p) => ({ ...p, featured: e.target.checked }))}
                    />
                    Show in homepage featured slider
                  </label>
                </div>

                {form.featured && (
                  <>
                    <div className="admin-field">
                      <label>Slider badge (optional)</label>
                      <input
                        value={form.badgeText}
                        onChange={(e) => setForm((p) => ({ ...p, badgeText: e.target.value }))}
                        placeholder="2x Reward"
                      />
                    </div>
                    <div className="admin-field">
                      <label>Slider image URL (optional)</label>
                      <input
                        value={form.bannerImage}
                        onChange={(e) => setForm((p) => ({ ...p, bannerImage: e.target.value }))}
                        placeholder="https://…/logo.png"
                      />
                    </div>
                  </>
                )}
              </div>

              <div className="admin-modal-actions">
                <button type="button" className="admin-btn-cancel" onClick={closeModal} disabled={saving}>
                  Cancel
                </button>
                <button type="submit" className="admin-btn-save" disabled={saving}>
                  {saving ? 'Saving…' : editingId ? 'Save Changes' : 'Create Task'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}