export enum TransformationActionTypes {
	TransformationFetch = '@@Transformation/TransformationFetch',
	TransformationFetchSuccess = '@@Transformation/TransformationFetchSuccess',
	TransformationFetchFailed = '@@Transformation/TransformationFetchFailed',
	//GET office 2
	TransformationOfficeCreate = '@@Transformation/TransformationOfficeCreate',
	TransformationOfficeFaild = '@@Transformation/TransformationOfficeFaild',
	TransformationOfficeSucces = '@@Transformation/TransformationOfficeSucces',
	//POST office data
	TransformationPostOffice = '@@Transformation/TransformationPostOffice',
	TransformationPostOfficeSucces = '@@Transformation/TransformationPostOfficeSucces',

	//1POST Infotmation data for sells
	TransformationPostInfo = '@@Transformation/TransformationPostInfo',
	TransformationPostInfoSucces = '@@Transformation/TransformationPostInfoSucces',
	//2GET Sanad for Sells
	TransformationSanadForSale = '@@Transformation/TransformationSanadForSale',
	TransformationSanadForSaleFaild = '@@Transformation/TransformationSanadForSaleFaild',
	TransformationSanadForSaleSucces = '@@Transformation/TransformationSanadForSaleSucces',
	//3POST Saland Sells Manager
	TransformationSellsManager = '@@Transformation/TransformationSellsManager',
	TransformationSellsManagerSucces = '@@Transformation/TransformationSellsManagerSucces',
	//4GET List Request Information
	TransformationRequestInformation = '@@Transformation/TransformationRequestInformation',
	TransformationRequestInformationFaild = '@@Transformation/TransformationRequestInformationFaild',
	TransformationRequestInformationSucces = '@@Transformation/TransformationRequestInformationSucces',
	//5GET List RequestInformation
	TransformationRequest = '@@Transformation/TransformationRequest',
	TransformationRequestFaild = '@@Transformation/TransformationRequestFaild',
	TransformationRequestSucces = '@@Transformation/TransformationRequestSucces',
	//6POST CancelRequestShiftSanad
	CancelRequestShiftSanad = '@@Transformation/CancelRequestShiftSanad',
	CancelRequestShiftSanadSucces = '@@Transformation/CancelRequestShiftSanadSucces',
	//7PostCreateRequestReceivedSalesSanad
	CreateRequestReceivedSalesSanad = '@@Transformation/CreateRequestReceivedSalesSanad',
	CreateRequestReceivedSalesSanadSucces = '@@Transformation/CreateRequestReceivedSalesSanadSucces',
	//8PostCreateRequestReceivedSalesSanad
	CreateShiftSanadSalesManager = '@@Transformation/CreateShiftSanadSalesManager',
	CreateShiftSanadSalesManagerSucces = '@@Transformation/CreateShiftSanadSalesManagerSucces',
	//9PostCreateRequestReceivedSalesSanad
	RejectReceivedSalesSanad = '@@Transformation/RejectReceivedSalesSanad',
	RejectReceivedSalesSanadSucces = '@@Transformation/RejectReceivedSalesSanadSucces',
	//10GetProfilePersonShiftSanad
	GetProfilePersonShiftSanad = '@@Transformation/GetProfilePersonShiftSanad',
	GetProfilePersonShiftSanadFaild = '@@Transformation/GetProfilePersonShiftSanadFaild',
	GetProfilePersonShiftSanadSucces = '@@Transformation/GetProfilePersonShiftSanadSucces',
	//11GetCityProfile
	GetCityProfile = '@@Transformation/GetCityProfile',
	GetCityProfileSuccess = '@@Transformation/GetCityProfileSuccess',
	GetCityProfileFailed = '@@Transformation/GetCityProfileFailed',

	PushAlert = '@@Dashboard/PushAlert',
	ClearAlerts = '@@Dashboard/ClearAlerts',
	SetCrumbs = '@@Dashboard/SetCrumbs'
}
