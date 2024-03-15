'use client';

import { Button, Form, Layout } from 'antd';
import Image from 'next/image';
import { ICONS } from '@/utils/icons';
import { signOut } from 'next-auth/react';
import { useConfirmation, useNotification } from '../../hooks';
import { useTranslation } from 'react-i18next';
import { useRouter } from '@/routers';
import ContentChangePW from '../components/ContentChangePW';
import ModalCustom from '../../components/Modal';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
const { Header } = Layout;

//TODO: Implement Sidebar Mobile when click icon

type MainHeaderProps = {
  collapsed: boolean;
  setCollapsed: (value: boolean) => void;
};

export default function MainHeader({ collapsed, setCollapsed }: MainHeaderProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalConfirm, setModalConfirm] = useState(false);

  const dispatch = useDispatch();
  const { t } = useTranslation('login');
  const router = useRouter();
  const { showConfirmation } = useConfirmation();
  const { showNotification } = useNotification();
  const [form] = Form.useForm();
  // const accountInfo = useSelector((state: any) => state.common.accountInfo);

  const handleLogout = () => {
    showConfirmation({
      message: t('DO_YOU_WANT_TO_LOG_OUT'),
      handleOk: () => {
        signOut();
      },
      btnOkText: t('CHECK'),
      btnCancelText: t('CANCEL'),
    });
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    form.resetFields();
  };

  const handleOpenModalChangePW = () => {
    setModalOpen(true);
  };

  const handleOk = () => {
    setModalOpen(false);
    setModalConfirm(true);
  };

  const onFinish = (values: any) => {
    // changePassword({ password: values.password })
    //   .unwrap()
    //   .then(() => {
    //     showNotification({
    //       message: '비밀번호가 변경되었습니다.',
    //     });
    //     handleCloseModal();
    //     form.resetFields();
    //   });
  };

  const handleCloseModalConfirm = () => {
    setModalConfirm(false);
    setModalOpen(false);
    form.resetFields();
  };

  const handleOkModalConfirm = () => {
    setModalConfirm(false);
    form.submit();
  };

  // useEffect(() => {
  //   if (data) {
  //     dispatch(setAccountInfo(data));
  //   }
  // }, [data]);

  return (
    <Header
      className='!bg-white flex justify-between !px-[42px] !py-[18px]'
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        borderBottom: '1px solid #f0f0f0',
        height: 88,
      }}
    >
      <div className='py-3 flex sm:hidden'>
        <Image
          src={ICONS.menu}
          width={20}
          height={20}
          alt='menu'
          className='cursor-pointer'
          onClick={() => setCollapsed(!collapsed)}
        />
      </div>
      <Image
        priority
        src={ICONS.logo}
        alt='logo'
        className='relative w-[80px] md:w-[114px] h-[52px] cursor-pointer'
        onClick={() => {
          router.push('/');
        }}
      />

      <div className='h-full flex gap-1 md:gap-6'>
        <span className='font-gray-10 text-[12px] md:text-[16px] my-auto leading-[25.6px] truncate'>
          {/* {accountInfo?.name} */} Username
        </span>
        <div className='flex flex-col md:flex-row gap-1 md:gap-6'>
          <Button
            className='text-[15px] leading-6  px-[10px] py-[5px] my-auto'
            onClick={handleOpenModalChangePW}
          >
            CHANGE PASSWORD
          </Button>
          <Button
            className='text-[15px] leading-6  px-[10px] py-[5px] my-auto'
            onClick={handleLogout}
          >
            {t('LOGOUT')}
          </Button>
        </div>
      </div>

      <ModalCustom
        isModalOpen={modalOpen}
        handleCancel={handleCloseModal}
        handleOk={handleOk}
        content={<ContentChangePW form={form} onFinish={onFinish} />}
        // isLoadingOkBtn={isUpdating}
      />

      <ModalCustom
        isModalOpen={modalConfirm}
        handleCancel={handleCloseModalConfirm}
        handleOk={handleOkModalConfirm}
        content='Would you like to change your password?'
      />
    </Header>
  );
}
