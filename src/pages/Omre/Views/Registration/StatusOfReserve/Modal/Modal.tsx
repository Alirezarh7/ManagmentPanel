import React, { ComponentType, useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import { registrationActions } from '../../../../Actions/Registration/action';
import { IRegistrationState } from '../../../../Actions/Registration/model';
import { connect } from 'react-redux';
import { IApplicationState } from '../../../../../../store/state';

interface IInternalProps {
	handleModal: (state: boolean) => void;
	show: boolean;
	passengerId: any;
}

type IProps = typeof registrationActions & IRegistrationState & IInternalProps;
const ConfirmGroupModal = (props: IProps) => {
	useEffect(() => {
		props.UmrahPaymentHistory(props.passengerId);
	}, []);
	console.log(props.paymentHistory.data);
	return (
		<>
			<Modal scrollable show={props.show} onHide={() => props.handleModal(false)} size='xl'>
				<Modal.Header closeButton>
					<Modal.Title>مشاهده تاریخچه پرداخت</Modal.Title>
				</Modal.Header>
				<div className='flex justify-around'>
					<table className='table'>
						<thead className='thead-dark'>
							<tr>
								<th scope='col'>تاریخ پرداخت</th>
								<th scope='col'>نوع پرداخت</th>
								<th scope='col'>مبلغ پرداخت</th>
								<th scope='col'>شماره فیش</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td>{props.paymentHistory.data && props.paymentHistory.data.flightDatePersian}</td>
								<td>{props.paymentHistory.data && props.paymentHistory.data.fishType}</td>
								<td>{props.paymentHistory.data && props.paymentHistory.data.price}</td>
								<td>{props.paymentHistory.data && props.paymentHistory.data.fishNo}</td>
							</tr>
						</tbody>
					</table>
				</div>
			</Modal>
		</>
	);
};

export default connect(
	(state: IApplicationState) => state.registration,
	registrationActions
)(ConfirmGroupModal as ComponentType<any>);
