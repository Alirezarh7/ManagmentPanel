import {
  useCreateController, useDeleteController,
  useGetControllerById, useGetControllersByServiceId,
  useUpdateController
} from "../../services/management.service";
import DataGrid from "../general/gridShow/DataGrid";
import AddItemModal from "./createService/AddItemModal";
import {useEffect, useState} from "react";
import CancelModal from "./cancelModal/CancelModal";
import EditModal from "./cancelModal/EditModal";
import NapLoading from "../general/NapLoading/NapLoading";
import {enqueueSnackbar} from "notistack";


interface IProps {
  setValue: any,
  next: any
  controllerId: number,
  serviceId: number,
  prev: () => void;
  currentStep: number
}

const CreateController = ({setValue, next, controllerId, prev, serviceId, currentStep}: IProps) => {
  const {data, refetch: ControllersByServiceIdRefetch, isLoading, isFetching} = useGetControllersByServiceId(serviceId)
  useEffect(() => {
    if (serviceId) ControllersByServiceIdRefetch().then((value)=>{
      if(value.data?.length === 0) enqueueSnackbar('هیچ دیتای یافت نشد',{variant:'warning'})
     })
  }, []);
  const [deleteContoroller, setContoroller] = useState<boolean>(false)
  const [editController, setEditController] = useState<boolean>(false)
  const [addController, setAddController] = useState<boolean>(false)
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
  const onContinue = (row: any) => {
    setValue('controllerId', row.id)
    next()
  }
  /*Edit service */
  const {data: ControllerByIdData, refetch, isRefetching} = useGetControllerById(controllerId)
  const onEdit = (row: any) => {
    setValue('controllerId', row.id)
    setTimeout(() => {
      refetch().then(() => {
        setEditController(true)
      })
    }, 100)
  }
  const {mutate: UpdateControllerMutate} = useUpdateController()


  /*delete service */
  const onDelete = (row: any) => {
    setValue('controllerId', row.id)
    setContoroller(true)
  }
  const {mutate, isPending} = useDeleteController()
  const {mutate: createControllerMutate} = useCreateController()

  return (
    <>
      <NapLoading loading={isRefetching || isPending || isLoading || isFetching}/>
      <div className=' pt-5'>
        <div className='flex  justify-between items-center mx-2'>
          <p>کنترلر جدید را اضافه کنید.</p>

          <button onClick={() => setAddController(true)}
                  className={'bg-sliderColor text-white border rounded-lg !border-goldColor p-1'}>اضافه کردن
          </button>
        </div>
        <div className='mt-4'>
          {data?.length && data?.length > 0 ?
            <DataGrid bodyData={bodyData} activities={true} headData={headData} onContinue={onContinue} onEdit={onEdit}
                      onDelete={onDelete}/>
            : null}
        </div>
        <CancelModal currentStep={currentStep} serviceId={serviceId} id={controllerId}
                     Refetch={ControllersByServiceIdRefetch} isOpen={deleteContoroller}
                     onDismiss={() => setContoroller(false)} onAction={mutate}/>
        {editController ?
          <EditModal serviceId={serviceId} currentStep={currentStep} Refetch={ControllersByServiceIdRefetch}
                     onAction={UpdateControllerMutate} edit={editController}
                     setEdit={() => setEditController(false)}
                     dataForEdit={ControllerByIdData!}/> : null}
        <AddItemModal serviceId={serviceId} currentStep={currentStep} Refetch={ControllersByServiceIdRefetch}
                      onAction={createControllerMutate} isOpen={addController}
                      onDismiss={() => setAddController(false)}/>
        <div className=' w-full flex justify-center items-center'>
          <button onClick={() => prev()}
                  className={'bg-sliderColor text-white border rounded-lg !border-goldColor p-1'}>قبلی
          </button>
        </div>
      </div>
    </>
  );
};

export default CreateController;