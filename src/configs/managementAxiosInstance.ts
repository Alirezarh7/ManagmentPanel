import axios from 'axios';
import {managementPanelBaseUrl,managementPanelCreatPerson,} from '../shareData/baseUrls';

export default axios.create({
	headers: { Authorization: JSON.parse(localStorage.getItem("tokenMangement") as string)},
	baseURL: managementPanelBaseUrl
});

export const managementAxiosInstanceCreatPerson = axios.create({
	headers: { Authorization: JSON.parse(localStorage.getItem("tokenBasic") as string)},
	baseURL: managementPanelCreatPerson
})