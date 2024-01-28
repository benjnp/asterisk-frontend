import type { Ethereum } from '@wagmi/core';
import { AppState } from '@/store';

declare global {
  type RootState = AppState;
  interface Window {
    coin98?: true;
    ethereum?: Ethereum & {
      isSafePal?: true;
      isCoin98?: true;
      isBlocto?: true;
      isMathWallet?: true;
    };
    BinanceChain?: {
      bnbSign?: (address: string, message: string) => Promise<{ publicKey: string; signature: string }>;
    };
  }
}

declare module '*.svg' {
  const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
  export default ReactComponent;
}
