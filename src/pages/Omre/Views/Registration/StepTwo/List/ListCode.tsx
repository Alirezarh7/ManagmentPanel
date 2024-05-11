import React, { ComponentType, useState } from 'react';
import { connect } from 'react-redux';
import { registrationActions } from '../../../../Actions/Registration/action';
import { IRegistrationState } from '../../../../Actions/Registration/model';
import { IApplicationState } from '../../../../../../store/state';
import ZaerLogo from '../../../../../../assets/zaerLogo.png';
import './ListCode.css';
import DispatchingConditions from '../../DispatchingConditions';
import GroupingModal from '../../../grouping/GroupingModal';
import DeleteMemberGroupConfirmationModal from '../../DeleteMemberGroupConfirmationModal';
import { useNavigate } from 'react-router-dom';
import DeleteLeaderAndSelectedNewLeader from '../../DeleteLeaderAndSelectedNewLeader';

type IProps = typeof registrationActions &
	IApplicationState & {
		item: any;
	};

const ZaerList = (props: IProps) => {
	const [show, setShow] = useState(false);
	const history = useNavigate();
	const [showCondition, setShowCondition] = useState(false);
	const [context, setContext] = useState<string>('');

	const [leaderdeletModalshow, setLeaderdeletModalshow] = useState(false);
	const [deletModalshow, setDeletModalshow] = useState(false);

	const handleShowDeleteModal = (state: boolean) => {
		const rowNationCode = props.item.nationalCode;
		const storedData: any = JSON.parse(localStorage.getItem('oidc.user:https://sso.my.gov.ir/oauth2:my.haj') as any);
		const nationalCode = storedData.profile.nationalCode;
		console.log(rowNationCode, '', nationalCode);
		if (props.registration.getPrintDetailList.data.length > 0 && props.item.isLeader) {
			setLeaderdeletModalshow(state);
		} else {
			setDeletModalshow(state);
		}

		if (nationalCode === rowNationCode && props.item.isLeader) {
			setContext('زائر گرامی در صورت حذف خود از این گروه، چون این گروه فاقد عضو می باشد این گروه حذف خواهد شد آیا موافقید؟');
		} else {
			setContext('آیا از حذف اطمینان دارید ؟');
		}
	};

	const handleClose = () => {
		setShow(false);
	};

	const handleCloseCondition = () => {
		setShowCondition(false);
	};

	const handleShow = () => setShow(true);

	return (
		<>
			<DispatchingConditions karvanItem={props.item} show={showCondition} handleClose={handleCloseCondition} />
			<GroupingModal karvanItem={props.item} handleClose={handleClose} show={show} />
			<DeleteLeaderAndSelectedNewLeader
				data={{
					passengerGroupId: props.registration.passengerGroup.data && props.registration.passengerGroup.data.passengerGroupId,
					passengerGroupMemberId: props.item && props.item.passengerGroupMemberId
				}}
				handleClose={handleShowDeleteModal}
				show={leaderdeletModalshow}
			/>

			<DeleteMemberGroupConfirmationModal
				data={{
					passengerGroupId: props.registration.passengerGroup.data && props.registration.passengerGroup.data.passengerGroupId,
					passengerGroupMemberId: props.item && props.item.passengerGroupMemberId
				}}
				handleClose={handleShowDeleteModal}
				show={deletModalshow}
				title={context}
				rowNationCode={props.item.nationalCode}
			/>
			<div>
				<ul className='list-group'>
					<li className='list-group-item list-group-item-action'>
						<div className='flex justify-around items-center'>
							<div className='containerListMobile'>
								<div>
									<img
										src={ZaerLogo}
										style={{
											borderRadius: '50%',
											width: '80px',
											height: '80px'
										}}
									/>
								</div>
								<div className='containerList'>
									<div className='mt-4'>
										<div className='justify-center'>
											<div className='mx-3'>
												<p>{'  ' + 'نام و نام خانوادگی' + '  '}</p>
											</div>
										</div>
										<div>
											<strong>
												{props.item && props.item.firstName && props.item.lastName
													? props.item.firstName + ' ' + props.item.lastName
													: '---'}
											</strong>
										</div>
									</div>
									<div className='mt-4'>
										<div className='justify-center'>
											<p>شماره سند</p>
										</div>
										<div>
											<span className='card__info__stats'>{props.item && props.item.sanadNo ? props.item.sanadNo : '---'}</span>
										</div>
									</div>
									<div className='mt-4'>
										<div className='justify-center'>
											<p>کد اولویت</p>
										</div>
										<div>
											<span className='card__info__stats mx-3'>
												{props.item && props.item.priority ? props.item.priority : '---'}
											</span>
										</div>
									</div>
									<div className='mt-4'>
										<div className='mx-4'>
											<p>کد ملی</p>
										</div>
										<div>
											<span className='card__info__stats'>
												{props.item && props.item.nationalCode ? props.item.nationalCode : '---'}
											</span>
										</div>
									</div>
								</div>
							</div>
							{(props.registration.isLeaderByNationalCode.data === 'true' ||
								props.item.nationalCode === props.oidc.user.profile.nationalCode) && (
								<div className='flex items-center flex-column select__section__ForList '>
									<button onClick={() => setShowCondition(true)} className='btn buttonBuyRequestGroup'>
										شروط اعزام
									</button>
									<button onClick={handleShow} className='btn buttonBuyRequestGroup'>
										تکمیل اطلاعات
									</button>
									{/*{props.item && props.item.isLeader ?*/}
									<button className='btn buttonBuyRequestGroupDanger' onClick={() => handleShowDeleteModal(true)}>
										حذف
									</button>
									{/*: null}*/}
								</div>
							)}
						</div>
					</li>
				</ul>
			</div>
		</>
	);
};

export default connect((state: IApplicationState) => state, registrationActions)(ZaerList as ComponentType<any>);
