import React, { ComponentType, useState } from 'react';
import { useTranslation } from 'react-i18next';
import './styles.css';
import { registrationActions } from '../../../Actions/Registration/action';
import { IRegistrationState } from '../../../Actions/Registration/model';
import { ICallCompleteInformationState } from '../../../../Tamato/Actions/CallCompleteInformations/model';
import { callCompleteInformationActions } from '../../../../Tamato/Actions/CallCompleteInformations/action';
import { connect } from 'react-redux';
import { IApplicationState } from '../../../../../store/state';
import DynamicAddress from './dynamicforms/DynamicAddress';

interface IInternalProps {
	handleChangeTab: (event: any, state: string) => void;
	formControl: any;
}

type IProps = typeof registrationActions &
	IRegistrationState &
	IInternalProps &
	ICallCompleteInformationState &
	typeof callCompleteInformationActions;
const Address = (props: IProps) => {
	const [address, setAddresses] = useState<any[]>([]);
	const addressHandler = (newValue: any, index: number) => {
		const reference = address;
		if (address.find(add => add.id === newValue.id)) {
			address[index] = newValue;
		} else {
			reference.push(newValue);
			setAddresses(reference);
		}
	};
	const { t } = useTranslation();
	const formControl = props.formControl;

	const addressInformation = props.passengerProfile.data !== null && props.passengerProfile.data.addressInformation;

	return (
		<form
			onSubmit={e => props.handleChangeTab(e, 'complete')}
			className='w-full p-md-5 p-3 m-auto mx-md-0 mx-5 flex items-center flex-col'>
			{/* {addressInformation && addressInformation.length > 0 ?
                addressInformation.map((add: any,index: number) => (
                    <DynamicAddress address={add} key={add.id} addressHandler={addressHandler} />
                ) ) :*/}
			<div className='row w-full'>
				<div className='form-group col-md-4 col-12 '>
					<label htmlFor='postalCode'>
						{t('zipCode')}
						<formControl.GetRequired name='postalCode' />
					</label>
					<input
						className='form-control form-control-sm'
						type='text'
						name='postalCode'
						value={formControl.values ? formControl.values.postalCode : null}
						onChange={e => {
							formControl.onChangeHandler(e);
						}}
						placeholder={t('placeHenter')}
					/>
					<button
						disabled={props.addressByPostalCode.loading}
						type={'button'}
						onClick={() => {
							if (formControl.values && formControl.values.postalCode) {
								props.getAddressByPostalCode(formControl.values.postalCode);
							} else {
								props.pushAlert({
									title: 'خطای ورودی',
									description: 'برای درخواست استعلام ورود کدپستی الزامی میباشد',
									variant: 'warning'
								});
							}
						}}
						className='btn btn-outline-success btn-md mr-2 mt-3'>
						{props.addressByPostalCode.loading ? 'منتظر بمانید ...' : 'استعلام'}
					</button>
					<formControl.GetError name='postalCode' />
				</div>
				<div className='form-group col-md-4 col-12'>
					<label htmlFor='landline'>
						{t('landlinePhone')}
						<formControl.GetRequired name='landline' />
					</label>
					<input
						className='form-control form-control-sm'
						type='text'
						name='landline'
						value={formControl.values ? formControl.values.landline : null}
						onChange={e => {
							formControl.onChangeHandler(e);
						}}
						placeholder={t('placeHenter')}
					/>
					<formControl.GetError name='landline' />
				</div>
				<div className='form-group col-md-4 col-12'>
					<label htmlFor='mobileNo'>
						{t('Phone')}
						<formControl.GetRequired name='mobileNo' />
					</label>
					<input
						className='form-control form-control-sm'
						type='text'
						name='mobileNo'
						value={formControl.values ? formControl.values.mobileNo : null}
						onChange={e => {
							formControl.onChangeHandler(e);
						}}
						placeholder={t('placeHenter')}
					/>
					<formControl.GetError name='mobileNo' />
				</div>
				<div className='form-group col-md-8 col-12'>
					<label htmlFor='detail'>{t('address')}</label>
					<input
						className='form-control form-control-sm'
						type='text'
						name='detail'
						value={formControl.values ? formControl.values.detail : null}
						onChange={e => {
							formControl.onChangeHandler(e);
						}}
						// disabled
						placeholder={t('placeHenter')}
					/>
				</div>
			</div>
			{/*}*/}
		</form>
	);
};
export default connect((state: IApplicationState) => state.registration, registrationActions)(Address as ComponentType<any>);
