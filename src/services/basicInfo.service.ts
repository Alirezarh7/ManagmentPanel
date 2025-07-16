import {managementAxiosInstanceCreatPerson} from "../configs/managementAxiosInstance";
import {useQuery} from "@tanstack/react-query";
import {IBasicInfo} from "../typs/basicInfo.types";


const GetProvinceListByCountryId = async () => {
  const response =  await managementAxiosInstanceCreatPerson.get<IBasicInfo[]>(`/Province/GetProvinceListByCountryId?CountryId=1`);
  return response.data;
};
const useGetProvinceListByCountryId = () => {
  return useQuery({
    enabled:false,
    queryKey: ['GetProvinceListByCountryId'],
    queryFn: () => GetProvinceListByCountryId()
  });
};

export {useGetProvinceListByCountryId}