import { HTTP_METHOD } from '@/utils/constants/http.constant';
import { TAG_TYPES } from '@/utils/constants/api.tagTypes.constant';
import { BaseResponse } from '../../response.type';
import { RootApiWithoutAuth } from '../rootWithoutAuth.api';

const dashboardApi = RootApiWithoutAuth.enhanceEndpoints({
  addTagTypes: [TAG_TYPES.DASHBOARD],
}).injectEndpoints({
  endpoints: (build) => ({
    getInfoDashboard: build.query<any, string>({
      query: (url) => ({
        url: url,
        method: HTTP_METHOD.GET,
      }),
      transformResponse: (res: BaseResponse<any>) => {
        return res.data.count;
      },
      providesTags: [TAG_TYPES.DASHBOARD],
    }),
  }),
});

export const { useGetInfoDashboardQuery } = dashboardApi;
