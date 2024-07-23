import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import { thunk } from 'redux-thunk';
import { reducers } from './reducer';
import userManager from './userManager';
import { loadUser } from 'redux-oidc';

export default function configureStore(initialState: any) {
	const middleware = [thunk];

	const enhancers: any[] = [];
	const isDevelopment = process.env.NODE_ENV === 'development';

	if (isDevelopment && typeof window !== 'undefined' && (window as any).devToolsExtension) {
		enhancers.push((window as any).devToolsExtension());
	}

	// userManager.events.addAccessTokenExpired(() => {
	//     processSilentRenew();
	// });

	const rootReducer = combineReducers({ ...reducers });
	const store = createStore(
		rootReducer,
		initialState,
		compose(
			applyMiddleware(...middleware)
			// ...enhancers,
		)
	);
	loadUser(store, userManager);
	return store;
}
