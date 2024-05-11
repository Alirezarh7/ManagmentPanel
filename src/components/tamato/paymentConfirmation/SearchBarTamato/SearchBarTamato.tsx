import React from 'react';
import '../PaymentConfirmation.css';

interface data {
	codeTracking: string | undefined;
	CodeTrackingHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
	paymentHadler: () => void;
}

const SearchBarTamato = (props: data) => {
	return (
		<form className='m-2 mt-4'>
			<div className='flex justify-center items-center gap-1 '>
				<label>کدرهگیری:</label>
				<div className='overflow-hidden flex border !border-black rounded-lg'>
					<input
						className='bg-[#fffcee] border-0 outline-0 '
						name='nationalCode'
						value={props.codeTracking}
						onChange={props.CodeTrackingHandler}
					/>
					<button
						onClick={props.paymentHadler}
						type={'button'}
						className='border-r !border-[#c0d2e7] outline-0 bg-[#05251E] text-[#f1f3d0] px-2'>
						بازیابی
					</button>
				</div>
			</div>
		</form>
	);
};
export default SearchBarTamato;
