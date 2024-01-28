import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

import { IPaginationResponse } from '@/types/api';
import { deleteKeyNil } from '@/utils';
import axios from '@/utils/axios';
import { useInfiniteQuery as useInfiniteQueryBase } from '@tanstack/react-query';

interface Options {
  limit?: number;
  params?: object;
}

export const useInfiniteQuery = <Data = any>(updater: any, url: string | null, option?: Options) => {
  const { ref, inView } = useInView();
  const { fetchNextPage, isFetching, ...infinite } = useInfiniteQueryBase(
    updater,
    ({ pageParam = 1 }) =>
      url
        ? axios.get<IPaginationResponse<Data>>(url, {
            params: deleteKeyNil({
              limit: option?.limit ?? 10,
              page: pageParam,
              ...option?.params,
            }),
          })
        : undefined,
    {
      getPreviousPageParam: (firstPage) => firstPage?.data.prevPage ?? undefined,
      getNextPageParam: (lastPage) => lastPage?.data.nextPage ?? undefined,
      cacheTime: 0,
      refetchInterval: false,
      refetchOnWindowFocus: false,
    }
  );

  useEffect(() => {
    if (!isFetching && inView) {
      fetchNextPage();
    }
  }, [inView, isFetching, fetchNextPage]);

  return { ...infinite, fetchNextPage, isFetching, ref };
};
