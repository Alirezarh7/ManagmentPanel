import React, { useEffect } from 'react';
import NapLoading from '../components/general/NapLoading/NapLoading';
import { shareData } from '../shareData';
import Ziarat from '../assets/ziarat.png';
import './SsoLogin.css';

function SsoLoginPage(): React.JSX.Element {
	const myGovSso = (): void => {
		localStorage.setItem(shareData.CONSTANT.SSO_APPROACH_SELECTED, 'true');
		localStorage.setItem(shareData.CONSTANT.SSO_APPROACH, 'mygov');
		window.location.reload();
	};

	const organization = (): void => {
		localStorage.setItem(shareData.CONSTANT.SSO_APPROACH_SELECTED, 'true');
		localStorage.setItem(shareData.CONSTANT.SSO_APPROACH, 'organization');
		window.location.reload();
	};

	useEffect((): void => {
		// auto select mygov approach when the user opens mybeta.haj.ir from mygov.com
		if (window.location.pathname === shareData.CONSTANT.SSO_URL_FROM_MY_GOV) {

			myGovSso();
		}
	}, []);
	const selectSso = (state: string): void => {
		if (state === 'organization') {
			organization();
			return;
		}
		myGovSso();
	};

	if (window.location.pathname === shareData.CONSTANT.SSO_URL_FROM_MY_GOV) {
		return <NapLoading loading={true} />;
	}

	return (
		<div className='flex flex-col justify-center items-center w-full h-screen relative'>
			{/*<div className='absolute sso-test-box '>*/}
			{/*	<p className='sso-test-title'>نسخه آزمایشی</p>*/}
			{/*</div>*/}
			<div className={'flex items-center flex-col justify-center custom-styles-sso'}>
				<div className='flex flex-col justify-evenly items-center'>
					<img src={Ziarat} alt={''} style={{ width: '200px', height: '200px' }} />
					<p className='mt-4 font-weight-bold' style={{ fontSize: '16px' }}>
						برای ورود به سامانه یکی از روش های زیر را انتخاب نمایید
					</p>
				</div>
				<div className='flex items-center justify-center flex-md-row flex-col'>
					<button
						onClick={() => selectSso('organization')}
						className='m-3 sso-login-btns'
						style={{ background: 'rgb(189, 161, 87)' }}>
						ورود از طریق درگاه سازمان
					</button>
				</div>
			</div>
			<p className='absolute font-weight-bold sso-version-title' style={{ bottom: 0, fontSize: '16px' }}>
				نسخه 1 پنجره واحد خدمات حج و زیارت
			</p>
		</div>
	);
}

export default SsoLoginPage;
