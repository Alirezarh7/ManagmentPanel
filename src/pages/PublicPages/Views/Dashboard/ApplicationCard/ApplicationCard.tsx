import React from 'react';
import AppQrcode from '../../../../../assets/Dashboard/AppQrcode.png';
import HajMobile from '../../../../../assets/Dashboard/Haj-Mobile.png';
import './ApplicationCard.css';

const ApplicationCard = () => {
	return (
		<div className={' w-full flex flex-col md:flex-row justify-center items-center mb-3 border rounded-[20px]'}>
			<div className={'w-full h-100 flex flex-col lg:flex-row justify-center items-center gap-2'}>
				<div className='border rounded-[20px]'>
					<div className={'max-xs:hidden p-3'}>
						<div className={'m-2'}>
							<img src={AppQrcode} style={{ width: '100px', height: '100px' }} />
						</div>
						<div>
							<strong>برای دانلود اسکن کنید !</strong>
						</div>
					</div>
				</div>
				<div>
					<div>
						<strong className={'FontWeightApplication'}>دانلود نرم افزار موبایلی سازمان حج و زیارت</strong>
					</div>
					<div
						className={
							'FontWeightApplication mt-4 w-full bg-blue-600 flex justify-center items-center text-white my-3 text-lg py-2 rounded-xl'
						}>
						<a href={'https://cafebazaar.ir/app/com.haj_ziyarat'}>مشاهده لینک دانلود </a>
					</div>
				</div>
			</div>
			<div className={'w-full h-100 flex justify-center '}>
				<img className={'mt-2'} src={HajMobile} style={{ width: '336px', height: '294px' }} />
			</div>
		</div>
	);
};

export default ApplicationCard;
