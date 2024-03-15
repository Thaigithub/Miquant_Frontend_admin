'use client';

import { Layout } from 'antd';
import SiderMenu from './sider-menu';
import MainHeader from './header';
import { useState } from 'react';

const { Content } = Layout;

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  //
  return (
    <Layout>
      <MainHeader collapsed={collapsed} setCollapsed={setCollapsed} />
      <Layout className='flex justify-center !bg-gray-01 !min-h-[calc(100vh-88px)]'>
        <SiderMenu collapsed={collapsed} setCollapsed={setCollapsed} />
        <Content
          className={`mt-[60px] mb-[70px] max-w-full sm:max-w-[550px] md:max-w-[650px] lg:max-w-[900px] xl:max-w-[1100px] 2xl:max-w-[1248px] px-5 ${
            collapsed ? 'mx-0' : 'ml-0 sm:ml-[260px]'
          }`}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
}
