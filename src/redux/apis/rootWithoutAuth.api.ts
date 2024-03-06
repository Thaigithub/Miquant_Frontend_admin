import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const RootApiWithoutAuth = createApi({
  reducerPath: 'RootWithoutAuth',
  keepUnusedDataFor: 10,
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_URL}`,
  }),
  endpoints: () => ({}),
});
