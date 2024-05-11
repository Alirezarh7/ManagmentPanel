import { CloseCircleOutlined, HomeOutlined, LogoutOutlined, MenuOutlined, ProfileOutlined } from '@ant-design/icons';
import { Drawer } from 'antd';
import React, { ComponentType, useState } from 'react';
import Ziarat from '../../../assets/ziarat.png';
import './antdsidebar.css';
import { Link, useNavigate } from 'react-router-dom';
import CollapseMenu from './Menu/CollapseMenu';
import { useTranslation } from 'react-i18next';
import useWindowSize from '../../../hooks/useWindowSize';
import MenuItem from './Menu/MenuItem';
import { dashboardActions } from '../../../pages/PublicPages/Actions/Dashboard/action';
import { IApplicationState } from '../../../store/state';
import { connect } from 'react-redux';
import LogOutConfirmDialog from '../Header/LogOutConfirmDialog';

type IProps = typeof dashboardActions & IApplicationState;
const AntdSideBar: React.FC<IProps> = props => {
	const [open, setOpen] = useState(false);
	const [placement, setPlacement] = useState('right');
	const { t } = useTranslation();
	const winowSize = useWindowSize();
	const history = useNavigate();

	const showDrawer = () => {
		setOpen(true);
	};

	const onClose = () => {
		setOpen(false);
	};

	const onChange = (e: any) => {
		setPlacement(e.target.value);
	};

	function getItem(label: React.ReactNode, key: React.Key, icon?: React.ReactNode, children?: any, type?: 'group') {
		return {
			key,
			icon,
			children,
			label,
			type
		};
	}

	return (
		<>
			<LogOutConfirmDialog />
			<MenuOutlined
				className='absolute inline lg:hidden z-[100] left-[10px] top-[20px] text-[23px] cursor-pointer'
				onClick={showDrawer}
			/>
			<Drawer
				title={
					<div className='flex items-center flex-col'>
						<CloseCircleOutlined onClick={() => setOpen(false)} style={{ alignSelf: 'flex-end', fontSize: '30px' }} />
						<img src={Ziarat} style={{ width: '110px' }} />
						<span className='antd-sidebar-title' style={{ fontSize: '14px', marginTop: '15px' }}>
							پنجره واحد سازمان حج و زیارت
						</span>
					</div>
				}
				placement={'right'}
				closable={false}
				onClose={onClose}
				open={winowSize.width <= 991 ? open : false}
				key={'right'}>
				<div style={{ borderBottom: '1px solid #eee' }} className='pb-3 flex items-center flex-col justify-center w-full'>
					<div className='flex justify-center items-center'>
						{/*<img src={User} width={25} className='ml-1'/>*/}
						<span className='ml-1 mt-1'>کاربر جاری: </span>
						<span className='font-weight-bold mt-1'>
							{props.oidc.user?.profile?.firstName} {props.oidc.user?.profile?.lastName}
						</span>
					</div>

					<div
						style={{ cursor: 'pointer' }}
						onClick={() => {
							history('/');
							setOpen(false);
						}}
						className='flex items-center justify-center w-75 mt-5 profile-antd-drawer-btn'>
						<HomeOutlined style={{ fontSize: '20px' }} className='text-dark' />
						<p className='mt-2 mr-2 text-dark font-weight-bold'>برو به صفحه اصلی</p>
					</div>

					<div
						style={{ cursor: 'pointer' }}
						onClick={() => {
							history('/user-information');
							setOpen(false);
						}}
						className='flex items-center justify-center w-75 mt-2 profile-antd-drawer-btn'>
						<ProfileOutlined style={{ fontSize: '20px' }} className='text-dark' />
						<p className='mt-2 mr-2 text-dark font-weight-bold'>مشاهده پروفایل</p>
					</div>

					<div
						style={{ cursor: 'pointer' }}
						onClick={() => {
							props.toggleLogoutConfirm(true);
							setOpen(false);
						}}
						className='flex items-center justify-center w-75 mt-2 logout-antd-drawer-btn'>
						<LogoutOutlined style={{ fontSize: '20px' }} className='text-white' />
						<p className='mt-2 mr-2 text-white font-weight-bold'>خروج از حساب</p>
					</div>
				</div>
				<ul className='mt-4 text-nowrap list-unstyled p-0 m-0'>
					{/* <CollapseMenu style={{color: 'black'}} title="clubs" icon="mdi-format-list-text" id="closet">
                        <Link onClick={onClose} className="links-drawer-antd block mt-3 w-full bg-light p-3 rounded"
                              to={"/tamato/my-documents"}>
                            {t("callCompleteInformations")}
                        </Link>
                        <Link onClick={onClose} className="links-drawer-antd block mt-3 w-full bg-light p-3 rounded"
                              to={"/ReserveAndRegister"}>
                            {t("reserveAndRegister")}
                        </Link>
                        <Link onClick={onClose} className="links-drawer-antd block mt-3 w-full bg-light p-3 rounded"
                              to={"/tamato/document-trasfer-agreement"}>
                            {t("transformation")}
                        </Link>
                    </CollapseMenu>*/}
					<MenuItem
						spaceY={'mt-1'}
						color={'#000'}
						link={{
							pathname: '/tamato/my-documents',
							state: { fromDashboard: true }
						}}
						title='clubs'
						icon='mdi-format-list-text'
					/>
					<MenuItem
						spaceYExternalLink={'mt-5'}
						externalLink='https://umrah.haj.ir'
						external={true}
						title='discounts'
						icon='mdi-format-list-text'
					/>
					<MenuItem
						spaceYExternalLink={'mt-5'}
						externalLink='https://atabatorg.haj.ir'
						external={true}
						title='financialYears'
						icon='mdi-format-list-text'
					/>
					<MenuItem
						spaceYExternalLink={'mt-5'}
						externalLink='https://samah.haj.ir'
						external={true}
						title='headCoaches'
						icon='mdi-format-list-text'
					/>
					<MenuItem
						spaceYExternalLink={'mt-5'}
						externalLink=''
						external={true}
						title='insuranceTariffes'
						icon='mdi-format-list-text'
					/>
				</ul>
			</Drawer>
		</>
	);
};

export default connect((state: IApplicationState) => state, dashboardActions)(AntdSideBar as ComponentType);
