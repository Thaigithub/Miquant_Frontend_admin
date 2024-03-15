import { Button, Modal } from 'antd';

export default function ModalCustom({
  isModalOpen,
  handleOk,
  handleCancel,
  content,
  btnOkText = 'CONFIRM', // CONFIRMATION,
  btnCancelText = 'CANCEL', // CANCELLATION
  isLoadingOkBtn,
}: {
  isModalOpen: boolean;
  content: React.ReactNode;
  handleOk: () => void;
  handleCancel?: () => void;
  btnOkText?: string;
  btnCancelText?: string;
  isLoadingOkBtn?: boolean;
}) {
  return (
    <Modal
      centered
      open={isModalOpen}
      onOk={handleOk}
      closable={false}
      footer={null}
      className='w-full md:!w-[494px]'
    >
      <div className='flex flex-col gap-[45px] px-[24px] pt-[49px] pb-[14px]'>
        <div className='text-[16px] font-normal  text-grey-13 self-center'>{content}</div>

        <div className='self-center flex flex-row gap-4'>
          {handleCancel && (
            <Button
              key='cancel'
              onClick={handleCancel}
              className='!px-12 !py-2.5 !h-[46px] !bg-[#F2F2F7] !text-gray-06 !font-semibold !text-base !border-none hover:!shadow-md'
            >
              {btnCancelText}
            </Button>
          )}

          {handleOk && (
            <Button
              key='submit'
              type='primary'
              onClick={handleOk}
              loading={isLoadingOkBtn}
              className='!px-12 !py-2.5 !h-[46px] !bg-main-blue !text-white !font-semibold !text-base border-none hover:!shadow-lg'
            >
              {btnOkText}
            </Button>
          )}
        </div>
      </div>
    </Modal>
  );
}
