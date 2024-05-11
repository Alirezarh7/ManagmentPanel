import { ComponentType, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { IApplicationState } from '../../store/state';
import { transformationActions } from './Actions/Transformation/action';
import { ITransformationState } from './Actions/Transformation/model';
import NapLoading from '../../components/general/NapLoading/NapLoading';
import useTitle from '../../hooks/useTitle';
import SaleDocumentGrid from '../../components/tamato/documentTrade/sell/SaleDocumentGrid';
import TransformationInformation from '../../components/tamato/documentTrade/buy/Information';
import { callCompleteInformationActions } from '../Tamato/Actions/CallCompleteInformations/action';
import { bindActionCreators } from 'redux';
import InformationSearchModal from '../../components/tamato/myDocuments/InformationSearchModal';

type IProps = typeof callCompleteInformationActions & typeof transformationActions & IApplicationState;

const TamatoDocumentTradePage = (props: IProps) => {
	useTitle('sellSanad');
	const [t] = useTranslation();
	const [selectedOption, setSelectedOption] = useState(localStorage.getItem('transformationInformation') ? 'receiver' : '');

	useEffect(() => {
		props.getTransformation();
		props.setCrumbs([
			{ title: t('tamatu'), link: '' },
			{ title: t('mySanads'), link: '/tamato/my-documents' },
			{ title: t('sellSanad'), link: '/tamato/trade-document' }
		]);
	}, []);

	useEffect(() => {
		props.GetRequestList('Buy');
	}, []);

	useEffect(() => {
		props.GetProfilePersonShiftSanad();
	}, []);

	const filter =
		props.transformation.transformationRequest.data &&
		props.transformation.transformationRequest.data.filter((obj: any) => obj.sanadStatus === 0 || obj.sanadStatus === 1);

	return (
		<>
			<NapLoading
				loading={
					props.transformation.transformations.loading ||
					props.transformation.getProfilePersonShiftSanad.loading ||
					props.transformation.transformationRequest.loading
				}
			/>
			<InformationSearchModal />
			<div className='w-full max-w-screen-xl mx-auto mt-5'>
				<h4 className='w-full bg-[#05251E] text-[#ffffff] p-[10px] text-[15px] text-center rounded-lg'>
					لطفا نوع کاربری خود را انتخاب کنید
				</h4>
				{props.transformation.transformations.data && props.transformation.transformations.data.length !== 0 ? (
					<div className='mt-4'>
						<div className='m-[30px] flex justify-around gap-1'>
							<input
								type='radio'
								id='donorRadio'
								value='surrender'
								className='checkBoxTailwind w-4 h-4 w-4 h-4'
								checked={selectedOption === 'surrender' || true}
							/>
							<label htmlFor='donorRadio' className='px-2'>
								واگذار کننده اولویت تشرف به حج تمتع
							</label>
						</div>
						<SaleDocumentGrid />
					</div>
				) : filter.length > 0 ? (
					<div className={'mx-4'}>
						<div className='m-[30px] flex justify-around gap-1'>
							<input
								type='radio'
								id='receiverRadio'
								value='receiver'
								className='checkBoxTailwind w-4 h-4'
								checked={selectedOption === 'receiver' || true}
							/>
							<label htmlFor='receiverRadio' className='px-2'>
								دریافت کننده اولویت تشرف حج تمتع
							</label>
						</div>
						<TransformationInformation />
					</div>
				) : (
					<div className='w-full'>
						<div className='displayData mx-4'>
							<>
								<div className='m-[30px] flex justify-around gap-1'>
									<input
										type='radio'
										id='donorRadio'
										value='surrender'
										className='checkBoxTailwind w-4 h-4'
										checked={selectedOption === 'surrender'}
										onChange={() => setSelectedOption('surrender')}
									/>
									<label htmlFor='donorRadio'>واگذار کننده اولویت تشرف به حج تمتع</label>
								</div>
								<div className='m-[30px] flex justify-around gap-1'>
									<input
										type='radio'
										id='receiverRadio'
										value='receiver'
										className='checkBoxTailwind w-4 h-4'
										checked={selectedOption === 'receiver'}
										onChange={() => setSelectedOption('receiver')}
									/>
									<label htmlFor='receiverRadio'>دریافت کننده اولویت تشرف حج تمتع</label>
								</div>
							</>
						</div>
						{selectedOption === 'surrender' ? (
							<div className='text-center'>
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
							</div>
						) : selectedOption === 'receiver' ? (
							<TransformationInformation />
						) : null}
						<hr />
					</div>
				)}
			</div>
			{/* <Card/> */}
		</>
	);
};

export default connect(
	(state: IApplicationState) => state,
	(dispatch: any) => bindActionCreators({ ...transformationActions, ...callCompleteInformationActions }, dispatch)
)(TamatoDocumentTradePage as ComponentType);
