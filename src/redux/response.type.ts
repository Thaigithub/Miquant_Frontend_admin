export type BaseResponse<T> = {
  error: boolean;
  data: T;
};

export type ListResponse<T> = {
  data: {
    data: T[];
    pageInfo: {
      total: number;
    };
  };
  error: boolean;
};

export type ListResponseData<T> = {
  data: T[];
  total: number;
};
