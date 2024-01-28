import { useMemo } from 'react';
import { useAccount } from 'wagmi';

import { useSingleCallResult } from '@/store/multicall/hooks';
import { callWithEstimateGas } from '@/utils/estimateGas';

import { useNFTContract } from './useContract';

export function useOwnerOf(nftAddress: string, tokenId?: string) {
  const contract = useNFTContract(nftAddress, false);
  const inputs = useMemo(() => [tokenId], [tokenId]);
  const owner = useSingleCallResult(contract, 'ownerOf', inputs).result;

  return useMemo(
    () => (nftAddress && owner && tokenId ? (owner?.[0] as unknown as string) : undefined),
    [nftAddress, owner, tokenId]
  );
}

function useIsApproveForAll(nftAddress: string, owner?: string, spender?: string): boolean | undefined {
  const contract = useNFTContract(nftAddress, false);
  const inputs = useMemo(() => [owner, spender], [owner, spender]);
  const isApprove = useSingleCallResult(contract, 'isApprovedForAll', inputs).result;

  return useMemo(
    () => (nftAddress && isApprove ? (isApprove?.[0] as unknown as boolean) : undefined),
    [nftAddress, isApprove]
  );
}

export function useNFT(nftAddress: string, marketPlaceAddress: string) {
  const { address } = useAccount();
  const isApproveForAll = useIsApproveForAll(nftAddress, address, marketPlaceAddress);
  const nftContract = useNFTContract(nftAddress, true);
  const setApproveForAll = () => {
    if (!nftContract) return;
    return callWithEstimateGas(nftContract, 'setApprovalForAll', [marketPlaceAddress, true]);
  };

  return { isApproveForAll, setApproveForAll };
}
