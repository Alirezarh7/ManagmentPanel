import React, { ComponentType, useEffect } from 'react';
import { transformationActions } from '../../../../pages/Tamato/Actions/Transformation/action';
import { ITransformationState } from '../../../../pages/Tamato/Actions/Transformation/model';
import { IApplicationState } from '../../../../store/state';
import { connect } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import CardBuyRequest from '../Card/Buy/CardBuyRequest';
import { shareData } from '../../../../shareData';

type DataType = {
	shiftSanadSaleManagerId: number;
	sanadNo: number;
	branchCode: number;
	kargozarNo: string;
	address: number;
	sanadStatus: number;
	sanadStatuasName: string;
	nationalCodeBuyerFollow: string;
	nationalCode: string;
};

type IProps = typeof transformationActions & ITransformationState;

const ListRequestBuy = (props: IProps) => {
	const history = useNavigate();

	const handleAction = (shiftSanadSaleManagerId: any, kargozarNo: any) => {
		const oidcUserString = localStorage.getItem(shareData.CONSTANT.GOV_STORAGE_KEY)
			? localStorage.getItem(shareData.CONSTANT.GOV_STORAGE_KEY)
			: localStorage.getItem(shareData.CONSTANT.ORGANIZATION_STORAGE_KEY);
		if (oidcUserString) {
			const oidcUser = JSON.parse(oidcUserString);
			const nationalCode = oidcUser.profile?.nationalCode;
			const dataToSave: any = {
				nationalCode,
				shiftSanadSaleManagerId,
				kargozarNo
			};
			//const data = JSON.stringify(dataToSave)
			props.RejectReceivedSalesSanad(dataToSave);
		}
	};

	useEffect(() => {
		props.GetRequestList('Buy');
	}, []);

	return (
		<>
			<div className='mt-4'>
				{props.transformationRequest.data.map((row: any) => (
					<CardBuyRequest
						value={row}
						onClick={() => {
							handleAction(row.shiftSanadSaleManagerId, row.kargozarNo);
							setTimeout(() => {
								history('/tamato/document-trasfer-agreement');
							}, 1500);
						}}
					/>
				))}
			</div>
		</>
	);
};

export default connect(
	(state: IApplicationState) => state.transformation,
	transformationActions
)(ListRequestBuy as ComponentType);
