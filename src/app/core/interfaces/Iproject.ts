import { UserInfo } from "os";
import { IProjectCategory } from "./Iproject-category";
import { IuserInfo } from "./IuserInfo.interface";

export interface Iproject {
  id: number;
  title: string;
	link: string;
	description: string;
	imageUrl: string;
	author: IuserInfo;
  categories: Array<IProjectCategory>
}
