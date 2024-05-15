import React from 'react';
import { useParams } from 'react-router-dom';
import { useGetAnnouncementById } from '../../services/announcement.service';
import Breadcrumb from '../../components/Layout/Breadcrumb';
import { PATHS } from '../../router/paths';
import CustomInput from '../../components/general/inputs/CustomInput';
import { AnnouncementServiceTypes } from '../../constants/announcement.const';
import { DateObject } from 'react-multi-date-picker';
import persian from 'react-date-object/calendars/persian';
import persian_fa from 'react-date-object/locales/persian_fa';
import CustomLineSpinner from '../../components/general/spinners/CustomLineSpinner';

const AnnouncementsShowDetailsPage = () => {
	const { id } = useParams();
	const { data, isLoading } = useGetAnnouncementById(id ?? '');

	console.log(data);

	return (
		<div className='space-y-4'>
			<Breadcrumb items={[{ label: 'اطلاعیه ها', url: PATHS.announcements.index }, { label: 'مشاهده' }]} />
			<h1 className='text-xl mb-3'>مشاهده اطلاعیه </h1>

			{isLoading && <CustomLineSpinner />}

			{!isLoading && data && (
				<div className='max-w-screen-xl w-full mx-auto flex flex-col'>
					<div className='grid grid-cols-3 gap-4'>
						<div className='col-span-2'>
							<CustomInput label='آی دی' type={'text'} value={data.id} onChange={() => {}} disabled={true} />
							<CustomInput
								label='سرویس اطلاعیه'
								type={'text'}
								value={AnnouncementServiceTypes.find(q => q.id === data.serviceTypeId)?.nameFa ?? 'نامشخص'}
								onChange={() => {}}
								disabled={true}
							/>
							<CustomInput
								label='وضعیت فعال بودن اطلاعیه'
								type={'text'}
								value={data.isActive ? 'فعال' : 'غیر فعال'}
								onChange={() => {}}
								disabled={true}
							/>
							<CustomInput
								label='آیا اطلاعیه در صفحه اصلی نمایش داده شود؟'
								type={'text'}
								value={data.isActive ? 'بلی' : 'خیر'}
								onChange={() => {}}
								disabled={true}
							/>
							<CustomInput
								label='مدت نمایش (به روز)'
								type={'text'}
								value={data.showDuration?.toString() || 'نامشخص'}
								onChange={() => {}}
								disabled={true}
							/>
							<CustomInput
								label='زمان شروع نمایش'
								type={'text'}
								value={new DateObject(data.showFromDate).convert(persian, persian_fa).format('DD MMMM سال YYYY')}
								onChange={() => {}}
								disabled={true}
							/>
						</div>
						<div>
							<label className='form-label'>تصویر اطلاعیه</label>
							<img src={data.image} alt='تصویر آگهی' className='max-w-96 rounded-md' />
						</div>
					</div>
					<div>
						<CustomInput
							className='col-span-2'
							label='موضوع اطلاعیه'
							type={'text'}
							value={data.subject}
							onChange={() => {}}
							disabled={true}
						/>
						<div className='col-span-2'>
							<label className='form-label'>متن اطلاعیه</label>
							<div
								dangerouslySetInnerHTML={{ __html: data.body }}
								className='w-full px-3 py-3 text-base border border-gray-300 rounded-md'></div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default AnnouncementsShowDetailsPage;
