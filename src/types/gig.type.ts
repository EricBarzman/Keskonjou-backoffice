import { type DocumentData } from "firebase/firestore";
import type { ISetlist } from "./song.type";
import type { IBand } from "./people.type";

export interface ICostume extends DocumentData {
  id: string;
  name: string;
}

export interface IGig extends DocumentData {
  id: string;
  title: string;
  place: string;
  setlists : string[];
  costumes: string[];
  bands: string[];
  date: Date;
}

export interface IGigNested extends DocumentData {
  id: string;
  title: string;
  place: string;
  setlists : ISetlist[];
  costumes: ICostume[];
  bands: IBand[];
  date: Date;
}