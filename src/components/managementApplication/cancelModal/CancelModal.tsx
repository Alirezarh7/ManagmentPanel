import React from 'react';
import CustomButton from "../../general/Buttons/CustomButton";
import CustomModal from "../../general/Modal/CustomModal";
import {enqueueSnackbar} from "notistack";
import {QueryObserverResult, RefetchOptions, UseMutateFunction} from "@tanstack/react-query";
import {AxiosResponse} from "axios";

interface IProps {
  isOpen:boolean,
  onDismiss:() => void,
  id:number,
  serviceId?:number,
  currentStep:number,
  Refetch : (options?: (RefetchOptions | undefined)) => Promise<QueryObserverResult<any, Error>>,
  onAction:  UseMutateFunction<AxiosResponse<any, any>, Error, any, unknown>,
  controllerId?:number
}
const CancelModal = ({isOpen,onDismiss,Refetch,onAction,id,serviceId,currentStep,controllerId}:IProps) => {



const dataSend = currentStep === 1 ?{
  id
}:currentStep === 2?{id,serviceId} : {id,serviceId,controllerId}
  return (
    <>
      <CustomModal title={'حذف مورد'} isOpen={isOpen} onDismiss={onDismiss}  footerData={
        <>
          <div className=' w-full flex  items-center justify-center '>
            <CustomButton label={'بله'} onClick={()=>onAction(dataSend,{onSuccess:()=>{
                Refetch().then(()=>{
                  onDismiss()
                })
                enqueueSnackbar('سرورس مورد نظر با موفقعیت حذف کردید',{variant: 'success'})
              },onError:(err)=>{
                console.log(err)
              }})}
                          type={'button'} variant='Cancel'/>
            <CustomButton label={'خیر'} onClick={onDismiss} type={'button'} variant='primary'/>
          </div>
        </>
      }>
        <div className={'flex justify-center items-center '}>
          <p>
            آیااز حذف آیتم مورد نظر مطمئن هستید ؟
          </p>
        </div>
      </CustomModal>
    </>
  );
};

export default CancelModal;