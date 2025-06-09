import ManagementAxiosInstance, {
  managementAxiosInstanceCreatPerson
} from "../configs/managementAxiosInstance";
import {useMutation, useQuery} from "@tanstack/react-query";
import {createUser} from "../typs/user.types";

const advancedSearchUsers = async (users: string) => {
  const response = await ManagementAxiosInstance.get(`/User/AdvancedSearchUsers/${users}`);
  return response.data;
};
const useAdvancedSearchUsers = (users: string) => {
  return useQuery({
    enabled:false,
    queryKey: ['advancedSearchUsers',users],
    queryFn: () => advancedSearchUsers(users)
  });
};

const createUser2 = (data: createUser) => {
  return ManagementAxiosInstance.post(`/User/CreateUser`, data);
};
const useCreateUser2 = () => {
  return useMutation({mutationFn: createUser2});
};

const getSSOUserByMobile = (phoneNumber:number) => {
  return ManagementAxiosInstance.get(`/User/GetSSOUserByMobile/${phoneNumber}`);
};
const useGetSSOUserByMobile = (phoneNumber:number) => {
  return useQuery({
    enabled:false,
    queryKey: ['getSSOUserByMobile',phoneNumber],
    queryFn: () => getSSOUserByMobile(phoneNumber)
  });
};

const GetProvinceListByCountryId = () => {
  return managementAxiosInstanceCreatPerson.get(`/Province/GetProvinceListByCountryId?CountryId=1`);
};
const useGetProvinceListByCountryId = () => {
  return useQuery({
    enabled:false,
    queryKey: ['GetProvinceListByCountryId'],
    queryFn: () => GetProvinceListByCountryId()
  });
};

export {useAdvancedSearchUsers,useCreateUser2,useGetSSOUserByMobile,useGetProvinceListByCountryId}