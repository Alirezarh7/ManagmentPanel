import React, { ComponentType, useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import { IApplicationState } from '../../../../../store/state';
import { registrationActions } from '../../../Actions/Registration/action';
import { useTranslation } from 'react-i18next';
import useTitle from '../../../../../hooks/useTitle';
import './OmreStepTwoStyles.css';
import useFormControl from '../../../../../components/general/NapFormControl/NapFormControl';
import { useNavigate } from 'react-router-dom';
import { IRegistrationState } from '../../../Actions/Registration/model';
import NapAlerts from '../../../../../components/general/NapAlerts/NapAlerts';
import NapLoading from '../../../../../components/general/NapLoading/NapLoading';
import ListCarevan from './List/ListCode';
import Calendar from '../../../../../components/general/Calendar';

import ConfirmGroupModal from '../ConfirmGroupModal';

type IProps = typeof registrationActions &
	IRegistrationState & {
		onNext: () => void;
	};

const StepTwoPage = (props: IProps) => {
	const history = useNavigate();
	const [showConfirmModal, setShowConfirmModal] = useState<any>(null);

	// useEffect(() => {
	//     props.getProvinces();
	// }, []);

	// useEffect(() => {
	//     const dataList:any = [];
	//     const citiesData = props.provinceList.data;
	//     if (Array.isArray(citiesData)) {
	//         citiesData.forEach((city, index) => {
	//             dataList.push(city.label);
	//         });
	//         setDataSelect(dataList);
	//     }
	// }, [props.provinceList.data]);

	// console.log(dataSelect);

	const handleModal = (state: boolean) => {
		setShowConfirmModal(state);
	};

	// const [allRows, setAllRows] = useState([]);

	const setRowDetailHandler = (item?: any) => {
		const finalData = {
			passengerGroupId: props.passengerGroup.data && props.passengerGroup.data.passengerGroupId,
			sanadNo: item.sanadNo,
			priority: item.priority,
			bank: item.bankId,
			createPassengerInfo: {
				firstName: item.firstName,
				lastName: item.lastName,
				fatherName: item.fatherName,
				nationalCode: item.ssn,
				birthDate: item.birthDateEn,
				idNumber: item.idNumber,
				sex: item.sex === 'Man' ? 1 : 2,
				deathStatus: item.deathStatus === 'Alive' ? 1 : 2
			}
		};
		props.addMemberInGroup(finalData);
	};

	const { values, onChangeHandler, onFormSubmit, setValue } = useFormControl({
		nationalCode: [{ required: true, isStringNumber: true, isNationalCode: true, isBirthDate: true, isMobileNo: true }]
	});

	const CreateSubmitHandler = (e: any) => {
		e.preventDefault();
		if (onFormSubmit()) {
			props.getOmreDocument(values.nationalCode, undefined, values.birthDate);
		} else {
			props.pushAlert({ title: t('userError'), description: t('DataIsIncomplete'), variant: 'warning' });
		}
	};

	useTitle('mainSettings', 'reserveAndRegister');

	useEffect(() => {
		if (props.confirmationGroupdata.data && props.confirmationGroupdata.data.length > 0) {
			setShowConfirmModal(true);
		}
	}, [props.confirmationGroupdata.data]);

	const [t] = useTranslation();
	useEffect(() => {
		props.GetPassengerMemberIDBySSN();
	}, []);

	useEffect((item?: any) => {
		props.getOmreDocument(undefined, undefined, undefined, undefined, history, true);
		props.getPassengerGroupData();
		props.leaderByNationalCode();
	}, []);

	const sendDataFortowStep = () => {
		props.getConfirmationGroup(props.onNext, props.passengerGroup.data && props.passengerGroup.data.passengerGroupId);
		// if(props.confirmationGroupdata.data.length===0){

		// }
	};
	console.log(props.isLeaderByNationalCode.data);

	return (
		<>
			<NapAlerts alerts={props.alerts} clearAlerts={() => props.clearAlerts()} />
			<NapLoading
				loading={
					props.omreSanad.loading ||
					props.aghlamBaz.loading ||
					props.cancelUserRegistration.loading ||
					props.passengerGroup.loading ||
					props.addMemberGroup.loading
				}
			/>
			<ConfirmGroupModal handleModal={handleModal} show={showConfirmModal} />
			<div className='flex  flex-grow-1 cc'>
				<div className='p-4 w-full respons-style'>
					<div className='flex flex-col h-100 reserve-parent-custom-style '>
						<div className={'form-parent'}>
							{/* {zaerCount > 1 ? ( */}
							<form onSubmit={CreateSubmitHandler} className={'reserve-form'}>
								<div className='reserve-header'>
									<div className='form-group  custom-style-form-section justify-center'>
										<label htmlFor='nationalCode'>اضافه کردن همراه:</label>
										<div className={''}>
											<input
												data-toggle='tooltip'
												data-placement='top'
												className='form-control'
												name='nationalCode'
												maxLength={10}
												placeholder={t('nationalCode')}
												onChange={e => {
													onChangeHandler(e);
												}}
											/>
										</div>
										<div className={''}>
											<Calendar
												className='form-control'
												placeholder={t('birthDate')}
												onChange={value => {
													setValue('birthDate', value);
												}}
											/>
										</div>
										<button type={'submit'} className='reserve-recovery-submit'>
											{t('recovery')}
										</button>
										<p className={'tooltip-reserve-text'}>برای افزودن همراه از این قسمت استفاده کنید.</p>
									</div>
								</div>
							</form>
							<div className={'w-full'}>
								<h5 className={'table-title mt-3'}>اطلاعات اشخاص</h5>
								{props.omreSanad.data && props.omreSanad.data.length > 0 ? (
									props.omreSanad.data.map((item: any, index: number) => (
										<div style={{ marginInline: 'auto', marginBottom: '30px' }} className={'karvan-info-parent items-center'}>
											<div className={'karvan-info-container'}>
												<div className={'karvan__info__section__one'}>
													<div className={'karvan__info__section'}>
														<div className={'karvan__info'}>
															<p className={'karvan__info__title mx-2 mb-0'}> نام :</p>
															<p className='mb-0'>
																{item.firstName} {item.lastName}
															</p>
														</div>
														<div className={'karvan__info'}>
															<p className={'karvan__info__title mx-2 mb-0'}> شماره ثبت نام :</p>
															<p className='mb-0'>{item.sanadNo}</p>
														</div>
													</div>
													<div className={'karvan__info__section'}>
														<div className={'karvan__info'}>
															<p className={'karvan__info__title mx-2 mb-0'}> کد اولویت :</p>
															<p className='mb-0'>{item.priority}</p>
														</div>
														<div className={'karvan__info'}>
															<p className={'karvan__info__title mx-2 mb-0'}> بانک :</p>
															<p className='mb-0'>{item.bankName}</p>
														</div>
														<div className={'karvan__info'}>
															<p className={'karvan__info__title mx-2 mb-0'}> کدملی :</p>
															<p className='mb-0'>{item.ssn}</p>
														</div>
													</div>
												</div>
											</div>

											<div className={'karvan_button'}>
												<button onClick={() => setRowDetailHandler(item)} className={'chose__karvan__btn'}>
													افزودن به گروه
												</button>
											</div>
										</div>
									))
								) : (
									<p className={'err-msg'}>سندی در نتایج جستجو یافت نشد یا تکمیل اطلاعات انجام نشده است</p>
								)}
							</div>
						</div>
						<div className='omre__karvan__group__box'>
							{props.passengerGroup.data && props.passengerGroup.data.passengerGroupDetails && (
								<h5 className={'table-title mt-4'}>اطلاعات گروه ها</h5>
							)}

							<div className={'W-100'}>
								{props.passengerGroup.data &&
									props.passengerGroup.data.passengerGroupDetails &&
									(props.passengerGroup.loading ? (
										<p>لطفا منتظر بمانید ...</p>
									) : (
										props.passengerGroup.data.passengerGroupDetails.map((item: any, index: any) => (
											<ListCarevan item={item} value={values} index={index} />
										))
									))}
							</div>
							{props.passengerGroup.data &&
								props.passengerGroup.data.passengerGroupDetails &&
								props.isLeaderByNationalCode.data === 'true' && (
									<div className='actions-custom-style'>
										<div className='flex justify-between'>
											<button className=' btn buttonBuyRequestGroup' onClick={sendDataFortowStep}>
												تایید نهایی
											</button>
										</div>
									</div>
								)}
						</div>
					</div>
				</div>
			</div>
		</>
	);
};
export default connect((state: IApplicationState) => state.registration, registrationActions)(StepTwoPage as ComponentType<any>);
