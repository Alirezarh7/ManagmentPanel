import { Action } from "redux";
import { TransformationActionTypes } from "./actionType";

export interface ITransformationState {
  transformations: {
    data: any;
    loading: boolean;
  },
  transformationOffice: {
    data:any,
    loading: boolean
},
transformationPostOffice:{
  loading:boolean
},

transformationPostInformation:{
  loading:boolean
},
transformationSallSanad: {
  data:any,
  loading: boolean
},
transformationPostSellManager: {
  loading:boolean
},
TransformationRequestInformation:{
  data:any,
  loading: boolean
},
transformationRequest:{
  data:any,
  loading: boolean
},
cancelRequestShiftSanad:{
  loading: boolean
},
createRequestReceivedSalesSanad:{
  loading: boolean
},
CreateShiftSanadSalesManagerSucces:{
  loading: boolean
},
RejectReceivedSalesSanad:{
  loading: boolean
},
getProfilePersonShiftSanad:{
  data:any,
  loading: boolean
}
getCityProfile:{
  data:any,
  loading: boolean
}

  alerts: any[];
  crumbs: any[]
}

//GET way for have permission to continue
interface ITransformationFetch extends Action<string> {
    type: TransformationActionTypes.TransformationFetch;
}

interface ITransformationFetchSuccess extends Action<string> {
  type: TransformationActionTypes.TransformationFetchSuccess;
  data: any
}
interface ITransformationFetchFailed extends Action<string> {
  type: TransformationActionTypes.TransformationFetchFailed;
}
//GET office 
interface ITransformationOfficeCreate extends Action<string> {
    type: TransformationActionTypes.TransformationOfficeCreate;
}
interface ITransformationOfficeFaild extends Action<string> {
  type: TransformationActionTypes.TransformationOfficeFaild;
}
interface ITransformationOfficeSucces extends Action<string> {
  type: TransformationActionTypes.TransformationOfficeSucces;
  data: any
}
//POST office data
interface ITransformationPostOffice extends Action<string>{
  type: TransformationActionTypes.TransformationPostOffice;
  loading:boolean
}
interface ITransformationPostOfficeSucces extends Action<string>{
  type: TransformationActionTypes.TransformationPostOfficeSucces
}



//1POST Infotmation data for sells
interface ITransformationPostInfo extends Action<string>{
  type: TransformationActionTypes.TransformationPostInfo;
  loading:boolean
}
interface ITransformationPostInfoSucces extends Action<string>{
  type: TransformationActionTypes.TransformationPostInfoSucces
}
//2GET Sanad for Sells
interface ITransformationSanadForSale extends Action<string> {
  type: TransformationActionTypes.TransformationSanadForSale;
}
interface ITransformationSanadForSaleFaild extends Action<string> {
type: TransformationActionTypes.TransformationSanadForSaleFaild;
}
interface ITransformationSanadForSaleSucces extends Action<string> {
type: TransformationActionTypes.TransformationSanadForSaleSucces;
data: any
}
//3POST Saland Sells Manager
interface ITransformationSellsManager extends Action<string>{
  type: TransformationActionTypes.TransformationSellsManager;
  loading:boolean
}
interface ITransformationSellsManagerSucces extends Action<string>{
  type: TransformationActionTypes.TransformationSellsManagerSucces
}
//4GET List Request Information
interface ITransformationRequestInformation extends Action<string> {
  type: TransformationActionTypes.TransformationRequestInformation;
}
interface ITransformationRequestInformationFaild extends Action<string> {
type: TransformationActionTypes.TransformationRequestInformationFaild;
}
interface ITransformationRequestInformationSucces extends Action<string> {
type: TransformationActionTypes.TransformationSanadForSaleSucces;
data: any
}
//5GET List RequestInformation
interface ITransformationRequest extends Action<string> {
  type: TransformationActionTypes.TransformationRequest;
}
interface ITransformationRequestFaild extends Action<string> {
type: TransformationActionTypes.TransformationRequestFaild;
}
interface ITransformationRequestSucces extends Action<string> {
type: TransformationActionTypes.TransformationRequestSucces;
data: any
}
//6POST CancelRequestShiftSanad
interface ICancelRequestShiftSanad extends Action<string>{
  type: TransformationActionTypes.CancelRequestShiftSanad;
  loading:boolean
}
interface ICancelRequestShiftSanadSucces extends Action<string>{
  type: TransformationActionTypes.CancelRequestShiftSanadSucces
}
//7PostCreateRequestReceivedSalesSanad
interface ICreateRequestReceivedSalesSanad extends Action<string>{
  type: TransformationActionTypes.CreateRequestReceivedSalesSanad;
  loading:boolean
}
interface ICreateRequestReceivedSalesSanadSucces extends Action<string>{
  type: TransformationActionTypes.CreateRequestReceivedSalesSanadSucces
}
//8PostCreateRequestReceivedSalesSanad
interface ICreateShiftSanadSalesManager extends Action<string>{
  type: TransformationActionTypes.CreateShiftSanadSalesManager;
  loading:boolean
}
interface ICreateShiftSanadSalesManagerSucces extends Action<string>{
  type: TransformationActionTypes.CreateShiftSanadSalesManagerSucces
}
//9PostCreateRequestReceivedSalesSanad
interface IRejectReceivedSalesSanad extends Action<string>{
  type: TransformationActionTypes.RejectReceivedSalesSanad;
  loading:boolean
}
interface IRejectReceivedSalesSanadSucces extends Action<string>{
  type: TransformationActionTypes.RejectReceivedSalesSanadSucces
}
//11GetCityProfile
interface IGetProfilePersonShiftSanad extends Action<string> {
  type: TransformationActionTypes.GetProfilePersonShiftSanad;
}
interface IGetProfilePersonShiftSanadFaild extends Action<string> {
type: TransformationActionTypes.GetProfilePersonShiftSanadFaild;
}
interface IGetProfilePersonShiftSanadSucces extends Action<string> {
type: TransformationActionTypes.GetProfilePersonShiftSanadSucces;
data: any
}



