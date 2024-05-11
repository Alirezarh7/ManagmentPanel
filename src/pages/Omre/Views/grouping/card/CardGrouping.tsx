import React, { useState } from 'react';
import './CardGrouping.css';
import User from '../../../../assets/user.png';
import Bank from '../../../../assets/bank.png';
import OmreStepTwoModal from '../../Registration/StepTwo/Modal/Modal';
import GroupingModal from '../GroupingModal';
import DispatchingConditions from '../../Registration/DispatchingConditions';

type CardProps = {
	value: {
		bankName: string;
		zaerStatusMessage: string;
		ssn: string;
		phoneNumber: string;
		firstName: string;
		lastName: string;
		sanadNo: string;
		priority: string;
		birthDate: string;
	};
};

export const OmreCardData = (props: CardProps) => {
	const [show, setShow] = useState(false);
	const [showCondition, setShowCondition] = useState(false);
	const handleClose = () => {
		setShow(false);
	};
	const handleCloseCondition = () => {
		setShowCondition(false);
	};
	const handleShow = () => setShow(true);

	const { firstName, lastName, bankName, ssn, sanadNo, zaerStatusMessage, priority, phoneNumber, birthDate } = props.value;

	return (
		<>
			<DispatchingConditions show={showCondition} handleClose={handleCloseCondition} />
			<GroupingModal handleClose={handleClose} show={show} />
			<div className={`group_card justify-start text-justify my-4 position-relative`}>
				<div className='flex flex-col justify-start items-start data__information__group'>
					<div className='sm:flex hidden items-center justify-between w-full'>
						<div className='flex items-start'>
							<img loading={'lazy'} className='card__grouping__karvan__img' src={User} alt={'travel'} />
							<p className='kargozar__number__group'>{firstName + ' ' + lastName}</p>
						</div>
						<p className='text-secondary'> تاریخ تولد {birthDate}</p>
					</div>
					<div className='sm:flex hidden items-center justify-between w-full'>
						<div className='flex items-center mt-1'>
							<img className='card__grouping__karvan__img' alt='date' loading={'lazy'} src={Bank} />
							<p className='mb-0 mr-2 '>بانک</p>
						</div>
						<p className='text-secondary'>{bankName}</p>
					</div>

					<div className='sm:flex items-center flex-wrap hidden my-3'>
						<p className='mb-0 text-secondary py-1 px-3 rounded bg-light text-xs'> کد ملی {ssn}</p>
						<p className='mb-0 mr-2 text-secondary py-1 px-3 rounded bg-light text-xs'> کد اولویت {priority}</p>
						<p className='mb-0 mr-2 text-secondary py-1 px-3 rounded bg-light text-xs'> موبایل {phoneNumber}</p>
						<p className='mb-0 mr-2 text-secondary py-1 px-3 rounded bg-light text-xs'> شماره سند {sanadNo}</p>
					</div>

					{/*------------------- mobile show start*/}
					<div className='flex sm:hidden justify-center flex-col items-center w-full'>
						<img loading={'lazy'} className='card__grouping__karvan__img' src={User} alt={'user'} />
						<p className='kargozar__number__group  mt-3'> {firstName + ' ' + lastName} </p>
					</div>
					<div className='sm:hidden  flex flex-col w-full'>
						<div className='flex items-center justify-between mt-3'>
							<p className='text-secondary text-xs'> کد ملی </p>
							<p className='text-secondary text-xs'>{ssn}</p>
						</div>
						<div className='flex items-center justify-between mt-1'>
							<p className='text-secondary text-xs'> کد اولویت </p>
							<p className='text-secondary text-xs'>{priority}</p>
						</div>

						<div className='flex items-center sm:hidden justify-between w-full'>
							<p className='mb-0 text-secondary text-xs'>بانک</p>
							<p className='mb-0 text-secondary text-xs'> {bankName}</p>
						</div>
						<div className='flex items-center sm:hidden justify-between w-full mt-3'>
							<p className='mb-0 text-secondary text-xs'>شماره سند</p>
							<p className='mb-0 text-secondary text-xs'> {sanadNo}</p>
						</div>
						<div className='flex items-center sm:hidden justify-between w-full mt-3'>
							<p className='mb-0 text-secondary text-xs'>تاریخ تولد</p>
							<p className='mb-0 text-secondary text-xs'> {birthDate}</p>
						</div>
					</div>

					<div className='flex sm:hidden items-center flex-col select__section__group'>
						<button onClick={() => setShowCondition(true)} className='btn buttonBuyRequestGroup'>
							شروط اعزام
						</button>
						<button onClick={handleShow} className='btn buttonBuyRequestGroup'>
							تکمیل اطلاعات
						</button>
						<button className='btn buttonBuyRequestGroupDanger'>حذف</button>
					</div>
					{/*------------------- mobile show end*/}
				</div>

				<div className='sm:flex flex-col hidden items-start justify-around mr-auto select__section__group'>
					<button onClick={() => setShowCondition(true)} className='btn buttonBuyRequestGroup'>
						شروط اعزام
					</button>
					<button onClick={handleShow} className='btn buttonBuyRequestGroup'>
						تکمیل اطلاعات
					</button>
					<button className='btn buttonBuyRequestGroupDanger'>حذف</button>
				</div>
			</div>
		</>
	);
};

export default OmreCardData;
