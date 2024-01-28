import { useMemo } from 'react';
import { useConnect } from 'wagmi';

import { ConnectorNames, wallets } from '@/config/constants';
import { useChangeModal } from '@/store/modal';

export const useWallet = () => {
  const { connectors } = useConnect();
  const { setWallet } = useChangeModal();

  const finalWallets = useMemo(() => {
    return wallets.map((config) => {
      const found = connectors.find((c) => c.id === config.connectorId);
      if (!(config.installed || found?.ready)) {
        if (config.connectorId === ConnectorNames.MetaMask) {
          return {
            ...config,
            connectorId: ConnectorNames.Injected,
          };
        }
        return {
          ...config,
          priority: 999,
        };
      }
      return config;
    });
  }, [connectors]);

  const connect = () => {
    setWallet(true);
  };

  return { wallets: finalWallets, connect, setWallet };
};
