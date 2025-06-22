import { type DocumentData } from "firebase/firestore";
import type { IInstrument } from "./instrument.type";

export interface IUser extends DocumentData {
  id: string;
  username: string
  musicianId: string;
  email: string;
  avatarId: string
  role: "user" | "admin"
}


export interface IMusician extends DocumentData {
  id: string;
  firstname: string;
  lastname: string;
  instruments: string[]
}

export interface IMusicianNested extends DocumentData {
  id: string;
  firstname: string;
  lastname: string;
  instruments: IInstrument[]
}

export interface IBand extends DocumentData {
  id: string;
  name: string;
  musicians: IMusician[]
}