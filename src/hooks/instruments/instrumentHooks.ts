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
import type { IInstrument, IInstrumentNested } from '../../types/instrument.type';


export function useInstruments() {

  async function getInstruments() {
    const ref = collection(db, "instruments");
    const snap = await getDocs(
      query(ref, orderBy('name'))
    );

    return snap.docs.map(doc => Object.assign({}, { id: doc.id }, doc.data())) as IInstrument[]
  }

  async function getInstrumentById(id: string) {
    const ref = doc(db, "instruments", id);
    const snap = await getDoc(ref);

    // Get external attributes --eg join--
    let family = null;
    if (snap.data()!.familyId) {
      const refFamily = doc(db, "families", snap.data()!.familyId)
      family = await getDoc(refFamily);
    }

    return {
      ...snap.data(),
      id,
      family: family
        ? {
          id: family.id,
          ...family.data(),
        }
        : null,
    } as IInstrumentNested;
  }

  async function createInstrument(data: DocumentData) {
    const ref = collection(db, "instruments");
    return addDoc(ref, data);
  }

  async function updateInstrument(id: string, data: DocumentData) {
    const ref = doc(db, "instruments", id);
    return updateDoc(ref, data);
  }

  async function deleteInstrument(id: string) {
    const ref = doc(db, "instruments", id);

    // Update par cascade les musiciens
    const musicianRef = collection(db, "musicians")
    const targetMusician = await getDocs(query(musicianRef,
      where('instruments', "array-contains", id)
    ))
    targetMusician.docs.forEach(snap =>
      updateDoc(snap.ref, {
        instruments: snap.data().instruments.filter((instruId: string) => instruId !== id)
      }))

    // Update par cascade les songs
    const songRef = collection(db, "songs")
    const targetSongs = await getDocs(query(songRef,
      where('instrumentsNotRequired', "array-contains", id)
    ))
    targetSongs.docs.forEach(snap =>
      updateDoc(snap.ref, {
        instrumentsNotRequired: snap.data().instrumentsNotRequired.filter((instruId: string) => instruId !== id)
      }))

    return deleteDoc(ref);
  }

  return { getInstruments, getInstrumentById, createInstrument, updateInstrument, deleteInstrument }
}