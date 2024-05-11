import React, { ComponentType } from 'react';
import { callCompleteInformationActions } from '../../../pages/Tamato/Actions/CallCompleteInformations/action';
import { ICallCompleteInformationState } from '../../../pages/Tamato/Actions/CallCompleteInformations/model';
import { connect } from 'react-redux';
import { IApplicationState } from '../../../store/state';
import NapModal from '../../general/NapModal/NapModal';
import { useTranslation } from 'react-i18next';
import useFormControl from '../../general/NapFormControl/NapFormControl';
import { useNavigate } from 'react-router-dom';

type IProps = typeof callCompleteInformationActions & ICallCompleteInformationState;

function InformationSearchModal(props: IProps) {
	const [t] = useTranslation();
	const navigate = useNavigate();
	const { values, onChangeHandler, onFormSubmit, GetValue, setValue, setInitialValues, resetForm, GetRequired } = useFormControl({
		registerNumber: [{ required: true }, { isStringNumber: true }],
		complexCode: [{ required: true }, { isStringNumber: true }]
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
			props.getDocumentListByNationalCodeSearchModal(values.registerNumber, values.complexCode, navigate);
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
						<div className='form-group'>
							<label htmlFor='registerNumber'>
								{t('registerNumber')}
								<GetRequired name='registerNumber' />
							</label>
							<input
								className='form-control form-control-sm'
								type='text'
								name='registerNumber'
								onChange={e => {
									onChangeHandler(e);
								}}
								placeholder={t('placeHenter')}
							/>
						</div>

						<div className='form-group'>
							<label htmlFor='complexCode'>
								{t('complexCode')}
								<GetRequired name='complexCode' />
							</label>
							<input
								className='form-control form-control-md'
								type='text'
								name='complexCode'
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
	(state: IApplicationState) => state.callCompleteInformation,
	callCompleteInformationActions
)(InformationSearchModal as ComponentType);
