import memoize from 'lodash/memoize';
import { configureChains, createClient } from 'wagmi';
import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet';
import { InjectedConnector } from 'wagmi/connectors/injected';
import { MetaMaskConnector } from 'wagmi/connectors/metaMask';
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect';
import { publicProvider } from 'wagmi/providers/public';

import { targetChainId } from '@/config';
import {
  avalandche,
  avalandcheFuji,
  bsc,
  bscTest,
  ethw,
  fantomOpera,
  fantomTestnet,
  goerli,
  mainnet,
  zkSyncMainnet,
  zkSyncTestnet,
} from '@/config/constants';

const CHAINS = [avalandche, avalandcheFuji, bsc, bscTest, ethw, fantomOpera, fantomTestnet, goerli, mainnet, zkSyncMainnet, zkSyncTestnet].filter(
  (chain) => chain.id === targetChainId
);

export const { provider, chains } = configureChains(CHAINS, [publicProvider()]);

export const injectedConnector = new InjectedConnector({
  chains,
  options: {
    shimDisconnect: false,
    shimChainChangedDisconnect: true,
  },
});

export const coinbaseConnector = new CoinbaseWalletConnector({
  chains,
  options: {
    appName: 'app',
    appLogoUrl: './logo.png',
  },
});

export const walletConnectConnector = new WalletConnectConnector({
  chains,
  options: {
    qrcode: true,
  },
});

export const metaMaskConnector = new MetaMaskConnector({
  chains,
  options: {
    shimDisconnect: false,
    shimChainChangedDisconnect: true,
  },
});

export const client = createClient({
  autoConnect: false,
  provider,
  connectors: [metaMaskConnector, injectedConnector, coinbaseConnector, walletConnectConnector],
});

export const CHAIN_IDS = chains.map((c) => c.id);

export const isChainSupported = memoize((chainId: number) => CHAIN_IDS.includes(chainId));
export const isChainTestnet = memoize((chainId: number) => chains.find((c) => c.id === chainId)?.testnet);
