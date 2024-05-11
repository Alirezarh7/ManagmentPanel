import React, { useState, useEffect, ComponentType } from 'react';
import { connect } from 'react-redux';
import { IApplicationState } from '../../../../store/state';
import { userManageActions } from '../../Actions/UserManage/action';
import { IUserManageState } from '../../Actions/UserManage/model';
import { useTranslation } from 'react-i18next';
import useFormControl from '../../../../components/general/NapFormControl/NapFormControl';

type IProps = typeof userManageActions & IUserManageState;

const UserPassEdit = (props: IProps) => {
	const [isShow, setIsShow] = useState<boolean>(false);
	const [t] = useTranslation();
	const { values, onChangeHandler, onFormSubmit, GetError, GetValue, setValue, GetRequired } = useFormControl({
		userId: [{ required: true }],
		password: [{ required: true }, { minLength: 8 }, { maxLength: 16 }],
		confirmPassword: [{ required: true }, { minLength: 8 }, { maxLength: 16 }]
	});
	useEffect(() => {
		setValue('userId', props.userPassUpdate.userId);
	}, [props.userPassUpdate.userId]);
	useEffect(() => {
		setIsShow(props.userPassUpdate.Visible);
	}, [props.userPassUpdate.Visible]);

	const FromGroupSubmitHandler = (e: any) => {
		e.preventDefault();
		if (onFormSubmit()) {
			if (GetValue('password') == GetValue('confirmPassword')) props.updateUserPass(values);
			else props.pushAlert({ title: t('userError'), description: t('confirmPasswordError'), variant: 'warning' });
		} else props.pushAlert({ title: t('userError'), description: t('DataIsIncomplete'), variant: 'warning' });
	};
	const onCloseHandler = () => {
		setIsShow(false);
		setTimeout(() => {
			props.toggleUpdateUserModal({}, false);
		}, 250);
	};

	return (
		<React.Fragment>
			{!props.userPassUpdate.Visible ? (
				''
			) : (
				<div
					className={
						'panel panel-right bg-light border-left p-3 overflow-auto flex flex-col flex-shrink-0 ' + (isShow ? 'open' : '')
					}>
					<h6 className='modal-header'>{t('editPass')}</h6>
					<form onSubmit={FromGroupSubmitHandler}>
						<div className='form-group'>
							<label htmlFor='password'>
								{t('password')}
								<GetRequired name='password' />
							</label>
							<input
								className='form-control form-control-sm'
								type='password'
								name='password'
								value={GetValue('password')}
								onChange={e => {
									onChangeHandler(e);
								}}
								placeholder={t('placeHpassword')}
							/>
							<GetError name='password' />
						</div>
						<div className='form-group'>
							<label htmlFor='confirmPassword'>
								{t('confirmPassword')}
								<GetRequired name='confirmPassword' />
							</label>
							<input
								className='form-control form-control-sm'
								type='password'
								name='confirmPassword'
								value={GetValue('confirmPassword')}
								onChange={e => {
									onChangeHandler(e);
								}}
								placeholder={t('placeHconfirmPassword')}
							/>
							<GetError name='confirmPassword' />
						</div>
						<div className='text-left modal-footer'>
							<button type='button' className='btn btn-sm btn-outline-secondary mr-1' onClick={() => onCloseHandler()}>
								{t('cancel')}
							</button>
							<button type='submit' className='btn btn-sm btn-success'>
								{t('save')}
							</button>
						</div>
					</form>
				</div>
			)}
		</React.Fragment>
	);
};
export default connect((state: IApplicationState) => state.userManage, userManageActions)(UserPassEdit as ComponentType);
