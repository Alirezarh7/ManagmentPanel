import React, { ComponentType, useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import { List } from 'antd';
import useWindowSize from '../../../../hooks/useWindowSize';
import { registrationActions } from '../../Actions/Registration/action';
import { IRegistrationState } from '../../Actions/Registration/model';
import { connect } from 'react-redux';
import { IApplicationState } from '../../../../store/state';

interface IInternalProps {
	handleClose: () => void;
	show: any;
	karvanItem: any;
}

type IProps = typeof registrationActions & IRegistrationState & IInternalProps;
const DispatchingConditions = (props: IProps) => {
	const window = useWindowSize();

	useEffect(() => {
		if (props.show) {
			props.getConfirmationPassenger(
				props.karvanItem.nationalCode,
				props.passengerGroup.data && props.passengerGroup.data.passengerGroupId
			);
		}
	}, [props.show]);

	return (
		<>
			<Modal scrollable show={props.show} onHide={props.handleClose} size='lg'>
				<Modal.Header closeButton>
					<Modal.Title>مشاهده شروط اعزام</Modal.Title>
				</Modal.Header>
				<p className='text-danger font-weight-bold py-3 text-center w-full'>موارد زیر را جهت ادامه فرایند تکمیل نمایید</p>
				<ol className='h-75 overflow-auto'>
					{props.confirmationPassenger && props.confirmationPassenger.data.length > 0
						? props.confirmationPassenger.data.map((confirmP: string, index: number) => (
								<li className='mx-2 my-4 text-secondary' key={index} style={{ fontSize: '18px' }}>
									{confirmP}
								</li>
							))
						: ''}
				</ol>
			</Modal>
		</>
	);
};

export default connect(
	(state: IApplicationState) => state.registration,
	registrationActions
)(DispatchingConditions as ComponentType<any>);
