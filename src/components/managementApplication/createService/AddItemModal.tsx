import React from 'react';
import CustomModal from "../../general/Modal/CustomModal";
import CustomButton from "../../general/Buttons/CustomButton";
import DataGrid from "../../general/gridShow/DataGrid";
import {useForm} from "react-hook-form";
import {AxiosResponse} from "axios";
import {QueryObserverResult, RefetchOptions, UseMutateFunction} from "@tanstack/react-query";
import {enqueueSnackbar} from "notistack";

interface IProps {
  isOpen: boolean;
  onDismiss: () => void;
  onAction:  UseMutateFunction<AxiosResponse<any, any>, Error, any, unknown>
  getServiceRefetch : (options?: (RefetchOptions | undefined)) => Promise<QueryObserverResult<any, Error>>
}


const AddItemModal = ({isOpen, onDismiss,onAction,getServiceRefetch}: IProps) => {

  const {control, watch} = useForm()
  console.log(watch())
  const editPersianName = watch('editPersianName')
  const editEnglishName = watch('editEnglishName')
  const headData = [
    {title: "نام", key: "", numberInput: true, name: 'editPersianName'},
    {title: "نام لاتین", key: "englishName", numberInput: true, name: 'editEnglishName'},
  ];

  const bodyData = [{
    editPersianName: watch('editPersianName'),
    englishName: watch('editEnglishName'),
  }];

  const dataSend = {
    description:editPersianName,
    title:editEnglishName,
  }
  return (
    <>
      <CustomModal isOpen={isOpen} title={'اضافه کردن آیتم'} onDismiss={onDismiss}
                   footerData={
                     <>
                       <CustomButton label={'ارسال'} onClick={()=>onAction(dataSend ,{onSuccess:()=>{
                           getServiceRefetch().then(()=>{
                             onDismiss()
                             enqueueSnackbar('سرویس با موقعیت اضافه شد',{variant: 'success'});
                           })
                         }})}
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