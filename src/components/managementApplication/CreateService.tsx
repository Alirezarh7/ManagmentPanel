import {useGetServices} from "../../services/management.service";
import DataGrid from "../general/gridShow/DataGrid";


const CreateService = () => {
  const {data} = useGetServices()
  console.log(data)
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

  return (
    <div>
      {data?.length && data?.length > 0 ?
        <DataGrid bodyData={bodyData} headData={headData}/>
        : null}
    </div>
  );
};

export default CreateService;