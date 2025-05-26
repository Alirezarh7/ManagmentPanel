import {useGetServiceById, useGetServices} from "../../../services/management.service";
import DataGrid from "../../general/gridShow/DataGrid";
import AddItemModal from "./AddItemModal";
import React, {useEffect, useState} from "react";
import CancelModal from "../cancelModal/CancelModal";
import CustomModal from "../../general/Modal/CustomModal";
import CustomButton from "../../general/Buttons/CustomButton";
import EditModal from "../cancelModal/EditModal";


interface IProps {
  setValue:any,
  next:any
  serviceId:number
}
const CreateService = ({setValue,next,serviceId}:IProps) => {
  const {data} = useGetServices()
  const [deleteService, setDeleteService] = useState<boolean>(false)
  const [editService, setEditService] = useState<boolean>(false)
  const headData = [
    {title: "نام", key: ""},
    {title: "نام لاتین", key: "englishName"},
  ];
  const bodyData = data?.map((destructure) => ({
    id: destructure.id,
    englishName: destructure.title,
    hasActions: true,
  })) ?? [];
  const onContinue =(row:any)=>{
    setValue ('serviceId',row.id)
    next()
  }
  const {data:GetServiceByIdData,refetch ,isFetched}=useGetServiceById(serviceId)

  const onEdit =(row:any)=>{
    setValue ('serviceId',row.id)
  }
  useEffect(() => {
    if(serviceId ) refetch().then(()=>{
      setEditService(true)
    })
  }, [serviceId]);
  const onDelete =()=>{
    setDeleteService(true)
  }

  return (
    <div className=' pt-5'>
      <div className= 'flex  justify-between items-center mx-2'>
        <p>سرویس جدید را اضافه کنید.</p>
        <button className={'bg-sliderColor text-white border rounded-lg !border-goldColor p-1'}>اضافه کردن</button>
      </div>
      <div className='mt-4'>
        {data?.length && data?.length > 0 ?
          <DataGrid bodyData={bodyData} activities={true} headData={headData} onContinue={onContinue} onEdit={onEdit}
                    onDelete={onDelete}/>
          : null}
        <CancelModal isOpen={deleteService} onDismiss={()=>setDeleteService(false)} onAction={()=>{}} />
        {editService ?<EditModal editService={editService} setEditService={()=>setEditService(false)} dataForEdit={GetServiceByIdData!} />:null}
      </div>
      <AddItemModal />
    </div>
  );
};

export default CreateService;