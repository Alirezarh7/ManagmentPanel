import { Reducer } from 'redux';
import { CallCompleteInformationActionTypes } from './actionType';
import { ICallCompleteInformationState, KnownAction } from './model';

const unloadedState: ICallCompleteInformationState = {
	provinceList: {
		loading: false,
		data: []
	},
	cityList: {
		loading: false,
		data: []
	},
	residenceCityList: {
		loading: false,
		data: []
	},
	cityOfThePlaceOfDispatchList: {
		loading: false,
		data: []
	},
	hajDocuments: {
		data: [],
		loading: false,
		errorCode: null
	},
	documentsFromBank: {
		data: [],
		loading: false,
		errorCode: null
	},
	hajDocumentsFromFarakhan: {
		loading: false,
		data: null,
		errorCode: null
	},
	toggleSearchModal: {
		visible: false
	},
	toggleConfirmModal: {
		visible: false
	},
	createInformation: {
		loading: false,
		errorMessage: '',
		axiosError: null
	},
	setCancelReserve: {
		loading: false
	},
	uploadDocuments: {
		loading: false
	},
	previewDocuments: {
		loading: false,
		files: []
	},
	updateDocuments: {
		loading: false
	},
	alerts: []
};

export const CallCompleteInformationReducer: Reducer<ICallCompleteInformationState, KnownAction> = (
	state: ICallCompleteInformationState = unloadedState,
	action: KnownAction
) => {
	switch (action.type) {
		case CallCompleteInformationActionTypes.ToggleSearchModal: {
			return {
				...state,
				toggleSearchModal: {
					visible: action.visible
				}
			} as ICallCompleteInformationState;
		}
		case CallCompleteInformationActionTypes.ToggleConfirmModal: {
			return {
				...state,
				toggleConfirmModal: {
					visible: action.visible
				}
			} as ICallCompleteInformationState;
		}
		case CallCompleteInformationActionTypes.ProvinceFetch: {
			return {
				...state,
				provinceList: {
					loading: true
				}
			} as ICallCompleteInformationState;
		}
		case CallCompleteInformationActionTypes.ProvinceFetchSuccess: {
			return {
				...state,
				provinceList: {
					...state.provinceList,
					data: action.data,
					loading: false
				}
			} as ICallCompleteInformationState;
		}
		case CallCompleteInformationActionTypes.ProvinceFetchFailed: {
			return {
				...state,
				provinceList: {
					...state.provinceList,
					loading: false
				}
			} as ICallCompleteInformationState;
		}
		case CallCompleteInformationActionTypes.ResidenceCityFetch: {
			return {
				...state,
				residenceCityList: {
					...state.residenceCityList,
					loading: true
				}
			} as ICallCompleteInformationState;
		}
		case CallCompleteInformationActionTypes.ResidenceCityFetchSuccess: {
			return {
				...state,
				residenceCityList: {
					...state.residenceCityList,
					loading: false,
					data: action.data
				}
			} as ICallCompleteInformationState;
		}
		case CallCompleteInformationActionTypes.ResidenceCityFetchFailed: {
			return {
				...state,
				residenceCityList: {
					...state.residenceCityList,
					loading: false
				}
			} as ICallCompleteInformationState;
		}
		case CallCompleteInformationActionTypes.CityFetch: {
			return {
				...state,
				cityList: {
					...state.cityList,
					loading: true
				}
			} as ICallCompleteInformationState;
		}
		case CallCompleteInformationActionTypes.CityFetchSuccess: {
			return {
				...state,
				cityList: {
					...state.cityList,
					loading: false,
					data: action.data
				}
			} as ICallCompleteInformationState;
		}
		case CallCompleteInformationActionTypes.CityFetchFailed: {
			return {
				...state,
				cityList: {
					...state.cityList,
					loading: false
				}
			} as ICallCompleteInformationState;
		}
		case CallCompleteInformationActionTypes.CityOfThePlaceOfDispatchFetch: {
			return {
				...state,
				cityOfThePlaceOfDispatchList: {
					...state.cityOfThePlaceOfDispatchList,
					loading: true
				}
			} as ICallCompleteInformationState;
		}
		case CallCompleteInformationActionTypes.CityOfThePlaceOfDispatchFetchSuccess: {
			return {
				...state,
				cityOfThePlaceOfDispatchList: {
					...state.cityOfThePlaceOfDispatchList,
					loading: false,
					data: action.data
				}
			} as ICallCompleteInformationState;
		}
		case CallCompleteInformationActionTypes.CityOfThePlaceOfDispatchFetchFailed: {
			return {
				...state,
				cityOfThePlaceOfDispatchList: {
					...state.cityOfThePlaceOfDispatchList,
					loading: false
				}
			} as ICallCompleteInformationState;
		}
		//
		case CallCompleteInformationActionTypes.HajDocumentsFetch: {
			return {
				...state,
				hajDocuments: {
					...state.hajDocuments,
					loading: true
				}
			} as ICallCompleteInformationState;
		}
		case CallCompleteInformationActionTypes.HajDocumentsFetchSuccess: {
			return {
				...state,
				hajDocuments: {
					...state.hajDocuments,
					loading: false,
					data: action.data,
					errorCode: action.data.errorCode
				}
			} as ICallCompleteInformationState;
		}
		case CallCompleteInformationActionTypes.HajDocumentsFetchFailed: {
			return {
				...state,
				hajDocuments: {
					...state.hajDocuments,
					loading: false,
					errorCode: null
				}
			} as ICallCompleteInformationState;
		}

		case CallCompleteInformationActionTypes.HajDocumentsFromBankFetchFailed: {
			return {
				...state,
				documentsFromBank: {
					...state.documentsFromBank,
					loading: false,
					errorCode: null
				}
			} as ICallCompleteInformationState;
		}
		case CallCompleteInformationActionTypes.HajDocumentsFromBankFetchSuccess: {
			return {
				...state,
				documentsFromBank: {
					...state.documentsFromBank,
					loading: false,
					data: action.data,
					errorCode: action.errorCode
				}
			} as ICallCompleteInformationState;
		}
		case CallCompleteInformationActionTypes.HajDocumentsFromBankFetch: {
			return {
				...state,
				documentsFromBank: {
					...state.documentsFromBank,
					loading: true
				}
			} as ICallCompleteInformationState;
		}
		case CallCompleteInformationActionTypes.HajDocumentsFromFarakhanFetchFailed: {
			return {
				...state,
				hajDocumentsFromFarakhan: {
					...state.hajDocumentsFromFarakhan,
					loading: false,
					errorCode: null
				}
			} as ICallCompleteInformationState;
		}
		case CallCompleteInformationActionTypes.HajDocumentsFromFarakhanFetchSuccess: {
			return {
				...state,
				hajDocumentsFromFarakhan: {
					...state.hajDocumentsFromFarakhan,
					loading: false,
					data: action.data,
					errorCode: action.data.errorCode
				}
			} as ICallCompleteInformationState;
		}
		case CallCompleteInformationActionTypes.HajDocumentsFromFarakhanFetch: {
			return {
				...state,
				hajDocumentsFromFarakhan: {
					...state.hajDocumentsFromFarakhan,
					loading: true
				}
			} as ICallCompleteInformationState;
		}
		case CallCompleteInformationActionTypes.ClearHajDocument: {
			return {
				...state,
				hajDocuments: {
					loading: false,
					data: []
				}
			} as ICallCompleteInformationState;
		}
		case CallCompleteInformationActionTypes.ClearHajDocumentFromFarakhan: {
			return {
				...state,
				hajDocumentsFromFarakhan: {
					loading: false,
					data: []
				}
			} as ICallCompleteInformationState;
		}
		case CallCompleteInformationActionTypes.ClearHajDocumentFromBank: {
			return {
				...state,
				documentsFromBank: {
					loading: false,
					data: []
				}
			} as ICallCompleteInformationState;
		}

		case CallCompleteInformationActionTypes.CreateInformation: {
			return {
				...state,
				createInformation: {
					loading: true
				}
			} as ICallCompleteInformationState;
		}
		case CallCompleteInformationActionTypes.CreateInformationSuccess: {
			return {
				...state,
				createInformation: {
					loading: false,
					errorMessage: action.errorMessage,
					axiosError: null
				}
			} as ICallCompleteInformationState;
		}
		case CallCompleteInformationActionTypes.CreateInformationFailed: {
			return {
				...state,
				createInformation: {
					loading: false,
					errorMessage: '',
					axiosError: action.axiosError
				}
			} as ICallCompleteInformationState;
		}
		case CallCompleteInformationActionTypes.CancelReserve: {
			return {
				...state,
				setCancelReserve: {
					...state.setCancelReserve,
					loading: true
				}
			} as ICallCompleteInformationState;
		}
		case CallCompleteInformationActionTypes.CancelReserveSuccess: {
			return {
				...state,
				setCancelReserve: {
					...state.setCancelReserve,
					loading: false
				}
			} as ICallCompleteInformationState;
		}
		case CallCompleteInformationActionTypes.CancelReserveFailed: {
			return {
				...state,
				setCancelReserve: {
					...state.setCancelReserve,
					loading: false
				}
			} as ICallCompleteInformationState;
		}
		case CallCompleteInformationActionTypes.UploadDocuments: {
			return {
				...state,
				uploadDocuments: {
					...state.uploadDocuments,
					loading: true
				}
			} as ICallCompleteInformationState;
		}
		case CallCompleteInformationActionTypes.UploadDocumentsSuccess: {
			return {
				...state,
				uploadDocuments: {
					...state.uploadDocuments,
					loading: false
				}
			} as ICallCompleteInformationState;
		}
		case CallCompleteInformationActionTypes.UploadDocumentsFailed: {
			return {
				...state,
				uploadDocuments: {
					...state.uploadDocuments,
					loading: false
				}
			} as ICallCompleteInformationState;
		}

		case CallCompleteInformationActionTypes.PreviewDocuments: {
			return {
				...state,
				previewDocuments: {
					...state.previewDocuments,
					loading: true
				}
			} as ICallCompleteInformationState;
		}
		case CallCompleteInformationActionTypes.PreviewDocumentsSuccess: {
			return {
				...state,
				previewDocuments: {
					...state.previewDocuments,
					loading: false,
					files: action.files
				}
			} as ICallCompleteInformationState;
		}
		case CallCompleteInformationActionTypes.PreviewDocumentsFailed: {
			return {
				...state,
				previewDocuments: {
					...state.previewDocuments,
					loading: false
				}
			} as ICallCompleteInformationState;
		}
		case CallCompleteInformationActionTypes.UploadDocumentsFailed: {
			return {
				...state,
				updateDocuments: {
					...state.updateDocuments,
					loading: false
				}
			} as ICallCompleteInformationState;
		}
		case CallCompleteInformationActionTypes.UpdateDocumentsSuccess: {
			return {
				...state,
				updateDocuments: {
					...state.updateDocuments,
					loading: false
				}
			} as ICallCompleteInformationState;
		}
		case CallCompleteInformationActionTypes.UploadDocuments: {
			return {
				...state,
				updateDocuments: {
					...state.updateDocuments,
					loading: true
				}
			} as ICallCompleteInformationState;
		}
		case CallCompleteInformationActionTypes.PushAlert: {
			return {
				...state,
				alerts: [...state.alerts, action.alert]
			} as ICallCompleteInformationState;
		}
		case CallCompleteInformationActionTypes.ClearAlerts: {
			return {
				...state,
				alerts: []
			} as ICallCompleteInformationState;
		}
	}
	return state;
};
