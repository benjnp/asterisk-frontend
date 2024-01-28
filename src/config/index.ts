import { parseUnits } from '@ethersproject/units';

export const connectorLocalStorageKey = 'connectorIdv2';
export const walletLocalStorageKey = 'wallet';

export const apiUrl = process.env.NEXT_PUBLIC_API || '';

export const isDev = process.env.NODE_ENV === 'development';

export const targetChainId = Number(process.env.NEXT_PUBLIC_CHAIN_ID) || 1;

export const listWallet = process.env.NEXT_PUBLIC_LIST_WALLET;

export enum GAS_PRICE {
  default = '5',
  fast = '6',
  instant = '7',
  testnet = '10',
}

export const GAS_PRICE_GWEI = {
  default: parseUnits(GAS_PRICE.default, 'gwei').toString(),
  fast: parseUnits(GAS_PRICE.fast, 'gwei').toString(),
  instant: parseUnits(GAS_PRICE.instant, 'gwei').toString(),
  testnet: parseUnits(GAS_PRICE.testnet, 'gwei').toString(),
};
