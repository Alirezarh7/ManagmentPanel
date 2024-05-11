import React, { ComponentType, useEffect, useState } from 'react';
import { registrationActions } from '../../Actions/Registration/action';
import { IRegistrationState } from '../../Actions/Registration/model';
import { connect } from 'react-redux';
import { IApplicationState } from '../../../../store/state';
import { Col, Modal, Nav, Row, Tab } from 'react-bootstrap';
import Social from './tabcomonents/Social';
import useWindowSize from '../../../../hooks/useWindowSize';
import useFormControl from '../../../../components/general/NapFormControl/NapFormControl';
import Address from './tabcomonents/Address';
import Completation from './tabcomonents/Completation';
import Passport from './tabcomonents/Passport';
import { shareData } from '../../../../shareData';
import { useTranslation } from 'react-i18next';

interface IInternalProps {
	show: boolean;
	handleClose: () => void;
	karvanItem: any;
}

type IProps = typeof registrationActions & IRegistrationState & IInternalProps;

function GroupingModal(props: IProps) {
	const { t } = useTranslation();
	const [activeKey, setActiveKey] = useState<string>('social');
	const { values, onChangeHandler, GetError, onFormSubmit, GetRequired, setValue, setValues } = useFormControl({
		cityBirthPlaceId: [{ required: true }],
		provinceBirthPlaceId: [{ required: true }],
		postalCode: [{ required: true, minLength: 10, maxLength: 10, isStringNumber: true }],
		landline: [{ required: true, minLength: 8, maxLength: 8, isStringNumber: true }],
		mobileNo: [{ required: true, minLength: 11, isStringNumber: true }],
		detail: [{ required: false }],
		mariagesStatus: [{ required: true }],
		education: [{ required: true }],
		bloodType: [{ required: true }],
		job: [{ required: true }],
		marja: [{ required: true }],
		religion: [{ required: true }],
		heartDisease: [{ required: false }],
		epilepsy: [{ required: false }],
		wheelchair: [{ required: false }],
		respiratoryDisease: [{ required: false }],
		diabetes: [{ required: false }],
		alzheimer: [{ required: false }],
		none: [{ required: false }],
		enName: [{ required: true }],
		enFamily: [{ required: true }],
		enFatherName: [{ required: true }],
		enPlaceOfBirth: [{ required: true }],
		enDateOfIssue: [{ required: true }],
		enExpireDate: [{ required: true }],
		enBirthDate: [{ required: true }],
		passportNumber: [{ required: true }],
		personalImageBase64: [{ required: true }],
		personalImageType: [{ required: true }],
		passportImageType: [{ required: true }],
		passportImageBase64: [{ required: true }]
	});

	const handleChangeTab = (event: any, state: string): void => {
		event.preventDefault();
		setActiveKey(state);
	};

	useEffect(() => {
		if (props.provinceList.data && !props.provinceList.data.length) {
			props.getProvinces();
		}
		if (props.provinceList.data && props.provinceList.data.length && props.show) {
			values && values.provinceBirthPlaceId && props.getCitiesByProvince(values.provinceBirthPlaceId.value);
		}
	}, [values && values.provinceBirthPlaceId, props.show]);

	useEffect(() => {
		if (props.cityList.data && props.cityList.data.length > 0 && !values.cityBirthPlaceId && props.passengerProfile.data) {
			setValues([
				{
					cityBirthPlaceId:
						props.cityList.data &&
						props.cityList.data.find(prov => prov.id === props.passengerProfile.data.passengerInfo.cityBirthPlaceId)
				}
			]);
		}
	}, [props.cityList.data]);

	useEffect(() => {
		if (props.karvanItem && props.show && !props.passengerProfile.data) {
			props.getPassengerProfileData(props.karvanItem.id, props.karvanItem.passengerId, props.karvanItem.nationalCode);
		}

		if (props.passengerProfile.data) {
			const address = props.passengerProfile.data && props.passengerProfile.data.addressInformation;
			const additional = props.passengerProfile.data && props.passengerProfile.data.additionalInformation;
			const health = props.passengerProfile.data && props.passengerProfile.data.healthStatusInformation;
			const mobileNubmbers =
				props.passengerProfile.data && props.passengerProfile.data.mobileNubmbers[0]
					? props.passengerProfile.data.mobileNubmbers[0]
					: {};
			const data = props.passengerProfile.data.passengerInfo;
			const passport =
				props.passengerProfile.data && props.passengerProfile.data.passportInfo[0]
					? props.passengerProfile.data.passportInfo[0]
					: {};

			setValues([
				{
					provinceBirthPlaceId:
						props.provinceList.data && props.provinceList.data.find(prov => prov.id === data.provinceBirthPlaceId)
				},
				// {cityBirthPlaceId: props.cityList.data && props.cityList.data.find(prov => prov.id === data.cityBirthPlaceId)},
				{ postalCode: address[0] && address[0].postalCode },
				{ landline: address[0] && address[0].landline },
				{ detail: address[0] && address[0].detail },
				{ mariagesStatus: shareData.martialStatus.find(status => status.value === additional.mariagesStatus) },
				{ religion: shareData.religion.find(religion => religion.value === additional.religion) },
				{ education: shareData.education.find(educ => educ.value === additional.education) },
				{ job: shareData.jobs.find(job => job.value === additional.job) },
				{ marja: shareData.marja.find(m => m.value === additional.marja) },
				{ mobileNo: mobileNubmbers.mobileNo },
				{ heartDisease: health.heartDisease },
				{ epilepsy: health.epilepsy },
				{ wheelchair: health.wheelchair },
				{ respiratoryDisease: health.respiratoryDisease },
				{ diabetes: health.diabetes },
				{ alzheimer: health.alzheimer },
				{ none: health.none },
				{ bloodType: shareData.bloodTypes.find(blood => blood.value === health.bloodType) },
				{ enName: passport.firstName },
				{ enFamily: passport.lastName },
				{ enFatherName: passport.fatherName },
				// {enPlaceOfBirth: passport.birthDate},
				{ enDateOfIssue: passport.issueDate },
				{ enExpireDate: passport.expireDate },
				{ enBirthDate: passport.birthDate },
				{ passportNumber: passport.passportNumber },
				{ passportImageType: passport.mediaType },
				{ passportImageBase64: passport.imageData },
				{ personalImageType: data.mediaType },
				{ personalImageBase64: data.imageData }
			]);
		}
	}, [props.show, props.passengerProfile.data]);

	useEffect(() => {
		if (!props.show) {
			props.clearPassengerProfileData();
		}
	}, [props.show]);
	const window = useWindowSize();

	const handleSubmit = () => {
		if (onFormSubmit()) {
			const finalData = {
				passengerId: props.karvanItem.passengerId,
				passengerInfo: {
					cityBirthPlaceId: values.cityBirthPlaceId.id,
					mediaType: values.personalImageType,
					imageData: values.personalImageBase64
				},
				passportInfo: {
					id:
						props.passengerProfile.data &&
						props.passengerProfile.data.passportInfo[0] &&
						props.passengerProfile.data.passportInfo[0].id,
					passportNumber: values.passportNumber,
					firstName: values.enName,
					lastName: values.enFamily,
					fatherName: values.enFatherName,
					birthDate: new Date(values.enBirthDate),
					issueDate: new Date(values.enDateOfIssue),
					expireDate: new Date(values.enExpireDate),
					mediaType: values.passportImageType,
					imageData: values.passportImageBase64
				},
				additionalInformation: {
					id: props.passengerProfile.data && props.passengerProfile.data.additionalInformation.id,
					mariagesStatus: values.mariagesStatus.value,
					religion: values.religion.value,
					education: values.education.value,
					job: values.job.value,
					marja: values.marja.value
				},
				addressInformation: {
					id:
						props.passengerProfile.data &&
						props.passengerProfile.data.addressInformation[0] &&
						props.passengerProfile.data.addressInformation[0].id,
					postalCode: values.postalCode,
					landline: values.landline,
					detail: values.detail
				},
				mobileNo: {
					id:
						props.passengerProfile.data &&
						props.passengerProfile.data.mobileNubmbers[0] &&
						props.passengerProfile.data.mobileNubmbers[0].id,
					mobileNo: values.mobileNo
				},
				healthStatusInformation: {
					id: props.passengerProfile.data && props.passengerProfile.data.healthStatusInformation.id,
					bloodType: values.bloodType.value,
					heartDisease: values.heartDisease,
					epilepsy: values.epilepsy,
					wheelchair: values.wheelchair,
					respiratoryDisease: values.respiratoryDisease,
					diabetes: values.diabetes,
					alzheimer: values.alzheimer,
					none: values.none
				}
			};

			props.setMemberProfile(finalData, props.handleClose);
		} else {
			props.pushAlert({ title: t('userError'), description: t('DataIsIncomplete'), variant: 'warning' });
		}
	};

	return (
		<>
			<Modal
				dialogClassName={window.width <= 560 ? 'h-100' : 'h-75'}
				scrollable
				show={props.show}
				onHide={props.handleClose}
				size='xl'>
				<Modal.Header closeButton>
					<Modal.Title>تکمیل اطلاعات</Modal.Title>
				</Modal.Header>
				<Modal.Body className='py-0'>
					{props.passengerProfile && props.passengerProfile.loading ? (
						<p></p>
					) : (
						<>
							<Tab.Container
								activeKey={activeKey}
								onSelect={(value: string | null) => setActiveKey(value as string)}
								id='left-tabs-example'
								defaultActiveKey={activeKey}>
								<Row style={{ width: 'auto', height: '100%' }}>
									<Col sm={2} className='bg-white shadow-lg'>
										<Nav variant='pills' className='flex-col'>
											<Nav.Item>
												<Nav.Link eventKey='social' className='text-dark bg-transparent mt-md-5'>
													اطلاعات شناسنامه ای
												</Nav.Link>
											</Nav.Item>
											{/* <Nav.Item>
                                        <Nav.Link eventKey="group" className='text-dark bg-transparent mt-md-5'>اطلاعات درون گروهی</Nav.Link>
                                    </Nav.Item>*/}
											<Nav.Item>
												<Nav.Link eventKey='address' className='text-dark bg-transparent mt-md-5'>
													آدرس و نشانی
												</Nav.Link>
											</Nav.Item>
											<Nav.Item>
												<Nav.Link eventKey='complete' className='text-dark bg-transparent mt-md-5'>
													اطلاعات تکمیلی
												</Nav.Link>
											</Nav.Item>
											<Nav.Item>
												<Nav.Link eventKey='passport' className='text-dark bg-transparent mt-md-5'>
													اطلاعات گذرنامه
												</Nav.Link>
											</Nav.Item>
										</Nav>
									</Col>
									<Col sm={10}>
										<Tab.Content>
											<Tab.Pane eventKey='social'>
												<Social
													karvanItem={props.karvanItem}
													handleChangeTab={handleChangeTab}
													formControl={{
														values,
														setValue,
														GetError,
														onFormSubmit,
														GetRequired,
														onChangeHandler
													}}
												/>
											</Tab.Pane>
											{/* <Tab.Pane eventKey="group">
                                        <GroupInformation formControl={{
                                            values,
                                            setValue,
                                            GetError,
                                            onFormSubmit,
                                            GetRequired,
                                            onChangeHandler
                                        }}  />
                                    </Tab.Pane>*/}
											<Tab.Pane eventKey='address'>
												<Address
													handleChangeTab={handleChangeTab}
													formControl={{
														values,
														setValue,
														GetError,
														onFormSubmit,
														GetRequired,
														onChangeHandler
													}}
												/>
											</Tab.Pane>
											<Tab.Pane eventKey='complete'>
												<Completation
													handleChangeTab={handleChangeTab}
													formControl={{
														values,
														setValue,
														setValues,
														GetError,
														onFormSubmit,
														GetRequired,
														onChangeHandler
													}}
												/>
											</Tab.Pane>
											<Tab.Pane eventKey='passport'>
												<Passport
													handleChangeTab={handleChangeTab}
													formControl={{
														values,
														setValue,
														setValues,
														GetError,
														onFormSubmit,
														GetRequired,
														onChangeHandler
													}}
												/>
											</Tab.Pane>
										</Tab.Content>
									</Col>
									{/*      {props.addressByPostalCode.loading || props.setZaerProfie.loading || props.passengerProfile.loading ?
                        <p className='text-center w-full p-2 font-weight-bold text-info'>لطفا منتظر بمانید
                            ...</p> : null}*/}
								</Row>
							</Tab.Container>
						</>
					)}
				</Modal.Body>
				<Modal.Footer>
					<button
						disabled={props.addressByPostalCode.loading || props.setZaerProfie.loading || props.passengerProfile.loading}
						onClick={props.handleClose}
						className='btn btn-outline-danger'>
						انصراف
					</button>
					<button
						disabled={props.addressByPostalCode.loading || props.setZaerProfie.loading || props.passengerProfile.loading}
						onClick={handleSubmit}
						className='btn btn-outline-success'>
						تایید نهایی اطلاعات
					</button>
				</Modal.Footer>
			</Modal>
		</>
	);
}

export default connect(
	(state: IApplicationState) => state.registration,
	registrationActions
)(GroupingModal as ComponentType<any>);
