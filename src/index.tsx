import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import configureStore from './store/configureStore';
import { Provider } from 'react-redux';
import { Store } from 'redux';
//Lang
import './i18n';
import { OidcProvider } from 'redux-oidc';
import userManager from './store/userManager';
import SsoLoginPage from './pages/SsoLoginPage';
import { shareData } from './shareData';
import { BrowserRouter } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { PATHS } from './router/paths';

const root = createRoot(document.getElementById('root')!);
const queryClient = new QueryClient({
	defaultOptions: {
		queries : {
			retry:false,
			refetchOnWindowFocus: false
		}
	}
});
const initialState = (window as any).initialReduxState;
const store = configureStore(initialState);
if (window.location.pathname === PATHS.frameWork.silentCallback) {
	userManager.signinSilentCallback();
} else {
	root.render(
		<QueryClientProvider  client={queryClient}>
			<BrowserRouter>
				<Provider store={store}>
					{/*@ts-ignore*/}
					<OidcProvider userManager={userManager} store={store as Store}>
						<SnackbarProvider autoHideDuration={4000} >
							{/*if user does not select a sso approach to login in application show a sso login page */}
							{localStorage.getItem(shareData.CONSTANT.SSO_APPROACH_SELECTED) === 'true' ? <App /> : <SsoLoginPage />}
						</SnackbarProvider>
					</OidcProvider>
				</Provider>
				{/*<ReactQueryDevtools initialIsOpen={false} />*/}
			</BrowserRouter>
		</QueryClientProvider>
	);
}
