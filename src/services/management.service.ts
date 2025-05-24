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

export {useGetServices}