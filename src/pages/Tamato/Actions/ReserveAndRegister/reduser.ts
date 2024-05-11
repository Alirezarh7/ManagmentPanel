import { Reducer } from 'redux';
import { ReserveAndRegisterActionTypes } from './actionType';
import { IReserveAndRegisterState, KnownAction } from './model';

const unloadedState: IReserveAndRegisterState = {
	personInfo: {
		loading: false,
		data: []
	},
	zaerInfo: {
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
	sendBankData: {
		loading: false,
		data: []
	},
	getSendBankData: {
		data: [],
		loading: false
	},
	listSanad: {
		loading: false,
		data: []
	},
	setCancelReserve: {
		loading: false
	},
	alerts: []
};

export const ReserveAndRegisterReducer: Reducer<IReserveAndRegisterState, KnownAction> = (
	state: IReserveAndRegisterState = unloadedState,
	action: KnownAction
) => {
	switch (action.type) {
		case ReserveAndRegisterActionTypes.GetPaymentZaerSuccess: {
			return {
				...state,
				getPaymentData: {
					...state.getPaymentData,
					loading: false,
					data: action.data
				}
			} as IReserveAndRegisterState;
		}
		case ReserveAndRegisterActionTypes.GetPaymentZaerFailed: {
			return {
				...state,
				getPaymentData: {
					loading: false
				}
			} as IReserveAndRegisterState;
		}
		case ReserveAndRegisterActionTypes.GetPaymentZaer: {
			return {
				...state,
				getPaymentData: {
					loading: true
				}
			} as IReserveAndRegisterState;
		}

		case ReserveAndRegisterActionTypes.CreateSignUnderTakingSuccess: {
			return {
				...state,
				createSignUnderTaking: {
					...state.createSignUnderTaking,
					loading: false,
					data: action.data
				}
			} as IReserveAndRegisterState;
		}
		case ReserveAndRegisterActionTypes.CreateSignUnderTakingFailed: {
			return {
				...state,
				createSignUnderTaking: {
					loading: false
				}
			} as IReserveAndRegisterState;
		}
		case ReserveAndRegisterActionTypes.CreateSignUnderTaking: {
			return {
				...state,
				createSignUnderTaking: {
					loading: true
				}
			} as IReserveAndRegisterState;
		}

		case ReserveAndRegisterActionTypes.IsChechPromiseSuccess: {
			return {
				...state,
				isChechPromise: {
					...state.isChechPromise,
					loading: false,
					data: action.data
				}
			} as IReserveAndRegisterState;
		}
		case ReserveAndRegisterActionTypes.IsChechPromiseFailed: {
			return {
				...state,
				isChechPromise: {
					loading: false
				}
			} as IReserveAndRegisterState;
		}
		case ReserveAndRegisterActionTypes.IsChechPromise: {
			return {
				...state,
				isChechPromise: {
					loading: true
				}
			} as IReserveAndRegisterState;
		}

		case ReserveAndRegisterActionTypes.PrintReserveZaerSuccess: {
			return {
				...state,
				printData: {
					...state.printData,
					loading: false,
					data: action.data
				}
			} as IReserveAndRegisterState;
		}
		case ReserveAndRegisterActionTypes.PrintReserveZaerFailed: {
			return {
				...state,
				printData: {
					loading: false
				}
			} as IReserveAndRegisterState;
		}
		case ReserveAndRegisterActionTypes.PrintReserveZaer: {
			return {
				...state,
				printData: {
					loading: true
				}
			} as IReserveAndRegisterState;
		}

		case ReserveAndRegisterActionTypes.CreateReserveZaerSuccess: {
			return {
				...state,
				createReserveZaerData: {
					...state.createReserveZaerData,
					loading: false,
					data: action.data,
					x: false
				}
			} as IReserveAndRegisterState;
		}
		case ReserveAndRegisterActionTypes.CreateReserveZaerFailed: {
			return {
				...state,
				createReserveZaerData: {
					loading: false
				}
			} as IReserveAndRegisterState;
		}
		case ReserveAndRegisterActionTypes.CreateReserveZaer: {
			return {
				...state,
				createReserveZaerData: {
					loading: true
				}
			} as IReserveAndRegisterState;
		}

		case ReserveAndRegisterActionTypes.GetPersonInfoSuccess: {
			return {
				...state,
				personInfo: {
					...state.personInfo,
					loading: false,
					data: action.data
				}
			} as IReserveAndRegisterState;
		}
		case ReserveAndRegisterActionTypes.GetPersonInfoFailed: {
			return {
				...state,
				personInfo: {
					loading: false
				}
			} as IReserveAndRegisterState;
		}
		case ReserveAndRegisterActionTypes.GetPersonInfo: {
			return {
				...state,
				personInfo: {
					loading: true
				}
			} as IReserveAndRegisterState;
		}
		case ReserveAndRegisterActionTypes.PushAlert: {
			return {
				...state,
				alerts: [...state.alerts, action.alert]
			} as IReserveAndRegisterState;
		}
		case ReserveAndRegisterActionTypes.ClearAlerts: {
			return {
				...state,
				alerts: []
			} as IReserveAndRegisterState;
		}

		case ReserveAndRegisterActionTypes.GetZaerForReservation: {
			return {
				...state,
				zaerInfo: {
					...state.zaerInfo,
					loading: false
				}
			} as IReserveAndRegisterState;
		}
		case ReserveAndRegisterActionTypes.GetZaerForReservationSuccess: {
			return {
				...state,
				zaerInfo: {
					...state.zaerInfo,
					loading: false,
					data: action.data,
					errors: action.errors
				}
			} as IReserveAndRegisterState;
		}
		case ReserveAndRegisterActionTypes.GetZaerForReservationFailed: {
			return {
				...state,
				zaerInfo: {
					loading: false
				}
			} as IReserveAndRegisterState;
		}

		case ReserveAndRegisterActionTypes.GetSearchKarvanList: {
			return {
				...state,
				resultSerchKarvanList: {
					...state.resultSerchKarvanList,
					loading: true
				}
			} as IReserveAndRegisterState;
		}
		case ReserveAndRegisterActionTypes.GetSearchKarvanListSuccess: {
			return {
				...state,
				resultSerchKarvanList: {
					...state.resultSerchKarvanList,
					loading: false,
					data: action.data
				}
			} as IReserveAndRegisterState;
		}
		case ReserveAndRegisterActionTypes.GetSearchKarvanListFailed: {
			return {
				...state,
				resultSerchKarvanList: {
					loading: false
				}
			} as IReserveAndRegisterState;
		}

		case ReserveAndRegisterActionTypes.GetListSanadFromSahmiehAndFarakhan: {
			return {
				...state,
				listSanad: {
					...state.listSanad,
					loading: false
				}
			} as IReserveAndRegisterState;
		}
		case ReserveAndRegisterActionTypes.GetListSanadFromSahmiehAndFarakhanSuccess: {
			return {
				...state,
				listSanad: {
					...state.listSanad,
					loading: false,
					data: action.data
				}
			} as IReserveAndRegisterState;
		}
		case ReserveAndRegisterActionTypes.GetListSanadFromSahmiehAndFarakhanFailed: {
			return {
				...state,
				listSanad: {
					loading: false
				}
			} as IReserveAndRegisterState;
		}

		case ReserveAndRegisterActionTypes.GetListPriceKarvans: {
			return {
				...state,
				priceKarvanList: {
					...state.priceKarvanList,
					priceKarvanList: false
				}
			} as IReserveAndRegisterState;
		}
		case ReserveAndRegisterActionTypes.GetListPriceKarvansFailed: {
			return {
				...state,
				priceKarvanList: {
					loading: false
				}
			} as IReserveAndRegisterState;
		}
		case ReserveAndRegisterActionTypes.GetListPriceKarvansSuccess: {
			return {
				...state,
				priceKarvanList: {
					...state.priceKarvanList,
					loading: false,
					data: action.data
				}
			} as IReserveAndRegisterState;
		}
	}
	return state;
};
