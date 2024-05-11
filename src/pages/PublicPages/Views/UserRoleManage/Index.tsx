import React, { ComponentType, useEffect } from 'react';
import { connect } from 'react-redux';
import { IApplicationState } from '../../../../store/state';
import { userRoleManageActions } from '../../Actions/UserRoleManage/action';
import { IUserRoleManageState } from '../../Actions/UserRoleManage/model';
import UserRoleManageGrid from './Grid';
import NapLoading from '../../../../components/general/NapLoading/NapLoading';
import { useTranslation } from 'react-i18next';
import UserRoleCreate from './Create';
import NapDeleteModal from '../../../../components/general/NapDeleteModal/NapDeleteModal';
import clsx from 'clsx';
import ReturnButton from '../../../../components/general/Buttons/ReturnButton';
import useTitle from '../../../../hooks/useTitle';

type IProps = typeof userRoleManageActions & IUserRoleManageState & { userid: string; title: string };

const UserRoleManageIndex = (props: IProps) => {
	useTitle('mainSettings', 'userRolesManage');

	const [t] = useTranslation();
	useEffect(() => {
		props.setCrumbs([
			{ title: t('usersManage'), link: '/usersManage' },
			{ title: t('userRolesManage'), link: window.location.pathname }
		]);
	}, []);
	const goBack = () => {
		window.history.back();
	};
	return (
		<React.Fragment>
			<NapLoading
				loading={props.userRolesList.loading || props.roleList.loading || props.userRoleCreate.loading || props.delete.loading}
			/>
			<div className='flex overflow-hidden flex-grow-1'>
				<UserRoleCreate userId={props.userid} />
				<div className='p-4 w-full overflow-auto'>
					<div className='flex flex-col h-100 bg-white shadow-sm overflow-hidden'>
						<div className='panel-subject flex justify-between items-center font-weight-bold border-bottom p-3'>
							{t('userRolesManage') + ' ' + props.title}
							<div>
								<button className='btn btn-sm btn-info' onClick={() => props.getRoleList()}>
									<span className='mdi mdi-18px mdi-plus-circle-outline ml-1'></span>
									{t('create')}
								</button>
								{/* <button onClick={goBack} className="btn btn-sm btn-outline-secondary mr-1">
                                    <span className="mdi mdi-18px mdi-chevron-right"></span>
                                    {t("return")}
                                </button> */}
								<ReturnButton onclick={goBack} customClass='btn-sm' />
							</div>
						</div>
						<div className='relative flex-grow-1'>
							<UserRoleManageGrid userId={props.userid} />
						</div>
					</div>
				</div>
				<NapDeleteModal
					disabled={props.delete.loading}
					customClass={clsx(props.delete.loading && 'btn-loading')}
					visible={props.delete.Visible}
					onCancel={() => props.toggleDeleteUserRoleModal('', '', false)}
					onAccept={() => props.deleteUserRole()}
				/>
			</div>
		</React.Fragment>
	);
};
export default connect(
	(state: IApplicationState) => state.userRoleManage,
	userRoleManageActions
)(UserRoleManageIndex as ComponentType<any>);
