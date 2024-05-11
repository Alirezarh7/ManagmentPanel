import React from 'react';
import './Card.css';
import { useNavigate } from 'react-router-dom';

type MapType = {
	nationalCode: string;
	zaernumber: number;
	branchCode: number;
	olaveyatDate: string;
};

type CardProps = {
	value: MapType;
	onClick: () => void;
	className?: string;
};

export const Card = (props: CardProps) => {
	const history = useNavigate();
	const { nationalCode, zaernumber, branchCode, olaveyatDate } = props.value;

	return (
		<div className={`Card justify-around text-justify mt-4 ${props.className}`} onClick={props.onClick}>
			<div className='w-full borderSection'>
				<div className='dataDiv'>
					<div className='col'>
						<div className='flex'>
							<div className='alireza p-1'>
								<strong>کدملی</strong>
							</div>
							<div className='alireza p-1'>
								<p>{nationalCode}</p>
							</div>
						</div>
					</div>

					<div className='col'>
						<div className='flex'>
							<div className='alireza p-1'>
								<strong>سند</strong>
							</div>
							<div className='alireza p-1'>
								<p>{zaernumber}</p>
							</div>
						</div>
					</div>

					<div className='col'>
						<div className='flex'>
							<div className='alireza p-1'>
								<strong>کد شعبه</strong>
							</div>
							<div className='alireza p-1'>
								<p>{branchCode}</p>
							</div>
						</div>
					</div>

					<div className='col'>
						<div className='flex'>
							<div className='alireza p-1'>
								<strong>تاریخ</strong>
							</div>
							<div className='alireza p-1'>
								<p>{olaveyatDate}</p>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className='justify-around text-justify px-4'>
				<button
					className='btn button'
					onClick={() => {
						props.onClick();
						// history("/tamato/select-office-sell");
					}}>
					انتخاب
				</button>
			</div>
		</div>
	);
};

export default Card;
