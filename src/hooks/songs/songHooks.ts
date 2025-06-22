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
    const refStyle = doc(db, "styles", snap.data()!.styleId)
    const style = await getDoc(refStyle);

    const refMood = doc(db, "moods", snap.data()!.moodId)
    const mood = await getDoc(refMood);

    const refInstruments = collection(db, "instruments");
    const instruments = await getDocs(refInstruments);
    const selectedInstruments = instruments.docs
      .map(doc => Object.assign({}, { id: doc.id }, doc.data()))
      .filter(instrument => snap.data()!.instrumentsNotRequired.includes(instrument.id))
    
    return {
      ...snap.data(),
      id,
      style : {
        id: style.id,
        ...style.data()
      },
      mood : {
        id: mood.id,
        ...mood.data()
      },
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