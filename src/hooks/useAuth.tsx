import { useCallback } from 'react';
import {
  ConnectorNotFoundError,
  useConnect,
  useDisconnect,
  UserRejectedRequestError,
} from 'wagmi';

import { connectorLocalStorageKey } from '@/config';
import { ConnectorNames } from '@/config/constants';
import { useUserAction } from '@/store/user';
import { replaceBrowserHistory } from '@/utils/replaceBrowserHistory';

import { useActiveChainId } from './useActiveChainId';
import { useSessionChainId } from './useSessionChainId';

const useAuth = () => {
  const { connectAsync, connectors } = useConnect();
  const { disconnectAsync } = useDisconnect();
  const { chainId } = useActiveChainId();
  const [, setSessionChainId] = useSessionChainId();
  const { resetUser } = useUserAction();

  const login = useCallback(
    async (connectorID: ConnectorNames) => {
      const findConnector = connectors.find((c) => c.id === connectorID);
      try {
        const connected = await connectAsync({ connector: findConnector, chainId });
        if (!connected.chain.unsupported && connected.chain.id !== chainId) {
          replaceBrowserHistory('chainId', connected.chain.id);
          setSessionChainId(connected.chain.id);
        }
      } catch (error) {
        console.error(error);
        window?.localStorage?.removeItem(connectorLocalStorageKey);
        if (error instanceof ConnectorNotFoundError) {
          return;
        }
        if (error instanceof UserRejectedRequestError) {
          return;
        }
        if (error instanceof Error) {
          console.error(error.message, 'Please authorize to access your account');
        }
      }
    },
    [connectors, connectAsync, chainId, setSessionChainId]
  );

  const logout = useCallback(async () => {
    try {
      resetUser();
      await disconnectAsync();
    } catch (error) {
      console.error(error);
    }
  }, [disconnectAsync, resetUser]);

  return { login, logout };
};

export default useAuth;
