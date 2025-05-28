import ManagementAxiosInstance from "../configs/managementAxiosInstance";
import {useMutation, useQuery} from "@tanstack/react-query";
import {IGetServices} from "../typs/managment.types";
import {ICreateContentDto} from "../typs/content.types";

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

const getServiceById = async (id: number) => {
  const response = await ManagementAxiosInstance.get<IGetServices>(`Service/GetServiceById/${id}`);

  return response.data;
};
const useGetServiceById = (id: number) => {
  return useQuery({
    queryFn: () => getServiceById(id),
    queryKey: ['getServiceById', id],
    enabled: false
  });
};

const DeleteService = (id: number) => {
  return ManagementAxiosInstance.delete(`Service/DeleteService?Id=${id}`);
};
const useDeleteService = () => {
  return useMutation({mutationFn: DeleteService});
};

const createService = (data: { "title": string, "description": string }) => {
  return ManagementAxiosInstance.post(`/Service/CreateService`, data);
};
const useCreateService = () => {
  return useMutation({mutationFn: createService});
};

const updateService = (data: {"id": number, "title": string, "description": string }) => {
  return ManagementAxiosInstance.put(`/Service/UpdateService`, data);
};
const useUpdateService = () => {
  return useMutation({mutationFn: updateService});
};




export {useGetServices, useGetServiceById, useDeleteService, useCreateService ,useUpdateService}