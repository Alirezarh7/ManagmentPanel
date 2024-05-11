import { Action } from 'redux';
import { RegistrationActionTypes } from './actionType';

export interface IRegistrationState {
	provinceList: {
		loading: boolean;
		data: any[];
	};
	cityList: {
		loading: boolean;
		data: any[];
	};
	personInfo: {
		loading: boolean;
		data: any[];
	};

	aghlamBaz: {
		loading: boolean;
		data: any[];
		errors: any;
	};

	listSanad: {
		loading: boolean;
		data: any[];
	};

	priceKarvanList: {
		loading: boolean;
		data: any[];
	};
	resultSerchKarvanList: {
		loading: boolean;
		data: any[];
	};

	createReserveZaerData: {
		loading: boolean;
		data: any[];
		x: boolean;
	};

	toggleSearchModal: {
		visible: boolean;
	};
	toggleConfirmModal: {
		visible: boolean;
	};
	printData: {
		loading: boolean;
		data: any;
	};
	setCancelReserve: {
		loading: boolean;
	};

	isChechPromise: {
		loading: boolean;
		data: any;
	};
	createSignUnderTaking: {
		loading: boolean;
		data: any[];
	};
	getPaymentData: {
		loading: boolean;
		data: any;
	};

	omreSanad: {
		data: any;
		loading: boolean;
		updater: boolean;
	};

	cancelUserRegistration: {
		loading: boolean;
	};

	getReserveDetailList: {
		loading: boolean;
		data: any;
	};
	getPrintDetailList: {
		loading: boolean;
		data: any;
	};
	createReserve: {
		loading: boolean;
	};
	ebtalReserve: {
		loading: boolean;
	};
	setZaerProfie: {
		loading: boolean;
	};
	createPassengerGroup: {
		loading: boolean;
	};
	addMemberGroup: {
		loading: boolean;
	};
	passengerProfile: {
		loading: boolean;
		data: any;
	};
	getPassengerMember: {
		loading: boolean;
		data: any;
	};
	deleteMember: {
		loading: boolean;
	};
	deleteMemberGroup: {
		loading: boolean;
	};
	passengerGroup: {
		loading: boolean;
		data: any;
	};
	isLeaderByNationalCode: {
		loading: boolean;
		data: any;
	};
	confirmationPassenger: {
		loading: boolean;
		data: any;
	};
	confirmationGroupdata: {
		loading: boolean;
		data: any;
	};
	addressByPostalCode: {
		loading: boolean;
		data: any;
	};
	newLeader: {
		loading: boolean;
	};
	beginReserve: {
		loading: boolean;
	};
	getStateforStep: {
		loading: boolean;
		data: any;
	};
	getKarvanRegisterHistory: {
		loading: boolean;
		data: any;
	};
	paymentHistory: {
		loading: boolean;
		data: any;
	};
	RejectReceivedSalesSanad: {
		loading: boolean;
	};
	alerts: any[];
	crumbs: any[];
}

interface IToggleConfirmModal extends Action<string> {
	type: RegistrationActionTypes.ToggleConfirmModal;
	visible: boolean;
}

interface ICreateSignUnderTaking extends Action<string> {
	type: RegistrationActionTypes.CreateSignUnderTaking;
}

interface ICreateSignUnderTakingsSuccess extends Action<string> {
	type: RegistrationActionTypes.CreateSignUnderTakingSuccess;
	data: any[];
}

interface ICreateSignUnderTakingFailed extends Action<string> {
	type: RegistrationActionTypes.CreateSignUnderTakingFailed;
}

interface IGetPassengerMemberFetch extends Action<string> {
	type: RegistrationActionTypes.GetPassengerMemberFetch;
}

interface IGetPassengerMemberSuccess extends Action<string> {
	type: RegistrationActionTypes.GetPassengerMemberSuccess;
	data: any[];
}

interface IGetPassengerMemberFailed extends Action<string> {
	type: RegistrationActionTypes.GetPassengerMemberFailed;
}

interface IIsChechPromise extends Action<string> {
	type: RegistrationActionTypes.IsChechPromise;
}

interface IIsChechPromiseSuccess extends Action<string> {
	type: RegistrationActionTypes.IsChechPromiseSuccess;
	data: any[];
}

