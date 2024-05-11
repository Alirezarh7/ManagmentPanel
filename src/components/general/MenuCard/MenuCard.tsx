import React, { ComponentType, useEffect, useState } from 'react';
import { Translation, useTranslation } from 'react-i18next';
import { IDashboardState } from '../../../pages/PublicPages/Actions/Dashboard/model';
import { dashboardActions } from '../../../pages/PublicPages/Actions/Dashboard/action';
import { IApplicationState } from '../../../store/state';
import { connect } from 'react-redux';
import useTitle from '../../../hooks/useTitle';

type IProps = typeof dashboardActions & IDashboardState;

const Dashboard = (props: IProps) => {
	useTitle('mainSettings');

	const [t] = useTranslation();
	const [receiption, setReceiption] = useState<string>('');
	const [buffet, setBuffet] = useState<string>('');
	const [coaches, setCoaches] = useState<string>('');
	const [packages, setPackages] = useState<string>('');
	const [services, setServices] = useState<string>('');
	const [organizational, setOrganizational] = useState<string>('');
	const [diet, setDiet] = useState<string>('');
	const [sportProgram, setSportProgram] = useState<string>('');
	const [doctros, setDoctors] = useState<string>('');
	const [product, setProduct] = useState<string>('');
	const [wareHouse, setWareHouse] = useState<string>('');
	const [sale, setSale] = useState<string>('');
	const [members, setMembers] = useState<string>('');
	const [procurements, setProcurements] = useState<string>('');
	const [pictures, setPictures] = useState<string>('');
	const [videos, setVideos] = useState<string>('');
	const [documents, setDocuments] = useState<string>('');
	useEffect(() => {
		props.setCrumbs([]);
	}, []);

	//////////////////////////////////////////////////////////////////////////////////////////
	// Navoshgaran Test Server
	//////////////////////////////////////////////////////////////////////////////////////////
	useEffect(() => {
		setReceiption('http://receptions.gms.navoshgaran.com');
		setBuffet('http://buffet.gms.navoshgaran.com/');
		setCoaches('http://coaches.gms.navoshgaran.com/');
		setPackages('http://packages.gms.navoshgaran.com/');
		setServices('http://services.gms.navoshgaran.com/');
		setOrganizational('http://organizations.gms.navoshgaran.com/');
		setDiet('http://diets.gms.navoshgaran.com/');
		setSportProgram('http://programs.gms.navoshgaran.com/');
		setDoctors('http://doctors.gms.navoshgaran.com/');
		setProduct('http://products.gms.navoshgaran.com/');
		setWareHouse('http://warehouses.gms.navoshgaran.com/');
		setSale('http://sales.gms.navoshgaran.com/');
		setMembers('http://members.gms.navoshgaran.com/');
		setProcurements('http://procurements.gms.navoshgaran.com/');
		setPictures('http://pictures.gms.navoshgaran.com/');
		setVideos('http://videos.gms.navoshgaran.com/');
		setDocuments('http://documents.gms.navoshgaran.com/');
	}, []);
	//////////////////////////////////////////////////////////////////////////////////////////
	// GMS Origin Server :::: UnComment Next useEffect and Comment Previous useEffect
	//////////////////////////////////////////////////////////////////////////////////////////
	// useEffect(() => {
	// 	setReceiption("http://81.91.145.194:2014/")
	// 	setBuffet("http://81.91.145.194:2018/")
	// 	setCoaches("http://81.91.145.194:2011/")
	// 	setPackages("http://81.91.145.194:2005/")
	// 	setServices("http://81.91.145.194:2008/")
	// 	setOrganizational("http://81.91.145.194:2015/")
	// 	setDiet("http://81.91.145.194:2002/")
	// 	setSportProgram("http://81.91.145.194:2007/")
	// 	setDoctors("http://81.91.145.194:2003/")
	// 	setProduct("http://81.91.145.194:2012/")
	// 	setWareHouse("http://81.91.145.194:2013/")
	// 	setSale("http://81.91.145.194:2016/")
	// 	setMembers("http://81.91.145.194:2004/")
	// 	setProcurements("http://81.91.145.194:1012/")
	// 	setPictures("http://81.91.145.194:2006")
	// 	setVideos("http://81.91.145.194:2010/")
	// 	setDocuments("http://81.91.145.194:2019/")
	// }, [])
	return (
		<div className='p-4 w-full overflow-auto'>
			<div className='container h-100'>
				<div className='row nap-dashboard h-100'>
					<div className='col-sm-6 col-lg-4 mb-4'>
						<a
							href={receiption}
							target='_blank'
							rel='noopener noreferrer'
							className='nap-dashboard_item flex justify-center items-center p-5 h-100 rounded shadow-sm'
							style={{ backgroundColor: '#8a64eb' }}>
							<div
								className='bg-cover opacity-3 position-absolute full-offset'
								style={{ backgroundImage: "url('content/images/image-12.jpg')" }}></div>
							<Translation>
								{t => <span className='position-relative z-1 p-3 text-center text-nowrap'>{t('receiption')}</span>}
							</Translation>
							<div className='corners'>
								<span className='corners_top'></span>
								<span className='corners_right'></span>
								<span className='corners_bottom'></span>
								<span className='corners_left'></span>
							</div>
						</a>
					</div>
					<div className='col-sm-6 col-lg-4 mb-4'>
						<a
							href={buffet}
							target='_blank'
							rel='noopener noreferrer'
							className='nap-dashboard_item flex justify-center items-center p-5 h-100 rounded shadow-sm'
							style={{ backgroundColor: '#1267eb' }}>
							<div
								className='bg-cover opacity-3 position-absolute full-offset'
								style={{ backgroundImage: "url('content/images/image-15.jpg')" }}></div>
							<Translation>
								{t => <span className='position-relative z-1 p-3 text-center text-nowrap'>{t('buffet')}</span>}
							</Translation>
							<div className='corners'>
								<span className='corners_top'></span>
								<span className='corners_right'></span>
								<span className='corners_bottom'></span>
								<span className='corners_left'></span>
							</div>
						</a>
					</div>
					<div className='col-sm-6 col-lg-4 mb-4'>
						<a
							href={coaches}
							target='_blank'
							rel='noopener noreferrer'
							className='nap-dashboard_item flex justify-center items-center p-5 h-100 rounded shadow-sm'
							style={{ backgroundColor: '#E9573F' }}>
							<div
								className='bg-cover opacity-3 position-absolute full-offset'
								style={{ backgroundImage: "url('content/images/image-1.jpg')" }}></div>

							<Translation>
								{t => <span className='position-relative z-1 p-3 text-center text-nowrap'>{t('coaches')}</span>}
							</Translation>

							<div className='corners'>
								<span className='corners_top'></span>
								<span className='corners_right'></span>
								<span className='corners_bottom'></span>
								<span className='corners_left'></span>
							</div>
						</a>
					</div>
					<div className='col-sm-6 col-lg-4 mb-4'>
						<a
							href={packages}
							target='_blank'
							rel='noopener noreferrer'
							className='nap-dashboard_item flex justify-center items-center p-5 h-100 rounded shadow-sm'
							style={{ backgroundColor: '#F6BB42' }}>
							<div
								className='bg-cover opacity-3 position-absolute full-offset'
								style={{ backgroundImage: "url('content/images/image-5.jpg')" }}></div>
							<Translation>
								{t => <span className='position-relative z-1 p-3 text-center text-nowrap'>{t('package')}</span>}
							</Translation>
							<div className='corners'>
								<span className='corners_top'></span>
								<span className='corners_right'></span>
								<span className='corners_bottom'></span>
								<span className='corners_left'></span>
							</div>
						</a>
					</div>
					<div className='col-sm-6 col-lg-4 mb-4'>
						<a
							href={services}
							target='_blank'
							rel='noopener noreferrer'
							className='nap-dashboard_item flex justify-center items-center p-5 h-100 rounded shadow-sm'
							style={{ backgroundColor: '#967ADC' }}>
							<div
								className='bg-cover opacity-3 position-absolute full-offset'
								style={{ backgroundImage: "url('content/images/image-6.jpg')" }}></div>
							<Translation>
								{t => <span className='position-relative z-1 p-3 text-center text-nowrap'>{t('services')}</span>}
							</Translation>{' '}
							<div className='corners'>
								<span className='corners_top'></span>
								<span className='corners_right'></span>
								<span className='corners_bottom'></span>
								<span className='corners_left'></span>
							</div>
						</a>
					</div>
					<div className='col-sm-6 col-lg-4 mb-4'>
						<a
							href={organizational}
							target='_blank'
							rel='noopener noreferrer'
							className='nap-dashboard_item flex justify-center items-center p-5 h-100 rounded shadow-sm'
							style={{ backgroundColor: '#3a3985' }}>
							<div
								className='bg-cover opacity-3 position-absolute full-offset'
								style={{ backgroundImage: "url('content/images/image-13.jpg')" }}></div>
							<Translation>
								{t => <span className='position-relative z-1 p-3 text-center text-nowrap'>{t('organizational')}</span>}
							</Translation>
							<div className='corners'>
								<span className='corners_top'></span>
								<span className='corners_right'></span>
								<span className='corners_bottom'></span>
								<span className='corners_left'></span>
							</div>
						</a>
					</div>
					<div className='col-sm-6 col-lg-4 mb-4'>
						<a
							href={diet}
							target='_blank'
							rel='noopener noreferrer'
							className='nap-dashboard_item flex justify-center items-center p-5 h-100 rounded shadow-sm'
							style={{ backgroundColor: '#3BAFDA' }}>
							<div
								className='bg-cover opacity-3 position-absolute full-offset'
								style={{ backgroundImage: "url('content/images/image-2.jpg')" }}></div>
							<Translation>
								{t => <span className='position-relative z-1 p-3 text-center text-nowrap'>{t('diet')}</span>}
							</Translation>
							<div className='corners'>
								<span className='corners_top'></span>
								<span className='corners_right'></span>
								<span className='corners_bottom'></span>
								<span className='corners_left'></span>
							</div>
						</a>
					</div>
					<div className='col-sm-6 col-lg-4 mb-4'>
						<a
							href={sportProgram}
							target='_blank'
							rel='noopener noreferrer'
							className='nap-dashboard_item flex justify-center items-center p-5 h-100 rounded shadow-sm'
							style={{ backgroundColor: '#D770AD' }}>
							<div
								className='bg-cover opacity-3 position-absolute full-offset'
								style={{ backgroundImage: "url('content/images/image-7.jpg')" }}></div>
							<Translation>
								{t => <span className='position-relative z-1 p-3 text-center text-nowrap'>{t('sportProgram')}</span>}
							</Translation>{' '}
							<div className='corners'>
								<span className='corners_top'></span>
								<span className='corners_right'></span>
								<span className='corners_bottom'></span>
								<span className='corners_left'></span>
							</div>
						</a>
					</div>
					<div className='col-sm-6 col-lg-4 mb-4'>
						<a
							href={doctros}
							target='_blank'
							rel='noopener noreferrer'
							className='nap-dashboard_item flex justify-center items-center p-5 h-100 rounded shadow-sm'
							style={{ backgroundColor: '#4A89DC' }}>
							<div
								className='bg-cover opacity-3 position-absolute full-offset'
								style={{ backgroundImage: "url('content/images/image-4.jpg')" }}></div>
							<Translation>
								{t => <span className='position-relative z-1 p-3 text-center text-nowrap'>{t('doctors')}</span>}
							</Translation>
							<div className='corners'>
								<span className='corners_top'></span>
								<span className='corners_right'></span>
								<span className='corners_bottom'></span>
								<span className='corners_left'></span>
							</div>
						</a>
					</div>
					<div className='col-sm-6 col-lg-4 mb-4'>
						<a
							href={product}
							target='_blank'
							rel='noopener noreferrer'
							className='nap-dashboard_item flex justify-center items-center p-5 h-100 rounded shadow-sm'
							style={{ backgroundColor: '#fc8a91' }}>
							<div
								className='bg-cover opacity-3 position-absolute full-offset'
								style={{ backgroundImage: "url('content/images/image-10.jpg')" }}></div>
							<Translation>
								{t => <span className='position-relative z-1 p-3 text-center text-nowrap'>{t('product')}</span>}
							</Translation>
							<div className='corners'>
								<span className='corners_top'></span>
								<span className='corners_right'></span>
								<span className='corners_bottom'></span>
								<span className='corners_left'></span>
							</div>
						</a>
					</div>
					<div className='col-sm-6 col-lg-4 mb-4'>
						<a
							href={wareHouse}
							target='_blank'
							rel='noopener noreferrer'
							className='nap-dashboard_item flex justify-center items-center p-5 h-100 rounded shadow-sm'
							style={{ backgroundColor: '#15f5fd' }}>
							<div
								className='bg-cover opacity-3 position-absolute full-offset'
								style={{ backgroundImage: "url('content/images/image-11.jpg')" }}></div>
							<Translation>
								{t => <span className='position-relative z-1 p-3 text-center text-nowrap'>{t('wareHouse')}</span>}
							</Translation>
							<div className='corners'>
								<span className='corners_top'></span>
								<span className='corners_right'></span>
								<span className='corners_bottom'></span>
								<span className='corners_left'></span>
							</div>
						</a>
					</div>
					<div className='col-sm-6 col-lg-4 mb-4'>
						<a
							href={sale}
							target='_blank'
							rel='noopener noreferrer'
							className='nap-dashboard_item flex justify-center items-center p-5 h-100 rounded shadow-sm'
							style={{ backgroundColor: '#5d6874' }}>
							<div
								className='bg-cover opacity-3 position-absolute full-offset'
								style={{ backgroundImage: "url('content/images/image-14.jpg')" }}></div>
							<Translation>
								{t => <span className='position-relative z-1 p-3 text-center text-nowrap'>{t('sale')}</span>}
							</Translation>
							<div className='corners'>
								<span className='corners_top'></span>
								<span className='corners_right'></span>
								<span className='corners_bottom'></span>
								<span className='corners_left'></span>
							</div>
						</a>
					</div>
					<div className='col-sm-6 col-lg-4 mb-4'>
						<a
							href={members}
							target='_blank'
							rel='noopener noreferrer'
							className='nap-dashboard_item flex justify-center items-center p-5 h-100 rounded shadow-sm'
							style={{ backgroundColor: '#8CC152' }}>
							<div
								className='bg-cover opacity-3 position-absolute full-offset'
								style={{ backgroundImage: "url('content/images/image-3.jpg')" }}></div>
							<Translation>
								{t => <span className='position-relative z-1 p-3 text-center text-nowrap'>{t('members')}</span>}
							</Translation>
							<div className='corners'>
								<span className='corners_top'></span>
								<span className='corners_right'></span>
								<span className='corners_bottom'></span>
								<span className='corners_left'></span>
							</div>
						</a>
					</div>
					<div className='col-sm-6 col-lg-4 mb-4'>
						<a
							href={procurements}
							target='_blank'
							rel='noopener noreferrer'
							className='nap-dashboard_item flex justify-center items-center p-5 h-100 rounded shadow-sm'
							style={{ backgroundColor: '#8CC152' }}>
							<div
								className='bg-cover opacity-3 position-absolute full-offset'
								style={{ backgroundImage: "url('content/images/image-17.jpg')" }}></div>
							<Translation>
								{t => <span className='position-relative z-1 p-3 text-center text-nowrap'>{t('procurements')}</span>}
							</Translation>
							<div className='corners'>
								<span className='corners_top'></span>
								<span className='corners_right'></span>
								<span className='corners_bottom'></span>
								<span className='corners_left'></span>
							</div>
						</a>
					</div>
					<div className='col-sm-6 col-lg-4 mb-4'>
						<a
							href={pictures}
							target='_blank'
							rel='noopener noreferrer'
							className='nap-dashboard_item flex justify-center items-center p-5 h-100 rounded shadow-sm'
							style={{ backgroundColor: '#37BC9B' }}>
							<div
								className='bg-cover opacity-3 position-absolute full-offset'
								style={{ backgroundImage: "url('content/images/image-8.jpg')" }}></div>
							<Translation>
								{t => <span className='position-relative z-1 p-3 text-center text-nowrap'>{t('pictures')}</span>}
							</Translation>
							<div className='corners'>
								<span className='corners_top'></span>
								<span className='corners_right'></span>
								<span className='corners_bottom'></span>
								<span className='corners_left'></span>
							</div>
						</a>
					</div>
					<div className='col-sm-6 col-lg-4 mb-4'>
						<a
							href={videos}
							target='_blank'
							rel='noopener noreferrer'
							className='nap-dashboard_item flex justify-center items-center p-5 h-100 rounded shadow-sm'
							style={{ backgroundColor: '#DA4453' }}>
							<div
								className='bg-cover opacity-3 position-absolute full-offset'
								style={{ backgroundImage: "url('content/images/image-9.jpg')" }}></div>
							<Translation>
								{t => <span className='position-relative z-1 p-3 text-center text-nowrap'>{t('videos')}</span>}
							</Translation>
							<div className='corners'>
								<span className='corners_top'></span>
								<span className='corners_right'></span>
								<span className='corners_bottom'></span>
								<span className='corners_left'></span>
							</div>
						</a>
					</div>
					<div className='col-sm-6 col-lg-4 mb-4'>
						<a
							href={documents}
							target='_blank'
							rel='noopener noreferrer'
							className='nap-dashboard_item flex justify-center items-center p-5 h-100 rounded shadow-sm'
							style={{ backgroundColor: '#BF4453' }}>
							<div
								className='bg-cover opacity-3 position-absolute full-offset'
								style={{ backgroundImage: "url('content/images/image-16.jpg')" }}></div>
							<Translation>
								{t => <span className='position-relative z-1 p-3 text-center text-nowrap'>{t('documents')}</span>}
							</Translation>
							<div className='corners'>
								<span className='corners_top'></span>
								<span className='corners_right'></span>
								<span className='corners_bottom'></span>
								<span className='corners_left'></span>
							</div>
						</a>
					</div>
				</div>
			</div>
		</div>
	);
};

export default connect((state: IApplicationState) => state.dashboard, dashboardActions)(Dashboard as ComponentType);
