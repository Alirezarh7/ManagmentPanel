import React from 'react';
import './CardPeyment.css';
import PaymentLogo from '../../../../assets/PaymentLogo.png';
import { useTranslation } from 'react-i18next';

const fields: {
	id: number;
	name: string;
	label: string;
}[] = [
	{ id: 0, name: 'paymentDate', label: 'تاریخ پرداخت ' },
	{ id: 1, name: 'paymentTime', label: 'ساعت پرداخت' },
	{ id: 2, name: 'paymentType', label: 'نوع فیش پرداختی' },
	{ id: 3, name: 'amount', label: 'مبلغ' },
	{ id: 4, name: 'branchCode', label: 'شعبه' },
	{ id: 5, name: 'sibaTraceTracking', label: 'کد رهگیری بانک' }
];
interface IProps {
	paymentDate: string | number;
	paymentTime: string | number;
	paymentType: string | number;
	amount: string | number;
	branchCode: string | number;
	sibaTraceTracking: string | number;
}
const CardPymentInformation = (props: IProps) => {
	const [t] = useTranslation();

	const inputFields = fields.map(item => {
		return (
			<div key={item.id} className='flex m-px'>
				<div>
					<strong className=''> {item.label} : </strong>
				</div>
				<div className=''>
					<p>{props[item.name as keyof IProps]}</p>
				</div>
			</div>
		);
	});

	return (
		<div className='flex justify-center mt-3'>
			<div className='w-4/5 flex flex-col justify-center  bg-[#eee] border !border-black border-1 rounded-tl-lg rounded-tr-lg'>
				<div className=' w-full flex justify-center bg-[#0c3a2f] rounded-tl-lg rounded-tr-lg text-[#f1f3d0] '>
					<strong>اطلاعات پرداخت</strong>
				</div>
				<div className='w-full flex justify-center '>
					<div className='w-1/6 flex justify-center items-center m-2'>
						<img className={'w-12 h-12'} alt='payLogo' src={PaymentLogo} />
					</div>
					<div className=' w-5/6 grid grid-cols-3 gap-2 border-r-2 border-solid !border-r-black'>
						{inputFields.map((field, index) => (
							<div key={index} className='w-full m-px mx-3'>
								{field}
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default CardPymentInformation;
