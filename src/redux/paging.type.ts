export type PagingREQ = { pageNumber: number; pageSize: number };

export const initialPagingState: PagingREQ = {
  pageNumber: 1,
  pageSize: 10,
};
