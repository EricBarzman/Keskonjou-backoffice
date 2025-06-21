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
} from 'firebase/firestore';
import { db } from '../client';
import type { ISong } from '../../types/song.type';


export function useSongs() {

  async function getSongs() {
    const ref = collection(db, "songs");
    const snap = await getDocs(
      query(ref, orderBy('title'))
    );

    return snap.docs.map(doc => Object.assign({}, { id: doc.id }, doc.data())) as ISong[]
  }

  async function getSongById(id: string) {
    const ref = doc(db, "songs", id);
    const snap = await getDoc(ref);
    return { ...snap.data, id } as ISong
  }

  async function createSong(data: DocumentData) {
    const ref = collection(db, "songs");
    return addDoc(ref, data);
  }

  async function updateSong(id: string, data: DocumentData) {
    const ref = doc(db, "songs", id);
    return updateDoc(ref, data);
  }

  async function deleteSong(id: string) {
    const ref = doc(db, "songs", id);
    return deleteDoc(ref);
  }

  return { getSongs, getSongById, createSong, updateSong, deleteSong }
}