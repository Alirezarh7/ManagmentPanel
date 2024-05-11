import { Reducer } from 'redux';
import { RegistrationActionTypes } from './actionType';
import { IRegistrationState, KnownAction } from './model';

const unloadedState: IRegistrationState = {
	listSanad: {
		loading: false,
		data: []
	},
	setCancelReserve: {
		loading: false
	},
	toggleConfirmModal: {
		visible: false
	},
	provinceList: {
		loading: false,
		data: []
	},
	cityList: {
		loading: false,
		data: []
	},
	personInfo: {
		loading: false,
		data: []
	},
	aghlamBaz: {
		loading: false,
		data: [],
		errors: null
	},
	priceKarvanList: {
		loading: false,
		data: []
	},
	resultSerchKarvanList: {
		loading: false,
		data: []
	},
	createReserveZaerData: {
		loading: false,
		data: [],
		x: false
	},
	toggleSearchModal: {
		visible: false
	},
	printData: {
		loading: false,
		data: []
	},
	isChechPromise: {
		loading: false,
		data: null
	},
	createSignUnderTaking: {
		loading: false,
		data: []
	},
	getPaymentData: {
		loading: false,
		data: null
	},

	omreSanad: {
		data: [],
		loading: false,
		updater: true
	},

	cancelUserRegistration: {
		loading: false
	},

	getReserveDetailList: {
		loading: false,
		data: []
	},
	getPrintDetailList: {
		loading: false,
		data: []
	},
	createReserve: {
		loading: false
	},
	ebtalReserve: {
		loading: false
	},
	setZaerProfie: {
		loading: false
	},
	createPassengerGroup: {
		loading: false
	},
	deleteMember: {
		loading: false
	},
	addMemberGroup: {
		loading: false
	},
	passengerProfile: {
		loading: false,
		data: null
	},
	getPassengerMember: {
		loading: false,
		data: []
	},
	passengerGroup: {
		loading: false,
		data: null
	},
	deleteMemberGroup: {
		loading: false
	},
	isLeaderByNationalCode: {
		loading: false,
		data: null
	},
	confirmationPassenger: {
		data: [],
		loading: false
	},
	confirmationGroupdata: {
		loading: false,
		data: []
	},
	addressByPostalCode: {
		loading: false,
		data: null
	},
	newLeader: {
		loading: false
	},
	beginReserve: {
		loading: false
	},
	getStateforStep: {
		loading: false,
		data: []
	},
	getKarvanRegisterHistory: {
		loading: false,
		data: []
	},
	paymentHistory: {
		loading: false,
		data: null
	},
	RejectReceivedSalesSanad: {
		loading: false
	},
	alerts: [],
	crumbs: []
};

