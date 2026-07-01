'use client';
import { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';

/**
 * Returns { user, isAdmin, loading }.
 * "Admin" = a doc exists at admins/{uid} in Firestore.
 * This is a UX gate only — the real security boundary is the
 * Firestore rule that requires the same doc to exist before
 * allowing writes to /tasks. See firestore.rules.
 */
export function useAdmin() {
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (u) => {
      setUser(u);

      if (!u) {
        setIsAdmin(false);
        setLoading(false);
        return;
      }

      try {
        const snap = await getDoc(doc(db, 'admins', u.uid));
        setIsAdmin(snap.exists());
      } catch (err) {
        console.error('useAdmin check failed:', err);
        setIsAdmin(false);
      } finally {
        setLoading(false);
      }
    });

    return () => unsub();
  }, []);

  return { user, isAdmin, loading };
}
