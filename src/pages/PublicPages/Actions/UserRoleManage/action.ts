import { AppAction } from "../../../../store/state";
import { UserRoleManageActionTypes } from "./actionType";
import { KnownAction } from "./model";
import API from "../../../../components/general/baseURL";

export const userRoleManageActions = {
  setCrumbs: (crumbs: { title: string, link: string }[]): AppAction<KnownAction> => async (dispatch, getState) => {
    dispatch({ type: UserRoleManageActionTypes.SetCrumbs, crumbs });
  },

  getUserRolesList: (userId: string): AppAction<KnownAction> => async (dispatch, getState) => {
    dispatch({ type: UserRoleManageActionTypes.UserRolesFetch });
    try {
      const result = await API.get("/Accounts/Users/" + userId + "/Roles?page=1&pageSize=2000");
      if (result.status === 200) {
        dispatch({
          type: UserRoleManageActionTypes.UserRolesFetchSuccess,
          data: result.data.roles,
        });
      } else if (result.status === 204) {
        dispatch({ type: UserRoleManageActionTypes.UserRolesFetchSuccess, data: [] });
      } else if (result.status == 401) {
        dispatch({ type: UserRoleManageActionTypes.UserRolesFetchSuccess, data: [] });
        userRoleManageActions.pushAlert(
          {
            title: "error",
            description: "UnauthorizedError",
            variant: 'warning'
          }
        )(dispatch, getState);
      }
    } catch (error) {
      dispatch({ type: UserRoleManageActionTypes.UserRolesFetchFailed });
      userRoleManageActions.pushAlert(
        {
          title: "error",
          description: "UnSuccessfetchData",
          variant: 'warning'
        }
      )(dispatch, getState);
    }
  },

  getRoleList: (): AppAction<KnownAction> => async (dispatch, getState) => {
    dispatch({ type: UserRoleManageActionTypes.RoleFetch });
    try {
      const result = await API.get("/Accounts/Roles?page=1&pageSize=2000");
      if (result.status == 200) {
        let items: any = result.data.roles.map(function (item: any) {
          return {
            value: item.id,
            label: item.name
          };
        });
        dispatch({
          type: UserRoleManageActionTypes.RoleFetchSuccess,
          data: items,
        });
        userRoleManageActions.toggleCreateUserRoleModal(true)(dispatch, getState);
      } else if (result.status == 204) {
        dispatch({ type: UserRoleManageActionTypes.RoleFetchSuccess, data: [] });
        userRoleManageActions.pushAlert(
          {
            title: "error",
            description: "UnSuccessfetchData",
            variant: 'warning'
          }
        )(dispatch, getState);
      } else if (result.status == 401) {
        dispatch({ type: UserRoleManageActionTypes.RoleFetchSuccess, data: [] });
        userRoleManageActions.pushAlert(
          {
            title: "error",
            description: "UnauthorizedError",
            variant: 'warning'
          }
        )(dispatch, getState);
      }
    } catch (error) {
      dispatch({ type: UserRoleManageActionTypes.RoleFetchFailed });
    }
  },

  saveUserRole: (data: any): AppAction<KnownAction> => async (dispatch, getState) => {
    dispatch({ type: UserRoleManageActionTypes.UserRoleCreate });
    try {
      const result = await API.post("/Accounts/Users/Roles", data);
      if (result.status == 200) {
        dispatch({ type: UserRoleManageActionTypes.UserRoleCreateSuccess });
        userRoleManageActions.getUserRolesList(data.userId)(dispatch, getState);
        userRoleManageActions.pushAlert(
          {
            title: "information",
            description: "SuccessfulOperation",
            variant: 'success'
          }
        )(dispatch, getState);
      } else if (result.status == 401) {
        dispatch({ type: UserRoleManageActionTypes.UserRoleCreateFailed });
        userRoleManageActions.pushAlert(
          {
            title: "error",
            description: "UnauthorizedError",
            variant: 'warning'
          }
        )(dispatch, getState);
      }
    } catch (error) {
      dispatch({ type: UserRoleManageActionTypes.UserRoleCreateFailed });
      userRoleManageActions.showRequestErrors(error)(dispatch, getState);
    }
  },
  toggleCreateUserRoleModal: (Visible: boolean): AppAction<KnownAction> => async (dispatch, getState) => {
    if (!getState().userRoleManage.userRoleCreate.Visible)
      userRoleManageActions.closeAllModal()(dispatch, getState);
    dispatch({ type: UserRoleManageActionTypes.UserRoleCreateModal, Visible: Visible });
  },

  deleteUserRole: (): AppAction<KnownAction> => async (dispatch, getState) => {
    let userId = getState().userRoleManage.delete.userId;
    let id = getState().userRoleManage.delete.id;
    dispatch({ type: UserRoleManageActionTypes.UserRoleDelete });
    try {
      const result = await API.delete("/Accounts/Users/Roles?userId=" + String(userId) + "&roleId=" + String(id));
      if (result.status == 200) {
        dispatch({ type: UserRoleManageActionTypes.UserRoleDeleteSuccess });
        userRoleManageActions.getUserRolesList(userId)(dispatch, getState);
        userRoleManageActions.pushAlert(
          {
            title: "information",
            description: "SuccessfulOperation",
            variant: 'success'
          }
        )(dispatch, getState);
      } else if (result.status == 401) {
        dispatch({ type: UserRoleManageActionTypes.UserRoleDeleteFailed });
        userRoleManageActions.pushAlert(
          {
            title: "error",
            description: "UnauthorizedError",
            variant: 'warning'
          }
        )(dispatch, getState);
      }
    } catch (error) {
      dispatch({ type: UserRoleManageActionTypes.UserRoleDeleteFailed });
      userRoleManageActions.showRequestErrors(error)(dispatch, getState);
    }
  },
  toggleDeleteUserRoleModal: (userId: string, id: string, Visible: boolean): AppAction<KnownAction> => async (dispatch, getState) => {
    dispatch({
      type: UserRoleManageActionTypes.UserRoleDeleteModal,
      userId,
      id,
      Visible: Visible,
    });
  },

  pushAlert: (
    alert: {
      title: string,
      description: string,
      variant: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark',
      dismissTime?: number
    }
  ): AppAction<KnownAction> => async (dispatch, getState) => {
    dispatch({
      type: UserRoleManageActionTypes.PushAlert,
      alert
    });
  },
  clearAlerts: (): AppAction<KnownAction> => async (dispatch, getState) => {
    dispatch({ type: UserRoleManageActionTypes.ClearAlerts });
  },
  showRequestErrors: (error: any): AppAction<KnownAction> => async (dispatch, getState) => {
    if (error.response.data && error.response.data.length > 0) {
      let errors = "";
      for (var i = 0; i < error.response.data.length; i++)
        errors += (errors == "" ? "" : "\n") + error.response.data[i];
      userRoleManageActions.pushAlert(
        {
          title: "information",
          description: errors,
          variant: 'danger'
        }
      )(dispatch, getState);
    } else {
      userRoleManageActions.pushAlert(
        {
          title: "error",
          description: "UnSuccessfulOperation",
          variant: 'danger'
        }
      )(dispatch, getState);
    }
  },

  closeAllModal: (): AppAction<KnownAction> => async (dispatch, getState) => {
    dispatch({ type: UserRoleManageActionTypes.UserRoleCreateModal, Visible: false });
  },
};
