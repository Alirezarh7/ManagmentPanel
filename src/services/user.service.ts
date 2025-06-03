import ManagementAxiosInstance from "../configs/managementAxiosInstance";
import {IGetServices} from "../typs/managment.types";
import {useMutation, useQuery} from "@tanstack/react-query";
import {createUser} from "../typs/user.types";

const advancedSearchUsers = async (users: string) => {
  const response = await ManagementAxiosInstance.get<IGetServices[]>(`/User/AdvancedSearchUsers/${users}`);
  return response.data;
};
const useAdvancedSearchUsers = (users: string) => {
  return useQuery({
    enabled:false,
    queryKey: ['advancedSearchUsers',users],
    queryFn: () => advancedSearchUsers(users)
  });
};

const createUser = (data: createUser) => {
  return ManagementAxiosInstance.post(`/User/CreateUser`, data);
};
const useCreateUser = () => {
  return useMutation({mutationFn: createUser});
};

export {useAdvancedSearchUsers,useCreateUser}