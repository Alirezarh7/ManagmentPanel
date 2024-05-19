const baseUrls = {
	// Interanl: 'http://192.168.2.29:8089/api',
	Interanl: 'https://localhost:7120/api',
	Sadad: 'https://mybeta.haj.ir/api',
	Haj: 'http://mytest.haj.ir:8089/api',

	PaymentInternal: 'http://192.168.2.29:8089',
	PaymentSadad: 'https://mybeta.haj.ir',
	PaymentHaj: 'http://mytest.haj.ir:8089'
};

export const currentBaseUrl: string = baseUrls.Interanl;
export const currentPaymentBaseUrl: string = baseUrls.PaymentInternal;

const managementBaseUrls = {
	mamadLocal: 'https://localhost:7219/api',
	napLocal: 'http://192.168.2.29:7219/api'
};

export const managementPanelBaseUrl: string = managementBaseUrls.mamadLocal;
