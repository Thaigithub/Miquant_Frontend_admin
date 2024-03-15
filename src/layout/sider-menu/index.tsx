import { Layout, Menu } from 'antd';
import Image from 'next/image';
import { ICONS } from '@/utils/icons';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import useResize from '@/hooks/useResize';
import { Link } from '@/routers';
import { useSelector } from 'react-redux';
import MenuList from './MenuList';

const { Sider } = Layout;

type SiderMenuProps = {
  collapsed: boolean;
  setCollapsed: (value: boolean) => void;
};

export default function SiderMenu({ collapsed, setCollapsed }: SiderMenuProps) {
  const pathName = usePathname();
  // const accountInfo = useSelector((state: any) => state.common.accountInfo);

  const [selectedKey, setSelectedKey] = useState('');
  const [openKey, setOpenKey] = useState('');
  const [currentMenuList, setCurrentMenuList] = useState(MenuList);

  const { isMobile, isTablet } = useResize();

  useEffect(() => {
    currentMenuList.forEach((item) => {
      // if (item.children) {
      //   item.children.forEach((child) => {
      //     if (pathName && pathName.includes(child.key)) {
      //       setSelectedKey(child.key);
      //       setOpenKey(item.key);
      //     }
      //   });
      // }
    });
  }, [pathName]);

  // useEffect(() => {
  //   if (accountInfo?.level === 'SUPERADMIN') {
  //     setCurrentMenuList(MenuList);
  //   } else {
  //     setCurrentMenuList(
  //       MenuList.map((item: any) => {
  //         if (item.permissionValue && accountInfo?.permissions.includes(item.permissionValue)) {
  //           return item;
  //         } else if (item.children) {
  //           return {
  //             ...item,
  //             children: item.children.filter((child: any) =>
  //               accountInfo?.permissions.includes(child.permissionValue),
  //             ),
  //           };
  //         }
  //         return null;
  //       }).filter(Boolean) as {
  //         key: string;
  //         label: JSX.Element;
  //         children: { key: string; permissionValue: string; label: JSX.Element }[];
  //       }[],
  //     );
  //   }
  // }, [accountInfo]);

  return (
    <Sider
      style={{
        overflow: 'hidden',
        height: '100vh',
        position: 'fixed',
        left: 0,
        top: 0,
        bottom: 0,
        background: '#fff',
        marginTop: 65,
        display: (collapsed && isMobile) || (collapsed && isTablet) ? 'none' : 'block',
      }}
      width={260}
      collapsed={collapsed}
      className='z-10'
    >
      <div
        className={`pl-[29px] pt-[40px] flex justify-end border-r border-gray-02 ${
          collapsed ? 'pr-[29px]' : 'pr-[37px]'
        }`}
      >
        <div className='py-3'>
          <Image
            src={ICONS.menu}
            width={20}
            height={20}
            alt='menu'
            className='cursor-pointer hidden sm:block'
            onClick={() => setCollapsed(!collapsed)}
          />
        </div>
      </div>
      <Menu
        mode='inline'
        selectedKeys={[selectedKey]}
        openKeys={[openKey]}
        items={collapsed ? [] : currentMenuList}
        style={{ height: 'calc(100vh - 165px)', borderRight: '1px solid #e5e7eb' }}
        className='!text-gray-08 overflow-y-auto'
        expandIcon={({ isOpen }) => (
          <Image
            src={ICONS.downArrow}
            width={20}
            height={20}
            alt='arrow'
            className={`submenu-arrow duration-200  ${isOpen ? 'rotate-180' : ''}`}
          />
        )}
        onOpenChange={(keys) => {
          setOpenKey(keys[keys.length - 1] as string);
        }}
      />
    </Sider>
  );
}
