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
import type { ISetlist, ISetlistNested } from '../../types/song.type';


export function useSetlists() {

  async function getSetlists() {
    const ref = collection(db, "setlists");
    const snap = await getDocs(
      query(ref, orderBy('title'))
    );

    return snap.docs.map(doc => Object.assign({}, { id: doc.id }, doc.data())) as ISetlist[]
  }

  async function getSetlistById(id: string) {
    const ref = doc(db, "setlists", id);
    const snap = await getDoc(ref);
    return { ...snap.data(), id } as ISetlist
  }

  async function getSetlistByIdNested(id: string) {
    const ref = doc(db, "setlists", id);
    const snap = await getDoc(ref);

    // Songs
    const refSongs = collection(db, "songs");
    const allSongs = await getDocs(refSongs);
    const songs = allSongs.docs
      .map(doc => Object.assign({}, { id: doc.id }, doc.data()))
      .filter(song => snap.data()!.songs.includes(song.id))

    // Instruments
    let instrumentsNotRequired: unknown = [];
    if (snap.data()!.instrumentsNotRequired.length > 0) {
      const refInstruments = collection(db, "instruments");
      const allInstruments = await getDocs(refInstruments);
      instrumentsNotRequired = allInstruments.docs
        .map(doc => Object.assign({}, { id: doc.id }, doc.data()))
        .filter(instrument => snap.data()!.instrumentsNotRequired.includes(instrument.id))
    }

    return { ...snap.data(), id, songs, instrumentsNotRequired } as ISetlistNested
  }

  async function createSetlist(data: DocumentData) {
    const ref = collection(db, "setlists");
    return addDoc(ref, data);
  }

  async function updateSetlist(id: string, data: DocumentData) {
    const ref = doc(db, "setlists", id);
    return updateDoc(ref, data);
  }

  async function deleteSetlist(id: string) {
    const ref = doc(db, "setlists", id);
    return deleteDoc(ref);
  }

  return { getSetlists, getSetlistById, getSetlistByIdNested, createSetlist, updateSetlist, deleteSetlist }
}