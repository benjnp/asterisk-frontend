import { targetChainId } from '@/config';
import { Address } from '@/config/constants';

export function formatAddress(address?: string, first = 5, last = 4) {
  return address ? `${address.substring(0, first)}...${address.substring(address.length - last)}` : null;
}

export const getAddress = (address: Address, chainId = -1): string => {
  return address[chainId] ? address[chainId] : address[targetChainId];
};