interface IGetCityProfile extends Action<string> {
  type: TransformationActionTypes.GetCityProfile;
}
interface IGetCityProfileSuccess extends Action<string> {
type: TransformationActionTypes.GetCityProfileSuccess;
data: any
}
interface IGetCityProfileFailed extends Action<string> {
type: TransformationActionTypes.GetCityProfileFailed;

}

interface ISetCrumbs extends Action<string> {
  type: TransformationActionTypes.SetCrumbs;
  crumbs: any[];
}

interface IPushAlert extends Action<string> {
    type: TransformationActionTypes.PushAlert;
    alert: any;
}
interface IClearAlerts extends Action<string> {
    type: TransformationActionTypes.ClearAlerts;
}

export type KnownAction = 
      ITransformationFetch
    | ITransformationFetchSuccess
    | ITransformationFetchFailed 
    | IPushAlert
    | ITransformationPostOffice
    | ITransformationPostOfficeSucces
    | ITransformationOfficeCreate
    | ITransformationOfficeFaild
    | ITransformationOfficeSucces
    | ITransformationPostInfo
    | ITransformationPostInfoSucces
    | ITransformationSanadForSale
    | ITransformationSanadForSaleFaild
    | ITransformationSanadForSaleSucces
    | ITransformationSellsManager
    | ITransformationSellsManagerSucces
    | ITransformationRequestInformation
    | ITransformationRequestInformationSucces
    | ITransformationRequestInformationFaild
    | ITransformationRequest
    | ITransformationRequestFaild
    | ITransformationRequestSucces
    | ICreateRequestReceivedSalesSanadSucces
    | ICreateRequestReceivedSalesSanad
    | ICancelRequestShiftSanad
    | ICancelRequestShiftSanadSucces
    | ICreateShiftSanadSalesManager
    | ICreateShiftSanadSalesManagerSucces
    | IRejectReceivedSalesSanad
    | IRejectReceivedSalesSanadSucces
    | IGetProfilePersonShiftSanad
    | IGetProfilePersonShiftSanadFaild
    | IGetProfilePersonShiftSanadSucces
    | IGetCityProfile
    | IGetCityProfileSuccess
    | IGetCityProfileFailed
    | ISetCrumbs
    | IClearAlerts;

