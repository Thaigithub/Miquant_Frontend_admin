import { configureStore } from '@reduxjs/toolkit';
import { rtkQueryErrorLogger } from './errorMiddleware';

export const store = configureStore({
  reducer: {},
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([rtkQueryErrorLogger]),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
