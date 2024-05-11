export enum DashboardActionTypes {
    SetCrumbs = "@@Dashboard/SetCrumbs",
    
    UserPassUpdate = "@@Dashboard/UserPassUpdate",
    UserPassUpdateSuccess = "@@Dashboard/UserPassUpdateSuccess",
    UserPassUpdateFailed = "@@Dashboard/UserPassUpdateFailed",
    UserPassUpdateModal = "@@Dashboard/UserPassUpdateModal",

    LogoutConfirm = "@@Dashboard/LogoutConfirm",

    CreatePerson = "@@Dashboard/CreatePerson",
    CreatePersonSuccess = "@@Dashboard/CreatePersonSuccess",
    CreatePersonFailed = "@@Dashboard/CreatePersonFailed",

    CreateToken = "@@Dashboard/CreateToken",
    CreateTokenSuccess = "@@Dashboard/CreateTokenSuccess",
    CreateTokenFaild = "@@Dashboard/CreateTokenFaild",

    UserClaimsSet = "@@Dashboard/UserClaimsSet",
    UserClaimsClear = "@@Dashboard/UserClaimsClear",

    PushAlert = "@@Dashboard/PushAlert",
    ClearAlerts = "@@Dashboard/ClearAlerts",
}
