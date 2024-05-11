import { Reducer } from 'redux';
import { UserRoleManageActionTypes } from './actionType';
import { IUserRoleManageState, KnownAction } from './model';

const unloadedState: IUserRoleManageState = {
	userRolesList: {
		loading: false,
		data: []
	},
	roleList: {
		loading: false,
		data: []
	},
	userRoleCreate: {
		loading: false,
		Visible: false
	},
	delete: {
		loading: false,
		Visible: false,
		userId: '',
		id: ''
	},
	alerts: [],
	crumbs: []
};

export const UserRoleManageReducer: Reducer<IUserRoleManageState, KnownAction> = (
	state: IUserRoleManageState = unloadedState,
	action: KnownAction
) => {
	switch (action.type) {
		case UserRoleManageActionTypes.SetCrumbs: {
			return {
				...state,
				crumbs: action.crumbs
			} as IUserRoleManageState;
		}
		case UserRoleManageActionTypes.UserRolesFetch: {
			return {
				...state,
				userRolesList: {
					...state.userRolesList,
					loading: true
				}
			} as IUserRoleManageState;
		}
		case UserRoleManageActionTypes.UserRolesFetchSuccess: {
			return {
				...state,
				userRolesList: {
					...state.userRolesList,
					loading: false,
					data: action.data
				}
			} as IUserRoleManageState;
		}
		case UserRoleManageActionTypes.UserRolesFetchFailed: {
			return {
				...state,
				userRolesList: {
					...state.userRolesList,
					loading: false
				}
			} as IUserRoleManageState;
		}

		case UserRoleManageActionTypes.RoleFetch: {
			return {
				...state,
				roleList: {
					...state.roleList,
					loading: true
				}
			} as IUserRoleManageState;
		}
		case UserRoleManageActionTypes.RoleFetchSuccess: {
			return {
				...state,
				roleList: {
					...state.roleList,
					loading: false,
					data: action.data
				}
			} as IUserRoleManageState;
		}
		case UserRoleManageActionTypes.RoleFetchFailed: {
			return {
				...state,
				roleList: {
					...state.roleList,
					loading: false
				}
			} as IUserRoleManageState;
		}

		case UserRoleManageActionTypes.UserRoleCreate: {
			return {
				...state,
				userRoleCreate: {
					...state.userRoleCreate,
					loading: true
				}
			} as IUserRoleManageState;
		}
		case UserRoleManageActionTypes.UserRoleCreateSuccess: {
			return {
				...state,
				userRoleCreate: {
					...state.userRoleCreate,
					loading: false,
					Visible: false
				}
			} as IUserRoleManageState;
		}
		case UserRoleManageActionTypes.UserRoleCreateFailed: {
			return {
				...state,
				userRoleCreate: {
					...state.userRoleCreate,
					loading: false
				}
			} as IUserRoleManageState;
		}
		case UserRoleManageActionTypes.UserRoleCreateModal: {
			return {
				...state,
				userRoleCreate: {
					...state.userRoleCreate,
					Visible: action.Visible
				}
			} as IUserRoleManageState;
		}

		case UserRoleManageActionTypes.UserRoleDelete: {
			return {
				...state,
				delete: {
					...state.delete,
					loading: true
				}
			} as IUserRoleManageState;
		}
		case UserRoleManageActionTypes.UserRoleDeleteSuccess: {
			return {
				...state,
				delete: {
					...state.delete,
					loading: false,
					Visible: false
				}
			} as IUserRoleManageState;
		}
		case UserRoleManageActionTypes.UserRoleDeleteFailed: {
			return {
				...state,
				delete: {
					...state.delete,
					loading: false,
					Visible: false
				}
			} as IUserRoleManageState;
		}
		case UserRoleManageActionTypes.UserRoleDeleteModal: {
			return {
				...state,
				delete: {
					...state.delete,
					userId: action.userId,
					id: action.id,
					Visible: action.Visible
				}
			} as IUserRoleManageState;
		}

		case UserRoleManageActionTypes.PushAlert: {
			return {
				...state,
				alerts: [...state.alerts, action.alert]
			} as IUserRoleManageState;
		}
		case UserRoleManageActionTypes.ClearAlerts: {
			return {
				...state,
				alerts: []
			} as IUserRoleManageState;
		}
	}
	return state;
};
