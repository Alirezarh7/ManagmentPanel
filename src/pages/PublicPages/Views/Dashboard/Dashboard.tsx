import { ComponentType, useEffect, useMemo } from 'react';
import { IDashboardState } from '../../Actions/Dashboard/model';
import { dashboardActions } from '../../Actions/Dashboard/action';
import { IApplicationState } from '../../../../store/state';
import { connect } from 'react-redux';
import useTitle from '../../../../hooks/useTitle';
import './dashboard.css';
import DashboardOperationCards from '../../../../components/dashbord/oporationCards/DashboardOperationCards';
import ApplicationCard from './ApplicationCard/ApplicationCard';
import { filteredFaqData } from '../../../../constants/faq.const';
import FaqAccordion from '../../../../components/faq/FaqAccordion';
import { Link } from 'react-router-dom';
import { useWindowScroll } from '@uidotdev/usehooks';
import ScrollToTopButton from '../../../../components/general/Buttons/ScrollToTopButton';
import Carousel from '../../../../components/general/Carousel/Carousel';

type IProps = typeof dashboardActions & IDashboardState;

const Dashboard = (props: IProps) => {
	const [{ x, y }, scrollTo] = useWindowScroll();
	const { roles } = props.userClaims;
	useTitle('mainSettings');

	const faqData = useMemo(() => filteredFaqData, []);

	useEffect(() => {
		props.setCrumbs([]);
	}, []);
	// ${y! >= 200 ? "fixed" : "absolute"}
	return (
		<div className='w-full max-w-screen-xl mx-auto flex flex-col gap-16 '>
			<div className='absolute w-full max-w-screen-xl px-[12px]  mx-auto left-0 right-0 top-[92px] lg:top-[10px] z-[100]'>
				<DashboardOperationCards />
			</div>
			<div className=' w-screen lg:mt-[190px] mt-[130px] max-w-screen-xl mx-auto  '>
				<Carousel />
			</div>
			<div className='max-xl:hidden z-10'>{/*<ScrollToTopButton />*/}</div>
		</div>
	);
};

export default connect((state: IApplicationState) => state.dashboard, dashboardActions)(Dashboard as ComponentType<any>);

// <div className='max-w-screen-xl mx-auto'>
// 	<h1 className='mb-4 font-bold text-xl'>بخشی از سوالات متدوال</h1>
// 	{faqData.map((item, index) => (
// 		<div key={index} className='my-4 flex flex-col gap-4'>
// 			<h4 className='font-semibold text-base text-red-800'>{item.category}</h4>
// 			<FaqAccordion questions={item.questions}/>
// 			<Link
// 				to={'/faq'}
// 				className='w-full bg-blue-600 flex justify-center items-center text-white my-3 text-lg py-2 rounded-xl'>
// 				مشاهده همه سوالات متداول
// 			</Link>
// 		</div>
// 	))}
// </div>
