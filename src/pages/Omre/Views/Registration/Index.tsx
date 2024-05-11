import React, { ComponentType, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { IApplicationState } from '../../../../store/state';
import { useTranslation } from 'react-i18next';
import useTitle from '../../../../hooks/useTitle';
import './ReserveAndRegister.css';
import { Link } from 'react-router-dom';
import Footer from '../../../../components/general/Footer/Footer';
import { Modal } from 'react-bootstrap';
import { registrationActions } from '../../Actions/Registration/action';
import { IRegistrationState } from '../../Actions/Registration/model';
type IProps = typeof registrationActions & IRegistrationState;

const ReserveAndRegisterIndex = (props: IProps) => {
	useTitle('mainSettings', 'reserveAndRegister');
	const [show, setShow] = useState(false);
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);
	const [t] = useTranslation();

	useEffect(() => {
		/* props.setCrumbs([
            {title: t("reserveAndRegister"), link: window.location.pathname},
        ]);*/
	}, []);
	return (
		<>
			<div className='flex overflow-hidden flex-grow-1'>
				<div className='p-4 w-full overflow-auto'>
					<div className='flex flex-col h-100 bg-white shadow-sm overflow-hidden'>
						<div className={'overflow-scrool'}>
							<div className={'reserve-head'}>
								<div className={'title title_btn_group'}>
									<Link className={'requirements-link bg-success btn-reserve-1'} to={'/tamato/reserve-step-one'}>
										برای رزرو اینجا را کلیک نمائید
									</Link>
									<button type='button' className='btn btn-danger-custom' onClick={handleShow}>
										موارد مهم را مطالعه کنید
									</button>
								</div>
								<Modal show={show} onHide={handleClose} size='xl'>
									<Modal.Header closeButton>
										<Modal.Title></Modal.Title>
									</Modal.Header>
									<Modal.Body>
										<div>
											<p className={''}>
												سازمان حج و زیارت اعلام کرد؛ با استعانت از خداوند متعال و توسل به ائمه اطهار(ع)، در نظر دارد در آینده
												نزدیک و در صورت حصول تمامی شرایط لازم، رزرو از افراد واجد شرایط تشرف به حج تمتع 1403 را آغاز نماید. بر این
												اساس به اطلاع متقاضیان محترم می‌رساند، بر مبنای پیش‌بینی صورت گرفته و به حسب ظرفیت تخصیصی به جمهوری اسلامی
												ایران، گروه‌های اشاره شده در جدول ذیل در اولویت اعزام به حج تمتع سال آتی قرار دارند.
											</p>
											<table className={'reserve-table'}>
												<thead>
													<tr>
														<th>اولویت</th>
														<th>جامعه هدف (مشمولین تشرف)</th>
														<th>ملاحظات</th>
													</tr>
												</thead>
												<tbody>
													<tr className='clickable'>
														<td>اول</td>
														<td>تمامی دارندگان قبوض ودیعه‌گذاری حج تمتع تا تاریخ 1385/12/29</td>
														<td>
															درصورت عدم انجام پیش ثبت نام این افراد، برای تکمیل ظرفیت‌ باقیمانده در هر استان، اولویت‌های بعدی
															فراخوان خواهند شد.
														</td>
													</tr>
													<tr className='clickable'>
														<td>دوم</td>
														<td>دارندگان قبوض ودیعه‌گذاری حج تمتع تا تاریخ 1386/2/31</td>
														<td></td>
													</tr>
													<tr className='clickable'>
														<td>سوم</td>
														<td>دارندگان قبوض ودیعه‌گذاری حج تمتع تا تاریخ 1386/4/31</td>
														<td></td>
													</tr>
													<tr className='clickable'>
														<td>چهارم</td>
														<td>
															کلیه دارندگان قبوض ودیعه‌گذاری حج تمتع از تاریخ 1386/5/1 بصورت روز شمار و صرفاً تا تکمیل ظرفیت تخصیص
															یافته به هر استان
														</td>
														<td>پذیرش این اولویت‌ها صرفاً بمنظور تکمیل ظرفیت خواهد بود.</td>
													</tr>
												</tbody>
											</table>
											<ul className={'notice-list'}>
												<p className={'notice'}>تذکرات مهم:</p>
												<li>
													افرادی که در کاروان های حج سال 1399 نام‌نویسی و وجوه مربوط را واریز کرده‌اند ولیکن به دلیل لغو سفر حج در
													آن سال و سال های پس از آن موفق به تشرف نشده و تاکنون نیز انصراف نداده‌اند، نیازی به انجام پیش ثبت نام
													نداشته و همزمان با اعلام ثبت نام قطعی، بصورت مستقیم امکان نامنویسی در کاروان ها را خواهند داشت.
												</li>
												<li>
													تمامی ودیعه‌گذاران حج تمتع می‌بایست قبل از انجام امور ثبت نام، نسبت به مراجعه به سامانه reserve.haj.ir
													تکمیل اطلاعات و اخذ کد رهگیری اقدام کنند، در غیر اینصورت امکان ادامه فرایند ثبت نام را نخواهند داشت.
												</li>
												<li>
													باتوجه به فراخوان‌های متعدد از ودیعه‌گذاران حج تمتع تا تاریخ 1385/12/29 ، و بمنظور رعایت حقوق سایر
													ودیعه‌گذاران در نوبت تشرف، بدینوسیله به اطلاع این دسته از افراد می‌رساند؛ چنانچه برای نام‌نویسی درکاروان
													ها و اعزام به حج سال 1403 اقدام ننمایند، در حج سنوات بعد (سال 1404 و سال های پس از آن) از اولویت اصلی
													فراخوان خارج و به اولویتهای ذخیره در هر سال منتقل خواهند شد.
												</li>
												<li>
													متقاضیان اعزام برای سفر حج تمتع سال 1403می‌بایست دارای گذرنامه حداقل با تاریخ اعتبار 1403/09/20 باشند.
												</li>
											</ul>
										</div>
									</Modal.Body>
									<Modal.Footer>
										<button onClick={handleClose} className='btn btn-outline-danger btn-sm'>
											مطالعه کردم
										</button>
									</Modal.Footer>
								</Modal>
							</div>
							<div className={'m-footer'}>
								<Footer />
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};
export default connect(
	(state: IApplicationState) => state.reserveAndRegister,
	registrationActions
)(ReserveAndRegisterIndex as ComponentType);
