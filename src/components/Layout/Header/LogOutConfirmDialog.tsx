import React, { ComponentType } from 'react';
import { dashboardActions } from '../../../pages/PublicPages/Actions/Dashboard/action';
import NapModal from '../../general/NapModal/NapModal';
import { IApplicationState } from '../../../store/state';
import { connect } from 'react-redux';
import { shareData } from '../../../shareData';
import userManager from '../../../store/userManager';

type IProps = typeof dashboardActions & IApplicationState;
const Buttons = (props: any) => {
	return (
		<>
			<button onClick={() => props.toggleLogoutConfirm(false)} className={'btn mx-2 btn-outline-danger px-4'}>
				خیر
			</button>
			<button onClick={props.logout} className={'btn mx-2 btn-outline-success px-4'}>
				بله
			</button>
		</>
	);
};

function LogOutConfirmDialog(props: IProps) {
	const logout = (event: any) => {
		event.preventDefault();
		window.localStorage.getItem(shareData.CONSTANT.SSO_APPROACH) === 'organization' && userManager.signoutRedirect();
		userManager.removeUser();
		userManager.clearStaleState();
		props.clearUserClaims();
		window.localStorage.getItem(shareData.CONSTANT.SSO_APPROACH) === 'mygov' && window.location.reload();
		localStorage.clear();
	};

	return (
		<NapModal
			buttons={<Buttons toggleLogoutConfirm={props.toggleLogoutConfirm} logout={logout} />}
			ModalTitle={'کاربر گرامی'}
			onCancel={() => props.toggleLogoutConfirm(false)}
			Visible={props.dashboard.logoutConfirm.visible}>
			<span>آیا از خروج حساب کاربری خود اطمینان دارید ؟</span>
			{/*toggleLogoutConfirm*/}
		</NapModal>
	);
}

export default connect((state: IApplicationState) => state, dashboardActions)(LogOutConfirmDialog as ComponentType);
