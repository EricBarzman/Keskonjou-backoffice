import { type DocumentData } from "firebase/firestore";

export interface IInstrument extends DocumentData {
  id: string;
  name: string;
  familyId: string;
}

export interface IInstrumentNested extends DocumentData {
  id: string;
  name: string;
  family: IFamily;
}

export interface IFamily extends DocumentData {
  id: string;
  name: string;
}