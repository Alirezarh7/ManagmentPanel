import React from 'react';
import { FaRegDotCircle } from 'react-icons/fa';
import baleLogo from '../../assets/Footer/bale-min.png';
import { Link, useLocation } from 'react-router-dom';
import { PATHS } from '../../router/paths';
import { MdHomeFilled } from 'react-icons/md';
import { FaRegCircleUser } from 'react-icons/fa6';
import maaka from '../../assets/icons/HajTamato';
import { FaKaaba } from 'react-icons/fa';
import { MdOutlineMosque } from 'react-icons/md';
import { HiOutlineBuildingOffice2 } from 'react-icons/hi2';
import HajTamato from '../../assets/icons/HajTamato';
import OmreMofrade from '../../assets/icons/OmreMofrade';
import AtabatAragh from '../../assets/icons/AtabatAragh';
import { FaMosque } from 'react-icons/fa';
import AtabatSoriy from '../../assets/icons/AtabatSoriy';
import Arbain from '../../assets/icons/Arbain';
import Kargozaran from '../../assets/icons/Kargozaran';

const cardsData = [
	{
		id: 0,
		href: '',
		to: '/',
		icon: <MdHomeFilled className=' w-8 h-8 ' />,
		title: 'خانه'
	},
	{
		id: 1,
		href: '',
		to: '/tamato/my-documents',
		icon: <FaKaaba className=' w-8 h-8 ' />,
		title: 'حج تمتع'
	},
	{
		id: 2,
		href: '',
		to: '/OmreMofrade/myDocuments',
		icon: <MdOutlineMosque className='w-8 h-8' />,
		title: 'عمره مفرده'
	},
	{
		id: 3,
		href: 'https://atabatorg.haj.ir',
		to: '',
		icon: <FaMosque className='w-8 h-8' />,
		title: 'عتبات عراق'
	},
	{
		id: 4,
		href: '',
		to: '/user-information',
		icon: <FaRegCircleUser className='w-8 h-8' />,
		title: 'حساب کاربری'
	}
];
const Footer = () => {
	const location = useLocation();
	return (
		<footer className='w-full max-md:fixed max-md:bottom-0 max-md:left-0 max-md:rifht-0 z-10'>
			{/*<div className='max-md:hidden py-[20px] bg-gradient-to-br from-[#061C3B] via-[#0a617d] to-[#061C3B] text-white text-sm'>*/}
			{/*	<div className='space-y-[10px] mt-4 max-w-screen-xl mx-auto'>*/}
			{/*		<section className='grid grid-cols-1 md:grid-cols-3 gap-8'>*/}
			{/*			<div>*/}
			{/*				<h2 className='text-base font-bold flex items-center gap-2'>*/}
			{/*					<FaRegDotCircle />*/}
			{/*					پیوندها*/}
			{/*				</h2>*/}
			{/*				<ul className='mr-[20px] list-disc'>*/}
			{/*					<li>*/}
			{/*						<a href='https://www.leader.ir/' target='_blank' rel='noreferrer'>*/}
			{/*							پایگاه دفتر مقام معظم رهبری*/}
			{/*						</a>*/}
			{/*					</li>*/}
			{/*					<li>*/}
			{/*						<a href='https://www.dolat.ir/' target='_blank' rel='noreferrer'>*/}
			{/*							پایگاه اطلاع رسانی دولت*/}
			{/*						</a>*/}
			{/*					</li>*/}
			{/*					<li>*/}
			{/*						<a href='https://saamad.ir/portal/home' target='_blank' rel='noreferrer'>*/}
			{/*							ارتباط مردمی ریاست جمهوری*/}
			{/*						</a>*/}
			{/*					</li>*/}
			{/*					<li>*/}
			{/*						<a href='https://my.gov.ir/' target='_blank' rel='noreferrer'>*/}
			{/*							درگاه ملی خدمات دولت همراه*/}
			{/*						</a>*/}
			{/*					</li>*/}
			{/*					<li>*/}
			{/*						<a href='https://iranfoia.ir/web/guest/orgsresponsereport' target='_blank' rel='noreferrer'>*/}
			{/*							سامانه انتشار و دسترسی آزاد به اطلاعات*/}
			{/*						</a>*/}
			{/*					</li>*/}
			{/*					<li>*/}
			{/*						<a href='https://iran.gov.ir/fa/' target='_blank' rel='noreferrer'>*/}
			{/*							درگاه ملی خدمات دولت هوشمند*/}
			{/*						</a>*/}
			{/*					</li>*/}
			{/*					<li>*/}
			{/*						<Link to={PATHS.faq}>سوالات متداول</Link>*/}
			{/*					</li>*/}
			{/*				</ul>*/}
			{/*			</div>*/}
			{/*			<div>*/}
			{/*				<h2 className='text-base font-bold flex items-center gap-2'>*/}
			{/*					<FaRegDotCircle />*/}
			{/*					ارتباط با ما*/}
			{/*				</h2>*/}
			{/*				<ul className='mr-[20px] list-disc'>*/}
			{/*					<li>آدرس : تهران، خيابان آزادی، نبش خيابان رودکی شمالی، سازمان حج و زيارت</li>*/}
			{/*					<li>تلفن : 64511 -021</li>*/}
			{/*					<li>فکس : 66582130 - 021</li>*/}
			{/*					<li>پست الکترونیک : info [at] haj.ir</li>*/}
			{/*					<li>ساعت کاری سازمان : شنبه الی چهارشنبه ساعت 8:00 الی 16:15</li>*/}
			{/*					<li>*/}
			{/*						<a href='https://ble.ir/bazaeran/' target='_blank' rel='noreferrer'>*/}
			{/*							کانال ارتباطی سازمان حج و زیارت با زائران حج*/}
			{/*						</a>*/}
			{/*					</li>*/}
			{/*				</ul>*/}
			{/*			</div>*/}
			{/*			<div>*/}
			{/*				<h2 className='text-base font-bold flex items-center gap-2'>*/}
			{/*					<FaRegDotCircle />*/}
			{/*					آمار سایت*/}
			{/*				</h2>*/}
			{/*				<ul className='mr-[20px] list-disc'>*/}
			{/*					<li>کاربر آنلاین : 0</li>*/}
			{/*					<li>بازدید کل :0 بار</li>*/}
			{/*					<li>بازدید امروز :0 بار</li>*/}
			{/*					<li>بازدید دیروز :0 بار</li>*/}
			{/*					<li>بیشترین بازدید روزانه :0 بار</li>*/}
			{/*				</ul>*/}
			{/*			</div>*/}
			{/*		</section>*/}
			{/*		<hr className='bg-[#d4d4d445]' />*/}
			{/*		<section className='py-3 grid grid-cols-1 md:grid-cols-4 items-center'>*/}
			{/*			<div>*/}
			{/*				<span>شبکه های اجتماعی</span>*/}
			{/*				<div className='mt-2 flex justify-start gap-4'>*/}
			{/*					<a href='https://ble.ir/kargozaran_haj_ir' target='_blank' rel='noreferrer'>*/}
			{/*						<img src={baleLogo} alt='پیامرسان بله' className='w-6 h-6' />*/}
			{/*					</a>*/}
			{/*					<a href='https://ble.ir/hajnews_ir' target='_blank' rel='noreferrer'>*/}
			{/*						<img src={baleLogo} alt='پیامرسان بله' className='w-6 h-6' />*/}
			{/*					</a>*/}
			{/*					<a href='https://ble.ir/bazaeran' target='_blank' rel='noreferrer'>*/}
			{/*						<img src={baleLogo} alt='پیامرسان بله' className='w-6 h-6' />*/}
			{/*					</a>*/}
			{/*				</div>*/}
			{/*			</div>*/}
			{/*			<div className='col-span-2 text-center'>کلیه حقوق مادی و معنوی این سایت برای سازمان حج و زیارت محفوظ می باشد</div>*/}
			{/*		</section>*/}
			{/*	</div>*/}
			{/*</div>*/}

			<div className='md:hidden h-[60px] w-full flex justify-around items-center bg-gradient-to-t from-[#E4CA6F] to-[#fafafa] shadow-2xl border-t !border-[#E4CA6F] text-white text-sm z-10 '>
				{cardsData.map(item => (
					<div
						className={`w-full text-black text-[10px] font-bold ${location.pathname === item.to ? 'text-blue-500' : ''}`}
						key={item.id}>
						{item.to ? (
							<Link className='flex flex-col justify-center items-center' to={item.to}>
								<div className='w-full flex justify-center items-center'>{item.icon}</div>
								<div>
									<span>{item.title}</span>
								</div>
							</Link>
						) : (
							<a className='flex flex-col justify-center items-center' href={item.href} target='_blank' rel='noreferrer'>
								<div className='w-full flex justify-center items-center'>{item.icon}</div>
								<div>
									<span>{item.title}</span>
								</div>
							</a>
						)}
					</div>
				))}
			</div>
		</footer>
	);
};
export default Footer;
