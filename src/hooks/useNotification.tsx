import { Button, Modal } from 'antd';

export default function useNotification() {
  function showNotification({
    message,
    btnOkText = '확인', // CONFIRMATION
  }: {
    message: string;
    btnOkText?: string;
  }) {
    Modal.info({
      title: null,
      content: (
        <div className='flex flex-col gap-[45px] px-[24px] pt-[49px] pb-[14px]'>
          <div className='text-base font-normal  text-grey-13 self-center'>{message}</div>

          <div className='self-center flex flex-row gap-4'>
            <Button
              key='submit'
              type='primary'
              onClick={() => {
                Modal.destroyAll();
              }}
              className='!px-12 !py-2.5 !h-[46px] !bg-main-blue text-base font-semibold'
            >
              {btnOkText}
            </Button>
          </div>
        </div>
      ),
      centered: true,
      footer: null,
      className: 'modal-notification w-full md:!w-[494px]',
      onOk() {},
    });
  }

  return { showNotification };
}
