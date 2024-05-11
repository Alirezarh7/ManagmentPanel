import { AppAction } from '../../../../store/state';
import { CallCompleteInformationActionTypes } from './actionType';
import { KnownAction } from './model';
import API from '../../../../components/general/baseURL';

export const callCompleteInformationActions = {
	setCrumbs:
		(crumbs: { title: string; link: string }[]): AppAction<KnownAction> =>
		async (dispatch, getState) => {
			dispatch({ type: CallCompleteInformationActionTypes.SetCrumbs, crumbs });
		},

	setToggleSearchModal:
		(visible: boolean): AppAction<KnownAction> =>
		(dispatch, getState) => {
			dispatch({
				type: CallCompleteInformationActionTypes.ToggleSearchModal,
				visible
			});
		},
	setToggleConfirmModal:
		(visible: boolean): AppAction<KnownAction> =>
		(dispatch, getState) => {
			dispatch({
				type: CallCompleteInformationActionTypes.ToggleConfirmModal,
				visible
			});
		},

	getProvinces: (): AppAction<KnownAction> => async (dispatch, getState) => {
		try {
			const result = await API.get('/Province/GetProvinceListByCountryId?CountryId=1');
			dispatch({ type: CallCompleteInformationActionTypes.ProvinceFetch });
			if (result.status === 200) {
				const provinces = result.data.map((res: any) => {
					return {
						...res,
						value: res.id,
						label: res.title
					};
				});

				dispatch({
					type: CallCompleteInformationActionTypes.ProvinceFetchSuccess,
					loading: false,
					data: provinces
				});
			}
		} catch (error) {
			dispatch({ type: CallCompleteInformationActionTypes.ProvinceFetchFailed });
			callCompleteInformationActions.showRequestErrors(error)(dispatch, getState);
		}
	},

	getCitiesByProvince:
		(provinceId: string): AppAction<KnownAction> =>
		async (dispatch, getState) => {
			try {
				const result = await API.get(`/City/GetCityListByProvinceId?ProvinceId=${provinceId}`);
				dispatch({ type: CallCompleteInformationActionTypes.CityFetch });
				if (result.status === 200) {
					const cities = result.data.map((res: any) => {
						return {
							...res,
							value: res.id,
							label: res.title
						};
					});

					dispatch({
						type: CallCompleteInformationActionTypes.CityFetchSuccess,
						data: cities
					});
				}
			} catch (error) {
				dispatch({ type: CallCompleteInformationActionTypes.CityFetchFailed });
				callCompleteInformationActions.showRequestErrors(error)(dispatch, getState);
			}
		},

	// to load zaer information in create mode and in search with ZareNumber and BranchCode ** ** ** **
	getDocumentListByNationalCode:
		(zaerNumber: number, branchCode: number, navigate: any): AppAction<KnownAction> =>
		async (dispatch, getState) => {
			dispatch({ type: CallCompleteInformationActionTypes.HajDocumentsFetch });
			try {
				const result = await API.get(
					`/Legacy/GetSanad?NationalCode=${getState().oidc.user.profile.nationalCode}&ZareNumber=${zaerNumber}&BranchCode=${branchCode}`
				);
				if (result.data.errorCode === 0) {
					dispatch({
						type: CallCompleteInformationActionTypes.HajDocumentsFetchSuccess,
						data: result.data,
						errorCode: result.data.errorCode
					});
					localStorage.setItem(
						'moreSanadData',
						JSON.stringify({
							enableReligion: result.data.sanadResult.enableReligion,
							enableProvinceDispatchEdit: result.data.sanadResult.enableProvinceDispatchEdit,
							enableCityDispatchEdit: result.data.sanadResult.enableCityDispatchEdit,
							isRequiredFileUpload: false,
							birthPlace: result.data.sanadResult.birthPlace.trim(),
							tel: result.data.sanadResult.tel,
							zaerNumber: result.data.sanadResult.zaerNumber,
							cellPhone: result.data.sanadResult.cellPhone,
							idNumber: result.data.sanadResult.idNumber.trim()
						})
					);
					navigate && navigate('/tamato/save-or-update', { state: { zaerNumber } });
				} else {
					callCompleteInformationActions.pushAlert({
						title: result.data.errorMessage,
						variant: 'warning',
						dismissTime: 9000,
						description: ''
					})(dispatch, getState);

					dispatch({
						type: CallCompleteInformationActionTypes.HajDocumentsFetchSuccess,
						data: null,
						errorCode: null
					});
				}
			} catch (error) {
				dispatch({ type: CallCompleteInformationActionTypes.HajDocumentsFetchFailed });
				callCompleteInformationActions.showRequestErrors(error)(dispatch, getState);
			}
		},

	// to load zaer information in create mode and in search with ZareNumber and BranchCode ** ** ** **
	getDocumentListByNationalCodeSearchModal:
		(zaerNumber: string, branchCode: string, navigate: any): AppAction<KnownAction> =>
		async (dispatch, getState) => {
			dispatch({ type: CallCompleteInformationActionTypes.HajDocumentsFetch });
			try {
				const result = await API.get(
					`/Legacy/GetSanad?NationalCode=${getState().oidc.user.profile.nationalCode}&ZareNumber=${zaerNumber}&BranchCode=${branchCode}`
				);
				if (result.data.errorCode === 0) {
					dispatch({
						type: CallCompleteInformationActionTypes.HajDocumentsFetchSuccess,
						data: result.data,
						errorCode: result.data.errorCode
					});
					dispatch({
						type: CallCompleteInformationActionTypes.ToggleSearchModal,
						visible: false
					});
					/*  dispatch({
                      type: CallCompleteInformationActionTypes.ToggleConfirmModal,
                      visible: true
                  })*/
					callCompleteInformationActions.pushAlert({
						title: 'سند حج تمتع با مشخصات وارد شده یافت شد',
						variant: 'success',
						dismissTime: 4000,
						description: ''
					})(dispatch, getState);

					localStorage.setItem(
						'moreSanadData',
						JSON.stringify({
							enableReligion: result.data.sanadResult.enableReligion,
							enableProvinceDispatchEdit: result.data.sanadResult.enableProvinceDispatchEdit,
							enableCityDispatchEdit: result.data.sanadResult.enableCityDispatchEdit,
							isRequiredFileUpload: false,
							birthPlace: result.data.sanadResult.birthPlace.trim(),
							tel: result.data.sanadResult.tel,
							zaerNumber: result.data.sanadResult.zaerNumber,
							cellPhone: result.data.sanadResult.cellPhone,
							idNumber: result.data.sanadResult.idNumber.trim()
						})
					);
					navigate && navigate('/tamato/save-or-update', { state: { zaerNumber } });
				} else {
					callCompleteInformationActions.pushAlert({
						title: result.data.errorMessage,
						variant: 'warning',
						dismissTime: 4000,
						description: ''
					})(dispatch, getState);

					dispatch({ type: CallCompleteInformationActionTypes.HajDocumentsFetchFailed });
					dispatch({
						type: CallCompleteInformationActionTypes.ToggleSearchModal,
						visible: false
					});
				}
			} catch (error) {
				dispatch({ type: CallCompleteInformationActionTypes.HajDocumentsFetchFailed });
				callCompleteInformationActions.showRequestErrors(error)(dispatch, getState);
			}
		},

	// to load zaer information in edit mode ** ** ** **
	getDocumentFromFarakhan:
		(codeTracking: number, zaernumber: number, navigate?: any): AppAction<KnownAction> =>
		async (dispatch, getState) => {
			dispatch({ type: CallCompleteInformationActionTypes.HajDocumentsFromFarakhanFetch });
			try {
				const result = await API.get(
					`/Legacy/GetSanadFromFarakhan?NationalCode=${getState().oidc.user.profile.nationalCode}&codeTracking=${codeTracking}`
				);
				if (result.data.errorCode === 0) {
					dispatch({
						type: CallCompleteInformationActionTypes.HajDocumentsFromFarakhanFetchSuccess,
						data: result.data,
						errorCode: result.data.errorCode
					});

					localStorage.setItem(
						'moreSanadData',
						JSON.stringify({
							enableReligion: result.data.sanadfarakhan.enableReligion,
							enableProvinceDispatchEdit: result.data.sanadfarakhan.enableProvinceDispatchEdit,
							enableCityDispatchEdit: result.data.sanadfarakhan.enableCityDispatchEdit,
							isRequiredFileUpload: result.data.sanadfarakhan.isRequiredUpload,
							birthPlace: result.data.sanadfarakhan.birthPlace,
							tel: result.data.sanadfarakhan.tel,
							zaerNumber: result.data.sanadfarakhan.zaerNo,
							cellPhone: result.data.sanadfarakhan.cell,
							idNumber: result.data.sanadfarakhan.idNo
						})
					);

					// set condition for edit file upload
					localStorage.setItem('tamatoeStep', '0');
					const setStepsData = {
						mainInformation: {
							birthPlaceProvince: result.data.sanadfarakhan.provinceBirthPlace,
							birthPlaceCity: result.data.sanadfarakhan.birthPlaceName,
							provinceDispatchId: result.data.sanadfarakhan.provinceDispatchId,
							cityDispatchId: result.data.sanadfarakhan.cityDispatchId,
							provinceAddressId: result.data.sanadfarakhan.provinceAddressId,
							cityAddressId: result.data.sanadfarakhan.cityAddressId,
							religion: result.data.sanadfarakhan.religion,
							hajRecord: result.data.sanadfarakhan.hajRecord,
							suniBranch: result.data.sanadfarakhan.suniBranch,
							lastHajDate: result.data.sanadfarakhan.lastHajDate,
							nationalCartData: result.data.sanadfarakhan.nationalCartData,
							educationID: result.data.sanadfarakhan.educationID,
							jobID: result.data.sanadfarakhan.jobID
						},
						completionInformation: {
							workAddress: result.data.sanadfarakhan.workAddress,
							telCode: result.data.sanadfarakhan.telCode,
							trustedMobile1: result.data.sanadfarakhan.trustedMobile1,
							sibling1: result.data.sanadfarakhan.sibling1,
							trustedMobile2: result.data.sanadfarakhan.trustedMobile2,
							melliBankAccountNo: result.data.sanadfarakhan.melliBankAccountNo,
							sibling2: result.data.sanadfarakhan.sibling2,
							languageSkill: result.data.sanadfarakhan.languageSkill,
							languageLevel: result.data.sanadfarakhan.languageLevel,
							wantToVisitHajjTamattu: result.data.sanadfarakhan.wantToVisitHajjTamattu,
							dialect: result.data.sanadfarakhan.dialect,
							shebaAccountNo: result.data.sanadfarakhan.shebaAccountNo
						}
					};
					localStorage.setItem('stepsData', JSON.stringify(setStepsData));
					navigate && navigate('/tamato/save-or-update', { state: { edit: true, zaernumber } });
				} else {
					callCompleteInformationActions.pushAlert({
						title: result.data.errorMessage,
						variant: 'warning',
						dismissTime: 9000,
						description: ''
					})(dispatch, getState);

					dispatch({
						type: CallCompleteInformationActionTypes.HajDocumentsFromFarakhanFetchSuccess,
						data: null,
						errorCode: null
					});
				}
			} catch (error) {
				dispatch({ type: CallCompleteInformationActionTypes.HajDocumentsFromFarakhanFetchFailed });
				callCompleteInformationActions.showRequestErrors(error)(dispatch, getState);
			}
		},

	//  to load a list of zaer requests ** ** ** **
	getDocumentsFromBank: (): AppAction<KnownAction> => async (dispatch, getState) => {
		dispatch({ type: CallCompleteInformationActionTypes.HajDocumentsFromBankFetch });
		try {
			const result = await API.get(`/Legacy/GetListSanadFromBank?NationalCode=${getState().oidc.user.profile.nationalCode}`);
			dispatch({
				type: CallCompleteInformationActionTypes.HajDocumentsFromBankFetchSuccess,
				data: result.data,
				errorCode: result.data.errorCode
			});
		} catch (error) {
			dispatch({ type: CallCompleteInformationActionTypes.HajDocumentsFromBankFetchFailed });
			callCompleteInformationActions.showRequestErrors(error)(dispatch, getState);
		}
	},

	clearHajDocument: (): AppAction<KnownAction> => async (dispatch, getState) => {
		await dispatch({ type: CallCompleteInformationActionTypes.ClearHajDocument });
	},

	clearHajFromFarakhanDocument: (): AppAction<KnownAction> => async (dispatch, getState) => {
		await dispatch({ type: CallCompleteInformationActionTypes.ClearHajDocumentFromFarakhan });
	},

	clearDocumentFromBank: (): AppAction<KnownAction> => async (dispatch, getState) => {
		await dispatch({ type: CallCompleteInformationActionTypes.ClearHajDocumentFromBank });
	},

	setCreateInformation:
		(data: any, history: any): AppAction<KnownAction> =>
		async (dispatch, getState) => {
			dispatch({ type: CallCompleteInformationActionTypes.CreateInformation });
			const getMoreSanadData = JSON.parse(localStorage.getItem('moreSanadData') as string);
			try {
				const profile = getState().oidc.user.profile;
				const convertToValidData = {
					...data.completionInformation,
					...data.mainInformation,
					provinceAddressId: data.mainInformation.provinceAddressId.value,
					cityAddressId: data.mainInformation.cityAddressId.value,
					provinceDispatchId: data.mainInformation.provinceDispatchId.value,
					cityDispatchId: data.mainInformation.cityDispatchId.value,
					religion: data.mainInformation.religion.value,
					suniBranch: data.mainInformation.suniBranch ? data.mainInformation.suniBranch.value : undefined,
					hajRecord: data.mainInformation.hajRecord ? data.mainInformation.hajRecord.value : '0',
					educationID: data.mainInformation.educationID.value,
					jobID: data.mainInformation.jobID.value,
					sibling1: data.completionInformation.sibling1.value,
					sibling2: data.completionInformation.sibling2.value,
					languageSkill: data.completionInformation.languageSkill.value,
					languageLevel: data.completionInformation.languageLevel.value,
					dialect: data.completionInformation.dialect.value,
					name: profile.firstName,
					family: profile.lastName,
					sex: profile.gender === 'مرد' ? 1 : 2,
					sSN: profile.nationalCode,
					address: profile.address,
					fatherName: profile.fatherName,
					postalCode: profile.postalCode,
					birthDate: profile.birthDate,
					zaerNo: getMoreSanadData.zaerNumber,
					tel: getMoreSanadData.tel.trim(),
					cell: getMoreSanadData.cellPhone,
					birthPlace: data.mainInformation.birthPlaceCity ? String(data.mainInformation.birthPlaceCity.value) : '',
					idNo: getMoreSanadData.idNumber
				};
				delete convertToValidData.birthPlaceProvince;
				delete convertToValidData.birthPlaceCity;
				const result = await API.post('/Legacy/InsertUpdatePassengerPreReg', convertToValidData);

				if (result.data.errorCode !== 0) {
					return dispatch({
						type: CallCompleteInformationActionTypes.CreateInformationSuccess,
						errorMessage: result.data.errorMessage,
						axiosError: null
					});
				} else if (result.status === 200 && result.data.errorCode === 0) {
					dispatch({
						type: CallCompleteInformationActionTypes.CreateInformationSuccess,
						errorMessage: '',
						axiosError: null
					});
					localStorage.removeItem('stepsData');
					localStorage.removeItem('moreSanadData');
					history('/tamato/my-documents');
					sessionStorage.removeItem('changedStep');
					localStorage.setItem('tamatoeStep', JSON.stringify(0));
				}
			} catch (error) {
				dispatch({
					type: CallCompleteInformationActionTypes.CreateInformationFailed,
					axiosError: error
				});
				callCompleteInformationActions.showRequestErrors(error)(dispatch, getState);
				/*  localStorage.removeItem('stepsData');
            localStorage.removeItem('moreSanadData');
            sessionStorage.removeItem('changedStep');
            localStorage.setItem('tamatoeStep', JSON.stringify(0));
            history('/tamato/my-documents');*/
			}
		},

	getResidenceCitiesByProvince:
		(provinceId: string): AppAction<KnownAction> =>
		async (dispatch, getState) => {
			try {
				const result = await API.get(`/City/GetCityListByProvinceId?ProvinceId=${provinceId}`);
				dispatch({ type: CallCompleteInformationActionTypes.ResidenceCityFetch });
				if (result.status === 200) {
					const cities = result.data.map((res: any) => {
						return {
							...res,
							value: res.id,
							label: res.title
						};
					});

					dispatch({
						type: CallCompleteInformationActionTypes.ResidenceCityFetchSuccess,
						data: cities
					});
				}
			} catch (error) {
				dispatch({ type: CallCompleteInformationActionTypes.ResidenceCityFetchFailed });
				callCompleteInformationActions.showRequestErrors(error)(dispatch, getState);
			}
		},

	getCityPlaceOfDispatchCitiesByProvince:
		(provinceId: string): AppAction<KnownAction> =>
		async (dispatch, getState) => {
			try {
				const result = await API.get(`/City/GetCityListByProvinceId?ProvinceId=${provinceId}`);
				dispatch({ type: CallCompleteInformationActionTypes.CityOfThePlaceOfDispatchFetch });
				if (result.status === 200) {
					const cities = result.data.map((res: any) => {
						return {
							...res,
							value: res.id,
							label: res.title
						};
					});

					dispatch({
						type: CallCompleteInformationActionTypes.CityOfThePlaceOfDispatchFetchSuccess,
						data: cities
					});
				}
			} catch (error) {
				dispatch({ type: CallCompleteInformationActionTypes.CityOfThePlaceOfDispatchFetchFailed });
				callCompleteInformationActions.showRequestErrors(error)(dispatch, getState);
			}
		},

	cancelReserve:
		(data: any, history?: any): AppAction<KnownAction> =>
		async (dispatch, getState) => {
			dispatch({ type: CallCompleteInformationActionTypes.CancelReserve });
			try {
				const result = await API.post('/Legacy/CancelReserveZaer', data);
				if (result.status === 201) {
					if (result.data.errorCode === 0) {
						dispatch({ type: CallCompleteInformationActionTypes.CancelReserveSuccess });
						callCompleteInformationActions.pushAlert({
							title: 'انصراف رزرو با موفقیت انجام شد',
							description: '',
							variant: 'success',
							dismissTime: 2000
						})(dispatch, getState);
						// callCompleteInformationActions.getDocumentsFromBank();
						localStorage.removeItem('print');
						window.location.reload();
					} else {
						callCompleteInformationActions.pushAlert({
							title: result.data.errorMessage,
							description: '',
							variant: 'warning',
							dismissTime: 2000
						})(dispatch, getState);
					}
				}
			} catch (error) {
				dispatch({ type: CallCompleteInformationActionTypes.CancelReserveFailed });
				callCompleteInformationActions.showRequestErrors(error)(dispatch, getState);
			}
		},

	setUploadDocuments:
		(data: any, onNext?: any): AppAction<KnownAction> =>
		async (dispatch, getState) => {
			dispatch({ type: CallCompleteInformationActionTypes.UploadDocuments });
			try {
				const result = await API.post('/Legacy/CreatePassengerAttachments', data, {
					headers: { 'Content-Type': 'multipart/form-data' }
				});
				onNext && onNext();
				callCompleteInformationActions.pushAlert({
					title: 'بارگزاری مدارک با موفقیت انجام شد',
					variant: 'success',
					description: ''
				});
				dispatch({ type: CallCompleteInformationActionTypes.UploadDocumentsSuccess });
			} catch (error) {
				dispatch({ type: CallCompleteInformationActionTypes.UploadDocumentsFailed });
				callCompleteInformationActions.showRequestErrors(error)(dispatch, getState);
			}
		},

	getUploadDocuments:
		(zaernumber: any): AppAction<KnownAction> =>
		async (dispatch, getState) => {
			dispatch({ type: CallCompleteInformationActionTypes.PreviewDocuments });
			try {
				const result = await API.get(`/Legacy/GetPassengerAttachments?Zaernumber=${zaernumber}`);
				dispatch({
					type: CallCompleteInformationActionTypes.PreviewDocumentsSuccess,
					files: result.data.attachmentResults
				});
			} catch (error) {
				dispatch({ type: CallCompleteInformationActionTypes.PreviewDocumentsFailed });
				callCompleteInformationActions.showRequestErrors(error)(dispatch, getState);
			}
		},

	updateDocuments:
		(data: any): AppAction<KnownAction> =>
		async (dispatch, getState) => {
			try {
				const result = await API.post('/Legacy/UpdatePassengerAttachment', data, {
					headers: { 'Content-Type': 'multipart/form-data' }
				});
				dispatch({ type: CallCompleteInformationActionTypes.UploadDocumentsSuccess });
			} catch (error) {
				dispatch({ type: CallCompleteInformationActionTypes.UploadDocumentsFailed });
				callCompleteInformationActions.showRequestErrors(error)(dispatch, getState);
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
				type: CallCompleteInformationActionTypes.PushAlert,
				alert
			});
		},
	clearAlerts: (): AppAction<KnownAction> => async (dispatch, getState) => {
		dispatch({ type: CallCompleteInformationActionTypes.ClearAlerts });
	},
	showRequestErrors:
		(error: any): AppAction<KnownAction> =>
		async (dispatch, getState) => {
			if (error.response && error.response.status) {
				if (error.response.status == 401) callCompleteInformationActions.pushCommonAlert('401')(dispatch, getState);
				else if (error.response.status == 403) callCompleteInformationActions.pushCommonAlert('403')(dispatch, getState);
				else if (error.response.status == 400 && error.response && error.response.data && error.response.data.length > 0) {
					let errors = '';
					for (var i = 0; i < error.response.data.length; i++) errors += (errors == '' ? '' : '\n') + error.response.data[i];
					callCompleteInformationActions.pushAlert({
						title: 'information',
						description: errors,
						variant: 'danger'
					})(dispatch, getState);
				} else
					callCompleteInformationActions.pushAlert({
						title: 'error',
						description: 'UnSuccessfulOperation',
						variant: 'danger'
					})(dispatch, getState);
			} else {
				callCompleteInformationActions.pushAlert({
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
					callCompleteInformationActions.pushAlert({
						title: 'information',
						description: 'SuccessfulOperation',
						variant: 'success'
					})(dispatch, getState);
					break;
				case '204':
					callCompleteInformationActions.pushAlert({
						title: 'error',
						description: 'DataInNotFound',
						variant: 'warning'
					})(dispatch, getState);
					break;
				case '401':
					callCompleteInformationActions.pushAlert({
						title: 'error',
						description: 'UnauthorizedError',
						variant: 'warning'
					})(dispatch, getState);
					break;
				case '403':
					callCompleteInformationActions.pushAlert({
						title: 'error',
						description: 'ForbiddenError',
						variant: 'warning'
					})(dispatch, getState);
					break;
				case 'errorFetch':
					callCompleteInformationActions.pushAlert({
						title: 'error',
						description: 'UnSuccessfetchData',
						variant: 'warning'
					})(dispatch, getState);
					break;
			}
		},

	closeAllModal: (): AppAction<KnownAction> => async (dispatch, getState) => {
		dispatch({
			type: CallCompleteInformationActionTypes.CityCreateModal,
			Visible: false
		});
		dispatch({
			type: CallCompleteInformationActionTypes.CityUpdateModal,
			item: {},
			Visible: false
		});
	}
};
