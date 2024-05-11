import { ComponentType, useEffect } from 'react';
import { connect } from 'react-redux';
import { IApplicationState } from '../../../../store/state';
import { transformationActions } from '../../../../pages/Tamato/Actions/Transformation/action';
import { ITransformationState } from '../../../../pages/Tamato/Actions/Transformation/model';
import According from '../Card/Sell/Accordion';
import CardRequest from '../Card/Sell/CardRequest';
import './ListforRequest.css';

type MapType = {
	sanadNo: number;
	branchCode: number;
	kargozarNo: string;
	address: number;
	sanadStatus: number;
	nationalCodeBuyerFollow: string;
	shiftSanadSaleManagerId: number;
};

type IProps = typeof transformationActions & ITransformationState;

const ListRequestShiftSanad = (props: IProps) => {
	const handleAction = (shiftSanadSaleManagerId: any) => {
		const storedData: any = JSON.parse(localStorage.getItem('oidc.user:https://sso.my.gov.ir/oauth2:my.haj') as any);
		const nationalCode = storedData.profile.nationalCode;
		let data = { nationalCode, shiftSanadSaleManagerId };
		props.PostCancelRequest(data);
	};

	useEffect(() => {
		props.GetRequestList('Sale');
	}, []);

	const filter =
		props.transformationRequest.data &&
		props.transformationRequest.data.filter((obj: any) => obj.sanadStatus === 0 || obj.sanadStatus === 1);

	return (
		<>
			{filter.length > 0 ? (
				filter.map((row: any) => (
					<CardRequest
						value={row}
						onClick={() => {
							handleAction(row.shiftSanadSaleManagerId);
							window.location.href = '/tamato/trade-document';
						}}
					/>
				))
			) : (
				<div style={{ marginTop: '100px' }}>
					<h4 className={'box-title text-center bodyOfTextBox rounded-lg'}>درخواست های قبلی شما</h4>
					<div className='container container-sm  mt-4'>
						{props.transformationRequest.data.map((item: MapType, index: number) => (
							<According key={index} value={{ ...item }} />
						))}
					</div>
				</div>
			)}
		</>
	);
};

export default connect(
	(state: IApplicationState) => state.transformation,
	transformationActions
)(ListRequestShiftSanad as ComponentType);
