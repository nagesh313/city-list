export interface IPageRequest extends IPage {
  numberOfElements: number;
  totalElements: number;
}
export interface IPage {
  page: number;
  pageSize: number;
}
