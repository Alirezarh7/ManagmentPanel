import React, { useState } from 'react';
import MenuItem from './Menu/MenuItem';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './sider.css';
import useWindowSize from '../../../hooks/useWindowSize';
import { CloseOutlined, MenuOutlined } from '@ant-design/icons';

export interface IProps {}

interface IState {}

const SideBar = () => {
	const [t] = useTranslation();
	const windowSize = useWindowSize();
	const [open, setOpen] = useState(false);

	const setOpenSidebar = (state: boolean): void => {
		setOpen(state);
	};

	return (
		<div
			className={` ${windowSize.width <= 991 ? 'hidden' : 'flex'} ${open ? 'menu-custom-width-open' : 'menu-custom-width-close'} flex-col menu-custom flex-shrink-0 text-white open drawer-scroll-antd`}>
			<div className='p-3 relative'>
				{open ? (
					<CloseOutlined className='absolute text-xl text-black left-[10px]' onClick={() => setOpen(false)} />
				) : (
					<MenuOutlined className='absolute text-xl text-black left-[10px]' onClick={() => setOpen(true)} />
				)}
				{open && <Link to='/' className='logo flex items-center'></Link>}
			</div>
			<ul className='mt-4 text-nowrap list-unstyled p-0 m-0'>
				{/* <CollapseMenu openState={open} action={setOpenSidebar} style={{color: 'black'}} title="clubs" icon="mdi-format-list-text" id="closet">
                    <Link className="block" to={"/tamato/my-documents"}>
                        {t("callCompleteInformations")}
                    </Link>
                    <Link className="block" to={"/ReserveAndRegister"}>
                        {t("reserveAndRegister")}
                    </Link>
                    <Link className="block" to={"/tamato/document-trasfer-agreement"}>
                        {t("transformation")}
                    </Link>
                </CollapseMenu>*/}
				<MenuItem
					isOpen={open}
					color={'#000'}
					link={{
						pathname: '/',
						state: { fromDashboard: true }
					}}
					title='homePage'
					icon='mdi-format-list-text'
				/>
				<MenuItem
					isOpen={open}
					color={'#000'}
					link={{
						pathname: '/tamato/my-documents',
						state: { fromDashboard: true }
					}}
					title='clubs'
					icon='mdi-format-list-text'
				/>
				<MenuItem
					isOpen={open}
					color={'#000'}
					link={{
						pathname: '/OmreMofrade/myDocuments',
						state: { fromDashboard: true }
					}}
					title='discounts'
					icon='mdi-format-list-text'
				/>
				<MenuItem
					isOpen={open}
					color={'#000'}
					externalLink='https://atabatorg.haj.ir'
					external={true}
					title='financialYears'
					icon='mdi-format-list-text'
				/>
				<MenuItem
					isOpen={open}
					color={'#000'}
					externalLink='https://samah.haj.ir'
					external={true}
					title='headCoaches'
					icon='mdi-format-list-text'
				/>
				<MenuItem
					isOpen={open}
					color={'#000'}
					externalLink=''
					external={true}
					title='insuranceTariffes'
					icon='mdi-format-list-text'
				/>
			</ul>
		</div>
	);
};

export default SideBar;
