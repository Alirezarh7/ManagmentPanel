import React, { useEffect, useLayoutEffect, useState } from 'react';
import { connect } from 'react-redux';
import { IApplicationState } from '../../../../store/state';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import NapLoading from '../../../../components/general/NapLoading/NapLoading';
import Flex from '../../../../components/general/DataSummary/Flex';
import DOC from '../../../../assets/doc.png';
import { Divider, Tag } from 'antd';
import { CloseOutlined, FormOutlined, PrinterOutlined } from '@ant-design/icons';
import { bindActionCreators } from 'redux';
import { Modal } from 'react-bootstrap';
import NapAlerts from '../../../../components/general/NapAlerts/NapAlerts';
import { registrationActions } from '../../Actions/Registration/action';
import { IRegistrationState } from '../../Actions/Registration/model';
import OmreSearchModal from './StepOne/Modal/OmreSearchModal';
import { shareData } from '../../../../shareData';
import CreateGroupConfirmModal from './CreateGroupConfirmModal';
import CheckInformation from './StepTwo/GroupingStep/CheckInformation';
import BuyModal from './BuyModal';
import Carousel from '../../../../components/general/Carousel/Carousel';

type IProps = typeof registrationActions & IRegistrationState;

const MyDocumentsDetail = (props: IProps) => {
	const history = useNavigate();
	const [show, setShow] = useState(false);
	const [showGroupModal, setShowGroupModal] = useState<boolean>(false);
	const [t] = useTranslation();
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);
	const handleShowGroupConfirm = (state: boolean) => setShowGroupModal(state);

	useLayoutEffect(() => {
		props.setCrumbs([
			{ title: t('discounts'), link: '' },
			{ title: t('OmreReservation'), link: '/OmreMofrade/myDocuments' }
		]);
	}, []);

	const groupStateCode = props.omreSanad.data;
	const dataList: any = [];
	if (Array.isArray(groupStateCode)) {
		groupStateCode.forEach(Code => {
			dataList.push(Code.groupStateCode);
		});
	}

	const steptwo = dataList[0];

	const oidcUserString: any = localStorage.getItem(shareData.CONSTANT.GOV_STORAGE_KEY)
		? localStorage.getItem(shareData.CONSTANT.GOV_STORAGE_KEY)
		: localStorage.getItem(shareData.ORGANIZATION_STORAGE_KEY);

	const oidcUser = JSON.parse(oidcUserString);
	const NationalCode = oidcUser.profile?.nationalCode;

	const Menus = (doc: any) => {
		return (
			<>
				<div className='w-full h-full flex items-center justify-around flex-row  '>
					{/*          {doc.isRegistered && (
            <div className="flex items-center register-karvan-action-btn">
            <Link
              className="text-center w-full inline-block px-1 py-2 ml-1 register-karvan"
              to={'/OmreMofrade/StatusOfReserve'} state={{ sanadNo: doc.sanadNo }}
            >
              <FormOutlined className="icon-icon-register" />
              `مشاهده وضعیت ثبت نام`
            </Link>
            </div>
          )}*/}
					{!doc.isReserved && !doc.isRegistered && (
						<>
							{steptwo === 'Confirmed' ? (
								<div className='flex items-center register-karvan-action-btn'>
									<Link
										className='text-center w-full inline-block px-1 py-2 ml-1 register-karvan'
										to={'/OmreMofrade/select-group-passenger'}>
										{' '}
										<FormOutlined className='icon-icon-register' />
										تایید نهایی
									</Link>
								</div>
							) : (
								<div className='flex items-center register-karvan-action-btn'>
									{!doc.isCreatedGroup && !doc.isDisplayed ? (
										<p
											className='text-center w-full inline-block py-2 mb-0 px-1 ml-1 register-karvan'
											onClick={() => handleShowGroupConfirm(true)}>
											<FormOutlined className='icon-icon-register' />
											ایجاد گروه
										</p>
									) : doc.isCreatedGroup && doc.isDisplayed ? (
										<Link
											className='text-center w-full inline-block px-1 py-2 ml-1 register-karvan'
											to={'/OmreMofrade/select-group-passenger'}>
											{' '}
											<FormOutlined className='icon-icon-register' />
											گروه بندی
										</Link>
									) : (
										doc.isCreatedGroup && !doc.isDisplayed && ''
									)}
								</div>
							)}
						</>
					)}
					{doc.isReserved && !doc.isRegistered && (
						<>
							<div className='flex items-center antd-menu-desk-icon action-my-document-btn'>
								<PrinterOutlined />
								<button
									onClick={() => {
										history('/OmreMofrade/ReservPrint');
									}}
									className='text-right w-full inline-block px-1 py-2 ml-1 cursor-pointer '
									style={{ all: 'unset' }}>
									چاپ رزرو
								</button>
							</div>
							<div className='flex items-center action-my-document-btn-cancel'>
								<CloseOutlined className={'text-danger'} />
								<span
									className='text-right w-full inline-block px-1 py-2 text-white ml-1 text-danger'
									style={{ cursor: 'pointer' }}
									onClick={() => {
										props.EbtalReserve({
											passengerReservedID: doc.passengerReservedId,
											NationalCode
										});
										props.getOmreDocument();
									}}>
									انصراف رزرو
								</span>
								<Modal show={show} onHide={handleClose} size='lg'>
									<Modal.Header closeButton>
										<Modal.Title></Modal.Title>
									</Modal.Header>
									<Modal.Body>
										<div>
											<p>آیا از انصراف اطمینان دارید؟</p>
										</div>
									</Modal.Body>
									<Modal.Footer>
										<button onClick={handleClose} className='btn btn-outline-danger btn-sm'>
											خیر
										</button>
										<button
											onClick={() => {
												props.EbtalReserve({
													passengerReservedID: doc.passengerReservedId,
													NationalCode
												});
												props.getOmreDocument();
											}}
											className='btn btn-outline-success mx-3 btn-sm'>
											بله میخواهم انصراف بدهم
										</button>
									</Modal.Footer>
								</Modal>
							</div>
						</>
					)}
				</div>
			</>
		);
	};
	const MobileMenus = (doc: any) => {
		return (
			<div className='w-full'>
				{/*        {doc.isRegistered && (
          <div className="flex items-center register-karvan-action-btn">
            <Link
              className="text-center w-full inline-block px-1 py-2 ml-1 register-karvan"
              to={"/OmreMofrade/StatusOfReserve"} state={{ sanadNo: doc.sanadNo }}
            >
              <FormOutlined className="icon-icon-register" />
              مشاهده وضعیت ثبت نام
            </Link>
          </div>
        )}*/}
				{!doc.isReserved && !doc.isRegistered && (
					<>
						{steptwo === 'Confirmed' ? (
							<div className='flex items-center register-karvan-action-btn'>
								<Link
									className='text-center w-full inline-block px-1 py-2 ml-1 register-karvan'
									to={'/OmreMofrade/select-group-passenger'}>
									{' '}
									<FormOutlined className='icon-icon-register' />
									تایید نهایی
								</Link>
							</div>
						) : (
							<div className='flex items-center register-karvan-action-btn'>
								{!doc.isCreatedGroup && !doc.isDisplayed ? (
									<p
										className='text-center w-full inline-block py-2 mb-0 px-1 ml-1 register-karvan'
										onClick={() => handleShowGroupConfirm(true)}>
										<FormOutlined className='icon-icon-register' />
										ایجاد گروه
									</p>
								) : doc.isCreatedGroup && doc.isDisplayed ? (
									<Link
										className='text-center w-full inline-block px-1 py-2 ml-1 register-karvan'
										to={'/OmreMofrade/select-group-passenger'}>
										{' '}
										<FormOutlined className='icon-icon-register' />
										گروه بندی
									</Link>
								) : (
									doc.isCreatedGroup && !doc.isDisplayed && ''
								)}
							</div>
						)}
					</>
				)}

				{doc.isReserved && !doc.isRegistered && (
					<>
						<div className='flex items-center antd-menu-desk-icon action-my-document-btn'>
							<button
								onClick={() => history('/OmreMofrade/ReservPrint')}
								className='text-center w-full inline-block px-1 py-2 ml-1 cursor-pointer'
								style={{ all: 'unset' }}>
								<PrinterOutlined /> چاپ رزرو
							</button>
						</div>

						<div style={{ marginTop: '10px', borderRadius: '5px' }} className='flex items-center action-my-document-btn-cancel'>
							<span
								className='text-center w-full inline-block px-1 py-2 text-white ml-1 text-danger'
								style={{ cursor: 'pointer' }}
								onClick={() => handleShow()}>
								<CloseOutlined className={'text-danger'} /> انصراف رزرو{' '}
							</span>

							<Modal show={show} onHide={handleClose} size='lg'>
								<Modal.Header closeButton>
									<Modal.Title></Modal.Title>
								</Modal.Header>
								<Modal.Body>
									<div>
										<p>آیا از انصراف اطمینان دارید؟</p>
									</div>
								</Modal.Body>
								<Modal.Footer>
									<button onClick={handleClose} className='btn btn-outline-danger btn-sm'>
										خیر
									</button>
									<button
										onClick={() => {
											props.EbtalReserve({
												passengerReservedID: doc.passengerReservedId,
												NationalCode
											});
											props.getOmreDocument();
										}}
										className='btn btn-outline-success mx-3 btn-sm'>
										بله میخواهم انصراف بدهم
									</button>
								</Modal.Footer>
							</Modal>
						</div>
					</>
				)}
			</div>
		);
	};

	return (
		<React.Fragment>
			<NapAlerts alerts={props.alerts} clearAlerts={() => props.clearAlerts()} />
			{/*<NapLoading loading={props.omreSanad.loading || props.aghlamBaz.loading || props.createPassengerGroup.loading} />*/}
			<div className='bg-glass'>
				{/*<h4 className='my-3 text-base font-semibold'>اطلاعیه های حج تمتع</h4>*/}
				{/*<Carousel />*/}
				<div
					style={{
						borderBottomStyle: 'solid',
						borderBottomWidth: '1px',
						borderBottomColor: '#000'
					}}
					className='md:flex items-center justify-between'>
					<h4 className='my-3 text-base font-semibold'>سند های من</h4>
					{props.omreSanad.data ? (
						<p className='text-right text-dark mb-0 mr-5 mr-md-0 font-weight-bold'>{props.omreSanad.data.length} سند یافت شد </p>
					) : (
						''
					)}
				</div>
				<p className='text-center p-3 mb-lg-5 mb-0 mr-5 ml-5 mt-0 search-sanad-text'>
					{' '}
					در صورت بارگذاری نشدن اطلاعات سند مورد نظر{' '}
					<span
						onClick={() => props.setToggleSearchModal(true)}
						style={{ cursor: 'pointer' }}
						className='text-white font-weight-bold mx-1 bg-info px-2 rounded'>
						اینجا
					</span>{' '}
					کلیک کنید
				</p>
				{props.omreSanad && props.omreSanad.data && props.omreSanad.data.length > 0 ? (
					<>
						<div className=' flex flex-col items-center justify-around'>
							{props.omreSanad &&
								props.omreSanad.data &&
								props.omreSanad.data.map((doc: any) => (
									<>
										<div
											className='sanad-cart p-3 m-5 sm:flex hidden items-center justify-start md:justify-around flex-wrap rounded bg-white'
											style={{
												border: '1px solid #aaa',
												boxShadow: '1px 1px 3px #ccc'
											}}>
											<Flex value={doc.sanadNo} label={'شماره ثبت نام'} />
											<Flex value={doc.priority} label={'کد اولویت'} />
											<Flex value={doc.ssn} label={'کد ملی'} />
											<Flex value={doc.zaerStatusMessage ? doc.zaerStatusMessage : '---'} label={'وضعیت'} />
											<Flex value={doc.bankName} label={'نام بانک'} />
											{Menus(doc)}
										</div>

										<div
											className='sanad-cart bg-white p-3 m-lg-5 m-3 sm:hidden flex items-center justify-start rounded flex-col'
											style={{
												border: '1px solid #aaa',
												boxShadow: '1px 1px 3px #ccc'
											}}>
											<Tag color={'warning'}>{doc.zaerStatusMessage ? doc.zaerStatusMessage : '---'}</Tag>
											<div className='flex items-center justify-between w-full mt-3'>
												<span>شماره ثبت نام</span>
												<Divider
													style={{
														width: '50%',
														height: '0.5px',
														background: '#ccc',
														minWidth: 'unset'
													}}
													orientation='left'
													plain
												/>
												<span>{doc.sanadNo}</span>
											</div>
											<div className='flex items-center justify-between w-full mt-3'>
												<span>کد اولویت</span>
												<Divider
													style={{
														width: '50%',
														height: '0.5px',
														background: '#ccc',
														minWidth: 'unset'
													}}
													orientation='left'
													plain
												/>
												<span>{doc.priority}</span>
											</div>
											<div className='flex items-center justify-between w-full mt-3'>
												<span>کد ملی</span>
												<Divider
													style={{
														width: '50%',
														height: '0.5px',
														background: '#ccc',
														minWidth: 'unset'
													}}
													orientation='left'
													plain
												/>
												<span>{doc.ssn}</span>
											</div>

											<div className='flex items-center justify-between w-full mt-3'>
												<span>نام بانک</span>
												<Divider
													style={{
														width: '50%',
														height: '0.5px',
														background: '#ccc',
														minWidth: 'unset'
													}}
													orientation='left'
													plain
												/>
												<span>{doc.bankName}</span>
											</div>
											{MobileMenus(doc)}
										</div>
									</>
								))}
						</div>
					</>
				) : (
					''
				)}
			</div>
			<OmreSearchModal />
			<CreateGroupConfirmModal show={showGroupModal} setShow={handleShowGroupConfirm} />
		</React.Fragment>
	);
};
export default connect(
	(state: IApplicationState) => state.registration,
	(dispatch: any) => bindActionCreators({ ...registrationActions }, dispatch)
)(MyDocumentsDetail);
