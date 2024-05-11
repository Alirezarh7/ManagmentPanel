export enum RegistrationActionTypes {
	GetPersonInfo = '@@Registration/GetPersonInfo',
	GetPersonInfoFailed = '@@Registration/GetPersonInfoFailed',
	GetPersonInfoSuccess = '@@Registration/GetPersonInfoSuccess',
	ClearPersonInfo = '@@Registration/ClearPersonInfo',

	SanadAghlambaz = '@@Registration/SanadAghlambaz',
	SanadAghlambazFailed = '@@Registration/SanadAghlambazailed',
	SanadAghlambazSuccess = '@@RegistrationSanadAghlambazSuccess',

	ProvinceFetch = '@@Registration/ProvinceFetch',
	ProvinceFetchSuccess = '@@Registration/ProvinceFetchSuccess',
	ProvinceFetchFailed = '@@Registration/ProvinceFetchFailed',

	CityFetch = '@@Registration/CityFetch',
	CityFetchSuccess = '@@Registration/CityFetchSuccess',
	CityFetchFailed = '@@Registration/CityFetchFailed',

	GetListSanadFromSahmiehAndFarakhan = '@@Registration/GetListSanadFromSahmiehAndFarakhan',
	GetListSanadFromSahmiehAndFarakhanFailed = '@@Registration/GetListSanadFromSahmiehAndFarakhanFailed',
	GetListSanadFromSahmiehAndFarakhanSuccess = '@@Registration/GetListSanadFromSahmiehAndFarakhanSuccess',

	GetListPriceKarvans = '@@Registration/GetListPriceKarvans',
	GetListPriceKarvansFailed = '@@Registration/GetListPriceKarvansFailed',
	GetListPriceKarvansSuccess = '@@Registration/GetListPriceKarvansSuccess',

	GetSearchKarvanList = '@@Registration/GetSearchKarvanList',
	GetSearchKarvanListFailed = '@@Registration/GetSearchKarvanListFailed',
	GetSearchKarvanListSuccess = '@@Registration/GetSearchKarvanListSuccess',

	CreateReserveZaer = '@@Registration/CreateReserveZaer',
	CreateReserveZaerFailed = '@@Registration/CreateReserveZaerFailed',
	CreateReserveZaerSuccess = '@@Registration/CreateReserveZaerSuccess',

	PrintReserveZaer = '@@Registration/PrintReserveZaer',
	PrintReserveZaerFailed = '@@Registration/PrintReserveZaerFailed',
	PrintReserveZaerSuccess = '@@Registration/PrintReserveZaerSuccess',

	IsChechPromise = '@@Registration/IsChechPromise',
	IsChechPromiseFailed = '@@Registration/IsChechPromiseFailed',
	IsChechPromiseSuccess = '@@Registration/IsChechPromiseSuccess',

	GetPaymentZaer = '@@Registration/GetPaymentZaer',
	GetPaymentZaerFailed = '@@Registration/GetPaymentZaerFailed',
	GetPaymentZaerSuccess = '@@Registration/GetPaymentZaerSuccess',

	CreateSignUnderTaking = '@@Registration/CreateSignUnderTaking',
	CreateSignUnderTakingFailed = '@@Registration/CreateSignUnderTakingFailed',
	CreateSignUnderTakingSuccess = '@@Registration/CreateSignUnderTakingSuccess',

	CancelUserRegistration = '@@Registration/CancelUserRegistration',

	//alireza

	GetReserveDetailList = '@@Registration/GetZaerForReservation',
	GetReserveDetailListSuccess = '@@Registration/GetReserveDetailListSuccess',
	GetReserveDetailListFailed = '@@Registration/GetReserveDetailListSuccess',

	GetPrintDetailList = '@@Registration/GetPrintDetailList',
	GetPrintDetailListSuccess = '@@Registration/GetPrintDetailListSuccess',
	GetPrintDetailListFailed = '@@Registration/GetPrintDetailListFailed',

	PushAlert = '@@Registration/PushAlert',
	ClearAlerts = '@@Registration/ClearAlerts',

	ToggleSearchModal = '@@Registration/ToggleSearchModal',
	ToggleConfirmModal = '@@Registration/ToggleConfirmModal',

	CreateReserve = '@@Registration/CreateReserve',
	CreateReserveSuccess = '@@Registration/CreateReserveSuccess',

	EbtalReserve = '@@Registration/EbtalReserve',
	EbtalReserveSuccess = '@@Registration/EbtalReserveSuccess',

	OmreSanadFetch = '@@Registration/OmreSanadFetch',
	OmreSanadFetchSuccess = '@@Registration/OmreSanadFetchSuccess',
	OmreSanadFetchFailed = '@@Registration/OmreSanadFetchFailed',
	OmreSanadFetchUpdater = '@@Registration/OmreSanadFetchUpdater',

	SetZaerProfileInfo = '@@Registration/SetZaerProfileInfo',
	CreatePassengerGroup = '@@Registration/CreatePassengerGroup',
	AddMemberToGroup = '@@Registration/AddMemberToGroup',
	GetPassengerProfile = '@@Registration/GetPassengerProfile',
	GetPassengerGroup = '@@Registration/GetPassengerGroup',
	DeleteMemberGroup = '@@Registration/DeleteMemberGroup',
	ConfirmationPassenger = '@@Registration/ConfirmationPassenger',
	ConfirmationGroup = '@@Registration/ConfirmationGroup',
	GetAddressByPostalCode = '@@Registration/GetAddressByPostalCode',
	SelectNewLeader = '@@Registration/SelectNewLeader',
	BeginReserve = '@@Registration/BeginReserve',

	DeleteMember = '@@Registration/DeleteMember',

	GetPassengerMemberFetch = '@@Registration/GetPassengerMemberFetch',
	GetPassengerMemberSuccess = '@@Registration/GetPassengerMemberSuccess',
	GetPassengerMemberFailed = '@@Registration/GetPassengerMemberFailed',

	IsLeaderByNationalCode = '@@Registration/IsLeaderByNationalCode',
	IsLeaderByNationalCodeSuccess = '@@Registration/IsLeaderByNationalCodeSuccess',
	IsLeaderByNationalCodeFailed = '@@Registration/IsLeaderByNationalCodeFailed',

	StateForStep = '@@Registration/StateForStep',
	StateForStepSuccess = '@@Registration/StateForStepSuccess',
	StateForStepFailed = '@@Registration/StateForStepFailed',

	GetKarvanRegister = '@@Registration/GetKarvanRegister',
	GetKarvanRegisterSuccess = '@@Registration/GetKarvanRegisterSuccess',
	GetKarvanRegisterFailed = '@@Registration/GetKarvanRegisterFailed',

	GetUmrahPaymentHistory = '@@Registration/GetUmrahPaymentHistory',

	SetCrumbs = '@@Dashboard/SetCrumbs'
}
