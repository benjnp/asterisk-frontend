import { FC } from 'react';

import { Contract } from '@ethersproject/contracts';

export type Login<T> = (connectorId: T) => void;

export interface WalletConfig<T = {}> {
  title: string;
  icon: FC<any>;
  connectorId: T;
  priority: number | (() => number);
  installed?: boolean;
  href?: string;
  downloadLink?: {
    desktop?: string;
    mobile?: string;
  };
}

export type MaybeContract<C extends Contract = Contract> = C | null | undefined;
export type ContractMethodName<C extends Contract = Contract> = keyof C['callStatic'] & string;
export type ContractMethodParams<
  C extends Contract = Contract,
  N extends ContractMethodName<C> = ContractMethodName<C>
> = Parameters<C['callStatic'][N]>;

export interface Address {
  [chainId: number]: string;
}
