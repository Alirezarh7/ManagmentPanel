import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { registrationActions } from '../../../../Actions/Registration/action';
import { IRegistrationState } from '../../../../Actions/Registration/model';
import { IApplicationState } from '../../../../../../store/state';
import GroupingModal from '../../../grouping/GroupingModal';
import './OmreKaranCard.css';
import DispatchingConditions from '../../DispatchingConditions';

type IProps = typeof registrationActions & IRegistrationState;

const OmreKarvanCard = (props: any, modal: IProps) => {
	const [allRows, setAllRows] = useState([]);
	const [show, setShow] = useState(false);
	const [showCondition, setShowCondition] = useState(false);
	const [codeTrackShow, setCodeTrackShow] = useState();
	const [isShowMoreInfo, setIsShowMoreInfo] = useState(false);
	const setRowDetailHandler = () => {
		props.getZaerForReservation(props.item.codeTracking, props.value);
	};
	const removeRowHandler = () => {
		const getDataFromLocal = JSON.parse(localStorage.getItem('OmreKarvan') as any);
		const filtredLocalData = getDataFromLocal.filter((data: any) => data.ssn !== props.item.ssn);
		localStorage.setItem('OmreKarvan', JSON.stringify(filtredLocalData));
		setAllRows(filtredLocalData);
		const getDataFromLocal2 = JSON.parse(localStorage.getItem('OmreKarvan') as any);
		if (getDataFromLocal2.length === 0) {
			localStorage.removeItem('OmreKarvan');
		}
		window.location.reload();
	};
	const showMoreInfoHandler = () => {
		setCodeTrackShow(props.props.codeTracking);
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
			<DispatchingConditions show={showCondition} handleClose={handleCloseCondition} />
			<GroupingModal handleClose={handleClose} show={show} />
			<div className='card'>
				<div className={`more__info  ${isShowMoreInfo ? 'show__more__info' : 'more__info '}`}>
					<ul className='card__info__more'>
						<li>
							<span className='card__more__info__stats'>{props.item && props.item.bankName ? props.item.bankName : '---'}</span>
							<span className={'card__more__info__title'}>بانک:</span>
						</li>
						<li>
							<span className='card__more__info__stats'>
								{props.item && props.item.zaerStatusMessage ? props.item.zaerStatusMessage : '---'}
							</span>
							<span className={'card__more__info__title'}>وضعیت:</span>
						</li>
						<li>
							<span className='card__more__info__stats'>{props.item && props.item.ssn ? props.item.ssn : '---'}</span>
							<span className={'card__more__info__title'}> کدملی:</span>
						</li>
						<li>
							<span className='card__more__info__stats'>
								{props.item && props.item.phoneNumber ? props.item.phoneNumber : '---'}
							</span>
							<span className={'card__more__info__title'}> شماره همراه:</span>
						</li>
					</ul>
					<button className=' Less__information' onClick={() => setIsShowMoreInfo(!isShowMoreInfo)}>
						بستن
					</button>
				</div>
				<div className='w-full'>
					<div className=' flex justify-end'>
						<div className=' flex ' onClick={() => setIsShowMoreInfo(!isShowMoreInfo)}>
							<p className='mx-2 mt-1 hoverforInfo '>اطلاعات بیشتر</p>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								fill='none'
								viewBox='0 0 24 24'
								strokeWidth={1.5}
								stroke='currentColor'
								style={{ width: '30px', height: '30px' }}
								className='w-6 h-6 hoverforInfo '>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									d='m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z'
								/>
							</svg>
						</div>
					</div>
					<div className='flex justify-center'>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							fill='none'
							viewBox='0 0 24 24'
							strokeWidth='1.5'
							stroke='currentColor'
							className='user_img'>
							<path
								stroke-linecap='round'
								strokeLinejoin='round'
								d='M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z'
							/>
						</svg>
					</div>
				</div>
				<div className='card__text'>
					<h2>
						{props.item && props.item.firstName && props.item.lastName ? props.item.firstName + ' ' + props.item.lastName : '---'}
					</h2>
				</div>
				<ul className='card__info'>
					<li>
						<span className='card__info__stats'>{props.item && props.item.sanadNo ? props.item.sanadNo : '---'}</span>
						<span>شماره ثبت نام </span>
					</li>
					<li>
						<span className='card__info__stats'>{props.item && props.item.priority ? props.item.priority : '---'}</span>
						<span>کد اولویت</span>
					</li>
				</ul>
				<div className='card__action'>
					<button onClick={() => removeRowHandler()} className='card__action__button card__action--follow'>
						حذف
					</button>
					<button onClick={() => handleShow()} className='card__action__button card__action--message'>
						تکمیل اطلاعات
					</button>
				</div>
				<div className='card__action mt-3'>
					<button className='card__action__button card__action--message w-full ' onClick={() => setShowCondition(true)}>
						مشاهده شرایط اعزام{' '}
					</button>
				</div>
			</div>
		</>
	);
};
export default connect((state: IApplicationState) => state.registration, registrationActions)(OmreKarvanCard);
