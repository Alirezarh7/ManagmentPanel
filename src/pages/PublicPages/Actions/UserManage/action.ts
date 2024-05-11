import { AppAction } from "../../../../store/state";
import { UserManageActionTypes } from "./actionType";
import { KnownAction } from "./model";
import API from "../../../../components/general/baseURL";

export const userManageActions = {
  setCrumbs: (crumbs: { title: string, link: string }[]): AppAction<KnownAction> => async (dispatch, getState) => {
    dispatch({ type: UserManageActionTypes.SetCrumbs, crumbs });
  },

  getUsersList: (): AppAction<KnownAction> => async (dispatch, getState) => {
    dispatch({ type: UserManageActionTypes.UsersFetch });
    try {
      const result = await API.get("/Accounts/Users?page=1&pageSize=2000");
      if (result.status === 200) {
        dispatch({
          type: UserManageActionTypes.UsersFetchSuccess,
          data: result.data.users,
        });
      } else if (result.status === 204) {
        dispatch({ type: UserManageActionTypes.UsersFetchSuccess, data: [] });
      } else if (result.status == 401) {
        dispatch({ type: UserManageActionTypes.UsersFetchSuccess, data: [] });
        userManageActions.pushAlert(
          {
            title: "error",
            description: "UnauthorizedError",
            variant: 'warning'
          }
        )(dispatch, getState);
      }
    } catch (error) {
      dispatch({ type: UserManageActionTypes.UsersFetchFailed });
      userManageActions.pushAlert(
        {
          title: "error",
          description: "UnSuccessfetchData",
          variant: 'warning'
        }
      )(dispatch, getState);
    }
  },

  toggleViewUserModal: (item: object, Visible: boolean): AppAction<KnownAction> => async (dispatch, getState) => {
    if (!getState().userManage.userView.Visible) {
      userManageActions.closeAllModal()(dispatch, getState);
    }
    dispatch({
      type: UserManageActionTypes.UserViewModal,
      item,
      Visible: Visible,
    });
  },

  saveUser: (data: any): AppAction<KnownAction> => async (dispatch, getState) => {
    dispatch({ type: UserManageActionTypes.UserCreate });
    try {
      const result = await API.post("/Accounts/Users", data);
      if (result.status == 201) {
        dispatch({ type: UserManageActionTypes.UserCreateSuccess });
        userManageActions.getUsersList()(dispatch, getState);
        userManageActions.pushAlert(
          {
            title: "information",
            description: "SuccessfulOperation",
            variant: 'success'
          }
        )(dispatch, getState);
      } else if (result.status == 401) {
        dispatch({ type: UserManageActionTypes.UserCreateFailed });
        userManageActions.pushAlert(
          {
            title: "error",
            description: "UnauthorizedError",
            variant: 'warning'
          }
        )(dispatch, getState);
      }
    } catch (error) {
      dispatch({ type: UserManageActionTypes.UserCreateFailed });
      userManageActions.showRequestErrors(error)(dispatch, getState);
    }
  },
  toggleCreateUserModal: (Visible: boolean): AppAction<KnownAction> => async (dispatch, getState) => {
    if (!getState().userManage.userCreate.Visible)
      userManageActions.closeAllModal()(dispatch, getState);
    dispatch({ type: UserManageActionTypes.UserCreateModal, Visible: Visible });
  },
  toggleGenderAuthorizationModal: (item: object, Visible: boolean): AppAction<KnownAction> => async (dispatch, getState) => {
    if (!getState().userManage.genderAuthorization.Visible)
      userManageActions.closeAllModal()(dispatch, getState);
    dispatch({ type: UserManageActionTypes.GenderAuthorizationModal, Visible: Visible , item : item});
  },
  updateUser: (data: any): AppAction<KnownAction> => async (dispatch, getState) => {
    dispatch({ type: UserManageActionTypes.UserUpdate });
    try {
      const result = await API.put("/Accounts/Users", data);
      if (result.status == 200) {
        dispatch({ type: UserManageActionTypes.UserUpdateSuccess });
        userManageActions.getUsersList()(dispatch, getState);
        userManageActions.pushAlert(
          {
            title: "information",
            description: "SuccessfulOperation",
            variant: 'success'
          }
        )(dispatch, getState);
      } else if (result.status == 401) {
        dispatch({ type: UserManageActionTypes.UserUpdateFailed });
        userManageActions.pushAlert(
          {
            title: "error",
            description: "UnauthorizedError",
            variant: 'warning'
          }
        )(dispatch, getState);
      }
    } catch (error) {
      dispatch({ type: UserManageActionTypes.UserUpdateFailed });
      userManageActions.showRequestErrors(error)(dispatch, getState);
    }
  },
  toggleUpdateUserModal: (item: object, Visible: boolean): AppAction<KnownAction> => async (dispatch, getState) => {
    if (!getState().userManage.userUpdate.Visible)
      userManageActions.closeAllModal()(dispatch, getState);
    dispatch({
      type: UserManageActionTypes.UserUpdateModal,
      item,
      Visible: Visible,
    });
  },

  getUserClaimsList: (userId: string): AppAction<KnownAction> => async (dispatch, getState) => {
    dispatch({ type: UserManageActionTypes.UserClaimsFetch });
    try {
      const result = await API.get("/Accounts/Users/" + userId + "/Claims?page=1&pageSize=2000");
      if (result.status === 200) {
        dispatch({ type: UserManageActionTypes.UserClaimsFetchSuccess });
        userManageActions.getAccessList(true, result.data.claims)(dispatch, getState)
      } else if (result.status === 204) {
        dispatch({ type: UserManageActionTypes.UserClaimsFetchSuccess });
      } else if (result.status == 401) {
        dispatch({ type: UserManageActionTypes.UserClaimsFetchSuccess });
        userManageActions.pushAlert(
          {
            title: "error",
            description: "UnauthorizedError",
            variant: 'warning'
          }
        )(dispatch, getState);
      }
    } catch (error) {
      dispatch({ type: UserManageActionTypes.UserClaimsFetchFailed });
      userManageActions.pushAlert(
        {
          title: "error",
          description: "UnSuccessfetchData",
          variant: 'warning'
        }
      )(dispatch, getState);
    }
  },
  getAccessList: (isView: boolean, claims: any): AppAction<KnownAction> => async (dispatch, getState) => {
    dispatch({ type: UserManageActionTypes.AccessFetch });
    try {
      const result = await API.get("/Accounts/Access/GetAccessList");
      if (result.status === 200) {
        let services: any = result.data.map(function (service: any) {
          return {
            selected: !isView ? false : claims.some((x: any) => x.claimValue.toLowerCase() == service.serviceName.toLowerCase()),
            serviceName: service.serviceName,
            description: service.description,
            controllerDatas: service.controllerDatas.map(function (controllerData: any) {
              return {
                selected: !isView ? false : claims.some((x: any) => x.claimValue.toLowerCase() == controllerData.controllerName.toLowerCase()) || claims.some((x: any) => x.claimValue.toLowerCase() == service.serviceName.toLowerCase()),
                controllerName: controllerData.controllerName,
                description: controllerData.description,
                actionDatas: controllerData.actionDatas.map(function (actionData: any) {
                  return {
                    selected: !isView ? false : claims.some((x: any) => x.claimValue.toLowerCase() == actionData.actionName.toLowerCase()) || claims.some((x: any) => x.claimValue.toLowerCase() == controllerData.controllerName.toLowerCase()) || claims.some((x: any) => x.claimValue.toLowerCase() == service.serviceName.toLowerCase()),
                    actionName: actionData.actionName,
                    description: actionData.description
                  }
                })
              }
            })
          }
        });
        dispatch({
          type: UserManageActionTypes.AccessFetchSuccess,
          data: services,
        });
      } else if (result.status === 204) {
        dispatch({ type: UserManageActionTypes.AccessFetchSuccess, data: [] });
      } else if (result.status == 401) {
        dispatch({ type: UserManageActionTypes.AccessFetchSuccess, data: [] });
        userManageActions.pushAlert(
          {
            title: "error",
            description: "UnauthorizedError",
            variant: 'warning'
          }
        )(dispatch, getState);
      }
    } catch (error) {
      dispatch({ type: UserManageActionTypes.AccessFetchFailed });
      userManageActions.pushAlert(
        {
          title: "error",
          description: "UnSuccessfetchData",
          variant: 'warning'
        }
      )(dispatch, getState);
    }
  },
  setServiceSelected: (serviceName: string): AppAction<KnownAction> => async (dispatch, getState) => {
    try {
      const newAccessList: any[] = getState().userManage.accessList.data;
      const serviceIndex = newAccessList.findIndex(x => x.serviceName == serviceName);
      if (serviceIndex != -1) {
        newAccessList[serviceIndex].selected = !newAccessList[serviceIndex].selected;
        newAccessList[serviceIndex].controllerDatas.map((controller: any) => {
          controller.selected = newAccessList[serviceIndex].selected;
          controller.actionDatas.map((action: any) => {
            action.selected = controller.selected;
          });
        });
        dispatch({
          type: UserManageActionTypes.AccessFetchSuccess,
          data: newAccessList
        });
      }
    } catch (error) {
      userManageActions.pushAlert(
        {
          title: "error",
          description: "UnSuccessfetchData",
          variant: 'warning'
        }
      )(dispatch, getState);
    }
  },
  setControllerSelected: (serviceName: string, controllerName: string): AppAction<KnownAction> => async (dispatch, getState) => {
    try {
      const newAccessList: any[] = getState().userManage.accessList.data;
      const serviceIndex = newAccessList.findIndex(x => x.serviceName == serviceName);
      if (serviceIndex != -1) {
        const controllerIndex = newAccessList[serviceIndex].controllerDatas.findIndex((x: any) => x.controllerName == controllerName);
        if (controllerIndex != -1) {
          newAccessList[serviceIndex].controllerDatas[controllerIndex].selected = !newAccessList[serviceIndex].controllerDatas[controllerIndex].selected;
          if (!newAccessList[serviceIndex].controllerDatas[controllerIndex].selected)
            newAccessList[serviceIndex].selected = false;
          else {
            let isAllSelected = true;
            newAccessList[serviceIndex].controllerDatas.map((item: any) => {
              isAllSelected = isAllSelected && item.selected;
            });
            if (isAllSelected)
              newAccessList[serviceIndex].selected = true;
          }
          newAccessList[serviceIndex].controllerDatas[controllerIndex].actionDatas.map((item: any) => {
            item.selected = newAccessList[serviceIndex].controllerDatas[controllerIndex].selected;
          });
          dispatch({
            type: UserManageActionTypes.AccessFetchSuccess,
            data: newAccessList
          });
        }
      }
    } catch (error) {
      userManageActions.pushAlert(
        {
          title: "error",
          description: "UnSuccessfetchData",
          variant: 'warning'
        }
      )(dispatch, getState);
    }
  },
  setActionSelected: (serviceName: string, controllerName: string, actionName: string): AppAction<KnownAction> => async (dispatch, getState) => {
    try {
      const newAccessList: any[] = getState().userManage.accessList.data;
      const serviceIndex = newAccessList.findIndex(x => x.serviceName == serviceName);
      if (serviceIndex != -1) {
        const controllerIndex = newAccessList[serviceIndex].controllerDatas.findIndex((x: any) => x.controllerName == controllerName);
        if (controllerIndex != -1) {
          const actionIndex = newAccessList[serviceIndex].controllerDatas[controllerIndex].actionDatas.findIndex((x: any) => x.actionName == actionName);
          if (actionIndex != -1) {
            newAccessList[serviceIndex].controllerDatas[controllerIndex].actionDatas[actionIndex].selected = !newAccessList[serviceIndex].controllerDatas[controllerIndex].actionDatas[actionIndex].selected;
            if (!newAccessList[serviceIndex].controllerDatas[controllerIndex].actionDatas[actionIndex].selected) {
              newAccessList[serviceIndex].controllerDatas[controllerIndex].selected = false;
              newAccessList[serviceIndex].selected = false;
            } else {
              let isAllSelected = true;
              newAccessList[serviceIndex].controllerDatas[controllerIndex].actionDatas.map((item: any) => {
                isAllSelected = isAllSelected && item.selected;
              });
              if (isAllSelected) {
                newAccessList[serviceIndex].controllerDatas[controllerIndex].selected = true;
                let isAllSelected = true;
                newAccessList[serviceIndex].controllerDatas.map((item: any) => {
                  isAllSelected = isAllSelected && item.selected;
                });
                if (isAllSelected)
                  newAccessList[serviceIndex].selected = true;
              }
            }
            dispatch({
              type: UserManageActionTypes.AccessFetchSuccess,
              data: newAccessList
            });
          }
        }
      }
    } catch (error) {
      userManageActions.pushAlert(
        {
          title: "error",
          description: "UnSuccessfetchData",
          variant: 'warning'
        }
      )(dispatch, getState);
    }
  },
  saveUserClaims: (userId: string, history: History): AppAction<KnownAction> => async (dispatch, getState) => {
    let claims: any[] = [];
    getState().userManage.accessList.data.map(function (service: any) {
      if (service.selected)
        claims.push({ claimType: "service", claimValue: service.serviceName });
      else {
        service.controllerDatas.map(function (controllerData: any) {
          if (controllerData.selected)
            claims.push({ claimType: "controller", claimValue: controllerData.controllerName });
          else {
            controllerData.actionDatas.map(function (actionData: any) {
              if (actionData.selected)
                claims.push({ claimType: "action", claimValue: actionData.actionName });
            })
          }
        })
      }
    });
    if (claims.length) {
      try {
        dispatch({ type: UserManageActionTypes.UserClaimsCreate });
        const result = await API.post("/Accounts/Users/Claims", { userId: userId, claims: claims });
        if (result.status == 200) {
          dispatch({ type: UserManageActionTypes.UserClaimsCreateSuccess });
          userManageActions.pushAlert(
            {
              title: "information",
              description: "SuccessfulOperation",
              variant: 'success'
            }
          )(dispatch, getState);
          history.back();
        } else if (result.status == 401) {
          dispatch({ type: UserManageActionTypes.UserClaimsCreateFailed });
          userManageActions.pushAlert(
            {
              title: "error",
              description: "UnauthorizedError",
              variant: 'warning'
            }
          )(dispatch, getState);
        }
      } catch (error) {
        dispatch({ type: UserManageActionTypes.UserClaimsCreateFailed });
        userManageActions.showRequestErrors(error)(dispatch, getState);
      }
    } else
      userManageActions.pushAlert({ title: 'userError', description: 'DataIsIncomplete', variant: 'warning' })(dispatch, getState)
  },

  updateUserPass: (data: any): AppAction<KnownAction> => async (dispatch, getState) => {
    dispatch({ type: UserManageActionTypes.UserPassUpdate });
    try {
      const result = await API.post("/Accounts/Users/ChangePassword", data);
      if (result.status == 200) {
        dispatch({ type: UserManageActionTypes.UserPassUpdateSuccess });
        userManageActions.pushAlert(
          {
            title: "information",
            description: "SuccessfulOperation",
            variant: 'success'
          }
        )(dispatch, getState);
      } else if (result.status == 401) {
        dispatch({ type: UserManageActionTypes.UserPassUpdateFailed });
        userManageActions.pushAlert(
          {
            title: "error",
            description: "UnauthorizedError",
            variant: 'warning'
          }
        )(dispatch, getState);
      }
    } catch (error) {
      dispatch({ type: UserManageActionTypes.UserPassUpdateFailed });
      userManageActions.showRequestErrors(error)(dispatch, getState);
    }
  },
  toggleUpdateUserPassModal: (userId: string, Visible: boolean): AppAction<KnownAction> => async (dispatch, getState) => {
    if (!getState().userManage.userPassUpdate.Visible)
      userManageActions.closeAllModal()(dispatch, getState);
    dispatch({
      type: UserManageActionTypes.UserPassUpdateModal,
      userId,
      Visible: Visible,
    });
  },

  deleteUser: (): AppAction<KnownAction> => async (dispatch, getState) => {
    let id = getState().userManage.delete.id;
    dispatch({ type: UserManageActionTypes.UserDelete });
    try {
      const result = await API.delete("/Accounts/Users?id=" + id);
      if (result.status == 200) {
        dispatch({ type: UserManageActionTypes.UserDeleteSuccess });
        // const newList: any[] = getState().branchShift.branchShiftList.data;
        // const index = newList.findIndex((x) => x.id == id);
       /* if (index !== -1) {
         /!* newList.splice(index, 1);
          dispatch({
            type: UserManageActionTypes.UsersFetchSuccess,
            data: newList,
          });*!/
          userManageActions.pushAlert(
            {
              title: "information",
              description: "SuccessfulOperation",
              variant: 'success'
            }
          )(dispatch, getState);
        }*/
      } else if (result.status == 401) {
        dispatch({ type: UserManageActionTypes.UserDeleteFailed });
        userManageActions.pushAlert(
          {
            title: "error",
            description: "UnauthorizedError",
            variant: 'warning'
          }
        )(dispatch, getState);
      }
    } catch (error) {
      dispatch({ type: UserManageActionTypes.UserDeleteFailed });
      userManageActions.showRequestErrors(error)(dispatch, getState);
    }
  },
  toggleDeleteUserModal: (id: string, Visible: boolean): AppAction<KnownAction> => async (dispatch, getState) => {
    dispatch({
      type: UserManageActionTypes.UserDeleteModal,
      id: id,
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
      type: UserManageActionTypes.PushAlert,
      alert
    });
  },
  clearAlerts: (): AppAction<KnownAction> => async (dispatch, getState) => {
    dispatch({ type: UserManageActionTypes.ClearAlerts });
  },
  showRequestErrors: (error: any): AppAction<KnownAction> => async (dispatch, getState) => {
    if (error.response.data && error.response.data.length > 0) {
      let errors = "";
      for (var i = 0; i < error.response.data.length; i++)
        errors += (errors == "" ? "" : "\n") + error.response.data[i];
      userManageActions.pushAlert(
        {
          title: "information",
          description: errors,
          variant: 'danger'
        }
      )(dispatch, getState);
    } else {
      userManageActions.pushAlert(
        {
          title: "error",
          description: "UnSuccessfulOperation",
          variant: 'danger'
        }
      )(dispatch, getState);
    }
  },

  closeAllModal: (): AppAction<KnownAction> => async (dispatch, getState) => {
    dispatch({ type: UserManageActionTypes.UserViewModal, item: {}, Visible: false });
    dispatch({ type: UserManageActionTypes.UserCreateModal, Visible: false });
    dispatch({ type: UserManageActionTypes.GenderAuthorizationModal, Visible: false, item: {} });
    dispatch({ type: UserManageActionTypes.UserUpdateModal, item: {}, Visible: false });
    dispatch({ type: UserManageActionTypes.UserPassUpdateModal, userId: '', Visible: false });
  },
};
