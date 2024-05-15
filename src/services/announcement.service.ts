import {
	IAnnouncementResponse,
	IAnnouncementsStatistics,
	ICreateAnnouncementFnDto,
	IEditAnnouncementFnDto
} from '../typs/announcement.types';
import ManagementAxiosInstance from '../configs/managementAxiosInstance';
import { useMutation, useQuery } from '@tanstack/react-query';

const getAnnouncementsFn = async () => {
	const response = await ManagementAxiosInstance.get<IAnnouncementResponse[]>('/Announcement/GetAnnouncements');

	return response.data;
};

const useGetAnnouncements = () => {
	return useQuery({
		queryKey: ['getAnnouncements'],
		queryFn: getAnnouncementsFn
	});
};

const getAnnouncementsStatisticsFn = async () => {
	const { data } = await ManagementAxiosInstance.get<IAnnouncementsStatistics>('/Announcement/GetAnnouncementsStatistics');

	return data;
};

const useGetAnnouncementsStatistics = () => {
	return useQuery({
		queryKey: ['getAnnouncementsStatistics'],
		queryFn: getAnnouncementsStatisticsFn
	});
};

const getAnnouncementByIdFn = async (id: string) => {
	const response = await ManagementAxiosInstance.get<IAnnouncementResponse>(`/Announcement/GetAnnouncementById/${id}`);

	return response.data;
};

const useGetAnnouncementById = (id: string) => {
	return useQuery({
		queryKey: ['getAnnouncementById', id],
		queryFn: () => getAnnouncementByIdFn(id)
	});
};

const createAnnouncementFn = (data: ICreateAnnouncementFnDto) => {
	return ManagementAxiosInstance.post('/Announcement/CreateAnnouncement', data);
};

const useCreateAnnouncement = () => {
	return useMutation({ mutationFn: createAnnouncementFn });
};

const editAnnouncementFn = (data: IEditAnnouncementFnDto) => {
	return ManagementAxiosInstance.put('/Announcement/UpdateAnnouncement', data);
};

const useEditAnnouncement = () => {
	return useMutation({ mutationFn: editAnnouncementFn });
};

const deleteAnnouncementFn = (id: string) => {
	return ManagementAxiosInstance.delete(`/Announcement/DeleteAnnouncement/${id}`);
};

const useDeleteAnnouncement = () => {
	return useMutation({ mutationFn: deleteAnnouncementFn });
};

export {
	useGetAnnouncements,
	useGetAnnouncementsStatistics,
	useGetAnnouncementById,
	useCreateAnnouncement,
	useEditAnnouncement,
	useDeleteAnnouncement
};
