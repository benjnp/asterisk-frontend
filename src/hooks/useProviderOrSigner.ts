import { useMemo } from 'react';
import { useAccount, useProvider, useSigner } from 'wagmi';
import { Provider, Web3Provider } from 'zksync-web3';

import { useActiveChainId } from './useActiveChainId';

export const useProviderOrSigner = (withSignerIfPossible = true) => {
  const { chainId } = useActiveChainId();
  const provider = useProvider({ chainId });
  const { address, isConnected } = useAccount();
  const { data: signer } = useSigner();

  return useMemo(
    () => (withSignerIfPossible && address && isConnected && signer ? signer : provider),
    [address, isConnected, provider, signer, withSignerIfPossible]
  );
};

export const useZksyncProvider = (withSignerIfPossible = true) => {
  const { isConnected } = useAccount();

  return useMemo(
    () => {
      const rpc = process.env.NEXT_PUBLIC_CHAIN_ID === '280' ? 'https://testnet.era.zksync.dev' : 'https://mainnet.era.zksync.io'
      const zksyncProvider = withSignerIfPossible && isConnected ? new Web3Provider(window.ethereum as any).getSigner() : new Provider(rpc);
      return zksyncProvider
    },
    [withSignerIfPossible, isConnected]
  );
}
