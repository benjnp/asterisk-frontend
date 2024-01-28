import { Chain } from 'wagmi';
import { goerli as goerli2, mainnet, zkSyncTestnet as zkSyncTestnet2, zkSync } from 'wagmi/chains';

export const avalandche: Chain = {
  id: 43114,
  name: 'Avalanche C-Chain',
  network: 'avalanche',
  rpcUrls: {
    public: { http: ['https://rpc.ankr.com/avalanche'] },
    default: { http: ['https://rpc.ankr.com/avalanche'] },
  },
  nativeCurrency: { name: 'Avalanche', symbol: 'AVAX', decimals: 18 },
  blockExplorers: {
    default: {
      name: 'snowtrace',
      url: 'https://snowtrace.io/',
    },
  },
};

export const avalandcheFuji: Chain = {
  id: 43113,
  name: 'Avalanche Fuji',
  network: 'avalanche-fuji',
  rpcUrls: {
    public: { http: ['https://rpc.ankr.com/avalanche_fuji'] },
    default: { http: ['https://rpc.ankr.com/avalanche_fuji'] },
  },
  nativeCurrency: { name: 'Avalanche', symbol: 'AVAX', decimals: 18 },
  blockExplorers: {
    default: {
      name: 'snowtrace',
      url: 'https://testnet.snowtrace.io/',
    },
  },
  testnet: true,
};

export const fantomOpera: Chain = {
  id: 250,
  name: 'Fantom Opera',
  network: 'fantom',
  nativeCurrency: { name: 'Fantom', symbol: 'FTM', decimals: 18 },
  rpcUrls: {
    public: { http: ['https://rpc.ftm.tools'] },
    default: { http: ['https://rpc.ftm.tools'] },
  },
  blockExplorers: {
    default: {
      name: 'FTMScan',
      url: 'https://ftmscan.com',
    },
  },
};

export const fantomTestnet: Chain = {
  id: 4002,
  name: 'Fantom Testnet',
  network: 'fantom-testnet',
  nativeCurrency: { name: 'Fantom', symbol: 'FTM', decimals: 18 },
  rpcUrls: {
    public: { http: ['https://rpc.testnet.fantom.network'] },
    default: { http: ['https://rpc.testnet.fantom.network'] },
  },
  blockExplorers: {
    default: {
      name: 'FTMScan',
      url: 'https://testnet.ftmscan.com',
    },
  },
  testnet: true,
};

const bscExplorer = { name: 'BscScan', url: 'https://bscscan.com' };

export const bsc: Chain = {
  id: 56,
  name: 'BNB Smart Chain',
  network: 'bsc',
  rpcUrls: {
    public: { http: ['https://bsc-dataseed.binance.org'] },
    default: { http: ['https://bsc-dataseed.binance.org'] },
  },
  blockExplorers: {
    default: bscExplorer,
    etherscan: bscExplorer,
  },
  nativeCurrency: {
    name: 'Binance Chain Native Token',
    symbol: 'BNB',
    decimals: 18,
  },
};

export const bscTest: Chain = {
  id: 97,
  name: 'BNB Smart Chain Testnet',
  network: 'bsc-testnet',
  nativeCurrency: {
    decimals: 18,
    name: 'Binance Chain Native Token',
    symbol: 'tBNB',
  },
  rpcUrls: {
    public: { http: ['https://data-seed-prebsc-2-s3.binance.org:8545/'] },
    default: { http: ['https://data-seed-prebsc-2-s3.binance.org:8545/'] },
  },
  blockExplorers: {
    default: { name: 'BscScan', url: 'https://testnet.bscscan.com' },
  },
  testnet: true,
};

export const ethw: Chain = {
  id: 10001,
  name: 'EthereumPoW',
  network: 'ethw',
  nativeCurrency: {
    decimals: 18,
    name: 'ETHW (Wrapped)',
    symbol: 'ETHW',
  },
  rpcUrls: {
    public: { http: ['https://mainnet.ethereumpow.org/'] },
    default: { http: ['https://mainnet.ethereumpow.org/'] },
  },
  blockExplorers: {
    default: { name: 'ethwscan', url: 'https://mainnet.ethwscan.com' },
  },
};

export const goerli: Chain = {
  ...goerli2,
};

export const zkSyncMainnet: Chain = {
  ...zkSync,
  rpcUrls: {
    public: { http: ['https://mainnet.era.zksync.io'] },
    default: { http: ['https://mainnet.era.zksync.io'] },
  },
}

export const zkSyncTestnet: Chain = {
  ...zkSyncTestnet2,
  rpcUrls: {
    public: { http: ['https://testnet.era.zksync.dev'] },
    default: { http: ['https://testnet.era.zksync.dev'] },
  },
}

export { mainnet };
