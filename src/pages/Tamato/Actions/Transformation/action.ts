import { AppAction } from "../../../../store/state";
import { TransformationActionTypes } from "./actionType";
import { KnownAction } from "./model";
import API from "../../../../components/general/baseURL";
// import { ISendDate } from "../../../GeneralComponents/Calendar/Jalali/DatePicker/DatePicker";

export const transformationActions = {

  setCrumbs: (crumbs: { title: string, link: string }[]): AppAction<KnownAction> => async (dispatch, getState) => {
    dispatch({ type: TransformationActionTypes.SetCrumbs, crumbs });
  },

  //GET way for have permission to continue
  getTransformation: (): AppAction<KnownAction> => async (
    dispatch,
    getState
  ) => {
    dispatch({ type: TransformationActionTypes.TransformationFetch });
    try {
      const result = await API.get(`/Legacy/GetListSanadFromBank?NationalCode=${getState().oidc.user.profile.nationalCode}`);
      if (result.status === 200) {
        dispatch({ type: TransformationActionTypes.TransformationFetchSuccess, data: result.data });
        // if (result.data.length > 0) {
        //   transformationActions.pushAlert({
        //     title: 'شما سند ثبت شده دارید',
        //     description: '',
        //     variant: 'info',
        //     dismissTime: 2000,
        //   })(dispatch, getState);
        // }
      } else {
        dispatch({ type: TransformationActionTypes.TransformationFetchFailed });
        transformationActions.showRequestErrors(result)(dispatch, getState);
      }
    } catch (error) {
      dispatch({ type: TransformationActionTypes.TransformationFetchFailed });
      transformationActions.showRequestErrors(error)(dispatch, getState);
    }
  },
  //GET office 
  getTransformationOffice: ( address?: string, branchCode?: string, provinceId?: string,): AppAction<KnownAction> => async (
    dispatch,
    getState
  ) => {
    dispatch({ type: TransformationActionTypes.TransformationOfficeCreate });
   
    const baseurl = `Legacy/GetListKargozarOffice?ProvinceID=${getState().oidc.user.profile.provinceId}`;
    let url = baseurl;
    //192.168.2.65:8089/api/Legacy/GetListKargozarOffice?ProvinceID=17&KargozarNumber=156563&Address=5624
    try {
      console.log(address,branchCode)
      switch (true) {
        case Boolean(branchCode):
          return url += `&KargozarNumber=${branchCode}`;
        case Boolean(address):
          return url += `&Address=${address}`;
        case Boolean(address&&branchCode):
          return url += `&KargozarNumber=${branchCode}&Address=${address}`
        default:
          break;
      }
      const result = await API.get(url);

      if (result.status === 200) {
        dispatch({ type: TransformationActionTypes.TransformationOfficeSucces, data: result.data });
      } else {
        dispatch({ type: TransformationActionTypes.TransformationOfficeFaild });
        transformationActions.showRequestErrors(result)(dispatch, getState);
      }
    } catch (error) {
      dispatch({ type: TransformationActionTypes.TransformationOfficeFaild });
      transformationActions.showRequestErrors(error)(dispatch, getState);
    }
  },
  //POST office data
  PostofficeData: (data: { storedData: any | null }): AppAction<KnownAction> => async (
    dispatch,
    getState
  ) => {
    dispatch({ type: TransformationActionTypes.TransformationPostOffice, loading: true });
    try {
      const result = await API.post(
        "/Legacy/CreateShiftSanadSalesManager",
        data
      );
      if (result.status == 200) {
        if (result.data.errorCode == 100) {
          dispatch({ type: TransformationActionTypes.TransformationPostOfficeSucces });
          transformationActions.pushAlert({
            title: result.data.errorMessage,
            description: '',
            variant: 'success',
            dismissTime: 2000
          })(dispatch, getState);
        } else {
          transformationActions.pushAlert({
            title: result.data.errorMessage,
            description: '',
            variant: 'warning',
            dismissTime: 2000
          })(dispatch, getState);
        }
      }
    } catch (error) {
      dispatch({ type: TransformationActionTypes.TransformationPostOffice, loading: false });
      transformationActions.showRequestErrors(error)(dispatch, getState);
    }
  },

  //1POST Infotmation data for sells
  PostInformation: (data: { mergedData: any }): AppAction<KnownAction> => async (
    dispatch,
    getState
  ) => {
    dispatch({ type: TransformationActionTypes.TransformationPostInfo, loading: true });
    try {
      const result = await API.post(
        "/Legacy/CreateShiftSanadSalesManager",
        data
      );
      if (result.status == 201) {
        dispatch({ type: TransformationActionTypes.TransformationPostInfoSucces });
        transformationActions.pushCommonAlert('201')(dispatch, getState);
      }
    } catch (error) {
      dispatch({ type: TransformationActionTypes.TransformationPostInfo, loading: false });
      transformationActions.showRequestErrors(error)(dispatch, getState);
    }
  },
  //2GET Sanad for Sells
  GetSanadForSale: (
    fromDate?: string,
    toDate?: string,
    sandNo?: string,
    branchCode?: string,
    nationalCode?: string,
    provinceId?: string,
  ): AppAction<KnownAction> => async (
    dispatch,
    getState
  ) => {
      dispatch({ type: TransformationActionTypes.TransformationSanadForSale });

      const baseurl = `/Legacy/GetSanadsForSale?ProvinceId=${getState().oidc.user.profile.provinceId}&NationalCodeFollow=${getState().oidc.user.profile.nationalCode}`;

      let url = baseurl;

      try {
        switch (true) {
          case Boolean(fromDate && toDate):
            url += `&FromDate=${fromDate}&ToDate=${toDate}`;
            break;
          case Boolean(branchCode):
            url += `&BranchCode=${branchCode}`;
            break;
          case Boolean(sandNo):
            url += `&SanadNo=${sandNo}`;
            break;
          case Boolean(sandNo && branchCode):
            url += `&SanadNo=${sandNo}&BranchCode=${branchCode}`;
            break;
          case Boolean(fromDate && toDate && sandNo && branchCode):
            url += `&FromDate=${fromDate}&ToDate=${toDate}&SanadNo=${sandNo}&BranchCode=${branchCode}`;
            break;
          default:
            break;
        }

        const result = await API.get(url);

        if (result.status === 200) {
          dispatch({ type: TransformationActionTypes.TransformationSanadForSaleSucces, data: result.data });
        } else {
          dispatch({ type: TransformationActionTypes.TransformationSanadForSaleFaild });
          transformationActions.showRequestErrors(result)(dispatch, getState);
        }
      } catch (error) {
        dispatch({ type: TransformationActionTypes.TransformationSanadForSaleFaild });
        transformationActions.showRequestErrors(error)(dispatch, getState);
      }
    },

  //3POST Saland Sells Manager
  PostSellsData: (data: { mergedData: any }): AppAction<KnownAction> => async (
    dispatch,
    getState
  ) => {
    dispatch({ type: TransformationActionTypes.TransformationSellsManager, loading: true });
    try {
      const result = await API.post(
        "/Legacy/CreateShiftSanadSalesManager",
        data
      );
      if (result.status == 201) {
        dispatch({ type: TransformationActionTypes.TransformationSellsManagerSucces });
        transformationActions.pushCommonAlert('201')(dispatch, getState);
      }
    } catch (error) {
      dispatch({ type: TransformationActionTypes.TransformationSellsManager, loading: false });
      transformationActions.showRequestErrors(error)(dispatch, getState);
    }
  },
  //////////////////////////////////////////////////////////////////////////////////////////////////
  //5GET List RequestInformation
  GetRequestList: (status: string, nationalCode?: string): AppAction<KnownAction> => async (
    dispatch,
    getState
  ) => {
    dispatch({ type: TransformationActionTypes.TransformationRequest });
    try {
      const result = await API.get(`/Legacy/GetListRequestInformation?NationalCode=${getState().oidc.user.profile.nationalCode}&ExchangeStatus=${status}`);
      if (result.status === 200) {
        dispatch({ type: TransformationActionTypes.TransformationRequestSucces, data: result.data });
      } else {
        dispatch({ type: TransformationActionTypes.TransformationRequestFaild });
        transformationActions.showRequestErrors(result)(dispatch, getState);
      }
    } catch (error) {
      dispatch({ type: TransformationActionTypes.TransformationRequestFaild });
      transformationActions.showRequestErrors(error)(dispatch, getState);
    }
  },
  //6POST CancelRequestShiftSanad
  PostCancelRequest: (data: any): AppAction<KnownAction> => async (
    dispatch,
    getState
  ) => {
    dispatch({ type: TransformationActionTypes.CancelRequestShiftSanad, loading: true });
    try {
      const result = await API.post(
        "/Legacy/CancelRequestShiftSanad",
        data
      );
      if (result.status == 201) {
        if (result.data.errorCode == 100) {
          dispatch({ type: TransformationActionTypes.CancelRequestShiftSanadSucces });
          transformationActions.pushAlert({
            title: result.data.errorMessage,
            description: '',
            variant: 'success',
            dismissTime: 2000
          })(dispatch, getState);
        } else {
          transformationActions.pushAlert({
            title: result.data.errorMessage,
            description: '',
            variant: 'warning',
            dismissTime: 2000
          })(dispatch, getState);
        }
      }
    } catch (error) {
      dispatch({ type: TransformationActionTypes.CancelRequestShiftSanad, loading: false });
      transformationActions.showRequestErrors(error)(dispatch, getState);
    }
  },
  //7PostCreateRequestReceivedSalesSanad
  PostCreateRequestReceivedSalesSanad: (data: any): AppAction<KnownAction> => async (
    dispatch,
    getState
  ) => {
    dispatch({ type: TransformationActionTypes.CreateRequestReceivedSalesSanad, loading: true });
    try {
      const result = await API.post(
        "/Legacy/CreateRequestReceivedSalesSanad",
        data
      );
      if (result.status == 201) {
        if (result.data.errorCode == 100) {
          dispatch({ type: TransformationActionTypes.CreateRequestReceivedSalesSanadSucces });
          transformationActions.pushAlert({
            title: result.data.errorMessage,
            description: '',
            variant: 'success',
            dismissTime: 5000
          })(dispatch, getState);
        } else {
          transformationActions.pushAlert({
            title: result.data.errorMessage,
            description: '',
            variant: 'warning',
            dismissTime: 5000
          })(dispatch, getState);
        }
      }
    } catch (error) {
      dispatch({ type: TransformationActionTypes.CreateRequestReceivedSalesSanad, loading: false });
      transformationActions.showRequestErrors(error)(dispatch, getState);
    }
  },
  //8PostCreateRequestReceivedSalesSanad
  CreateRequestReceivedSalesSanad: (data: any): AppAction<KnownAction> => async (
    dispatch,
    getState
  ) => {
    dispatch({ type: TransformationActionTypes.CreateRequestReceivedSalesSanad, loading: true });
    try {
      const result = await API.post(
        "/Legacy/CreateRequestReceivedSalesSanad",
        data
      );
      if (result.status == 201) {
        dispatch({ type: TransformationActionTypes.CreateRequestReceivedSalesSanadSucces });
        transformationActions.pushCommonAlert('201')(dispatch, getState);
      }
    } catch (error) {
      dispatch({ type: TransformationActionTypes.CreateRequestReceivedSalesSanad, loading: false });
      transformationActions.showRequestErrors(error)(dispatch, getState);
    }
  },
  //9PostCreateRequestReceivedSalesSanad
  RejectReceivedSalesSanad: (data: any): AppAction<KnownAction> => async (
    dispatch,
    getState
  ) => {
    dispatch({ type: TransformationActionTypes.RejectReceivedSalesSanad, loading: true });
    try {
      const result = await API.post(
        "/Legacy/RejectRequestByBuyer",
        data
      );
      if (result.status == 201) {
        if (result.data.errorCode == 100) {
          dispatch({ type: TransformationActionTypes.RejectReceivedSalesSanadSucces });
          transformationActions.pushAlert({
            title: result.data.errorMessage,
            description: '',
            variant: 'success',
            dismissTime: 5000
          })(dispatch, getState);
        } else {
          transformationActions.pushAlert({
            title: result.data.errorMessage,
            description: '',
            variant: 'warning',
            dismissTime: 5000
          })(dispatch, getState);
        }
      }
    } catch (error) {
      dispatch({ type: TransformationActionTypes.RejectReceivedSalesSanad, loading: false });
      transformationActions.showRequestErrors(error)(dispatch, getState);
    }
  },
  //10GetProfilePersonShiftSanad
  GetProfilePersonShiftSanad: (): AppAction<KnownAction> => async (
    dispatch,
    getState
  ) => {
    dispatch({ type: TransformationActionTypes.GetProfilePersonShiftSanad });
    try {
      const result = await API.get(`/Legacy/GetProfilePersonShiftSanad?NationalCode=${getState().oidc.user.profile.nationalCode}`);
      if (result.status === 200) {
        dispatch({ type: TransformationActionTypes.GetProfilePersonShiftSanadSucces, data: result.data });
      } else {
        dispatch({ type: TransformationActionTypes.GetProfilePersonShiftSanadFaild });

      }
    } catch (error) {
      dispatch({ type: TransformationActionTypes.GetProfilePersonShiftSanadFaild });
    }
  },
  //11GetCityProfile
  GetCityProfile: (provinceId: string): AppAction<KnownAction> => async (
    dispatch,
    getState
  ) => {
    dispatch({ type: TransformationActionTypes.GetCityProfile });
    try {
      const result = await API.get(`/City/GetCityListByProvinceId?ProvinceId=${provinceId}`);
      dispatch({ type: TransformationActionTypes.GetCityProfileSuccess, data: result.data });
      if (result.status === 200) {
        const cities = result.data.map((res: any) => {
          return {
            label: res.title
          }
        })
        dispatch({
          type: TransformationActionTypes.GetCityProfileSuccess,
          data: cities
        })
      } else {
        dispatch({ type: TransformationActionTypes.GetCityProfileFailed });

      }
    } catch (error) {
      dispatch({ type: TransformationActionTypes.GetCityProfileFailed });
    }
  },








  pushAlert: (
    alert: {
      title: string,
      description: string,
      variant: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark',
      dismissTime?: number
    }
  ): AppAction<KnownAction> => async (dispatch, getState) => {
    dispatch({
      type: TransformationActionTypes.PushAlert,
      alert
    });
  },
  clearAlerts: (): AppAction<KnownAction> => async (dispatch, getState) => {
    dispatch({ type: TransformationActionTypes.ClearAlerts });
  },
  showRequestErrors: (error: any): AppAction<KnownAction> => async (dispatch, getState) => {
    if (error.response && error.response.status) {
      if (error.response.status == 401)
        transformationActions.pushCommonAlert('401')(dispatch, getState)
      else if (error.response.status == 403)
        transformationActions.pushCommonAlert('403')(dispatch, getState)
      else if (error.response.status == 400 && error.response && error.response.data && error.response.data.length > 0) {
        let errors = "";
        for (var i = 0; i < error.response.data.length; i++)
          errors += (errors == "" ? "" : "\n") + error.response.data[i];
        transformationActions.pushAlert(
          {
            title: "information",
            description: errors,
            variant: 'danger'
          }
        )(dispatch, getState);
      } else
        transformationActions.pushAlert(
          {
            title: "error",
            description: "UnSuccessfulOperation",
            variant: 'danger'
          }
        )(dispatch, getState);
    } else {
      transformationActions.pushAlert(
        {
          title: "error",
          description: "UnSuccessfulOperation",
          variant: 'danger'
        }
      )(dispatch, getState);
    }
  },
  pushCommonAlert: (type: '201' | '204' | '401' | '403' | 'errorFetch'): AppAction<KnownAction> => async (dispatch, getState) => {
    switch (type) {
      case '201':
        transformationActions.pushAlert(
          {
            title: "information",
            description: "SuccessfulOperation",
            variant: 'success'
          }
        )(dispatch, getState);
        break;
      case '204':
        transformationActions.pushAlert(
          {
            title: "error",
            description: "DataInNotFound",
            variant: 'warning'
          }
        )(dispatch, getState);
        break;
      case '401':
        transformationActions.pushAlert(
          {
            title: "error",
            description: "UnauthorizedError",
            variant: 'warning'
          }
        )(dispatch, getState);
        break;
      case '403':
        transformationActions.pushAlert(
          {
            title: "error",
            description: "ForbiddenError",
            variant: 'warning'
          }
        )(dispatch, getState);
        break;
      case 'errorFetch':
        transformationActions.pushAlert(
          {
            title: "error",
            description: "UnSuccessfetchData",
            variant: 'warning'
          }
        )(dispatch, getState);
        break;
    }
  },


};