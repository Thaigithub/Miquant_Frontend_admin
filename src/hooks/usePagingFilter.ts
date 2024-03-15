import { PagingREQ, initialPagingState } from '../redux/paging.type';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export function usePagingFilter<T>(initialPaging: PagingREQ, initialFilter?: T) {
  const router = useRouter();
  const [paging, setPaging] = useState<PagingREQ>(initialPaging || initialPagingState);
  const [filter, setFilter] = useState<T & PagingREQ>({
    pageNumber: paging.pageNumber,
    pageSize: paging.pageSize,
    ...initialFilter,
  } as T & PagingREQ);

  const handleFilterChange = (filter: T & Record<string, string>, url?: string, tab?: string) => {
    setFilter({ ...(initialPaging || initialPagingState), ...filter } as T & PagingREQ);
    const query = new URLSearchParams(filter).toString();
    if (url) {
      router.push(
        `${url}?pageNumber=1&pageSize=${paging.pageSize}${tab ? `&tab=${tab}` : ''}&${query}`,
        {
          scroll: false,
        },
      );
    }
    setPaging((p) => ({ ...p, ...(initialPaging || initialPagingState) }));
  };

  const handlePageChange = (paging: PagingREQ, url?: string, tab?: string) => {
    setFilter((p) => ({ ...p, pageNumber: paging.pageNumber, pageSize: paging.pageSize }));
    setPaging((p) => ({ ...p, ...paging }));
    const { pageNumber: _, pageSize: __, ...k } = filter as T & PagingREQ;
    const query = new URLSearchParams(k as Record<string, string>).toString();
    if (url) {
      router.push(
        `${url}?pageNumber=${paging.pageNumber}&pageSize=${paging.pageSize}${
          tab ? `&tab=${tab}` : ''
        }&${query}`,
        {
          scroll: false,
        },
      );
    }
  };

  return {
    paging,
    filter,
    handleFilterChange,
    handlePageChange,
  };
}
