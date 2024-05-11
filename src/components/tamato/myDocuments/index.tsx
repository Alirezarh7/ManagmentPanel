import { ComponentType, useLayoutEffect } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { bindActionCreators } from 'redux';
import { CiUser } from 'react-icons/ci';
import { LuSettings } from 'react-icons/lu';
import { IApplicationState } from '../../../store/state';
import { callCompleteInformationActions } from '../../../pages/Tamato/Actions/CallCompleteInformations/action';
import { ICallCompleteInformationState } from '../../../pages/Tamato/Actions/CallCompleteInformations/model';
import { IReserveAndRegisterState } from '../../../pages/Tamato/Actions/ReserveAndRegister/model';
import { reserveAndRegisterActions } from '../../../pages/Tamato/Actions/ReserveAndRegister/action';
import { TamatoDocsTypes } from '../../../typs/__archive/tamatoDocs.types';
import NapLoading from '../../general/NapLoading/NapLoading';
import NapAlerts from '../../general/NapAlerts/NapAlerts';
import CustomButton from '../../general/Buttons/CustomButton';
import Carousel from '../../general/Carousel/Carousel';
import InformationSearchModal from './InformationSearchModal';
import Title from './cardInfo/Title';
import TitleInfo from './cardInfo/TitleInfo.';
import ButtonInfo from './cardInfo/ButtonInfo';
import './callCompleteInformations.css';

type IProps = typeof callCompleteInformationActions &
	ICallCompleteInformationState &
	typeof reserveAndRegisterActions &
	IReserveAndRegisterState;

