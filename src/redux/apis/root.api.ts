import { createApi } from '@reduxjs/toolkit/query/react';
import { getSession } from 'next-auth/react';
import { baseQueryWithAuth } from '../baseQueryWithAuth';

export const RootApi = createApi({
  reducerPath: 'RootApi',
  keepUnusedDataFor: 10,
  baseQuery: baseQueryWithAuth({
    baseUrl: `${process.env.NEXT_PUBLIC_API_URL}`,
    async prepareHeaders(headers) {
      const token = await getSession();
      if (token) {
        headers.set('authorization', `Bearer ${token?.user?.token}`);
      }
      return headers;
    },
  }),
  endpoints: () => ({}),
});
