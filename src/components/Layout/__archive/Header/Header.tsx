import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LogOut from './LogOut';
import BreadCrumb from './BreadCrumb';
import Ziarat from '../../../../assets/ziarat-heder-logo.png';
import './header.css';

export interface IProps {
	isConnected: boolean;
}

const Header = (props: IProps) => {
	const [t] = useTranslation();
	const history = useNavigate();
	const location = useLocation();

	const shouldRenderServicesTabs = () => {
		const validRoutes = ['/tamato', '/OmreMofrade'];
		return validRoutes.some(q => location.pathname.startsWith(q));
	};

	const shouldRenderBreadCrumb = shouldRenderServicesTabs();

	return (
		<header className={`w-full max-w-screen-xl mx-auto relative bg-white ${shouldRenderBreadCrumb ? 'border-bottom' : ''}`}>
			<div className='flex-shrink-0 !border-b !border-gray-300 max-lg:bg-gradient-to-b from-white to-[#C1A821]'>
				<div className='flex justify-between items-center lg:border-bottom px-3 '>
					<div className='flex items-center m-2 w-full '>
						<div className='w-full flex'>
							<div className='  flex items-center'>
								<img onClick={() => history('/')} alt='logo' src={Ziarat} className=' cursor-pointer w-14 h-14 mx-2.5' />
							</div>
							<div className='md:w-2/6  flex justify-start items-center mr-2'>
								<span
									onClick={() => history('/')}
									className=' bg-gradient-to-l from-[#E4CA6F]  via-yellow-700 to-black text-transparent bg-clip-text text-xl'>
									پنجره واحد حج و زیارت
								</span>
							</div>
							{/*<div className=' w-4/6 max-lg:hidden mt-1 '>*/}
							{/*	<ul className='flex gap-3 text-base justify-start'>*/}
							{/*		<li className='cursor-pointer'>*/}
							{/*			<Link to='./tamato/my-documents'>*/}
							{/*				<p className='text-base text-gray-600'>حج تمتع</p>*/}
							{/*			</Link>*/}
							{/*		</li>*/}
							{/*		<li className='border-r !border-gray-400 pr-2'></li>*/}
							{/*		<li className='cursor-pointer text-gray-600'>*/}
							{/*			<Link to='./OmreMofrade/myDocuments'>*/}
							{/*				<p className='text-base text-gray-600'>عمره مفرده</p>*/}
							{/*			</Link>*/}
							{/*		</li>*/}
							{/*		<li className='border-r !border-gray-400 pr-2'></li>*/}
							{/*		<li className='cursor-pointer text-gray-600'>*/}
							{/*			<a href={'https://atabatorg.haj.ir/login.aspx'}>*/}
							{/*				<p className='text-base text-gray-600'>عتبات عراق</p>*/}
							{/*			</a>*/}
							{/*		</li>*/}
							{/*		<li className='border-r !border-gray-400 pr-2'></li>*/}
							{/*		<li className='cursor-pointer text-gray-600'>*/}
							{/*			<a href={'https://samah.haj.ir/'}>*/}
							{/*				<p className='text-base text-gray-600'>سماح اربعین</p>*/}
							{/*			</a>*/}
							{/*		</li>*/}
							{/*		<li className='border-r !border-gray-400 pr-2'></li>*/}
							{/*		<li className='cursor-pointer text-gray-600'>سوریه</li>*/}
							{/*		<li className='border-r !border-gray-400 pr-2'></li>*/}
							{/*		<li className='cursor-pointer text-gray-600'>*/}
							{/*			<a href={'https://kargozaran.haj.ir/AgentRelated/AgentDefaultPage.aspx'}>*/}
							{/*				<p className='text-base text-gray-600'>کارگزاران</p>*/}
							{/*			</a>*/}
							{/*		</li>*/}
							{/*	</ul>*/}
							{/*</div>*/}
						</div>
						{/*<div className='w-1/3'>*/}

						{/*</div>*/}
					</div>
					<div className='flex'>{!props.isConnected ? '' : <LogOut />}</div>
				</div>
				<div className={`w-full  h-[101px] lg:hidden ${location.pathname === '/' ? '' : 'hidden'}`}></div>
			</div>
			{shouldRenderBreadCrumb ? <BreadCrumb /> : null}
		</header>
	);
};

export default Header;
