import ManagementAxiosInstance, {
  managementAxiosInstanceCreatPerson
} from "../configs/managementAxiosInstance";
import {useMutation, useQuery} from "@tanstack/react-query";
import {IAdvancedSearchUsers, ICreateUser2, IRegistrationState} from "../typs/user.types";

const advancedSearchUsers = async (users?: string) => {
  const url = users ? `/User/AdvancedSearchUsers/${users}` : '/User/AdvancedSearchUsers';
  const response = await ManagementAxiosInstance.get<IAdvancedSearchUsers[]>(url);
  return response.data;
};

const useAdvancedSearchUsers = (users?: string) => {
  return useQuery({
    queryKey: ['advancedSearchUsers',users],
    queryFn: () => advancedSearchUsers(users)
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

const GetUserActionsByUserId = async (id:number) => {
  const response = await ManagementAxiosInstance.get<IRegistrationState>(`/User/GetUserActionsByUserId/${id}`);
  return response.data;
};
const useGetUserActionsByUserId = (id:number) => {
  return useQuery({
    enabled:false,
    queryKey: ['GetUserActionsByUserId',id],
    queryFn: () => GetUserActionsByUserId(id)
  });
};



export {useAdvancedSearchUsers,useCreateUser2,useGetSSOUserByMobile,useGetUserActionsByUserId}