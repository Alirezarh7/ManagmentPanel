export enum CallCompleteInformationActionTypes {
  SetCrumbs = "@@Dashboard/SetCrumbs",



  CityCreate = "@@City/CityCreate",
  CityCreateSuccess = "@@City/CityCreateSuccess",
  CityCreateFailed = "@@City/CityCreateFailed",
  CityCreateModal = "@@City/CityCreateModal",

  CityUpdate = "@@City/CityUpdate",
  CityUpdateSuccess = "@@City/CityUpdateSuccess",
  CityUpdateFailed = "@@City/CityUpdateFailed",
  CityUpdateModal = "@@City/CityUpdateModal",

  CityDeleteModal = "@@City/CityDeleteModal",
  CityDelete = "@@City/CityDelete",
  CityDeleteSuccess = "@@City/CityDeleteSuccess",
  CityDeleteFailed = "@@City/CityDeleteFailed",

  PushAlert = "@@Dashboard/PushAlert",
  ClearAlerts = "@@Dashboard/ClearAlerts",
  // new actionType


  ProvinceFetch = "@@CallCompleteInformation/ProvinceFetch",
  ProvinceFetchSuccess = "@@CallCompleteInformation/ProvinceFetchSuccess",
  ProvinceFetchFailed = "@@CallCompleteInformation/ProvinceFetchFailed",

  CityFetch = "@@City/CityFetch",
  CityFetchSuccess = "@@City/CityFetchSuccess",
  CityFetchFailed = "@@City/CityFetchFailed",

  ResidenceCityFetch = "@@City/ResidenceCityFetch",
  ResidenceCityFetchSuccess = "@@City/ResidenceCityFetchSuccess",
  ResidenceCityFetchFailed = "@@City/ResidenceCityFetchFailed",

  CityOfThePlaceOfDispatchFetch = "@@City/CityOfThePlaceOfDispatchFetch",
  CityOfThePlaceOfDispatchFetchSuccess = "@@City/CityOfThePlaceOfDispatchFetchSuccess",
  CityOfThePlaceOfDispatchFetchFailed = "@@City/CityOfThePlaceOfDispatchFetchFailed",

  HajDocumentsFetch = "@@CallCompleteInformation/HajDocumentsFetch",
  HajDocumentsFetchSuccess = "@@CallCompleteInformation/HajDocumentsFetchSuccess",
  HajDocumentsFetchFailed = "@@CallCompleteInformation/HajDocumentsFetchFailed",

  HajDocumentsFromBankFetch = "@@CallCompleteInformation/HajDocumentsFromBankFetch",
  HajDocumentsFromBankFetchSuccess = "@@CallCompleteInformation/HajDocumentsFromBankFetchSuccess",
  HajDocumentsFromBankFetchFailed = "@@CallCompleteInformation/HajDocumentsFromBankFetchFailed",

  HajDocumentsFromFarakhanFetch = "@@CallCompleteInformation/HajDocumentsFromFarakhanFetch",
  HajDocumentsFromFarakhanFetchSuccess = "@@CallCompleteInformation/HajDocumentsFromFarakhanFetchSuccess",
  HajDocumentsFromFarakhanFetchFailed = "@@CallCompleteInformation/HajDocumentsFromFarakhanFetchFailed",

  ClearHajDocument = "@@CallCompleteInformation/ClearHajDocument",
  ClearHajDocumentFromFarakhan = "@@CallCompleteInformation/ClearHajDocumentFromFarakhan",
  ClearHajDocumentFromBank = "@@CallCompleteInformation/ClearHajDocumentFromBank",

  ToggleSearchModal = "@@CallCompleteInformation/ToggleSearchModal",
  ToggleConfirmModal = "@@CallCompleteInformation/ToggleConfirmModal",

  CreateInformation = "@@CallCompleteInformation/CreateInformation",
  CreateInformationSuccess = "@@CallCompleteInformation/CreateInformationSuccess",
  CreateInformationFailed = "@@CallCompleteInformation/CreateInformationFailed",

  CancelReserve = "@@CallCompleteInformation/CancelReserve",
  CancelReserveSuccess = "@@CallCompleteInformation/CancelReserveSuccess",
  CancelReserveFailed = "@@CallCompleteInformation/CancelReserveFailed",

  UploadDocumentsFailed = "@@CallCompleteInformation/UploadDocumentsFailed",
  UploadDocumentsSuccess = "@@CallCompleteInformation/UploadDocumentsSuccess",
  UploadDocuments = "@@CallCompleteInformation/UploadDocuments",

  PreviewDocumentsFailed = "@@CallCompleteInformation/PreviewDocumentsFailed",
  PreviewDocumentsSuccess = "@@CallCompleteInformation/PreviewDocumentsSuccess",
  PreviewDocuments = "@@CallCompleteInformation/PreviewDocuments",

  UpdateDocumentsFailed = "@@CallCompleteInformation/UpdateDocumentsFailed",
  UpdateDocumentsSuccess = "@@CallCompleteInformation/UpdateDocumentsSuccess",
  UpdateDocuments = "@@CallCompleteInformation/UpdateDocuments",
}
