import { useEffect } from 'react';
import { useAccount, useClient, useConnect } from 'wagmi';

import store from '@/store';
import { useUserAction, useUserSelector } from '@/store/user';

const SAFE_ID = 'safe';
store?.getState();

const useEagerConnect = () => {
  const client = useClient();
  const { connectAsync, connectors } = useConnect();
  const { userInfo } = useUserSelector();
  const { address } = useAccount();
  const { resetUser } = useUserAction();

  useEffect(() => {
    if (address && userInfo && address.toLowerCase() !== userInfo.address) {
      resetUser();
    }
  }, [address, userInfo, resetUser]);

  useEffect(() => {
    const connected = Boolean(localStorage.getItem('wagmi.connected'));
    if (!connected) return;
    const connectorInstance = connectors.find((c) => c.id === SAFE_ID && c.ready);
    if (
      connectorInstance &&
      // @ts-ignore
      !window.cy
    ) {
      connectAsync({ connector: connectorInstance }).catch(() => {
        client.autoConnect();
      });
    } else {
      client.autoConnect();
    }
  }, [client, connectAsync, connectors]);
};

export default useEagerConnect;
