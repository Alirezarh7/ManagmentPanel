import { Reducer } from 'redux';
import { UserManageActionTypes } from './actionType';
import { IUserManageState, KnownAction } from './model';

const unloadedState: IUserManageState = {
	usersList: {
		loading: false,
		data: []
	},
	userView: {
		loading: false,
		item: {},
		Visible: false
	},
	userCreate: {
		loading: false,
		Visible: false
	},
	genderAuthorization: {
		loading: false,
		Visible: false,
		item: {}
	},
	userUpdate: {
		loading: false,
		item: {},
		Visible: false
	},
	userClaimsList: {
		loading: false
	},
	accessList: {
		loading: false,
		data: []
	},
	userClaimsCreate: {
		loading: false
	},
	userPassUpdate: {
		loading: false,
		userId: '',
		Visible: false
	},
	delete: {
		loading: false,
		Visible: false,
		id: ''
	},
	alerts: [],
	crumbs: []
};

export const UserManageReducer: Reducer<IUserManageState, KnownAction> = (
	state: IUserManageState = unloadedState,
	action: KnownAction
) => {
	switch (action.type) {
		case UserManageActionTypes.SetCrumbs: {
			return {
				...state,
				crumbs: action.crumbs
			} as IUserManageState;
		}
		case UserManageActionTypes.UsersFetch: {
			return {
				...state,
				usersList: {
					...state.usersList,
					loading: true
				}
			} as IUserManageState;
		}
		case UserManageActionTypes.UsersFetchSuccess: {
			return {
				...state,
				usersList: {
					...state.usersList,
					loading: false,
					data: action.data
				}
			} as IUserManageState;
		}
		case UserManageActionTypes.UsersFetchFailed: {
			return {
				...state,
				usersList: {
					...state.usersList,
					loading: false
				}
			} as IUserManageState;
		}

		case UserManageActionTypes.UserViewModal: {
			return {
				...state,
				userView: {
					...state.userView,
					item: action.item,
					Visible: action.Visible
				}
			} as IUserManageState;
		}

		case UserManageActionTypes.UserCreate: {
			return {
				...state,
				userCreate: {
					...state.userCreate,
					loading: true
				}
			} as IUserManageState;
		}
		case UserManageActionTypes.UserCreateSuccess: {
			return {
				...state,
				userCreate: {
					...state.userCreate,
					loading: false,
					Visible: false
				}
			} as IUserManageState;
		}
		case UserManageActionTypes.UserCreateFailed: {
			return {
				...state,
				userCreate: {
					...state.userCreate,
					loading: false
				}
			} as IUserManageState;
		}
		case UserManageActionTypes.UserCreateModal: {
			return {
				...state,
				userCreate: {
					...state.userCreate,
					Visible: action.Visible
				}
			} as IUserManageState;
		}
		case UserManageActionTypes.GenderAuthorizationModal: {
			return {
				...state,
				genderAuthorization: {
					...state.genderAuthorization,
					Visible: action.Visible,
					item: action.item
				}
			} as IUserManageState;
		}
		case UserManageActionTypes.UserUpdate: {
			return {
				...state,
				userUpdate: {
					...state.userUpdate,
					loading: true
				}
			} as IUserManageState;
		}
		case UserManageActionTypes.UserUpdateSuccess: {
			return {
				...state,
				userUpdate: {
					...state.userUpdate,
					loading: false,
					Visible: false,
					item: {}
				}
			} as IUserManageState;
		}
		case UserManageActionTypes.UserUpdateFailed: {
			return {
				...state,
				userUpdate: {
					...state.userUpdate,
					loading: false
				}
			} as IUserManageState;
		}
		case UserManageActionTypes.UserUpdateModal: {
			return {
				...state,
				userUpdate: {
					...state.userUpdate,
					item: action.item,
					Visible: action.Visible
				}
			} as IUserManageState;
		}

		case UserManageActionTypes.UserClaimsFetch: {
			return {
				...state,
				userClaimsList: {
					...state.userClaimsList,
					loading: true
				}
			} as IUserManageState;
		}
		case UserManageActionTypes.UserClaimsFetchSuccess: {
			return {
				...state,
				userClaimsList: {
					...state.userClaimsList,
					loading: false
				}
			} as IUserManageState;
		}
		case UserManageActionTypes.UserClaimsFetchFailed: {
			return {
				...state,
				userClaimsList: {
					...state.userClaimsList,
					loading: false
				}
			} as IUserManageState;
		}

		case UserManageActionTypes.AccessFetch: {
			return {
				...state,
				accessList: {
					...state.accessList,
					loading: true
				}
			} as IUserManageState;
		}
		case UserManageActionTypes.AccessFetchSuccess: {
			return {
				...state,
				accessList: {
					...state.accessList,
					loading: false,
					data: action.data
				}
			} as IUserManageState;
		}
		case UserManageActionTypes.AccessFetchFailed: {
			return {
				...state,
				accessList: {
					...state.accessList,
					loading: false
				}
			} as IUserManageState;
		}

		case UserManageActionTypes.UserClaimsCreate: {
			return {
				...state,
				userClaimsCreate: {
					...state.userClaimsCreate,
					loading: true
				}
			} as IUserManageState;
		}
		case UserManageActionTypes.UserClaimsCreateSuccess: {
			return {
				...state,
				userClaimsCreate: {
					...state.userClaimsCreate,
					loading: false
				}
			} as IUserManageState;
		}
		case UserManageActionTypes.UserClaimsCreateFailed: {
			return {
				...state,
				userClaimsCreate: {
					...state.userClaimsCreate,
					loading: false
				}
			} as IUserManageState;
		}

		case UserManageActionTypes.UserPassUpdate: {
			return {
				...state,
				userPassUpdate: {
					...state.userPassUpdate,
					loading: true
				}
			} as IUserManageState;
		}
		case UserManageActionTypes.UserPassUpdateSuccess: {
			return {
				...state,
				userPassUpdate: {
					...state.userPassUpdate,
					loading: false,
					Visible: false,
					userId: ''
				}
			} as IUserManageState;
		}
		case UserManageActionTypes.UserPassUpdateFailed: {
			return {
				...state,
				userPassUpdate: {
					...state.userPassUpdate,
					loading: false
				}
			} as IUserManageState;
		}
		case UserManageActionTypes.UserPassUpdateModal: {
			return {
				...state,
				userPassUpdate: {
					...state.userPassUpdate,
					userId: action.userId,
					Visible: action.Visible
				}
			} as IUserManageState;
		}

		case UserManageActionTypes.UserDelete: {
			return {
				...state,
				delete: {
					...state.delete,
					loading: true
				}
			} as IUserManageState;
		}
		case UserManageActionTypes.UserDeleteSuccess: {
			return {
				...state,
				delete: {
					...state.delete,
					loading: false,
					Visible: false
				}
			} as IUserManageState;
		}
		case UserManageActionTypes.UserDeleteFailed: {
			return {
				...state,
				delete: {
					...state.delete,
					loading: false,
					Visible: false
				}
			} as IUserManageState;
		}
		case UserManageActionTypes.UserDeleteModal: {
			return {
				...state,
				delete: {
					...state.delete,
					id: action.id,
					Visible: action.Visible
				}
			} as IUserManageState;
		}

		case UserManageActionTypes.PushAlert: {
			return {
				...state,
				alerts: [...state.alerts, action.alert]
			} as IUserManageState;
		}
		case UserManageActionTypes.ClearAlerts: {
			return {
				...state,
				alerts: []
			} as IUserManageState;
		}
	}
	return state;
};
