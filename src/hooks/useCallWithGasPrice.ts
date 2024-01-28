import get from 'lodash/get';
import { useCallback } from 'react';

import { GAS_PRICE_GWEI } from '@/config';
import { CallOverrides, Contract } from '@ethersproject/contracts';
import { TransactionResponse } from '@ethersproject/providers';

import { useActiveWeb3React } from './useActiveWeb3React';

export function useCallWithGasPrice() {
  const { chain } = useActiveWeb3React();

  const gasPrice = chain?.testnet ? GAS_PRICE_GWEI.testnet : GAS_PRICE_GWEI.default;

  /**
   * Perform a contract call with a gas price returned from useGasPrice
   * @param contract Used to perform the call
   * @param methodName The name of the method called
   * @param methodArgs An array of arguments to pass to the method
   * @param overrides An overrides object to pass to the method. gasPrice passed in here will take priority over the price returned by useGasPrice
   * @returns https://docs.ethers.io/v5/api/providers/types/#providers-TransactionReceipt
   */
  const callWithGasPrice = useCallback(
    async (
      contract: Contract,
      methodName: string,
      methodArgs: any[] = [],
      overrides: CallOverrides | null = null
    ): Promise<TransactionResponse> => {
      const contractMethod = get(contract, methodName);
      const hasManualGasPriceOverride = overrides?.gasPrice;
      const tx = await contractMethod(
        ...methodArgs,
        hasManualGasPriceOverride ? { ...overrides } : { ...overrides, gasPrice }
      );

      return tx;
    },
    [gasPrice]
  );

  return { callWithGasPrice };
}
