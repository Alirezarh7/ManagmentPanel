import React, { ComponentType } from 'react';
import { registrationActions } from '../../../../Actions/Registration/action';
import { IRegistrationState } from '../../../../Actions/Registration/model';
import { connect } from 'react-redux';
import { IApplicationState } from '../../../../../../store/state';
import NapModal from '../../../../../../components/general/NapModal/NapModal';
import { useTranslation } from 'react-i18next';
import useFormControl from '../../../../../../components/general/NapFormControl/NapFormControl';
import { useNavigate } from 'react-router-dom';
import DatePicker from '../../../../../../components/general/Calendar';

type IProps = typeof registrationActions & IRegistrationState;

function OmreSearchModal(props: IProps) {
	const [t] = useTranslation();
	const navigate = useNavigate();
	const { values, onChangeHandler, onFormSubmit, resetForm, GetRequired, setValue } = useFormControl({
		sanadNo: [{ required: true }, { isStringNumber: true }],
		birthDate: [{ required: false }]
	});

	const Buttons = () => {
		return (
			<div>
				<button type='button' onClick={() => props.setToggleSearchModal(false)} className='btn btn-md btn-danger ml-3'>
					{t('cancel')}
				</button>
				<button type='button' onClick={CreateSubmitHandler} className='btn btn-md btn-success'>
					{t('searchTitle')}
				</button>
			</div>
		);
	};

	const CreateSubmitHandler = (e: any) => {
		e.preventDefault();
		if (onFormSubmit()) {
			props.getSanadAghlambazFn(true, { sanadNo: values.sanadNo, birthDate: values.birthDate });
			resetForm();
		} else {
			props.pushAlert({
				title: t('userError'),
				description: t('DataIsIncomplete'),
				variant: 'warning'
			});
		}
	};

	return (
		<>
			<NapModal
				ModalTitle={'جستجوی سند'}
				onCancel={() => props.setToggleSearchModal(false)}
				Visible={props.toggleSearchModal.visible}
				buttons={<Buttons />}>
				<div className='flex items-center flex-col justify-around w-full h-100'>
					<div>
						<div className='form-group' style={{ zIndex: 10 }}>
							<label htmlFor='birthDate'>{t('birthDate')}</label>
							<DatePicker
								className='form-control form-control-sm'
								onChange={e => {
									setValue('birthDate', e);
								}}
								placeholder={t('placeHenter')}
							/>
						</div>
						<div className='form-group ' style={{ marginTop: '180px' }}>
							<label htmlFor='sanadNo'>
								{t('sanadNo')}
								<GetRequired name='sanadNo' />
							</label>
							<input
								className='form-control form-control-sm'
								type='text'
								name='sanadNo'
								onChange={e => {
									onChangeHandler(e);
								}}
								placeholder={t('placeHenter')}
							/>
						</div>
					</div>
				</div>
			</NapModal>
		</>
	);
}

export default connect(
	(state: IApplicationState) => state.registration,
	registrationActions
)(OmreSearchModal as ComponentType<any>);
