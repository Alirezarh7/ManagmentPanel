import RedisCachesTableRow from './RedisCachesTableRow';
import Pagination from '../general/Table/Pagination';

interface IProps {
	keys: string[];
	currentPage: number;
	currentSize: number;
	pageCount: number;
	isLoading: boolean;
	setNewPageHandler: (newPage: number) => void;
	setNewSizeHandler: (newSize: number) => void;
}

const RedisCachesTable = ({
	keys,
	currentPage,
	currentSize,
	pageCount,
	isLoading,
	setNewPageHandler,
	setNewSizeHandler
}: IProps) => {
	return (
		<div className='rounded-md border !border-stroke bg-white md:px-4 md:py-4 space-y-2 shadow-default dark:border-strokedark dark:bg-boxdark'>
			<div className='max-w-full overflow-x-auto'>
				<table className='w-full table-auto'>
					<thead>
						<tr className='bg-gray-100 text-right dark:bg-meta-4'>
							<th className='w-[50px] py-3 px-1 text-center font-medium text-black dark:text-white'>آی دی</th>
							<th className=' py-3 px-3 font-medium text-black dark:text-white'>کلید کش</th>
							<th className='w-[200px] py-3 px-1 text-center font-medium text-black dark:text-white'>عملیات</th>
						</tr>
					</thead>
					<tbody>
						{keys.map((item, index) => (
							<RedisCachesTableRow key={index} cacheKey={item} index={index + 1} />
						))}
					</tbody>
				</table>
			</div>
			{keys.length > 0 ? null : <h5>هیچ کلیدی ثبت نشده است</h5>}
			<Pagination
				currentPage={currentPage}
				currentSize={currentSize}
				pageCount={pageCount}
				setNewPageHandler={setNewPageHandler}
				setNewSizeHandler={setNewSizeHandler}
			/>
		</div>
	);
};

export default RedisCachesTable;
