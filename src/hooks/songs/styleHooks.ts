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
import type { IStyle } from '../../types/song.type';


export function useStyles() {

  async function getStyles() {
    const ref = collection(db, "styles");
    const snap = await getDocs(
      query(ref, orderBy('name'))
    );

    return snap.docs.map(doc => Object.assign({}, { id: doc.id }, doc.data())) as IStyle[]
  }

  async function getStyleById(id: string) {
    const ref = doc(db, "styles", id);
    const snap = await getDoc(ref);
    return { ...snap.data(), id } as IStyle
  }

  async function createStyle(data: DocumentData) {
    const ref = collection(db, "styles");
    return addDoc(ref, data);
  }

  async function updateStyle(id: string, data: DocumentData) {
    const ref = doc(db, "styles", id);
    return updateDoc(ref, data);
  }

  async function deleteStyle(id: string) {
    const ref = doc(db, "styles", id);

    // Update the songs by cascade
    const songRef = collection(db, "songs")
    const targetSongs = await getDocs(query(songRef,
      where('styleId', "==", id)
    ))
    targetSongs.docs.forEach(snap => updateDoc(snap.ref, { styleId: "" }))

    // Delete mood
    return deleteDoc(ref);
  }

  return { getStyles, getStyleById, createStyle, updateStyle, deleteStyle }
}