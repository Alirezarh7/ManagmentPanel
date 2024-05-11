import React from 'react';
import DashboardOperationCard from './DashboardOperationCard';
import OmreMofrade from '../../../assets/icons/OmreMofrade';
import hajTamato from '../../../assets/icons/hajTamato.png';
import arbain from '../../../assets/icons/arbain.png';
import atabatAragh from '../../../assets/icons/atabatAragh.png';
import atabatSoriy from '../../../assets/icons/atabatSoriye.png';
import Kargozaran from '../../../assets/icons/Kargozaran';
//import { HiOutlineBuildingOffice2 } from 'react-icons/hi2';
import { Link } from 'react-router-dom';
import { useWindowScroll } from '@uidotdev/usehooks';

const cardsData = [
	{
		id: 0,
		href: '',
		link: '/tamato/my-documents',
		icon: '',
		src: hajTamato,
		title: 'حج تمتع'
	},
	{
		id: 1,
		href: '',
		link: '/OmreMofrade/myDocuments',
		icon: <OmreMofrade className='  h-[30px] w-[30px] lg:h-[50px] lg:w-[50px] ' />,
		src: '',
		title: 'عمره مفرده'
	},
	{
		id: 2,
		href: 'https://atabatorg.haj.ir',
		link: '',
		icon: '',
		src: atabatAragh,
		title: 'عتبات عراق'
	},
	{
		id: 3,
		href: '',
		link: '/',
		icon: '',
		src: atabatSoriy,
		title: 'عتبات سوریه'
	},
	{
		id: 4,
		href: 'https://samah.haj.ir',
		link: '',
		icon: '',
		src: arbain,
		title: 'اربعین'
	},
	{
		id: 5,
		href: 'https://kargozaran.haj.ir/AgentRelated/AgentDefaultPage.aspx',
		link: '/',
		icon: <Kargozaran className='  h-[30px] w-[30px] lg:h-[50px] lg:w-[50px] ' />,
		src: '',
		title: 'کارگزاران'
	}
];

const DashboardOperationCards = () => {
	const [{ x, y }, scrollTo] = useWindowScroll();

	return (
		<>
			<div className=' w-full max-md:hidden flex flex-col bg-white border-[1px] !border-[#E4CA6F] mt-4 rounded-lg'>
				<div className=' w-full  flex  items-center '>
					{cardsData.map(item => (
						<div className=' flex justify-center w-full h-full ' key={item.id}>
							{item.href !== '' ? (
								<a href={item.href} target='_blank' rel='noopener noreferrer'>
									<DashboardOperationCard icon={item.icon} src={item.src} title={item.title} />
								</a>
							) : item.link !== '' ? (
								<Link to={item.link}>
									<DashboardOperationCard icon={item.icon} src={item.src} title={item.title} />
								</Link>
							) : (
								<DashboardOperationCard icon={item.icon} src={item.src} title={item.title} />
							)}
						</div>
					))}
				</div>
			</div>

			<div className='md:hidden flex w-full justify-around items-start bg-white  rounded-xl '>
				<div className=' flex-1 border !border-l-gray-300 !border-t-[#E4CA6F] !border-r-[#E4CA6F] !border-b-[#E4CA6F] rounded-tr-xl rounded-br-xl '>
					{cardsData.slice(0, 3).map(item => (
						<div className={`${item.id === 0 ? 'w-full' : 'w-full border-t !border-gray-300'}`} key={item.id}>
							{item.href !== '' ? (
								<a href={item.href} target='_blank' rel='noopener noreferrer'>
									<DashboardOperationCard icon={item.icon} src={item.src} title={item.title} />
								</a>
							) : item.link !== '' ? (
								<Link to={item.link}>
									<DashboardOperationCard icon={item.icon} src={item.src} title={item.title} />
								</Link>
							) : (
								<DashboardOperationCard icon={item.icon} src={item.src} title={item.title} />
							)}
						</div>
					))}
				</div>
				<div className=' flex-1 border-t border-l border-b !border-[#E4CA6F] rounded-tl-xl rounded-bl-xl'>
					{cardsData.slice(3, 7).map(item => (
						<div className={`${item.id === 3 ? 'w-full' : 'w-full border-t !border-gray-300'}`} key={item.id}>
							{item.href !== '' ? (
								<a href={item.href} target='_blank' rel='noopener noreferrer'>
									<DashboardOperationCard icon={item.icon} src={item.src} title={item.title} />
								</a>
							) : item.link !== '' ? (
								<Link to={item.link}>
									<DashboardOperationCard icon={item.icon} src={item.src} title={item.title} />
								</Link>
							) : (
								<DashboardOperationCard icon={item.icon} src={item.src} title={item.title} />
							)}
						</div>
					))}
				</div>
			</div>
		</>
	);
};

export default DashboardOperationCards;

// <div
// 	className={`${y! >= 200 ? 'fixed' : 'hidden'} top-0 z-20 flex  md:hidden bg-white border-solid border-2 border-[#afafaf] rounded-xl shadow-md `}>
// 	<div className='flex justify-around items-start '>
// 		{cardsData.map(item => (
// 			<div key={item.id}>
// 				{item.href !== '' ? (
// 					<a href={item.href} target='_blank' rel='noopener noreferrer'>
// 						<DashboardOperationCard  src={item.src}/>
// 					</a>
// 				) : item.link !== '' ? (
// 					<Link to={item.link}>
// 						<DashboardOperationCard  src={item.src}/>
// 					</Link>
// 				) : (
// 					<DashboardOperationCard  src={item.src}/>
// 				)}
// 			</div>
// 		))}
// 	</div>
// </div>
