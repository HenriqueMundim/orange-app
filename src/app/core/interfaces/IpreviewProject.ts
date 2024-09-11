import { IProjectCategory } from "./Iproject-category";
import { IuserInfo } from "./IuserInfo.interface";

export interface IpreviewProject {
    title: string;
    link: string;
    description: string;
    imageUrl: string;
    author: IuserInfo;
    categories: Array<IProjectCategory>
}
