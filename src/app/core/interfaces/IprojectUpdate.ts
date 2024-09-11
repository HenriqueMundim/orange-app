import { IProjectCategory } from "./Iproject-category";

export interface IprojectUpdate {
    id: number
    title: string;
    link: string;
    description: string;
    imageUrl: string;
    userId: Number;
    categories: Array<IProjectCategory>
}
