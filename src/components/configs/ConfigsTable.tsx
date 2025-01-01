import { IConfigResponse } from '../../typs/config.types';
import ConfigsTableRow from './ConfigsTableRow';

interface IProps {
	configs: IConfigResponse[] | undefined;
}

const ConfigsTable = ({ configs }: IProps) => {
	return (
		<div className='rounded-md border !border-stroke bg-white md:px-4 md:py-4 space-y-2 shadow-default'>
			<div className='max-w-full '>
				<table className='w-full table-auto'>
					<thead>
					<tr className='bg-gray-100 text-right dark:bg-meta-4 max-sm:text-[9px]'>
						<th className=' py-3 px-3  text-black dark:text-white'>نوع سرویس</th>
						<th className=' py-3 px-0.5 text-center font-medium text-black  '>گروه بندی</th>
						<th className=' py-3 px-0.5 text-center font-medium text-black  '>رزرو</th>
						<th className=' py-3 px-0.5 text-center font-medium text-black  '>پرداخت</th>
						<th className=' py-3 px-0.5 text-center  font-medium text-black '> تکمیل اطلاعات</th>
						<th className=' py-3 px-0.5 text-center font-medium text-black  '>بروز رسانی</th>
						<th className=' py-3 px-0.5 text-center font-medium text-black  '>عملیات</th>

					</tr>
					</thead>
					<tbody>{configs?.map(item => <ConfigsTableRow key={item.id} data={item}/>)}</tbody>
				</table>
			</div>
		</div>
	);
};

export default ConfigsTable;
