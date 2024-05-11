import React, { ComponentType, useEffect } from 'react';
import { registrationActions } from '../../../Actions/Registration/action';
import { IRegistrationState } from '../../../Actions/Registration/model';
import { connect } from 'react-redux';
import { IApplicationState } from '../../../../../store/state';
import { useNavigate } from 'react-router';

type IProps = typeof registrationActions & IRegistrationState;

const ReservePage = (props: IProps) => {
	useEffect(() => {
		props.GetReserveDetail();
	}, []);
	console.log(props.GetReserveDetail);
	const history = useNavigate();
	const PrintPage = () => {
		history('/OmreMofrade/Print');
	};
	console.log(props.getReserveDetailList.data);

	return (
		<div className='flex flex-grow-1 confirm-parent'>
			<div className={'karvan-info-parent-payment karvan-info-container-payment-mt w-full justify-around flex flex-column'}>
				{props.getReserveDetailList.data &&
					props.getReserveDetailList.data.map((row: any, index: number) => (
						<div key={index} className={'karvan-info-container-payment mt-3  '}>
							<div className={'karvan__info__section__one '}>
								<div className={'karvan__info__section'}>
									<div className={'karvan__info'}>
										<p className={'karvan__info__title mx-2'}> کدملی : </p>
										<p>{row.nationalCode}</p>
									</div>
								</div>
								<div className={'karvan__info__section'}>
									<div className={'karvan__info'}>
										<p className={'karvan__info__title mx-2'}>نام :</p>
										<p>{row.name} </p>
									</div>
								</div>
								<div className={'karvan__info__section'}>
									<div className={'karvan__info'}>
										<p className={'karvan__info__title mx-2'}>نام خانوادگی :</p>
										<p>{row.family} </p>
									</div>
								</div>
								<div className={'karvan__info__section'}>
									<div className={'karvan__info'}>
										<p className={'karvan__info__title mx-2'}>شماره سند :</p>
										<p>{row.sanadNo} </p>
									</div>
								</div>
								<div className={`karvan_button`}>
									<button onClick={PrintPage} className={`chose__karvan__btn `}>
										چاپ
									</button>
								</div>
							</div>
						</div>
					))}
			</div>
		</div>
	);
};

export default connect((state: IApplicationState) => state.registration, registrationActions)(ReservePage as ComponentType<any>);
