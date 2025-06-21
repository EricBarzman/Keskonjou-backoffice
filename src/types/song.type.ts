import { type DocumentData } from "firebase/firestore";

export interface IStyle extends DocumentData {
  id: string;
  name: string
}

export interface IMood extends DocumentData {
  id: string;
  name: string;
}

export interface ISong extends DocumentData {
  id: string;
  title: string;
  duration?: number;                 // en secondes
  styleId?: string;
  moodId?: string;
  instrumentsNotRequired?: string[]; // id des instrus
  hasSolo?: boolean;
  partitionPath? : string;
}

export interface ISetList extends DocumentData {
  id: string;
  title: string;
  duration: number;                 // en secondes
  instrumentsNotRequired: string[]; // Id des instrus
  songs: string[];
  createdAt: Date;
}