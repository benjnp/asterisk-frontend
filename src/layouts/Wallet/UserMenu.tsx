import styled from 'styled-components';

import { useActiveWeb3React } from '@/hooks/useActiveWeb3React';
import useModal from '@/hooks/useModal';
import { useWallet } from '@/hooks/useWallet';

// import { Dropdown } from 'antd';
import UserInfo from './UserInfo';

const StyledWallet = styled.button.attrs({
  className: 'flex items-center gap-x-5 h-18 font-bold text-2xl px-6',
})`
  border: 3px solid #43e3ff;
  border-radius: 3rem;
  background-color: #000000;
`;

const UserMenu: React.FC<React.PropsWithChildren> = () => {
  const { connect } = useWallet();
  const { account } = useActiveWeb3React();
  const { modal, setModalOpen } = useModal(<UserInfo onDismiss={() => setModalOpen(false)} />, {
    className: 'modal-wallet',
    closable: false,
    width: 526,
  });

  if (!account) {
    return (
      <StyledWallet onClick={connect}>
        <span className="tracking-wider ">Connect Wallet</span>
      </StyledWallet>
    );
  }

  return (
    <div>
      <div className="flex items-center gap-4">
        {/* <Dropdown overlay={<UserInfo />} className="hidden md:block -mt-1"> */}
        <StyledWallet onClick={() => setModalOpen(true)}>
          <div className="flex gap-2 items-center">
            <span className="tracking-wider ">My Wallet</span>
          </div>
        </StyledWallet>
        {modal}
        {/* </Dropdown> */}
      </div>
    </div>
  );
};

export default UserMenu;
