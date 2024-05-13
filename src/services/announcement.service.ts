import { IAnnouncementResponse, ICreateAnnouncementFnDto } from '../typs/announcement.types';
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
const createAnnouncementFn = (data: ICreateAnnouncementFnDto) => {
	return ManagementAxiosInstance.post('/Announcement/CreateAnnouncement', data);
};

const useCreateAnnouncement = () => {
	return useMutation({ mutationFn: createAnnouncementFn });
};

const deleteAnnouncementFn = (id: string) => {
	return ManagementAxiosInstance.delete(`/Announcement/DeleteAnnouncement/${id}`);
};

const useDeleteAnnouncement = () => {
	return useMutation({ mutationFn: deleteAnnouncementFn });
};

export { useGetAnnouncements, useCreateAnnouncement, useDeleteAnnouncement };
