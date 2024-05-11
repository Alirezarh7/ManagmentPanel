import React, { useEffect, ComponentType } from 'react';
import { connect } from 'react-redux';
import { IApplicationState } from '../../../../store/state';
import { dashboardActions } from '../../Actions/Dashboard/action';
import { useTranslation } from 'react-i18next';
import useFormControl from '../../../../components/general/NapFormControl/NapFormControl';
import NapModal from '../../../../components/general/NapModal/NapModal';

type IProps = typeof dashboardActions & IApplicationState;

const ChangePass = (props: IProps) => {
	const [t] = useTranslation();
	const { values, onChangeHandler, onFormSubmit, GetError, GetValue, setValue, GetRequired } = useFormControl({
		userId: [{ required: true }],
		oldPassword: [{ required: true }, { minLength: 8 }, { maxLength: 16 }],
		password: [{ required: true }, { minLength: 8 }, { maxLength: 16 }],
		confirmPassword: [{ required: true }, { minLength: 8 }, { maxLength: 16 }]
	});
	useEffect(() => {
		setValue('userId', props.oidc.user?.profile?.sub);
	}, [props.dashboard.userPassUpdate.Visible]);
	const formSubmitHandler = () => {
		if (onFormSubmit()) {
			props.updateUserPass(values);
		} else props.pushAlert({ title: t('userError'), description: t('DataIsIncomplete'), variant: 'warning' });
	};

	const Buttons = () => {
		return (
			<React.Fragment>
				<button type='button' className='btn btn-outline-secondary' onClick={() => props.toggleUpdateUserPassModal(false)}>
					{t('cancel')}
				</button>
				<button className='btn btn-success px-4 ml-1' onClick={formSubmitHandler}>
					{t('save')}
				</button>
			</React.Fragment>
		);
	};
	return (
		<React.Fragment>
			<NapModal
				ModalTitle={t('changePassword')}
				Visible={props.dashboard.userPassUpdate.Visible}
				onCancel={() => props.toggleUpdateUserPassModal(false)}
				buttons={<Buttons />}>
				<form>
					<div className='modal-body'>
						<div className='form-group'>
							<label htmlFor='oldPassword'>
								{t('oldPassword')}
								<GetRequired name='oldPassword' />
							</label>
							<input
								className='form-control form-control-sm'
								type='password'
								name='oldPassword'
								value={GetValue('oldPassword')}
								onChange={e => {
									onChangeHandler(e);
								}}
								placeholder={t('placeHoldPassword')}
							/>
							<GetError name='oldPassword' />
						</div>
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
					</div>
				</form>
			</NapModal>
		</React.Fragment>
	);
};
export default connect((state: IApplicationState) => state, dashboardActions)(ChangePass as ComponentType);
