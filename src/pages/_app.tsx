import 'antd/dist/reset.css';
import '@/styles/index.scss';

import { NextPage } from 'next';
import Head from 'next/head';
import { PersistGate } from 'redux-persist/integration/react';

import { usePollBlockNumber } from '@/hooks/useBlock';
import useEagerConnect from '@/hooks/useEagerConnect';
import DefaultLayout from '@/layouts';
import WalletSignMessage from '@/layouts/NetworkModal/WalletSignMessage';
import WalletWrongNetwork from '@/layouts/NetworkModal/WalletWrongNetwork';
import WalletModal from '@/layouts/Wallet/WalletModal';
import Providers from '@/providers';
import { persistor, useStore } from '@/store';
import MulticallUpdater from '@/store/multicall/updater';

import type { AppProps } from 'next/app';
import { ConfigProvider } from 'antd';
import { overflowX } from 'styled-system';

function GlobalHooks() {
  useEagerConnect();
  // useNetworkConnectorUpdater()
  usePollBlockNumber();
  return null;
}

function Updater() {
  return (
    <>
      <MulticallUpdater />
    </>
  );
}

const GlobalComponents = () => {
  return (
    <>
      <WalletModal />
      <WalletWrongNetwork />
      <WalletSignMessage />
    </>
  );
};

const HeadCustom = () => {
  return (
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0,user-scalable=0" />
      <link rel="shortcut icon" href="/images/logo.png" />
    </Head>
  );
};

function App(props: AppProps<{ initialReduxState: any }>) {
  const { pageProps } = props;
  const store = useStore(pageProps.initialReduxState);

  return (
    <Providers store={store}>
      <PersistGate loading={null} persistor={persistor}>
      <ConfigProvider
          theme={{
            hashed: false,
          }}
        >

        <GlobalHooks />
        <Updater />
        <GlobalComponents />
        <AppBody {...props} />
        </ConfigProvider>
      </PersistGate>
    </Providers>
  );
}

type NextPageWithLayout = NextPage & {
  Layout?: React.FC<React.PropsWithChildren<unknown>>;
  /**
   * allow chain per page, empty array bypass chain block modal
   * @default [ChainId.BSC]
   * */
  chains?: number[];
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function AppBody(props: AppPropsWithLayout) {
  const { pageProps, Component } = props;
  const Layout = Component.Layout || DefaultLayout;

  return (
    <Layout>
      <HeadCustom />
      <Component {...pageProps} />
    </Layout>
  );
}

export default App;
