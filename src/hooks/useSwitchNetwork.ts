import { notification } from 'antd';
import { useCallback, useMemo } from 'react';
import { useAccount, useSwitchNetwork as useSwitchNetworkWallet } from 'wagmi';

import { targetChainId } from '@/config';
import { ConnectorNames } from '@/config/constants';
import { replaceBrowserHistory } from '@/utils/replaceBrowserHistory';

import { useSessionChainId } from './useSessionChainId';
import { useSwitchNetworkLoading } from './useSwitchNetworkLoading';

export function useSwitchNetworkLocal() {
  const [, setSessionChainId] = useSessionChainId();
  return useCallback(
    (chainId: number) => {
      setSessionChainId(chainId);
      replaceBrowserHistory('chainId', chainId === targetChainId ? null : chainId);
    },
    [setSessionChainId]
  );
}

export function useSwitchNetwork() {
  const [loading, setLoading] = useSwitchNetworkLoading();
  const {
    switchNetworkAsync: _switchNetworkAsync,
    isLoading: _isLoading,
    switchNetwork: _switchNetwork,
    ...switchNetworkArgs
  } = useSwitchNetworkWallet();
  const { isConnected, connector } = useAccount();

  const switchNetworkLocal = useSwitchNetworkLocal();

  const switchNetworkAsync = useCallback(
    async (chainId: number) => {
      if (isConnected && typeof _switchNetworkAsync === 'function') {
        setLoading(true);
        return _switchNetworkAsync(chainId)
          .catch(() => {
            notification.error({ message: 'Error connecting, please retry and confirm in wallet!' });
          })
          .finally(() => setLoading(false));
      }
      return new Promise(() => {
        switchNetworkLocal(chainId);
      });
    },
    [isConnected, _switchNetworkAsync, setLoading, switchNetworkLocal]
  );

  const switchNetwork = useCallback(
    (chainId: number) => {
      if (isConnected && typeof _switchNetwork === 'function') {
        return _switchNetwork(chainId);
      }
      return switchNetworkLocal(chainId);
    },
    [_switchNetwork, isConnected, switchNetworkLocal]
  );

  const isLoading = _isLoading || loading;
  const canSwitch = useMemo(
    () =>
      isConnected
        ? !!_switchNetworkAsync &&
          connector?.id !== ConnectorNames.WalletConnect &&
          !(
            typeof window !== 'undefined' &&
            // @ts-ignore // TODO: add type later
            window.ethereum?.isSafePal
          )
        : true,
    [_switchNetworkAsync, isConnected, connector]
  );

  return {
    ...switchNetworkArgs,
    switchNetwork,
    switchNetworkAsync,
    isLoading,
    canSwitch,
  };
}
