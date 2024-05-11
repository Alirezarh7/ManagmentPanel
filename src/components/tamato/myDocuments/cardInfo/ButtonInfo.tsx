import React, { ComponentType, useState } from 'react';
import { bindActionCreators } from 'redux';
import { Link, useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { FiEdit } from 'react-icons/fi';
import { LiaFileContractSolid } from 'react-icons/lia';
import { MdOutlinePayment } from 'react-icons/md';
import { GrDocumentTransfer } from 'react-icons/gr';
import { MdOutlineAppRegistration } from 'react-icons/md';
import { CiForkAndKnife } from 'react-icons/ci';
import { MdApartment } from 'react-icons/md';
import { IApplicationState } from '../../../../store/state';
import { ButtonInfoProps } from '../../../../typs/tamatoDocs.types';
import { callCompleteInformationActions } from '../../../../pages/Tamato/Actions/CallCompleteInformations/action';
import { ICallCompleteInformationState } from '../../../../pages/Tamato/Actions/CallCompleteInformations/model';
import { reserveAndRegisterActions } from '../../../../pages/Tamato/Actions/ReserveAndRegister/action';
import { IReserveAndRegisterState } from '../../../../pages/Tamato/Actions/ReserveAndRegister/model';
import CustomButton from '../../../general/Buttons/CustomButton';
import ConfirmationModal from '../../../general/Modal/reusebleModal/ConfirmationModal';

import { CloseOutlined, CreditCardOutlined, FormOutlined, PrinterOutlined } from '@ant-design/icons';

type IProps = typeof callCompleteInformationActions &
	ICallCompleteInformationState &
	typeof reserveAndRegisterActions &
	IReserveAndRegisterState &
	ButtonInfoProps;

const ButtonInfo = ({
	sanadInfo,
	getDocumentListByNationalCode,
	getDocumentFromFarakhan,
	getPrintReserveData,
	cancelReserve
}: IProps) => {
	const navigate = useNavigate();
	const [showConfirmationModal, setShowConfirmationModal] = useState(false);
	const openConfirmationModalHandeler = () => setShowConfirmationModal(true);
	const closeConfirmationModalHandeler = () => setShowConfirmationModal(false);
	const renderButtons = () => {
		if (!sanadInfo.isReserved && !sanadInfo.isRegistered) {
			return (
				<div className='flex flex-col md:flex-row md:mx-[200px]'>
					<div className='flex justify-around item-center mt-[10px]'>
						<CustomButton
							variant={'select'}
							type={'button'}
							label={'واگذاری سند'}
							onClick={() =>
								sanadInfo.codeTrackingPreregistered > 0
									? navigate('/tamato/document-trasfer-agreement')
									: getDocumentListByNationalCode(sanadInfo.zaernumber, sanadInfo.branchCode, navigate)
							}
							icon={<GrDocumentTransfer className='text-red-500' />}
						/>
						<CustomButton
							variant={'select'}
							type={'button'}
							label={'ثبت نام کاروان'}
							onClick={() =>
								sanadInfo.codeTrackingPreregistered > 0
									? navigate('/tamato/reserve-step-one')
									: getDocumentListByNationalCode(sanadInfo.zaernumber, sanadInfo.branchCode, navigate)
							}
							icon={<MdOutlineAppRegistration className='text-blue-500' />}
						/>
					</div>
					{sanadInfo.codeTrackingPreregistered > 0 ? (
						<div className='flex justify-around item-center mt-[10px] mb-[7px] '>
							<CustomButton
								variant={'select'}
								type={'button'}
								label={'ویرایش اطلاعات'}
								onClick={() => getDocumentFromFarakhan(sanadInfo.codeTrackingPreregistered, sanadInfo.zaernumber, navigate)}
								icon={<FiEdit className='text-yellow-500' />}
							/>
						</div>
					) : null}
				</div>
			);
		} else if (sanadInfo.isRegistered) {
			return (
				<div className='flex flex-col md:flex-row w-full'>
					<div className='flex justify-around item-center mt-[10px]'>
						<CustomButton
							variant={'select'}
							type={'button'}
							label={'پرداخت '}
							onClick={() => {
								navigate('/tamato/payment-confirmation');
							}}
							icon={<MdOutlinePayment className='text-black' />}
						/>
						<CustomButton
							variant={'select'}
							type={'button'}
							label={'تهدنامه'}
							onClick={() => {
								navigate('/tamato/promise', { state: { returnToDocs: true } });
							}}
							icon={<LiaFileContractSolid className='text-green-500' />}
						/>
					</div>
					<div className='flex justify-around item-center mt-[10px] mb-[7px] '>
						<CustomButton
							variant={'select'}
							type={'button'}
							label={'ویرایش اطلاعات'}
							onClick={() => getDocumentFromFarakhan(sanadInfo.codeTrackingPreregistered, sanadInfo.zaernumber, navigate)}
							icon={<FiEdit className='text-yellow-500' />}
						/>
					</div>
				</div>
			);
		} else if (sanadInfo.isReserved && !sanadInfo.isRegistered) {
			return (
				<div className='flex flex-col md:flex-row w-full '>
					<div className='flex justify-around item-center mt-[10px] '>
						<CustomButton
							variant={'select'}
							type={'button'}
							label={'چاپ رزرو'}
							onClick={() => getPrintReserveData(sanadInfo.codeTrackingPreregistered, sanadInfo.nationalCode, navigate)}
							icon={<PrinterOutlined className={'text-red-500'} />}
						/>
						<CustomButton
							variant={'select'}
							type={'button'}
							label={'تعهد نامه'}
							onClick={() => {
								navigate('/tamato/promise', { state: { returnToDocs: true } });
							}}
							icon={<CreditCardOutlined className='text-green-500' />}
						/>
					</div>
					<div className='flex justify-around item-center mt-[10px] mb-[7px] '>
						<CustomButton
							variant={'select'}
							type={'button'}
							label={'انصراف رزرو'}
							onClick={openConfirmationModalHandeler}
							icon={<MdOutlinePayment className='text-black' />}
						/>
						<ConfirmationModal
							isOpen={showConfirmationModal}
							onAccept={() => {
								cancelReserve({
									codeTracking: sanadInfo.codeTrackingPreregistered,
									nationalCode: sanadInfo.nationalCode
								});
							}}
							onCancel={closeConfirmationModalHandeler}
						/>
					</div>
				</div>
			);
		}
	};
	return <div>{renderButtons()}</div>;
};
export default connect(
	(state: IApplicationState) => state.callCompleteInformation,
	(dispatch: any) => bindActionCreators({ ...reserveAndRegisterActions, ...callCompleteInformationActions }, dispatch)
)(ButtonInfo as ComponentType<any>);
