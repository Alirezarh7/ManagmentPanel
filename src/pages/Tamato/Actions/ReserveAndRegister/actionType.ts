export enum ReserveAndRegisterActionTypes {
	GetPersonInfo = '@@ReserveAndRegister/GetPersonInfo',
	GetPersonInfoFailed = '@@ReserveAndRegister/GetPersonInfoFailed',
	GetPersonInfoSuccess = '@@ReserveAndRegister/GetPersonInfoSuccess',

	GetZaerForReservation = '@@ReserveAndRegister/GetZaerForReservation',
	GetZaerForReservationFailed = '@@ReserveAndRegister/GetZaerForReservationFailed',
	GetZaerForReservationSuccess = '@@ReserveAndRegister/GetZaerForReservationSuccess',

	GetListSanadFromSahmiehAndFarakhan = '@@ReserveAndRegister/GetListSanadFromSahmiehAndFarakhan',
	GetListSanadFromSahmiehAndFarakhanFailed = '@@ReserveAndRegister/GetListSanadFromSahmiehAndFarakhanFailed',
	GetListSanadFromSahmiehAndFarakhanSuccess = '@@ReserveAndRegister/GetListSanadFromSahmiehAndFarakhanSuccess',

	GetListPriceKarvans = '@@ReserveAndRegister/GetListPriceKarvans',
	GetListPriceKarvansFailed = '@@ReserveAndRegister/GetListPriceKarvansFailed',
	GetListPriceKarvansSuccess = '@@ReserveAndRegister/GetListPriceKarvansSuccess',

	GetSearchKarvanList = '@@ReserveAndRegister/GetSearchKarvanList',
	GetSearchKarvanListFailed = '@@ReserveAndRegister/GetSearchKarvanListFailed',
	GetSearchKarvanListSuccess = '@@ReserveAndRegister/GetSearchKarvanListSuccess',

	CreateReserveZaer = '@@ReserveAndRegister/CreateReserveZaer',
	CreateReserveZaerFailed = '@@ReserveAndRegister/CreateReserveZaerFailed',
	CreateReserveZaerSuccess = '@@ReserveAndRegister/CreateReserveZaerSuccess',

	PrintReserveZaer = '@@ReserveAndRegister/PrintReserveZaer',
	PrintReserveZaerFailed = '@@ReserveAndRegister/PrintReserveZaerFailed',
	PrintReserveZaerSuccess = '@@ReserveAndRegister/PrintReserveZaerSuccess',

	IsChechPromise = '@@ReserveAndRegister/IsChechPromise',
	IsChechPromiseFailed = '@@ReserveAndRegister/IsChechPromiseFailed',
	IsChechPromiseSuccess = '@@ReserveAndRegister/IsChechPromiseSuccess',

	GetPaymentZaer = '@@ReserveAndRegister/GetPaymentZaer',
	GetPaymentZaerFailed = '@@ReserveAndRegister/GetPaymentZaerFailed',
	GetPaymentZaerSuccess = '@@ReserveAndRegister/GetPaymentZaerSuccess',

	CreateSignUnderTaking = '@@ReserveAndRegister/CreateSignUnderTaking',
	CreateSignUnderTakingFailed = '@@ReserveAndRegister/CreateSignUnderTakingFailed',
	CreateSignUnderTakingSuccess = '@@ReserveAndRegister/CreateSignUnderTakingSuccess',
	//alireza

	PushAlert = '@@ReserveAndRegister/PushAlert',
	ClearAlerts = '@@ReserveAndRegister/ClearAlerts',

	ToggleSearchModal = '@@CallCompleteInformation/ToggleSearchModal',
	ToggleConfirmModal = '@@CallCompleteInformation/ToggleConfirmModal'
}
