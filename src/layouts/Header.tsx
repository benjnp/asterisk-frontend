import classnames from 'classnames';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styled from 'styled-components';

import UserMenu from '@/layouts/Wallet/UserMenu';
import Image from 'next/image';
import { Button, Drawer, Space } from 'antd';
import { ReactNode, useState } from 'react';
import { CloseOutlined } from '@ant-design/icons';

const HeaderStyled = styled.header`
  .active {
    color: #fff;
    font-weight: bold;
    > span {
      display: block;
    }
  }

  .menu-item:hover {
    color: #43e3ff;
  }
`;

const NavItem = ({ text, path, active }: { text: ReactNode; path: string; active: boolean }) => {

  return (
    <Link href={path}>
      <li className={'flex items-center px-[6px] mb-[35px]'}>
        <div
          className={`
              'py-4 lg:py-2 font-normal flex items-center text-[18px] cursor-pointer',
              ${active ? 'text-white' : 'text-[#ededed] '}
            `}
        >
          {text}
        </div>
      </li>
    </Link>
  );
};
export const menu = [
  { path: '/swap', title: 'Swap' },
  { path: '/lp', title: 'LP' },
  { path: '/lock', title: 'Lock' },
  { path: '/vote', title: 'Vote' },
  { path: '/rewards', title: 'Rewards' },
  { path: '/gauges', title: 'Gauges' },
  { path: '/mint', title: 'astSecretkey' },
];

const Header = () => {
  const { pathname } = useRouter();
  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <>
      <HeaderStyled className="flex flex-col bg-black py-3 md:py-5">
        <div className="px-6 md:px-25 flex justify-between items-center h-23 md:h-29.5 gap-x-2">
          <div className="flex items-center">
            <Link href="/">
              <div className="flex items-center">
                <Image src="/images/logo.png" alt="" className='w-[22px] h-[25px] md:w-[33px] md:h-[36px]' width={33} height={36} />
                <span className="ml-3 md:ml-8 text-[24px] md:text-[28px] text-white">Asterisk</span>
              </div>
            </Link>
          </div>
          <div className=" items-center pl-12 xl:pl-24 gap-x-4 lg:gap-x-12 hidden md:flex">
            {menu.map(({ title, path }) => (
              <Link key={path} href={path}>
                <span
                  className={classnames('text-[#cccccc] text-lg font-normal relative', {
                    active: pathname === path,
                  })}
                >
                  {title}
                  <span
                    className={classnames(
                      'text-[#cccccc] text-lg font-normal absolute left-[50%] -translate-x-[50%] -bottom-2 w-[18px] h-3',
                      pathname === path ? 'block' : 'hidden'
                    )}
                  >
                    <Image src="/icons/menu-active.png" alt="" width={18} height={12} />
                  </span>
                </span>
              </Link>
            ))}
            {/* <UserMenu /> */}
          </div>
          <Button
            onClick={showDrawer}
            className="inline-block md:hidden bg-black border-black hover:border-black"
            icon={
              <Image src="/icons/menu-icon.svg" width={30} height={8} alt="" />
            }
            size="large"
          />
        </div>
      </HeaderStyled>
      <Drawer
        title={
          <div className="flex items-center">
            <Image src="/images/logo.png" alt="" className='w-[22px] h-[25px] md:w-[33px] md:h-[36px]' width={33} height={36} />
            <span className="ml-3 md:ml-8 text-[24px] md:text-[28px] font-normal text-white">Asterisk</span>
          </div>
        }
        closable={false} placement="right" onClose={onClose} open={open} className="drawer-custom !bg-[#222222]"
        extra={
          <Space>
            <Button type='text' className='m-0' onClick={onClose}
              icon={
                <CloseOutlined className="text-[18px] text-[#ededed]" />
              }
            />
          </Space>
        }>
        <div className="flex flex-col mt-[60px]">
          {menu.map((item, index) => (
            <NavItem text={item.title} path={item.path} key={index} active={pathname === item.path} />
          ))}
        </div>
      </Drawer>
    </>
  );
};

export default Header;
