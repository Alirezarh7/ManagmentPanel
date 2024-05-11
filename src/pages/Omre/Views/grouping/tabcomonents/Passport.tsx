import React, { ComponentType, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import './styles.css';
import { registrationActions } from '../../../Actions/Registration/action';
import { IRegistrationState } from '../../../Actions/Registration/model';
import { callCompleteInformationActions } from '../../../../Tamato/Actions/CallCompleteInformations/action';
import { connect } from 'react-redux';
import { IApplicationState } from '../../../../../store/state';
import { bindActionCreators } from 'redux';
import DatePicker, { DateObject } from 'react-multi-date-picker';
import 'react-multi-date-picker/styles/layouts/mobile.css';
import { global_getBase64 } from './../../../../../shareData/fn';

interface IInternalProps {
	handleChangeTab: (event: any, state: string) => void;
	formControl: any;
}

type IProps = typeof registrationActions & IRegistrationState & IInternalProps & typeof callCompleteInformationActions;

type ImageState = { passport: null | File; personel: null | File; personelBase64: string; passportBase64: string };

const Passport = (props: IProps) => {
	const { t } = useTranslation();
	const formControl = props.formControl;
	const [images, setImages] = useState<ImageState>({
		passport: null,
		personel: null,
		passportBase64: '',
		personelBase64: ''
	});

	const detectUserLanguage = (event: React.ChangeEvent<HTMLInputElement>) => {
		const regex = new RegExp(/^[a-z|A-Z_ ]*$/i);
		console.log(event.target.value);
		if (!regex.test(event.target.value)) {
			event.preventDefault();
		}
	};

	const fileInputHandler = async (event: React.ChangeEvent<HTMLInputElement>): Promise<void> => {
		const name = event.target.name;
		event.persist();
		if (event.target.files) {
			if (event.target.files![0].size / 1024 > 500) {
				props.pushAlert({
					variant: 'warning',
					description: '',
					title: 'حجم تصویر انتخابی نمیتواند بیشتر از 500 کیلوبایت باشد'
				});
			} else {
				if (name === 'personalImageBase64' && event.target.files) {
					const toBase64: any = await global_getBase64(event.target.files[0]);
					props.formControl.setValues([
						{
							personalImageBase64: toBase64,
							personalImageType: event.target.files[0].type
						}
					]);
					setImages({
						...images,
						personelBase64: toBase64
					});
				} else if (name === 'passportImageBase64' && event.target.files) {
					const toBase64: any = await global_getBase64(event.target.files[0]);
					props.formControl.setValues([
						{
							passportImageBase64: toBase64,
							passportImageType: event.target.files[0].type
						}
					]);
					setImages({
						...images,
						passportBase64: toBase64
					});
				}
				/* setImages({
                    ...images,
                    passport: name === 'passportImageBase64' ? event.target.files[0] : images.passport ? images.passport : null,
                    personel: name === 'personalImageBase64' ? event.target.files[0] : images.personel ? images.personel : null
                })*/
			}
		}
	};

	useEffect(() => {
		const data = props.passengerProfile.data ? props.passengerProfile.data.passengerInfo : {};
		const passport =
			props.passengerProfile.data && props.passengerProfile.data.passportInfo[0]
				? props.passengerProfile.data.passportInfo[0]
				: {};
		/* const personelImage = new File([
                new Blob([data.imageData])
            ], "personel-image.image");*/
		/*            const passImage = new File([
                new Blob([passport.imageData])
            ], "passport-image.image");*/

		setImages({
			...images,
			personelBase64: data.imageData ?? '',
			passportBase64: passport.imageData ?? ''
		});
	}, [props.passengerProfile.data]);

	return (
		<>
			<form
				onSubmit={e => props.handleChangeTab(e, 'address')}
				className='w-full p-md-5 p-3 m-auto mx-md-0 mx-5 flex items-center flex-col'>
				<div className='row w-full text-left'>
					<div className='form-group col-md-4 col-12'>
						<label htmlFor='enName'>
							<span className='text-danger ml-1'>*</span>
							Name
						</label>
						<input
							name={'enName'}
							value={formControl.values ? formControl.values.enName : null}
							onInput={(event: React.ChangeEvent<HTMLInputElement>) => detectUserLanguage(event)}
							onChange={e => {
								formControl.onChangeHandler(e);
							}}
							className='form-control form-control-sm text-left'
							placeholder={'enter name'}
						/>
					</div>

					<div className='form-group col-md-4 col-12'>
						<label htmlFor='enFamily'>
							<span className='text-danger ml-1'>*</span>
							Family
						</label>
						<input
							name={'enFamily'}
							value={formControl.values ? formControl.values.enFamily : null}
							onInput={(event: React.ChangeEvent<HTMLInputElement>) => detectUserLanguage(event)}
							onChange={e => {
								formControl.onChangeHandler(e);
							}}
							className='form-control form-control-sm text-left'
							placeholder={'enter family'}
						/>
					</div>

					<div className='form-group col-md-4 col-12'>
						<label htmlFor='enFatherName'>
							<span className='text-danger ml-1'>*</span>
							Father name
						</label>
						<input
							name={'enFatherName'}
							value={formControl.values ? formControl.values.enFatherName : null}
							onInput={(event: React.ChangeEvent<HTMLInputElement>) => detectUserLanguage(event)}
							onChange={e => {
								formControl.onChangeHandler(e);
							}}
							className='form-control form-control-sm text-left'
							placeholder={'enter father name'}
						/>
					</div>

					<div className='form-group col-md-4 col-12'>
						<label htmlFor='passportNumber'>
							<span className='text-danger ml-1'>*</span>
							Passport Number
						</label>
						<input
							name={'passportNumber'}
							value={formControl.values ? formControl.values.passportNumber : null}
							onInput={(event: React.ChangeEvent<HTMLInputElement>) => detectUserLanguage(event)}
							onChange={e => {
								formControl.onChangeHandler(e);
							}}
							className='form-control form-control-sm text-left'
							placeholder={'enter passport number'}
						/>
					</div>

					<div className='form-group col-md-4 col-12'>
						<label htmlFor='enPlaceOfBirth'>
							<span className='text-danger ml-1'>*</span>
							Place of birth
						</label>
						<input
							name={'enPlaceOfBirth'}
							value={formControl.values ? formControl.values.enPlaceOfBirth : null}
							onInput={(event: React.ChangeEvent<HTMLInputElement>) => detectUserLanguage(event)}
							onChange={e => {
								formControl.onChangeHandler(e);
							}}
							className='form-control form-control-sm text-left'
							placeholder={'enter place of birth'}
						/>
					</div>

					<div className='form-group col-md-4 col-12'>
						<label htmlFor='enDateOfIssue'>
							<span className='text-danger ml-1'>*</span>
							Date of issue
						</label>
						<DatePicker
							onChange={(e, value) => {
								console.log(e, 'enDateOfIssue');
								formControl.setValue('enDateOfIssue', value.validatedValue[0]);
							}}
							value={formControl.values ? new DateObject(formControl.values.enDateOfIssue) : ''}
							name='enDateOfIssue'
							minDate={'1940/1/1'}
							containerClassName='w-full'
							inputClass='form-control form-control-sm w-full'
							style={{ borderRadius: '4px', padding: '15px', textAlign: 'left' }}
							placeholder='enter date'
							calendarPosition='bottom-right'
						/>
					</div>

					<div className='form-group col-md-4 col-12'>
						<label htmlFor='enExpireDate'>
							<span className='text-danger ml-1'>*</span>
							Expire Date
						</label>
						<DatePicker
							onChange={(e, value) => {
								console.log(value, 'enExpireDate');
								formControl.setValue('enExpireDate', value.validatedValue[0]);
							}}
							minDate={'1940/1/1'}
							name='enExpireDate'
							value={formControl.values ? new DateObject(formControl.values.enExpireDate) : ''}
							containerClassName='w-full'
							inputClass='form-control form-control-sm'
							style={{ borderRadius: '4px', padding: '15px', textAlign: 'left' }}
							placeholder='enter date'
							calendarPosition='bottom-right'
						/>
					</div>

					<div className='form-group col-md-4 col-12'>
						<label htmlFor='enBirthDate'>
							<span className='text-danger ml-1'>*</span>
							Birth Date
						</label>
						<DatePicker
							onChange={(e, value) => {
								console.log(e, 'enBirthDate');
								formControl.setValue('enBirthDate', value.validatedValue[0]);
							}}
							minDate={'1940/1/1'}
							name='enBirthDate'
							value={formControl.values ? new DateObject(formControl.values.enBirthDate) : ''}
							containerClassName='w-full'
							inputClass='form-control form-control-sm'
							style={{ borderRadius: '4px', padding: '15px', textAlign: 'left' }}
							placeholder='enter date'
							calendarPosition='bottom-right'
						/>
					</div>
				</div>

				<p className='text-left mt-5 mb-3 font-weight-bold'>upload images to complete registration</p>

				<div className='p-3 my-3 flex w-full items-center justify-between flex-wrap'>
					<label
						className='p-3 mx-3 text-center font-weight-bold border border-secondary flex items-center justify-center'
						style={{ cursor: 'pointer', width: '250px', height: '300px' }}
						htmlFor='passportImageBase64'>
						{/*{images.passport ? images.passport.name : 'Passport Picture'}*/}
						{images.passportBase64 ? (
							<img style={{ objectFit: 'cover', width: '100%' }} src={images.passportBase64} />
						) : (
							'Passport Picture'
						)}
						<input
							accept='image/png, image/jpeg'
							id='passportImageBase64'
							type='file'
							name='passportImageBase64'
							onChange={e => fileInputHandler(e)}
							className='hidden p-3 mx-3'
						/>
					</label>
					<label
						className='p-3 mx-3 text-center font-weight-bold border border-secondary flex items-center justify-center'
						style={{ cursor: 'pointer', width: '250px', height: '300px' }}
						htmlFor='personalImageBase64'>
						{/*{images.personel ? images.personel.name : 'Personal Picture'}*/}
						{images.personelBase64 ? (
							<img style={{ objectFit: 'cover', width: '100%' }} src={images.personelBase64} />
						) : (
							'Personal Picture'
						)}
						<input
							accept='image/png, image/jpeg'
							id='personalImageBase64'
							type='file'
							name='personalImageBase64'
							onChange={e => fileInputHandler(e)}
							className='hidden p-3 mx-3'
						/>
					</label>
				</div>
			</form>
		</>
	);
};

export default connect(
	(state: IApplicationState) => state.registration,
	(dispatch: any) => bindActionCreators({ ...registrationActions, ...callCompleteInformationActions }, dispatch)
)(Passport as ComponentType<any>);
