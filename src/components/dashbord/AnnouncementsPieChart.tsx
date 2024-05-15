import { ApexOptions } from 'apexcharts';
import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { IAnnouncementsStatistics } from '../../typs/announcement.types';
import { FaCircle } from 'react-icons/fa6';
import { round } from 'lodash';

interface ChartThreeState {
	series: number[];
}

const options: ApexOptions = {
	chart: {
		fontFamily: 'inherit',
		type: 'donut'
	},
	colors: ['#7235b8', '#6577F3', '#2a23de', '#485d6e', '#7b8041'],
	labels: ['تمتع', 'عمره', 'عتبات', 'اربعین', 'سوریه'],
	legend: {
		show: false,
		position: 'bottom'
	},

	plotOptions: {
		pie: {
			donut: {
				size: '65%',
				background: 'transparent'
			}
		}
	},
	dataLabels: {
		enabled: false
	},
	responsive: [
		{
			breakpoint: 1200,
			options: {
				chart: {
					width: 300
				}
			}
		}
	]
};

interface IProps {
	statistics: IAnnouncementsStatistics | undefined;
}
const AnnouncementsPieChart = ({ statistics }: IProps) => {
	const [seriesData, setSeriesData] = useState<ChartThreeState>({
		series: []
	});

	const calculatePercentage = (count: string) => {
		if (!statistics) return 0;
		return round((Number(count) / Number(statistics.allActive)) * 100);
	};

	useEffect(() => {
		const chartData: ChartThreeState = {
			series: [
				Number(statistics?.tamato),
				Number(statistics?.omreh),
				Number(statistics?.atabat),
				Number(statistics?.arbaein),
				Number(statistics?.soria)
			]
		};
		if (statistics) setSeriesData(chartData);
	}, [statistics]);

	if (!statistics) {
		return <></>;
	}

	return (
		<div className='md:p-3 rounded-md border border-stroke bg-white dark:border-strokedark dark:bg-boxdark'>
			<div className='p-2 flex flex-col items-start gap-4'>
				<h5 className='text-xl font-semibold text-black dark:text-white'>آمار اطلاعیه ها</h5>
				<div>
					<h5 className='text-base font-semibold text-gray-400 dark:text-white'>
						<span> مجموع :</span>
						<span> ({statistics.all}) </span>
						<span>عدد</span>
					</h5>
					<h5 className='text-base font-semibold text-gray-400 dark:text-white'>
						<span> فعال :</span>
						<span> ({statistics.allActive}) </span>
						<span>عدد</span>
					</h5>
				</div>
			</div>

			<div className='mb-2 max-w-full'>
				<div id='chartThree' className='mx-auto flex justify-center'>
					<ReactApexChart options={options} series={seriesData.series} type='donut' />
				</div>
			</div>

			<div className='p-2 grid lg:grid-cols-2 gap-3'>
				<div className='px-2 flex justify-between items-center gap-2 text-sm font-medium'>
					<FaCircle className='w-4 h-4 text-[#7235b8]' />
					<span className='flex-1'>تمتع</span>
					<span>{calculatePercentage(statistics.tamato)} % </span>
				</div>
				<div className='px-2 flex justify-between items-center gap-2 text-sm font-medium'>
					<FaCircle className='w-4 h-4 text-[#6577F3]' />
					<span className='flex-1'>عمره</span>
					<span>{calculatePercentage(statistics.omreh)} % </span>
				</div>
				<div className='px-2 flex justify-between items-center gap-2 text-sm font-medium'>
					<FaCircle className='w-4 h-4 text-[#2a23de]' />
					<span className='flex-1'>عتبات</span>
					<span>{calculatePercentage(statistics.atabat)} % </span>
				</div>
				<div className='px-2 flex justify-between items-center gap-2 text-sm font-medium'>
					<FaCircle className='w-4 h-4 text-[#485d6e]' />
					<span className='flex-1'>اربعین</span>
					<span>{calculatePercentage(statistics.arbaein)} % </span>
				</div>
				<div className='px-2 flex justify-between items-center gap-2 text-sm font-medium'>
					<FaCircle className='w-4 h-4 text-[#7b8041]' />
					<span className='flex-1'>سوریه</span>
					<span>{calculatePercentage(statistics.soria)} % </span>
				</div>
			</div>
		</div>
	);
};

export default AnnouncementsPieChart;
