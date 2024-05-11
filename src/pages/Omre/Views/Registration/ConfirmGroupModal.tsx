import React, { ComponentType, useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import { List } from 'antd';

import { registrationActions } from '../../Actions/Registration/action';
import { IRegistrationState } from '../../Actions/Registration/model';
import { connect } from 'react-redux';
import { IApplicationState } from '../../../../store/state';

interface IInternalProps {
	handleModal: (state: boolean) => void;
	show: boolean;
}

type IProps = typeof registrationActions & IRegistrationState & IInternalProps;
const ConfirmGroupModal = (props: IProps) => {
	return (
		<>
			<Modal scrollable show={props.show} onHide={() => props.handleModal(false)}>
				<Modal.Header closeButton>
					<Modal.Title>بررسی نواقص اطلاعات</Modal.Title>
				</Modal.Header>

				<p className='text-danger font-weight-bold py-3 text-center w-full'>موارد زیر را جهت ادامه فرایند تکمیل نمایید</p>
				<ol className='h-75 overflow-auto mw-100' style={{ lineBreak: 'anywhere', padding: '10px' }}>
					{props.confirmationGroupdata.data && props.confirmationGroupdata.data.length > 0
						? props.confirmationGroupdata.data.map((confirmP: any, index: number) => (
								<div style={{ borderBottom: '1px solid #777', paddingBottom: '15px' }} className='flex flex-col'>
									<p style={{ fontSize: '17px' }} className='mt-4 mr-2 mb-2 text-danger' key={index}>
										{confirmP.fullName}
									</p>
									{confirmP.confirmationMessage &&
										confirmP.confirmationMessage.map((message: string, index: number) => (
											<li className='mx-2 text-justify text-secondary inline' key={index}>
												{index + 1}- {message}
											</li>
										))}
								</div>
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
)(ConfirmGroupModal as ComponentType<any>);
