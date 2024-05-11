import React, { ComponentType, useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import { IApplicationState } from '../../../../../store/state';
import { registrationActions } from '../../../Actions/Registration/action';
import { Link, useNavigate } from 'react-router-dom';
import { IRegistrationState } from '../../../Actions/Registration/model';
import Ziarat from '../../../../../assets/ziarat.png';
import './Print.css';
import { useReactToPrint } from 'react-to-print';
import { preProcessFile } from 'typescript';

type IProps = typeof registrationActions & IRegistrationState;

const Print = (props: IProps) => {
	const history = useNavigate();
	const arryData = props.getPrintDetailList.data;
	console.log(arryData);
	useEffect(() => {
		props.GetPrintReserve();
	}, []);
	console.log(props.getPrintDetailList.data);
	const contentToPrint = useRef(null);
	const handlePrint = useReactToPrint({
		removeAfterPrint: true
	});

	return (
		<div ref={contentToPrint} className='container print-container'>
			<div className='flex justify-around '>
				<div>
					<img src={Ziarat} style={{ width: '150px', height: '150px' }} alt={''} />
				</div>
			</div>
			<div style={{ marginTop: '50px' }}>
				<div className='flex justify-start mb-4'>
					<strong>مشخصات ثبت نام</strong>
				</div>
				<div className={'row mt-2'}>
					<div className={'col'}>
						<p className={'karvan__info__title mx-2'}>
							کد رهگیری : {props.getPrintDetailList.data && props.getPrintDetailList.data.refCode}{' '}
						</p>
						<p></p>
					</div>
					<div className={'col'}>
						<p className={'karvan__info__title mx-2'}>
							تاریخ ثبت نام : {props.getPrintDetailList.data && props.getPrintDetailList.data.regDate}
						</p>
						<p></p>
					</div>
					<div className={'col'}>
						<p className={'karvan__info__title mx-2'}>
							{' '}
							ساعت ثبت نام : {props.getPrintDetailList.data && props.getPrintDetailList.data.regTime}
						</p>
						<p></p>
					</div>
				</div>
				<div className={'row mt-2'}>
					<div className={'col'}>
						<p className={'karvan__info__title mx-2'}> </p>
					</div>
					<div className={'col'}>
						<p className={'karvan__info__title mx-2'}>
							{' '}
							کاروان ثبت نامی : {props.getPrintDetailList.data && props.getPrintDetailList.data.mainOffice}
						</p>
						<p> </p>
					</div>
					<div className={'col'}>
						<p className={'karvan__info__title mx-2'}>
							{' '}
							نام سرگروه : {props.getPrintDetailList.data && props.getPrintDetailList.data.mainManager}
						</p>
						<p></p>
					</div>
				</div>
			</div>
			<div>
				<div className='flex justify-start'>
					<strong className='mb-4'>مشخصات گروه</strong>
				</div>
				<table className=''>
					<thead>
						<tr>
							<th scope='col'>ردیف</th>
							<th scope='col'>نام / نام خانوادگی</th>
							<th scope='col'>شماره ملی</th>
							<th scope='col'>شماره ثبت نام</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td scope='row'>1</td>
							<td>{`${props.getPrintDetailList.data && props.getPrintDetailList.data.name} ${''} ${props.getPrintDetailList.data && props.getPrintDetailList.data.family}`}</td>
							<td>{props.getPrintDetailList.data && props.getPrintDetailList.data.nationalCode}</td>
							<td>{props.getPrintDetailList.data && props.getPrintDetailList.data.tel}</td>
						</tr>
					</tbody>
				</table>
			</div>
			<div style={{ marginTop: '50px' }}>
				<div className='flex justify-start'>
					<strong className='mb-4'>مشخصات کارگزار</strong>
				</div>
				<div className={'row mt-2'}>
					<div className={'col'}>
						<p className={'karvan__info__title mx-2'}>
							کد کارگزار : {props.getPrintDetailList.data && props.getPrintDetailList.data.mainKargozarNo}{' '}
						</p>
						<p></p>
					</div>
					<div className={'col'}>
						<p className={'karvan__info__title mx-2'}>
							نام کارگزار : {props.getPrintDetailList.data && props.getPrintDetailList.data.mainOffice}
						</p>
						<p></p>
					</div>
					<div className={'col'}>
						<p className={'karvan__info__title mx-2'}>
							{' '}
							قیمت مصوب : {props.getPrintDetailList.data && props.getPrintDetailList.data.cost}
						</p>
						<p></p>
					</div>
				</div>
				<div className={'row mt-2'}>
					<div className={'col'}>
						<p className={'karvan__info__title mx-2'}>
							{' '}
							مقصد: {props.getPrintDetailList.data && props.getPrintDetailList.data.sport}{' '}
						</p>
						<p></p>
					</div>
					<div className={'col'}>
						<p className={'karvan__info__title mx-2'}>
							{' '}
							تاریخ پرواز: {props.getPrintDetailList.data && props.getPrintDetailList.data.flightDate}
						</p>
						<p></p>
					</div>
					<div className={'col'}>
						<p className={'karvan__info__title mx-2'}>
							{' '}
							نام مدیرعامل : {props.getPrintDetailList.data && props.getPrintDetailList.data.mainManager}
						</p>
						<p></p>
					</div>
				</div>
				<div className={'row mt-2'}>
					<div className={'col'}>
						<p className={'karvan__info__title mx-2'}>
							{' '}
							تلفن : {props.getPrintDetailList.data && props.getPrintDetailList.data.tel}{' '}
						</p>
						<p></p>
					</div>
					<div className={'col'}>
						<p className={'karvan__info__title mx-2'}>
							{' '}
							آدرس: {props.getPrintDetailList.data && props.getPrintDetailList.data.mainAddress}
						</p>
						<p></p>
					</div>
					<div className={'col'}>
						<p className={'karvan__info__title mx-2'}></p>
						<p></p>
					</div>
				</div>
			</div>
			<div className='flex justify-start'>
				<div>
					<strong>توضیحات</strong>
				</div>
				<div className='LiclassFor mt-4'>
					<li>1. اصل و کپی ثبت نامی عمره مفرده+ اصل و کپی کارت ملی + اصل گذرنامه با هفت ماه اعتبار از تاریخ پرواز</li>
					<li>
						2. این برگه از زمان صدور فقط بمدت ۷۲ ساعت قصد ابطال رزرو انجام شده را داشته باشد می تواند با مراجعه به کارگزاری مقصدی
						که برای او رزرو گردیده با تکمیل فرم انصراف که از سیستم اخذ می شود رزرو خود را ابطال نماید.{' '}
					</li>
					<li>3. یک قطعه عکس ۶*۴ مطابق با پاسپورت</li>
					<div className='flex'>
						<div className='text-danger mx-1'>توجه :</div>
						<div>
							<p>
								زائر گرامی خواهشمد است قبل از انقضای اعتبار این برگه جهت ثبت نام نهایی در گروه انتخابی با مشخصات زیر به کارگزار
								مقصد به نشانی و مشخصات قید شده مراجعه و ثبت نام خود را قطعی نمائید
							</p>
						</div>
					</div>
				</div>
			</div>
			<div className='mb-4'>
				<button
					className='btn buttonBuyRequestGroup mx-3'
					onClick={() => {
						handlePrint(null, () => contentToPrint.current);
					}}>
					چاپ رسید
				</button>
				<button
					className='btn buttonBuyRequestGroup bg-danger mx-3'
					onClick={() => {
						history('/OmreMofrade/myDocuments');
					}}>
					سند های من
				</button>
			</div>
		</div>
	);
};

export default connect((state: IApplicationState) => state.registration, registrationActions)(Print as ComponentType<any>);
