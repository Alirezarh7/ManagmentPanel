import { IContentResponse, ICreateContentDto, IEditContentDto } from '../typs/content.types';
import ManagementAxiosInstance from '../configs/managementAxiosInstance';
import { useMutation, useQuery } from '@tanstack/react-query';

const getContentsFn = async () => {
	const response = await ManagementAxiosInstance.get<IContentResponse[]>('/Content/GetContents');

	return response.data;
};
const useGetContents = () => {
	return useQuery({
		queryKey: ['getContents'],
		queryFn: getContentsFn
	});
};

const getContentByIdFn = async (id: string) => {
	const response = await ManagementAxiosInstance.get<IContentResponse>(`/Content/GetContentById/${id}`);

	return response.data;
};
const useGetContentById = (id: string) => {
	return useQuery({
		queryKey: ['getContentById', id],
		queryFn: () => getContentByIdFn(id)
	});
};

const createContentFn = (data: ICreateContentDto) => {
	return ManagementAxiosInstance.post('/Content/CreateContent', data);
};
const useCreateContent = () => {
	return useMutation({ mutationFn: createContentFn });
};

const editContentFn = (data: IEditContentDto) => {
	return ManagementAxiosInstance.put('/Content/UpdateContent', data);
};
const useEditContent = () => {
	return useMutation({ mutationFn: editContentFn });
};

const deleteContentFn = (id: string) => {
	return ManagementAxiosInstance.delete(`/Content/DeleteContent?id=${id}`);
};
const useDeleteContent = () => {
	return useMutation({ mutationFn: deleteContentFn });
};

export { useGetContents, useGetContentById, useCreateContent, useEditContent, useDeleteContent };
