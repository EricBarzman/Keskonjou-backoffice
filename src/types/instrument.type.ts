import { type DocumentData } from "firebase/firestore";

export interface IInstrument extends DocumentData {
  id: string;
  name: string;
  familyId: string;
}

export interface IFamily extends DocumentData {
  id: string;
  name: string;
}