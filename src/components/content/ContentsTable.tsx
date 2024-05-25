import React from 'react';
import ContentsTableRow from './ContentsTableRow';
import { IContentResponse } from '../../typs/content.types';

interface IProps {
	contents: IContentResponse[] | undefined;
}

const ContentsTable = ({ contents }: IProps) => {
	return (
		<div className='rounded-md border !border-stroke bg-white md:px-4 md:py-4 space-y-2 shadow-default dark:border-strokedark dark:bg-boxdark'>
			<div className='max-w-full overflow-x-auto'>
				<table className='w-full table-auto'>
					<thead>
						<tr className='bg-gray-100 text-right dark:bg-meta-4'>
							<th className='w-[50px] py-3 px-1 text-center font-medium text-black dark:text-white'>آی دی</th>
							<th className='min-w-[200px] max-w-[200px] py-3 px-3 font-medium text-black dark:text-white'>موضوع محتوا</th>
							<th className='w-[120px] py-3 px-1 text-center font-medium text-black dark:text-white'>سرویس محتوا</th>
							<th className='w-[120px] py-3 px-1 text-center font-medium text-black dark:text-white'>مکان محتوا</th>
							<th className='w-[200px] py-3 px-1 text-center font-medium text-black dark:text-white'>عملیات</th>
						</tr>
					</thead>
					<tbody>{contents?.map(item => <ContentsTableRow key={item.id} data={item} />)}</tbody>
				</table>
			</div>
		</div>
	);
};

export default ContentsTable;
