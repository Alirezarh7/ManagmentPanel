import React from 'react';
import FaqContentsTableRow from './FaqContentsTableRow';
import { IFaqContentResponse } from '../../typs/faqContent.types';

interface IProps {
	faqContents: IFaqContentResponse[] | undefined;
}

const FaqContentsTable = ({ faqContents }: IProps) => {
	return (
		<div className='rounded-md border !border-stroke bg-white md:px-4 md:py-4 space-y-2 shadow-default dark:border-strokedark dark:bg-boxdark'>
			<div className='max-w-full overflow-x-auto'>
				<table className='w-full table-auto'>
					<thead>
						<tr className='bg-gray-100 text-right dark:bg-meta-4'>
							<th className=' max-md:hidden py-3 px-1 text-center font-medium text-black dark:text-white'>آی دی</th>
							<th className=' py-3 font-medium text-black dark:text-white'> سوال</th>
							<th className=' max-md:hidden  py-3 px-1 text-center font-medium text-black dark:text-white'>خدمت</th>
							<th className=' py-3 px-1 text-center font-medium text-black dark:text-white'>زیر خدمت</th>
							<th className=' py-3 px-1 text-center font-medium text-black dark:text-white'>عملیات</th>
						</tr>
					</thead>
					<tbody>{faqContents?.map(item => <FaqContentsTableRow key={item.id} data={item} />)}</tbody>
				</table>
			</div>
		</div>
	);
};

export default FaqContentsTable;
