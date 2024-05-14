import { Link } from 'react-router-dom';
import DropdownUser from './DropdownUser';
import { GiHamburgerMenu } from 'react-icons/gi';
import ZiaratLogo from '../../../assets/ziarat-heder-logo.png';
import LogOut from '../__archive/Header/LogOut';
import React from 'react';

interface IProps {
	sidebarOpen: string | boolean | undefined;
	setSidebarOpen: (arg0: boolean) => void;
	isConnected: boolean;
}

const Header = ({ sidebarOpen, setSidebarOpen, isConnected }: IProps) => {
	return (
		<header className='sticky top-0 z-999 flex w-full bg-white drop-shadow-1 dark:bg-boxdark dark:drop-shadow-none'>
			<div className='flex flex-grow justify-between lg:justify-end items-center px-2 py-2 shadow-2 md:px-6 2xl:px-11'>
				<div className='flex items-center gap-2 sm:gap-4 lg:hidden'>
					<Link className='block flex-shrink-0 lg:hidden' to='/'>
						<img src={ZiaratLogo} alt='Logo' className='w-10 h-10' />
					</Link>
				</div>

				<div className='flex items-center gap-3 2xsm:gap-7'>
					{/*<DropdownUser />*/}
					<div className='flex'>{!isConnected ? '' : <LogOut />}</div>
					<button
						aria-controls='sidebar'
						onClick={e => {
							e.stopPropagation();
							setSidebarOpen(!sidebarOpen);
						}}
						className='z-99999 block rounded-sm border border-stroke bg-white shadow-sm dark:border-strokedark dark:bg-boxdark lg:hidden'>
						<GiHamburgerMenu className='w-8 h-8 text-black' />
					</button>
				</div>
			</div>
		</header>
	);
};

export default Header;
