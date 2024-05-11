import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { IApplicationState } from '../../../store/state';
import { reserveAndRegisterActions } from '../../../pages/Tamato/Actions/ReserveAndRegister/action';
import { IReserveAndRegisterState } from '../../../pages/Tamato/Actions/ReserveAndRegister/model';
import './ReserveAndRegister.css';

type IProps = typeof reserveAndRegisterActions & IReserveAndRegisterState;

const Card = (props: any) => {
	const [allRows, setAllRows] = useState([]);
	const [codeTrackShow, setCodeTrackShow] = useState();
	const [isShowMoreInfo, setIsShowMoreInfo] = useState(false);
	const setRowDetailHandler = () => {
		props.getZaerForReservation(props.props.codeTracking, props.value);
	};
	const removeRowHandler = () => {
		const getDataFromLocal = JSON.parse(localStorage.getItem('data') as any);
		const filtredLocalData = getDataFromLocal.filter((data: any) => data.nationalCode !== props.props.nationalCode);
		localStorage.setItem('data', JSON.stringify(filtredLocalData));
		setAllRows(filtredLocalData);
		const getDataFromLocal2 = JSON.parse(localStorage.getItem('data') as any);
		if (getDataFromLocal2.length === 0) {
			localStorage.removeItem('data');
		}
		window.location.reload();
	};
	const showMoreInfoHandler = () => {
		setCodeTrackShow(props.props.codeTracking);
	};

	return (
		<>
			<div className='card'>
				<div className={`more__info  ${isShowMoreInfo ? 'show__more__info' : 'more__info '}`}>
					<ul className='card__info__more'>
						<li>
							<span className='card__more__info__stats'>
								{props.props && props.props.cityAddressName ? props.props.cityAddressName : '---'}
							</span>
							<span className={'card__more__info__title'}>شهر:</span>
						</li>
						<li>
							<span className='card__more__info__stats'>
								{props.props && props.props.fatherName ? props.props.fatherName : '---'}
							</span>
							<span className={'card__more__info__title'}>نام پدر:</span>
						</li>
						<li>
							<span className='card__more__info__stats'>
								{props.props && props.props.mobileNo ? props.props.mobileNo : '---'}
							</span>
							<span className={'card__more__info__title'}> شماره موبایل:</span>
						</li>
						<li>
							<span className='card__more__info__stats'>
								{props.props && props.props.branchCode ? props.props.branchCode : '---'}
							</span>
							<span className={'card__more__info__title'}> کد شعبه:</span>
						</li>
						<li>
							<span className='card__more__info__stats'>
								{props.props && props.props.zaerNumber ? props.props.zaerNumber : '---'}
							</span>
							<span className={'card__more__info__title'}> شماره زائر:</span>
						</li>
					</ul>
					<button className=' Less__information' onClick={() => setIsShowMoreInfo(!isShowMoreInfo)}>
						بستن
					</button>
				</div>

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

				<div className='card__text'>
					<h2>{props.props && props.props.firstName ? props.props.firstName : '---'}</h2>
					<p>{props.props && props.props.religionName ? props.props.religionName : '---'}</p>
				</div>
				<ul className='card__info'>
					<li>
						<span className='card__info__stats'>{props.props && props.props.sanadNo ? props.props.sanadNo : '---'}</span>
						<span>شماره قبض</span>
					</li>
					<li>
						<span className='card__info__stats'>
							{props.props && props.props.provinceName ? props.props.provinceName : '---'}
						</span>
						<span>استان</span>
					</li>
					<li>
						<span className='card__info__stats'>
							{props.props && props.props.olaveyatDate ? props.props.olaveyatDate : '---'}
						</span>
						<span>تاریخ اولویت</span>
					</li>
				</ul>
				<div className='card__action'>
					<button onClick={() => removeRowHandler()} className='card__action__button card__action--follow'>
						حذف
					</button>
					<button className='card__action__button card__action--message' onClick={() => setIsShowMoreInfo(!isShowMoreInfo)}>
						اطلاعات بیشتر
					</button>
				</div>
			</div>
		</>
	);
};
export default connect((state: IApplicationState) => state.reserveAndRegister, reserveAndRegisterActions)(Card);
