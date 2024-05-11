import React, { ComponentType, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { IApplicationState } from '../../../../store/state';
import { userManageActions } from '../../Actions/UserManage/action';
import { IUserManageState } from '../../Actions/UserManage/model';
import { useTranslation } from 'react-i18next';
import NDate from '@nepo/ndate';

type IProps = typeof userManageActions & IUserManageState;

const UserView = (props: IProps) => {
	const [isShow, setIsShow] = useState<boolean>(false);
	const [t] = useTranslation();
	useEffect(() => {
		setIsShow(props.userView.Visible);
	}, [props.userView.Visible]);
	const onCloseHandler = () => {
		setIsShow(false);
		setTimeout(() => {
			props.toggleViewUserModal({}, false);
		}, 250);
	};
	return (
		<React.Fragment>
			{!props.userView.Visible ? (
				''
			) : (
				<div
					className={
						'panel panel-right--expand bg-light border-left p-3 overflow-auto flex flex-col flex-shrink-0 ' +
						(isShow ? 'open' : '')
					}>
					<div className='modal-header flex-between'>
						<h6 className='modal-title'>{t('displayInfo')}</h6>
						<button type='button' className='btn btn-sm btn-outline-secondary mr-1' onClick={() => onCloseHandler()}>
							{t('close')}
						</button>
					</div>
					<div className='modal-body'>
						<div className='row'>
							<div className='col-6 form-group'>
								<label htmlFor='id'>{t('id')}</label>
								<label className='form-control form-control-sm'>{props.userView.item.id}</label>
							</div>
							<div className='col-6 form-group'>
								<label htmlFor='userName'>{t('userName')}</label>
								<label className='form-control form-control-sm'>{props.userView.item.userName}</label>
							</div>
							<div className='col-6 form-group'>
								<label htmlFor='email'>{t('email')}</label>
								<label className='form-control form-control-sm'>{props.userView.item.email}</label>
							</div>
							<div className='col-6 form-group'>
								<label htmlFor='emailConfirmed'>{t('emailConfirmed')}</label>
								<label className='form-control form-control-sm'>
									{props.userView.item.emailConfirmed == true ? t('yes') : t('no')}
								</label>
							</div>
							<div className='col-6 form-group'>
								<label htmlFor='phoneNumber'>{t('phoneNumber')}</label>
								<label className='form-control form-control-sm'>{props.userView.item.phoneNumber}</label>
							</div>
							<div className='col-6 form-group'>
								<label htmlFor='phoneNumberConfirmed'>{t('phoneNumberConfirmed')}</label>
								<label className='form-control form-control-sm'>
									{props.userView.item.phoneNumberConfirmed == true ? t('yes') : t('no')}
								</label>
							</div>
							<div className='col-6 form-group'>
								<label htmlFor='lockoutEnabled'>{t('lockoutEnabled')}</label>
								<label className='form-control form-control-sm'>
									{props.userView.item.lockoutEnabled == true ? t('yes') : t('no')}
								</label>
							</div>
							<div className='col-6 form-group'>
								<label htmlFor='twoFactorEnabled'>{t('twoFactorEnabled')}</label>
								<label className='form-control form-control-sm'>
									{props.userView.item.twoFactorEnabled == true ? t('yes') : t('no')}
								</label>
							</div>
							<div className='col-6 form-group'>
								<label htmlFor='accessFailedCount'>{t('accessFailedCount')}</label>
								<label className='form-control form-control-sm'>{props.userView.item.accessFailedCount}</label>
							</div>
							<div className='col-6 form-group'>
								<label htmlFor='lockoutEnd'>{t('lockoutEnd')}</label>
								<label className='form-control form-control-sm'>
									{props.userView.item.lockoutEnd && props.userView.item.lockoutEnd != '0001-01-01T00:00:00'
										? new NDate(props.userView.item.lockoutEnd).formatJalali('YYYY/MM/DD')
										: ''}
								</label>
							</div>
						</div>
					</div>
					<div className='text-left modal-footer'>
						<button type='button' className='btn btn-sm btn-outline-secondary mr-1' onClick={() => onCloseHandler()}>
							{t('close')}
						</button>
					</div>
				</div>
			)}
		</React.Fragment>
	);
};
export default connect((state: IApplicationState) => state.userManage, userManageActions)(UserView as ComponentType);
