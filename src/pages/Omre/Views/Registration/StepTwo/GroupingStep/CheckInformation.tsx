import React, { ComponentType, useEffect } from 'react';
import { Divider } from 'antd';
import CardGrouping from '../../../grouping/card/CardGrouping';
import '../../../grouping/card/CardGrouping.css';
import DispatchingConditions from '../../DispatchingConditions';
import ListCarevan from '../List/ListForStepTwo';
import { registrationActions } from '../../../../Actions/Registration/action';
import { IRegistrationState } from '../../../../Actions/Registration/model';
import { connect } from 'react-redux';
import { IApplicationState } from '../../../../../../store/state';
import NapAlerts from './../../../../../../components/general/NapAlerts/NapAlerts';
import NapLoading from './../../../../../../components/general/NapLoading/NapLoading';

type IProps = typeof registrationActions &
	IRegistrationState & {
		onNext: () => void;
		onPrev: () => void;
	};
const CheckInformation = (props: IProps) => {
	useEffect(() => {
		props.getPassengerGroupData();
		props.leaderByNationalCode();
	}, []);

	return (
		<>
			<NapAlerts alerts={props.alerts} clearAlerts={() => props.clearAlerts()} />
			<NapLoading loading={props.passengerGroup.loading || props.isLeaderByNationalCode.loading} />
			<div className='mx-5'>
				<h4 className='mt-5'>گروه تعیین شده</h4>
				<Divider />
				<div className='omre__karvan__group__box'>
					<div className={'W-100'}>
						{props.passengerGroup.data &&
							props.passengerGroup.data.passengerGroupDetails &&
							(props.passengerGroup.loading ? (
								<p>لطفا منتظر بمانید ...</p>
							) : (
								props.passengerGroup.data.passengerGroupDetails.map((item: any, index: any) => (
									<ListCarevan item={item} index={index} />
								))
							))}
					</div>
					{props.passengerGroup.data &&
						props.passengerGroup.data.passengerGroupDetails &&
						props.isLeaderByNationalCode.data === 'true' && (
							<div className='flex justify-between mt-5'>
								<button
									className=' btn buttonBuyRequestGroup'
									onClick={() => {
										props.onPrev();
									}}>
									بازگشت
								</button>
								<button
									className=' btn buttonBuyRequestGroup'
									onClick={() => {
										props.onNext();
									}}>
									تایید و ادامه
								</button>
							</div>
						)}
				</div>
			</div>
		</>
	);
};

export default connect(
	(state: IApplicationState) => state.registration,
	registrationActions
)(CheckInformation as ComponentType<any>);
