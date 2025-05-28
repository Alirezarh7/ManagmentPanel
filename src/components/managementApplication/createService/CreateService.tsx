import {useDeleteService, useGetServiceById, useGetServices} from "../../../services/management.service";
import DataGrid from "../../general/gridShow/DataGrid";
import AddItemModal from "./AddItemModal";
import  {useState} from "react";
import CancelModal from "../cancelModal/CancelModal";
import EditModal from "../cancelModal/EditModal";
import NapLoading from "../../general/NapLoading/NapLoading";


interface IProps {
  setValue: any,
  next: any
  serviceId: number
}

const CreateService = ({setValue, next, serviceId}: IProps) => {
  const {data} = useGetServices()
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
  const {data: GetServiceByIdData, refetch, isRefetching} = useGetServiceById(serviceId)

  const onEdit = (row: any) => {
    setValue('serviceId', row.id)
    setTimeout(() => {
      refetch().then(() => {
        setEditService(true)
      })
    }, 100)
  }

  const onDelete = (row: any) => {
    setValue('serviceId', row.id)
    setDeleteService(true)
  }

  const {mutate} = useDeleteService()

  const onActionDelete = () => {
    console.log(setValue)
  }
  return (
    <>
      <NapLoading loading={isRefetching}/>
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
        <CancelModal isOpen={deleteService} onDismiss={() => setDeleteService(false)} onAction={onActionDelete}/>
        {editService ? <EditModal editService={editService} setEditService={() => setEditService(false)}
                                  dataForEdit={GetServiceByIdData!}/> : null}
        <AddItemModal isOpen={addService} onDismiss={() => setAddService(false)}/>
      </div>
    </>
  );
};

export default CreateService;