import { isRejectedWithValue } from '@reduxjs/toolkit';
import type { MiddlewareAPI, Middleware } from '@reduxjs/toolkit';
import { notification } from 'antd';
import { ErrorEnum } from '@/utils/enums/errors';

export const rtkQueryErrorLogger: Middleware = (api: MiddlewareAPI) => (next) => (action:any) => {
  if (isRejectedWithValue(action)) {
    if (action?.payload?.status !== 401) {
      notification.error({
        message: 'Error',
        description:
          action?.payload?.data?.message && action.payload.data.message in ErrorEnum
            ? ErrorEnum[action.payload.data.message as keyof typeof ErrorEnum]
            : 'An error occurred.',
      });
    }
  }

  return next(action);
};
