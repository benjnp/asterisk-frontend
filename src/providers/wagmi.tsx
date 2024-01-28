import { WagmiConfig } from 'wagmi';

import { client } from '@/utils/wagmi';

export function WagmiProvider({ children }: React.PropsWithChildren) {
  return <WagmiConfig client={client}>{children}</WagmiConfig>;
}
