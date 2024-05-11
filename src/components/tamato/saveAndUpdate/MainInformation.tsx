import React, { ComponentType, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { IApplicationState } from '../../../store/state';
import { callCompleteInformationActions } from '../../../pages/Tamato/Actions/CallCompleteInformations/action';
import { ICallCompleteInformationState } from '../../../pages/Tamato/Actions/CallCompleteInformations/model';
import Select from 'react-select';
import { shareData } from '../../../shareData';
import { useTranslation } from 'react-i18next';
import useFormControl from '../../general/NapFormControl/NapFormControl';
import '../myDocuments/callCompleteInformations.css';
import NapLoading from '../../general/NapLoading/NapLoading';
import { useParams, useLocation } from 'react-router-dom';

type IProps = typeof callCompleteInformationActions & ICallCompleteInformationState & { onNext: () => void };

function MainInformation(props: IProps) {
	const [birthProvinceSelected, setBirthProvinceSelected] = useState<any>(null);
	const [birthCitySelected, setBirthCitySelected] = useState<any>(null);
	const [birthResidenceProvinceSelected, setBirthResidenceProvinceSelected] = useState<any>(null);
	const [cityOfThePlaceOfDispatchProvinceSelected, setCityOfThePlaceOfDispatchProvinceSelected] = useState<any>(null);
	const location = useLocation();

	useEffect(() => {
		if (birthProvinceSelected) {
			props.getCitiesByProvince(birthProvinceSelected.value);
		}
	}, [birthProvinceSelected]);

	useEffect(() => {
		if (birthResidenceProvinceSelected) {
			props.getResidenceCitiesByProvince(birthResidenceProvinceSelected.value);
		}
	}, [birthResidenceProvinceSelected]);

	useEffect(() => {
		if (cityOfThePlaceOfDispatchProvinceSelected) {
			props.getCityPlaceOfDispatchCitiesByProvince(cityOfThePlaceOfDispatchProvinceSelected.value);
		}
	}, [cityOfThePlaceOfDispatchProvinceSelected]);

	const [t] = useTranslation();
	const {
		values,
		onChangeHandler,
		onFormSubmit,
		GetError,
		setValue,
		resetForm,
		setValues,
		setInitialValues,
		hasValue,
		GetRequired
	} = useFormControl({
		birthPlaceProvince: [{ required: true }],
		birthPlaceCity: [{ required: true }],
		provinceDispatchId: [{ required: true }],
		cityDispatchId: [{ required: true }],
		provinceAddressId: [{ required: true }],
		cityAddressId: [{ required: true }],
		religion: [{ required: true }],
		hajRecord: [{ required: false }],
		suniBranch: [{ required: false }],
		lastHajDate: [{ required: false, isStringNumber: true, maxLength: 4 }],
		nationalCartData: [{ isStringNumber: true }],
		educationID: [{ required: true }],
		jobID: [{ required: true }]
	});

	const handleNextStep = () => {
		if (localStorage.getItem('stepsData')) {
			let getStepsData = JSON.parse(localStorage.getItem('stepsData') as any);
			getStepsData.mainInformation = values;
			localStorage.setItem('stepsData', JSON.stringify(getStepsData));
			sessionStorage.setItem('changedStep', 'true');
			props.onNext();
		} else {
			const setStepsData = {
				mainInformation: values
			};
			localStorage.setItem('stepsData', JSON.stringify(setStepsData));
			sessionStorage.setItem('changedStep', 'true');
			props.onNext();
		}
	};

	const CreateSubmitHandler = () => {
		if (onFormSubmit()) {
			if (values.religion.value === 2 || values.hajRecord.value > 0) {
				if (values.lastHajDate || values.suniBranch) {
					if (values.hajRecord.value === 0 || !values.hajRecord.value) {
						values.hajRecord = { value: 0, label: '0' };
					}

					handleNextStep();
				} else {
					callCompleteInformationActions.pushAlert({
						title: 'داده های ورودی را به درستی وارد نمایید',
						variant: 'warning',
						description: ''
					});
				}
			} else {
				values.hajRecord = { value: 0, label: '0' };
				handleNextStep();
			}
		}
	};

	useEffect((): void => {
		props.getProvinces();
		if (location.state.edit && !sessionStorage.getItem('changedStep')) {
			const storedData =
				localStorage.getItem('stepsData') && JSON.parse(localStorage.getItem('stepsData') as any).mainInformation;
			props.getCitiesByProvince(storedData.birthPlaceProvince);
			props.getResidenceCitiesByProvince(storedData.provinceAddressId);
			props.getCityPlaceOfDispatchCitiesByProvince(storedData.provinceDispatchId);
		}
		if (!location.state || sessionStorage.getItem('changedStep')) {
			const storedData =
				localStorage.getItem('stepsData') && JSON.parse(localStorage.getItem('stepsData') as any).mainInformation;
			if (storedData) {
				setInitialValues(storedData);
			}
		}
	}, []);

	useEffect(() => {
		const storedData = localStorage.getItem('stepsData') && JSON.parse(localStorage.getItem('stepsData') as any).mainInformation;
		if (location.state.edit && !sessionStorage.getItem('changedStep') && storedData) {
			let storedEditData = {
				birthPlaceProvince:
					props.provinceList.data && props.provinceList.data.find(prov => prov.value === storedData.birthPlaceProvince),
				birthPlaceCity: props.cityList.data && props.cityList.data.find(prov => prov.value === storedData.birthPlaceCity),
				provinceAddressId:
					props.provinceList.data && props.provinceList.data.find(prov => prov.value === storedData.provinceAddressId),
				cityAddressId:
					props.residenceCityList.data && props.residenceCityList.data.find(prov => prov.value === storedData.cityAddressId),
				educationID: shareData.education.find(education => education.value === storedData.educationID),
				hajRecord: shareData.theNumberOfVisitsToHajj.find(hajRecord => hajRecord.value === storedData.hajRecord),
				jobID: shareData.jobs.find(job => job.value === storedData.jobID),
				lastHajDate: storedData.lastHajDate,
				provinceDispatchId:
					props.provinceList.data && props.provinceList.data.find(prov => prov.value === storedData.provinceDispatchId),
				cityDispatchId:
					props.cityOfThePlaceOfDispatchList.data &&
					props.cityOfThePlaceOfDispatchList.data.find(prov => prov.value === storedData.cityDispatchId),
				religion: shareData.religion.find(rel => rel.value === storedData.religion),
				suniBranch: shareData.suniBranch.find(suni => suni.value === storedData.suniBranch)
			};
			if ((values && !values.provinceDispatchId) || (values && !storedEditData.cityDispatchId)) {
				setInitialValues(storedEditData);
			}
		}
	}, [props.cityOfThePlaceOfDispatchList.data || props.residenceCityList.data || props.provinceList.data]);

	const sanadFromBankValidations = JSON.parse(localStorage.getItem('moreSanadData') as string);

	return (
		<>
			<NapLoading
				loading={
					props.provinceList.loading ||
					props.cityList.loading ||
					props.cityOfThePlaceOfDispatchList.loading ||
					props.residenceCityList.loading
				}
			/>
			<div className='mt-3 row'>
				<div className='row w-full m-auto'>
					<div className='form-group col-lg-4'>
						<label htmlFor='birthPlaceProvince'>
							{t('placeProvince')}
							<span className='text-danger mr-1'>*</span>
						</label>
						<Select
							options={props.provinceList.data}
							isRtl={true}
							value={values ? values.birthPlaceProvince : null}
							onChange={(data: any) => {
								setValue('birthPlaceProvince', data);
								setBirthProvinceSelected(data);
								if (values.birthPlaceCity) {
									setValue('birthPlaceCity', null);
									values.birthPlaceCity = null;
									setValue('birthPlaceProvince', data);
								}
							}}
							placeholder={t('placeHselect')}
						/>
						<GetError name='birthPlaceProvince' />
					</div>

					<div className='form-group col-lg-4'>
						<label htmlFor='birthPlaceCity'>
							{t('placeCity')}
							<span className='text-danger mr-1'>*</span>
						</label>
						<Select
							isDisabled={values !== undefined && values.birthPlaceProvince && !values.birthPlaceProvince.title}
							options={props.cityList.data}
							isRtl={true}
							value={values ? values.birthPlaceCity : null}
							onChange={(data: any) => {
								setValue('birthPlaceCity', data);
							}}
							placeholder={t('placeHselect')}
						/>
						<GetError name='birthPlaceCity' />
					</div>
				</div>

				<div className='row w-full m-auto'>
					<div className='form-group col-lg-4'>
						<label htmlFor='provinceAddressId'>
							{t('residenceProvince')}
							<span className='text-danger mr-1'>*</span>
						</label>
						<Select
							options={props.provinceList.data}
							isRtl={true}
							value={values ? values.provinceAddressId : null}
							onChange={(data: any) => {
								setValue('provinceAddressId', data);
								setBirthResidenceProvinceSelected(data);
								if (values.cityAddressId) {
									setValue('cityAddressId', null);
									values.cityAddressId = null;
									setValue('provinceAddressId', data);
								}
							}}
							placeholder={t('placeHselect')}
						/>
						<GetError name='provinceAddressId' />
					</div>

					<div className='form-group col-lg-4'>
						<label htmlFor='cityAddressId'>
							{t('residenceCity')}
							<span className='text-danger mr-1'>*</span>
						</label>
						<Select
							isDisabled={values !== undefined && values.provinceAddressId && !values.provinceAddressId.title}
							options={props.residenceCityList.data}
							isRtl={true}
							value={values ? values.cityAddressId : null}
							onChange={(data: any) => {
								setValue('cityAddressId', data);
							}}
							placeholder={t('placeHselect')}
						/>
						<GetError name='cityAddressId' />
					</div>
				</div>
				<div className='row w-full m-auto'>
					<div className='form-group col-lg-4'>
						<label htmlFor='provinceDispatchId'>
							{t('theProvinceOfThePlaceOfDispatch')}
							<span className='text-danger mr-1'>*</span>
						</label>
						<Select
							isDisabled={sanadFromBankValidations && sanadFromBankValidations.enableProvinceDispatchEdit === 2}
							options={props.provinceList.data}
							isRtl={true}
							value={values ? values.provinceDispatchId : null}
							onChange={(data: any) => {
								setValue('provinceDispatchId', data);
								setCityOfThePlaceOfDispatchProvinceSelected(data);
								if (values.cityDispatchId) {
									setValue('cityDispatchId', null);
									values.cityDispatchId = null;
									setValue('provinceDispatchId', data);
								}
							}}
							name={'provinceDispatchId'}
							placeholder={t('placeHenter')}
						/>
						<GetError name='provinceDispatchId' />
					</div>
					<div className='form-group col-lg-4'>
						<label htmlFor='cityDispatchId'>
							{t('theCityOfThePlaceOfDispatch')}
							<span className='text-danger mr-1'>*</span>
						</label>
						<Select
							isDisabled={
								(values !== undefined && values.provinceDispatchId && !values.provinceDispatchId.title) ||
								(sanadFromBankValidations && sanadFromBankValidations.enableCityDispatchEdit === 2)
							}
							options={props.cityOfThePlaceOfDispatchList.data}
							value={values ? values.cityDispatchId : null}
							isRtl={true}
							name={'cityDispatchId'}
							onChange={(data: any) => {
								setValue('cityDispatchId', data);
							}}
							placeholder={t('placeHenter')}
						/>
						<GetError name='cityDispatchId' />
					</div>
				</div>

				<div className='form-group col-lg-4'>
					<label htmlFor='religion'>
						{t('religion')}
						<span className='text-danger mr-1'>*</span>
					</label>
					<Select
						isDisabled={sanadFromBankValidations && sanadFromBankValidations.enableReligion === 2}
						options={shareData.religion}
						isRtl={true}
						value={values ? values.religion : null}
						onChange={(data: any) => {
							setValue('religion', data);
							if (values.suniBranch) {
								setValue('suniBranch', null);
								values.suniBranch = null;
								setValue('religion', data);
							}
						}}
						placeholder={t('placeHselect')}
					/>
					<GetError name='religion' />
				</div>

				<div className='form-group col-lg-4'>
					<label htmlFor='suniBranch'>
						{t('ageJurisprudence')}
						{values !== undefined && (values.religion.value === 1 || !values.religion.value) ? (
							''
						) : (
							<span className='text-danger mr-1'>*</span>
						)}
					</label>
					<Select
						isDisabled={values && (values.religion.value === 1 || !values.religion.value)}
						options={shareData.suniBranch}
						value={values ? values.suniBranch : null}
						isRtl={true}
						onChange={(data: any) => {
							setValue('suniBranch', data);
						}}
						placeholder={t('placeHselect')}
					/>
					<GetError name='suniBranch' />
				</div>

				<div className='form-group col-lg-4'>
					<label htmlFor='hajRecord'>
						{t('theNumberOfVisitsToHajj')}
						{/*<span className="text-danger mr-1">*</span>*/}
					</label>
					<Select
						defaultValue={shareData.theNumberOfVisitsToHajj[0]}
						options={shareData.theNumberOfVisitsToHajj}
						isRtl={true}
						value={values ? values.hajRecord : null}
						onChange={(data: any) => {
							setValue('hajRecord', data);
							if (values.lastHajDate) {
								setValue('lastHajDate', null);
								values.lastHajDate = null;
								setValue('hajRecord', data);
							}
						}}
						placeholder={t('placeHselect')}
					/>
					<GetError name='hajRecord' />
				</div>

				{values !== undefined && values.hajRecord.value > 0 ? (
					<div className='form-group col-lg-4'>
						<label htmlFor='lastHajDate'>
							{t('theLastYearOfVisitingToHajj')}
							{/*<GetRequired name="lastHajDate"/>*/}
						</label>
						<input
							className='form-control form-control-sm'
							type='text'
							name='lastHajDate'
							onChange={value => {
								onChangeHandler(value);
							}}
							defaultValue={values ? values.lastHajDate : null}
							placeholder={t('placeHenter')}
						/>
						{/*<GetError name="lastHajDate"/>*/}
					</div>
				) : null}

				{/* <div className="form-group col-lg-4">
                    <label htmlFor="nationalCartData">
                        {t("nationalCartData")}
                        <GetRequired name="nationalCartData"/>
                    </label>
                    <input
                        className="form-control form-control-sm"
                        type="text"
                        name="nationalCartData"
                        value={values ? values.nationalCartData : null}
                        onChange={(e) => {
                            onChangeHandler(e);
                        }}
                        placeholder={t("placeHenter")}
                    />
                    <GetError name="nationalCartData"/>
                </div>*/}

				<div className='form-group col-lg-4'>
					<label htmlFor='educationID'>
						{t('education')}
						<span className='text-danger mr-1'>*</span>
					</label>
					<Select
						options={shareData.education}
						isRtl={true}
						value={values ? values.educationID : null}
						onChange={(data: any) => {
							setValue('educationID', data);
						}}
						placeholder={t('placeHenter')}
					/>
					<GetError name='educationID' />
				</div>

				<div className='form-group col-lg-4'>
					<label htmlFor='jobID'>
						{t('work')}
						<span className='text-danger mr-1'>*</span>
					</label>
					<Select
						options={shareData.jobs}
						isRtl={true}
						value={values ? values.jobID : null}
						onChange={(data: any) => {
							setValue('jobID', data);
						}}
						placeholder={t('placeHenter')}
					/>
					<GetError name='jobID' />
				</div>
				<div className='mt-5 px-2 mr-md-auto next-information-step-btn-div'>
					<button onClick={CreateSubmitHandler} type={'button'} className='next-information-step-btn'>
						{t('accept')}
					</button>
				</div>
			</div>
		</>
	);
}

export default connect(
	(state: IApplicationState) => state.callCompleteInformation,
	callCompleteInformationActions
)(MainInformation as ComponentType<any>);
