import useSWRBase from 'swr';
import { useAccount } from 'wagmi';

import { useUserSelector } from '@/store/user';
import axios from '@/utils/axios';

export const useSWR = <Data = any, Error = any>(url?: string | null, disableInterval?: boolean) =>
  useSWRBase<Data | undefined, Error>(url, axios, { refreshInterval: disableInterval ? 0 : 5000, errorRetryCount: 0 });

export const useSWRAuth = <Data = any, Error = any>(url: string) => {
  const { userInfo, tokens } = useUserSelector();
  const { address: account } = useAccount();
  return useSWR<Data, Error>(userInfo && account && tokens ? url : null);
};
