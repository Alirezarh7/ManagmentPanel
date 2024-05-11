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
import AnnouncementsIndexPage from '../pages/announcments/IndexPage';
import AnnouncementsCreatePage from '../pages/announcments/CreatePage';

export interface IProps {}

export interface IState {}

class WebRoute extends React.Component<IProps, IState> {
	render() {
		return (
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

				{/*Announcements*/}
				<Route path={PATHS.announcements.index} element={<AnnouncementsIndexPage />} />
				<Route path={PATHS.announcements.create} element={<AnnouncementsCreatePage />} />

				<Route path={shareData.CONSTANT.SSO_URL_FROM_MY_GOV} element={<Navigate to='/' />} />
				<Route path='*' element={<NotFoundPage />} />
			</Routes>
		);
	}
}

export default WebRoute;
