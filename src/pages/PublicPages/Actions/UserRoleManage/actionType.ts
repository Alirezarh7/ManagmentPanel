export enum UserRoleManageActionTypes {
    SetCrumbs = "@@Dashboard/SetCrumbs",
    
    UserRolesFetch = "@@UserRoleManage/UserRolesFetch",
    UserRolesFetchSuccess = "@@UserRoleManage/UserRolesFetchSuccess",
    UserRolesFetchFailed = "@@UserRoleManage/UserRolesFetchFailed",

    RoleFetch = "@@UserRoleManage/RoleFetch",
    RoleFetchSuccess = "@@UserRoleManage/RoleFetchSuccess",
    RoleFetchFailed = "@@UserRoleManage/RoleFetchFailed",

    UserRoleCreate = "@@UserRoleManage/UserRoleCreate",
    UserRoleCreateSuccess = "@@UserRoleManage/UserRoleCreateSuccess",
    UserRoleCreateFailed = "@@UserRoleManage/UserRoleCreateFailed",
    UserRoleCreateModal = "@@UserRoleManage/UserRoleCreateModal",

    UserRoleDeleteModal = "@@UserRoleManage/UserRoleDeleteModal",
    UserRoleDelete = "@@UserRoleManage/UserRoleDelete",
    UserRoleDeleteSuccess = "@@UserRoleManage/UserRoleDeleteSuccess",
    UserRoleDeleteFailed = "@@UserRoleManage/UserRoleDeleteFailed",

    PushAlert = "@@Dashboard/PushAlert",
    ClearAlerts = "@@Dashboard/ClearAlerts",
}
