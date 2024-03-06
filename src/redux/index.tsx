import { configureStore } from '@reduxjs/toolkit';
import { rtkQueryErrorLogger } from './errorMiddleware';
import { RootApi } from './apis/root.api';
import commonReducer from './slice/commonSlice';
import { RootApiWithoutAuth } from './apis/rootWithoutAuth.api';

export const store = configureStore({
  reducer: {
    common: commonReducer,
    [RootApi.reducerPath]: RootApi.reducer,
    [RootApiWithoutAuth.reducerPath]: RootApiWithoutAuth.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([rtkQueryErrorLogger, RootApi.middleware, RootApiWithoutAuth.middleware]),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