interface IIsChechPromiseFailed extends Action<string> {
	type: RegistrationActionTypes.IsChechPromiseFailed;
}

interface IPrintData extends Action<string> {
	type: RegistrationActionTypes.PrintReserveZaer;
}

interface IIPrintDataSuccess extends Action<string> {
	type: RegistrationActionTypes.PrintReserveZaerSuccess;
	data: any;
}

interface IIPrintDataFailed extends Action<string> {
	type: RegistrationActionTypes.PrintReserveZaerFailed;
}

interface ICreateReserveZaer extends Action<string> {
	type: RegistrationActionTypes.CreateReserveZaer;
}

interface ICreateReserveZaerSuccess extends Action<string> {
	type: RegistrationActionTypes.CreateReserveZaerSuccess;
	data: any[];
	x: boolean;
}

interface ICreateReserveZaerFailed extends Action<string> {
	type: RegistrationActionTypes.CreateReserveZaerFailed;
}

interface IGetSearchKarvanList extends Action<string> {
	type: RegistrationActionTypes.GetSearchKarvanList;
}

interface IGetSearchKarvanListSuccess extends Action<string> {
	type: RegistrationActionTypes.GetSearchKarvanListSuccess;
	data: any[];
}

interface IGetSearchKarvanListFailed extends Action<string> {
	type: RegistrationActionTypes.GetSearchKarvanListFailed;
}

interface IGetListPriceKarvans extends Action<string> {
	type: RegistrationActionTypes.GetListPriceKarvans;
}

interface IGetListPriceKarvansSuccess extends Action<string> {
	type: RegistrationActionTypes.GetListPriceKarvansSuccess;
	data: any[];
}

interface IGetListPriceKarvansFailed extends Action<string> {
	type: RegistrationActionTypes.GetListPriceKarvansFailed;
}

interface IGetListSanadFromSahmiehAndFarakhan extends Action<string> {
	type: RegistrationActionTypes.GetListSanadFromSahmiehAndFarakhan;
}

interface IGetListSanadFromSahmiehAndFarakhanSuccess extends Action<string> {
	type: RegistrationActionTypes.GetListSanadFromSahmiehAndFarakhanSuccess;
	data: any[];
}

interface IGetListSanadFromSahmiehAndFarakhanFailed extends Action<string> {
	type: RegistrationActionTypes.GetListSanadFromSahmiehAndFarakhanFailed;
}

interface ISanadAghlambaz extends Action<string> {
	type: RegistrationActionTypes.SanadAghlambaz;
}

interface ISanadAghlambazSuccess extends Action<string> {
	type: RegistrationActionTypes.SanadAghlambazSuccess;
	data: any[];
	errors: any;
}

interface ISanadAghlambazFailed extends Action<string> {
	type: RegistrationActionTypes.SanadAghlambazFailed;
}

interface IGetPersonInfo extends Action<string> {
	type: RegistrationActionTypes.GetPersonInfo;
}

interface IGetPersonInfoSuccess extends Action<string> {
	type: RegistrationActionTypes.GetPersonInfoSuccess;
	data: any[];
}

interface IGetPersonInfoFailed extends Action<string> {
	type: RegistrationActionTypes.GetPersonInfoFailed;
}
interface IClearPersonInfo extends Action<string> {
	type: RegistrationActionTypes.ClearPersonInfo;
	data: any[];
}

interface IPushAlert extends Action<string> {
	type: RegistrationActionTypes.PushAlert;
	alert: any;
}

interface IClearAlerts extends Action<string> {
	type: RegistrationActionTypes.ClearAlerts;
}

interface IToggleSearchModal extends Action<string> {
	type: RegistrationActionTypes.ToggleSearchModal;
	visible: boolean;
}

interface IOmreSanad extends Action<string> {
	type: RegistrationActionTypes.OmreSanadFetch;
}
interface OmreSanadFetchSuccess extends Action<string> {
	type: RegistrationActionTypes.OmreSanadFetchSuccess;
	data: any;
}
interface OmreSanadFetchFailed extends Action<string> {
	type: RegistrationActionTypes.OmreSanadFetchFailed;
}
interface CancelUserRegistration extends Action<string> {
	type: RegistrationActionTypes.CancelUserRegistration;
	loading: boolean;
}

