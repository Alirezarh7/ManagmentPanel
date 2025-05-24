import {useGetServices} from "../../../services/management.service";
import DataGrid from "../../general/gridShow/DataGrid";

interface IProps {
  setValue:any,
  next:any
}
const CreateService = ({setValue,next}:IProps) => {
  const {data} = useGetServices()

  const headData = [
    {title: "Name", key: "englishName"},
    {title: "نام", key: ""},
    {title: " مقدار نیازمندی", key: "SumEstimationNo"},
  ];
  const bodyData = data?.map((destructure) => ({
    englishName: destructure.title,
    id: destructure.id,
    hasActions: true,
  })) ?? [];
  const onContinue =(row:any)=>{
    setValue ('serviceId',row.id)
    next()
  }
  const onEdit =()=>{}
  const onDelete =()=>{}
  return (
    <div className='bg-gray-100 pt-5'>
      <div className= 'flex  justify-between items-center mx-2'>
        <p>سرویس جدید را اضافه کنید.</p>
        <button className={'bg-sliderColor text-white border rounded-lg !border-goldColor p-1'}>اضافه کردن</button>
      </div>
      <div className='mt-4'>
        {data?.length && data?.length > 0 ?
          <DataGrid bodyData={bodyData} activities={true} headData={headData} onContinue={onContinue} onEdit={onEdit}
                    onDelete={onDelete}/>
          : null}
      </div>
    </div>
  );
};

export default CreateService;