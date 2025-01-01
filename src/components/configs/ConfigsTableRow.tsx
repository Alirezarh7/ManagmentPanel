import React, { useState } from 'react';
import { FaRegEdit } from 'react-icons/fa';
import { configTypes } from '../../constants/general.const';
import { IConfigResponse } from '../../typs/config.types';
import EditConfigModal from './EditConfigModal';

interface IProps {
	data: IConfigResponse;
}

const ConfigsTableRow = ({ data }: IProps) => {
	const [showEditModal, setShowEditModal] = useState(false);

	const getServiceDetails = (serviceType: string): { label: string; classes: string } => {
		const service = configTypes.find(q => q.name === serviceType);
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

	const getBooleanTd = (value: boolean) => {
		if (value) {
			return <td className='py-2 px-1 text-center text-green-400 dark:border-strokedark'>فعال</td>;
		}
		return <td className='py-2 px-1 text-center text-red-400 dark:border-strokedark'>غیرفعال</td>;
	};

	return (
		<>
			<tr className='border-b hover:bg-gray-100'>
				<td className='py-2 px-3 dark:border-strokedark'>
					<span
						className={`bg-opacity-10 p-1 md:px-4 text-sm font-medium rounded-2xl ${getServiceDetails(data.configActionType).classes}`}>
						{getServiceDetails(data.configActionType).label}
					</span>
				</td>
				{getBooleanTd(data.isOpenPassengerGroup)}
				{getBooleanTd(data.isOpenReserve)}
				{getBooleanTd(data.isOpenPayment)}
				{getBooleanTd(data.isOpenCompletion)}
				{getBooleanTd(data.isActive)}
				<td className='py-2 px-3 dark:border-strokedark'>
					<div className='flex justify-center items-center'>
						<button className='hover:hover:text-primary'>
							<FaRegEdit className='w-5 h-5' onClick={() => setShowEditModal(true)} />
						</button>
					</div>
				</td>
			</tr>
			<EditConfigModal
				data={data}
				isOpen={showEditModal}
				onSuccess={() => setShowEditModal(false)}
				onCancel={() => setShowEditModal(false)}
			/>
		</>
	);
};

export default ConfigsTableRow;
