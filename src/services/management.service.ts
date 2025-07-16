import ManagementAxiosInstance from "../configs/managementAxiosInstance";
import {useMutation, useQuery} from "@tanstack/react-query";
import {IGetServices} from "../typs/managment.types";


// service API management
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

const DeleteService = (data:{id: number}) => {
  return ManagementAxiosInstance.delete(`Service/DeleteService?Id=${data.id}`);
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

const updateService = (data: { "id": number, "title": string, "description": string }) => {
  return ManagementAxiosInstance.put(`/Service/UpdateService`, data);
};
const useUpdateService = () => {
  return useMutation({mutationFn: updateService});
};

// Controller API Management
const getControllersByServiceId = async (id: number) => {
  const response = await ManagementAxiosInstance.get<IGetServices[]>(`Service/GetControllersByServiceId/${id}`);
  return response.data;
};
const useGetControllersByServiceId = (id: number) => {
  return useQuery({
    enabled:false,
    queryKey: ['getControllersByServiceId'],
    queryFn: () => getControllersByServiceId(id)
  });
};

const getControllerById = async (id: number) => {
  const response = await ManagementAxiosInstance.get<IGetServices[]>(`/Service/GetControllerById/${id}`);
  return response.data;
};
const useGetControllerById = (id: number) => {
  return useQuery({
    enabled:false,
    queryKey: ['getControllerById'],
    queryFn: () => getControllerById(id)
  });
};

const updateController = (data: { serviceId:number , "id": number, "title": string, "description": string }) => {
  return ManagementAxiosInstance.put(`Service/UpdateController`, data);
};
const useUpdateController = () => {
  return useMutation({mutationFn: updateController});
};

const createController = (data: { serviceId: number ,title: string, description: string }) => {
  return ManagementAxiosInstance.post(`/Service/CreateController`, data);
};
const useCreateController = () => {
  return useMutation({mutationFn: createController});
};

const deleteController = (data:{id: number, serviceId: number}) => {
  console.log(data)
  return ManagementAxiosInstance.delete(`/Service/DeleteController?ServiceId=${data.serviceId}&Id=${data.id}`);
};
const useDeleteController = () => {
  return useMutation({mutationFn: deleteController});
};

// Action API Management

const getActionsByControllerId = async (id: number) => {
  const response = await ManagementAxiosInstance.get<IGetServices[]>(`/Service/GetActionsByControllerId/${id}`);
  return response.data;
};
const useGetActionsByControllerId = (id: number) => {
  return useQuery({
    enabled:false,
    queryKey: ['getActionsByControllerId'],
    queryFn: () => getActionsByControllerId(id)
  });
};

const getActionById = async (id: number) => {
  const response = await ManagementAxiosInstance.get<IGetServices[]>(`/Service/GetActionById/${id}`);
  return response.data;
};
const useGetActionById = (id: number) => {
  return useQuery({
    enabled:false,
    queryKey: ['getActionById'],
    queryFn: () => getActionById(id)
  });
};

const updateAction = (data: { serviceId: number, controllerId: number, id: number, title: string, description: string }) => {
  return ManagementAxiosInstance.put(`/Service/UpdateAction`, data);
};
const useUpdateAction = () => {
  return useMutation({mutationFn: updateAction});
};

const deleteAction = (data:{id: number, serviceId: number,controllerId:number}) => {
  return ManagementAxiosInstance.delete(`/Service/DeleteAction?ServiceId=${data.serviceId}&ControllerId=${data.controllerId}&Id=${data.id}`);
};
const useDeleteAction = () => {
  return useMutation({mutationFn: deleteAction});
};

const createAction = (data: { serviceId: number ,title: string, description: string , controllerId: number, }) => {
  return ManagementAxiosInstance.post(`/Service/CreateAction`, data);
};
const useCreateAction = () => {
  return useMutation({mutationFn: createAction});
};


export {
  useGetServices,
  useGetServiceById,
  useDeleteService,
  useCreateService,
  useUpdateService,
  useGetControllersByServiceId,
  useGetControllerById,
  useUpdateController,
  useCreateController,
  useDeleteController,
  useGetActionsByControllerId,
  useGetActionById,
  useUpdateAction,
  useDeleteAction,
  useCreateAction
}