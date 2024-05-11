import React, { ComponentType } from 'react';
import { connect } from 'react-redux';
import { registrationActions } from '../../../../Actions/Registration/action';
import { IApplicationState } from './../../../../../../store/state';
import ZaerLogo from '../../../../../../assets/logoStepTowzaer.jpg';
import './ListForStepTwo.css';

type IProps = typeof registrationActions &
	IApplicationState & {
		item: any;
	};

const ListForStepTwo = (props: IProps) => {
	return (
		<>
			<div className='shadow-lg rounded'>
				<ul className='list-group-item'>
					<li>
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
								<div className='containerList makemarginForItem'>
									<div className=''>
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
									<div className='makemarginForItem'>
										<div className='justify-center'>
											<p>شماره سند</p>
										</div>
										<div>
											<span className='card__info__stats'>{props.item && props.item.sanadNo ? props.item.sanadNo : '---'}</span>
										</div>
									</div>
									<div className='makemarginForItem'>
										<div className='justify-center'>
											<p>کد اولویت</p>
										</div>
										<div>
											<span className='card__info__stats mx-3'>
												{props.item && props.item.priority ? props.item.priority : '---'}
											</span>
										</div>
									</div>
									<div className='makemarginForItem'>
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
						</div>
					</li>
				</ul>
			</div>
		</>
	);
};

export default connect((state: IApplicationState) => state, registrationActions)(ListForStepTwo as ComponentType<any>);
