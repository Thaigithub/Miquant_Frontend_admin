import { ReadonlyURLSearchParams, usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import queryString from 'query-string';
import { PagingREQ, initialPagingState } from '../redux/paging.type';
import { removeEmptyParams } from '@/utils/helpers/params.helpers';
type PagingFiletrType<T> = {
  initialPaging?: PagingREQ;
  initialFilter?: T;
};
export function useFilter<T>({
  initialPaging = initialPagingState,
  initialFilter,
}: PagingFiletrType<T>) {
  const [filter, setFilter] = useState<T & PagingREQ>({
    ...initialPaging,
    ...initialFilter,
  } as T & PagingREQ);
  const router = useRouter();
  const searchParams = useSearchParams() as ReadonlyURLSearchParams;
  const pathname = usePathname();
  // when filter change, update url by new filter
  const handleFilterChange = (filter: T & Record<string, string>) => {
    const newParams = { ...filter, ...initialPaging };
    router.push(`${pathname}?${queryString.stringify(removeEmptyParams(newParams))}`, {
      scroll: false,
    });
  };
  // when paging change, update url by new paging
  const handlePageChange = (paging: PagingREQ) => {
    const newParams = { ...filter, ...paging };
    router.push(`${pathname}?${queryString.stringify(removeEmptyParams(newParams))}`, {
      scroll: true,
    });
  };
  // when url change, update filter by new url
  useEffect(() => {
    let params: any = queryString.parse(window.location.search);
    if (!params.pageNumber || !params.pageSize) {
      params = { ...params, ...initialPagingState };
    }

    setFilter(params as T & PagingREQ);
  }, [searchParams]);
  return {
    filter,
    handleFilterChange,
    handlePageChange,
  };
}
