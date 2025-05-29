import React, {useEffect, useState} from 'react';
import {
  useCreateAction,
  useDeleteAction, useGetActionById, useGetActionsByControllerId, useUpdateAction,
} from "../../services/management.service";
import {enqueueSnackbar} from "notistack";
import NapLoading from "../general/NapLoading/NapLoading";
import DataGrid from "../general/gridShow/DataGrid";
import CancelModal from "./cancelModal/CancelModal";
import EditModal from "./cancelModal/EditModal";
import AddItemModal from "./createService/AddItemModal";

interface IProps {
  setValue: any,
  next: any
  controllerId: number,
  serviceId: number,
  prev: () => void;
  currentStep: number
  createAction: number
}


const CreateAction = ({createAction, controllerId, prev, serviceId, currentStep, next, setValue}: IProps) => {
  const {data, refetch: ActionsByControllerIdRefetch, isLoading, isFetching} = useGetActionsByControllerId(controllerId)
  useEffect(() => {
    if (controllerId) ActionsByControllerIdRefetch().then((value) => {
      if (value.data?.length === 0) enqueueSnackbar('هیچ دیتای یافت نشد', {variant: 'warning'})
    })
  }, []);
  const [deleteAction, setAction] = useState<boolean>(false)
  const [editAction, setEditAction] = useState<boolean>(false)
  const [addAction, setAddAction] = useState<boolean>(false)
  const headData = [
    {title: "نام", key: "persionName"},
    {title: "نام لاتین", key: "englishName"},
  ];
  const bodyData = data?.map((destructure) => ({
    id: destructure.id,
    englishName: destructure.title,
    persionName: destructure.description,
    hasActions: true,
  })) ?? [];
  // const onContinue = (row: any) => {
  //   setValue('createAction', row.id)
  //   next()
  // }
  /*Edit service */
  const {data: ControllerByIdData, refetch, isRefetching} = useGetActionById(createAction)
  const onEdit = (row: any) => {
    setValue('createAction', row.id)
    setTimeout(() => {
      refetch().then(() => {
        setEditAction(true)
      })
    }, 100)
  }
  const {mutate: UpdateActionMutate} = useUpdateAction()


  /*delete service */
  const onDelete = (row: any) => {
    setValue('createAction', row.id)
    setAction(true)
  }
  const {mutate, isPending} = useDeleteAction()

  const {mutate: createActionMutate} = useCreateAction()

  return (
    <>
      <NapLoading loading={isRefetching || isPending || isLoading || isFetching}/>
      <div className=' pt-5'>
        <div className='flex  justify-between items-center mx-2'>
          <p>کنترلر جدید را اضافه کنید.</p>

          <button onClick={() => setAddAction(true)}
                  className={'bg-sliderColor text-white border rounded-lg !border-goldColor p-1'}>اضافه کردن
          </button>
        </div>
        <div className='mt-4'>
          {data?.length && data?.length > 0 ?
            <DataGrid bodyData={bodyData} activities={true} headData={headData} onEdit={onEdit}
                      onDelete={onDelete}/>
            : null}
        </div>
        <CancelModal controllerId={controllerId} currentStep={currentStep} serviceId={serviceId} id={createAction}
                     Refetch={ActionsByControllerIdRefetch} isOpen={deleteAction}
                     onDismiss={() => setAction(false)} onAction={mutate}/>
        {editAction ?
          <EditModal controllerId={controllerId} serviceId={serviceId} currentStep={currentStep}
                     Refetch={ActionsByControllerIdRefetch}
                     onAction={UpdateActionMutate} edit={editAction}
                     setEdit={() => setEditAction(false)}
                     dataForEdit={ControllerByIdData!}/> : null}
        <AddItemModal controllerId={controllerId} serviceId={serviceId} currentStep={currentStep}
                      Refetch={ActionsByControllerIdRefetch}
                      onAction={createActionMutate} isOpen={addAction}
                      onDismiss={() => setAddAction(false)}/>
        <div className=' w-full flex justify-center items-center'>
          <button onClick={() => prev()}
                  className={'bg-sliderColor text-white border rounded-lg !border-goldColor p-1'}>قبلی
          </button>
        </div>
      </div>
    </>
  );
};

export default CreateAction;