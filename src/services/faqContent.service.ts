import ManagementAxiosInstance from '../configs/managementAxiosInstance';
import { useMutation, useQuery } from '@tanstack/react-query';
import { IFaqContentResponse } from '../typs/faqContent.types';

const getFaqContentsFn = async () => {
	const response = await ManagementAxiosInstance.get<IFaqContentResponse[]>('/Content/GetFaqContents');

	return response.data;
};
const useGetFaqContents = () => {
	return useQuery({
		queryKey: ['getFaqContents'],
		queryFn: getFaqContentsFn
	});
};

const deleteFaqContentFn = (id: string) => {
	return ManagementAxiosInstance.delete(`/Content/DeleteFaqContent?id=${id}`);
};
const useDeleteFaqContent = () => {
	return useMutation({ mutationFn: deleteFaqContentFn });
};

export { useGetFaqContents, useDeleteFaqContent };
