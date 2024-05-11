import React, { ComponentType, useState } from 'react';
import { Modal } from 'react-bootstrap';
import { connect } from 'react-redux';
import { IApplicationState } from '../../../../store/state';
import { registrationActions } from '../../Actions/Registration/action';
import { IRegistrationState } from '../../Actions/Registration/model';
import { useNavigate } from 'react-router';

interface IInternallProps {
	show: boolean;
	handleClose: (state: boolean) => void;
	data: {
		passengerGroupId: number;
		passengerGroupMemberId: number;
	};
}

type IProps = typeof registrationActions & IRegistrationState & IInternallProps;
const DeleteMemberGroupConfirmationModal = (props: IProps) => {
	const history = useNavigate();
	const [leaderName, setLeaderName] = useState<string>('');

	/*const dataList:any = [];
    const data = props.getPrintDetailList.data
            if (Array.isArray(data)) {
                data.forEach((name, index) => {
                dataList.push(name.fullName);
            });
        }*/

	const acceptDelete = () => {
		if (leaderName) {
			const data = {
				passengerGroupId: props.data.passengerGroupId,
				currentLeaderGroupMemberId: props.data.passengerGroupMemberId,
				newLeaderGroupMemberId: Number(leaderName)
			};
			props.setSelectNewLeader(data, props.handleClose);
			history('./tamato/my-documents');
		}
	};

	return (
		<>
			<Modal scrollable show={props.show} onHide={() => props.handleClose(false)} size='lg'>
				<Modal.Header closeButton>
					<Modal.Title>حذف سرگروه از گروه</Modal.Title>
				</Modal.Header>
				<Modal.Body className='p-5'>
					<div className='col-12'>
						<div className='flex flex-col'>
							<div className='mb-1'>
								<p>لطفا یکی از افراد زیر گروه خود را به عنوان سرگروه، بجای خود انتخاب نمائید.</p>
								<span className='required-star text-danger mx-1'>*</span>
							</div>
							<select className='form-control' name='name' value={leaderName} onChange={e => setLeaderName(e.target.value)}>
								<option>انتخاب کنید</option>
								{props.getPrintDetailList.data &&
									props.getPrintDetailList.data.map((dataObj: any, index: number) => (
										<option value={dataObj.passengerGroupMemberId} key={index}>
											{dataObj.fullName}
										</option>
									))}
							</select>
						</div>
					</div>
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
