import { Iproject } from "./Iproject";

export interface Ipage {
  projects: Array<Iproject>,
  currentPage: number,
  totalPages: number
}
