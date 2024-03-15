'use client';

import StyledComponentsRegistry from '@/provider/AntdRegistry';
import './globals.scss';
import NextAuthProvider from '@/provider/NextauthProvider';
import AntdConfigProvider from '@/provider/AntdConfigProvider';
import ReduxProvider from '@/provider/ReduxProvider';
import './i18';
import { HandleOnComplete } from '@/routers';
import { pretendard } from '@/utils/fonts';
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <body className={pretendard.className}>
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
