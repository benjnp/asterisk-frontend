import { Middleware, SWRConfig } from 'swr';

import { FetchStatus } from '@/config/constants';

export const SWRProviders: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <SWRConfig
      value={{
        use: [fetchStatusMiddleware, fetchLoadingMiddleware],
      }}
    >
      {children}
    </SWRConfig>
  );
};

const fetchStatusMiddleware: Middleware = (useSWRNext) => {
  return (key, fetcher, config) => {
    const swr = useSWRNext(key, fetcher, config);
    return Object.defineProperty(swr, 'status', {
      get() {
        let status = FetchStatus.Idle;

        if (!swr.isValidating && !swr.error && !swr.data) {
          status = FetchStatus.Idle;
        } else if (swr.isValidating && !swr.error && !swr.data) {
          status = FetchStatus.Fetching;
        } else if (swr.data) {
          status = FetchStatus.Fetched;
        } else if (swr.error && !swr.data) {
          status = FetchStatus.Failed;
        }
        return status;
      },
    });
  };
};

const fetchLoadingMiddleware: Middleware = (useSWRNext) => {
  return (key, fetcher, config) => {
    const swr = useSWRNext(key, fetcher, config);
    return Object.defineProperty(swr, 'isLoading', {
      get() {
        return swr.isValidating && !swr.error && !swr.data;
      },
    });
  };
};
