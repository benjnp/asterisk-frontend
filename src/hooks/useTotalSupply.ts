import { useMemo } from 'react';

import { useSingleCallResult } from '@/store/multicall/hooks';

import { useTokenContract } from './useContract';

// returns undefined if input token is undefined, or fails to get token contract,
// or contract total supply cannot be fetched
export function useTotalSupply(token: string): string | undefined {
  const contract = useTokenContract(token, false);

  const totalSupplyStr: string | undefined = useSingleCallResult(contract, 'totalSupply')?.result?.[0]?.toString();

  return useMemo(() => (token && totalSupplyStr ? totalSupplyStr : undefined), [token, totalSupplyStr]);
}
