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
import type { IGig, IGigNested } from '../../types/gig.type';


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

  async function getGigByIdNested(id: string) {
    const ref = doc(db, "gigs", id);
    const snap = await getDoc(ref);

    // Get external attributes --eg join-
    // Costumes
    let costumes: unknown = [];
    if (snap.data()!.costumes.length > 0) {
      const refCostume = collection(db, "costumes");
      const allCostumes = await getDocs(refCostume);
      costumes = allCostumes.docs
        .map(doc => Object.assign({}, { id: doc.id }, doc.data()))
        .filter(costume => snap.data()!.costumes.includes(costume.id))
    }

    // Setlists
    let setlists: unknown = [];
    if (snap.data()!.setlists.length > 0) {
      const refCostume = collection(db, "setlists");
      const allCostumes = await getDocs(refCostume);
      setlists = allCostumes.docs
        .map(doc => Object.assign({}, { id: doc.id }, doc.data()))
        .filter(setlist => snap.data()!.setlists.includes(setlist.id))
    }

    // Bands
    let bands: unknown = [];
    if (snap.data()!.bands.length > 0) {
      const refCostume = collection(db, "bands");
      const allCostumes = await getDocs(refCostume);
      bands = allCostumes.docs
        .map(doc => Object.assign({}, { id: doc.id }, doc.data()))
        .filter(band => snap.data()!.bands.includes(band.id))
    }

    return {
      ...snap.data(),
      id,
      costumes,
      bands,
      setlists,
    } as unknown as IGigNested
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

  return { getGigs, getGigById, getGigByIdNested, createGig, updateGig, deleteGig }
}