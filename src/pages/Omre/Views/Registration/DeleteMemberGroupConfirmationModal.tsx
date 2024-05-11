import React, { ComponentType } from 'react';
import { Modal } from 'react-bootstrap';
import { connect } from 'react-redux';
import { IApplicationState } from '../../../../store/state';
import { registrationActions } from '../../Actions/Registration/action';
import { IRegistrationState } from '../../Actions/Registration/model';
import { title } from 'process';
import { useNavigate } from 'react-router';

interface IInternalProps {
	show: boolean;
	handleClose: (state: boolean) => void;
	data: {
		passengerGroupId: number;
		passengerGroupMemberId: number;
	};
	title: any;
	rowNationCode: string;
}

type IProps = typeof registrationActions & IRegistrationState & IInternalProps;
const DeleteMemberGroupConfirmationModal = (props: IProps) => {
	const history = useNavigate();
	const storedData: any = JSON.parse(localStorage.getItem('oidc.user:https://sso.my.gov.ir/oauth2:my.haj') as any);
	const nationalCode = storedData.profile.nationalCode;
	const acceptDelete = () => {
		props.deleteMemberFromGroup(props.data.passengerGroupId, props.data.passengerGroupMemberId);
		if (nationalCode === props.rowNationCode) {
			history('./tamato/my-documents');
		}
	};

	return (
		<>
			<Modal scrollable show={props.show} onHide={() => props.handleClose(false)} size='sm'>
				<Modal.Header closeButton>
					<Modal.Title>حذف عضو از گروه</Modal.Title>
				</Modal.Header>
				<Modal.Body className='p-5'>
					<p className='text-center w-full'>{props.title}</p>
				</Modal.Body>
				<Modal.Footer>
					<button onClick={() => props.handleClose(false)} className='btn btn-outline-danger'>
						انصراف
					</button>
					<button onClick={acceptDelete} className='btn btn-outline-success'>
						تایید
					</button>
				</Modal.Footer>
			</Modal>
		</>
	);
};

export default connect(
	(state: IApplicationState) => state.registration,
	registrationActions
)(DeleteMemberGroupConfirmationModal as ComponentType<any>);
