import React, { ComponentType, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useParams, Link } from 'react-router-dom';
import { FormControl, Modal } from 'react-bootstrap';
import { IApplicationState } from '../../store/state';
import { reserveAndRegisterActions } from './Actions/ReserveAndRegister/action';
import { IReserveAndRegisterState } from './Actions/ReserveAndRegister/model';
import useFormControl from '../../components/general/NapFormControl/NapFormControl';
import NapAlerts from '../../components/general/NapAlerts/NapAlerts';
import NapLoading from '../../components/general/NapLoading/NapLoading';
import useTitle from '../../hooks/useTitle';
import Card from '../../components/tamato/reserveStepOne/Card';
import '../../components/tamato/reserveStepOne/ReserveAndRegister.css';

type IProps = typeof reserveAndRegisterActions & IReserveAndRegisterState;

const TamatoReserveStepOnePage = (props: IProps) => {
	const [showMoreInfo, setShowMoreInfo] = useState(false);
	const [showMoreInfoKarvan, setShowMoreInfoKarvan] = useState(false);
	const [isShowMoreInfo, setIsShowMoreInfo] = useState(false);
	const useparam = useParams();
	const [show, setShow] = useState(sessionStorage.getItem('userSawRules') ? false : true);
	const handleClose = () => {
		setShow(false);
		sessionStorage.setItem('userSawRules', 'ok');
	};
	const handleShow = () => setShow(true);
	const [allRows, setAllRows] = useState([]);
	const setRowDetailHandler = (item?: any) => {
		props.getZaerForReservation(item.codeTracking, values.nationalCode);
	};

	const { values, onChangeHandler, GetError, onFormSubmit } = useFormControl({
		nationalCode: [{ required: true, isStringNumber: true, isNationalCode: true }]
	});

	const CreateSubmitHandler = (e: any) => {
		e.preventDefault();
		if (onFormSubmit()) {
			props.getPersonInfo(values.nationalCode);
		} else {
			props.pushAlert({ title: t('userError'), description: t('DataIsIncomplete'), variant: 'warning' });
		}
	};

	useTitle('mainSettings', 'reserveAndRegister');

	const [t] = useTranslation();
	const userAccessData = {
		show: {
			service: 'settings_api',
			controller: 'ProvinceQuery',
			action: 'GetAllProvinces',
			withNoAccessPage: true
		},
		create: {
			service: 'settings_api',
			controller: 'ProvinceCommand',
			action: 'CreateProvince'
		},
		edit: {
			service: 'settings_api',
			controller: 'ProvinceCommand',
			action: 'UpdateProvince'
		}
	};

	const cancleHandler = () => {
		localStorage.removeItem('data');
		setAllRows([]);
	};

	useEffect(() => {
		props.getPersonInfo();
	}, []);

	useEffect(() => {
		if (props.zaerInfo.errors && props.zaerInfo.errors.erroeCode !== 0) {
			props.pushAlert({
				title: 'خظا در ادامه ی فرایند',
				variant: 'warning',
				description: props.zaerInfo.errors.errorMessage,
				dismissTime: 9000
			});
		}
	}, [props.zaerInfo.errors]);

	const removeRowHandler = (item: any) => {
		const getDataFromLocal = JSON.parse(localStorage.getItem('data') as any);
		const filtredLocalData = getDataFromLocal.filter((data: any) => data.nationalCode !== item.nationalCode);
		localStorage.setItem('data', JSON.stringify(filtredLocalData));
		setAllRows(filtredLocalData);
		const getDataFromLocal2 = JSON.parse(localStorage.getItem('data') as any);
		if (getDataFromLocal2.length === 0) {
			localStorage.removeItem('data');
		}
	};

	return (
		<>
			<NapLoading loading={props.personInfo.loading || props.zaerInfo.loading} />
			<NapAlerts alerts={props.alerts} clearAlerts={() => props.clearAlerts()} />
			<Modal show={show} onHide={handleClose} size='xl'>
				<Modal.Header closeButton>
					<Modal.Title></Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<div className={'import-modal-body-reserve '}>
						<div className='w-full flex justify-center'>
							<strong className={'text-danger h6 mb-4'}>
								اطلاعيه سازمان حج و زيارت درخصوص ثبت‌ نام درکاروان - های حج تمتع سال 1403
							</strong>
						</div>
						<div className='w-full flex justify-center'>
							<p>
								سازمان حج و زیارت با استعانت از درگاه خداوند متعال و توسل به پیامبر عظیم (الشأن اسلام صلی الله علیه وآله و اهل
								بیت) عصمت و طهارت علیهم السلام، و بر اساس برنامه ریزی های انجام شده ثبت‌نام از واجدین شرایط و متقاضیان اعزام به حج
								تمتع سال 1403 در کاروان‌های سراسر کشور را از ساعت 10:00 صبح روز یک‌شنبه 06/12/1402 ضمن رعایت موارد مشروح زیر آغاز
								می‌نماید:
							</p>
						</div>
						<ul className={'notice-list'}>
							<p className={'notice'}>واجدین شرایط ثبت نام:</p>
							<li>
								افرادی که بر اساس اعلام قبلی سازمان حج و زیارت با مراجعه به سامانه reserve.haj.ir اقدام به پیش ثبت نام نموده و
								واریز وجه انجام داده‌اند.
							</li>
							<li>
								افرادی که در کاروان‌های حج تمتع سال 1399 نام‌نویسی و وجوه مربوط را واریز نموده و انصراف نداده‌اند. توجه: اولویت
								ثبت نام در کاروان با واجدین شرایط مندرج در این اطلاعیه می باشد، از اینرو بمنظور رعایت حقوق این عزیزان، جهت ایجاد
								امکان بررسی و انتخاب کاروان مورد نظر فرآیند پیش ثبت‌ نام از ساعت 23:00 روز جمعه 1402/12/04 متوقف خواهد شد و این
								عزیزان از تاریخ شروع ثبت نام (1402/06/12) تا (1402/12/09) برای انتخاب کاروان و تکمیل فرآیند ثبت نام فرصت خواهند
								داشت، لیکن درصورت عدم مراجعه ایشان در بازه زمانی یاد شده و وجود ظرفیت خالی پس از پایان تاریخ مقرر، باقیمانده ظرفیت
								کاروان ها با فراخوان از اولویت های بعدی تکمیل خواهد شد.
							</li>
						</ul>
						<p>نحوه انتخاب و ثبت‌نام در کاروان:</p>
						<p>
							انتخاب کاروان و ثبت‌نام در آن با مراجعه به نشانی اینترنتی my.haj.ir و بصورت غیرحضوری بوده و متقاضیان می‌بایست ابتدا
							نسبت به انتخاب و ثبت‌نام در یکی از کاروان‌های استان محل سکونت خود مبادرت کرده و سپس حداکثر ظرف مدت 48 ساعت به دفتر
							مدیر کاروان‌ مراجعه و سایر مراحل ثبت‌نام (تحویل مدارک، انجام معاینات،اخذ تأییدیه پزشکی) را پیگیری نمایند.
						</p>
						<ul className={'notice-list'}>
							<p className={'notice mt-3'}>مدارک مورد نیاز هنگام مراجعه به دفتر مدیر کاروان به منظور قطعی نمودن ثبت‌ نام:</p>
							<li>اصل قبض ودیعه‌گذاری اولیه (بجز ثبت نام شدگان در کاروان های حج سال 1399).</li>
							<li>کارت ملی</li>
							<p className='mt-4'>
								<p className={'h6'}>توضیح:</p>
								زمان تحویل سایر مدارک مورد نیاز از قبیل: گذرنامه معتبر و عکس، پس از انجام ثبت‌نام، از طریق مدیرکاروان به متقاضی
								اعلام خواهد شد؛ تأکید می‌گردد ضروری است نسبت به آماده‌سازی گذرنامه معتبر و عکس از هم اکنون اقدام گردد. ضمناً تمامی
								متقاضیان اعزام برای سفر حج تمتع سال 1403می‌بایست دارای گذرنامه حداقل با تاریخ اعتبار1403/09/20 باشند.
							</p>
							<p className={'h6'}>هزينه تشرف:</p>
							<p>
								هزینه قطعی این سفر معنوی بر مبنای مخارج ارزی و ریالی برای هر زائر محاسبه و مبلغ نهایی آن متناسب با گروه قیمتی هر
								کاروان تعیین شده ‌است. ضروری است پس از انتخاب کاروان مورد نظر، مبلغ باقیمانده هزینه سفر حداکثر ظرف یک هفته از طریق
								سامانه‌ حج و زیارت به نشانی my.haj.ir پرداخت گردد.
							</p>
						</ul>
						<p className={'notice mt-3'}>تذکرات مهم:</p>
						<ol>
							<li>
								قطعی شدن ثبت¬نام در کاروان منوط به ارائه مدارک در مهلت مقرر (48 ساعت پس از انتخاب کاروان) به مدیر‌کاروان می‌باشد،
								در غیر اینصورت رزرو و ثبت‌نام اولیه در کاروان انتخابی (به دلیل عدم تکمیل مراحل) ، باطل و منصرف تلقی شده، ظرفیت
								خالی کاروان برای سایر اولویت‌ها باز می‌گردد.
							</li>
							<li>به محض تکمیل ظرفیت، عملیات ثبت¬نام در کاروان‌ها و متعاقب آن در سطح استان متوقف خواهد شد.</li>
							<li>
								انتخاب و ثبت‌نام متقاضی در کاروان‌هایی میسر خواهد ‌بود که با اطلاعات درج شده متقاضی از حیث استان، شهرستان محل
								اعزام و مذهب در مرحله فراخوان سامانه
								<a href='http://reserve.haj.ir'> reserve.haj.ir </a>
								مطابقت داشته باشد.
							</li>
							<li>
								متقاضیان پس از قطعی نمودن ثبت‌ نام باید رسید مربوطه را از مدیر کاروان دریافت و ضمن مطالعه مندرجات آن، رسید ثبت‌
								نام را نزد خود نگهداری نمایند.
							</li>
							<li>
								چنانچه متقاضی پس از ثبت‌ نام قطعی در مهلت اعلام شده از سوی کاروان نسبت به انجام سایر مراحل اقدام نکند، منصرف از
								سفر تلقی شده و ثبت نام وی در کاروان بصورت یک طرفه و سیستمی ابطال می‌گردد و درصورت تمایل به ثبت نام مجدد می بایست،
								مراحل را مجدداً در سایر ظرفیت های خالی دنبال نماید.
							</li>
							<li>
								متقاضیان محترم، می بایست پس از اعلام مدیر کاروان به پزشک و یا مراکز پزشکی که از سوی ایشان معرفی می‌گردد، مراجعه و
								درصورت تأیید سلامت و توان جسمی، مراحل نهایی سفر خود را دنبال نمایند؛ بدیهی است درصورت عدم مراجعه به موقع به پزشک و
								انجام معاینات مربوطه و یا عدم تأیید استطاعت بدنی، فرآیند ثبت‌ نام و اعزام متوقف و سایر افراد حائز شرایط جایگزین
								خواهند شد.
							</li>
							<li>
								آن دسته از متقاضیان اعزام به حج تمتع، در صورتیکه احتمال می دهند ممنوع‌الخروج باشند، در اولین فرصت با مراجعه به
								مراکز مربوطه از وضعیت خروج خود اطمینان حاصل نمایند. بدیهی است جبران و پرداخت هرگونه خسارات مالی احتمالی در این‌
								خصوص بر عهده شخص متقاضی خواهد بود.
							</li>
						</ol>
						<p className={'notice mt-3'}>نحوه پرداخت وجه قرباني زائران:</p>
						<p>
							پس از توافق با بانك توسعه اسلامي و نهايي شدن میزان وجه قربانی، مراتب از طریق مدیر کاروان به اطلاع زائرین خواهد رسيد
							تا نسبت به واریز مبلغ آن به حسابی که از سوی سازمان اعلام می‌شود، اقدام نمایند.
						</p>
						<ol>
							<p className={'h6'}>برای آگاهی بیشتر متقاضیان محترم تشرف اعلام می گردد:</p>
							<li>
								با توجه به اینکه در حج تمتع بسیاری از امور از جمله اجاره مسکن حجاج بر اساس مقررات وزارت حج و عمره کشور میزبان
								ساماندهی و به اجرا گذاشته می‌شود و سازمان حج و زیارت برای انتخاب هتل‌ها و یا تقسیم ظرفیت‌ها با محدودیت‌هایی
								روبروست؛ بنابراین سرانه زائری اسكان حجاج در مدينه منوره و مكه مكرمه حدود چهار متر مربع و حداکثر برای اسکان 5 نفر
								در هر اتاق در هتل های مدینه منوره و 4 نفر در هر اتاق در هتل های مکه مکرمه، نسبت به تأمین محل اسکان حجاج اقدام
								نموده است.
							</li>
							<li>
								سازمان حج و زیارت تلاش نموده است تا اسکان حجاج در مدینه منوره را در نزدیک ترین هتل ها به حرم نبوی شریف (منطقه
								مرکزی) فراهم نماید، لیکن در مکه مکرمه با عنایت به شرایط خاص جغرافیائی اسکان، هتل های مورد استفاده حجاج در مناطق
								مختلف می باشد که با توجه به بعد مسافت تا مسجدالحرام، زائران گرامی برای تشرف به حرم از اتوبوس‌های مخصوص زائران
								ایرانی که از مناطق مختلف به ایستگاه‌های اطراف حرم تردد می‌نمایند، استفاده ‌خواهند نمود.
							</li>
							<li>
								با عنايت به مطالب فوق، هزينه مسكن هر زائر با توجه به محل اسکان در مدينه منوره و مكه مکرمه محاسبه و تعيين گرديده
								است. بنابراین يكي از دلايل اساسی تفاوت هزينه‌هاي هر كاروان، مكان اقامت آنان در هر يك از دو شهر مذكور مي¬باشد.
							</li>
							<li>
								تفاوت هزينه‌هاي كاروان‌ها ناشي از اختلاف گروه قیمتی محل اسکان حجاج (براساس امتیاز بندی انجام شده) و میانگین بازه
								زمانی سفر مي‌باشد؛ از این‌ رو به متقاضیان محترم توصيه مي‌شود از ابتدا دقت كافي در انتخاب كاروان خود را داشته
								باشند؛ زیرا بدلیل ایجاد مشکلات اجرایی، جابه‌جایی زائر از کاروانی به کاروان دیگر مقدور نخواهد بود.
							</li>
						</ol>
					</div>
				</Modal.Body>
				<Modal.Footer>
					<button onClick={handleClose} className='btn btn-outline-danger btn-sm'>
						مطالعه کردم
					</button>
				</Modal.Footer>
			</Modal>
			<div className='flex  flex-grow-1 cc'>
				<div className='p-4 w-full  respons-style'>
					<div className='flex flex-col h-100 reserve-parent-custom-style '>
						<div className={'form-parent'}>
							<form onSubmit={CreateSubmitHandler} className={'reserve-form'}>
								<div className='reserve-header'>
									<div className='form-group  custom-style-form-section'>
										<label htmlFor='nationalCode'>اضافه کردن همراه:</label>
										<div className={'input-filed'}>
											<input
												data-toggle='tooltip'
												data-placement='top'
												title='برای افزودن همراه از این قسمت استفاده کنید.'
												className=' custom-style-form-input'
												name='nationalCode'
												placeholder={t('nationalCode')}
												onChange={e => {
													onChangeHandler(e);
												}}
											/>
											<button type={'submit'} className='reserve-recovery-submit'>
												{t('recovery')}
											</button>
										</div>
										<p className={'tooltip-reserve-text'}>برای افزودن همراه از این قسمت استفاده کنید.</p>
									</div>
									<div onClick={handleShow} className='reserve-recovery-important-points'>
										موارد مهم
									</div>
								</div>
							</form>
							<div className={'w-full'}>
								<h5 className={'table-title'}>اطلاعات اشخاص</h5>
								{props.personInfo.data && props.personInfo.data.length > 0 ? (
									props.personInfo.data.map((item, intdex) => (
										<div className={'karvan-info-parent'}>
											<div className={'karvan-info-container'}>
												<div className={'karvan__info__section__one'}>
													<div className={'karvan__info__section'}>
														<div className={'karvan__info'}>
															<p className={'karvan__info__title'}> کد شعبه :</p>
															<p>{item.branchCode}</p>
														</div>
														<div className={'karvan__info'}>
															<p className={'karvan__info__title'}> نام :</p>
															<p>
																{item.firstName} {item.lastName}
															</p>
														</div>
													</div>
													<div className={'karvan__info__section'}>
														<div className={'karvan__info'}>
															<p className={'karvan__info__title'}> تاریخ اولویت :</p>
															<p>{item.olaveyatDate}</p>
														</div>
														<div className={'karvan__info'}>
															<p className={'karvan__info__title'}> ودیعه :</p>
															<p>{item.vadie}</p>
														</div>
													</div>
												</div>
											</div>
											<div className={'karvan_button'}>
												<button onClick={() => setRowDetailHandler(item)} className={'chose__karvan__btn'}>
													انتخاب
												</button>
											</div>
										</div>
									))
								) : (
									<p className={'err-msg'}>سندی در نتایج جستجو یافت نشد یا تکمیل اطلاعات انجام نشده است</p>
								)}
							</div>
						</div>
						{localStorage.getItem('data') && JSON.parse(localStorage.getItem('data') as string) !== null ? (
							<>
								{props.zaerInfo.data && JSON.parse(localStorage.getItem('data') as any) ? (
									<h5 className={'table-title'}>اطلاعات گروه ها</h5>
								) : (
									''
								)}

								<div className={'reserve-group-parent'}>
									{props.zaerInfo.data && localStorage.getItem('data')
										? JSON.parse(localStorage.getItem('data') as any).map((item: any, index: number) => (
												<Card props={item} value={values} index={index} />
											))
										: ''}
								</div>
								{props.zaerInfo.data && JSON.parse(localStorage.getItem('data') as any) ? (
									<div className='actions-custom-style'>
										<Link to={'/tamato/reserve-step-two'}>
											<button className={'chose__karvan__btn__xl'}>انتخاب کاروان</button>
										</Link>
										<button onClick={() => cancleHandler()} className={'chose__karvan__btn__xl'}>
											انصراف
										</button>
									</div>
								) : (
									''
								)}
							</>
						) : (
							''
						)}
					</div>
				</div>
			</div>
		</>
	);
};
export default connect(
	(state: IApplicationState) => state.reserveAndRegister,
	reserveAndRegisterActions
)(TamatoReserveStepOnePage as ComponentType);
