import ManagementAxiosInstance from "../configs/managementAxiosInstance";
import {useQuery} from "@tanstack/react-query";
import {IGetServices} from "../typs/managment.types";

const getServices = async () => {
  const response = await ManagementAxiosInstance.get<IGetServices[]>('/Service/GetServices');

  return response.data;
};
const useGetServices = () => {
  return useQuery({
    queryKey: ['getServices'],
    queryFn: getServices
  });
};

const getServiceById = async (id:number) => {
  const response = await ManagementAxiosInstance.get<IGetServices>(`Service/GetServiceById/${id}`);

  return response.data;
};
const useGetServiceById = (id:number) => {
  return useQuery({
    queryFn:()=> getServiceById(id),
    queryKey: ['getServiceById',id],
    enabled:false
  });
};

export {useGetServices,useGetServiceById}