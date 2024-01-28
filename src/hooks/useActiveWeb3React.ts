import { NextRouter, useRouter } from 'next/router';
import { useEffect } from 'react';
import { useProvider } from 'wagmi';

import { targetChainId } from '@/config';
import { isChainSupported } from '@/utils/wagmi';

import { useActiveChainId } from './useActiveChainId';
import { useSwitchNetworkLoading } from './useSwitchNetworkLoading';
import { useWeb3React } from './useWeb3React';

const getHashFromRouter = (router: NextRouter) => {
  return router.asPath.match(/#([a-z0-9]+)/gi);
};

export function useNetworkConnectorUpdater() {
  const { chainId = -1, isConnecting } = useActiveWeb3React();
  const [loading] = useSwitchNetworkLoading();
  const router = useRouter();

  useEffect(() => {
    if (loading || !router.isReady || isConnecting) return;
    const parsedQueryChainId = Number(router.query.chainId);
    if (!parsedQueryChainId && chainId === targetChainId) return;
    if (parsedQueryChainId !== chainId && isChainSupported(chainId)) {
      const uriHash = getHashFromRouter(router)?.[0];
      router.replace(
        {
          query: {
            ...router.query,
            chainId,
          },
          ...(uriHash && { hash: uriHash }),
        },
        undefined
      );
    }
  }, [chainId, isConnecting, loading, router]);
}

/**
 * Provides a web3 provider with or without user's signer
 * Recreate web3 instance only if the provider change
 */
export const useActiveWeb3React = () => {
  const web3React = useWeb3React();
  const { chainId, isWrongNetwork } = useActiveChainId();
  const provider = useProvider({ chainId });

  return {
    provider,
    ...web3React,
    chainId,
    isWrongNetwork,
  };
};
