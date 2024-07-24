import React, { useState } from 'react';
import { FiEye } from 'react-icons/fi';
import { FaRegEdit } from 'react-icons/fa';
import { AiOutlineDelete } from 'react-icons/ai';
import { serviceTypes, subServiceTypes } from '../../constants/general.const';
import DeleteFaqContentModal from './DeleteFaqContentModal';
import { useNavigate } from 'react-router-dom';
import { PATHS } from '../../router/paths';
import { IFaqContentResponse } from '../../typs/faqContent.types';

interface IProps {
	data: IFaqContentResponse;
}

const FaqContentsTableRow = ({ data }: IProps) => {
	const [showDeleteModal, setShowDeleteModal] = useState(false);
	const navigate = useNavigate();

	const getServiceDetails = (serviceType: string): { label: string; classes: string } => {
		const service = serviceTypes.find(q => q.name === serviceType);
		let classes: string = '';
		if (!service) return { label: 'نامشخص', classes: '' };
		switch (service.id) {
			case 1:
				classes += 'bg-meta-3 text-meta-3';
				break;
			case 2:
				classes += 'bg-meta-4 text-meta-4';
				break;
			case 3:
				classes += 'bg-meta-5 text-meta-5';
				break;
			case 4:
				classes += 'bg-meta-8 text-meta-8';
				break;
			case 5:
				classes += 'bg-meta-1 text-meta-1';
				break;
		}

		return {
			label: service.nameFa,
			classes
		};
	};

	return (
		<>
			<tr className='border-b hover:bg-gray-100'>
				<td className='py-2 px-1 text-center dark:border-strokedark'>
					<p className='text-black dark:text-white'>{data.id}</p>
				</td>
				<td className='py-2 px-3 dark:border-strokedark'>
					<p className='text-black dark:text-white'>
						{data.question.substring(0, 50)}
						{data.question.length > 50 ? '...' : ''}
					</p>
				</td>
				<td className='py-2 px-1 text-center dark:border-strokedark'>
					<span
						className={`bg-opacity-10 py-1 px-3  text-sm font-medium rounded-2xl ${getServiceDetails(data.serviceType).classes}`}>
						{getServiceDetails(data.serviceType).label}
					</span>
				</td>
				<td className='py-2 px-1 text-center dark:border-strokedark'>
					<span className='bg-opacity-10 py-1 px-3  text-sm font-medium rounded-2xl'>
						{subServiceTypes.find(q => q.name === data.subServiceType)?.nameFa}
					</span>
				</td>
				<td className='py-2 px-3 dark:border-strokedark'>
					<div className='flex justify-between items-center'>
						<button className='hover:hover:text-primary'>
							<FiEye className='w-5 h-5' onClick={() => navigate(PATHS.faqContents.showFn(data.id))} />
						</button>
						<button className='hover:hover:text-primary'>
							<FaRegEdit className='w-5 h-5' onClick={() => navigate(PATHS.faqContents.editFn(data.id))} />
						</button>
						<button className='hover:hover:text-primary'>
							<AiOutlineDelete className='w-5 h-5' onClick={() => setShowDeleteModal(true)} />
						</button>
					</div>
				</td>
			</tr>
			<DeleteFaqContentModal
				data={data}
				isOpen={showDeleteModal}
				onSuccess={() => setShowDeleteModal(false)}
				onCancel={() => setShowDeleteModal(false)}
			/>
		</>
	);
};

export default FaqContentsTableRow;
