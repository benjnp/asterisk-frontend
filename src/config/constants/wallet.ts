import {
  BinanceChainIcon,
  BloctoIcon,
  BraveIcon,
  Coin98Icon,
  CoinbaseWalletIcon,
  MathWalletIcon,
  MetamaskIcon,
  OperaIcon,
  SafePalIcon,
  TokenPocketIcon,
  TrustWalletIcon,
  WalletConnectIcon,
} from '@/components/Svg';

import { WalletConfig } from './';

export enum ConnectorNames {
  MetaMask = 'metaMask',
  Injected = 'injected',
  WalletConnect = 'walletConnect',
  BSC = 'bsc',
  Blocto = 'blocto',
  WalletLink = 'coinbaseWallet',
}

export const wallets: WalletConfig<ConnectorNames>[] = [
  {
    title: 'Metamask',
    icon: MetamaskIcon,
    downloadLink: { desktop: 'https://metamask.io/download/' },
    installed: typeof window !== 'undefined' && Boolean(window.ethereum?.isMetaMask),
    connectorId: ConnectorNames.MetaMask,
    priority: 1,
  },
  {
    title: 'Trust Wallet',
    icon: TrustWalletIcon,
    connectorId: ConnectorNames.Injected,
    downloadLink: {
      desktop: 'https://chrome.google.com/webstore/detail/trust-wallet/egjidjbpglichdcondbcbdnbeeppgdph',
    },
    installed:
      typeof window !== 'undefined' &&
      (Boolean(window.ethereum?.isTrust) ||
        // @ts-ignore
        Boolean(window.ethereum?.isTrustWallet)),
    priority: 4,
  },
  {
    title: 'WalletConnect',
    icon: WalletConnectIcon,
    connectorId: ConnectorNames.WalletConnect,
    priority: 5,
  },
  {
    title: 'Coinbase Wallet',
    icon: CoinbaseWalletIcon,
    connectorId: ConnectorNames.WalletLink,
    priority: 3,
  },
  {
    title: 'Opera Wallet',
    icon: OperaIcon,
    connectorId: ConnectorNames.Injected,
    downloadLink: {
      desktop: 'https://www.opera.com/crypto/next',
    },
    priority: () => {
      return typeof window !== 'undefined' && Boolean(window.ethereum?.isOpera) ? 0 : 6;
    },
    installed: typeof window !== 'undefined' && Boolean(window.ethereum?.isOpera),
  },
];