interface IGetReserveDetailListFailed extends Action<string> {
	type: RegistrationActionTypes.GetReserveDetailListFailed;
}

interface IGetReserveDetailListSuccess extends Action<string> {
	type: RegistrationActionTypes.GetReserveDetailListSuccess;
	data: any;
}

interface IGetReserveDetailList extends Action<string> {
	type: RegistrationActionTypes.GetReserveDetailList;
}

interface IEbtalReserve extends Action<string> {
	type: RegistrationActionTypes.EbtalReserve;
	loading: boolean;
}
interface IEbtalReserveSuccess extends Action<string> {
	type: RegistrationActionTypes.EbtalReserveSuccess;
}

interface IProvinceFetch extends Action<string> {
	type: RegistrationActionTypes.ProvinceFetch;
}

interface IProvinceFetchSuccess extends Action<string> {
	type: RegistrationActionTypes.ProvinceFetchSuccess;
	loading: boolean;
	data: any[];
}

interface IProvinceFetchFailed extends Action<string> {
	type: RegistrationActionTypes.ProvinceFetchFailed;
}

interface ICityFetch extends Action<string> {
	type: RegistrationActionTypes.CityFetch;
}
interface ICityFetchSuccess extends Action<string> {
	type: RegistrationActionTypes.CityFetchSuccess;
	data: any;
}
interface ICityFetchFailed extends Action<string> {
	type: RegistrationActionTypes.CityFetchFailed;
}

interface ICreateReserve extends Action<string> {
	type: RegistrationActionTypes.CreateReserve;
	loading: boolean;
}
interface ICreateReserveSuccess extends Action<string> {
	type: RegistrationActionTypes.CreateReserveSuccess;
}

interface IGetPrintDetailListFailed extends Action<string> {
	type: RegistrationActionTypes.GetPrintDetailListFailed;
}
interface IGetPrintDetailListSuccess extends Action<string> {
	type: RegistrationActionTypes.GetPrintDetailListSuccess;
	data: any;
}
interface IGetPrintDetailList extends Action<string> {
	type: RegistrationActionTypes.GetPrintDetailList;
}
interface IOmreSanadUpdater extends Action<string> {
	type: RegistrationActionTypes.OmreSanadFetchUpdater;
	update: boolean;
}
interface ISetZaerProfile extends Action<string> {
	type: RegistrationActionTypes.SetZaerProfileInfo;
	loading: boolean;
}
interface ICreatePassengerGroup extends Action<string> {
	type: RegistrationActionTypes.CreatePassengerGroup;
	loading: boolean;
}

interface IDeleteMember extends Action<string> {
	type: RegistrationActionTypes.DeleteMember;
	loading: boolean;
}
interface IAddMemberToGroup extends Action<string> {
	type: RegistrationActionTypes.AddMemberToGroup;
	loading: boolean;
}
interface IGetPassengerProfile extends Action<string> {
	type: RegistrationActionTypes.GetPassengerProfile;
	loading: boolean;
	data: any;
}

//////////////////////////////

interface IIsLeaderByNationalCodeFailed extends Action<string> {
	type: RegistrationActionTypes.IsLeaderByNationalCodeFailed;
}
interface IIsLeaderByNationalCodeSuccess extends Action<string> {
	type: RegistrationActionTypes.IsLeaderByNationalCodeSuccess;
	data: any;
}
interface IIsLeaderByNationalCode extends Action<string> {
	type: RegistrationActionTypes.IsLeaderByNationalCode;
}

interface IStateForStepFailed extends Action<string> {
	type: RegistrationActionTypes.StateForStepFailed;
}
interface IStateForStepSuccess extends Action<string> {
	type: RegistrationActionTypes.StateForStepSuccess;
	data: any;
}
interface IStateForStep extends Action<string> {
	type: RegistrationActionTypes.StateForStep;
}

interface IGetKarvanRegisterFailed extends Action<string> {
	type: RegistrationActionTypes.GetKarvanRegisterFailed;
}
interface IGetKarvanRegisterSuccess extends Action<string> {
	type: RegistrationActionTypes.GetKarvanRegisterSuccess;
	data: any;
}
interface IGetKarvanRegister extends Action<string> {
	type: RegistrationActionTypes.GetKarvanRegister;
}

