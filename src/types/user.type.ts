import { type DocumentData } from "firebase/firestore";

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
  firsname: string;
  lastname: string;
  instruments: string[]
}

export interface IBand extends DocumentData {
  id: string;
  name: string;
  musicians: IMusician[]
}