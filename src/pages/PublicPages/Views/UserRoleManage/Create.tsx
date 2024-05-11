import React, { useState, useEffect, ComponentType } from 'react';
import { connect } from 'react-redux';
import { IApplicationState } from '../../../../store/state';
import { userRoleManageActions } from '../../Actions/UserRoleManage/action';
import { IUserRoleManageState } from '../../Actions/UserRoleManage/model';
import { useTranslation } from 'react-i18next';
import Select from 'react-select';
import useFormControl from '../../../../components/general/NapFormControl/NapFormControl';

type IProps = typeof userRoleManageActions & IUserRoleManageState & { userId: string };

const UserRoleCreate = (props: IProps) => {
	const [isShow, setIsShow] = useState<boolean>(false);
	const [t] = useTranslation();
	const { values, onFormSubmit, GetError, GetValue, setValue, GetRequired, resetForm } = useFormControl({
		userId: [{ required: true }, { minLength: 10 }, { initialValue: props.userId }],
		roleId: [{ required: true }, { minLength: 10 }]
	});
	useEffect(() => {
		setIsShow(props.userRoleCreate.Visible);
		resetForm();
	}, [props.userRoleCreate.Visible]);
	const FromGroupSubmitHandler = (e: any) => {
		e.preventDefault();
		if (onFormSubmit()) props.saveUserRole(values);
		else props.pushAlert({ title: t('userRoleError'), description: t('DataIsIncomplete'), variant: 'warning' });
	};
	const onCloseHandler = () => {
		setIsShow(false);
		setTimeout(() => {
			props.toggleCreateUserRoleModal(false);
		}, 250);
	};
	return (
		<React.Fragment>
			{!props.userRoleCreate.Visible ? (
				''
			) : (
				<div
					className={
						'panel panel-right bg-light border-left p-3 overflow-auto flex flex-col flex-shrink-0 ' + (isShow ? 'open' : '')
					}>
					<h6 className='modal-header'>{t('create')}</h6>
					<form onSubmit={FromGroupSubmitHandler}>
						<div className='form-group'>
							<label htmlFor='roleId'>
								{t('role')} <GetRequired name='roleId' />
							</label>
							<Select
								id='roleId'
								name='roleId'
								options={props.roleList.data}
								value={props.roleList.data.find(x => x.value == GetValue('roleId'))}
								isRtl={true}
								onChange={(data: any) => setValue('roleId', data.value)}
								placeholder={t('placeHselect')}
							/>
							<GetError name='roleId' />
						</div>
						<div className='text-left modal-footer'>
							<button type='button' className='btn btn-sm btn-outline-secondary mr-1' onClick={() => onCloseHandler()}>
								{t('cancel')}
							</button>
							<button type='submit' className='btn btn-sm btn-success px-1'>
								{t('save')}
							</button>
						</div>
					</form>
				</div>
			)}
		</React.Fragment>
	);
};

export default connect(
	(state: IApplicationState) => state.userRoleManage,
	userRoleManageActions
)(UserRoleCreate as ComponentType<any>);
