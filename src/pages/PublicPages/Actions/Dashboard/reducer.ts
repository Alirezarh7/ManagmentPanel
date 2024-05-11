import { Reducer } from 'redux';
import { DashboardActionTypes } from './actionType';
import { IDashboardState, KnownAction } from './model';

const unloadedState: IDashboardState = {
	userPassUpdate: {
		loading: false,
		Visible: false
	},
	logoutConfirm: {
		visible: false
	},
	userClaims: {
		roles: [],
		services: [],
		controllers: [],
		actions: [],
		isLogOut: false
	},
	personCreate: {
		loading: false
	},
	createToken: {
		loading: false
	},
	alerts: [],
	crumbs: []
};

export const DashboardReducer: Reducer<IDashboardState, KnownAction> = (
	state: IDashboardState = unloadedState,
	action: KnownAction
) => {
	switch (action.type) {
		case DashboardActionTypes.SetCrumbs: {
			return {
				...state,
				crumbs: action.crumbs
			} as IDashboardState;
		}
		case DashboardActionTypes.UserPassUpdate: {
			return {
				...state,
				userPassUpdate: {
					...state.userPassUpdate,
					loading: true
				}
			} as IDashboardState;
		}
		case DashboardActionTypes.UserPassUpdateSuccess: {
			return {
				...state,
				userPassUpdate: {
					...state.userPassUpdate,
					loading: false,
					Visible: false
				}
			} as IDashboardState;
		}
		case DashboardActionTypes.UserPassUpdateFailed: {
			return {
				...state,
				userPassUpdate: {
					...state.userPassUpdate,
					loading: false
				}
			} as IDashboardState;
		}
		case DashboardActionTypes.UserPassUpdateModal: {
			return {
				...state,
				userPassUpdate: {
					...state.userPassUpdate,
					Visible: action.Visible
				}
			} as IDashboardState;
		}

		case DashboardActionTypes.UserClaimsSet: {
			return {
				...state,
				userClaims: {
					...state.userClaims,
					roles: action.roles,
					services: action.services,
					controllers: action.controllers,
					actions: action.actions
				}
			} as IDashboardState;
		}
		case DashboardActionTypes.UserClaimsClear: {
			return {
				...state,
				userClaims: {
					...state.userClaims,
					services: [],
					controllers: [],
					actions: [],
					isLogOut: true
				}
			} as IDashboardState;
		}

		case DashboardActionTypes.LogoutConfirm: {
			return {
				...state,
				logoutConfirm: {
					visible: action.visible
				}
			} as IDashboardState;
		}

		case DashboardActionTypes.CreatePerson: {
			return {
				...state,
				personCreate: {
					loading: false
				}
			} as IDashboardState;
		}

		case DashboardActionTypes.CreatePersonSuccess: {
			return {
				...state,
				personCreate: {
					loading: false
				}
			} as IDashboardState;
		}

		case DashboardActionTypes.CreatePersonFailed: {
			return {
				...state,
				personCreate: {
					loading: true
				}
			} as IDashboardState;
		}
		case DashboardActionTypes.CreateTokenFaild: {
			return {
				...state,
				createToken: {
					loading: false
				}
			} as IDashboardState;
		}

		case DashboardActionTypes.CreateTokenSuccess: {
			return {
				...state,
				createToken: {
					loading: false
				}
			} as IDashboardState;
		}

		case DashboardActionTypes.CreateToken: {
			return {
				...state,
				createToken: {
					loading: true
				}
			} as IDashboardState;
		}

		case DashboardActionTypes.PushAlert: {
			return {
				...state,
				alerts: [...state.alerts, action.alert]
			} as IDashboardState;
		}
		case DashboardActionTypes.ClearAlerts: {
			return {
				...state,
				alerts: []
			} as IDashboardState;
		}
	}
	return state;
};
