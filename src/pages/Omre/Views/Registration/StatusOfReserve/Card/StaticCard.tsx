import React, { ComponentType } from 'react';
import { connect } from 'react-redux';
import { registrationActions } from '../../../../Actions/Registration/action';
import { IRegistrationState } from '../../../../Actions/Registration/model';
import { IApplicationState } from '../../../../../../store/state';
import ZaerLogo from '../../../../../../assets/logoStepTowzaer.jpg';
import './StaticCard.css';

interface StaticCardProps {
	firstName: string;
	lastName: string;
	nationalCode: string;
	fatherName: string;
}

type IProps = typeof registrationActions & IApplicationState & StaticCardProps;

const StaticCard = (props: IProps) => {
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
											<div className=''>
												<strong>نام و خانوادگی :</strong>
											</div>
										</div>
										<div>
											<p className='mt-2'>{props.firstName + `` + props.lastName}</p>
										</div>
									</div>
									<div className='makemarginForItem'>
										<div className='justify-center'>
											<strong>کدملی :</strong>
										</div>
										<div>
											<p className='mt-2'>{props.nationalCode}</p>
										</div>
									</div>
									<div className='makemarginForItem'>
										<div className='justify-center'>
											<strong>نام پدر :</strong>
										</div>
										<div>
											<p className='mt-2'>{props.fatherName}</p>
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

export default connect((state: IApplicationState) => state, registrationActions)(StaticCard as ComponentType<any>);
