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
import type { IMusician, IMusicianNested } from '../../types/people.type';


export function useMusicians() {

  async function getMusicians() {
    const ref = collection(db, "musicians");
    const snap = await getDocs(
      query(ref, orderBy('lastname'))
    );

    return snap.docs.map(doc => Object.assign({}, { id: doc.id }, doc.data())) as IMusician[]
  }

  async function getMusicianById(id: string) {
    const ref = doc(db, "musicians", id);
    const snap = await getDoc(ref);
    return { ...snap.data(), id } as IMusician
  }

  async function getMusicianByIdNested(id: string) {
    const ref = doc(db, "musicians", id);
    const snap = await getDoc(ref);

    const instrumentRef = collection(db, "instruments");
    const allInstruments = await getDocs(instrumentRef);
    const instruments = allInstruments.docs
      .map(doc => Object.assign({}, { id: doc.id }, doc.data()))
      .filter(instrument => snap.data()!.instruments.includes(instrument.id))

    return {
      ...snap.data(),
      id,
      instruments,
    } as IMusicianNested
  }

  async function createMusician(data: DocumentData) {
    const ref = collection(db, "musicians");
    return addDoc(ref, data);
  }

  async function updateMusician(id: string, data: DocumentData) {
    const ref = doc(db, "musicians", id);
    return updateDoc(ref, data);
  }

  async function deleteMusician(id: string) {
    const ref = doc(db, "musicians", id);

    // Update par cascade les users
    const userRef = collection(db, "users")
    const targetUsers = await getDocs(query(userRef,
      where('musicianId', "==", id)
    ))
    targetUsers.docs.forEach(snap =>
      updateDoc(snap.ref, {
        musicianId: ""
      }))

    // Update par cascade les bands
    const bandRef = collection(db, "bands")
    const targetBands = await getDocs(query(bandRef,
      where('musicians', "array-contains", id)
    ))
    targetBands.docs.forEach(snap =>
      updateDoc(snap.ref, {
        musicians: snap.data().musicians.filter((musicianId: string) => musicianId !== id)
      }))

    return deleteDoc(ref);
  }

  return { getMusicians, getMusicianById, getMusicianByIdNested, createMusician, updateMusician, deleteMusician }
}