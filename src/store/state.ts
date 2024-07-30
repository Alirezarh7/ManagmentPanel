import { IUserManageState } from '../pages/PublicPages/Actions/UserManage/model';
import { IUserRoleManageState } from '../pages/PublicPages/Actions/UserRoleManage/model';
import { IDashboardState } from '../pages/PublicPages/Actions/Dashboard/model';
import { User } from 'oidc-client';
import { ICallCompleteInformationState } from '../pages/Tamato/Actions/CallCompleteInformations/model';
import { IReserveAndRegisterState } from '../pages/Tamato/Actions/ReserveAndRegister/model';
import { ITransformationState } from '../pages/Tamato/Actions/Transformation/model';
import { IRegistrationState } from '../pages/Omre/Actions/Registration/model';

export interface OidcState {
	isLoadingUser: boolean;
	user: User;
}

export interface IApplicationState {
	dashboard: IDashboardState;
	transformation: ITransformationState;
	callCompleteInformation: ICallCompleteInformationState;
	userManage: IUserManageState;
	userRoleManage: IUserRoleManageState;
	reserveAndRegister: IReserveAndRegisterState;
	registration: IRegistrationState;
	oidc: OidcState;
}

export type AppAction<TAction> = (dispatch: (action: TAction) => void, getState: () => IApplicationState) => void;
