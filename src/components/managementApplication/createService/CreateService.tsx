import {
  useCreateService,
  useDeleteService,
  useGetServiceById,
  useGetServices, useUpdateService
} from "../../../services/management.service";
import DataGrid from "../../general/gridShow/DataGrid";
import AddItemModal from "./AddItemModal";
import {useState} from "react";
import CancelModal from "../cancelModal/CancelModal";
import EditModal from "../cancelModal/EditModal";
import NapLoading from "../../general/NapLoading/NapLoading";
import {enqueueSnackbar} from "notistack";


interface IProps {
  setValue: any,
  next: any
  serviceId: number,
  currentStep: number
}

const CreateService = ({setValue, next, serviceId, currentStep}: IProps) => {
  const {data, refetch: getServiceRefetch, isLoading, isFetching} = useGetServices()
  const [deleteService, setDeleteService] = useState<boolean>(false)
  const [editService, setEditService] = useState<boolean>(false)
  const [addService, setAddService] = useState<boolean>(false)
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
    setValue('serviceId', row.id)
    next()
  }
  /*Edit service */
  const {data: GetServiceByIdData, refetch, isRefetching} = useGetServiceById(serviceId)
  const onEdit = (row: any) => {
    setValue('serviceId', row.id)
    setTimeout(() => {
      refetch().then(() => {
        setEditService(true)
      })
    }, 100)
  }
  const {mutate: UpdateServiceMutate} = useUpdateService()


  /*delete service */
  const onDelete = (row: any) => {
    setValue('serviceId', row.id)
    setDeleteService(true)
  }
  const {mutate, isPending} = useDeleteService()
  const {mutate: createServiceMutate} = useCreateService()

  return (
    <>
      <NapLoading loading={isRefetching || isPending || isLoading || isFetching}/>
      <div className=' pt-5'>
        <div className='flex  justify-between items-center mx-2'>
          <p>سرویس جدید را اضافه کنید.</p>
          <button onClick={() => setAddService(true)}
                  className={'bg-sliderColor text-white border rounded-lg !border-goldColor p-1'}>اضافه کردن
          </button>
        </div>
        <div className='mt-4'>
          {data?.length && data?.length > 0 ?
            <DataGrid bodyData={bodyData} activities={true} headData={headData} onContinue={onContinue} onEdit={onEdit}
                      onDelete={onDelete}/>
            : null}
        </div>
        <CancelModal currentStep={currentStep} id={serviceId} Refetch={getServiceRefetch} isOpen={deleteService}
                     onDismiss={() => setDeleteService(false)} onAction={mutate}/>
        {editService ? <EditModal currentStep={currentStep} Refetch={getServiceRefetch} onAction={UpdateServiceMutate}
                                  edit={editService} setEdit={() => setEditService(false)}
                                  dataForEdit={GetServiceByIdData!}/> : null}
        <AddItemModal currentStep={currentStep} Refetch={getServiceRefetch} onAction={createServiceMutate} isOpen={addService}
                      onDismiss={() => setAddService(false)}/>
      </div>
    </>
  );
};

export default CreateService;