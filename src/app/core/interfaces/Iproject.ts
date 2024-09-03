import { IProjectCategory } from "./Iproject-category";

export interface Iproject {
  id: number;
  title: string;
	link: string;
	description: string;
	imageUrl: string;
	userId: Number;
  categories: Array<IProjectCategory>
}
