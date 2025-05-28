import React from 'react';
import CustomModal from "../../general/Modal/CustomModal";
import CustomButton from "../../general/Buttons/CustomButton";
import DataGrid from "../../general/gridShow/DataGrid";
import {useForm} from "react-hook-form";

interface IProps {
  isOpen: boolean;
  onDismiss: () => void;
}


const AddItemModal = ({isOpen, onDismiss}: IProps) => {

  const {control, watch} = useForm()
  console.log(watch())
  const headData = [
    {title: "نام", key: "", numberInput: true, name: 'editPersianName'},
    {title: "نام لاتین", key: "englishName", numberInput: true, name: 'editEnglishName'},
  ];

  const bodyData = [{
    editPersianName: watch('editPersianName'),
    englishName: watch('editEnglishName'),
  }];

  return (
    <>
      <CustomModal isOpen={isOpen} title={'اضافه کردن آیتم'} onDismiss={onDismiss}
                   footerData={
                     <>
                       <CustomButton label={'ارسال'} onClick={() => {
                       }}
                                     type={'button'} variant='primary'/>
                       <CustomButton label={'انصراف'} onClick={onDismiss} type={'button'} variant='Cancel'/>
                     </>
                   }
      >
        <>
          <DataGrid bodyData={bodyData} headData={headData} control={control}/>
        </>
      </CustomModal>
    </>
  );
};

export default AddItemModal;