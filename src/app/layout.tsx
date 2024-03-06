'use client';

import ReduxProvider from '@/providers/ReduxProvider';
import './globals.css';
import localFont from 'next/font/local';
import NextAuthProvider from '@/providers/NextAuthProvider';
import AntdConfigProvider from '@/providers/AntdConfigProvider';
import StyledComponentsRegistry from '@/providers/AntdRegistry';
import { HandleOnComplete } from '../helpers/router-events';

export const pretendard = localFont({
  src: [
    {
      path: '../../public/assets/fonts/Pretendard-Regular.woff',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/assets/fonts/Pretendard-Medium.woff',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../../public/assets/fonts/Pretendard-SemiBold.woff',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../../public/assets/fonts/Pretendard-Bold.woff',
      weight: '700',
      style: 'normal',
    },
  ],
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <body>
        <NextAuthProvider>
          <StyledComponentsRegistry>
            <AntdConfigProvider>
              <NextAuthProvider>
                <ReduxProvider>{children}</ReduxProvider>
              </NextAuthProvider>
            </AntdConfigProvider>
          </StyledComponentsRegistry>
        </NextAuthProvider>
        <HandleOnComplete />
      </body>
    </html>
  );
}
