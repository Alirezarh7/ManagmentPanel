import { useState, useEffect, ComponentType } from 'react';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { IApplicationState } from '../../../../store/state';
import { transformationActions } from '../../../../pages/Tamato/Actions/Transformation/action';
import { ITransformationState } from '../../../../pages/Tamato/Actions/Transformation/model';
import ListRequestShiftSanad from './ListRequestShiftSanad';
import Card from '../Card/Sell/Card';

type DataType = {
	nationalCode: string;
	zaernumber: number;
	branchCode: number;
	olaveyatDate: string;
	codeTrackingPreregistered: number;
	sanadNo: number;
	personalInfoRegistration: boolean;
	index: number;
	flagConfirm: boolean;
};

type MapType = {
	nationalCode: string;
	zaernumber: number;
	branchCode: number;
	olaveyatDate: string;
};

type IProps = typeof transformationActions & ITransformationState;

const SaleDocumentGrid = (props: IProps) => {
	const history = useNavigate();
	const [selectedData, setSelectedData] = useState<DataType | null>(null);

	const handleRowClick = (index: number) => {
		const selectedDataRow = TotalData[index];
		setSelectedData(selectedDataRow);
	};

	const saveToLocalStorage = () => {
		if (selectedData !== null) {
			let { zaernumber, branchCode, nationalCode, personalInfoRegistration, codeTrackingPreregistered } = selectedData;
			const sanadNo = zaernumber;
			const flagConfirm = personalInfoRegistration;
			const codeTracking = codeTrackingPreregistered;
			const dataToSave = { nationalCode, sanadNo, codeTracking, branchCode, flagConfirm };
			localStorage.setItem('sanadForm', JSON.stringify(dataToSave));
			history('/tamato/select-office-sell');
		}
	};

	useEffect(() => {
		props.getTransformation();
	}, []);
	const filter =
		props.transformationRequest.data &&
		props.transformationRequest.data.filter((obj: any) => obj.sanadStatus === 0 || obj.sanadStatus === 1);

	useEffect(() => {
		props.GetRequestList('Sale');
	}, []);

	useEffect(() => {
		saveToLocalStorage();
	}, [selectedData]);

	let TotalData = props.transformations.data;

	return (
		<div>
			{filter.length > 0 ? (
				<div>
					<ListRequestShiftSanad />
				</div>
			) : (
				<div>
					{props.transformations.data.map((row: MapType, index: number) => (
						<Card
							key={index}
							value={row}
							onClick={() => {
								handleRowClick(index);
							}}
						/>
					))}
				</div>
			)}
		</div>
	);
};

export default connect(
	(state: IApplicationState) => state.transformation,
	transformationActions
)(SaleDocumentGrid as ComponentType);
