import axios from 'axios';
import {managementPanelBaseUrl,managementPanelCreatPerson,} from '../shareData/baseUrls';
import {enqueueSnackbar} from "notistack";
import userManager from "../store/userManager";

const automaticlyLogout = (): void => {
	userManager.removeUser();
	userManager.clearStaleState();
	localStorage.clear();
	sessionStorage.clear()
	window.location.reload();
	window.location.replace('/');
};

export default axios.create({
	headers: { Authorization: JSON.parse(localStorage.getItem("tokenMangement") as string)},
	baseURL: managementPanelBaseUrl
});

export const managementAxiosInstanceCreatPerson = axios.create({
	headers: { Authorization: JSON.parse(localStorage.getItem("tokenBasic") as string)},
	baseURL: managementPanelCreatPerson
})

managementAxiosInstanceCreatPerson.interceptors.response.use(
	response => response,
	axiosError => {
		if (axiosError.response?.status === 401) {
			automaticlyLogout();
		} else if  (axiosError.response?.status === 502) {
			return enqueueSnackbar('سامانه در حال بروز رسانی نسخه جدید می باشد، لطفا تا ۱۵ دقیقه دیگر مراجعه نفرمایید',{variant: 'info'});
		} else if  (axiosError.response?.status === 500) {
			enqueueSnackbar('اشکال در اجرای درخواست',{variant: 'error'});
		} else {
			return Promise.reject(axiosError);
		}
	}
);