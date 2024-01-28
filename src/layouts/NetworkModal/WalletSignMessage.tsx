import { Button, Modal, notification } from 'antd';
import { useCallback, useEffect, useState } from 'react';
import { useAccount, useNetwork, useSignMessage } from 'wagmi';

import { useActiveWeb3React } from '@/hooks/useActiveWeb3React';
import { getNonce, login } from '@/services/auth';
import { useUserAction, useUserSelector } from '@/store/user';

function SignInButton() {
  const [loading, setLoading] = useState(false);
  const [nonce, setNonce] = useState(false);

  const { setUserInfo } = useUserAction();
  const { address } = useAccount();
  const { chain: activeChain } = useNetwork();
  const { signMessageAsync } = useSignMessage();

  const fetchNonce = useCallback(async () => {
    if (!address) return;
    try {
      const nonceRes = await getNonce(address);
      setNonce(nonceRes.data.nonce);
    } catch (error: any) {
      notification.error({ message: error.message });
    }
  }, [setNonce, address]);

  // Pre-fetch random nonce when button is rendered
  // to ensure deep linking works for WalletConnect
  // users on iOS when signing the SIWE message
  useEffect(() => {
    fetchNonce();
  }, [fetchNonce]);

  const signIn = async () => {
    try {
      const chainId = activeChain?.id;
      if (!address || !chainId) return;

      setLoading(true);
      const msg = 'Welcome ';

      const signature = await signMessageAsync({
        message: `${msg}${nonce}`,
      });

      // Verify signature
      const verifyRes = await login(address, signature, msg);

      setUserInfo({ userInfo: verifyRes.data.user, tokens: verifyRes.data.tokens });
    } catch (error: any) {
      if (error.action === 'signMessage' && error.code === 'ACTION_REJECTED') {
        notification.error({ message: 'You declined the action in your wallet	' });
      } else {
        notification.error({ message: 'Something went wrong.' });
      }
      fetchNonce();
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button type="primary" disabled={!nonce || loading} onClick={signIn}>
        Signature to view
      </Button>
    </>
  );
}

export default function WalletSignMessage() {
  const { isConnected } = useAccount();
  const { isWrongNetwork } = useActiveWeb3React();
  const { userInfo, tokens } = useUserSelector();

  // const isShow = isConnected && !isWrongNetwork && (!userInfo?.address || !tokens?.access.token);
  const isShow = false;

  return (
    <Modal open={isShow} closable={false} className="modal-wallet" footer={null}>
      <div className="p-10">
        <div className="text-xl pb-5 text-center">Signature Required</div>
        <div>
          {`To using app, you must sign a message with your wallet. This is to ensure that you're actually you! Check your wallet for more instructions.`}
        </div>
        <div className="flex justify-center pt-5">{isShow && <SignInButton />}</div>
      </div>
    </Modal>
  );
}
