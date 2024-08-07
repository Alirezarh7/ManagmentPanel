import { IConfigResponse } from '../../typs/config.types';
import ConfigsTableRow from './ConfigsTableRow';

interface IProps {
	configs: IConfigResponse[] | undefined;
}

const ConfigsTable = ({ configs }: IProps) => {
	return (
		<div className='rounded-md border !border-stroke bg-white md:px-4 md:py-4 space-y-2 shadow-default dark:border-strokedark dark:bg-boxdark'>
			<div className='max-w-full overflow-x-auto'>
				<table className='w-full table-auto'>
					<thead>
						<tr className='bg-gray-100 text-right dark:bg-meta-4'>
							<th className='w-[50px] py-3 px-1 text-center font-medium text-black dark:text-white'>آی دی</th>
							<th className='min-w-[100px] max-w-[200px] py-3 px-3 font-medium text-black dark:text-white'>نوع سرویس</th>
							<th className='w-[120px] py-3 px-1 text-center font-medium text-black dark:text-white'> تکمیل اطلاعات</th>
							<th className='w-[120px] py-3 px-1 text-center font-medium text-black dark:text-white'>گروه بندی</th>
							<th className='w-[200px] py-3 px-1 text-center font-medium text-black dark:text-white'>رزرو</th>
							<th className='w-[200px] py-3 px-1 text-center font-medium text-black dark:text-white'>پرداخت</th>
							<th className='w-[200px] py-3 px-1 text-center font-medium text-black dark:text-white'>عملیات</th>
						</tr>
					</thead>
					<tbody>{configs?.map(item => <ConfigsTableRow key={item.id} data={item} />)}</tbody>
				</table>
			</div>
		</div>
	);
};

export default ConfigsTable;
