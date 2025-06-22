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
import type { IBand } from '../../types/people.type';


export function useBands() {

  async function getBands() {
    const ref = collection(db, "bands");
    const snap = await getDocs(
      query(ref, orderBy('name'))
    );

    return snap.docs.map(doc => Object.assign({}, { id: doc.id }, doc.data())) as IBand[]
  }

  async function getBandById(id: string) {
    const ref = doc(db, "bands", id);
    const snap = await getDoc(ref);
    return { ...snap.data(), id } as IBand
  }

  async function createBand(data: DocumentData) {
    const ref = collection(db, "bands");
    return addDoc(ref, data);
  }

  async function updateBand(id: string, data: DocumentData) {
    const ref = doc(db, "bands", id);
    return updateDoc(ref, data);
  }

  async function deleteBand(id: string) {
    const ref = doc(db, "bands", id);
    return deleteDoc(ref);
  }

  return { getBands, getBandById, createBand, updateBand, deleteBand }
}