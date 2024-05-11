import React from 'react';
import { Translation } from 'react-i18next';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { IApplicationState } from '../../../store/state';
import { dashboardActions } from '../../../pages/PublicPages/Actions/Dashboard/action';
import './linkedMenu.css';

interface IProps {
	href: string;
	color: string;
	image: string;
	title: string;
	role: string[];
}

const LinkedMenuCard = ({ color, href, image, role, title }: IProps) => {
	return (
		<div className='col-sm-4 col-lg-4 m-4'>
			<Link
				to={`/${href}`}
				className='nap-dashboard_item flex justify-center items-center p-5 h-100 rounded shadow-sm'
				style={{ backgroundColor: `${color}` }}>
				<div
					className='bg-cover opacity-3 position-absolute full-offset'
					// style={{
					//   backgroundImage: `url('content/images/image-${image}.jpg')`,
					// }}
				></div>
				<Translation>{t => <span className='position-relative z-1 p-3 text-center text-nowrap'>{t(title)}</span>}</Translation>
				<div className='corners'>
					<span className='corners_top'></span>
					<span className='corners_right'></span>
					<span className='corners_bottom'></span>
					<span className='corners_left'></span>
				</div>
			</Link>
		</div>
	);
};

export default connect((state: IApplicationState) => state.dashboard, dashboardActions)(LinkedMenuCard);
