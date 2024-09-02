import { ListItem } from "ng-multiselect-dropdown/multiselect.model";
import { IProjectCategory } from "./Iproject-category";

export interface IprojectRegister {
	title: string;
	link: string;
	description: string;
	imageUrl: string;
	userId: Number;
  categories: Array<IProjectCategory>
}
