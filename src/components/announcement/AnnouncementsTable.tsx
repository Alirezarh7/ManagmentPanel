import React from 'react';
import { IAnnouncementResponse } from '../../typs/announcement.types';
import AnnouncementsTableRow from './AnnouncementsTableRow';

interface IProps {
	data: IAnnouncementResponse[] | undefined;
}

const AnnouncementsTable = ({ data }: IProps) => {
	return (
		<div className='rounded-md border !border-stroke bg-white md:px-4 md:py-4 shadow-default dark:border-strokedark dark:bg-boxdark'>
			<div className='max-w-full overflow-x-auto'>
				<table className='w-full table-auto'>
					<thead>
						<tr className='bg-gray-100 text-right dark:bg-meta-4'>
							<th className='py-3 px-3 font-medium text-black dark:text-white'>آی دی</th>
							<th className='py-3 px-3 min-w-[120px] font-medium text-black dark:text-white'>تصویر</th>
							<th className='min-w-[150px] py-3 px-3 font-medium text-black dark:text-white'>موضوع اطلاعیه</th>
							<th className='max-md:hidden min-w-[120px] py-3 px-3 font-medium text-black dark:text-white'>اطلاعیه فعال</th>
							<th className='max-md:hidden min-w-[120px] py-3 px-3 font-medium text-black dark:text-white'>اطلاعیه صفحه اصلی</th>
							<th className='min-w-[120px] py-3 px-3 font-medium text-black dark:text-white'>سرویس اطلاعیه</th>
							<th className='max-sm:hidden min-w-[120px] py-3 px-3 font-medium text-black dark:text-white'>زمان شروع نمایش</th>
							<th className='py-3 px-3 font-medium text-black dark:text-white'>عملیات</th>
						</tr>
					</thead>
					<tbody>{data?.map(item => <AnnouncementsTableRow key={item.id} data={item} />)}</tbody>
				</table>
			</div>
		</div>
	);
};

export default AnnouncementsTable;
