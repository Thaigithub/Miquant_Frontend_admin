import { ConfigProvider } from 'antd';
import { pretendard } from '@/app/layout';

export default function AntdConfigProvider({ children }: { children: React.ReactNode }) {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#355ED4',
          borderRadius: 5,
          fontFamily: pretendard.style.fontFamily,
        },
        components: {
          Button: {
            borderRadius: 5,
          },
          Input: {
            activeBorderColor: '#1D1F28',
          },
          Pagination: {
            colorText: '#989CAD',
          },
          Select: {
            optionFontSize: 15,
            colorText: '#6E7283',
            fontSize: 15,
          },
          Table: {
            cellPaddingBlock: 12.25,
          },
          Tabs: {
            itemColor: '#6E7283',
            fontSize: 18,
            colorPrimary: '#1D1F28',
          },
        },
      }}
    >
      {children}
    </ConfigProvider>
  );
}
