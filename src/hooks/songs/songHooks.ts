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
import type { ISong, ISongNested } from '../../types/song.type';


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
    return {
      ...snap.data(),
      id,
    } as unknown as ISong
  }

  async function getSongByIdNested(id: string) {
    const ref = doc(db, "songs", id);
    const snap = await getDoc(ref);

    // Get external attributes --eg join--
    // Style
    let style;
    if (!snap.data()!.styleId) style = null;
    else {
      const refStyle = doc(db, "styles", snap.data()!.styleId)
      style = await getDoc(refStyle);
    }
    // Mood
    let mood;
    if (!snap.data()!.moodId) mood = null;
    else {
      const refMood = doc(db, "moods", snap.data()!.moodId)
      mood = await getDoc(refMood);
    }
    // Instruments
    let selectedInstruments: unknown = [];
    if (snap.data()!.instrumentsNotRequired.length > 0) {
      const refInstruments = collection(db, "instruments");
      const allInstruments = await getDocs(refInstruments);
      selectedInstruments = allInstruments.docs
        .map(doc => Object.assign({}, { id: doc.id }, doc.data()))
        .filter(instrument => snap.data()!.instrumentsNotRequired.includes(instrument.id))
    }

    return {
      ...snap.data(),
      id,
      style: style
        ? {
          id: style.id,
          ...style.data()
        }
        : null,
      mood: mood
        ? {
          id: mood.id,
          ...mood.data()
        }
        : null,
      instrumentsNotRequired: selectedInstruments,
    } as unknown as ISongNested
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

  return { getSongs, getSongById, getSongByIdNested, createSong, updateSong, deleteSong }
}