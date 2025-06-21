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
import type { ICostume } from '../../types/gig.type';


export function useCostumes() {

  async function getCostumes() {
    const ref = collection(db, "costumes");
    const snap = await getDocs(
      query(ref, orderBy('name'))
    );

    return snap.docs.map(doc => Object.assign({}, { id: doc.id }, doc.data())) as ICostume[]
  }

  async function getCostumeById(id: string) {
    const ref = doc(db, "costumes", id);
    const snap = await getDoc(ref);
    return { ...snap.data, id } as ICostume
  }

  async function createCostume(data: DocumentData) {
    const ref = collection(db, "costumes");
    return addDoc(ref, data);
  }

  async function updateCostume(id: string, data: DocumentData) {
    const ref = doc(db, "costumes", id);
    return updateDoc(ref, data);
  }

  async function deleteCostume(id: string) {
    const ref = doc(db, "costumes", id);
    return deleteDoc(ref);
  }

  return { getCostumes, getCostumeById, createCostume, updateCostume, deleteCostume }
}