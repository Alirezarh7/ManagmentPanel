import { createUserManager } from 'redux-oidc';
import Oidc, { Log, UserManagerSettings } from 'oidc-client';
import { shareData } from '../shareData';

// Log.logger = console;
// Log.level = Log.DEBUG;

const ssoURLGov = 'https://sso.my.gov.ir/oauth2';
const ssoURLOrganization = 'https://auth.haj.ir/';
// const ssoURLOrganization = "http://192.168.2.29:8090/";
// const ssoURLOrganization = "https://auth.haj.ir";

const userManagerConfigOrganization: UserManagerSettings = {
	client_id: 'IntegratedWindow',
	redirect_uri: window.location.origin + '/SignInCallback',
	silent_redirect_uri: window.location.origin + '/SilentCallback',
	response_type: 'code',
	scope: 'openid profile roles hajwindowapi',
	authority: ssoURLOrganization,
	post_logout_redirect_uri: window.location.origin + '/SignOutCallback',
	userStore: new Oidc.WebStorageStateStore({ store: localStorage }),
	automaticSilentRenew: true,
	filterProtocolClaims: true,
	loadUserInfo: true,
	monitorSession: false,
	client_secret: 'Integrated@1402$'
	// mergeClaims : true,
};

const userManagerConfigGov: UserManagerSettings = {
	client_id: 'my.haj',
	redirect_uri: window.location.origin + '/Pilgrom/DowlatAuthLand',
	silent_redirect_uri: window.location.origin + '/Pilgrom/DowlatAuthLand',
	response_type: 'code',
	scope: 'openid profile',
	authority: ssoURLGov,
	// @ts-ignore
	client_authentication: 'client_secret_basic',
	post_logout_redirect_uri: window.location.origin + '/SignOutCallback',
	userStore: new Oidc.WebStorageStateStore({ store: localStorage }),
	automaticSilentRenew: true,
	metadata: {
		jwks_uri: 'https://sso.my.gov.ir/oauth2/jwks',
		authorization_endpoint: 'https://sso.my.gov.ir/oauth2/authorize',
		token_endpoint: 'https://sso.my.gov.ir/oauth2/token',
		issuer: 'https://sso.my.gov.ir',
		userinfo_endpoint: 'https://sso.my.gov.ir/api/v1/user/userinfo'
	},
	mergeClaims: true,
	loadUserInfo: false,
	userInfoJwtIssuer: 'ANY',
	monitorSession: true,
	client_secret: 'rpbka7aux8my0x90oq4b5g0qsqrasd88'
};
const userManager =
	localStorage.getItem(shareData.CONSTANT.SSO_APPROACH) === 'mygov'
		? createUserManager(userManagerConfigGov)
		: createUserManager(userManagerConfigOrganization);

// Log.level = Log.DEBUG ;
export default userManager;
