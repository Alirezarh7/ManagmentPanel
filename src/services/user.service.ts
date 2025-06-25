import ManagementAxiosInstance, {
  managementAxiosInstanceCreatPerson
} from "../configs/managementAxiosInstance";
import {useMutation, useQuery} from "@tanstack/react-query";
import {IAdvancedSearchUsers, ICreateUser2, IRegistrationState, IUpdateUser} from "../typs/user.types";

const advancedSearchUsers = async (pageNumber:number,pageSize:number,text?: string) => {
  const queryParams = new URLSearchParams({
    PageNumber:pageNumber.toString(),
    PageSize : pageSize.toString()
  });
  if (text) {
    queryParams.append("Text", text);
  }
  const response = await ManagementAxiosInstance.get<IAdvancedSearchUsers[]>(`/User/AdvancedSearchUsers?${queryParams.toString()}`);
  return response.data;
};

const useAdvancedSearchUsers = (pageNumber:number,pageSize:number,text?: string) => {
  return useQuery({
    queryKey: ['advancedSearchUsers', pageNumber , pageSize,text],
    queryFn: () => advancedSearchUsers(pageNumber , pageSize,text)
  });
};

const createUser2 = (data: ICreateUser2) => {
  return ManagementAxiosInstance.post(`/User/CreateUser`, data);
};
const useCreateUser2 = () => {
  return useMutation({mutationFn: createUser2});
};

const getSSOUserByMobile = async (phoneNumber:number) => {
  const response = await ManagementAxiosInstance.get<IRegistrationState>(`/User/GetSSOUserByMobile/${phoneNumber}`);
  return response.data;
};
const useGetSSOUserByMobile = (phoneNumber:number) => {
  return useQuery({
    enabled:false,
    queryKey: ['getSSOUserByMobile',phoneNumber],
    queryFn: () => getSSOUserByMobile(phoneNumber)
  });
};

const getUserById = async (id:number) => {
  const response = await ManagementAxiosInstance.get<IRegistrationState>(`/User/GetUserById/${id}`);
  return response.data;
};
const useGetUserById = (id:number) => {
  return useQuery({
    enabled:false,
    queryKey: ['getUserById',id],
    queryFn: () => getUserById(id)
  });
};

const updateUser = (data: IUpdateUser) => {
  return ManagementAxiosInstance.post(`/User/UpdateUser`, data);
};
const useUpdateUser = () => {
  return useMutation({mutationFn: updateUser});
};


export {useAdvancedSearchUsers,useCreateUser2,useGetSSOUserByMobile,useGetUserById,useUpdateUser}