export const RegistrationReducer: Reducer<IRegistrationState, KnownAction> = (
	state: IRegistrationState = unloadedState,
	action: KnownAction
) => {
	switch (action.type) {
		case RegistrationActionTypes.GetReserveDetailListSuccess: {
			return {
				...state,
				getReserveDetailList: {
					loading: false,
					data: (action as any).data
				}
			} as IRegistrationState;
		}
		case RegistrationActionTypes.GetReserveDetailListFailed: {
			return {
				...state,
				getReserveDetailList: {
					loading: false
				}
			} as IRegistrationState;
		}
		case RegistrationActionTypes.GetReserveDetailList: {
			return {
				...state,
				getReserveDetailList: {
					loading: true
				}
			} as IRegistrationState;
		}

		case RegistrationActionTypes.GetPassengerMemberSuccess: {
			return {
				...state,
				getPassengerMember: {
					...state.getPassengerMember,
					loading: false,
					data: action.data
				}
			} as IRegistrationState;
		}
		case RegistrationActionTypes.GetPassengerMemberFailed: {
			return {
				...state,
				getPassengerMember: {
					loading: false
				}
			} as IRegistrationState;
		}
		case RegistrationActionTypes.GetPassengerMemberFetch: {
			return {
				...state,
				getPassengerMember: {
					loading: true
				}
			} as IRegistrationState;
		}
		case RegistrationActionTypes.ToggleSearchModal: {
			return {
				...state,
				toggleSearchModal: {
					visible: action.visible
				}
			} as IRegistrationState;
		}
		case RegistrationActionTypes.ToggleConfirmModal: {
			return {
				...state,
				toggleConfirmModal: {
					visible: action.visible
				}
			} as IRegistrationState;
		}
		case RegistrationActionTypes.OmreSanadFetch: {
			return {
				...state,
				omreSanad: {
					...state.omreSanad,
					loading: true
				}
			} as IRegistrationState;
		}
		case RegistrationActionTypes.OmreSanadFetchSuccess: {
			return {
				...state,
				omreSanad: {
					...state.omreSanad,
					loading: false,
					data: action.data
				}
			} as IRegistrationState;
		}
		case RegistrationActionTypes.OmreSanadFetchFailed: {
			return {
				...state,
				omreSanad: {
					...state.omreSanad,
					loading: false
				}
			} as IRegistrationState;
		}
		case RegistrationActionTypes.OmreSanadFetchUpdater: {
			return {
				...state,
				omreSanad: {
					...state.omreSanad,
					updater: action.update
				}
			} as IRegistrationState;
		}
		case RegistrationActionTypes.CreateSignUnderTakingSuccess: {
			return {
				...state,
				createSignUnderTaking: {
					...state.createSignUnderTaking,
					loading: false,
					data: action.data
				}
			} as IRegistrationState;
		}
		case RegistrationActionTypes.CreateSignUnderTakingFailed: {
			return {
				...state,
				createSignUnderTaking: {
					loading: false
				}
			} as IRegistrationState;
		}
		case RegistrationActionTypes.CreateSignUnderTaking: {
			return {
				...state,
				createSignUnderTaking: {
					loading: true
				}
			} as IRegistrationState;
		}

		//////////////////////////////////////////////////
		case RegistrationActionTypes.IsLeaderByNationalCode: {
			return {
				...state,
				isLeaderByNationalCode: {
					loading: true
				}
			} as IRegistrationState;
		}
		case RegistrationActionTypes.IsLeaderByNationalCodeSuccess: {
			return {
				...state,
				isLeaderByNationalCode: {
					...state.isLeaderByNationalCode,
					loading: false,
					data: action.data
				}
			} as IRegistrationState;
		}
		case RegistrationActionTypes.IsLeaderByNationalCodeFailed: {
			return {
				...state,
				isLeaderByNationalCode: {
					loading: false
				}
			} as IRegistrationState;
		}

		case RegistrationActionTypes.GetKarvanRegister: {
			return {
				...state,
				getKarvanRegisterHistory: {
					loading: true
				}
			} as IRegistrationState;
		}
		case RegistrationActionTypes.GetKarvanRegisterSuccess: {
			return {
				...state,
				getKarvanRegisterHistory: {
					...state.getKarvanRegisterHistory,
					loading: false,
					data: action.data
				}
			} as IRegistrationState;
		}
		case RegistrationActionTypes.GetKarvanRegisterFailed: {
			return {
				...state,
				getKarvanRegisterHistory: {
					loading: false
				}
			} as IRegistrationState;
		}

		case RegistrationActionTypes.IsChechPromiseSuccess: {
			return {
				...state,
				isChechPromise: {
					...state.isChechPromise,
					loading: false,
					data: action.data
				}
			} as IRegistrationState;
		}
		case RegistrationActionTypes.IsChechPromiseFailed: {
			return {
				...state,
				isChechPromise: {
					loading: false
				}
			} as IRegistrationState;
		}
		case RegistrationActionTypes.IsChechPromise: {
			return {
				...state,
				isChechPromise: {
					loading: true
				}
			} as IRegistrationState;
		}

		case RegistrationActionTypes.PrintReserveZaerSuccess: {
			return {
				...state,
				printData: {
					...state.printData,
					loading: false,
					data: action.data
				}
			} as IRegistrationState;
		}
		case RegistrationActionTypes.PrintReserveZaerFailed: {
			return {
				...state,
				printData: {
					loading: false
				}
			} as IRegistrationState;
		}
		case RegistrationActionTypes.PrintReserveZaer: {
			return {
				...state,
				printData: {
					loading: true
				}
			} as IRegistrationState;
		}

		case RegistrationActionTypes.CreateReserveZaerSuccess: {
			return {
				...state,
				createReserveZaerData: {
					...state.createReserveZaerData,
					loading: false,
					data: action.data,
					x: false
				}
			} as IRegistrationState;
		}
		case RegistrationActionTypes.CreateReserveZaerFailed: {
			return {
				...state,
				createReserveZaerData: {
					loading: false
				}
			} as IRegistrationState;
		}
		case RegistrationActionTypes.CreateReserveZaer: {
			return {
				...state,
				createReserveZaerData: {
					loading: true
				}
			} as IRegistrationState;
		}

		case RegistrationActionTypes.GetPersonInfoSuccess: {
			return {
				...state,
				personInfo: {
					...state.personInfo,
					loading: false,
					data: action.data
				}
			} as IRegistrationState;
		}
		case RegistrationActionTypes.GetPersonInfoFailed: {
			return {
				...state,
				personInfo: {
					loading: false
				}
			} as IRegistrationState;
		}
		case RegistrationActionTypes.GetPersonInfo: {
			return {
				...state,
				personInfo: {
					loading: true
				}
			} as IRegistrationState;
		}
		case RegistrationActionTypes.ClearPersonInfo: {
			return {
				...state,
				personInfo: {
					data: action.data
				}
			} as IRegistrationState;
		}
		case RegistrationActionTypes.PushAlert: {
			return {
				...state,
				alerts: [...state.alerts, action.alert]
			} as IRegistrationState;
		}
		case RegistrationActionTypes.ClearAlerts: {
			return {
				...state,
				alerts: []
			} as IRegistrationState;
		}

		case RegistrationActionTypes.SanadAghlambaz: {
			return {
				...state,
				aghlamBaz: {
					...state.aghlamBaz,
					loading: true
				}
			} as IRegistrationState;
		}
		case RegistrationActionTypes.SanadAghlambazSuccess: {
			return {
				...state,
				aghlamBaz: {
					...state.aghlamBaz,
					loading: false,
					data: action.data,
					errors: action.errors
				}
			} as IRegistrationState;
		}
		case RegistrationActionTypes.SanadAghlambazFailed: {
			return {
				...state,
				aghlamBaz: {
					loading: false
				}
			} as IRegistrationState;
		}

		case RegistrationActionTypes.GetSearchKarvanList: {
			return {
				...state,
				resultSerchKarvanList: {
					...state.resultSerchKarvanList,
					loading: true
				}
			} as IRegistrationState;
		}
		case RegistrationActionTypes.GetSearchKarvanListSuccess: {
			return {
				...state,
				resultSerchKarvanList: {
					...state.resultSerchKarvanList,
					loading: false,
					data: action.data
				}
			} as IRegistrationState;
		}
		case RegistrationActionTypes.GetSearchKarvanListFailed: {
			return {
				...state,
				resultSerchKarvanList: {
					loading: false
				}
			} as IRegistrationState;
		}

		case RegistrationActionTypes.GetListSanadFromSahmiehAndFarakhan: {
			return {
				...state,
				listSanad: {
					...state.listSanad,
					loading: false
				}
			} as IRegistrationState;
		}
		case RegistrationActionTypes.GetListSanadFromSahmiehAndFarakhanSuccess: {
			return {
				...state,
				listSanad: {
					...state.listSanad,
					loading: false,
					data: action.data
				}
			} as IRegistrationState;
		}
		case RegistrationActionTypes.GetListSanadFromSahmiehAndFarakhanFailed: {
			return {
				...state,
				listSanad: {
					loading: false
				}
			} as IRegistrationState;
		}

		case RegistrationActionTypes.GetListPriceKarvans: {
			return {
				...state,
				priceKarvanList: {
					...state.priceKarvanList,
					priceKarvanList: false
				}
			} as IRegistrationState;
		}
		case RegistrationActionTypes.GetListPriceKarvansFailed: {
			return {
				...state,
				priceKarvanList: {
					loading: false
				}
			} as IRegistrationState;
		}
		case RegistrationActionTypes.GetListPriceKarvansSuccess: {
			return {
				...state,
				priceKarvanList: {
					...state.priceKarvanList,
					loading: false,
					data: action.data
				}
			} as IRegistrationState;
		}
		case RegistrationActionTypes.CancelUserRegistration: {
			return {
				...state,
				cancelUserRegistration: {
					loading: action.loading
				}
			} as IRegistrationState;
		}

		//     Alireza ------------------------------------------------------------------------------------------------------------------------------- start

		case RegistrationActionTypes.CreateReserve: {
			return {
				...state,
				RejectReceivedSalesSanad: {
					...state.RejectReceivedSalesSanad,
					loading: action.loading
				}
			} as IRegistrationState;
		}
		case RegistrationActionTypes.CreateReserveSuccess: {
			return {
				...state,
				RejectReceivedSalesSanad: {
					...state.RejectReceivedSalesSanad,
					loading: false
				}
			} as IRegistrationState;
		}

		case RegistrationActionTypes.ProvinceFetch: {
			return {
				...state,
				provinceList: {
					loading: true
				}
			} as IRegistrationState;
		}
		case RegistrationActionTypes.ProvinceFetchSuccess: {
			return {
				...state,
				provinceList: {
					...state.provinceList,
					data: action.data,
					loading: false
				}
			} as IRegistrationState;
		}
		case RegistrationActionTypes.ProvinceFetchFailed: {
			return {
				...state,
				provinceList: {
					...state.provinceList,
					loading: false
				}
			} as IRegistrationState;
		}
		case RegistrationActionTypes.CityFetch: {
			return {
				...state,
				cityList: {
					...state.cityList,
					loading: true
				}
			} as IRegistrationState;
		}
		case RegistrationActionTypes.CityFetchSuccess: {
			return {
				...state,
				cityList: {
					...state.cityList,
					loading: false,
					data: action.data
				}
			} as IRegistrationState;
		}
		case RegistrationActionTypes.CityFetchFailed: {
			return {
				...state,
				cityList: {
					...state.cityList,
					loading: false
				}
			} as IRegistrationState;
		}

		case RegistrationActionTypes.EbtalReserve: {
			return {
				...state,
				ebtalReserve: {
					...state.ebtalReserve,
					loading: action.loading
				}
			} as IRegistrationState;
		}
		case RegistrationActionTypes.EbtalReserveSuccess: {
			return {
				...state,
				ebtalReserve: {
					...state.ebtalReserve,
					loading: false
				}
			} as IRegistrationState;
		}

		case RegistrationActionTypes.GetPrintDetailList: {
			return {
				...state,
				getPrintDetailList: {
					loading: true
				}
			} as IRegistrationState;
		}
		case RegistrationActionTypes.GetPrintDetailListSuccess: {
			return {
				...state,
				getPrintDetailList: {
					...state.getPrintDetailList,
					loading: false,
					data: action.data
				}
			} as IRegistrationState;
		}
		case RegistrationActionTypes.GetPrintDetailListFailed: {
			return {
				...state,
				getPrintDetailList: {
					loading: false
				}
			} as IRegistrationState;
		}
		case RegistrationActionTypes.SetZaerProfileInfo: {
			return {
				...state,
				setZaerProfie: {
					loading: action.loading
				}
			} as IRegistrationState;
		}
		case RegistrationActionTypes.CreatePassengerGroup: {
			return {
				...state,
				createPassengerGroup: {
					loading: action.loading
				}
			} as IRegistrationState;
		}
		case RegistrationActionTypes.DeleteMember: {
			return {
				...state,
				deleteMember: {
					loading: action.loading
				}
			} as IRegistrationState;
		}
		case RegistrationActionTypes.AddMemberToGroup: {
			return {
				...state,
				addMemberGroup: {
					loading: action.loading
				}
			} as IRegistrationState;
		}
		case RegistrationActionTypes.GetPassengerProfile: {
			return {
				...state,
				passengerProfile: {
					loading: action.loading,
					data: action.data
				}
			} as IRegistrationState;
		}
		case RegistrationActionTypes.GetPassengerGroup: {
			return {
				...state,
				passengerGroup: {
					loading: action.loading,
					data: action.data
				}
			} as IRegistrationState;
		}

		case RegistrationActionTypes.GetUmrahPaymentHistory: {
			return {
				...state,
				paymentHistory: {
					loading: action.loading,
					data: action.data
				}
			} as IRegistrationState;
		}
		case RegistrationActionTypes.DeleteMemberGroup: {
			return {
				...state,
				deleteMemberGroup: {
					loading: action.loading
				}
			} as IRegistrationState;
		}
		case RegistrationActionTypes.ConfirmationPassenger: {
			return {
				...state,
				confirmationPassenger: {
					loading: action.loading,
					data: action.data
				}
			} as IRegistrationState;
		}
		case RegistrationActionTypes.ConfirmationGroup: {
			return {
				...state,
				confirmationGroupdata: {
					loading: action.loading,
					data: action.data
				}
			} as IRegistrationState;
		}
		case RegistrationActionTypes.GetAddressByPostalCode: {
			return {
				...state,
				addressByPostalCode: {
					loading: action.loading,
					data: action.data
				}
			} as IRegistrationState;
		}
		case RegistrationActionTypes.SelectNewLeader: {
			return {
				...state,
				newLeader: {
					loading: action.loading
				}
			} as IRegistrationState;
		}
		case RegistrationActionTypes.BeginReserve: {
			return {
				...state,
				beginReserve: {
					loading: action.loading
				}
			} as IRegistrationState;
		}
	}
	return state;
};
