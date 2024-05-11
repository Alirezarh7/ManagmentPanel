import React, { ComponentType } from 'react';
import { useTranslation } from 'react-i18next';
import './styles.css';
import Select from 'react-select';
import { registrationActions } from '../../../Actions/Registration/action';
import { IRegistrationState } from '../../../Actions/Registration/model';
import { ICallCompleteInformationState } from '../../../../Tamato/Actions/CallCompleteInformations/model';
import { callCompleteInformationActions } from '../../../../Tamato/Actions/CallCompleteInformations/action';
import { connect } from 'react-redux';
import { IApplicationState } from '../../../../../store/state';
import { bindActionCreators } from 'redux';

interface IInternalProps {
	handleChangeTab: (event: any, state: string) => void;
	formControl: any;
}

type IProps = typeof registrationActions &
	IRegistrationState &
	IInternalProps &
	ICallCompleteInformationState &
	typeof callCompleteInformationActions;

const Social = (props: IProps) => {
	const { t } = useTranslation();
	const formControl = props.formControl;

	const profileData = props.passengerProfile.data !== null ? props.passengerProfile.data.passengerInfo : {};

	return (
		<form
			onSubmit={e => props.handleChangeTab(e, 'address')}
			className='w-full p-md-5 p-3 m-auto mx-md-0 mx-5 flex items-center flex-col'>
			<div className='row w-full'>
				<div className='form-group col-md-4 col-12'>
					<label htmlFor='provinceBirthPlaceId'>
						{t('birthProvince')}
						<formControl.GetRequired name='provinceBirthPlaceId' />
					</label>
					<Select
						options={props.provinceList.data}
						isRtl={true}
						name={'provinceBirthPlaceId'}
						value={formControl.values ? formControl.values.provinceBirthPlaceId : null}
						onChange={(data: any) => {
							formControl.setValue('provinceBirthPlaceId', data);
							if (formControl.values.cityBirthPlaceId) {
								formControl.setValue('cityBirthPlaceId', null);
								formControl.values.cityBirthPlaceId = null;
								formControl.setValue('provinceBirthPlaceId', data);
							}
						}}
						placeholder={t('placeHselect')}
					/>
					<formControl.GetError name='birthProvince' />
				</div>
				<div className='form-group col-md-4 col-12'>
					<label htmlFor='cityBirthPlaceId'>
						{t('birthCity')}
						<formControl.GetRequired name='cityBirthPlaceId' />
					</label>
					<Select
						options={props.cityList.data}
						isRtl={true}
						isDisabled={!profileData && !(formControl.values && formControl.values.birthProvince)}
						value={formControl.values ? formControl.values.cityBirthPlaceId : null}
						onChange={(data: any) => {
							formControl.setValue('cityBirthPlaceId', data);
						}}
						placeholder={t('placeHselect')}
					/>
					<formControl.GetError name='cityBirthPlaceId' />
				</div>
				<div className='form-group col-md-4 col-12'>
					<label htmlFor='firstName'>{t('name')}</label>
					<input disabled value={profileData.firstName} className='form-control form-control-sm' placeholder={t('placeHTitle')} />
				</div>
				<div className='form-group col-md-4 col-12'>
					<label htmlFor='lastName'>{t('family')}</label>
					<input disabled value={profileData.lastName} className='form-control form-control-sm' placeholder={t('placeHTitle')} />
				</div>
				<div className='form-group col-md-4 col-12'>
					<label htmlFor='fatherName'>{t('fatherName')}</label>
					<input
						disabled
						value={profileData.fatherName}
						className='form-control form-control-sm'
						placeholder={t('placeHTitle')}
					/>
				</div>
				<div className='form-group col-md-4 col-12'>
					<label htmlFor='nationalCode'>{t('nationalCode')}</label>
					<input
						disabled
						value={profileData.nationalCode}
						className='form-control form-control-sm'
						placeholder={t('placeHTitle')}
					/>
				</div>
				<div className='form-group col-md-4 col-12'>
					<label htmlFor='socialCode'>{t('socialCode')}</label>
					<input disabled value={profileData.idNumber} className='form-control form-control-sm' placeholder={t('placeHTitle')} />
				</div>
				<div className='form-group col-md-4 col-12'>
					<label htmlFor='gender'>{t('gender')}</label>
					<input
						disabled
						value={profileData.sex === 1 ? 'مرد' : 'زن'}
						className='form-control form-control-sm'
						placeholder={t('placeHTitle')}
					/>
				</div>
				<div className='form-group col-md-4 col-12'>
					<label htmlFor='deathStatus'>{t('deathStatus')}</label>
					<input
						disabled
						value={profileData.deathStatus === 'Alive' ? 'زنده' : 'فوت شده'}
						className='form-control form-control-sm'
						placeholder={t('placeHTitle')}
					/>
				</div>
				{/*
                    <div className="form-group col-md-4 col-12">
                        <label htmlFor="religion">
                            {t("religion")}
                        </label>
                        <input
                            disabled
                            value={'شیعه'}
                            className="form-control form-control-sm"
                            placeholder={t("placeHTitle")}/>
                    </div>*/}
			</div>
			{/*<div className='w-full flex items-center justify-end mt-5'>
                    <button className='btn btn-success accept_and_next_level' type='submit'> مرحله بعد</button>
                </div>*/}
		</form>
	);
};

export default connect(
	(state: IApplicationState) => state.registration,
	(dispatch: any) => bindActionCreators({ ...registrationActions, ...callCompleteInformationActions }, dispatch)
)(Social as ComponentType<any>);
