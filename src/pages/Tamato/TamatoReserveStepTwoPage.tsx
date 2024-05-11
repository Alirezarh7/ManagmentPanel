import { ComponentType, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import Select from 'react-select';
import { Modal } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { IApplicationState } from '../../store/state';
import { IReserveAndRegisterState } from './Actions/ReserveAndRegister/model';
import { reserveAndRegisterActions } from './Actions/ReserveAndRegister/action';
import useFormControl from '../../components/general/NapFormControl/NapFormControl';
import useGridControl from '../../components/general/NapGridControl/NapGridControl';
import NapAlerts from '../../components/general/NapAlerts/NapAlerts';
import NapLoading from '../../components/general/NapLoading/NapLoading';
import { madineOptions } from '../../shareData';

type IProps = typeof reserveAndRegisterActions & IReserveAndRegisterState;

const TamatoReserveStepTwoPage = (props: IProps) => {
	const [showMoreInfoKarvan, setShowMoreInfoKarvan] = useState(false);
	const [show, setShow] = useState(false);
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const [showA, setShowA] = useState(true);
	const [showB, setShowB] = useState(true);

	const toggleShowA = () => setShowA(!showA);
	const toggleShowB = () => setShowB(!showB);
	const [showMoreInfo, setShowMoreInfo] = useState(false);

	const [isShowUsers, setIsShowUsers] = useState(false);
	const [isShowPrintData, setIsShowPrintData] = useState(JSON.parse(localStorage.getItem('validReserve') as any));
	const [isShowResult, setIsSowResult] = useState(false);
	const [rowSelected, setRowSelected] = useState<any>(null);
	const [priceFrom, setPriceFrom] = useState({ lable: null, value: null });
	const [priceTo, setPriceTo] = useState({ lable: null, value: null });
	const zaerCount = JSON.parse(localStorage.getItem('data') as any) ? JSON.parse(localStorage.getItem('data') as any).length : 0;
	const provinceAddressId = JSON.parse(localStorage.getItem('data') as any);
	const getReligionFromLocal = JSON.parse(localStorage.getItem('data') as any);

	let religionNumber = '0';
	if (getReligionFromLocal) {
		getReligionFromLocal.map((item: any) => {
			if (item.religion === 1) {
				religionNumber = '1';
			} else if (item.religion === 2) {
				religionNumber = '2';
			} else if (item.religion === 3) {
				religionNumber = '3';
			}
		});
	}

	const [showResult, setShowResult] = useState<any>(false);
	const [t] = useTranslation();
	const { values, onFormSubmit, onChangeHandler, GetError, setValue, GetRequired } = useFormControl({
		convoyNumber: [{ required: false }, { isStringNumber: true }],
		address: [{ required: false }]
	});

	const { publicContextMenu } = useGridControl();

	useEffect(() => {
		props.getPriceList(JSON.parse(localStorage.getItem('data') as string)[0].provinceId);
		const cityAddressIdList = JSON.parse(localStorage.getItem('data') as any).map((item: any) => {
			return item.cityAddressId;
		});
		let religonPersons = JSON.parse(localStorage.getItem('data') as any).map((person: any) => {
			if (person.religion === 1) {
				return 1;
			} else if (person.religion === 2) {
				return 2;
			}
		});
		let resultReligon;
		if (religonPersons.includes(1) && religonPersons.includes(2)) {
			resultReligon = 3;
		} else if (religonPersons.includes(1)) {
			resultReligon = 1;
		} else if (religonPersons.includes(2)) {
			resultReligon = 2;
		}
		props.getResultSerchKarvan(
			zaerCount,
			provinceAddressId[0].provinceId,
			0,
			0,
			'',
			0,
			'',
			0,
			resultReligon,
			1,
			10,
			cityAddressIdList
		);
	}, []);

	const CreateSubmitHandler = (e: any) => {
		e.preventDefault();
		if (onFormSubmit()) {
			const cityAddressIdList = JSON.parse(localStorage.getItem('data') as any).map((item: any) => {
				return item.cityAddressId;
			});
			props.getResultSerchKarvan(
				zaerCount,
				provinceAddressId[0].provinceId,
				priceFrom ? priceFrom.value : '',
				priceTo ? priceTo.value : '',
				values.managerName,
				Number(values.convoyNumber),
				values ? values.address : '',
				values.birthProvince ? values.birthProvince.value : '',
				Number(religionNumber),
				1,
				10,
				cityAddressIdList
			);
		}
	};

	const confirmationReservation = () => {
		handleClose();
		setRowSelected(null);
		let personInformation = [] as any;
		const getPersonsInfo = JSON.parse(localStorage.getItem('data') as any);
		getPersonsInfo &&
			getPersonsInfo.map((item: any) => {
				let x = {
					firstName: item.firstName,
					lastName: item.lastName,
					fatherName: item.fatherName,
					zaerNumber: item.zaerNumber,
					provinceId: item.provinceId,
					nationalCode: item.nationalCode,
					mobileNo: item.mobileNo
				};
				personInformation.push(x);
			});
		props.createReserveZaer(
			personInformation,
			zaerCount,
			rowSelected.karevanId,
			rowSelected.tel,
			rowSelected.karevanNo,
			'KarevanList'
		);

		setIsSowResult(true);
		setIsShowUsers(true);
		setTimeout(() => {
			localStorage.removeItem('data');
		}, 3000);
	};

	const history = useNavigate();
	const printData = (item: any) => {
		props.getPrintReserveData(item.codeTracking, item.nationalCode, history);
		localStorage.setItem('print', JSON.stringify(item));
	};

	const hendelSetRow = (item: any) => {
		setRowSelected(item);
		handleShow();
	};

	return (
		<>
			<NapLoading loading={props.resultSerchKarvanList.loading} />
			<div className='flex flex-grow-1 custom-style-container-parent'>
				<NapAlerts alerts={props.alerts} clearAlerts={() => props.clearAlerts()} />
				<div className='p-4 custom-style-container'>
					{show ? (
						''
					) : (
						<div className={'persons-parent'}>
							<h4 className={'persons-data-title'}>اطلاعات اشخاص : </h4>
							{localStorage.getItem('data') &&
								JSON.parse(localStorage.getItem('data') as any).map((item: any) => (
									<>
										<div>
											<div className={'person-infos '}>
												نام:
												<span className={'one-result-data'}>
													{item.firstName} - {item.lastName}
												</span>
												شهر :<span className={'one-result-data'}>{item.provinceName}</span>
												کدملی :<span className={'one-result-data'}>{item.nationalCode}</span>
											</div>
										</div>
									</>
								))}
						</div>
					)}

					<section className='accordion'>
						<div className='tab'>
							<input type='checkbox' name='accordion-1' id='cb2' className={'input__check_show_search'} />
							<label htmlFor='cb2' className='tab__label'>
								جستجوی کاروان
							</label>
							<div className='tab__content'>
								<form onSubmit={CreateSubmitHandler} className='mt-3 row'>
									<div className='form-group col-lg-4'>
										<label htmlFor='pricefrom'>{t('priceFrom')}</label>
										<Select
											isRtl={true}
											options={props.priceKarvanList.data}
											onChange={e => setPriceFrom(e)}
											/* onChange={(data: any) => {
                                                 setValue("pricefrom", props.priceKarvanList.data);
                                             }}*/
											placeholder={t('priceFrom')}
										/>
										<GetError name='pricefrom' />
									</div>
									<div className='form-group col-lg-4'>
										<label htmlFor='priceTo'>{t('priceTo')}</label>
										<Select
											isRtl={true}
											options={props.priceKarvanList.data}
											onChange={e => setPriceTo(e)}
											placeholder={t('priceTo')}
										/>
									</div>
									<div className='form-group col-lg-4'>
										<label htmlFor='birthProvince'>{t('madine')}</label>
										<Select
											isRtl={true}
											onChange={(data: any) => {
												setValue('birthProvince', data);
											}}
											placeholder={t('madine')}
											options={madineOptions}
										/>
									</div>
									<div className='form-group col-lg-4'>
										<label htmlFor='firstName'>{t('convoyNumber')}</label>
										<input
											className='form-control form-control-sm'
											type='text'
											name='convoyNumber'
											onChange={e => {
												onChangeHandler(e);
											}}
											placeholder={t('convoyNumber')}
										/>
									</div>
									<div className='form-group col-lg-4'>
										<label htmlFor='managerName'>{t('managerName')}</label>
										<input
											className='form-control form-control-sm'
											type='text'
											name='managerName'
											onChange={e => {
												onChangeHandler(e);
											}}
											placeholder={t('managerName')}
										/>
									</div>
									<div className='form-group col-lg-4'>
										<label htmlFor='address'>{t('address')}</label>
										<input
											className='form-control form-control-sm'
											type='text'
											name='address'
											onChange={e => {
												onChangeHandler(e);
											}}
											placeholder={t('address')}
										/>
									</div>
									<div className='text-left mt-3 w-full'>
										<button type='submit' className='chose__karvan__btn'>
											جستجو کاروان
										</button>
									</div>
								</form>
							</div>
						</div>
					</section>
					<div className={'show-result-container'}>
						{rowSelected && (
							<div className='p-3 m-4 w-full'>
								<div className='flex items-end justify-end'>
									<Modal show={show} onHide={handleClose} size='lg'>
										<Modal.Header closeButton>
											<Modal.Title>تایید رزرو</Modal.Title>
										</Modal.Header>
										<Modal.Body>
											<div>
												<p>
													زائر گرامی ادرس کاروان انتخاب شده با محل سکونت شما مطابقت دارد ؟ در صورت عدم مطابقت مسئولیت ثبت نام به
													عهده خودتان می باشد
												</p>
												<p className={'all-result-data mt-4'}>
													شماره کاروان:
													<span className={'one-result-data'}>{rowSelected.karevanNo}</span>/ نام مدیر :
													<span className={'one-result-data'}>{rowSelected.manager}</span>/ مدینه :
													<span className={'one-result-data'}>{rowSelected.med}</span>
												</p>
												<p className={'all-result-data mt-4'}>
													گروه قیمتی مدینه :<span className={'one-result-data'}>{rowSelected.priceGroupMedina}</span>/ گروه قیمتی
													مکه :<span className={'one-result-data'}>{rowSelected.priceGroupMecca}</span>
													قیمت :<span className={'one-result-data'}>{rowSelected.price.toLocaleString()}</span>/
												</p>
												<p className={'all-result-data mt-4'}>
													آدرس کاروان :<span className='one-result-data'>{rowSelected.address}</span>
												</p>
											</div>
										</Modal.Body>
										<Modal.Footer>
											<button onClick={handleClose} className='btn btn-outline-danger btn-sm'>
												انصراف از ادامه عملیات
											</button>
											<button onClick={() => confirmationReservation()} className='btn btn-outline-success mx-3 btn-sm'>
												تایید جهت رزرو
											</button>
										</Modal.Footer>
									</Modal>
								</div>
							</div>
						)}
					</div>

					{isShowPrintData ? (
						<div className={'reserve-parent'}>
							<h5 className={'reserve-title'}> اطلاعات اشخاص</h5>
							{JSON.parse(localStorage.getItem('data') as any).map((item: any) => (
								<>
									<div className={'reserve-person-item'}>
										<div className={'person-infos'}>
											نام:
											<span className={'one-result-data'}>
												{item.firstName} - {item.lastName}
											</span>
											شهر :<span className={'one-result-data'}>{item.provinceName}</span>
											کدملی :<span className={'one-result-data'}>{item.nationalCode}</span>
										</div>
										<div onClick={() => printData(item)} className='btn btn-md btn-success cursor-pointer'>
											چاپ
										</div>
									</div>
								</>
							))}
						</div>
					) : (
						''
					)}

					{props.resultSerchKarvanList.data.length !== 0 ? (
						props.resultSerchKarvanList.data.map(item => (
							<div className={'karvan-info-parent'}>
								<div className={'karvan-info-container'}>
									<div className={'karvan__info__section__one'}>
										<div className={'karvan__info__section'}>
											<div className={'karvan__info'}>
												<p className={'karvan__info__title'}> شماره کاروان :</p>
												<p>{item.karevanNo}</p>
											</div>
											<div className={'karvan__info'}>
												<p className={'karvan__info__title'}> مدینه :</p>
												<p>{item.med}</p>
											</div>
										</div>
										<div className={'karvan__info__section'}>
											<div className={'karvan__info'}>
												<p className={'karvan__info__title'}> قیمت :</p>
												<p>{item.price.toLocaleString()}</p>
											</div>
											<div className={'karvan__info'}>
												<p className={'karvan__info__title'}> مذهب :</p>
												<p>{item.religon}</p>
											</div>
										</div>
										<div className={'karvan__info__section'}>
											<div className={'karvan__info'}>
												<p className={'karvan__info__title'}> نوع کاروان :</p>
												<p>{item.karevanType}</p>
											</div>
											<div className={'karvan__info'}>
												<p className={'karvan__info__title'}> مدیر کاروان :</p>
												<p>{item.manager}</p>
											</div>
										</div>
									</div>
									<div className={'karvan__info__section__one mt-2'}>
										<div className={'karvan__info__section'}>
											<div className={'karvan__info'}>
												<p className={'karvan__info__title'}> ظرفیت خالی :</p>
												<p>{item.freeCap}</p>
											</div>
											<div className={'karvan__info'}>
												<p className={'karvan__info__title'}> ظرفیت کاروان :</p>
												<p>{item.capacity}</p>
											</div>
											<div className={'karvan__info'}>
												<p className={'karvan__info__title'}>تاریخ حدودی پرواز : </p>
												<p>{item.depositeDateDescription ? item.depositeDateDescription : '___'}</p>
											</div>
											<div className={'karvan__info'}>
												<p className={'karvan__info__title'}>گروه قیمتی مدینه :</p>
												<p>{item.priceGroupMedina}</p>
											</div>
											<div className={'karvan__info'}>
												<p className={'karvan__info__title'}>گروه قیمتی مکه :</p>
												<p>{item.priceGroupMecca}</p>
											</div>
										</div>
									</div>
									<div className={'more__info__text'} onClick={() => setShowMoreInfoKarvan(true)}>
										اطلاعات کاروان
										<svg
											xmlns='http://www.w3.org/2000/svg'
											fill='none'
											viewBox='0 0 24 24'
											stroke-width='1.5'
											stroke='currentColor'
											className='svg__moreinfo'>
											<path stroke-linecap='round' stroke-linejoin='round' d='m19.5 8.25-7.5 7.5-7.5-7.5' />
										</svg>
									</div>
									<div className={`${showMoreInfoKarvan ? 'karvan__info__section__more' : 'hidden'}`}>
										<div className={'karvan__info__section'}>
											<div className={'karvan__info__section'}>
												<div className={'karvan__info'}>
													<p className={'karvan__info__title'}>نام هتل مدینه :</p>
													<p>{item.medinaHotelName}</p>
												</div>
												<div className={'karvan__info'}>
													<p className={'karvan__info__title'}> هتل مدینه : </p>
													<a target='_blank' href={item.medinaHotelLink} className={'hotel__icon'}>
														<svg
															xmlns='http://www.w3.org/2000/svg'
															fill='none'
															viewBox='0 0 24 24'
															stroke-width='1.5'
															stroke='currentColor'
															className='svg__moreinfo__hotel'>
															<path
																stroke-linecap='round'
																stroke-linejoin='round'
																d='m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25'
															/>
														</svg>
													</a>
												</div>
												<div className={'karvan__info'}>
													<p className={'karvan__info__title'}>نام هتل مکه :</p>
													<p>{item.meccaHotelName}</p>
												</div>
												<div className={'karvan__info'}>
													<p className={'karvan__info__title'}> هتل مکه : </p>
													<a target='_blank' href={item.meccaHotelLink} className={'hotel__icon'}>
														<svg
															xmlns='http://www.w3.org/2000/svg'
															fill='none'
															viewBox='0 0 24 24'
															stroke-width='1.5'
															stroke='currentColor'
															className='svg__moreinfo__hotel'>
															<path
																stroke-linecap='round'
																stroke-linejoin='round'
																d='m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25'
															/>
														</svg>
													</a>
												</div>
												<div className={'karvan__info'}>
													<p className={'karvan__info__title'}>تلفن : </p>
													<p>{item.tel}</p>
												</div>
											</div>
										</div>
										<div className={'karvan__info__addres mt-2 '}>
											<p className={'karvan__info__title'}> آدرس : </p>
											<p>{item.address}</p>
										</div>
										<div className={'more__info__text'} onClick={() => setShowMoreInfoKarvan(false)}>
											بستن
											<svg
												xmlns='http://www.w3.org/2000/svg'
												fill='none'
												viewBox='0 0 24 24'
												stroke-width='1.5'
												stroke='currentColor'
												className='svg__moreinfo'>
												<path stroke-linecap='round' stroke-linejoin='round' d='M6 18 18 6M6 6l12 12' />
											</svg>
										</div>
									</div>
								</div>
								<div className={'karvan_button'}>
									<button onClick={() => hendelSetRow(item)} className={'chose__karvan__btn'}>
										انتخاب
									</button>
								</div>
							</div>
						))
					) : (
						<p className={'err-msg'}>کاروانی یافت نشد</p>
					)}
				</div>
			</div>
		</>
	);
};

export default connect(
	(state: IApplicationState) => state.reserveAndRegister,
	reserveAndRegisterActions
)(TamatoReserveStepTwoPage as ComponentType);
