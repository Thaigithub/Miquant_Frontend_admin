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
  error: boolean;
  data: {
    data: T[];
    total: number;
  };
};
