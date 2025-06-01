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
  Refetch : (options?: (RefetchOptions | undefined)) => Promise<QueryObserverResult<any, Error>>,
  currentStep:number,
  serviceId?:number,
  controllerId?:number
}


const AddItemModal = ({isOpen, onDismiss,onAction,Refetch,currentStep,serviceId,controllerId}: IProps) => {

  const {control, watch} = useForm()

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
  const dataSend = currentStep === 1 ? {
    description:editPersianName,
    title:editEnglishName,
  }:currentStep === 2 ? {
    serviceId:serviceId,
    description:editPersianName,
    title:editEnglishName,
  }: {
    controllerId,
    serviceId:serviceId,
    description:editPersianName,
    title:editEnglishName,
  }
  return (
    <>
      <CustomModal isOpen={isOpen} title={'اضافه کردن آیتم'} onDismiss={onDismiss}
                   footerData={
                     <>
                       <CustomButton label={'ارسال'} onClick={()=>onAction(dataSend ,{onSuccess:()=>{
                           Refetch().then(()=>{
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