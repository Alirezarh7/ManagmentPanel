import React from 'react';
import CustomModal from "../../general/Modal/CustomModal";

interface IProps {
  isOpen: boolean;
  onDismiss: () => void;
}

const AddItemModal = ({isOpen,onDismiss}:IProps) => {
  return (
    <>
      <CustomModal isOpen={isOpen} title={'اضافه کردن آیتم'} onDismiss={onDismiss}>
        <>
        </>
      </CustomModal>
    </>
  );
};

export default AddItemModal;