import React, { useState } from 'react';
import { IAnnouncementResponse, TAnnouncementShowType } from '../../typs/announcement.types';
import AnnouncementsTableRow from './AnnouncementsTableRow';
import CustomButton from '../general/Buttons/CustomButton';

interface IProps {
	announcements: IAnnouncementResponse[] | undefined;
	announcementsByMainPage: IAnnouncementResponse[] | undefined;
}

const AnnouncementsTable = ({ announcements, announcementsByMainPage }: IProps) => {
	const [showType, setShowType] = useState<TAnnouncementShowType>('all');

	const selectedSourceToShow = showType === 'all' ? announcements : announcementsByMainPage;

	return (
		<div className='rounded-md border !border-stroke bg-white md:py-4 space-y-2 shadow-default dark:border-strokedark dark:bg-boxdark'>
			<div className='flex items-center gap-4'>
				<CustomButton variant={'primary'} type={'button'} label={'همه'} onClick={() => setShowType('all')} />
				<CustomButton variant={'primary'} type={'button'} label={'صفحه اصلی'} onClick={() => setShowType('mainPage')} />
			</div>
			<div className='max-w-full'>
				<table className='w-full table-auto'>
					<thead>
						<tr className='bg-gray-100 text-right dark:bg-meta-4'>
							<th className='max-md:hidden w-[50px] py-3 px-1 text-center font-medium text-black dark:text-white'>آی دی</th>
							<th className='py-3 px-1 w-[110px] text-center font-medium text-black dark:text-white'>تصویر</th>
							<th className='min-w-[200px] max-w-[200px] py-3 px-3 font-medium text-black dark:text-white'>موضوع اطلاعیه</th>
							{showType === 'all' ? (
								<th className='max-md:hidden w-[60px] py-3 px-1 text-center font-medium text-black dark:text-white'> فعال</th>
							) : null}
							{showType === 'all' ? (
								<th className='max-md:hidden w-[80px] py-3 px-1 text-center  font-medium text-black dark:text-white'>
									صفحه اصلی
								</th>
							) : null}
							<th className='max-md:hidden w-[120px] py-3 px-1 text-center font-medium text-black dark:text-white'>سرویس اطلاعیه</th>
							{showType === 'all' ? (
								<th className='max-sm:hidden w-[120px] py-3 px-1 text-center font-medium text-black dark:text-white'>
									زمان شروع نمایش
								</th>
							) : null}
							{showType === 'all' ? (
								<th className='max-sm:hidden w-[120px] py-3 px-1 text-center font-medium text-black dark:text-white'>
									زمان پایان نمایش
								</th>
							) : null}
							<th className='py-3 px-3 font-medium text-black dark:text-white'>عملیات</th>
						</tr>
					</thead>
					<tbody>
						{selectedSourceToShow?.map(item => <AnnouncementsTableRow key={item.id} data={item} showType={showType} />)}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default AnnouncementsTable;
