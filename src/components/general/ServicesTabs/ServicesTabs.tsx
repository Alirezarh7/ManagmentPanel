import React from 'react';
import Kaaba from '../../../assets/Dashboard/Kaaba.png';
import Mohammad from '../../../assets/Dashboard/Mohammad.png';
import EmamHosein from '../../../assets/Dashboard/EmamHosein.png';
import Abas from '../../../assets/Dashboard/Abas.png';
import Zainab from '../../../assets/Dashboard/zainab.png';
import kargozaran from '../../../assets/Dashboard/kargozaran.png';
import { useLocation } from 'react-router-dom';

const cardsData = [
	{ id: 0, href: '', link: '/tamato/my-documents', prefix: '/tamato', src: Kaaba, title: 'حج تمتع' },
	{ id: 1, href: '', link: '/OmreMofrade/myDocuments', prefix: '/OmreMofrade', src: Mohammad, title: 'عمره مفرده' },
	{ id: 2, href: 'https://atabatorg.haj.ir', link: '/atabat', prefix: '/atabat', src: EmamHosein, title: 'عتبات عراق' },
	{ id: 3, href: 'https://samah.haj.ir', link: '/samah', prefix: '/samah', src: Abas, title: 'سماح اربعین' },
	{ id: 4, href: '', link: '/', prefix: '/suria', src: Zainab, title: 'سوریه' },
	{
		id: 5,
		href: 'https://kargozaran.haj.ir/AgentRelated/AgentDefaultPage.aspx',
		link: '/',
		prefix: '/kargozaran',
		src: kargozaran,
		title: 'کارگزاران'
	}
];

const ServicesTabs = () => {
	const location = useLocation();

	const isActiveTab = (prefix: string) => {
		if (location.pathname.startsWith(prefix)) return true;
		return false;
	};

	return (
		<div className='w-full border'>
			<div className='w-full max-w-screen-xl mx-auto flex items-center gap-4 '>
				{cardsData.map(item => (
					<div
						className={`flex flex-col justify-center items-center ${isActiveTab(item.prefix) ? 'border-[3px] !border-transparent !border-b-blue-600' : ''}`}>
						<img src={item.src} alt={item.title} className='w-6 h-6' />
						<span className='text-sm'>{item.title}</span>
					</div>
				))}
			</div>
		</div>
	);
};

export default ServicesTabs;
