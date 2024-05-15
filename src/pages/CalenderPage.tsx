import React from 'react';
import useTitle from '../hooks/useTitle';
import { DateObject } from 'react-multi-date-picker';
import { Calendar } from 'react-multi-date-picker';
import persian from 'react-date-object/calendars/persian';
import persian_fa from 'react-date-object/locales/persian_fa';
import Breadcrumb from '../components/Layout/Breadcrumb';

const CalenderPage = () => {
	useTitle('calender', 'ناوشگران');

	return (
		<div className='space-y-4'>
			<Breadcrumb items={[{ label: 'تقویم' }]} />

			<div className='p-2'>
				<div className='lg:hidden flex justify-center items-start'>
					<Calendar value={new DateObject()} calendar={persian} locale={persian_fa} />
				</div>
				<div className='max-lg:hidden flex justify-center items-start'>
					<Calendar fullYear={true} value={new DateObject()} calendar={persian} locale={persian_fa} />
				</div>
			</div>
		</div>
	);
};

export default CalenderPage;
