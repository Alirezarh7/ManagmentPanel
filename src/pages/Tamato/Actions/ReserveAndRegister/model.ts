import { Action } from 'redux';
import { ReserveAndRegisterActionTypes } from './actionType';

export interface IReserveAndRegisterState {
	personInfo: {
		loading: boolean;
		data: any[];
	};

	zaerInfo: {
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
	sendBankData: {
		loading: boolean;
		data: any[];
	};
	getSendBankData: {
		data: any[];
		loading: boolean;
	};
	getPaymentData: {
		loading: boolean;
		data: any;
	};

	alerts: any[];
}
interface IGetPaymentFailed extends Action<string> {
	type: ReserveAndRegisterActionTypes.GetPaymentZaerFailed;
}
interface IGetPaymentSuccess extends Action<string> {
	type: ReserveAndRegisterActionTypes.GetPaymentZaerSuccess;
	data: any;
}
interface IGetPayment extends Action<string> {
	type: ReserveAndRegisterActionTypes.GetPaymentZaer;
}

interface ICreateSignUnderTaking extends Action<string> {
	type: ReserveAndRegisterActionTypes.CreateSignUnderTaking;
}

interface ICreateSignUnderTakingsSuccess extends Action<string> {
	type: ReserveAndRegisterActionTypes.CreateSignUnderTakingSuccess;
	data: any[];
}

interface ICreateSignUnderTakingFailed extends Action<string> {
	type: ReserveAndRegisterActionTypes.CreateSignUnderTakingFailed;
}

interface IIsChechPromise extends Action<string> {
	type: ReserveAndRegisterActionTypes.IsChechPromise;
}

interface IIsChechPromiseSuccess extends Action<string> {
	type: ReserveAndRegisterActionTypes.IsChechPromiseSuccess;
	data: any[];
}

interface IIsChechPromiseFailed extends Action<string> {
	type: ReserveAndRegisterActionTypes.IsChechPromiseFailed;
}

interface IPrintData extends Action<string> {
	type: ReserveAndRegisterActionTypes.PrintReserveZaer;
}

interface IIPrintDataSuccess extends Action<string> {
	type: ReserveAndRegisterActionTypes.PrintReserveZaerSuccess;
	data: any;
}

interface IIPrintDataFailed extends Action<string> {
	type: ReserveAndRegisterActionTypes.PrintReserveZaerFailed;
}

interface ICreateReserveZaer extends Action<string> {
	type: ReserveAndRegisterActionTypes.CreateReserveZaer;
}

interface ICreateReserveZaerSuccess extends Action<string> {
	type: ReserveAndRegisterActionTypes.CreateReserveZaerSuccess;
	data: any[];
	x: boolean;
}

interface ICreateReserveZaerFailed extends Action<string> {
	type: ReserveAndRegisterActionTypes.CreateReserveZaerFailed;
}

interface IGetSearchKarvanList extends Action<string> {
	type: ReserveAndRegisterActionTypes.GetSearchKarvanList;
}

interface IGetSearchKarvanListSuccess extends Action<string> {
	type: ReserveAndRegisterActionTypes.GetSearchKarvanListSuccess;
	data: any[];
}

interface IGetSearchKarvanListFailed extends Action<string> {
	type: ReserveAndRegisterActionTypes.GetSearchKarvanListFailed;
}

interface IGetListPriceKarvans extends Action<string> {
	type: ReserveAndRegisterActionTypes.GetListPriceKarvans;
}

interface IGetListPriceKarvansSuccess extends Action<string> {
	type: ReserveAndRegisterActionTypes.GetListPriceKarvansSuccess;
	data: any[];
}

interface IGetListPriceKarvansFailed extends Action<string> {
	type: ReserveAndRegisterActionTypes.GetListPriceKarvansFailed;
}

interface IGetListSanadFromSahmiehAndFarakhan extends Action<string> {
	type: ReserveAndRegisterActionTypes.GetListSanadFromSahmiehAndFarakhan;
}

interface IGetListSanadFromSahmiehAndFarakhanSuccess extends Action<string> {
	type: ReserveAndRegisterActionTypes.GetListSanadFromSahmiehAndFarakhanSuccess;
	data: any[];
}

interface IGetListSanadFromSahmiehAndFarakhanFailed extends Action<string> {
	type: ReserveAndRegisterActionTypes.GetListSanadFromSahmiehAndFarakhanFailed;
}

interface IGetZaerForReservation extends Action<string> {
	type: ReserveAndRegisterActionTypes.GetZaerForReservation;
}

interface IGetZaerForReservationSuccess extends Action<string> {
	type: ReserveAndRegisterActionTypes.GetZaerForReservationSuccess;
	data: any[];
	errors: any;
}

interface IGetZaerForReservationFailed extends Action<string> {
	type: ReserveAndRegisterActionTypes.GetZaerForReservationFailed;
}

interface IGetPersonInfo extends Action<string> {
	type: ReserveAndRegisterActionTypes.GetPersonInfo;
}

interface IGetPersonInfoSuccess extends Action<string> {
	type: ReserveAndRegisterActionTypes.GetPersonInfoSuccess;
	data: any[];
}

interface IGetPersonInfoFailed extends Action<string> {
	type: ReserveAndRegisterActionTypes.GetPersonInfoFailed;
}

interface IPushAlert extends Action<string> {
	type: ReserveAndRegisterActionTypes.PushAlert;
	alert: any;
}

interface IClearAlerts extends Action<string> {
	type: ReserveAndRegisterActionTypes.ClearAlerts;
}

interface IToggleSearchModal extends Action<string> {
	type: ReserveAndRegisterActionTypes.ToggleSearchModal;
	visible: boolean;
}

export type KnownAction =
	| IGetPersonInfoSuccess
	| IGetPersonInfo
	| IGetPersonInfoFailed
	| IPushAlert
	| IClearAlerts
	| IGetZaerForReservation
	| IGetZaerForReservationSuccess
	| IGetZaerForReservationFailed
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
	| IPrintData
	| IIPrintDataSuccess
	| IIPrintDataFailed
	| IIsChechPromise
	| IIsChechPromiseSuccess
	| IIsChechPromiseFailed
	| ICreateSignUnderTaking
	| ICreateSignUnderTakingsSuccess
	| ICreateSignUnderTakingFailed
	| IGetPaymentFailed
	| IGetPaymentSuccess
	| IGetPayment;
