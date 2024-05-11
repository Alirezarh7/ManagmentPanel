import { ComponentType, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { IApplicationState } from '../../store/state';
import { reserveAndRegisterActions } from './Actions/ReserveAndRegister/action';
import { IReserveAndRegisterState } from './Actions/ReserveAndRegister/model';
import '../../components/tamato/print/ReserveAndRegister.css';

type IProps = typeof reserveAndRegisterActions & IReserveAndRegisterState;

const TamatoPrintPage = (props: IProps) => {
	useEffect(() => {
		window.print();
	}, []);
	return (
		<div className='w-full max-w-screen-xl m-auto flex flex-grow-1 confirm-parent'>
			<h4 className={'form_print_title'}>برگه پذیرش اولیه رزرو اینترنتی زائر در کاروان حج تمتع 1403</h4>
			<div className={'form_print_parent'}>
				<div className={'form_print_section'}>
					<h6>مشخصات کاروان</h6>
					<p className={'form_print_info'}>
						<div className={'form_print_info_smal'}>
							نام مدیر کاروان:
							<span>{props.printData.data.printReserve && props.printData.data.printReserve.managerName}</span>
						</div>
						<div className={'form_print_info_smal'}>
							شماره کاروان :<span>{props.printData.data.printReserve && props.printData.data.printReserve.karevanNo}</span>
						</div>
						<div className={'form_print_info_smal'}>
							مدینه :<span>{props.printData.data.printReserve && props.printData.data.printReserve.medineh}</span>
						</div>
					</p>
					<p className={'form_print_info'}>
						<div className={'form_print_info_smal '}>
							استان :<span>{props.printData.data.printReserve && props.printData.data.printReserve.provinceAddress}</span>
						</div>
						<div className={'form_print_info_smal '}>
							شهر:
							<span>{props.printData.data.printReserve && props.printData.data.printReserve.cityAddress}</span>
						</div>
						<div className={'form_print_info_smal '}>
							تلفن :<span>{props.printData.data.printReserve && props.printData.data.printReserve.karevanTel}</span>
						</div>
					</p>
					<div className={'form_print_info_smal addres-print'}>
						آدرس :<span>{props.printData.data.printReserve && props.printData.data.printReserve.karevanAddress}</span>
					</div>
				</div>
			</div>
			<div className={'form_print_parent'}>
				<div className={'form_print_section'}>
					<h6> مشخصات زائر ثبت نام شده</h6>
					<p className={'form_print_info'}>
						<div className={'form_print_info_smal'}>
							نام و نام خانوادگی :<span>{props.printData.data.printReserve && props.printData.data.printReserve.fullName}</span>
						</div>
						<div className={'form_print_info_smal'}>
							فرزند :<span>{props.printData.data.printReserve && props.printData.data.printReserve.fatherName}</span>
						</div>
					</p>
					<p className={'form_print_info'}>
						<div className={'form_print_info_smal'}>
							کد ملی :<span>{props.printData.data.printReserve && props.printData.data.printReserve.nationalCode}</span>
						</div>
						<div className={'form_print_info_smal'}>
							شماره سند ودیعه :<span>{props.printData.data.printReserve && props.printData.data.printReserve.vadie}</span>
						</div>
						<div className={'form_print_info_smal'}>
							تاریخ سند ودیعه :<span>{props.printData.data.printReserve && props.printData.data.printReserve.olaveytDate}</span>
						</div>
					</p>
				</div>
			</div>
			<div className={'form_print_parent'}>
				<div className={'form_print_section'}>
					<h6> مشخصات پزشک</h6>
					<p className={'form_print_info'}>
						<div className={'form_print_info_smal'}>
							نام و نام خانوادگی پزشک :
							<span>{props.printData.data.printReserve && props.printData.data.printReserve.doctorName}</span>
						</div>
						<div className={'form_print_info_smal'}>
							تلفن :<span>{props.printData.data.printReserve && props.printData.data.printReserve.doctorNumber}</span>
						</div>
						<div className={'form_print_info_smal'}>
							آدرس :<span>{props.printData.data.printReserve && props.printData.data.printReserve.doctorAddress}</span>
						</div>
					</p>
				</div>
			</div>
			<div className={'print_footer'}>
				<p className={'print_footer_title'}>
					زائر محترم، بدین‌وسیله از جنابعالی در کاروان فوق‌الذکر ثبت‌نام اولیه به عمل آمده است، لیکن بمنظور قطعی شدن ثبت‌ نام شما،
					می‌بایست مراحل ذیل در اسرع وقت انجام و پیگیری گردد.
				</p>
				<ol className={'ul_number_style'}>
					<li>
						تحویل مدارک لازم برای ثبت‌نام قطعی شامل:
						<ul>
							<li>اصل قبض ودیعه‌گذاری (ثبت نامی های سال 1399 نیازی به ارائه آن ندارند)</li>
							<li>
								ارائه دو قطعه عکس 4×6 تمام رخ، بدون کلاه و عینک با زمینه روشن و پشت‌نویسی شده که از تاریخ آن بیش از شش ماه نگذشته
								باشد.
							</li>
							<li>ارائه اصل کارت ملی</li>
							<li>
								داشتن گذرنامه انفرادی که اعتبار آن حداقل تا بیستم آذر 1403 بوده و دارای حداقل 2 صفحه سفید باشد؛ باتوجه به ضیق وقت
								از هم اکنون نسبت به تهیه، تمدید و آماده نمودن گذرنامه اقدام لازم مبذول نمائید.
							</li>
						</ul>
					</li>
					<li>
						دریافت معرفینامه و کد پیگیری ارجاع پزشکی و مراجعه به پزشک و مراکز پزشکی مورد تأیید و معرفی شده ازسوی مرکز پزشکی حج و
						زیارت به همراه کارت ملی
					</li>
					<li>واریز مابه‌التفاوت احتمالی هزینه سفر بصورت الکترونیکی از طریق منوی مربوطه در سامانه ثبت نام در مهلت تعیین شده.</li>
				</ol>
				<p className={'print_footer_title'}>تذکرات:</p>
				<ol>
					<li>
						درصورت عدم واریز وجه مابه التفاوت یا عدم مراجعه به مراکز پزشکی درزمان مقرر یا عدم تحویل هر یک از مدارک مورد نیاز در
						فرصت مقرر، بنابر مفاد تعهدنامه سیستمی که به رویت و تأیید متقاضی رسیده است، سازمان مجاز به حذف نام‌نویسی فرد از کاروان
						و جایگزین نمودن ایشان بصورت یکطرفه خواهد بود.
					</li>
					<li>
						چنانچه فرد پس از واریز وجه مابه التفاوت هزینه سفر، قصد انصراف از تشرف داشته باشد، می‌بایست در اسرع وقت با مراجعه به
						مدیرکاروان و اعلام کتبی انصراف، نسبت به دریافت وجوه واریزی قابل استرداد و سپس مراحل پایداری قبض حج تمتع خویش را وفق
						ضوابط مالی سازمان حج و زیارت، دنبال نماید.
					</li>
				</ol>
			</div>
			<button className='btn btn-sm btn-primary danger-btn-custom '>
				<Link to={'/tamato/my-documents'} className={'color-white'}>
					بازگشت
				</Link>
			</button>
		</div>
	);
};

export default connect(
	(state: IApplicationState) => state.reserveAndRegister,
	reserveAndRegisterActions
)(TamatoPrintPage as ComponentType);
