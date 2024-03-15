import { isRejectedWithValue } from '@reduxjs/toolkit';
import type { MiddlewareAPI, Middleware } from '@reduxjs/toolkit';
import { notification } from 'antd';
import { ErrorEnum } from '@/utils/enums/errors';

/**
 * Log a warning and show a toast!
 */
export const rtkQueryErrorLogger: Middleware = (api: MiddlewareAPI) => (next) => (action) => {
  if (isRejectedWithValue(action)) {
    if (action?.payload?.status !== 401) {
      notification.error({
        message: '오류', // Error
        description:
          action?.payload?.data?.message && action.payload.data.message in ErrorEnum
            ? ErrorEnum[action.payload.data.message as keyof typeof ErrorEnum]
            : '에러 발생됨.', // An error occurred.
      });
    }
  }

  return next(action);
};
