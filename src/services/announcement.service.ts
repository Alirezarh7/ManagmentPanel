import { ICreateAnnouncementFnDto } from '../typs/announcement.types';
import ManagementAxiosInstance from '../configs/managementAxiosInstance';
import { useMutation } from '@tanstack/react-query';

const createAnnouncementFn = (data: ICreateAnnouncementFnDto) => {
	return ManagementAxiosInstance.post('/Announcement/CreateAnnouncement', data);
};

const useCreateAnnouncement = () => {
	return useMutation({ mutationFn: createAnnouncementFn });
};

export { useCreateAnnouncement };
