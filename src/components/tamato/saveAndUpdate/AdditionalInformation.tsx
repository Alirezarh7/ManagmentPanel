import React, { ComponentType, useEffect } from 'react';
import { connect } from 'react-redux';
import { IApplicationState } from '../../../store/state';
import { callCompleteInformationActions } from '../../../pages/Tamato/Actions/CallCompleteInformations/action';
import { ICallCompleteInformationState } from '../../../pages/Tamato/Actions/CallCompleteInformations/model';
import { useTranslation } from 'react-i18next';
import useFormControl from '../../general/NapFormControl/NapFormControl';
import Select from 'react-select';
import { shareData } from '../../../shareData';
import '../myDocuments/callCompleteInformations.css';
import { useNavigate, useLocation } from 'react-router-dom';
import NapLoading from '../../general/NapLoading/NapLoading';
import NapAlerts from '../../general/NapAlerts/NapAlerts';

type IProps = typeof callCompleteInformationActions &
	ICallCompleteInformationState & {
		onNext: () => void;
		onPrev: () => void;
	};

function AdditionalInformation(props: IProps) {
	const [t] = useTranslation();
	const history = useNavigate();
	const location = useLocation();
	const { values, onChangeHandler, onFormSubmit, GetError, setValue, resetForm, setValues, GetRequired, setInitialValues } =
		useFormControl({
			workAddress: [{ required: true, minLength: 20, maxLength: 200 }],
			telCode: [{ required: true, isStringNumber: true }],
			trustedMobile1: [{ required: true, isStringNumber: true }],
			sibling1: [{ required: true }],
			trustedMobile2: [{ required: true, isStringNumber: true }],
			melliBankAccountNo: [{ isStringNumber: true, maxLength: 13 }],
			sibling2: [{ required: true }],
			languageSkill: [{ required: true }],
			languageLevel: [{ required: true }],
			wantToVisitHajjTamattu: [{ required: false }],
			dialect: [{ required: true }],
			shebaAccountNo: [{ isStringNumber: true, minLength: 24, maxLength: 24 }]
		});

	const handleSaveInformation = () => {
		if (localStorage.getItem('stepsData')) {
			let getStepsData = JSON.parse(localStorage.getItem('stepsData') as any);
			getStepsData.completionInformation = values;
			localStorage.setItem('stepsData', JSON.stringify(getStepsData));
			props.setCreateInformation(getStepsData, history);
		}
	};

	const CreateSubmitHandler = (): void => {
		if (onFormSubmit()) {
			handleSaveInformation();
		} else {
			props.pushAlert({
				title: t('userError'),
				description: t('DataIsIncomplete'),
				variant: 'warning'
			});
		}
	};

	useEffect(() => {
		if (props.createInformation.errorMessage) {
			props.pushAlert({
				title: 'خطا در بروز رسانی اطلاعات',
				description: props.createInformation.errorMessage,
				variant: 'warning',
				dismissTime: 9000
			});
			localStorage.removeItem('stepsData');
			localStorage.removeItem('moreSanadData');
			history('/tamato/my-documents');
			sessionStorage.removeItem('changedStep');
			localStorage.setItem('tamatoeStep', JSON.stringify(0));
		}
	}, [props.createInformation.errorMessage]);

	useEffect((): void => {
		sessionStorage.setItem('changedStep', 'true');
		const storedData =
			localStorage.getItem('stepsData') && JSON.parse(localStorage.getItem('stepsData') as any).completionInformation;

		if (!location.state || sessionStorage.getItem('changedStep')) {
			if (storedData) {
				setInitialValues(storedData);
			}
		}

		if (location.state.edit) {
			const completionInformation = {
				...storedData,
				sibling1: shareData.siblings.find(sib => sib.value === storedData.sibling1),
				sibling2: shareData.siblings.find(sib => sib.value === storedData.sibling2),
				languageSkill: shareData.languageSkill.find(data => data.value === storedData.languageSkill),
				languageLevel: shareData.languageLevel.find(data => data.value === storedData.languageLevel),
				dialect: shareData.dialect.find(di => di.value === storedData.dialect),
				wantToVisitHajjTamattu: storedData.shebaAccountNo ? true : false,
				shebaAccountNo: storedData.shebaAccountNo
			};
			setInitialValues(completionInformation);
		}
	}, []);

	return (
		<>
			<NapAlerts clearAlerts={() => props.clearAlerts()} alerts={props.alerts} />
			<NapLoading loading={props.createInformation.loading} />
			<div className='mt-3 row'>
				<div className='form-group col-lg-4'>
					<label htmlFor='telCode'>
						{t('areaCode')}
						<GetRequired name='telCode' />
					</label>
					<input
						className='form-control form-control-sm'
						type='text'
						name='telCode'
						value={values ? values.telCode : null}
						onChange={e => {
							onChangeHandler(e);
						}}
						placeholder={t('placeHenter')}
					/>
					<GetError name='telCode' />
				</div>

				<div className='form-group col-lg-4'>
					<label htmlFor='trustedMobile1'>
						{t('relativesMobilePhoneTheFirstPerson')}
						<GetRequired name='trustedMobile1' />
					</label>
					<input
						className='form-control form-control-sm'
						type='text'
						name='trustedMobile1'
						value={values ? values.trustedMobile1 : null}
						onChange={e => {
							onChangeHandler(e);
						}}
						placeholder={t('placeHenter')}
					/>
					<GetError name='trustedMobile1' />
				</div>

				<div className='form-group col-lg-4'>
					<label htmlFor='sibling1'>
						{t('comparedToTheFirstNumber')}
						<span className='text-danger mr-1'>*</span>
					</label>
					<Select
						options={shareData.siblings}
						isRtl={true}
						value={values ? values.sibling1 : null}
						onChange={(data: any) => {
							setValue('sibling1', data);
						}}
						placeholder={t('placeHenter')}
					/>
					<GetError name='sibling1' />
				</div>

				<div className='form-group col-lg-4'>
					<label htmlFor='trustedMobile2'>
						{t('relativesMobilePhoneTheSecondPerson')}
						<GetRequired name='trustedMobile2' />
					</label>
					<input
						className='form-control form-control-sm'
						type='text'
						name='trustedMobile2'
						value={values ? values.trustedMobile2 : null}
						onChange={e => {
							onChangeHandler(e);
						}}
						placeholder={t('placeHenter')}
					/>
					<GetError name='trustedMobile2' />
				</div>

				<div className='form-group col-lg-4'>
					<label htmlFor='sibling2'>
						{t('comparedToTheSecondNumber')}
						<span className='text-danger mr-1'>*</span>
					</label>
					<Select
						options={shareData.siblings}
						isRtl={true}
						value={values ? values.sibling2 : null}
						onChange={(data: any) => {
							setValue('sibling2', data);
						}}
						placeholder={t('placeHenter')}
					/>
					<GetError name='sibling2' />
				</div>

				<div className='form-group col-lg-4'>
					<label htmlFor='languageSkill'>
						{t('proficiencyInForeignLanguages')}
						<span className='text-danger mr-1'>*</span>
					</label>
					<Select
						options={shareData.languageSkill}
						isRtl={true}
						value={values ? values.languageSkill : null}
						onChange={(data: any) => {
							setValue('languageSkill', data);
						}}
						placeholder={t('placeHenter')}
					/>
					<GetError name='languageSkill' />
				</div>

				<div className='form-group col-lg-4'>
					<label htmlFor='languageLevel'>
						{t('languageLevel')}
						<span className='text-danger mr-1'>*</span>
					</label>
					<Select
						options={shareData.languageLevel}
						isRtl={true}
						value={values ? values.languageLevel : null}
						onChange={(data: any) => {
							setValue('languageLevel', data);
						}}
						placeholder={t('placeHenter')}
					/>
					<GetError name='languageLevel' />
				</div>

				<div className='form-group col-lg-4'>
					<label htmlFor='dialect'>
						{t('originalTongue')}
						<span className='text-danger mr-1'>*</span>
					</label>
					<Select
						options={shareData.dialect}
						isRtl={true}
						value={values ? values.dialect : null}
						onChange={(data: any) => {
							setValue('dialect', data);
						}}
						placeholder={t('placeHenter')}
					/>
					<GetError name='dialect' />
				</div>

				<div className='form-group col-lg-4'>
					<label htmlFor='workAddress'>
						{t('workPlaceAddress')}
						<GetRequired name='workAddress' />
					</label>
					<input
						className='form-control form-control-sm'
						name='workAddress'
						type='text'
						value={values ? values.workAddress : null}
						onChange={e => onChangeHandler(e)}
						placeholder={t('placeHAddress')}
					/>
					<GetError name='workAddress' />
				</div>
				<div className='form-group col-lg-2 mt-5 mb-3 mb-md-0 mt-md-0 md:flex items-center' style={{ marginBottom: 0 }}>
					<input
						type='checkbox'
						className='mx-1'
						id='wantToVisitHajjTamattu1'
						name='wantToVisitHajjTamattu'
						defaultChecked={
							(localStorage.getItem('stepsData') &&
								JSON.parse(localStorage.getItem('stepsData') as any).completionInformation &&
								JSON.parse(localStorage.getItem('stepsData') as any).completionInformation.shebaAccountNo) ||
							(localStorage.getItem('stepsData') && JSON.parse(localStorage.getItem('stepsData') as any).completionInformation)
								? JSON.parse(localStorage.getItem('stepsData') as any).completionInformation.melliBankAccountNo
								: false
						}
						value={values ? values.wantToVisitHajjTamattu : null}
						onChange={e => {
							if (values.shebaAccountNo) {
								setValue('shebaAccountNo', '');
								values.shebaAccountNo = '';
								onChangeHandler(e);
							} else {
								onChangeHandler(e);
							}
						}}
					/>
					<label className='mb-0' htmlFor='wantToVisitHajjTamattu'>
						{t('wantToVisitHajjTamattu')}
					</label>
				</div>
				<div className='form-group col-lg-4'>
					<label htmlFor='shebaAccountNo'>
						{/*{t("melliBankAccountNo")}*/}
						شماره حساب خود را وارد کنید
						<GetRequired name='melliBankAccountNo' />
					</label>
					<input
						disabled={values !== undefined && !values.wantToVisitHajjTamattu}
						className='form-control form-control-sm'
						type='text'
						name='melliBankAccountNo'
						value={values ? values.melliBankAccountNo : null}
						onChange={e => {
							onChangeHandler(e);
						}}
						placeholder={t('melliBankAccountNo')}
					/>
					<GetError name='shebaAccountNo' />
				</div>

				<div className='form-group col-lg-4'>
					<label htmlFor='shebaAccountNo'>
						{t('shebaNumber')}
						<GetRequired name='shebaAccountNo' />
					</label>
					<input
						disabled={values !== undefined && !values.wantToVisitHajjTamattu}
						className='form-control form-control-sm'
						type='text'
						name='shebaAccountNo'
						value={values ? values.shebaAccountNo : null}
						onChange={e => {
							onChangeHandler(e);
						}}
						placeholder={t('onlyNumbersOfSheba')}
					/>
					<GetError name='shebaAccountNo' />
				</div>
			</div>
			<div className='flex flex-md-row flex-col mt-4'>
				<div className='step-one-btn-wrapper mt-md-0 mt-5 px-2 '>
					<button onClick={() => props.onPrev()} type={'button'} className='prev-information-step-btn'>
						{t('returnToPrev')}
					</button>
				</div>
				<div className='step-one-btn-wrapper mt-md-0 mt-2 px-2 mr-md-auto'>
					<button onClick={CreateSubmitHandler} type='submit' className='next-information-step-btn'>
						{/*{t("accept")}*/}
						ذخیره
					</button>
				</div>
			</div>
		</>
	);
}

export default connect(
	(state: IApplicationState) => state.callCompleteInformation,
	callCompleteInformationActions
)(AdditionalInformation as ComponentType<any>);
