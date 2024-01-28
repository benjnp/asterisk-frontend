import { Alert, Button, Modal } from 'antd';
import { useAccount, useNetwork } from 'wagmi';

import { targetChainId } from '@/config';
import { useLocalNetworkChain } from '@/hooks/useActiveChainId';
import { useActiveWeb3React } from '@/hooks/useActiveWeb3React';
import useAuth from '@/hooks/useAuth';
import { useSwitchNetwork } from '@/hooks/useSwitchNetwork';

const WalletWrongNetwork = () => {
  const { isWrongNetwork } = useActiveWeb3React();
  const { switchNetworkAsync, canSwitch, isLoading } = useSwitchNetwork();
  const { chains } = useNetwork();
  const chainId = useLocalNetworkChain() || targetChainId;
  const { isConnected } = useAccount();
  const { logout } = useAuth();

  // const supportedMainnetChains = useMemo(() => chains.filter((chain) => !chain.testnet), [chains])

  return (
    <Modal open={isConnected && (isWrongNetwork || false)} closable={false} className="modal-wallet" footer={null}>
      <div className="p-5">
        <div className="text-xl pb-5 text-center">Check your network</div>
        <div>Currently only supported in {chains?.map((c) => c.name).join(', ')}</div>
        {canSwitch && (
          <Button
            type="primary"
            loading={isLoading}
            className="mt-6"
            onClick={() => {
              if (chains.map((c) => c.id).includes(chainId)) {
                switchNetworkAsync(chainId);
              } else {
                switchNetworkAsync(chains[0].id);
              }
            }}
          >
            {isLoading ? 'Switching network' : 'Switch network'}
          </Button>
        )}
        <Alert className="mt-6" message="Please switch your network to continue." type="warning" showIcon />
        {isConnected && (
          <Button className="mt-6" onClick={logout} type="primary" danger>
            {'Disconnect Wallet'}
          </Button>
        )}
      </div>
    </Modal>
  );
};

export default WalletWrongNetwork;
