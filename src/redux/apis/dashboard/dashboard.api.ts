import { HTTP_METHOD } from '@/utils/constants/http.constant';
import { TAG_TYPES } from '@/utils/constants/api.tagTypes.constant';
import { ListResponseData } from '../../response.type';
import { RootApiWithoutAuth } from '../rootWithoutAuth.api';
import { DashboardResponse } from './dashboard.response';

const dashboardApi = RootApiWithoutAuth.enhanceEndpoints({
  addTagTypes: [TAG_TYPES.DASHBOARD],
}).injectEndpoints({
  endpoints: (build) => ({
    getInfoDashboard: build.query<DashboardResponse[], string>({
      query: (url) => ({
        url: url,
        method: HTTP_METHOD.GET,
      }),
      transformResponse: (res: ListResponseData<DashboardResponse>) => {
        return res.data.data;
      },
      providesTags: [TAG_TYPES.DASHBOARD],
    }),
  }),
});

export const { useGetInfoDashboardQuery } = dashboardApi;
