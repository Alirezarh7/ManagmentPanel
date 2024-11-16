import React from 'react';
import { MdOutlineChevronLeft, MdOutlineChevronRight } from 'react-icons/md';
import PaginationButton from './PaginationButton';

interface IProps {
	currentPage: number;
	currentSize: number;
	pageCount: number;
	setNewPageHandler: (newPage: number) => void;
	setNewSizeHandler: (newSize: number) => void;
}

const Pagination = ({ currentPage, currentSize, pageCount, setNewPageHandler, setNewSizeHandler }: IProps) => {
	const shouldDisableFirstPage = currentPage === 1;
	const shouldDisablePrevPage = currentPage === 1;
	const shouldDisableNextPage = currentPage === pageCount;
	const shouldDisableLastPage = currentPage === pageCount;

	const availablePageSizes = [10, 20, 50, 100, 500];

	const paginationClickHandler = (type: 'first' | 'prev' | 'next' | 'last') => {
		if (type === 'first' && currentPage !== 1) {
			setNewPageHandler(1);
		} else if (type === 'prev' && currentPage !== 1) {
			setNewPageHandler(currentPage - 1);
		} else if (type === 'next' && currentPage < pageCount) {
			setNewPageHandler(currentPage + 1);
		} else if (type === 'last' && currentPage !== pageCount) {
			setNewPageHandler(pageCount);
		}
	};

	return (
		<div className='mt-3 pt-2 flex justify-between items-center border-t !border-t-gray-200'>
			<span className='text-sm text-gray-700'>
				صفحه
				<span className='font-semibold text-gray-900 mx-2'>{currentPage}</span>
				از
				<span className='font-semibold text-gray-900 mx-2'>{pageCount}</span>
			</span>

			<div className='flex justify-center items-center gap-2'>
				<select
					className='h-9 w-20'
					value={currentSize}
					onChange={e => {
						const newValue = Number(e.target.value);
						setNewSizeHandler(newValue);
					}}>
					{availablePageSizes.map(item => (
						<option key={item} value={item}>
							{item}
						</option>
					))}
				</select>

				<PaginationButton onClick={() => paginationClickHandler('first')} isDisabled={shouldDisableFirstPage}>
					اول
				</PaginationButton>
				<PaginationButton onClick={() => paginationClickHandler('prev')} isDisabled={shouldDisablePrevPage}>
					<MdOutlineChevronRight />
				</PaginationButton>
				<span className='font-semibold text-gray-900 mx-2'>{currentPage}</span>
				<PaginationButton onClick={() => paginationClickHandler('next')} isDisabled={shouldDisableNextPage}>
					<MdOutlineChevronLeft />
				</PaginationButton>
				<PaginationButton onClick={() => paginationClickHandler('last')} isDisabled={shouldDisableLastPage}>
					آخر
				</PaginationButton>
			</div>
		</div>
	);
};

export default Pagination;
