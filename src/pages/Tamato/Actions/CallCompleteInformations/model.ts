import { Action } from "redux";
import { CallCompleteInformationActionTypes } from "./actionType";


export interface ICallCompleteInformationState {
  provinceList: {
    loading: boolean;
    data: any[];
  };
  cityList: {
    loading: boolean;
    data: any[];
  };
  residenceCityList: {
    loading: boolean;
    data: any[]
  },
  cityOfThePlaceOfDispatchList : {
    loading: boolean;
    data: any[]
  },
  hajDocuments: {
    data: any,
    loading: boolean,
    errorCode: null
  },
  documentsFromBank: {
    data: any,
    loading: boolean,
    errorCode: any
  },
  hajDocumentsFromFarakhan: {
    data: any,
    loading: boolean,
    errorCode: any
  },
  toggleSearchModal: {
    visible: boolean
  },
  toggleConfirmModal: {
    visible: boolean
  },
  createInformation: {
    loading: boolean;
    errorMessage: string;
    axiosError: any
  },
  setCancelReserve: {
    loading: boolean
  },
  uploadDocuments: {
    loading: boolean,
  },
  updateDocuments: {
    loading: boolean,
  },
  previewDocuments: {
    loading: boolean,
    files: any[]
  },
  alerts: any[],
}

interface IPushAlert extends Action<string> {
  type: CallCompleteInformationActionTypes.PushAlert;
  alert: any;
}
interface IClearAlerts extends Action<string> {
  type: CallCompleteInformationActionTypes.ClearAlerts;
}

interface ISetCrumbs extends Action<string> {
  type: CallCompleteInformationActionTypes.SetCrumbs;
  crumbs: any[];
}

interface ICityFetch extends Action<string> {
  type: CallCompleteInformationActionTypes.CityFetch;
}
interface ICityFetchSuccess extends Action<string> {
  type: CallCompleteInformationActionTypes.CityFetchSuccess;
  data: any;
}
interface ICityFetchFailed extends Action<string> {
  type: CallCompleteInformationActionTypes.CityFetchFailed;
}
interface ICityCreate extends Action<string> {
  type: CallCompleteInformationActionTypes.CityCreate;
}
interface ICityCreateSuccess extends Action<string> {
  type: CallCompleteInformationActionTypes.CityCreateSuccess;
}
interface ICityCreateFailed extends Action<string> {
  type: CallCompleteInformationActionTypes.CityCreateFailed;
}
interface ICityCreateModal extends Action<string> {
  type: CallCompleteInformationActionTypes.CityCreateModal;
  Visible: boolean;
}

interface ICityUpdate extends Action<string> {
  type: CallCompleteInformationActionTypes.CityUpdate;
}
interface ICityUpdateSuccess extends Action<string> {
  type: CallCompleteInformationActionTypes.CityUpdateSuccess;
}
interface ICityUpdateFailed extends Action<string> {
  type: CallCompleteInformationActionTypes.CityUpdateFailed;
}
interface ICityUpdateModal extends Action<string> {
  type: CallCompleteInformationActionTypes.CityUpdateModal;
  item: object;
  Visible: boolean;
}

interface ICityDelete extends Action<string> {
  type: CallCompleteInformationActionTypes.CityDelete;
}
interface ICityDeleteSuccess extends Action<string> {
  type: CallCompleteInformationActionTypes.CityDeleteSuccess;
}
interface ICityDeleteFailed extends Action<string> {
  type: CallCompleteInformationActionTypes.CityDeleteFailed;
}
interface ICityDeleteModal extends Action<string> {
  type: CallCompleteInformationActionTypes.CityDeleteModal;
  provinceId: number;
  id: number;
  Visible: boolean;
}

interface IPushAlert extends Action<string> {
  type: CallCompleteInformationActionTypes.PushAlert;
  alert: any;
}
interface IClearAlerts extends Action<string> {
  type: CallCompleteInformationActionTypes.ClearAlerts;
}


