import { targetChainId } from '@/config';
import { goerli, mainnet } from '@/config/constants/chains';
import { StaticJsonRpcProvider } from '@ethersproject/providers';

export const ETH_PROD_NODE = (targetChainId === 1 ? mainnet.rpcUrls.default : goerli.rpcUrls.default).http[0];

export const ethRpcProvider = new StaticJsonRpcProvider(ETH_PROD_NODE);
