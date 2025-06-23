import {
  type DocumentData,
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  updateDoc,
  where,
} from 'firebase/firestore';
import { db } from '../client';
import type { IMood } from '../../types/song.type';


export function useMoods() {

  async function getMoods() {
    const ref = collection(db, "moods");
    const snap = await getDocs(
      query(ref, orderBy('name'))
    );

    return snap.docs.map(doc => Object.assign(
      {}, { id: doc.id }, doc.data()
    )) as IMood[]
  }

  async function getMoodById(id: string) {
    const ref = doc(db, "moods", id);
    const snap = await getDoc(ref);
    return { ...snap.data(), id } as IMood
  }

  async function createMood(data: DocumentData) {
    const ref = collection(db, "moods");
    return addDoc(ref, data);
  }

  async function updateMood(id: string, data: DocumentData) {
    const ref = doc(db, "moods", id);
    return updateDoc(ref, data);
  }

  async function deleteMood(id: string) {
    const ref = doc(db, "moods", id);

    // Update the songs by cascade
    const songRef = collection(db, "songs")
    const targetSongs = await getDocs(query(songRef,
      where('moodId', "==", id)
    ))
    targetSongs.docs.forEach(snap => updateDoc(snap.ref, { moodId: "" }))

    // Delete mood
    return deleteDoc(ref);
  }

  return { getMoods, getMoodById, createMood, updateMood, deleteMood }
}