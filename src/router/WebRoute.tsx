import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Dashboard from '../pages/PublicPages/Views/Dashboard/Dashboard';
import UserRoleManageIndex from '../pages/PublicPages/Views/UserRoleManage/Index';
import UserClaims from '../pages/PublicPages/Views/UserManage/UserClaims';
import User from '../pages/PublicPages/Views/User/UserInfo';
import SignInCallbackPage from '../pages/PublicPages/Views/User/SignInCallbackPage';
import SignOutCallbackPage from '../pages/PublicPages/Views/User/SignOutCallbackPage';
import NotFoundPage from '../pages/NotFoundPage';
import GenderAuthorization from '../pages/PublicPages/Views/UserManage/GenderAuthorization';
import TamatoReserveRegisterPage from '../pages/Tamato/TamatoReserveRegisterPage';
import TamatoMyDocumentsPage from '../pages/Tamato/TamatoMyDocumentsPage';
import TamatoAboutUsPage from '../pages/Tamato/TamatoAboutUsPage';
import TamatoReserveStepOnePage from '../pages/Tamato/TamatoReserveStepOnePage';
import TamatoReserveStepTwoPage from '../pages/Tamato/TamatoReserveStepTwoPage';
import TamatoDocumentTransferAgreementPage from '../pages/Tamato/TamatoDocumentTransferAgreementPage';
import TamatoSaveAndUpdatePage from '../pages/Tamato/TamatoSaveAndUpdatePage';
import SignInCallbackPageTwo from '../pages/PublicPages/Views/User/SignInCallbackPageTwo';
import TamatoBuyDocumentGridPage from '../pages/Tamato/TamatoBuyDocumentGridPage';
import TamatoSelectOfficeSellPage from '../pages/Tamato/TamatoSelectOfficeSellPage';
import TamatoSelectOfficeByPage from '../pages/Tamato/TamatoSelectOfficeByPage';
import TamatoPaymentConfirmationPage from '../pages/Tamato/TamatoPaymentConfirmationPage';
import ReplaceUser from '../pages/ReplaceUser';
import TamatoPrintPage from '../pages/Tamato/TamatoPrintPage';
import TamatoPromisePage from '../pages/Tamato/TamatoPromisePage';
import OmreReserveStepOne from '../pages/Omre/Views/Registration/StepOne/StepOnePage';
import OmreReserveContainer from '../pages/Omre/Views/Registration/StepTwo/GroupingStep/Container';
import MyDocuments from '../pages/Omre/Views/Registration/MyDocuments';
import ReservePage from '../pages/Omre/Views/Registration/ReserveComponent/ReservePage';
import OmrePrint from '../pages/Omre/Views/Registration/ReserveComponent/Print';
import StatusOfReserve from '../pages/Omre/Views/Registration/StatusOfReserve/StatusOfReserve';
import { shareData } from '../shareData';
import FAQPage from '../pages/FAQPage';
import TamatoDocumentTradePage from '../pages/Tamato/TamatoDocumentTradePage';

export interface IProps {}

export interface IState {}

class WebRoute extends React.Component<IProps, IState> {
	render() {
		return (
			<div className=' flex grow lg:relative min-h-[100vh] pb-[65px] '>
				<Routes>
					<Route path='/' element={<Dashboard />} />
					<Route path='/user-roles/:userid/:title' element={<UserRoleManageIndex />} />
					<Route path='/user-claims/:userid/:title' element={<UserClaims />} />
					<Route path='/Users/GenderAuthorization/:userid/:title' element={<GenderAuthorization />} />
					<Route path='/user-information' element={<User />} />
					<Route path='/SignIncallback' element={<SignInCallbackPageTwo />} />
					<Route path='/Pilgrom/DowlatAuthLand' element={<SignInCallbackPage />} />
					<Route path='/SignOutCallbackPage' element={<SignOutCallbackPage />} />
					<Route path='/replace-user' element={<ReplaceUser />} />
					<Route path='/faq' element={<FAQPage />} />

					{/* tamato */}
					<Route path='/tamato/my-documents' element={<TamatoMyDocumentsPage />} />

					{/*Trade*/}
					<Route path='/tamato/document-trasfer-agreement' element={<TamatoDocumentTransferAgreementPage />} />
					<Route path='/tamato/trade-document' element={<TamatoDocumentTradePage />} />
					<Route path='/tamato/buy-document-grid' element={<TamatoBuyDocumentGridPage />} />
					<Route path='/tamato/select-office-sell' element={<TamatoSelectOfficeSellPage />} />
					<Route path='/tamato/select-office-by' element={<TamatoSelectOfficeByPage />} />
					{/*Trade*/}
					{/*Reserve*/}
					<Route path='/tamato/reserve-register' element={<TamatoReserveRegisterPage />} />
					<Route path='/tamato/reserve-step-one' element={<TamatoReserveStepOnePage />} />
					<Route path='/tamato/reserve-step-two' element={<TamatoReserveStepTwoPage />} />
					{/*Reserve*/}
					<Route path='/tamato/print' element={<TamatoPrintPage />} />
					<Route path='/tamato/promise' element={<TamatoPromisePage />} />
					<Route path='/tamato/payment-confirmation' element={<TamatoPaymentConfirmationPage />} />
					<Route path='/tamato/about-us' element={<TamatoAboutUsPage />} />
					<Route path='/tamato/save-or-update' element={<TamatoSaveAndUpdatePage />} />
					{/* tamato */}

					{/* omre */}
					<Route path='/OmreMofrade/myDocuments' element={<MyDocuments />} />
					<Route path='/OmreMofrade/ReserveStepOne' element={<OmreReserveStepOne />} />
					<Route path='/OmreMofrade/select-group-passenger' element={<OmreReserveContainer />} />
					<Route path='/OmreMofrade/ReservPrint' element={<ReservePage />} />
					<Route path='/OmreMofrade/Print' element={<OmrePrint />} />
					<Route path='/OmreMofrade/StatusOfReserve' element={<StatusOfReserve />} />
					{/* omre */}

					<Route path={shareData.CONSTANT.SSO_URL_FROM_MY_GOV} element={<Navigate to='/' />} />
					<Route path='*' element={<NotFoundPage />} />
				</Routes>
			</div>
		);
	}
}

export default WebRoute;
