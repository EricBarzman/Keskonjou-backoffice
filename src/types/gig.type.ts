import { type DocumentData } from "firebase/firestore";
import type { ISetList } from "./song.type";

export interface ICostume extends DocumentData {
  id: string;
  name: string;
}

export interface IGig extends DocumentData {
  id: string;
  title: string;
  place: string;
  setLists : ISetList[];
  costumes: ICostume[];
  bands: string[];
  date: Date;
}