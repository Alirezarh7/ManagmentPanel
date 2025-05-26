import React from 'react';
import CustomButton from "../../general/Buttons/CustomButton";
import CustomModal from "../../general/Modal/CustomModal";

interface IProps {
  isOpen:boolean,
  onDismiss:() => void,
  onAction:() => void,
}
const CancelModal = ({isOpen,onDismiss,onAction}:IProps) => {
  return (
    <>
      <CustomModal title={'حذف مورد'} isOpen={isOpen} onDismiss={onDismiss}  footerData={
        <>
          <div className=' w-full flex  items-center justify-center '>
            <CustomButton label={'بله'} onClick={onAction}
                          type={'button'} variant='Cancel'/>
            <CustomButton label={'خیر'} onClick={onDismiss} type={'button'} variant='primary'/>
          </div>
        </>
      }>
        <div className={'flex justify-center items-center '}

        >
          <p>
            آیااز حذف آیتم مورد نظر مطمئن هستید ؟
          </p>
        </div>
      </CustomModal>
    </>
  );
};

export default CancelModal;