const TamatoMyDocumentsContents = (props: IProps) => {
	const history = useNavigate();

	const [t] = useTranslation();

	useLayoutEffect(() => {
		props.clearHajFromFarakhanDocument();
		props.clearHajDocument();
		localStorage.removeItem('moreSanadData');
		sessionStorage.removeItem('changedStep');
		localStorage.removeItem('stepsData');
		localStorage.removeItem('tamatoeStep');
		props.setCrumbs([{ title: t('tamatu'), link: '' }]);
	}, []);

	const getDocumentsType = (data: any): void => {
		if (data.codeTrackingPreregistered === 0) {
			props.getDocumentListByNationalCode(data.zaernumber, data.branchCode, history);
		} else {
			props.getDocumentFromFarakhan(data.codeTrackingPreregistered, data.zaernumber, history);
		}
	};

	// const Menus = (doc: any) => {
	// 	return (
	// 		<div className='w-full flex items-center flex-row justify-around '>
	// 			{!doc.isReserved && !doc.isRegistered && (
	// 				<>
	// 					{doc.codeTrackingPreregistered > 0 ? (
	// 						<div className='flex items-center transition-all '>
	// 							<FormOutlined />
	// 							<Link className='text-right w-full inline-block px-1 py-2 ml-1 register-karvan' to={'/tamato/reserve-step-one'}>
	// 								ثبت نام کاروان
	// 							</Link>
	// 						</div>
	// 					) : (
	// 						<div className='flex items-center register-karvan-action-btn'>
	// 							<FormOutlined />
	// 							<span
	// 								className='text-right w-full inline-block px-1 py-2 ml-1 register-karvan'
	// 								onClick={() => props.getDocumentListByNationalCode(doc.zaernumber, doc.branchCode, history)}>
	// 								ثبت نام کاروان
	// 							</span>
	// 						</div>
	// 					)}
	//
	// 					{doc.codeTrackingPreregistered > 0 ? (
	// 						<div className='flex items-center antd-menu-desk-icon action-my-document-btn'>
	// 							<Link
	// 								className='text-center w-full inline-block px-1 py-2 ml-1'
	// 								style={{ all: 'unset', cursor: 'pointer' }}
	// 								to={'/tamato/document-trasfer-agreement'}>
	// 								<SendOutlined /> واگذاری و فروش سند
	// 							</Link>
	// 						</div>
	// 					) : (
	// 						<div className='flex items-center antd-menu-desk-icon action-my-document-btn'>
	// 							<span
	// 								className='text-center w-full inline-block px-1 py-2 ml-1'
	// 								style={{ cursor: 'pointer' }}
	// 								onClick={() => props.getDocumentListByNationalCode(doc.zaernumber, doc.branchCode, history)}>
	// 								{' '}
	// 								<SendOutlined /> واگذاری و فروش سند
	// 							</span>
	// 						</div>
	// 					)}
	// 				</>
	// 			)}
	// 			{doc.codeTrackingPreregistered > 0 && (
	// 				<div className='flex items-center antd-menu-desk-icon action-my-document-btn'>
	// 					<FormOutlined />
	// 					<span
	// 						className='text-right w-full inline-block px-1 py-2 ml-1'
	// 						style={{ cursor: 'pointer' }}
	// 						onClick={() => props.getDocumentFromFarakhan(doc.codeTrackingPreregistered, doc.zaernumber, history)}>
	// 						ویرایش اطلاعات
	// 					</span>
	// 				</div>
	// 			)}
	// 			{doc.isRegistered && (
	// 				<>
	// 					<div className='flex items-center antd-menu-desk-icon action-my-document-btn'>
	// 						<CreditCardOutlined />
	// 						<Link
	// 							className='cursor-pointer text-right w-full inline-block px-1 py-2 ml-1'
	// 							style={{ cursor: 'pointer', all: 'unset' }}
	// 							to={'/tamato/promise'}
	// 							state={{ returnToDocs: true }}>
	// 							تعهد نامه
	// 						</Link>
	// 					</div>
	// 					<div className='flex items-center antd-menu-desk-icon action-my-document-btn'>
	// 						<CreditCardOutlined />
	// 						<Link
	// 							className='text-right w-full inline-block px-1 py-2 ml-1'
	// 							style={{ cursor: 'pointer', all: 'unset' }}
	// 							to={'/tamato/payment-confirmation'}>
	// 							پرداخت
	// 						</Link>
	// 					</div>
	// 				</>
	// 			)}
	//
	// 			{doc.isReserved && !doc.isRegistered && (
	// 				<>
	// 					<div className='flex items-center antd-menu-desk-icon action-my-document-btn'>
	// 						<PrinterOutlined />
	// 						<button
	// 							onClick={() => {
	// 								props.getPrintReserveData(doc.codeTrackingPreregistered, doc.nationalCode, history);
	// 							}}
	// 							className='text-right w-full inline-block px-1 py-2 ml-1 cursor-pointer'
	// 							style={{ cursor: 'pointer', all: 'unset' }}>
	// 							چاپ رزرو
	// 						</button>
	// 					</div>
	// 					<div className='flex items-center antd-menu-desk-icon action-my-document-btn'>
	// 						<CreditCardOutlined />
	// 						<Link
	// 							className='cursor-pointer text-right w-full inline-block px-1 py-2 ml-1'
	// 							style={{ cursor: 'pointer', all: 'unset' }}
	// 							to={'/tamato/promise'}
	// 							state={{ returnToDocs: true }}>
	// 							تعهد نامه
	// 						</Link>
	// 					</div>
	// 					<div className='flex items-center action-my-document-btn-cancel'>
	// 						<CloseOutlined className={'text-danger'} />
	// 						<span
	// 							className='text-right w-full inline-block px-1 py-2 text-white ml-1 text-danger'
	// 							style={{ cursor: 'pointer' }}
	// 							onClick={openConfirmationModalHandeler}>
	// 							انصراف رزرو
	// 						</span>
	// 						<ConfirmationModal
	// 							isOpen={showConfirmationModal}
	// 							onAccept={() => {
	// 								props.cancelReserve({
	// 									codeTracking: doc.codeTrackingPreregistered,
	// 									nationalCode: doc.nationalCode
	// 								});
	// 							}}
	// 							onCancel={closeConfirmationModalHandeler}
	// 						/>
	// 					</div>
	// 				</>
	// 			)}
	// 		</div>
	// 	);
	// };

	// const MobileMenus = (doc: any) => {
	// 	return (
	// 		<div className='w-full'>
	// 			{/*	{!doc.isReserved && !doc.isRegistered && (
	// 				<>
	// 					{doc.codeTrackingPreregistered > 0 ? (
	// 						<div className='flex items-center register-karvan-action-btn'>
	// 							<Link className='text-center w-full inline-block px-1 py-2 ml-1 register-karvan' to={'/tamato/reserve-step-one'}>
	// 								{' '}
	// 								<FormOutlined className='icon-icon-register' /> ثبت نام کاروان{' '}
	// 							</Link>
	// 						</div>
	// 					) : (
	// 						<div className='flex items-center register-karvan-action-btn'>
	// 							<span
	// 								className='text-center w-full inline-block px-1 py-2 ml-1 register-karvan'
	// 								onClick={() => props.getDocumentListByNationalCode(doc.zaernumber, doc.branchCode, history)}>
	// 								{' '}
	// 								<FormOutlined className='text-dark' /> ثبت نام کاروان
	// 							</span>
	// 						</div>
	// 					)}
	//
	// 					{doc.codeTrackingPreregistered > 0 ? (
	// 						<div className='flex items-center antd-menu-desk-icon action-my-document-btn'>
	// 							<Link
	// 								className='text-center w-full inline-block px-1 py-2 ml-1'
	// 								style={{ all: 'unset', cursor: 'pointer' }}
	// 								to={'/tamato/document-trasfer-agreement'}>
	// 								{' '}
	// 								<SendOutlined /> واگذاری و فروش سند
	// 							</Link>
	// 						</div>
	// 					) : (
	// 						<div className='flex items-center antd-menu-desk-icon action-my-document-btn'>
	// 							<span
	// 								className='text-center w-full inline-block px-1 py-2 ml-1'
	// 								style={{ all: 'unset', cursor: 'pointer' }}
	// 								onClick={() => props.getDocumentListByNationalCode(doc.zaernumber, doc.branchCode, history)}>
	// 								{' '}
	// 								<SendOutlined /> واگذاری و فروش سند
	// 							</span>
	// 						</div>
	// 					)}
	// 				</>
	// 			)}*/}
	//
	// 			{/*{doc.codeTrackingPreregistered > 0 && (*/}
	// 			{/*	<div className='flex items-center antd-menu-desk-icon action-my-document-btn'>*/}
	// 			{/*		<span*/}
	// 			{/*			className='text-center w-full inline-block px-1 py-2 ml-1'*/}
	// 			{/*			style={{ all: 'unset' }}*/}
	// 			{/*			onClick={() => props.getDocumentFromFarakhan(doc.codeTrackingPreregistered, doc.zaernumber, history)}>*/}
	// 			{/*			{' '}*/}
	// 			{/*			<FormOutlined /> ویرایش اطلاعات*/}
	// 			{/*		</span>*/}
	// 			{/*	</div>*/}
	// 			{/*)}*/}
	//
	// 			{/*{doc.isRegistered && (
	// 				<>
	// 					<div className='flex items-center antd-menu-desk-icon action-my-document-btn'>
	// 						<Link
	// 							className='text-center w-full inline-block px-1 py-2 ml-1'
	// 							style={{ cursor: 'pointer', all: 'unset' }}
	// 							to={'/tamato/promise'}>
	// 							<CreditCardOutlined /> تعهد نامه{' '}
	// 						</Link>
	// 					</div>
	// 					<div className='flex items-center antd-menu-desk-icon action-my-document-btn'>
	// 						<Link
	// 							className='text-center w-full inline-block px-1 py-2 ml-1'
	// 							style={{ all: 'unset' }}
	// 							to={'/tamato/payment-confirmation'}>
	// 							<CreditCardOutlined /> پرداخت
	// 						</Link>
	// 					</div>
	// 				</>
	// 			)}*/}
	// 			{doc.isReserved && !doc.isRegistered && (
	// 				<>
	// 					<div className='flex items-center antd-menu-desk-icon action-my-document-btn'>
	// 						<button
	// 							onClick={() => props.getPrintReserveData(doc.codeTrackingPreregistered, doc.nationalCode, history)}
	// 							className='text-center w-full inline-block px-1 py-2 ml-1 cursor-pointer'
	// 							style={{ all: 'unset' }}>
	// 							<PrinterOutlined /> چاپ رزرو
	// 						</button>
	// 					</div>
	//
	// 					<div className='flex items-center antd-menu-desk-icon action-my-document-btn'>
	// 						<Link
	// 							className='text-center w-full inline-block px-1 py-2 ml-1'
	// 							style={{ cursor: 'pointer', all: 'unset' }}
	// 							to={'/tamato/promise'}
	// 							state={{ returnToDocs: true }}>
	// 							<CreditCardOutlined /> تعهد نامه{' '}
	// 						</Link>
	// 					</div>
	//
	// 					<div style={{ marginTop: '10px', borderRadius: '5px' }} className='flex items-center action-my-document-btn-cancel'>
	// 						<span
	// 							className='text-center w-full inline-block px-1 py-2 text-white ml-1 text-danger'
	// 							style={{ cursor: 'pointer' }}
	// 							onClick={openConfirmationModalHandeler}>
	// 							<CloseOutlined className={'text-danger'} /> انصراف رزرو{' '}
	// 						</span>
	// 						<ConfirmationModal
	// 							isOpen={showConfirmationModal}
	// 							onAccept={() => {
	// 								props.cancelReserve({
	// 									codeTracking: doc.codeTrackingPreregistered,
	// 									nationalCode: doc.nationalCode
	// 								});
	// 							}}
	// 							onCancel={closeConfirmationModalHandeler}
	// 						/>
	// 					</div>
	// 				</>
	// 			)}
	// 		</div>
	// 	);
	// };

	return (
		<>
			<NapAlerts alerts={props.alerts} clearAlerts={() => props.clearAlerts()} />
			<NapLoading loading={props.hajDocumentsFromFarakhan.loading || props.hajDocuments.loading} />
			<div>
				<div className=' w-screen  max-w-screen-xl mx-auto mt-2 '>
					<Carousel />
				</div>
				<div className=''>
					<p className='text-lg m-2 '>{props.documentsFromBank.data.length} سند یافت شد </p>
					<p className='text-center mt-2 text-lg'>
						در صورت بارگذاری نشدن اطلاعات سند مورد نظر
						<CustomButton
							variant={'secondary'}
							type={'button'}
							label={'اینجا'}
							onClick={() => props.setToggleSearchModal(true)}
						/>
						کلیک کنید
					</p>
					{props.documentsFromBank && props.documentsFromBank.data && props.documentsFromBank.data.length > 0 ? (
						props.documentsFromBank.data.map((sanadInfo: TamatoDocsTypes, index: number) => (
							<>
								<div key={sanadInfo.zaernumber} className='flex flex-col border !border-[#E4CA6F] rounded-lg m-2 mt-5'>
									<Title title='وضعیت زائر' icon={<CiUser />}>
										<TitleInfo
											infoOne={t('registerNumber')}
											answerOne={sanadInfo.zaernumber}
											infoTow={t('complexCode')}
											answerTow={sanadInfo.branchCode}
										/>
										<TitleInfo
											infoOne={t('status')}
											answerOne={sanadInfo.statusTitle}
											infoTow={t('priorityDate')}
											answerTow={sanadInfo.olaveyatDate}
										/>
									</Title>
									<Title title='عملیات' icon={<LuSettings />}>
										<ButtonInfo sanadInfo={sanadInfo} />
									</Title>
								</div>
							</>
						))
					) : (
						<div className='m-auto flex items-center justify-center flex-col'></div>
					)}
					<InformationSearchModal />
				</div>
			</div>
		</>
	);
};
export default connect(
	(state: IApplicationState) => state.callCompleteInformation,
	(dispatch: any) => bindActionCreators({ ...reserveAndRegisterActions, ...callCompleteInformationActions }, dispatch)
)(TamatoMyDocumentsContents as ComponentType);
