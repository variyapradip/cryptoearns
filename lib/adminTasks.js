import {
    collection,
    addDoc,
    updateDoc,
    deleteDoc,
    doc,
    serverTimestamp,
  } from 'firebase/firestore';
  import { db } from '@/lib/firebase';
  
  export async function createTask(data) {
    return addDoc(collection(db, 'tasks'), {
      ...data,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
  }
  
  export async function updateTask(id, data) {
    return updateDoc(doc(db, 'tasks', id), {
      ...data,
      updatedAt: serverTimestamp(),
    });
  }
  
  export async function deleteTask(id) {
    return deleteDoc(doc(db, 'tasks', id));
  }
  
  export async function toggleTaskStatus(id, currentStatus) {
    const next = currentStatus === 'active' ? 'paused' : 'active';
    return updateDoc(doc(db, 'tasks', id), {
      status: next,
      updatedAt: serverTimestamp(),
    });
  }
  