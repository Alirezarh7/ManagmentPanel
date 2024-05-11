import { TransformationReducer } from "../pages/Tamato/Actions/Transformation/reducer";
import { UserManageReducer } from "../pages/PublicPages/Actions/UserManage/reducer";
import { UserRoleManageReducer } from "../pages/PublicPages/Actions/UserRoleManage/reducer";
import { DashboardReducer } from "../pages/PublicPages/Actions/Dashboard/reducer";
import { reducer as oidcReducer } from 'redux-oidc';
import {CallCompleteInformationReducer} from "../pages/Tamato/Actions/CallCompleteInformations/reducer";
import {ReserveAndRegisterReducer} from "../pages/Tamato/Actions/ReserveAndRegister/reduser";
import {RegistrationReducer} from "../pages/Omre/Actions/Registration/reducer";

export const reducers = {
   dashboard: DashboardReducer,
   transformation: TransformationReducer,
   callCompleteInformation: CallCompleteInformationReducer,
   userManage: UserManageReducer,
   userRoleManage: UserRoleManageReducer,
   reserveAndRegister: ReserveAndRegisterReducer,
   registration: RegistrationReducer,
   oidc: oidcReducer
};
