import axios from 'axios';
import { managementPanelBaseUrl } from '../shareData/baseUrls';

export default axios.create({
	headers: { Authorization: JSON.parse(localStorage.getItem('token') as string)},
	baseURL: managementPanelBaseUrl
});
