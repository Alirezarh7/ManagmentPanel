const baseUrls = {
	Interanl: 'https://apigateway.navoshgaran.com/ManagementPanel/api',
	Sadad: 'https://my.haj.ir/api',

	PaymentInternal: 'https://apigateway.navoshgaran.com/ManagementPanel/api',
	PaymentSadad: 'https://my.haj.ir'
};

const managementBaseUrls = {
	navoshgaran: 'https://apigateway.navoshgaran.com/ManagementPanel/api',
	sadad: 'my.haj.ir/api/ManagementPanel/api'
};

const creatPersonToken = {
	creatPesron: 'https://apigateway.navoshgaran.com/BasicInfo/api/People/CreatePerson'
};

export const currentBaseUrl: string = baseUrls.Interanl;
export const currentPaymentBaseUrl: string = baseUrls.PaymentInternal;
export const managementPanelBaseUrl: string = managementBaseUrls.navoshgaran;
export const managementPanelCreatPerson: string = creatPersonToken.creatPesron;

export const ssoURLGov = 'https://sso.my.gov.ir/oauth2';
export const ssoURLOrganization = 'https://auth.haj.ir/';
