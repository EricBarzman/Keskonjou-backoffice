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
import type { IUser, IUserNested } from '../../types/people.type';


export function useUsers() {

  async function getUsers() {
    const ref = collection(db, "users");
    const snap = await getDocs(
      query(ref, orderBy('username'))
    );

    return snap.docs.map(doc => Object.assign({}, { id: doc.id }, doc.data())) as IUser[]
  }

  async function getUserById(id: string) {
    const ref = doc(db, "users", id);
    const snap = await getDoc(ref);
    return { ...snap.data(), id } as IUser
  }

  async function getUserByIdNested(id: string) {
    const ref = doc(db, "users", id);
    const snap = await getDoc(ref);

    let musician = undefined;

    if (snap.data()!.musicianId) {
      const musicianRef = doc(db, "musicians", snap.data()!.musicianId);
      musician = await getDoc(musicianRef);
    }

    return {
      ...snap.data(),
      id,
      musician: musician
        ? {
          id: musician.id,
          ...musician.data()
        }
        : {}
    } as IUserNested
  }

  async function createUser(data: DocumentData) {
    const ref = collection(db, "users");
    return addDoc(ref, data);
  }

  async function updateUser(id: string, data: DocumentData) {
    const ref = doc(db, "users", id);
    return updateDoc(ref, data);
  }

  async function deleteUser(id: string) {
    const ref = doc(db, "users", id);
    return deleteDoc(ref);
  }

  return { getUsers, getUserById, getUserByIdNested, createUser, updateUser, deleteUser }
}