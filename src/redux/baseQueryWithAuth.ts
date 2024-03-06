import { FetchBaseQueryArgs } from '@reduxjs/toolkit/dist/query/fetchBaseQuery';
import { fetchBaseQuery } from '@reduxjs/toolkit/query';
import type { BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { signOut } from 'next-auth/react';
import nProgress from 'nprogress';

const nProgressHandler = (type: 'start' | 'stop') => {
  if (typeof window !== 'object') return;
  if (type === 'start') nProgress.start();
  else nProgress.done();
};

export const baseQueryWithAuth: (option: FetchBaseQueryArgs) => BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> =
  (option) => async (args, api, extraOptions) => {
    nProgressHandler('start');
    const result = await fetchBaseQuery(option)(args, api, extraOptions);
    if (result.error && result.error.status === 401) {
      // message.info('Session expired, please signin again');
      signOut();
    }
    nProgressHandler('stop');
    return result;
  };
