import React, { useEffect, useRef, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import ZiaratLogo from '../../../assets/ziarat-heder-logo.png';
import { PATHS } from '../../../router/paths';
import { TiChevronRightOutline } from 'react-icons/ti';
import { TfiAnnouncement } from 'react-icons/tfi';
import { IoHomeOutline } from 'react-icons/io5';
import { SlCalender } from 'react-icons/sl';
import { BsFileEarmarkText } from 'react-icons/bs';
import { PiQuestion } from 'react-icons/pi';
import { MdOutlineSettings } from 'react-icons/md';
import { SiRedis } from 'react-icons/si';

const menuItems = [
	{ id: 1, label: 'خانه', route: PATHS.home, icon: <IoHomeOutline className='w-4 h-4' /> },
	{ id: 2, label: 'اطلاعیه ها', route: PATHS.announcements.index, icon: <TfiAnnouncement className='w-4 h-4' /> },
	{ id: 3, label: 'محتواهای سایت', route: PATHS.contents.index, icon: <BsFileEarmarkText className='w-4 h-4' /> },
	{ id: 4, label: 'سوالات پرتکرار', route: PATHS.faqContents.index, icon: <PiQuestion className='w-4 h-4' /> },
	{ id: 5, label: 'کش ردیس', route: PATHS.redisCache, icon: <SiRedis className='w-4 h-4' /> },
	{ id: 6, label: 'تنظیمات', route: PATHS.configs, icon: <MdOutlineSettings className='w-4 h-4' /> },
	{ id: 7, label: 'مدیریت نرم افزارها', route: PATHS.managementApplication, icon: <SlCalender className='w-4 h-4' /> }
];

interface IProps {
	sidebarOpen: boolean;
	setSidebarOpen: (arg: boolean) => void;
}

const Sidebar = ({ sidebarOpen, setSidebarOpen }: IProps) => {
	const location = useLocation();
	const { pathname } = location;

	const trigger = useRef<any>(null);
	const sidebar = useRef<any>(null);

	const storedSidebarExpanded = localStorage.getItem('sidebar-expanded');
	const [sidebarExpanded, setSidebarExpanded] = useState(
		storedSidebarExpanded === null ? false : storedSidebarExpanded === 'true'
	);

	// close on click outside
	useEffect(() => {
		const clickHandler = ({ target }: MouseEvent) => {
			if (!sidebar.current || !trigger.current) return;
			if (!sidebarOpen || sidebar.current.contains(target) || trigger.current.contains(target)) return;
			setSidebarOpen(false);
		};
		document.addEventListener('click', clickHandler);
		return () => document.removeEventListener('click', clickHandler);
	});

	// close if the esc key is pressed
	useEffect(() => {
		const keyHandler = ({ keyCode }: KeyboardEvent) => {
			if (!sidebarOpen || keyCode !== 27) return;
			setSidebarOpen(false);
		};
		document.addEventListener('keydown', keyHandler);
		return () => document.removeEventListener('keydown', keyHandler);
	});

	useEffect(() => {
		localStorage.setItem('sidebar-expanded', sidebarExpanded.toString());
		if (sidebarExpanded) {
			document.querySelector('body')?.classList.add('sidebar-expanded');
		} else {
			document.querySelector('body')?.classList.remove('sidebar-expanded');
		}
	}, [sidebarExpanded]);

	return (
		<aside
			ref={sidebar}
			className={`absolute right-0 top-0 z-9999 flex h-screen w-72.5 flex-col overflow-y-hidden bg-black duration-300 ease-linear dark:bg-boxdark lg:static lg:translate-x-0 ${
				sidebarOpen ? 'translate-x-0' : 'translate-x-full'
			}`}>
			{/* <!-- SIDEBAR HEADER --> */}
			<div className='flex items-center justify-between gap-2 pr-6 py-5.5 lg:py-6.5'>
				<NavLink to='/' className='mt-3'>
					<img src={ZiaratLogo} alt='Logo' className=' cursor-pointer w-14 h-14 mx-2.5' />
				</NavLink>

				<button
					ref={trigger}
					onClick={() => setSidebarOpen(!sidebarOpen)}
					aria-controls='sidebar'
					aria-expanded={sidebarOpen}
					className='block lg:hidden'>
					<TiChevronRightOutline className='text-white w-10 h-10' />
				</button>
			</div>
			{/* <!-- SIDEBAR HEADER --> */}

			<div className='no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear'>
				{/* <!-- Sidebar Menu --> */}
				<nav className='mt-5 py-4 px-4 lg:mt-9 lg:px-6'>
					{/* <!-- Menu Group --> */}
					<div>
						<h3 className='mb-4 ml-4 text-sm font-semibold text-bodydark2'>فهرست</h3>
						<div className='mb-6 flex flex-col gap-1.5'>
							{/* <!-- Menu Item Calendar --> */}
							{menuItems.map(item => (
								<NavLink
									key={item.id}
									to={item.route}
									onClick={() => setSidebarOpen(!sidebarOpen)}
									className='group relative flex items-center gap-2.5 rounded-sm py-2 px-4 md:px-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4'>
									{item.icon}
									<span>{item.label}</span>
								</NavLink>
							))}
						</div>
					</div>
				</nav>
				{/* <!-- Sidebar Menu --> */}
			</div>
		</aside>
	);
};

export default Sidebar;
