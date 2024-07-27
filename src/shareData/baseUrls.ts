const baseUrls = {
	// Interanl: 'http://192.168.2.29:8089/api',
	Interanl: 'https://apigateway.navoshgaran.com/ManagementPanel/api',
	Sadad: 'https://my.haj.ir/api',
	Haj: 'http://mytest.haj.ir:8089/api',

	PaymentInternal: 'https://apigateway.navoshgaran.com/ManagementPanel/api',
	PaymentSadad: 'https://my.haj.ir',
	PaymentHaj: 'http://mytest.haj.ir:8089'
};

export const currentBaseUrl: string = baseUrls.Sadad;
export const currentPaymentBaseUrl: string = baseUrls.PaymentSadad;

const managementBaseUrls = {
	// mamadLocal: 'https://localhost:7219/api',
	napLocal: 'https://apigateway.navoshgaran.com/ManagementPanel/api',
	myHajIr: 'my.haj.ir/api/ManagementPanel/api'
};

export const managementPanelBaseUrl: string = managementBaseUrls.myHajIr;

const creatPersonToken = {
	creatPesron: 'https://apigateway.navoshgaran.com/BasicInfo/api/People/CreatePerson'
};
export const managementPanelCreatPerson: string = creatPersonToken.creatPesron;
