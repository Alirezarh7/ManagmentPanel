import ManagementAxiosInstance from '../configs/managementAxiosInstance';
import { useMutation, useQuery } from '@tanstack/react-query';
import { ICreateFaqContentDto, IEditFaqContentDto, IFaqContentResponse } from '../typs/faqContent.types';

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

const getFaqContentByIdFn = async (id: string) => {
	const response = await ManagementAxiosInstance.get<IFaqContentResponse>(`/Content/GetFaqContentById/${id}`);

	return response.data;
};
const useGetFaqContentById = (id: string) => {
	return useQuery({
		queryKey: ['getFaqContentById', id],
		queryFn: () => getFaqContentByIdFn(id)
	});
};

const createFaqContentFn = (data: ICreateFaqContentDto) => {
	return ManagementAxiosInstance.post('/Content/CreateFaqContent', data);
};

const useCreateFaqContent = () => {
	return useMutation({ mutationFn: createFaqContentFn });
};

const editFaqContentFn = (data: IEditFaqContentDto) => {
	return ManagementAxiosInstance.put('/Content/UpdateFaqContent', data);
};
const useEditFaqContent = () => {
	return useMutation({ mutationFn: editFaqContentFn });
};

const deleteFaqContentFn = (id: string) => {
	return ManagementAxiosInstance.delete(`/Content/DeleteFaqContent?id=${id}`);
};
const useDeleteFaqContent = () => {
	return useMutation({ mutationFn: deleteFaqContentFn });
};

export { useGetFaqContents, useGetFaqContentById, useCreateFaqContent, useEditFaqContent, useDeleteFaqContent };
