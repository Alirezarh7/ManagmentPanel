import { useParams } from 'react-router-dom';
import Breadcrumb from '../../components/Layout/Breadcrumb';
import { PATHS } from '../../router/paths';
import CustomInput from '../../components/general/inputs/CustomInput';
import { serviceTypes, subServiceTypes } from '../../constants/general.const';
import CustomLineSpinner from '../../components/general/spinners/CustomLineSpinner';
import { useGetFaqContentById } from '../../services/faqContent.service';

const FaqContentsShowDetailsPage = () => {
	const { id } = useParams();
	const { data, isLoading, isFetching } = useGetFaqContentById(id ?? '');

	return (
		<div className='space-y-4'>
			<Breadcrumb items={[{ label: 'سوالات پرتکرار', url: PATHS.faqContents.index }, { label: 'مشاهده' }]} />
			<h1 className='text-xl mb-3'>مشاهده سوال پرتکرار </h1>

			{isLoading || isFetching ? <CustomLineSpinner /> : null}

			{!isLoading && data && (
				<div className='max-w-screen-xl w-full mx-auto flex flex-col'>
					<div className='grid grid-cols-3 gap-4'>
						<CustomInput label='آی دی' type={'text'} value={data.id} onChange={() => {}} disabled={true} />
						<CustomInput
							label='نوع خدمت'
							type={'text'}
							value={serviceTypes.find(q => q.id === data.serviceTypeId)?.nameFa ?? 'نامشخص'}
							onChange={() => {}}
							disabled={true}
						/>
						<CustomInput
							label='نوع زیر-خدمت'
							type={'text'}
							value={subServiceTypes.find(q => q.id === data.subServiceTypeId)?.nameFa ?? 'نامشخص'}
							onChange={() => {}}
							disabled={true}
						/>
					</div>
					<div>
						<CustomInput
							className='col-span-2'
							label='سوال'
							type={'text'}
							value={data.question}
							onChange={() => {}}
							disabled={true}
						/>
						<div className='col-span-2'>
							<label className='form-label'>جواب</label>
							<div
								dangerouslySetInnerHTML={{ __html: data.answer }}
								className='w-full px-3 py-3 text-base border border-gray-300 rounded-md'></div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default FaqContentsShowDetailsPage;
