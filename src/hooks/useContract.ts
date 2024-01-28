import { useMemo } from 'react';

import {
  AstNftSale,
  AstNftSale__factory,
  Erc20,
  Erc20__factory,
  Erc721,
  Erc721__factory,
  Multicall,
  Multicall__factory,
} from '@/config/abi/types';
import { getAddress } from '@/utils/address';
import { getContract } from '@/utils/ethers';
import { multicallAddresses } from '@/utils/multicall';
import { Contract } from '@ethersproject/contracts';

import { useActiveWeb3React } from './useActiveWeb3React';
import { useProviderOrSigner, useZksyncProvider } from './useProviderOrSigner';

export function useContract<T extends Contract = Contract>(
  address: string,
  ABI: any,
  withSignerIfPossible = true,
  isZksync = false
): T | null {
  const { provider } = useActiveWeb3React();

  const providerOrSigner = useProviderOrSigner(withSignerIfPossible) ?? provider;
  const providerOrSignerZksync = useZksyncProvider(withSignerIfPossible)

  const canReturnContract = useMemo(() => address && ABI && (providerOrSigner || providerOrSignerZksync), [address, ABI, providerOrSigner, providerOrSignerZksync]);

  return useMemo(() => {
    if (!canReturnContract) return null;
    try {
      return getContract(address, ABI, isZksync ? providerOrSignerZksync : providerOrSigner);
    } catch (error) {
      console.error('Failed to get contract', error);
      return null;
    }
  }, [address, ABI, providerOrSigner, canReturnContract, isZksync, providerOrSignerZksync]) as T;
}

export function useTokenContract(tokenAddress: string, withSignerIfPossible?: boolean) {
  return useContract<Erc20>(tokenAddress, Erc20__factory.abi, withSignerIfPossible);
}

export function useMulticallContract() {
  const { chainId } = useActiveWeb3React();
  return useContract<Multicall>(getAddress(multicallAddresses, chainId), Multicall__factory.abi, false);
}

export function useNFTContract(nftAddress: string, withSignerIfPossible?: boolean) {
  return useContract<Erc721>(nftAddress, Erc721__factory.abi, withSignerIfPossible);
}

export function useAstNftSaleContract(address: string, withSignerIfPossible?: boolean) {
  return useContract<AstNftSale>(address, AstNftSale__factory.abi, withSignerIfPossible, true);
}
