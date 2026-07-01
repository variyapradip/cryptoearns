'use client';
import { useState, useEffect } from 'react';
import { collection, query, where, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '@/lib/firebase';

/**
 * Live tasks feed for the frontend.
 * activeOnly=true (default) → only tasks with status "active", for the Earn page.
 * activeOnly=false → every task regardless of status, for the admin table.
 *
 * NOTE: where('status','==',...) + orderBy('order') needs a composite
 * Firestore index. On first run, Firestore will throw an error in the
 * console with a direct link to auto-create it — just click it.
 */
export function useTasks({ activeOnly = true } = {}) {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const base = collection(db, 'tasks');
    
    const q = query(base, orderBy('order', 'asc'));

    const unsub = onSnapshot(
      q,
      (snap) => {
        setTasks(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
        setLoading(false);
      },
      (err) => {
        console.error('useTasks error:', err);
        setError(err);
        setLoading(false);
      }
    );

    return () => unsub();
  }, [activeOnly]);

  return { tasks, loading, error };
}
