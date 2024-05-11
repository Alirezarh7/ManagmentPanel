import React, { ComponentType, useEffect } from 'react';
import './CardBuy.css';
import { ITransformationState } from '../../../../../pages/Tamato/Actions/Transformation/model';
import { transformationActions } from '../../../../../pages/Tamato/Actions/Transformation/action';
import { IApplicationState } from '../../../../../store/state';
import { connect } from 'react-redux';

type MapType = {
	sanadNo: string;
	branchCode: number;
	sanadStatus: number;
	address: string;
	kargozarNo: string;
};

type CardProps = {
	value: MapType;
	onClick: () => void;
};
type IProps = typeof transformationActions & ITransformationState & CardProps;

export const CardBuyRequest = (props: IProps) => {
	useEffect(() => {
		props.GetRequestList('Buy');
	}, []);

	const filter =
		props.transformationRequest.data &&
		props.transformationRequest.data.filter((obj: any) => obj.sanadStatus === 0 || obj.sanadStatus === 1);

	const { sanadNo, branchCode, kargozarNo, address } = props.value;

	return (
		<div className='Card justify-around text-justify mt-4' onClick={props.onClick}>
			<div className='w-full borderSection'>
				<div className='dataDiv'>
					<div className='col'>
						<div className='flex'>
							<div className='alireza p-1'>
								<strong>سند</strong>
							</div>
							<div className='alireza p-1'>
								<p>{sanadNo}</p>
							</div>
						</div>
					</div>

					<div className='col'>
						<div className='flex'>
							<div className='alireza p-1'>
								<strong>کارگزاری</strong>
							</div>
							<div className='alireza p-1'>
								<p>{kargozarNo}</p>
							</div>
						</div>
					</div>

					<div className='col'>
						<div className='flex'>
							<div className='alireza p-1'>
								<strong>شعبه</strong>
							</div>
							<div className='alireza p-1'>
								<p>{branchCode}</p>
							</div>
						</div>
					</div>
				</div>

				<div className='col dataDiv mt-3'>
					<div className='flex'>
						<div className='alireza p-1'>
							<strong>آدرس</strong>
						</div>
						<div className='alireza p-1'>
							<p>{address}</p>
						</div>
					</div>
				</div>
			</div>
			<div className='justify-around text-justify px-4'>
				<button className='btn buttonBuyRequest'>انصراف از تهیه اولویت</button>
			</div>
		</div>
	);
};

export default connect(
	(state: IApplicationState) => state.transformation,
	transformationActions
)(CardBuyRequest as ComponentType<any>);
