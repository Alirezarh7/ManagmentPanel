import React, { useState, useEffect, ComponentType } from 'react';
import { connect } from 'react-redux';
import { IApplicationState } from '../../../../store/state';
import { userManageActions } from '../../Actions/UserManage/action';
import { IUserManageState } from '../../Actions/UserManage/model';
import { useTranslation } from 'react-i18next';
import Select from 'react-select';
import useFormControl from '../../../../components/general/NapFormControl/NapFormControl';

type IProps = typeof userManageActions & IUserManageState;

const UserCreate = (props: IProps) => {
	const [isShow, setIsShow] = useState<boolean>(false);
	const [t] = useTranslation();
	const {
		values,
		onChangeHandler,
		onFormSubmit,
		GetError,
		GetValue,
		setValue,
		resetForm,
		setValues,
		setInitialValues,
		GetRequired
	} = useFormControl({
		userName: [{ required: true }, { minLength: 2 }, { maxLength: 250 }],
		email: [{ required: true }, { isEmail: true }],
		emailConfirmed: [{ initialValue: true }],
		phoneNumber: [{ isStringNumber: true }, { maxLength: 11 }],
		phoneNumberConfirmed: [{ initialValue: true }],
		twoFactorEnabled: [{ required: true }, { initialValue: false }]
	});
	var yesOrNo = [
		{ value: false, label: t('no') },
		{ value: true, label: t('yes') }
	];
	useEffect(() => {
		setIsShow(props.userCreate.Visible);
		resetForm();
	}, [props.userCreate.Visible]);
	const FromGroupSubmitHandler = (e: any) => {
		e.preventDefault();
		if (onFormSubmit()) props.saveUser(values);
		else props.pushAlert({ title: t('userError'), description: t('DataIsIncomplete'), variant: 'warning' });
	};
	const onCloseHandler = () => {
		setIsShow(false);
		setTimeout(() => {
			props.toggleCreateUserModal(false);
		}, 250);
	};
	return (
		<React.Fragment>
			{!props.userCreate.Visible ? (
				''
			) : (
				<div
					className={
						'panel panel-right bg-light border-left p-3 overflow-auto flex flex-col flex-shrink-0 ' + (isShow ? 'open' : '')
					}>
					<h6 className='modal-header'>{t('create')}</h6>
					<form onSubmit={FromGroupSubmitHandler}>
						<div className='form-group'>
							<label htmlFor='userName'>
								{t('userName')}
								<GetRequired name='email' />
							</label>
							<input
								className='form-control form-control-sm'
								type='text'
								name='userName'
								onChange={e => {
									onChangeHandler(e);
								}}
								placeholder={t('placeHTitle')}
							/>
							<GetError name='email' />
						</div>
						<div className='form-group'>
							<label htmlFor='email'>
								{t('email')}
								<GetRequired name='email' />
							</label>
							<input
								className='form-control form-control-sm'
								type='text'
								name='email'
								onChange={e => {
									onChangeHandler(e);
								}}
								placeholder={t('placeHemail')}
							/>
							<GetError name='email' />
						</div>
						<div className='form-group'>
							<label htmlFor='phoneNumber'>{t('phoneNumber')}</label>
							<input
								className='form-control form-control-sm'
								type='text'
								name='phoneNumber'
								onChange={e => {
									onChangeHandler(e);
								}}
								placeholder={t('placeHPhoneNumber')}
							/>
							<GetError name='phoneNumber' />
						</div>
						<div className='form-group'>
							<label htmlFor='twoFactorEnabled'>
								{t('twoFactorEnabled')}
								<GetRequired name='twoFactorEnabled' />
							</label>
							<Select
								options={yesOrNo}
								value={yesOrNo.find(x => x.value == GetValue('twoFactorEnabled'))}
								isRtl={true}
								onChange={(data: any) => setValue('twoFactorEnabled', data.value)}
								placeholder={t('placeHselect')}
								name='twoFactorEnabled'
							/>
							<GetError name='twoFactorEnabled' />
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

export default connect((state: IApplicationState) => state.userManage, userManageActions)(UserCreate as ComponentType);
