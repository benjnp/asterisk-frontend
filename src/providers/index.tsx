import { Provider } from 'react-redux';

import { Store } from '@reduxjs/toolkit';

import { ReactQueryProvider } from './react-query';
import { SWRProviders } from './swr';
import { WagmiProvider } from './wagmi';

const Providers: React.FC<React.PropsWithChildren<{ store: Store; children: React.ReactNode }>> = ({
  children,
  store,
}) => {
  return (
    <WagmiProvider>
      <Provider store={store}>
        <SWRProviders>
          <ReactQueryProvider>{children}</ReactQueryProvider>
        </SWRProviders>
      </Provider>
    </WagmiProvider>
  );
};

export default Providers;
