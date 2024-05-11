import { AppAction } from '../../../../store/state';
import API from '../../../../components/general/baseURL';
import { KnownAction } from './model';
import { ReserveAndRegisterActionTypes } from './actionType';

export const reserveAndRegisterActions = {
	///////////////////////////////
	getPayment:
		(codeTracking?: string): AppAction<KnownAction> =>
		async (dispatch, getState) => {
			dispatch({ type: ReserveAndRegisterActionTypes.GetPaymentZaer });
			try {
				const result = await API.get(
					`/Legacy/PaymentZaer?NationalCode=${getState().oidc.user.profile.nationalCode}&CodeTrackingFromKarevan=${codeTracking}`
				);
				if (result.status === 200) {
					if (result.data.errorCode == 0) {
						reserveAndRegisterActions.pushAlert({
							title: 'اطلاعات با موفقیت بازیابی شد.',
							description: '',
							variant: 'success',
							dismissTime: 3000
						})(dispatch, getState);
						dispatch({
							type: ReserveAndRegisterActionTypes.GetPaymentZaerSuccess,
							data: result.data
						});
					} else {
						reserveAndRegisterActions.pushAlert({
							title: result.data.errorMessage,
							description: '',
							variant: 'warning',
							dismissTime: 3000
						})(dispatch, getState);
					}
				}
			} catch (error) {
				dispatch({ type: ReserveAndRegisterActionTypes.GetPaymentZaerFailed });
				reserveAndRegisterActions.showRequestErrors(error)(dispatch, getState);
			}
		},

	createSignUnderTaking: (): AppAction<KnownAction> => async (dispatch, getState) => {
		dispatch({ type: ReserveAndRegisterActionTypes.CreateSignUnderTaking });
		try {
			const result = await API.post(`/Legacy/CreateSignUnderTaking`, {
				nationalCode: getState().oidc.user.profile.nationalCode
			});
			if (result.status === 201) {
				if (result.data.errorCode == 0) {
					reserveAndRegisterActions.pushAlert({
						title: result.data.errorMessage,
						description: '',
						variant: 'warning',
						dismissTime: 2000
					})(dispatch, getState);
				} else {
					dispatch({
						type: ReserveAndRegisterActionTypes.CreateSignUnderTakingSuccess,
						data: result.data
					});
					reserveAndRegisterActions.pushAlert({
						title: 'تعهدات شما با موفقیت ثبت شد.',
						description: '',
						variant: 'success',
						dismissTime: 2000
					})(dispatch, getState);
				}
				window.location.reload();
			}
		} catch (error) {
			dispatch({ type: ReserveAndRegisterActionTypes.CreateSignUnderTakingFailed });
			reserveAndRegisterActions.showRequestErrors(error)(dispatch, getState);
		}
	},

	getIsChechPromise: (): AppAction<KnownAction> => async (dispatch, getState) => {
		dispatch({ type: ReserveAndRegisterActionTypes.IsChechPromise });
		try {
			const result = await API.get(`/Legacy/IsCheckSignUnderTaking?NationalCode=${getState().oidc.user.profile.nationalCode}`);
			if (result.status === 200) {
				dispatch({
					type: ReserveAndRegisterActionTypes.IsChechPromiseSuccess,
					data: result.data
				});
			}
		} catch (error) {
			dispatch({ type: ReserveAndRegisterActionTypes.IsChechPromiseFailed });
			reserveAndRegisterActions.showRequestErrors(error)(dispatch, getState);
		}
	},

	////////////////////////
	getPrintReserveData:
		(codeTracking?: string | number, nationalCode?: string, history?: any): AppAction<KnownAction> =>
		async (dispatch, getState) => {
			dispatch({ type: ReserveAndRegisterActionTypes.GetZaerForReservation });
			try {
				const result = await API.get(
					`/Legacy/PrintReserveZaer?NationalCode=${nationalCode ? nationalCode : getState().oidc.user.profile.nationalCode}&CodeTracking=${codeTracking}`
				);
				if (result.status === 200 && result.data.errorCode === 0) {
					dispatch({
						type: ReserveAndRegisterActionTypes.PrintReserveZaerSuccess,
						data: result.data
					});
					history.push('/Print');
				} else {
					reserveAndRegisterActions.pushAlert({
						title: result.data.errorMessage,
						description: '',
						variant: 'warning',
						dismissTime: 2000
					})(dispatch, getState);

					reserveAndRegisterActions.pushAlert({
						title: result.data.errorMessage,
						variant: 'warning',
						dismissTime: 9000,
						description: ''
					})(dispatch, getState);
				}
			} catch (error) {
				dispatch({ type: ReserveAndRegisterActionTypes.PrintReserveZaerFailed });
				reserveAndRegisterActions.showRequestErrors(error)(dispatch, getState);
			}
		},

	setToggleSearchModal:
		(visible: boolean): AppAction<KnownAction> =>
		(dispatch, getState) => {
			dispatch({
				type: ReserveAndRegisterActionTypes.ToggleSearchModal,
				visible
			});
		},

	createReserveZaer:
		(
			personInformation?: any,
			zaerCount?: any,
			karevanId?: any,
			karevanTel?: any,
			karevanNo?: any,
			reserveType?: any
		): AppAction<KnownAction> =>
		async (dispatch, getState) => {
			dispatch({ type: ReserveAndRegisterActionTypes.CreateReserveZaer });

			try {
				const result = await API.post(`/Legacy/CreateReserveZaer`, {
					personInformation: personInformation,
					zaerCount: zaerCount,
					karevanId: karevanId,
					karevanTel: karevanTel,
					karevanNo: karevanNo,
					reserveType: reserveType
				});
				if (result.status === 201) {
					if (result.data.errorCode == 0) {
						dispatch({
							type: ReserveAndRegisterActionTypes.CreateReserveZaerSuccess,
							data: result.data,
							x: true
						});
						reserveAndRegisterActions.pushAlert({
							title: 'رزرو با موفقیت انجام شد',
							description: '',
							variant: 'success',
							dismissTime: 2000
						})(dispatch, getState);
						localStorage.setItem('validReserve', 'true');
						window.location.reload();
					} else {
						reserveAndRegisterActions.pushAlert({
							title: result.data.errorMessage,
							description: '',
							variant: 'warning',
							dismissTime: 2000
						})(dispatch, getState);
						localStorage.setItem('validReserve', 'false');
					}
				}
			} catch (error) {
				dispatch({ type: ReserveAndRegisterActionTypes.CreateReserveZaerFailed });
				reserveAndRegisterActions.showRequestErrors(error)(dispatch, getState);
			}
		},

	getPersonInfo:
		(nationalCode?: string): AppAction<KnownAction> =>
		async (dispatch, getState) => {
			dispatch({ type: ReserveAndRegisterActionTypes.GetPersonInfo });
			try {
				const result = await API.get(
					`/Legacy/GetListSanadFromSahmiehANDFarakhan?NationalCode=${nationalCode ? nationalCode : getState().oidc.user.profile.nationalCode}`
				);
				if (result.status === 200) {
					dispatch({
						type: ReserveAndRegisterActionTypes.GetPersonInfoSuccess,
						data: result.data
					});
				}
			} catch (error) {
				dispatch({ type: ReserveAndRegisterActionTypes.GetPersonInfoFailed });
				reserveAndRegisterActions.showRequestErrors(error)(dispatch, getState);
			}
		},
	getZaerForReservation:
		(codeTracking?: string, nationalCode?: string): AppAction<KnownAction> =>
		async (dispatch, getState) => {
			dispatch({ type: ReserveAndRegisterActionTypes.GetZaerForReservation });
			try {
				const result = await API.get(
					`/Legacy/GetZaerForReservation?CodeTracking=${codeTracking}&NationalCode=${nationalCode ? nationalCode : getState().oidc.user.profile.nationalCode}`
				);
				if (result.status === 200 && result.data.getZaerRezerve === null) {
					reserveAndRegisterActions.pushAlert({
						title: 'اطلاعاتی یافت نشد',
						description: 'اطلاعاتی یافت نشد. لطفا بعدا دوباره تلاش کنید.',
						variant: 'warning',
						dismissTime: 6000
					})(dispatch, getState);
					dispatch({ type: ReserveAndRegisterActionTypes.GetZaerForReservationFailed });
				}
				if (result.status === 200 && result.data.errorCode !== 0) {
					dispatch({
						type: ReserveAndRegisterActionTypes.GetZaerForReservationSuccess,
						data: [],
						errors: result.data
					});
					return;
				}
				if (result.status === 200 && result.data.getZaerRezerve !== null) {
					const localStorageData = [];
					if (!localStorage.getItem('data')) {
						localStorageData.push(result.data.getZaerRezerve);
						localStorage.setItem('data', JSON.stringify(localStorageData));
						reserveAndRegisterActions.pushAlert({
							title: 'عملیات موفقیت آمیز',
							description: 'عملیات افزودن با موفقیت انجام شد.',
							variant: 'success',
							dismissTime: 3000
						})(dispatch, getState);
					} else {
						const getLocalStorage = JSON.parse(localStorage.getItem('data') as any);
						const findDuplicate = getLocalStorage.find((data: any) => data.codeTracking === codeTracking);
						const findProvinceId = getLocalStorage.find((data: any) => data.provinceId === result.data.getZaerRezerve.provinceId);
						if (result.data.errorCode === 0) {
							if (!findDuplicate && findProvinceId) {
								getLocalStorage.push(result.data.getZaerRezerve);
								localStorage.setItem('data', JSON.stringify(getLocalStorage));
								reserveAndRegisterActions.pushAlert({
									title: 'عملیات موفقیت آمیز',
									description: 'عملیات افزودن با موفقیت انجام شد.',
									variant: 'success',
									dismissTime: 3000
								})(dispatch, getState);
							} else {
								reserveAndRegisterActions.pushAlert({
									title: 'اطلاعات قابل قبول نمیباشد.',
									description:
										'لطفا برسی کنید: 1)اطلاعات تکراری نباشند.  2)استان فرد انتخابی با استان بقیه افراد مطابقت داشته باشد.',
									variant: 'warning',
									dismissTime: 6000
								})(dispatch, getState);
							}
						} else {
							reserveAndRegisterActions.pushAlert({
								title: 'اطلاعات قابل قبول نمیباشد.',
								description: result.data.errorMessage,
								variant: 'warning',
								dismissTime: 5000
							})(dispatch, getState);
						}
					}
					dispatch({
						type: ReserveAndRegisterActionTypes.GetZaerForReservationSuccess,
						data: localStorageData,
						errors: null
					});
				}
			} catch (error) {
				dispatch({ type: ReserveAndRegisterActionTypes.GetZaerForReservationFailed });
				reserveAndRegisterActions.showRequestErrors(error)(dispatch, getState);
			}
		},
	getPriceList:
		(provinceId?: string): AppAction<KnownAction> =>
		async (dispatch, getState) => {
			dispatch({ type: ReserveAndRegisterActionTypes.GetListPriceKarvans });
			try {
				const result = await API.get(`/Legacy/GetListPriceKarevans?ProvinceId=${provinceId}`);
				if (result.status === 200) {
					const options = result.data.map((option: any) => {
						return {
							label: option.price,
							value: option.price
						};
					});
					dispatch({
						type: ReserveAndRegisterActionTypes.GetListPriceKarvansSuccess,
						data: options
					});
				}
			} catch (error) {
				dispatch({ type: ReserveAndRegisterActionTypes.GetListPriceKarvansFailed });
				reserveAndRegisterActions.showRequestErrors(error)(dispatch, getState);
			}
		},
	getResultSerchKarvan:
		(
			zaerCount?: number,
			provinceId?: number,
			priceFrom?: any,
			priceTo?: any,
			managerNamne?: string,
			karevanNo?: number,
			karevanAddress?: string,
			madineh?: number,
			religion?: number,
			startRowIndex?: number,
			maximumRows?: number,
			cityAddressId?: any
		): AppAction<KnownAction> =>
		async (dispatch, getState) => {
			dispatch({ type: ReserveAndRegisterActionTypes.GetSearchKarvanList });
			try {
				const result = await API.post(`/Legacy/GetSearchKarevanList`, {
					zaerCount: zaerCount ? zaerCount : '1',
					provinceId: provinceId ? provinceId : 0,
					priceFrom: priceFrom ? priceFrom : 0,
					priceTo: priceTo ? priceTo : 0,
					managerNamne: managerNamne ? managerNamne : '',
					karevanNo: karevanNo ? karevanNo : 0,
					karevanAddress: karevanAddress ? karevanAddress : '',
					medineh: madineh ? madineh : 1,
					religion: religion ? religion : 1,
					startRowIndex: startRowIndex ? startRowIndex : 0,
					maximumRows: maximumRows ? maximumRows : 0,
					cityAddressId: cityAddressId ? cityAddressId : ''
				});
				if (result.status === 200) {
					dispatch({
						type: ReserveAndRegisterActionTypes.GetSearchKarvanListSuccess,
						data: result.data.getSearchKarevans
					});
					if (result.data.getSearchKarevans.length == 0) {
						reserveAndRegisterActions.pushAlert({
							title: 'اطلاعاتی یافت نشد.',
							description: '',
							variant: 'warning',
							dismissTime: 6000
						})(dispatch, getState);
					}
				} else {
					reserveAndRegisterActions.pushAlert({
						title: 'اطلاعاتی یافت نشد.',
						description: '',
						variant: 'warning',
						dismissTime: 6000
					})(dispatch, getState);
				}
			} catch (error) {
				dispatch({ type: ReserveAndRegisterActionTypes.GetSearchKarvanListFailed });
				reserveAndRegisterActions.showRequestErrors(error)(dispatch, getState);
			}
		},

	pushAlert:
		(alert: {
			title: string;
			description: string;
			variant: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark';
			dismissTime?: number;
		}): AppAction<KnownAction> =>
		async (dispatch, getState) => {
			dispatch({
				type: ReserveAndRegisterActionTypes.PushAlert,
				alert
			});
		},
	clearAlerts: (): AppAction<KnownAction> => async (dispatch, getState) => {
		dispatch({ type: ReserveAndRegisterActionTypes.ClearAlerts });
	},
	showRequestErrors:
		(error: any): AppAction<KnownAction> =>
		async (dispatch, getState) => {
			if (error.response && error.response.status) {
				if (error.response.status == 401) reserveAndRegisterActions.pushCommonAlert('401')(dispatch, getState);
				else if (error.response.status == 403) reserveAndRegisterActions.pushCommonAlert('403')(dispatch, getState);
				else if (error.response.status == 400 && error.response && error.response.data && error.response.data.length > 0) {
					let errors = '';
					for (var i = 0; i < error.response.data.length; i++) errors += (errors == '' ? '' : '\n') + error.response.data[i];
					reserveAndRegisterActions.pushAlert({
						title: 'information',
						description: errors,
						variant: 'danger'
					})(dispatch, getState);
				} else
					reserveAndRegisterActions.pushAlert({
						title: 'error',
						description: 'UnSuccessfulOperation',
						variant: 'danger'
					})(dispatch, getState);
			} else {
				reserveAndRegisterActions.pushAlert({
					title: 'error',
					description: 'UnSuccessfulOperation',
					variant: 'danger'
				})(dispatch, getState);
			}
		},
	pushCommonAlert:
		(type: '201' | '204' | '401' | '403' | 'errorFetch'): AppAction<KnownAction> =>
		async (dispatch, getState) => {
			switch (type) {
				case '201':
					reserveAndRegisterActions.pushAlert({
						title: 'information',
						description: 'SuccessfulOperation',
						variant: 'success'
					})(dispatch, getState);
					break;
				case '204':
					reserveAndRegisterActions.pushAlert({
						title: 'error',
						description: 'DataInNotFound',
						variant: 'warning'
					})(dispatch, getState);
					break;
				case '401':
					reserveAndRegisterActions.pushAlert({
						title: 'error',
						description: 'UnauthorizedError',
						variant: 'warning'
					})(dispatch, getState);
					break;
				case '403':
					reserveAndRegisterActions.pushAlert({
						title: 'error',
						description: 'ForbiddenError',
						variant: 'warning'
					})(dispatch, getState);
					break;
				case 'errorFetch':
					reserveAndRegisterActions.pushAlert({
						title: 'error',
						description: 'UnSuccessfetchData',
						variant: 'warning'
					})(dispatch, getState);
					break;
			}
		}
};
