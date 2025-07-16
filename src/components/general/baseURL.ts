import axios from "axios";
import {currentBaseUrl} from "../../shareData/baseUrls";

export default axios.create({
  headers: {Authorization: JSON.parse(localStorage.getItem("tokenMangement") as string)},
  // Origin server
  baseURL: currentBaseUrl
  // Testing server
  // baseURL: `http://apigw.gms.navoshgaran.com/api`

  // Customer server
  // baseURL: `http://192.168.40.211:9898/api`,
});
