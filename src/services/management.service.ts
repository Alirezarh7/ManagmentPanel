import ManagementAxiosInstance from "../configs/managementAxiosInstance";
import {IConfigResponse, IGetServices} from "../typs/config.types";
import {useQuery} from "@tanstack/react-query";

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