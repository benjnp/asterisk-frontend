import Image from 'next/image';
import styled from 'styled-components';

import Currency from '@/components/Currency';
import { useActiveWeb3React } from '@/hooks/useActiveWeb3React';
import useAuth from '@/hooks/useAuth';
import { useNativeBalance } from '@/hooks/useTokenBalance';
import { formatAddress } from '@/utils/address';
import { copyText } from '@/utils/copyText';

const StyledMenu = styled.div`
  border-radius: 16px;
`;
const StyledDisconnect = styled.button`
  background: linear-gradient(180deg, #7e7e7e 0%, #c5c5c5 100%);
`;

interface Props {
  onDismiss?: () => void;
}

const WalletMenu = ({ onDismiss }: Props) => {
  const { logout } = useAuth();
  const { account } = useActiveWeb3React();
  const { balance } = useNativeBalance();

  function handleLogout() {
    logout();
    onDismiss?.();
  }
  return (
    <StyledMenu className="flex flex-col mt-4">
      <div className="flex justify-between items-center p-6.5 px-10 font-bold text-xl">
        <div className="text-2xl">My Wallet</div>
        <div className="flex items-center">
          <div className="pr-3">{formatAddress(account)}</div>
          <Image
            className="cursor-pointer"
            onClick={() => copyText(account || '')}
            src="/icons/copy.svg"
            width={28}
            height={30}
            alt=""
          />
        </div>
      </div>
      <div className="border-t-2 border-[#68A3F4]" />
      <div className="p-10 py-15.5">
        <div>
          <div className="font-medium text-xl">Token balance</div>
          <div className="mt-4 px-5 py-4 rounded-6xl flex items-center justify-center gap-2">
            <div className="font-bold text-2xl">
              <Currency value={balance} isWei />
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center pt-10 gap-y-2">
          <StyledDisconnect className="px-9 py-4 rounded-6xl" onClick={handleLogout}>
            <div className="font-bold text-2xl">Disconnect</div>
          </StyledDisconnect>
        </div>
      </div>
    </StyledMenu>
  );
};

export default WalletMenu;