interface IProvinceFetch extends Action<string> {
  type: CallCompleteInformationActionTypes.ProvinceFetch;
}

interface IProvinceFetchSuccess extends Action<string> {
  type: CallCompleteInformationActionTypes.ProvinceFetchSuccess;
  loading: boolean;
  data: any[];
}

interface IProvinceFetchFailed extends Action<string> {
  type: CallCompleteInformationActionTypes.ProvinceFetchFailed;
}

interface IResidenceCityFetch extends Action<string> {
  type: CallCompleteInformationActionTypes.ResidenceCityFetch;
}
interface IResidenceCityFetchSuccess extends Action<string> {
  type: CallCompleteInformationActionTypes.ResidenceCityFetchSuccess;
  data: any;
}
interface IResidenceCityFetchFailed extends Action<string> {
  type: CallCompleteInformationActionTypes.ResidenceCityFetchFailed;
}
interface ICityOfThePlaceOfDispatchFetch extends Action<string> {
  type: CallCompleteInformationActionTypes.CityOfThePlaceOfDispatchFetch;
}
interface ICityOfThePlaceOfDispatchFetchSuccess extends Action<string> {
  type: CallCompleteInformationActionTypes.CityOfThePlaceOfDispatchFetchSuccess;
  data: any;
}
interface ICityOfThePlaceOfDispatchFetchFailed extends Action<string> {
  type: CallCompleteInformationActionTypes.CityOfThePlaceOfDispatchFetchFailed;
}
interface IHajDocuments extends Action<string> {
  type: CallCompleteInformationActionTypes.HajDocumentsFetch;
}
interface HajDocumentsFetchSuccess extends Action<string> {
  type: CallCompleteInformationActionTypes.HajDocumentsFetchSuccess;
  data: any,
  errorCode: any
}
interface HajDocumentsFetchFailed extends Action<string> {
  type: CallCompleteInformationActionTypes.HajDocumentsFetchFailed;
}

interface IHajDocumentsFromBank extends Action<string> {
  type: CallCompleteInformationActionTypes.HajDocumentsFromBankFetch;
}
interface HajDocumentsFromBankFetchSuccess extends Action<string> {
  type: CallCompleteInformationActionTypes.HajDocumentsFromBankFetchSuccess;
  data: any,
  errorCode: any
}
interface HajDocumentsFromBankFetchFailed extends Action<string> {
  type: CallCompleteInformationActionTypes.HajDocumentsFromBankFetchFailed;
}


interface IHajDocumentsFromFarakhan extends Action<string> {
  type: CallCompleteInformationActionTypes.HajDocumentsFromFarakhanFetch;
}
interface HajDocumentsFromFarakhanFetchSuccess extends Action<string> {
  type: CallCompleteInformationActionTypes.HajDocumentsFromFarakhanFetchSuccess;
  data: any,
  errorCode: any
}
interface HajDocumentsFromFarakhanFetchFailed extends Action<string> {
  type: CallCompleteInformationActionTypes.HajDocumentsFromFarakhanFetchFailed;
}

interface IClearHajDocument extends Action<string> {
  type: CallCompleteInformationActionTypes.ClearHajDocument;
}

interface IClearHajFromFarakhanDocument extends Action<string> {
  type: CallCompleteInformationActionTypes.ClearHajDocumentFromFarakhan;
}

interface IClearDocumentFromBank extends Action<string> {
  type: CallCompleteInformationActionTypes.ClearHajDocumentFromBank;
}
interface IToggleSearchModal extends Action<string> {
  type: CallCompleteInformationActionTypes.ToggleSearchModal;
  visible: boolean;
}
interface IToggleConfirmModal extends Action<string> {
  type: CallCompleteInformationActionTypes.ToggleConfirmModal;
  visible: boolean;
}

