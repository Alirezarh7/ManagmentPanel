import React, { ComponentType, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { dashboardActions } from '../../../pages/PublicPages/Actions/Dashboard/action';
import { IApplicationState } from '../../../store/state';
import { connect } from 'react-redux';
import { IDashboardState } from '../../../pages/PublicPages/Actions/Dashboard/model';
import { FaHome } from 'react-icons/fa';

type IProps = typeof dashboardActions & IDashboardState;

const BreadCrumb = (props: IProps) => {
	const [t] = useTranslation();
	return (
		<nav aria-label='breadcrumb' className='h-[30px] w-full max-w-screen-xl mx-auto flex items-center gap-2'>
			{props.crumbs.length === 0 ? (
				<span>{t('homePage')}</span>
			) : (
				<Link to='/'>
					<FaHome className='h-4 w-4' />
				</Link>
				// </li>
			)}
			{props.crumbs?.map((crumb, index: number) =>
				index === props.crumbs.length - 1 ? (
					<Fragment key={index}>
						<span>/</span>
						<span>{t(crumb.title)}</span>
					</Fragment>
				) : (
					<Fragment key={index}>
						<span>/</span>
						{crumb.link === '' ? <span>{t(crumb.title)}</span> : <Link to={crumb.link}>{t(crumb.title)}</Link>}
					</Fragment>
				)
			)}
		</nav>
	);
};

export default connect((state: IApplicationState) => state.dashboard, dashboardActions)(BreadCrumb as ComponentType);
