import BigNumber from 'bignumber.js';
import { useMemo } from 'react';
import useSWR from 'swr';

import { FAST_INTERVAL } from '@/config/constants';
import { BIG_ZERO } from '@/utils/bigNumber';
import { ethRpcProvider } from '@/utils/providers';
import { Zero } from '@ethersproject/constants';

import { useTokenContract } from './useContract';
import { useSWRContract } from './useSWRContract';
import { useWeb3React } from './useWeb3React';
import { useZksyncProvider } from './useProviderOrSigner';

export const useTokenBalance = (tokenAddress: string, forceBSC?: boolean) => {
  const { account } = useWeb3React();

  const contract = useTokenContract(tokenAddress, false);

  const key = useMemo(
    () =>
      account
        ? {
          contract: forceBSC ? contract?.connect(ethRpcProvider) : contract,
          methodName: 'balanceOf',
          params: [account],
        }
        : null,
    [account, contract, forceBSC]
  );

  const { data, status, ...rest } = useSWRContract(key as any, {
    refreshInterval: FAST_INTERVAL,
  });

  return {
    ...rest,
    fetchStatus: status,
    balance: data ? new BigNumber(data.toString()) : BIG_ZERO,
  };
};

export const useNativeBalance = () => {
  const { account = '' } = useWeb3React();
  const { status, data, mutate } = useSWR([account, 'nativeTokenBalance'], async () => {
    return ethRpcProvider.getBalance(account);
  });

  return { balance: (data || Zero).toString(), fetchStatus: status, refresh: mutate };
};

export const useBusdBalance = () => {
  const { chainId } = useWeb3React();
  const token: { [ky: number]: string } = {
    56: '0xe9e7cea3dedca5984780bafc599bd69add087d56',
    97: '0xed24fc36d5ee211ea25a80239fb8c4cfd80f12ee',
  };
  return useTokenBalance(token[chainId || 56]);
};

export const useEthBalance = () => {
  const { account = '' } = useWeb3React();
  const { status, data, mutate } = useSWR([account, 'ethBalance'], async () => {
    return ethRpcProvider.getBalance(account);
  });

  return { balance: (data || Zero).toString(), fetchStatus: status, refresh: mutate };
};

export const useNativeBalanceZksync = () => {
  const { account = '' } = useWeb3React();
  const signer = useZksyncProvider(true)
  const { status, data, mutate } = useSWR([account, 'nativeTokenBalanceZksync'], async () => {
    return signer.getBalance('0x0000000000000000000000000000000000000000');
  });

  return { balance: (data || Zero).toString(), fetchStatus: status, refresh: mutate };
};
