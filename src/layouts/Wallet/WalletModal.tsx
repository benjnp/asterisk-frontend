import { Modal } from 'antd';

import { Box } from '@/components/Layout';
import WalletCard from '@/components/widgets/WalletCard';
import useAuth from '@/hooks/useAuth';
import { useWallet } from '@/hooks/useWallet';
import { useChangeModal, useSelectModal } from '@/store/modal';

const WalletModal: React.FC<React.PropsWithChildren> = () => {
  const { wallet: open } = useSelectModal();
  const { wallets } = useWallet();
  const { setWallet } = useChangeModal();
  const { login } = useAuth();

  const dismiss = () => {
    setWallet(false);
  };

  return (
    <>
      <Modal
        title={null}
        open={open}
        onCancel={() => setWallet(false)}
        footer={null}
        className="modal-wallet"
        width={620}
      >
        <div className="py-6 text-center font-bold text-xl md:text-[2rem]">Connect Wallet</div>
        <div className="border-t-2 border-[#68A3F4]" />
        <div className="px-15 py-16 grid gap-6">
          {wallets.map((wallet) => (
            <Box key={wallet.title}>
              <WalletCard wallet={wallet} login={login} onDismiss={dismiss} />
            </Box>
          ))}
        </div>
      </Modal>
    </>
  );
};

export default WalletModal;
