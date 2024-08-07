import ManagementAxiosInstance from '../configs/managementAxiosInstance';
import { useMutation, useQuery } from '@tanstack/react-query';
import { IConfigResponse, IEditConfigDto } from '../typs/config.types';

const getConfigsFn = async () => {
	const response = await ManagementAxiosInstance.get<IConfigResponse[]>('/ConfigAction/GetConfigActions');

	return response.data;
};
const useGetConfigs = () => {
	return useQuery({
		queryKey: ['getConfigs'],
		queryFn: getConfigsFn
	});
};

const editConfigFn = (data: IEditConfigDto) => {
	return ManagementAxiosInstance.put('/ConfigAction/UpdateConfigAction', data);
};
const useEditConfig = () => {
	return useMutation({ mutationFn: editConfigFn });
};

export { useGetConfigs, useEditConfig };
