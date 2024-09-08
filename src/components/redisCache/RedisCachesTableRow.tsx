import React, { useState } from 'react';
import { FaRegEdit } from 'react-icons/fa';
import { FiEye } from 'react-icons/fi';
import { AiOutlineDelete } from 'react-icons/ai';
import ViewRedisCacheModal from './ViewRedisCacheModal';
import EditRedisCacheModal from './EditRedisCacheModal';
import DeleteRedisCacheModal from './DeleteRedisCacheModal';

interface IProps {
	index: number;
	cacheKey: string;
}

const RedisCachesTableRow = ({ index, cacheKey }: IProps) => {
	const [showViewModal, setShowViewModal] = useState(false);
	const [showEditModal, setShowEditModal] = useState(false);
	const [showDeleteModal, setShowDeleteModal] = useState(false);

	return (
		<>
			<tr className='border-b hover:bg-gray-100 text-black dark:text-white'>
				<td className='py-2 px-1 text-center'>{index}</td>
				<td className='py-2 px-3'>{cacheKey}</td>
				<td className='py-2 px-3'>
					<div className='flex justify-center items-center gap-4'>
						<button className='hover:hover:text-primary'>
							<FiEye className='w-5 h-5' onClick={() => setShowViewModal(true)} />
						</button>
						<button className='hover:hover:text-primary'>
							<FaRegEdit className='w-5 h-5' onClick={() => setShowEditModal(true)} />
						</button>
						<button className='hover:hover:text-primary'>
							<AiOutlineDelete className='w-5 h-5' onClick={() => setShowDeleteModal(true)} />
						</button>
					</div>
				</td>
			</tr>
			{showViewModal && (
				<ViewRedisCacheModal
					cacheKey={cacheKey}
					isOpen={true}
					onSuccess={() => setShowViewModal(false)}
					onCancel={() => setShowViewModal(false)}
				/>
			)}
			{showEditModal && (
				<EditRedisCacheModal
					cacheKey={cacheKey}
					isOpen={true}
					onSuccess={() => setShowEditModal(false)}
					onCancel={() => setShowEditModal(false)}
				/>
			)}
			{showDeleteModal && (
				<DeleteRedisCacheModal
					cacheKey={cacheKey}
					isOpen={true}
					onSuccess={() => setShowDeleteModal(false)}
					onCancel={() => setShowDeleteModal(false)}
				/>
			)}
		</>
	);
};

export default RedisCachesTableRow;
