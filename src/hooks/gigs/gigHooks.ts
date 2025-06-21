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
import type { IGig } from '../../types/gig.type';


export function useGigs() {

  async function getGigs() {
    const ref = collection(db, "gigs");
    const snap = await getDocs(
      query(ref, orderBy('title'))
    );

    return snap.docs.map(doc => Object.assign({}, { id: doc.id }, doc.data())) as IGig[]
  }

  async function getGigById(id: string) {
    const ref = doc(db, "gigs", id);
    const snap = await getDoc(ref);
    return { ...snap.data(), id } as IGig
  }

  async function createGig(data: DocumentData) {
    const ref = collection(db, "gigs");
    return addDoc(ref, data);
  }

  async function updateGig(id: string, data: DocumentData) {
    const ref = doc(db, "gigs", id);
    return updateDoc(ref, data);
  }

  async function deleteGig(id: string) {
    const ref = doc(db, "gigs", id);
    return deleteDoc(ref);
  }

  return { getGigs, getGigById, createGig, updateGig, deleteGig }
}