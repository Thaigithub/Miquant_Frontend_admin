import { Button, Modal } from 'antd';

export default function useConfirmation() {
  function showConfirmation({
    message,
    handleOk,
    btnOkText = '확인', // CONFIRMATION
    btnCancelText = '취소', // CANCELLATION
  }: {
    message: string;
    handleOk: () => void;
    btnOkText?: string;
    btnCancelText?: string;
  }) {
    Modal.info({
      title: null,
      content: (
        <div className='flex flex-col gap-[45px] px-[24px] pt-[49px] pb-[14px]'>
          <div className='text-base font-normal  text-grey-13 self-center'>{message}</div>

          <div className='self-center flex flex-row gap-4'>
            <Button
              key='cancel'
              onClick={() => {
                Modal.destroyAll();
              }}
              className='!px-12 !py-2.5 !h-[46px] !bg-[#F2F2F7] text-gray-06 font-semibold text-base border-none '
            >
              {btnCancelText}
            </Button>

            <Button
              key='submit'
              type='primary'
              onClick={() => {
                Modal.destroyAll();
                handleOk();
              }}
              className='!px-12 !py-2.5 !h-[46px] !bg-main-blue text-white font-semibold text-base border-none '
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

  return { showConfirmation };
}
