import React, { ComponentType, useEffect } from 'react';
import { connect } from 'react-redux';
import { IApplicationState } from '../../../../store/state';
import { userManageActions } from '../../Actions/UserManage/action';
import { IUserManageState } from '../../Actions/UserManage/model';
import UserManageGrid from './Grid';
import NapLoading from '../../../../components/general/NapLoading/NapLoading';
import { useTranslation } from 'react-i18next';
import UserView from './View';
import UserCreate from './Create';
import UserEdit from './Edit';
import UserPassEdit from './EditPass';
import NapDeleteModal from '../../../../components/general/NapDeleteModal/NapDeleteModal';
import clsx from 'clsx';
import useTitle from '../../../../hooks/useTitle';
import GenderAuthorization from './GenderAuthorization';

type IProps = typeof userManageActions & IUserManageState;

const UserManageIndex = (props: IProps) => {
	useTitle('mainSettings', 'usersManage');

	const [t] = useTranslation();
	useEffect(() => {
		props.setCrumbs([{ title: t('usersManage'), link: window.location.pathname }]);
	}, []);
	return (
		<React.Fragment>
			<NapLoading
				loading={
					props.usersList.loading ||
					props.userCreate.loading ||
					props.userUpdate.loading ||
					props.userPassUpdate.loading ||
					props.delete.loading
				}
			/>
			<div className='flex overflow-hidden flex-grow-1'>
				<UserView />
				<UserCreate />
				<UserEdit />
				<UserPassEdit />
				<GenderAuthorization />
				<div className='p-4 w-full overflow-auto'>
					<div className='flex flex-col h-100 bg-white shadow-sm overflow-hidden'>
						<div className='panel-subject flex justify-between items-center font-weight-bold border-bottom p-3'>
							{t('usersManage')}
							<div>
								<button className='btn btn-sm btn-info ml-1' onClick={() => props.toggleCreateUserModal(true)}>
									<span className='mdi mdi-18px mdi-plus-circle-outline ml-1'></span>
									{t('create')}
								</button>
							</div>
						</div>
						<div className='relative flex-grow-1'>
							<UserManageGrid />
						</div>
					</div>
				</div>
				<NapDeleteModal
					disabled={props.delete.loading}
					customClass={clsx(props.delete.loading && 'btn-loading')}
					visible={props.delete.Visible}
					onCancel={() => props.toggleDeleteUserModal('', false)}
					onAccept={() => props.deleteUser()}
				/>
			</div>
		</React.Fragment>
	);
};
export default connect((state: IApplicationState) => state.userManage, userManageActions)(UserManageIndex as ComponentType);