interface IGetPassengerGroup extends Action<string> {
	type: RegistrationActionTypes.GetPassengerGroup;
	loading: boolean;
	data: any;
}

interface IGetUmrahPaymentHistory extends Action<string> {
	type: RegistrationActionTypes.GetUmrahPaymentHistory;
	loading: boolean;
	data: any;
}

interface IDeleteMemberGroup extends Action<string> {
	type: RegistrationActionTypes.DeleteMemberGroup;
	loading: boolean;
}
interface IConfirmationPassenger extends Action<string> {
	type: RegistrationActionTypes.ConfirmationPassenger;
	loading: boolean;
	data: any[];
}
interface IConfirmationGroup extends Action<string> {
	type: RegistrationActionTypes.ConfirmationGroup;
	loading: boolean;
	data: any[];
}
interface IGetAddressByPostalCode extends Action<string> {
	type: RegistrationActionTypes.GetAddressByPostalCode;
	loading: boolean;
	data: any;
}

interface ISelectNewLeader extends Action<string> {
	type: RegistrationActionTypes.SelectNewLeader;
	loading: boolean;
}
interface IBeginReserve extends Action<string> {
	type: RegistrationActionTypes.BeginReserve;
	loading: boolean;
}

interface ISetCrumbs extends Action<string> {
	type: RegistrationActionTypes.SetCrumbs;
	crumbs: any[];
}

export type KnownAction =
	| CancelUserRegistration
	| IGetPassengerMemberFailed
	| IGetPassengerMemberSuccess
	| IGetPassengerMemberFetch
	| IStateForStep
	| IStateForStepSuccess
	| IStateForStepFailed
	| IGetUmrahPaymentHistory
	| IGetKarvanRegisterFailed
	| IGetKarvanRegisterSuccess
	| IGetKarvanRegister
	| IGetPersonInfoSuccess
	| IGetPersonInfo
	| IGetPersonInfoFailed
	| IClearPersonInfo
	| IPushAlert
	| IIsLeaderByNationalCode
	| IIsLeaderByNationalCodeFailed
	| IIsLeaderByNationalCodeSuccess
	| IClearAlerts
	| ISanadAghlambaz
	| IOmreSanadUpdater
	| ISanadAghlambazSuccess
	| ISanadAghlambazFailed
	| IGetListSanadFromSahmiehAndFarakhan
	| IGetListSanadFromSahmiehAndFarakhanSuccess
	| IGetListSanadFromSahmiehAndFarakhanFailed
	| IGetListPriceKarvans
	| IGetListPriceKarvansSuccess
	| IGetListPriceKarvansFailed
	| IGetSearchKarvanList
	| IGetSearchKarvanListSuccess
	| IGetSearchKarvanListFailed
	| ICreateReserveZaer
	| ICreateReserveZaerSuccess
	| ICreateReserveZaerFailed
	| IToggleSearchModal
	| IEbtalReserve
	| IEbtalReserveSuccess
	| IPrintData
	| IIPrintDataSuccess
	| IIPrintDataFailed
	| IToggleConfirmModal
	| IIsChechPromise
	| IIsChechPromiseSuccess
	| IIsChechPromiseFailed
	| ICreateSignUnderTaking
	| ICreateSignUnderTakingsSuccess
	| ICreateSignUnderTakingFailed
	| IGetReserveDetailList
	| IGetReserveDetailListSuccess
	| IGetReserveDetailListFailed
	| ISetCrumbs
	| IOmreSanad
	| IDeleteMember
	| IGetPrintDetailListFailed
	| IGetPrintDetailListSuccess
	| IGetPrintDetailList
	| ICreateReserveSuccess
	| ICreateReserve
	| OmreSanadFetchSuccess
	| OmreSanadFetchFailed
	| IProvinceFetch
	| IProvinceFetchSuccess
	| IProvinceFetchFailed
	| ICityFetch
	| ICityFetchSuccess
	| ICityFetchFailed
	| ISetZaerProfile
	| ICreatePassengerGroup
	| IAddMemberToGroup
	| IGetPassengerProfile
	| IGetPassengerGroup
	| IDeleteMemberGroup
	| IConfirmationPassenger
	| IConfirmationGroup
	| IGetAddressByPostalCode
	| ISelectNewLeader
	| IBeginReserve;
