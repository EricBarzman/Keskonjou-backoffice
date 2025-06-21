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
import type { IInstrument } from '../../types/instrument.type';


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
    return { ...snap.data(), id } as IInstrument;
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
    return deleteDoc(ref);
  }

  return { getInstruments, getInstrumentById, createInstrument, updateInstrument, deleteInstrument }
}