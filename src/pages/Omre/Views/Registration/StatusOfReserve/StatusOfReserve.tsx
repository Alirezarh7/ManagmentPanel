import React, { ComponentType, useEffect } from 'react';
import { connect } from 'react-redux';
import { IApplicationState } from '../../../../../store/state';
import { registrationActions } from '../../../Actions/Registration/action';
import './StatusOfReserve.css';
import { useNavigate, useLocation } from 'react-router-dom';
import { IRegistrationState } from '../../../Actions/Registration/model';
import Accordding from '../According/AccordingForOmre';
import StaticCard from './Card/StaticCard';

interface LocationState {
	sanadNo?: string;
}

type MapType = {
	karGroupId: number;
	flightDatePersian: string;
	passengerId: number;
	sanadNo: number;
	kargozarOfficeAddress: string;
	kargozarNo: number;
	kargozarOfficeName: string;
	kargozarOfficePhone: string;
	managerName: string;
	price: number;
};

type IProps = typeof registrationActions & IRegistrationState;

const StatusOfReserve = (props: IProps) => {
	const history = useNavigate();
	const location = useLocation();
	const sanadNo = location.state?.sanadNo;

	useEffect(() => {
		props.GetRegisterHistory(sanadNo);
	}, []);

	const data = props.getKarvanRegisterHistory.data;

	return (
		<>
			<div className='flex flex-grow-1 cc'>
				{data && (
					<div className='p-4 w-full respons-style'>
						<StaticCard
							firstName={data.firstName}
							lastName={data.lastName}
							nationalCode={data.nationalCode}
							fatherName={data.fatherName}
						/>
					</div>
				)}

				<div className='p-4 w-full mt-4'>
					{data &&
						data.details &&
						data.details.length > 0 &&
						data.details.map((item: MapType, index: number) => <Accordding key={index} value={item} />)}
				</div>
			</div>
		</>
	);
};

export default connect(
	(state: IApplicationState) => state.registration,
	registrationActions
)(StatusOfReserve as ComponentType<any>);
