import { Collapse } from 'antd';
import React, { useState } from 'react';
import './AccordingForOmre.css';
import Modal from '../StatusOfReserve/Modal/Modal';
import { connect } from 'react-redux';
import { IRegistrationState } from '../../../Actions/Registration/model';
import { registrationActions } from '../../../Actions/Registration/action';
import { IApplicationState } from '../../../../../store/state';

const { Panel } = Collapse;

type DataType = {
	karGroupId: number;
	flightDatePersian: string;
	passengerId: number;
	sanadNo: number;
	kargozarOfficeAddress: string;
	kargozarNo: number;
	kargozarOfficeName: string;
	kargozarOfficePhone: string;
	managerName: string;
	price: number;
	index?: number;
};
type CollapseProps = {
	value: DataType;
};
type IProps = typeof registrationActions & IRegistrationState;

const According: React.FC<CollapseProps> = ({ value }, props: IProps) => {
	const [isShow, setIsShow] = useState<any>(null);

	const handleModal = (state: boolean) => {
		setIsShow(state);
	};

	return (
		<>
			<div>
				<Modal show={isShow} handleModal={handleModal} passengerId={value.passengerId} />
				<Collapse className='rounded-lg mt-3 BorderReduceForTitle someOtherClass' defaultActiveKey={[`${value.index}`]}>
					<Panel
						className='bodyAccordingOmre BorderReduceForTitle  '
						header={<strong className='mx-2 titleColorText'>تاریخچه ثبت نام زائر</strong>}
						key={`${value.index}`}>
						<div>
							<div className='dataDivAccording '>
								<div className='col'>
									<div className='flex'>
										<div className='alirezaAccording p-1'>
											<strong>شماره کاروان :</strong>
										</div>
										<div className=' p-1'>
											<p>{value.karGroupId}</p>
										</div>
									</div>
								</div>
								<div className='col'>
									<div className='flex'>
										<div className='alirezaAccording p-1'>
											<strong>تاریخ پرواز :</strong>
										</div>
										<div className=' p-1'>
											<p>{value.flightDatePersian}</p>
										</div>
									</div>
								</div>

								<div className='col'>
									<div className='flex'>
										<div className='alirezaAccording p-1'>
											<strong>نام مدیر کاروان :</strong>
										</div>
										<div className=' p-1'>
											<p>{value.managerName}</p>
										</div>
									</div>
								</div>

								<div className='col'>
									<div className='flex'>
										<div className='alirezaAccording p-1'>
											<strong>نام دفتر کارگزاری :</strong>
										</div>
										<div className=' p-1'>
											<p>{value.kargozarOfficeName}</p>
										</div>
									</div>
								</div>
							</div>
							<div className='dataDivAccording '>
								<div className='col'>
									<div className='flex'>
										<div className='alirezaAccording p-1'>
											<strong>تلفن کارگزار :</strong>
										</div>
										<div className=' p-1'>
											<p>{value.kargozarOfficePhone}</p>
										</div>
									</div>
								</div>

								<div className='col'>
									<div className='flex'>
										<div className='alirezaAccording p-1'>
											<strong>شماره ثبت نام :</strong>
										</div>
										<div className=' p-1'>
											<p>{value.sanadNo}</p>
										</div>
									</div>
								</div>

								<div className='col'>
									<div className='flex'>
										<div className='alirezaAccording p-1'>
											<strong>مبلغ پرداختی :</strong>
										</div>
										<div className=' p-1'>
											<p>{value.price}</p>
										</div>
									</div>
								</div>
								<div className='col'>
									<div className='flex'>
										<div className='alirezaAccording p-1'>
											<p></p>
										</div>
										<div className=' p-1'>
											<strong></strong>
										</div>
									</div>
								</div>
							</div>
							<div className='dataDivAccording'>
								<div className='col'>
									<div className='flex'>
										<div className='alirezaAccording p-1'>
											<strong>آدرس کارگزار:</strong>
										</div>
										<div className='p-1'>
											<p>{value.kargozarOfficeAddress}</p>
										</div>
									</div>
								</div>
								<div className='col'>
									<div className='flex'>
										<div className='alirezaAccording p-1'></div>
										<button className='btn buttonBuyRequestGroup' onClick={() => setIsShow(true)}>
											مشاهده پرداخت
										</button>
									</div>
								</div>
							</div>
						</div>
					</Panel>
				</Collapse>
			</div>
		</>
	);
};

export default connect((state: IApplicationState) => state.registration, registrationActions)(According);
