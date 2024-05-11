import React from 'react';
import './CardBuy.css';

type MapType = {
	shiftSanadID: string;
	address: string;
	cityName: string;
	sellerMobile: string;
	kargozarNo: any;
	olaviateDate: string;
};

type CardProps = {
	value: MapType;
	onClick: () => void;
	className?: string;
};

export const CardBuy = (props: CardProps) => {
	const { address, cityName, kargozarNo, olaviateDate } = props.value;

	return (
		<div className={`Card justify-around text-justify mt-4  ${props.className}`} onClick={props.onClick}>
			<div className='w-full borderSection '>
				<div className='dataDiv '>
					<div className='col'>
						<div className='flex'>
							<div className='alireza p-1'>
								<strong>شهر:</strong>
							</div>
							<div className='alireza p-1'>
								<p>{cityName}</p>
							</div>
						</div>
					</div>

					<div className='col'>
						<div className='flex'>
							<div className='alireza p-1'>
								<strong>تاریخ اولویت:</strong>
							</div>
							<div className='alireza p-1'>
								<p>{olaviateDate}</p>
							</div>
						</div>
					</div>

					<div className='col'>
						<div className='flex'>
							<div className='alireza p-1'>
								<strong>کارگزاری:</strong>
							</div>
							<div className='alireza p-1'>
								<p>{kargozarNo}</p>
							</div>
						</div>
					</div>
				</div>

				<div className='col'>
					<div className='flex'>
						<div className='alireza p-1'>
							<strong>آدرس:</strong>
						</div>
						<div className='alireza p-1'>
							<p>{address}</p>
						</div>
					</div>
				</div>
			</div>

			<div className='justify-around text-justify'>
				<button className='btn button'>انتخاب</button>
			</div>
		</div>
	);
};

export default CardBuy;
