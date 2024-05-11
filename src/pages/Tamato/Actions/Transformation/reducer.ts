import { Reducer } from 'redux';
import { TransformationActionTypes } from './actionType';
import { ITransformationState, KnownAction } from './model';

const unloadedState: ITransformationState = {
	transformations: {
		data: [],
		loading: false
	},
	transformationOffice: {
		data: [],
		loading: false
	},
	transformationPostOffice: {
		loading: false
	},

	transformationPostInformation: {
		loading: false
	},
	transformationSallSanad: {
		data: [],
		loading: false
	},
	transformationPostSellManager: {
		loading: false
	},
	TransformationRequestInformation: {
		data: [],
		loading: false
	},
	transformationRequest: {
		data: [],
		loading: false
	},
	cancelRequestShiftSanad: {
		loading: false
	},
	createRequestReceivedSalesSanad: {
		loading: false
	},
	CreateShiftSanadSalesManagerSucces: {
		loading: false
	},
	RejectReceivedSalesSanad: {
		loading: false
	},
	getProfilePersonShiftSanad: {
		data: [],
		loading: false
	},
	getCityProfile: {
		data: [],
		loading: false
	},

	alerts: [],
	crumbs: []
};
//(state: ITransformationState = unloadedState, action: KnownAction) == set a defult value
export const TransformationReducer: Reducer<ITransformationState, KnownAction> = (
	state: ITransformationState = unloadedState,
	action: KnownAction
) => {
	switch (action.type) {
		case TransformationActionTypes.SetCrumbs: {
			return {
				...state,
				crumbs: action.crumbs
			} as ITransformationState;
		}
		//GET way for have permission to continue
		case TransformationActionTypes.TransformationFetch: {
			return {
				...state,
				transformations: {
					...state.transformations,
					loading: true
				}
			} as ITransformationState;
		}
		case TransformationActionTypes.TransformationFetchSuccess: {
			return {
				...state,
				transformations: {
					...state.transformations,
					loading: false,
					data: action.data
				}
			} as ITransformationState;
		}
		case TransformationActionTypes.TransformationFetchFailed: {
			return {
				...state,
				transformations: {
					...state.transformations,
					loading: false
				}
			} as ITransformationState;
		}
		//GET office
		case TransformationActionTypes.TransformationOfficeCreate: {
			return {
				...state,
				transformationOffice: {
					...state.transformationOffice,
					loading: true
				}
			} as ITransformationState;
		}
		case TransformationActionTypes.TransformationOfficeFaild: {
			return {
				...state,
				transformationOffice: {
					...state.transformationOffice,
					loading: false
				}
			} as ITransformationState;
		}
		case TransformationActionTypes.TransformationOfficeSucces: {
			return {
				...state,
				transformationOffice: {
					...state.transformationOffice,
					loading: false,
					data: action.data
				}
			} as ITransformationState;
		}
		//POST office data
		case TransformationActionTypes.TransformationPostOffice: {
			return {
				...state,
				transformationPostOffice: {
					...state.transformationPostOffice,
					loading: action.loading
				}
			} as ITransformationState;
		}
		case TransformationActionTypes.TransformationPostOfficeSucces: {
			return {
				...state,
				transformationPostOffice: {
					...state.transformationPostOffice,
					loading: false
				}
			} as ITransformationState;
		}

		//1POST Infotmation data for sells
		case TransformationActionTypes.TransformationPostInfo: {
			return {
				...state,
				transformationPostInformation: {
					...state.transformationPostInformation,
					loading: action.loading
				}
			} as ITransformationState;
		}
		case TransformationActionTypes.TransformationPostInfoSucces: {
			return {
				...state,
				transformationPostInformation: {
					...state.transformationPostInformation,
					loading: false
				}
			} as ITransformationState;
		}
		//2GET Sanad for Sells
		case TransformationActionTypes.TransformationSanadForSale: {
			return {
				...state,
				transformationSallSanad: {
					...state.transformationSallSanad,
					loading: true
				}
			} as ITransformationState;
		}
		case TransformationActionTypes.TransformationSanadForSaleFaild: {
			return {
				...state,
				transformationSallSanad: {
					...state.transformationSallSanad,
					loading: false
				}
			} as ITransformationState;
		}
		case TransformationActionTypes.TransformationSanadForSaleSucces: {
			return {
				...state,
				transformationSallSanad: {
					...state.transformationSallSanad,
					loading: false,
					data: action.data
				}
			} as ITransformationState;
		}
		//3POST Saland Sells Manager
		case TransformationActionTypes.TransformationSellsManager: {
			return {
				...state,
				transformationPostSellManager: {
					...state.transformationPostSellManager,
					loading: action.loading
				}
			} as ITransformationState;
		}
		case TransformationActionTypes.TransformationSellsManagerSucces: {
			return {
				...state,
				transformationPostSellManager: {
					...state.transformationPostSellManager,
					loading: false
				}
			} as ITransformationState;
		}

		////////////////////////////////////////
		case TransformationActionTypes.TransformationRequest: {
			return {
				...state,
				transformationRequest: {
					...state.transformationRequest,
					loading: true
				}
			} as ITransformationState;
		}
		case TransformationActionTypes.TransformationRequestFaild: {
			return {
				...state,
				transformationRequest: {
					...state.transformationRequest,
					loading: false
				}
			} as ITransformationState;
		}
		case TransformationActionTypes.TransformationRequestSucces: {
			return {
				...state,
				transformationRequest: {
					...state.transformationRequest,
					loading: false,
					data: action.data
				}
			} as ITransformationState;
		}
		//6POST CancelRequestShiftSanad
		case TransformationActionTypes.CancelRequestShiftSanad: {
			return {
				...state,
				cancelRequestShiftSanad: {
					...state.cancelRequestShiftSanad,
					loading: action.loading
				}
			} as ITransformationState;
		}
		case TransformationActionTypes.CancelRequestShiftSanadSucces: {
			return {
				...state,
				cancelRequestShiftSanad: {
					...state.cancelRequestShiftSanad,
					loading: false
				}
			} as ITransformationState;
		}
		//7PostCreateRequestReceivedSalesSanad
		case TransformationActionTypes.CreateRequestReceivedSalesSanad: {
			return {
				...state,
				cancelRequestShiftSanad: {
					...state.cancelRequestShiftSanad,
					loading: action.loading
				}
			} as ITransformationState;
		}
		case TransformationActionTypes.CreateRequestReceivedSalesSanadSucces: {
			return {
				...state,
				cancelRequestShiftSanad: {
					...state.cancelRequestShiftSanad,
					loading: false
				}
			} as ITransformationState;
		}
		//8PostCreateRequestReceivedSalesSanad
		case TransformationActionTypes.CreateShiftSanadSalesManager: {
			return {
				...state,
				CreateShiftSanadSalesManagerSucces: {
					...state.CreateShiftSanadSalesManagerSucces,
					loading: action.loading
				}
			} as ITransformationState;
		}
		case TransformationActionTypes.CreateShiftSanadSalesManagerSucces: {
			return {
				...state,
				CreateShiftSanadSalesManagerSucces: {
					...state.CreateShiftSanadSalesManagerSucces,
					loading: false
				}
			} as ITransformationState;
		}
		//9PostCreateRequestReceivedSalesSanad
		case TransformationActionTypes.RejectReceivedSalesSanad: {
			return {
				...state,
				RejectReceivedSalesSanad: {
					...state.RejectReceivedSalesSanad,
					loading: action.loading
				}
			} as ITransformationState;
		}
		case TransformationActionTypes.RejectReceivedSalesSanadSucces: {
			return {
				...state,
				RejectReceivedSalesSanad: {
					...state.RejectReceivedSalesSanad,
					loading: false
				}
			} as ITransformationState;
		}
		//10GetProfilePersonShiftSanad
		case TransformationActionTypes.GetProfilePersonShiftSanad: {
			return {
				...state,
				getProfilePersonShiftSanad: {
					...state.getProfilePersonShiftSanad,
					loading: true
				}
			} as ITransformationState;
		}
		case TransformationActionTypes.GetProfilePersonShiftSanadFaild: {
			return {
				...state,
				getProfilePersonShiftSanad: {
					...state.getProfilePersonShiftSanad,
					loading: false
				}
			} as ITransformationState;
		}
		case TransformationActionTypes.GetProfilePersonShiftSanadSucces: {
			return {
				...state,
				getProfilePersonShiftSanad: {
					...state.getProfilePersonShiftSanad,
					loading: false,
					data: action.data
				}
			} as ITransformationState;
		}
		//11GetCityProfile
		case TransformationActionTypes.GetCityProfile: {
			return {
				...state,
				getCityProfile: {
					...state.getProfilePersonShiftSanad,
					loading: true
				}
			} as ITransformationState;
		}
		case TransformationActionTypes.GetCityProfileFailed: {
			return {
				...state,
				getCityProfile: {
					...state.getProfilePersonShiftSanad,
					loading: false
				}
			} as ITransformationState;
		}
		case TransformationActionTypes.GetCityProfileSuccess: {
			return {
				...state,
				getCityProfile: {
					...state.getProfilePersonShiftSanad,
					loading: false,
					data: action.data
				}
			} as ITransformationState;
		}

		case TransformationActionTypes.PushAlert: {
			return {
				...state,
				alerts: [...state.alerts, action.alert]
			} as ITransformationState;
		}
		case TransformationActionTypes.ClearAlerts: {
			return {
				...state,
				alerts: []
			} as ITransformationState;
		}
	}
	return state;
};