interface ICreateInformation extends Action<string> {
  type: CallCompleteInformationActionTypes.CreateInformation;
}
interface ICreateInformationSuccess extends Action<string> {
  type: CallCompleteInformationActionTypes.CreateInformationSuccess;
  errorMessage: string;
  axiosError: any
}
interface ICreateInformationFailed extends Action<string> {
  type: CallCompleteInformationActionTypes.CreateInformationFailed;
  axiosError: any
}

interface ICancelReserve extends Action<string> {
  type: CallCompleteInformationActionTypes.CancelReserve;
}
interface ICancelReserveSuccess extends Action<string> {
  type: CallCompleteInformationActionTypes.CancelReserveSuccess;
}
interface ICancelReserveFailed extends Action<string> {
  type: CallCompleteInformationActionTypes.CancelReserveFailed;
}

interface IUploadDocumentFailed extends Action<string> {
  type: CallCompleteInformationActionTypes.UploadDocumentsFailed;
}
interface IUploadDocumentSuccess extends Action<string> {
  type: CallCompleteInformationActionTypes.UploadDocumentsSuccess;
}
interface IUploadDocument extends Action<string> {
  type: CallCompleteInformationActionTypes.UploadDocuments;
}
interface IPreviewDocument extends Action<string> {
  type: CallCompleteInformationActionTypes.PreviewDocuments;
}
interface IPreviewDocumentSuccess extends Action<string> {
  type: CallCompleteInformationActionTypes.PreviewDocumentsSuccess;
  files: any
}
interface IPreviewDocumentFaild extends Action<string> {
  type: CallCompleteInformationActionTypes.PreviewDocumentsFailed;
}

interface IUpdateDocumentFaild extends Action<string> {
  type: CallCompleteInformationActionTypes.UpdateDocumentsFailed;
}

interface IUpdateDocumentSuccess extends Action<string> {
  type: CallCompleteInformationActionTypes.UpdateDocumentsSuccess;
}

interface IUpdateDocument extends Action<string> {
  type: CallCompleteInformationActionTypes.UpdateDocuments;
}

export type KnownAction = ICityFetch
  | ICityFetchSuccess
  | ICityFetchFailed
  | ICityCreate
  | ICityCreateSuccess
  | ICityCreateFailed
  | ICityCreateModal
  | ICityUpdate
  | ICityUpdateSuccess
  | ICityUpdateFailed
  | ICityUpdateModal
  | ICityDelete
  | ICityDeleteSuccess
  | ICityDeleteFailed
  | ICityDeleteModal
  | ISetCrumbs
  | IPushAlert
  | IClearAlerts
  | IProvinceFetch
  | IProvinceFetchSuccess
  | IProvinceFetchFailed
  | IResidenceCityFetch
  | IResidenceCityFetchSuccess
  | IResidenceCityFetchFailed
  | ICityOfThePlaceOfDispatchFetch
  | ICityOfThePlaceOfDispatchFetchSuccess
  | ICityOfThePlaceOfDispatchFetchFailed
  | IHajDocuments
  | HajDocumentsFetchSuccess
  | HajDocumentsFetchFailed
  | IHajDocumentsFromBank
  | HajDocumentsFromBankFetchSuccess
  | HajDocumentsFromBankFetchFailed
  | IHajDocumentsFromFarakhan
  | HajDocumentsFromFarakhanFetchSuccess
  | HajDocumentsFromFarakhanFetchFailed
  | IClearHajFromFarakhanDocument
  | IClearHajDocument
  | IClearDocumentFromBank
  | IToggleSearchModal
  | IToggleConfirmModal
  | ICreateInformation
  | ICreateInformationSuccess
  | ICreateInformationFailed
  | ICancelReserve
  | ICancelReserveSuccess
  | IUploadDocument
  | IUploadDocumentSuccess
  | IUploadDocumentFailed
  | ICancelReserveFailed
  | IPreviewDocument
  | IPreviewDocumentSuccess
  | IPreviewDocumentFaild
  | IUpdateDocumentFaild
  | IUpdateDocumentSuccess
  | IUpdateDocument;
