import { useMemo } from 'react';

import { useSingleCallResult } from '@/store/multicall/hooks';

import { useTokenContract } from './useContract';

export function useTokenAllowance(token: string, owner?: string, spender?: string): string | undefined {
  const contract = useTokenContract(token, false);

  const inputs = useMemo(() => [owner, spender], [owner, spender]);
  const allowance = useSingleCallResult(contract, 'allowance', inputs).result;

  return useMemo(() => (token && allowance ? allowance.toString() : undefined), [token, allowance]);
}
