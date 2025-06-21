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
import type { IFamily } from '../../types/instrument.type';


export function useFamilies() {

  async function getFamilies() {
    const ref = collection(db, "families");
    const snap = await getDocs(
      query(ref, orderBy('name'))
    );

    return snap.docs.map(doc => Object.assign({}, { id: doc.id }, doc.data())) as IFamily[]
  }

  async function getFamilyById(id: string) {
    const ref = doc(db, "families", id);
    const snap = await getDoc(ref);
    return { ...snap.data, id } as IFamily
  }

  async function createFamily(data: DocumentData) {
    const ref = collection(db, "families");
    return addDoc(ref, data);
  }

  async function updateFamily(id: string, data: DocumentData) {
    const ref = doc(db, "families", id);
    return updateDoc(ref, data);
  }

  async function deleteFamily(id: string) {
    const ref = doc(db, "families", id);
    return deleteDoc(ref);
  }

  return { getFamilies, getFamilyById, createFamily, updateFamily, deleteFamily }
}