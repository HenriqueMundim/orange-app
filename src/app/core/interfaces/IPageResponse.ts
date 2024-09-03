import { IPageable } from './IPageable';

export interface IPageResponse<Iproject> {
  totalElements: number;
  totalPages: number;
  size: number;
  content: Array<Iproject>;
  number: number;
  sort: {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
  };
  numberOfElements: number;
  first: boolean;
  last: boolean;
  pageable: IPageable;
  empty: boolean;
}
