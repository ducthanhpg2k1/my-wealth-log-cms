/* eslint-disable react/no-unknown-property */
import '../styles/globals.scss';

import { ReactElement, ReactNode } from 'react';

import type { NextPage } from 'next';
import type { AppProps } from 'next/app';
import { Inter } from 'next/font/google';
import Head from 'next/head';
import { appWithTranslation } from 'next-i18next';
import NextNProgress from 'nextjs-progressbar';

import ErrorBoundary from '@components/ErrorBoundary';
import { useTest } from '@hooks/test';
import AppLayout from '@layout/AppLayout';

import nextI18nConfig from '../next-i18next.config';

export type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};
type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const InterFont = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700', '900'],
  display: 'swap',
});

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page: any) => page);
  useTest();

  return (
    <>
      <Head>
        <meta name='robots' content='index, follow' />
        <meta name='googlebot' content={'index,follow'} />
        <meta charSet='utf-8' />
        <meta name='theme-color' content='#476055' />
        <meta name='title' content='My Wealth Log' />
        <meta name='description' content='My Wealth Log' />
        <link rel='shortcut icon' href='/images/logo-green.png' />
        <meta
          name='viewport'
          content='width=device-width,initial-scale=1,maximum-scale=2,shrink-to-fit=no'
        />
        <meta http-equiv='Content-Security-Policy' content='upgrade-insecure-requests' />
      </Head>
      <style jsx global>{`
        :root {
          --fontInter: ${InterFont.style.fontFamily};
        }
      `}</style>
      <ErrorBoundary>
        <NextNProgress color='#2aa98b' options={{ showSpinner: false }} />
        <AppLayout>{getLayout(<Component {...pageProps} />)}</AppLayout>
      </ErrorBoundary>
    </>
  );
}

// @ts-ignore
export default appWithTranslation(MyApp, nextI18nConfig);
