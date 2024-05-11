import React, { useRef } from 'react';
import './CardKarevan.css';
import Travel from '../../../../../../assets/travel.png';
import Date from '../../../../../../assets/date.png';
import { Tooltip } from 'antd';
import { CopyOutlined } from '@ant-design/icons';

type MapType = {
	branchCode: number;
	sanadStatus: number;
	address: string;
	officeName: string;
	kargozarNo: string;
	flightDate: string;
	cap: any;
	cost: any;
	flyPortName: any;
};

type CardProps = {
	value: MapType;
	onClick: () => void;
};

export const OmreCardData = (props: CardProps) => {
	const addressRef = useRef<any>();
	const { cap, kargozarNo, address, officeName, flightDate, cost, flyPortName } = props.value;

	const copyText = () => {
		const text = document.querySelector('#addressRef') as HTMLInputElement;
		text.select();
		text.setSelectionRange(0, 99999);
		navigator.clipboard.writeText(text.value);
	};

	return (
		<>
			<div className={`Card justify-start text-justify my-4 position-relative`}>
				<div className='sm:flex hidden flex-col items-center'>
					<img loading={'lazy'} className='card__omre__karvan__img' src={Travel} alt={'travel'} />
					<p className='mt-3 mb-0 text-secondary'> کد گارگزار </p>
					<p className='kargozar__number__omre'>{kargozarNo}</p>
				</div>
				<div className='flex flex-col justify-around items-start data__information__omre'>
					<div className='sm:flex items-center hidden'>
						<p className='mb-0 text-secondary py-1 px-3 rounded bg-light'> دفتر زیارتی {officeName}</p>
						<p className='mb-0 mr-5 text-secondary py-1 px-3 rounded bg-light'> به مقصد {flyPortName}</p>
						<Tooltip
							title={
								<div>
									<CopyOutlined onClick={copyText} size={20} />
									<input
										id={'addressRef'}
										style={{
											fontSize: '13px',
											border: 'none',
											outline: 'none',
											backgroundColor: 'transparent',
											marginRight: '15px'
										}}
										value={address}
									/>
								</div>
							}
							color={'blue'}>
							{/*<img src={Location} alt={'location'} style={{width:'35px',left:'25%',top:'10px',cursor:'pointer'}} className='position-absolute' />*/}
						</Tooltip>
					</div>

					{/*------------------- mobile show start*/}
					<div className='flex sm:hidden justify-center flex-col items-center w-full'>
						<img loading={'lazy'} className='card__omre__karvan__img' src={Travel} alt={'travel'} />
						<p className='kargozar__number__omre  mt-3'> کد گارگزار {kargozarNo} </p>
					</div>
					<div className='sm:hidden  flex flex-col w-full'>
						<div className='flex items-center justify-between mt-3'>
							<p className='text-secondary' style={{ fontSize: '12px' }}>
								{' '}
								دفتر زیارتی{' '}
							</p>
							<p className='text-secondary' style={{ fontSize: '12px' }}>
								{officeName}
							</p>
						</div>
						<div className='flex items-center justify-between mt-1'>
							<p className='text-secondary' style={{ fontSize: '12px' }}>
								{' '}
								مفصد{' '}
							</p>
							<p className='text-secondary' style={{ fontSize: '12px' }}>
								{flyPortName}
							</p>
						</div>

						<div className='flex items-center sm:hidden justify-between w-full'>
							<p className='mb-0 text-secondary' style={{ fontSize: '12px' }}>
								تاریخ پرواز
							</p>
							<p className='mb-0 text-secondary' style={{ fontSize: '12px' }}>
								{' '}
								{flightDate}
							</p>
						</div>
						<div className='flex items-center sm:hidden justify-between w-full mt-3'>
							<p className='mb-0 text-secondary' style={{ fontSize: '12px' }}>
								ظرفیت باقی مانده
							</p>
							<p className='mb-0 text-secondary' style={{ fontSize: '12px' }}>
								{' '}
								{cap}
							</p>
						</div>
						<div className='flex items-center sm:hidden justify-between w-full mt-3'>
							<p className='mb-0 text-secondary' style={{ fontSize: '12px' }}>
								هزینه سفر
							</p>
							<p className='mb-0 text-secondary' style={{ fontSize: '12px' }}>
								{cost.toLocaleString()}
								<span> ریال </span>
							</p>
						</div>
					</div>

					<div className='flex sm:hidden items-center flex-col select__section__omre'>
						<button className='btn buttonBuyRequest' onClick={props.onClick}>
							ثبت رزرو
						</button>
					</div>
					{/*------------------- mobile show end*/}

					<div className='sm:flex items-center hidden'>
						<img className='card__omre__karvan__img__date' alt='date' loading={'lazy'} src={Date} />
						<div className='flex items-center '>
							<p className='mb-0 mr-2 font-weight-bold'>تاریخ پرواز</p>
							<p className='mb-0 mx-3 font-weight-bold'>---------------</p>
							<p className='mb-0 font-weight-bold'> {flightDate}</p>
						</div>
					</div>
				</div>
				<p className='sm:flex hidden position-absolute' style={{ bottom: '-3px', opacity: '0.6' }}>
					{address}
				</p>
				<div className='sm:flex hidden items-start justify-start mr-auto select__section__omre'>
					<p className='text-primary cost__omre__card'>
						{cost.toLocaleString()} <span> ریال </span>
					</p>
					<button className='btn buttonBuyRequest' onClick={props.onClick}>
						ثبت رزرو
					</button>
					<p className='mb-0 text-center text-secondary' style={{ fontSize: '12px', marginTop: '10px' }}>
						{' '}
						ظرفیت باقی مانده {cap}{' '}
					</p>
				</div>
			</div>
		</>
	);
};

export default OmreCardData;
