import { isDesktop, isMobile } from 'react-device-detect';
import styled from 'styled-components';

import { Link } from '@/components/Link';
import { Login, WalletConfig } from '@/config/constants';

interface Props<T> {
  wallet: WalletConfig<T>;
  login: Login<T>;
  onDismiss: () => void;
}

const WalletButton = styled.div`
  cursor: pointer;
  color: #000d21;
  background: #ffffff;
  border-radius: 2.625rem;
`;

const WalletCard = ({ wallet, login, onDismiss }: Props<any>) => {
  const { title, icon: Icon, installed, downloadLink } = wallet;

  let linkAction: any = {
    onClick: () => {
      login(wallet.connectorId);
      onDismiss();
    },
  };

  if (installed === false && isDesktop && downloadLink?.desktop) {
    linkAction = {
      as: Link,
      href: downloadLink.desktop,
      style: {
        textDecoration: 'none',
        display: 'flex',
        width: '100%',
      },
      target: '_blank',
      rel: 'noopener noreferrer',
    };
  }
  if (typeof window !== 'undefined' && !window.ethereum && wallet.href && isMobile) {
    linkAction = {
      style: {
        textDecoration: 'none',
      },
      as: Link,
      href: wallet.href,
      target: '_blank',
      rel: 'noopener noreferrer',
    };
  }

  return (
    <WalletButton className="flex justify-between items-center px-6 py-2" {...linkAction}>
      <div className="font-medium text-xl md:text-xl">{title}</div>
      <Icon width="44px" />
    </WalletButton>
  );
};

export default WalletCard;
