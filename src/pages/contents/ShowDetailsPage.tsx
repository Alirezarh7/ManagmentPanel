import React from 'react';
import { useParams } from 'react-router-dom';
import Breadcrumb from '../../components/Layout/Breadcrumb';
import { PATHS } from '../../router/paths';
import CustomInput from '../../components/general/inputs/CustomInput';
import { announcementServiceTypes } from '../../constants/announcement.const';
import CustomLineSpinner from '../../components/general/spinners/CustomLineSpinner';
import { useGetContentById } from '../../services/content.service';
import { contentLocations } from '../../constants/content.const';

const ContentsShowDetailsPage = () => {
	const { id } = useParams();
	const { data, isLoading } = useGetContentById(id ?? '');

	console.log(data);

	return (
		<div className='space-y-4'>
			<Breadcrumb items={[{ label: 'محتویات', url: PATHS.contents.index }, { label: 'مشاهده' }]} />
			<h1 className='text-xl mb-3'>مشاهده جزئیات محتوا </h1>

			{isLoading && <CustomLineSpinner />}

			{!isLoading && data && (
				<div className='max-w-screen-xl w-full mx-auto flex flex-col'>
					<div className='grid grid-cols-3 gap-4'>
						<CustomInput label='آی دی' type={'text'} value={data.id} onChange={() => {}} disabled={true} />
						<CustomInput
							label='سرویس محتوا'
							type={'text'}
							value={announcementServiceTypes.find(q => q.id === data.serviceTypeId)?.nameFa ?? 'نامشخص'}
							onChange={() => {}}
							disabled={true}
						/>
						<CustomInput
							label='مکان محتوا'
							type={'text'}
							value={contentLocations.find(q => q.id === data.contentLocationId)?.nameFa ?? 'نامشخص'}
							onChange={() => {}}
							disabled={true}
						/>
					</div>
					<div>
						<CustomInput
							className='col-span-2'
							label='موضوع محتوا'
							type={'text'}
							value={data.subject}
							onChange={() => {}}
							disabled={true}
						/>
						<div className='col-span-2'>
							<label className='form-label'>متن محتوا</label>
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

export default ContentsShowDetailsPage;
