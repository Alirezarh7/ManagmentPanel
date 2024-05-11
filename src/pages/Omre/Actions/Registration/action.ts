import { AppAction } from '../../../../store/state';
import API from '../../../../components/general/baseURL';
import { KnownAction } from './model';
import { RegistrationActionTypes } from './actionType';
//import { useNavigate } from "react-router";

export const registrationActions = {
	setCrumbs:
		(crumbs: { title: string; link: string }[]): AppAction<KnownAction> =>
		async (dispatch, getState) => {
			dispatch({ type: RegistrationActionTypes.SetCrumbs, crumbs });
		},
	setToggleSearchModal:
		(visible: boolean): AppAction<KnownAction> =>
		(dispatch, getState) => {
			dispatch({
				type: RegistrationActionTypes.ToggleSearchModal,
				visible
			});
		},
	setToggleConfirmModal:
		(visible: boolean): AppAction<KnownAction> =>
		(dispatch, getState) => {
			dispatch({
				type: RegistrationActionTypes.ToggleConfirmModal,
				visible
			});
		},

	getOmreDocument:
		(
			nationalCode?: string,
			phoneNumber?: string,
			birthDate?: string,
			kargroupId?: string,
			history?: any,
			updater?: boolean
		): AppAction<KnownAction> =>
		async (dispatch, getState) => {
			dispatch({ type: RegistrationActionTypes.OmreSanadFetch });

			if (updater) {
				dispatch({
					type: RegistrationActionTypes.OmreSanadFetchUpdater,
					update: true
				});
			} else {
				dispatch({
					type: RegistrationActionTypes.OmreSanadFetchUpdater,
					update: false
				});
			}

			try {
				const result = await API.get(
					`/OmrehLegacy/GetSanad?NationalCode=${nationalCode ? nationalCode : getState().oidc.user.profile.nationalCode}&BirthDate=${birthDate ? birthDate : getState().oidc.user.profile.birthDate}&Mobile=${phoneNumber ? phoneNumber : getState().oidc.user.profile.mobileNo}&KargroupId=${kargroupId ? kargroupId : '0'}`
				);

				if (result.status === 200 && result.data.errorCode !== 0) {
					dispatch({
						type: RegistrationActionTypes.OmreSanadFetchSuccess,
						data: []
					});
					return registrationActions.pushAlert({
						title: 'خطای سیستم',
						description: result.data.errorMessage,
						variant: 'warning'
					});
				} else if (result.status === 200 && result.data.errorCode === 0) {
					dispatch({
						type: RegistrationActionTypes.OmreSanadFetchSuccess,
						data: result.data ? result.data.getSanads : []
					});
				}
			} catch (error) {
				dispatch({ type: RegistrationActionTypes.OmreSanadFetchFailed });
				registrationActions.showRequestErrors(error)(dispatch, getState);
				// history && history('/OmreMofrade/ReserveStepOne')
			}
		},

	cancelAllReserveForUser:
		(history?: any): AppAction<KnownAction> =>
		async (dispatch, getState) => {
			dispatch({ type: RegistrationActionTypes.CancelUserRegistration, loading: true });
			try {
				const result = await API.post(`/OmrehLegacy/CancelAllReserveForUser`, {
					nationalCode: getState().oidc.user.profile.nationalCode
				});
				history && history('/OmreMofrade/myDocuments');
				dispatch({ type: RegistrationActionTypes.CancelUserRegistration, loading: false });
			} catch (error) {
				dispatch({ type: RegistrationActionTypes.CancelUserRegistration, loading: false });
				registrationActions.showRequestErrors(error)(dispatch, getState);
			}
		},

	getSanadAghlambazFn:
		(callInMyDocumentsDetail?: boolean, item?: any, nationalCode?: string): AppAction<KnownAction> =>
		async (dispatch, getState) => {
			dispatch({ type: RegistrationActionTypes.SanadAghlambaz });
			try {
				const result = await API.get(
					`/OmrehLegacy/GetSanadAghlambaz?NationalCode=${nationalCode ? nationalCode : getState().oidc.user.profile.nationalCode}&SanadNo=${item.sanadNo}&BirthDate=${item.birthDate ? item.birthDate : getState().oidc.user.profile.birthDate}&Mobile=${item.mobileNo ? item.mobileNo : getState().oidc.user.profile.mobileNo}&KargroupId=${item.KargroupId ? item.KargroupId : 0}`
				);

				if (result.status === 200 && result.data && !result.data.getSanadAghlambaz) {
					registrationActions.pushAlert({
						title: 'اطلاعاتی یافت نشد',
						description: ' سند عمره با اطلاعات وارد شده وجود ندارد',
						variant: 'warning',
						dismissTime: 6000
					})(dispatch, getState);
					dispatch({ type: RegistrationActionTypes.SanadAghlambazFailed });
					dispatch({
						type: RegistrationActionTypes.ToggleSearchModal,
						visible: false
					});
				}

				if (result.status === 200 && result.data.getSanadAghlambaz) {
					if (callInMyDocumentsDetail) {
						if (result.data.errorCode !== 0) {
							return registrationActions.pushAlert({
								title: 'پیام سیستم',
								description: result.data.errorMessage,
								variant: 'warning',
								dismissTime: 6000
							})(dispatch, getState);
						}
						dispatch({
							type: RegistrationActionTypes.OmreSanadFetchSuccess,
							data: result.data.getSanadAghlambaz
						});
						dispatch({
							type: RegistrationActionTypes.ToggleSearchModal,
							visible: false
						});
						dispatch({
							type: RegistrationActionTypes.SanadAghlambazSuccess,
							data: [],
							errors: null
						});
					} else {
						const karvanStorage: any =
							localStorage.getItem('dataForStepTow') && JSON.parse(localStorage.getItem('dataForStepTow') as any);

						const localStorageData = [];
						if (!localStorage.getItem('OmreKarvan')) {
							const data = {
								...result.data.getSanadAghlambaz[0],
								phoneNumber: getState().oidc.user.profile.mobileNo
							};
							localStorageData.push(data);
							localStorage.setItem('OmreKarvan', JSON.stringify(localStorageData));
							registrationActions.pushAlert({
								title: 'عملیات موفقیت آمیز',
								description: 'عملیات افزودن با موفقیت انجام شد.',
								variant: 'success',
								dismissTime: 3000
							})(dispatch, getState);
						} else {
							const getLocalStorage = JSON.parse(localStorage.getItem('OmreKarvan') as any);
							const findDuplicate = getLocalStorage.find(
								(data: any) => data.ssn === (nationalCode ? nationalCode : getState().oidc.user.profile.nationalCode)
							);
							// const findProvinceId = getLocalStorage.find((data: any) => data.provinceId === result.data.getZaerRezerve.provinceId)
							if (result.data && result.data.getSanadAghlambaz) {
								if (!findDuplicate) {
									const data = {
										...result.data.getSanadAghlambaz[0],
										phoneNumber: getState().oidc.user.profile.mobileNo
									};
									getLocalStorage.push(data);
									localStorage.setItem('OmreKarvan', JSON.stringify(getLocalStorage));
									registrationActions.pushAlert({
										title: 'عملیات موفقیت آمیز',
										description: 'عملیات افزودن با موفقیت انجام شد.',
										variant: 'success',
										dismissTime: 3000
									})(dispatch, getState);
								} else {
									registrationActions.pushAlert({
										title: 'اطلاعات قابل قبول نمیباشد.',
										description: 'لطفا برسی کنید اطلاعات تکراری نباشند',
										variant: 'warning',
										dismissTime: 6000
									})(dispatch, getState);
								}
							}
						}
						dispatch({
							type: RegistrationActionTypes.SanadAghlambazSuccess,
							data: localStorageData,
							errors: null
						});
					}
				}
			} catch (error) {
				dispatch({ type: RegistrationActionTypes.SanadAghlambazFailed });
				registrationActions.showRequestErrors(error)(dispatch, getState);
			}
		},

	//     Alireza ------------------------------------------------------------------------------------------------------------------------------- start

	GetReserveDetail: (): AppAction<KnownAction> => async (dispatch, getState) => {
		dispatch({ type: RegistrationActionTypes.GetReserveDetailList });
		try {
			const result = await API.get(`/OmrehLegacy/GetReserveDetailList?NationalCode=${getState().oidc.user.profile.nationalCode}`);
			if (result.status === 200) {
				dispatch({ type: RegistrationActionTypes.GetReserveDetailListSuccess, data: result.data });
			} else {
				dispatch({ type: RegistrationActionTypes.GetReserveDetailListFailed });
			}
		} catch (error) {
			dispatch({ type: RegistrationActionTypes.GetReserveDetailListFailed });
		}
	},

	getProvinces: (): AppAction<KnownAction> => async (dispatch, getState) => {
		try {
			const result = await API.get('/Province/GetProvinceListByCountryId?CountryId=1');
			dispatch({ type: RegistrationActionTypes.ProvinceFetch });
			if (result.status === 200) {
				const provinces = result.data.map((res: any) => {
					return {
						...res,
						value: res.id,
						label: res.title
					};
				});

				dispatch({
					type: RegistrationActionTypes.ProvinceFetchSuccess,
					loading: false,
					data: provinces
				});
			}
		} catch (error) {
			dispatch({ type: RegistrationActionTypes.ProvinceFetchFailed });
			registrationActions.showRequestErrors(error)(dispatch, getState);
		}
	},

	getCitiesByProvince:
		(provinceId: string): AppAction<KnownAction> =>
		async (dispatch, getState) => {
			try {
				const result = await API.get(`/City/GetCityListByProvinceId?ProvinceId=${provinceId}`);
				dispatch({ type: RegistrationActionTypes.CityFetch });
				if (result.status === 200) {
					const cities = result.data.map((res: any) => {
						return {
							...res,
							value: res.id,
							label: res.title
						};
					});

					dispatch({
						type: RegistrationActionTypes.CityFetchSuccess,
						data: cities
					});
				}
			} catch (error) {
				dispatch({ type: RegistrationActionTypes.CityFetchFailed });
				registrationActions.showRequestErrors(error)(dispatch, getState);
			}
		},

	GetPrintReserve: (): AppAction<KnownAction> => async (dispatch, getState) => {
		dispatch({ type: RegistrationActionTypes.GetPrintDetailList });
		try {
			const result = await API.get(`/OmrehLegacy/GetPrintReserve?NationalCode=${getState().oidc.user.profile.nationalCode}`);
			if (result.status === 200) {
				dispatch({ type: RegistrationActionTypes.GetPrintDetailListSuccess, data: result.data });
			} else {
				dispatch({ type: RegistrationActionTypes.GetPrintDetailListFailed });
			}
		} catch (error) {
			dispatch({ type: RegistrationActionTypes.GetPrintDetailListFailed });
		}
	},

	///////////////////////////////////
	CreateReserve:
		(data: any, history: any): AppAction<KnownAction> =>
		async (dispatch, getState) => {
			dispatch({ type: RegistrationActionTypes.CreateReserve, loading: true });
			try {
				const result = await API.post('/OmrehLegacy/CreateReserve', data);
				if (result.status === 201) {
					if (result.data.errorCode === 0 || result.data.errorCode === 1) {
						dispatch({ type: RegistrationActionTypes.CreateReserveSuccess });
						registrationActions.pushAlert({
							title: result.data.errorMessage,
							description: '',
							variant: 'success',
							dismissTime: 5000
						})(dispatch, getState);

						history('/OmreMofrade/myDocuments');
					} else {
						dispatch({ type: RegistrationActionTypes.CreateReserveSuccess });
						registrationActions.pushAlert({
							title: result.data.errorMessage,
							description: '',
							variant: 'warning',
							dismissTime: 5000
						})(dispatch, getState);
					}
				}
			} catch (error) {
				dispatch({ type: RegistrationActionTypes.CreateReserve, loading: false });
				registrationActions.showRequestErrors(error)(dispatch, getState);
			}
		},

	EbtalReserve:
		(data: any): AppAction<KnownAction> =>
		async (dispatch, getState) => {
			dispatch({ type: RegistrationActionTypes.EbtalReserve, loading: true });
			try {
				const result = await API.post('/Umrah/CancelReserveGroup', data);
				if (result.status === 201) {
					dispatch({ type: RegistrationActionTypes.EbtalReserveSuccess });
					registrationActions.pushCommonAlert('201')(dispatch, getState);
				}
			} catch (error) {
				dispatch({ type: RegistrationActionTypes.EbtalReserve, loading: false });
				registrationActions.showRequestErrors(error)(dispatch, getState);
			}
		},

	clearPersonInfo: (): AppAction<KnownAction> => async (dispatch, getState) => {
		dispatch({ type: RegistrationActionTypes.ClearPersonInfo, data: [] });
	},
	clearPassengerProfileData: (): AppAction<KnownAction> => async (dispatch, getState) => {
		dispatch({ type: RegistrationActionTypes.GetPassengerProfile, data: null, loading: false });
	},

	setMemberProfile:
		(data: any, handleClose: any): AppAction<KnownAction> =>
		async (dispatch, getState) => {
			dispatch({ type: RegistrationActionTypes.SetZaerProfileInfo, loading: true });
			try {
				const result = await API.post('/Umrah/ProfileInfo', data);
				dispatch({ type: RegistrationActionTypes.SetZaerProfileInfo, loading: false });
				handleClose();
				registrationActions.pushAlert({
					title: 'اطلاعات با موفقیت ذخیره شد',
					description: '',
					variant: 'success'
				})(dispatch, getState);
			} catch (error) {
				handleClose();
				registrationActions.showRequestErrors(error)(dispatch, getState);
				dispatch({ type: RegistrationActionTypes.SetZaerProfileInfo, loading: false });
			}
		},
	//////////////////alireza

	leaderByNationalCode:
		(nationalCode?: any): AppAction<KnownAction> =>
		async (dispatch, getState) => {
			dispatch({ type: RegistrationActionTypes.IsLeaderByNationalCode });
			try {
				const result = await API.get(`/Umrah/IsLeaderByNationalCode?NationalCode=${getState().oidc.user.profile.nationalCode}`);

				if (result.status === 200) {
					dispatch({
						type: RegistrationActionTypes.IsLeaderByNationalCodeSuccess,
						data: result.data === true ? 'true' : 'false'
					});
				} else {
					dispatch({ type: RegistrationActionTypes.IsLeaderByNationalCodeFailed });
				}
			} catch (error) {
				dispatch({ type: RegistrationActionTypes.IsLeaderByNationalCodeFailed });
			}
		},

	GetRegisterHistory:
		(SanadNo: any): AppAction<KnownAction> =>
		async (dispatch, getState) => {
			dispatch({ type: RegistrationActionTypes.GetKarvanRegister });
			try {
				const result = await API.get(
					`/OmrehLegacy/GetKarvanRegisterHistory?NationalCode=${getState().oidc.user.profile.nationalCode}&SanadNo=${SanadNo}`
				);

				if (result.status === 200) {
					dispatch({ type: RegistrationActionTypes.GetKarvanRegisterSuccess, data: result.data });
				} else {
					dispatch({ type: RegistrationActionTypes.GetKarvanRegisterFailed });
				}
			} catch (error) {
				dispatch({ type: RegistrationActionTypes.GetKarvanRegisterFailed });
			}
		},

	// stateConditionForSteptwo: (nationalCode?:any): AppAction<KnownAction> => async (
	//     dispatch,
	//     getState
	// ) => {

	//     dispatch({ type: RegistrationActionTypes.StateForStep });
	//     try {
	//         const result = await API.get(`/Umrah/IsLeaderByNationalCode?NationalCode=${getState().oidc.user.profile.nationalCode}`);
	//         console.log(result.data)
	//         if (result.status === 200) {
	//             dispatch({ type: RegistrationActionTypes.StateForStepSuccess, data: result.data });
	//         } else {
	//             dispatch({ type: RegistrationActionTypes.StateForStepFailed });
	//         }
	//     } catch (error) {
	//         dispatch({ type: RegistrationActionTypes.StateForStepFailed });
	//     }
	// },

	getConfirmationPassenger:
		(nationalCode: string, groupId: number): AppAction<KnownAction> =>
		async (dispatch, getState) => {
			dispatch({ type: RegistrationActionTypes.ConfirmationPassenger, loading: true, data: [] });
			try {
				const result = await API.get(
					`/Umrah/ConfirmationPassengerInGroup?NationalCode=${nationalCode}&PassengerGroupId=${groupId}`
				);
				dispatch({
					type: RegistrationActionTypes.ConfirmationPassenger,
					loading: false,
					data: result.status === 200 ? result.data.confirmationMessage : []
				});
			} catch (error) {
				registrationActions.showRequestErrors(error)(dispatch, getState);
				dispatch({ type: RegistrationActionTypes.ConfirmationPassenger, loading: true, data: [] });
			}
		},
	getConfirmationGroup:
		(onNext: any, groupId: number): AppAction<KnownAction> =>
		async (dispatch, getState) => {
			dispatch({ type: RegistrationActionTypes.ConfirmationGroup, loading: true, data: [] });
			try {
				const result = await API.post(`/Umrah/ConfirmationGroup`, { passengerGroupId: groupId });

				if (result.data.length === 0) {
					console.log(result.data);
					onNext();
				}
				dispatch({ type: RegistrationActionTypes.ConfirmationGroup, loading: false, data: result.data });
			} catch (error) {
				registrationActions.showRequestErrors(error)(dispatch, getState);
				dispatch({ type: RegistrationActionTypes.ConfirmationGroup, loading: false, data: [] });
			}
		},

	getAddressByPostalCode:
		(postalCode: number): AppAction<KnownAction> =>
		async (dispatch, getState) => {
			dispatch({ type: RegistrationActionTypes.GetAddressByPostalCode, loading: true, data: null });
			try {
				const result = await API.post(`/ServiceExternal/GetAddressbyPostalCode`, { postalCode });
				dispatch({ type: RegistrationActionTypes.GetAddressByPostalCode, loading: false, data: result.data });
			} catch (error) {
				registrationActions.showRequestErrors(error)(dispatch, getState);
				dispatch({ type: RegistrationActionTypes.GetAddressByPostalCode, loading: false, data: null });
			}
		},

	createGroup:
		(history: any, totalData: any): AppAction<KnownAction> =>
		async (dispatch, getState) => {
			dispatch({ type: RegistrationActionTypes.CreatePassengerGroup, loading: true });
			try {
				const result = await API.post('/Umrah/CreatePassengerGroup', totalData);
				dispatch({ type: RegistrationActionTypes.CreatePassengerGroup, loading: false });
				localStorage.setItem('passengerGroupId', result.data);
				registrationActions.pushAlert({
					title: 'ایجاد گروه با موفقیت انجام شد',
					description: '',
					variant: 'success'
				})(dispatch, getState);
				localStorage.setItem('omreGroupProvinceId', totalData.dispatchProvinceId);
				history('/OmreMofrade/select-group-passenger');
			} catch (error) {
				registrationActions.showRequestErrors(error)(dispatch, getState);
				dispatch({ type: RegistrationActionTypes.CreatePassengerGroup, loading: false });
			}
		},

	getPassengerGroupData: (): AppAction<KnownAction> => async (dispatch, getState) => {
		dispatch({ type: RegistrationActionTypes.GetPassengerGroup, loading: true, data: null });
		try {
			const result = await API.get(
				`/Umrah/GetPassengerGroupsByNationalCode?NationalCode=${getState().oidc.user.profile.nationalCode}`
			);
			dispatch({ type: RegistrationActionTypes.GetPassengerGroup, loading: false, data: result.data });
		} catch (error) {
			registrationActions.showRequestErrors(error)(dispatch, getState);
			dispatch({ type: RegistrationActionTypes.GetPassengerGroup, loading: false, data: null });
		}
	},

	UmrahPaymentHistory:
		(PassengerId: any): AppAction<KnownAction> =>
		async (dispatch, getState) => {
			dispatch({ type: RegistrationActionTypes.GetUmrahPaymentHistory, loading: true, data: null });
			try {
				const result = await API.get(`/OmrehLegacy/GetUmrahPaymentHistory?PassengerId=${PassengerId}`);
				dispatch({ type: RegistrationActionTypes.GetUmrahPaymentHistory, loading: false, data: result.data });
			} catch (error) {
				registrationActions.showRequestErrors(error)(dispatch, getState);
				dispatch({ type: RegistrationActionTypes.GetUmrahPaymentHistory, loading: false, data: null });
			}
		},

	addMemberInGroup:
		(finalData: any): AppAction<KnownAction> =>
		async (dispatch, getState) => {
			dispatch({ type: RegistrationActionTypes.CreatePassengerGroup, loading: true });
			try {
				const result = await API.post('/Umrah/AddMemberToGroup', finalData);
				dispatch({ type: RegistrationActionTypes.AddMemberToGroup, loading: false });
				registrationActions.pushAlert({
					title: 'شخص مورد نظر به گروه اضافه شد',
					description: '',
					variant: 'success'
				})(dispatch, getState);
				dispatch({ type: RegistrationActionTypes.GetPassengerGroup, loading: true, data: null });
				const resultGroup = await API.get(
					`/Umrah/GetPassengerGroupsByNationalCode?NationalCode=${getState().oidc.user.profile.nationalCode}`
				);
				dispatch({ type: RegistrationActionTypes.GetPassengerGroup, loading: false, data: resultGroup.data });
			} catch (error) {
				registrationActions.showRequestErrors(error)(dispatch, getState);
				dispatch({ type: RegistrationActionTypes.AddMemberToGroup, loading: false });
			}
		},
	DelMember:
		(history: any, totalData: any): AppAction<KnownAction> =>
		async (dispatch, getState) => {
			dispatch({ type: RegistrationActionTypes.DeleteMember, loading: true });
			try {
				const result = await API.post('/Umrah/DeleteMember', totalData);
				dispatch({ type: RegistrationActionTypes.DeleteMember, loading: false });
				localStorage.setItem('passengerGroupId', result.request);
				registrationActions.pushAlert({
					title: 'گر با موفقیت انجام شد',
					description: '',
					variant: 'success'
				})(dispatch, getState);
				// history('/OmreMofrade/select-group-passenger');
			} catch (error) {
				registrationActions.showRequestErrors(error)(dispatch, getState);
				dispatch({ type: RegistrationActionTypes.DeleteMember, loading: false });
			}
		},

	GetPassengerMemberIDBySSN:
		(nationalCode?: any): AppAction<KnownAction> =>
		async (dispatch, getState) => {
			dispatch({ type: RegistrationActionTypes.GetPrintDetailList });
			try {
				const result = await API.get(
					`/Umrah/GetPassengerMemberIDBySSN?NationalCode=${getState().oidc.user.profile.nationalCode}`
				);
				if (result.status === 200) {
					dispatch({ type: RegistrationActionTypes.GetPrintDetailListSuccess, data: result.data });
				} else {
					dispatch({ type: RegistrationActionTypes.GetPrintDetailListFailed });
				}
			} catch (error) {
				dispatch({ type: RegistrationActionTypes.GetPrintDetailListFailed });
			}
		},
	deleteMemberFromGroup:
		(passengerGroupID: number, passengerGroupMemberID: number): AppAction<KnownAction> =>
		async (dispatch, getState) => {
			dispatch({ type: RegistrationActionTypes.DeleteMemberGroup, loading: true });
			try {
				const result = await API.post('/Umrah/DeleteMember', { passengerGroupID, passengerGroupMemberID });
				registrationActions.pushAlert({
					title: 'شخص مورد نظر از گروه حذف شد',
					description: '',
					variant: 'success'
				})(dispatch, getState);
				dispatch({ type: RegistrationActionTypes.GetPassengerGroup, loading: true, data: null });
				const resultGroup = await API.get(
					`/Umrah/GetPassengerGroupsByNationalCode?NationalCode=${getState().oidc.user.profile.nationalCode}`
				);
				dispatch({ type: RegistrationActionTypes.GetPassengerGroup, loading: false, data: resultGroup.data });
			} catch (error) {
				registrationActions.showRequestErrors(error)(dispatch, getState);
				dispatch({ type: RegistrationActionTypes.DeleteMemberGroup, loading: false });
			}
		},

	getPassengerProfileData:
		(id: number, PassengerID: number, NationalCode: number): AppAction<KnownAction> =>
		async (dispatch, getState) => {
			dispatch({ type: RegistrationActionTypes.GetPassengerProfile, loading: true, data: null });

			let ApiUrl: string = `/Umrah/GetPassengerProfile?&NationalCode=${NationalCode}`;
			if (id && !PassengerID) {
				ApiUrl = `/Umrah/GetPassengerProfile?Id=${id}&NationalCode=${NationalCode}`;
			} else if (!id && PassengerID) {
				ApiUrl = `/Umrah/GetPassengerProfile?PassengerID=${PassengerID}&NationalCode=${NationalCode}`;
			} else if (id && PassengerID) {
				ApiUrl = `/Umrah/GetPassengerProfile?Id=${id}&PassengerID=${PassengerID}&NationalCode=${NationalCode}`;
			}

			try {
				const result = await API.get(ApiUrl);

				dispatch({ type: RegistrationActionTypes.GetPassengerProfile, loading: false, data: result.data });
			} catch (error) {
				dispatch({ type: RegistrationActionTypes.GetPassengerProfile, loading: false, data: null });
				registrationActions.showRequestErrors(error)(dispatch, getState);
			}
		},

	setSelectNewLeader:
		(data: any, handleClose: any): AppAction<KnownAction> =>
		async (dispatch, getState) => {
			dispatch({ type: RegistrationActionTypes.SelectNewLeader, loading: true });
			try {
				dispatch({ type: RegistrationActionTypes.SelectNewLeader, loading: false });
				const result = await API.patch(`/Umrah/UpDeleteGroupLeaderMember`, data);
				dispatch({ type: RegistrationActionTypes.GetPassengerGroup, loading: true, data: null });
				const resultGroup = await API.get(
					`/Umrah/GetPassengerGroupsByNationalCode?NationalCode=${getState().oidc.user.profile.nationalCode}`
				);
				dispatch({ type: RegistrationActionTypes.GetPassengerGroup, loading: false, data: resultGroup.data });
				handleClose();
			} catch (error) {
				handleClose();
				dispatch({ type: RegistrationActionTypes.SelectNewLeader, loading: false });
				registrationActions.showRequestErrors(error)(dispatch, getState);
			}
		},

	getBeginReserve:
		(finalData: any, history: any, closeModal: any): AppAction<KnownAction> =>
		async (dispatch, getState) => {
			dispatch({ type: RegistrationActionTypes.BeginReserve, loading: true });
			try {
				const result = await API.post('Umrah/CreateReserverGroup', finalData);
				if (!result.data) {
					dispatch({
						type: RegistrationActionTypes.BeginReserve,
						loading: false
					});
					history('/OmreMofrade/Print');
				} else {
					closeModal();
					registrationActions.pushAlert({
						title: 'کاربر گرامی',
						description: Array.isArray(result.data) ? result.data[0] : result.data,
						variant: 'warning'
					})(dispatch, getState);
					dispatch({
						type: RegistrationActionTypes.BeginReserve,
						loading: false
					});
				}
			} catch (error) {
				dispatch({ type: RegistrationActionTypes.BeginReserve, loading: false });
				closeModal();
				registrationActions.showRequestErrors(error)(dispatch, getState);
			}
		},

	GetSearchPackage:
		(
			PassengerGroupId: any,
			FlyportDestination: any,
			FlightDateFrom: string,
			FlightDateTo: string,
			MaximumRows: any,
			StartRowIndex: any,
			KargozarNo?: number,
			PriceFrom?: any,
			PriceTo?: any,
			Office?: any,
			Address?: any
		): AppAction<KnownAction> =>
		async (dispatch, getState) => {
			dispatch({ type: RegistrationActionTypes.GetPersonInfo });

			const baseurl = `/Umrah/GetKarevanList?PassengerGroupId=${PassengerGroupId}&FlyportDestination=${FlyportDestination}&FlightDateFrom=${FlightDateFrom}&FlightDateTo=${FlightDateTo}&NationalCode=${getState().oidc.user.profile.nationalCode}&MaximumRows=${MaximumRows}&StartRowIndex=${StartRowIndex}`;
			let url = baseurl;
			console.log(MaximumRows, StartRowIndex);
			try {
				switch (true) {
					case Boolean(KargozarNo):
						url += `&KargozarNo=${KargozarNo}`;
						break;
					case Boolean(PriceFrom):
						url += `&PriceFrom=${PriceFrom}`;
						break;
					case Boolean(PriceTo):
						url += `&PriceTo=${PriceTo}`;
						break;
					case Boolean(Office):
						url += `&Office=${Office}`;
						break;
					// case Boolean(MaximumRows):
					//     url += `&MaximumRows=${MaximumRows}`
					//     break;
					// case Boolean(StartRowIndex):
					//     url += `&StartRowIndex=${StartRowIndex}`
					//     break;
					case Boolean(Address):
						url += `&Address=${Address}`;
						break;
					default:
				}
				const result = await API.get(url);
				if (result.data.length === 0) {
					dispatch({
						type: RegistrationActionTypes.GetPersonInfoSuccess,
						data: result.data
					});
					registrationActions.pushAlert({
						title: 'کاروانی یافت نشد',
						description: '',
						variant: 'warning',
						dismissTime: 5000
					})(dispatch, getState);
				} else {
					dispatch({
						type: RegistrationActionTypes.GetPersonInfoSuccess,
						data: result.data
					});
				}
			} catch (error) {
				dispatch({ type: RegistrationActionTypes.GetPersonInfoFailed });
				registrationActions.showRequestErrors(error)(dispatch, getState);
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
				type: RegistrationActionTypes.PushAlert,
				alert
			});
		},

	clearAlerts: (): AppAction<KnownAction> => async (dispatch, getState) => {
		dispatch({ type: RegistrationActionTypes.ClearAlerts });
	},

	showRequestErrors:
		(error: any): AppAction<KnownAction> =>
		async (dispatch, getState) => {
			if (error.response && error.response.status) {
				if (error.response.status === 401) registrationActions.pushCommonAlert('401')(dispatch, getState);
				else if (error.response.status === 403) registrationActions.pushCommonAlert('403')(dispatch, getState);
				else if (error.response.status === 400 && error.response && error.response.data && error.response.data.length > 0) {
					let errors = '';
					for (var i = 0; i < error.response.data.length; i++) errors += (errors == '' ? '' : '\n') + error.response.data[i];
					registrationActions.pushAlert({
						title: 'information',
						description: errors,
						variant: 'danger'
					})(dispatch, getState);
				} else
					registrationActions.pushAlert({
						title: 'error',
						description: 'UnSuccessfulOperation',
						variant: 'danger'
					})(dispatch, getState);
			} else {
				registrationActions.pushAlert({
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
					registrationActions.pushAlert({
						title: 'information',
						description: 'SuccessfulOperation',
						variant: 'success'
					})(dispatch, getState);
					break;
				case '204':
					registrationActions.pushAlert({
						title: 'error',
						description: 'DataInNotFound',
						variant: 'warning'
					})(dispatch, getState);
					break;
				case '401':
					registrationActions.pushAlert({
						title: 'error',
						description: 'UnauthorizedError',
						variant: 'warning'
					})(dispatch, getState);
					break;
				case '403':
					registrationActions.pushAlert({
						title: 'error',
						description: 'ForbiddenError',
						variant: 'warning'
					})(dispatch, getState);
					break;
				case 'errorFetch':
					registrationActions.pushAlert({
						title: 'error',
						description: 'UnSuccessfetchData',
						variant: 'warning'
					})(dispatch, getState);
					break;
			}
		}
};
