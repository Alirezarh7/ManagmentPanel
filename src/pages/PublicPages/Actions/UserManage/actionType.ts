export enum UserManageActionTypes {
	SetCrumbs = '@@Dashboard/SetCrumbs',

	UsersFetch = '@@UserManage/UsersFetch',
	UsersFetchSuccess = '@@UserManage/UsersFetchSuccess',
	UsersFetchFailed = '@@UserManage/UsersFetchFailed',

	UserViewModal = '@@UserManage/UserViewModal',

	UserCreate = '@@UserManage/UserCreate',
	UserCreateSuccess = '@@UserManage/UserCreateSuccess',
	UserCreateFailed = '@@UserManage/UserCreateFailed',
	UserCreateModal = '@@UserManage/UserCreateModal',

	GenderAuthorizationModal = '@@UserManage/GenderAuthorizationModal',

	UserUpdate = '@@UserManage/UserUpdate',
	UserUpdateSuccess = '@@UserManage/UserUpdateSuccess',
	UserUpdateFailed = '@@UserManage/UserUpdateFailed',
	UserUpdateModal = '@@UserManage/UserUpdateModal',

	UserClaimsFetch = '@@UserManage/UserClaimsFetch',
	UserClaimsFetchSuccess = '@@UserManage/UserClaimsFetchSuccess',
	UserClaimsFetchFailed = '@@UserManage/UserClaimsFetchFailed',

	AccessFetch = '@@UserManage/AccessFetch',
	AccessFetchSuccess = '@@UserManage/AccessFetchSuccess',
	AccessFetchFailed = '@@UserManage/AccessFetchFailed',

	UserClaimsCreate = '@@UserManage/UserClaimsCreate',
	UserClaimsCreateSuccess = '@@UserManage/UserClaimsCreateSuccess',
	UserClaimsCreateFailed = '@@UserManage/UserClaimsCreateFailed',

	UserPassUpdate = '@@UserManage/UserPassUpdate',
	UserPassUpdateSuccess = '@@UserManage/UserPassUpdateSuccess',
	UserPassUpdateFailed = '@@UserManage/UserPassUpdateFailed',
	UserPassUpdateModal = '@@UserManage/UserPassUpdateModal',

	UserDeleteModal = '@@UserManage/UserDeleteModal',
	UserDelete = '@@UserManage/UserDelete',
	UserDeleteSuccess = '@@UserManage/UserDeleteSuccess',
	UserDeleteFailed = '@@UserManage/UserDeleteFailed',

	PushAlert = '@@Dashboard/PushAlert',
	ClearAlerts = '@@Dashboard/ClearAlerts'
}
