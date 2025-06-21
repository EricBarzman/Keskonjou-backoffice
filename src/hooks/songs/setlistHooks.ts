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
import type { ISetlist } from '../../types/song.type';


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
    return { ...snap.data, id } as ISetlist
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

  return { getSetlists, getSetlistById, createSetlist, updateSetlist, deleteSetlist }
}