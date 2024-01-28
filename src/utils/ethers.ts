import type { Signer } from '@ethersproject/abstract-signer';
import memoize from 'lodash/memoize';

import { targetChainId } from '@/config';
import { mainnet } from '@/config/constants';
import { defaultAbiCoder, ParamType } from '@ethersproject/abi';
import { getAddress } from '@ethersproject/address';
import { BigNumber } from '@ethersproject/bignumber';
import { AddressZero } from '@ethersproject/constants';
import { Contract } from '@ethersproject/contracts';
import { keccak256 as keccak256Base } from '@ethersproject/keccak256';
import { pack } from '@ethersproject/solidity';
import { toUtf8Bytes } from '@ethersproject/strings';

import { chains } from './wagmi';

import type { Provider } from '@ethersproject/providers';

export const isAddress = memoize((value: any): string | false => {
  try {
    return getAddress(value);
  } catch {
    return false;
  }
});

export function getBlockExploreLink(
  data: string | number,
  type: 'transaction' | 'token' | 'address' | 'block' | 'countdown',
  chainIdOverride?: number
): string {
  const chainId = chainIdOverride || targetChainId;
  const chain = chains.find((c) => c.id === chainId);
  if (!chain) return mainnet.blockExplorers?.default.url ?? '';
  const url = chain.blockExplorers?.default.url;
  switch (type) {
    case 'transaction': {
      return `${url}/tx/${data}`;
    }
    case 'token': {
      return `${url}/token/${data}`;
    }
    case 'block': {
      return `${url}/block/${data}`;
    }
    case 'countdown': {
      return `${url}/block/countdown/${data}`;
    }
    default: {
      return `${url}/address/${data}`;
    }
  }
}

// account is optional
export function getContract<T extends Contract = Contract>(address: string, ABI: any, signer?: Signer | Provider) {
  if (!isAddress(address) || address === AddressZero) {
    throw Error(`Invalid 'address' parameter '${address}'.`);
  }

  return new Contract(address, ABI, signer) as T;
}

export const keccak256 = (message: string) => keccak256Base(toUtf8Bytes(message));

export const encodeParameters = (types: ReadonlyArray<string | ParamType>, values: ReadonlyArray<any>) => {
  return defaultAbiCoder.encode(types, values);
};

export const encodePacked = (types: string[], values: any[]) => {
  return pack(types, values);
};

export const generateNonce = (address: string) => {
  return BigInt(address).toString() + Date.now();
};

// add 10%
export function calculateGasMargin(value: BigNumber, margin = 1000): BigNumber {
  return value.mul(BigNumber.from(10000).add(BigNumber.from(margin))).div(BigNumber.from(10000));
}
