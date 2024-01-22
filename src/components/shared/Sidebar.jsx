import React, { useState } from 'react';
import classNames from 'classnames';
import { Link, useLocation } from 'react-router-dom';
import { FcBullish } from 'react-icons/fc';
import { HiOutlineLogout } from 'react-icons/hi';
import { DASHBOARD_SIDEBAR_LINKS, DASHBOARD_SIDEBAR_BOTTOM_LINKS } from '../lib/constants/navigation';

const linkClass =
  'flex items-center gap-2 font-light px-3 py-2 hover:bg-neutral-700 hover:no-underline active:bg-neutral-600 rounded-sm text-base';

export const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div
      className={classNames('bg-gray-800 transition-all', {
        'w-60': !collapsed,
        'w-16': collapsed,
        'overflow-hidden': collapsed,
      })}
    >
      <div
        className={classNames('flex items-center justify-center gap-2 px-1 py-3 cursor-pointer transition-all', {
          'flex-col items-start': collapsed,
        })}
        onClick={toggleSidebar}
      >
        <FcBullish fontSize={24} />
        {!collapsed && <span className="text-neutral-200 text-lg">Miquants</span>}
      </div>
      <div className={classNames('py-8 flex flex-1 flex-col gap-0.5 transition-all', { hidden: collapsed })}>
        {DASHBOARD_SIDEBAR_LINKS.map((link) => (
          <SidebarLink key={link.key} link={link} />
        ))}
      </div>
      <div className={classNames('flex flex-col gap-0.5 pt-2 border-t border-neutral-700 transition-all', { hidden: collapsed })}>
        {DASHBOARD_SIDEBAR_BOTTOM_LINKS.map((link) => (
          <SidebarLink key={link.key} link={link} />
        ))}
        <div className={classNames(linkClass, 'cursor-pointer text-red-500')} onClick={toggleSidebar}>
          <span className="text-xl">
            <HiOutlineLogout />
          </span>
          {!collapsed && 'Logout'}
        </div>
      </div>
    </div>
  );
};

function SidebarLink({ link }) {
  const { pathname } = useLocation();

  return (
    <Link
      to={link.path}
      className={classNames(
        'm-1', // Add these classes
        pathname === link.path ? 'bg-neutral-700 text-white' : 'text-neutral-400',
        linkClass
      )}
    >
      <span className="text-xl m-1">{link.icon}</span>
      {link.label}
    </Link>
  );
}