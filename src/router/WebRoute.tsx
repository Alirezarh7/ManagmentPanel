import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { PATHS } from './paths';
import { shareData } from '../shareData';
import Dashboard from '../pages/DashboardPage';
import UserRoleManageIndex from '../pages/PublicPages/Views/UserRoleManage/Index';
import UserClaims from '../pages/PublicPages/Views/UserManage/UserClaims';
import User from '../pages/PublicPages/Views/User/UserInfo';
import SignInCallbackPage from '../pages/PublicPages/Views/User/SignInCallbackPage';
import SignOutCallbackPage from '../pages/PublicPages/Views/User/SignOutCallbackPage';
import NotFoundPage from '../pages/NotFoundPage';
import GenderAuthorization from '../pages/PublicPages/Views/UserManage/GenderAuthorization';
import SignInCallbackPageTwo from '../pages/PublicPages/Views/User/SignInCallbackPageTwo';
import ReplaceUser from '../pages/ReplaceUser';
import CalenderPage from '../pages/CalenderPage';
import AnnouncementsIndexPage from '../pages/announcments/IndexPage';
import AnnouncementsCreatePage from '../pages/announcments/CreatePage';
import AnnouncementsShowDetailsPage from '../pages/announcments/ShowDetailsPage';
import AnnouncementsEditPage from '../pages/announcments/EditPage';
import ContentsIndexPage from '../pages/contents/IndexPage';
import ContentsCreatePage from '../pages/contents/CreatePage';
import ContentsShowDetailsPage from '../pages/contents/ShowDetailsPage';
import ContentsEditPage from '../pages/contents/EditPage';
import FaqContentsIndexPage from '../pages/faqContents/IndexPage';
import FaqContentsCreatePage from '../pages/faqContents/CreatePage';
import FaqContentsShowDetailsPage from '../pages/faqContents/ShowDetailsPage';
import FaqContentsEditPage from '../pages/faqContents/EditPage';

export interface IProps {}

export interface IState {}

class WebRoute extends React.Component<IProps, IState> {
	render() {
		return (
			<Routes>
				<Route path='/admin' element={<Dashboard />} />
				<Route path={PATHS.calender} element={<CalenderPage />} />

				{/*user related*/}
				<Route path='/admin/user-roles/:userid/:title' element={<UserRoleManageIndex />} />
				<Route path='/admin/user-claims/:userid/:title' element={<UserClaims />} />
				<Route path='/admin/Users/GenderAuthorization/:userid/:title' element={<GenderAuthorization />} />
				<Route path='/admin/user-information' element={<User />} />
				<Route path='/admin/SignIncallback' element={<SignInCallbackPageTwo />} />
				<Route path='/admin/Pilgrom/DowlatAuthLand' element={<SignInCallbackPage />} />
				<Route path='/admin/SignOutCallbackPage' element={<SignOutCallbackPage />} />
				<Route path='/admin/replace-user' element={<ReplaceUser />} />

				{/*Announcements*/}
				<Route path={PATHS.announcements.index} element={<AnnouncementsIndexPage />} />
				<Route path={PATHS.announcements.create} element={<AnnouncementsCreatePage />} />
				<Route path={PATHS.announcements.show} element={<AnnouncementsShowDetailsPage />} />
				<Route path={PATHS.announcements.edit} element={<AnnouncementsEditPage />} />

				{/*Contents*/}
				<Route path={PATHS.contents.index} element={<ContentsIndexPage />} />
				<Route path={PATHS.contents.create} element={<ContentsCreatePage />} />
				<Route path={PATHS.contents.show} element={<ContentsShowDetailsPage />} />
				<Route path={PATHS.contents.edit} element={<ContentsEditPage />} />

				{/*FaqContents*/}
				<Route path={PATHS.faqContents.index} element={<FaqContentsIndexPage />} />
				<Route path={PATHS.faqContents.create} element={<FaqContentsCreatePage />} />
				<Route path={PATHS.faqContents.show} element={<FaqContentsShowDetailsPage />} />
				<Route path={PATHS.faqContents.edit} element={<FaqContentsEditPage />} />

				<Route path={shareData.CONSTANT.SSO_URL_FROM_MY_GOV} element={<Navigate to='/admin' />} />
				<Route path='*' element={<NotFoundPage />} />
			</Routes>
		);
	}
}

export default WebRoute;
