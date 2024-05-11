import { ComponentType, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { IApplicationState } from '../../store/state';
import { transformationActions } from './Actions/Transformation/action';
import { ITransformationState } from './Actions/Transformation/model';
import ListRequestShiftSanad from '../../components/tamato/documentTrade/sell/ListRequestShiftSanad';
import '../../components/tamato/documentTrade/callCompleteTransformation.css';
import NapLoading from '../../components/general/NapLoading/NapLoading';
import useFormControl from '../../components/general/NapFormControl/NapFormControl';
import CardOffice from '../../components/tamato/selectOfficeSell/Sell/CardOffice';
import '../../components/tamato/selectOfficeSell/Sell/Card.css';

// interface MergedData {
//   storedData: any;
//   storeData2: any;
// }

type MapType = {
	kargozarNo: number;
	address: string;
	cityName: string;
};

type DataType = {
	address: string;
	kargozarNo: number;
	cityName: string;
	index: number;
	nationalCodeBuyer: string;
	provinceId: number;
};

type IProps = typeof transformationActions & ITransformationState;

const TamatoSelectOfficeSellPage = (props: IProps) => {
	const history = useNavigate();
	const { t } = useTranslation();

	const [searchAdress, setSearchAdress] = useState<string>('');
	const [searchKargozarNo, setSearchKargozarNo] = useState<string>('');
	const [nationalCodeBuyer, setNationalCodeBuyer] = useState<any>();
	const [selectedOption, setSelectedOption] = useState<string>('');
	const [selectedData, setSelectedData] = useState<DataType | null>(null);

	const { values, onFormSubmit, onChangeHandler, GetError, setValue, GetRequired } = useFormControl({});

	useEffect(() => {
		props.getTransformationOffice();
		props.setCrumbs([
			{ title: t('tamatu'), link: '' },
			{ title: t('mySanads'), link: '/tamato/my-documents' },
			{ title: t('sellSanad'), link: '/tamato/trade-document' },
			{ title: t('selectKargozari'), link: '/tamato/select-office-sell' }
		]);
	}, []);
	useEffect(() => {
		props.GetRequestList('Sale');
	}, []);

	let TotalData = props.transformationOffice.data;

	const storedData = JSON.parse(localStorage.getItem('sanadForm') as any);
	const handleRowClick = (index: number) => {
		const selectedDataRow = TotalData[index];
		setSelectedData(selectedDataRow);
	};
	const saveToLocalStorage = () => {
		if (selectedData !== null) {
			let { kargozarNo } = selectedData;
			storedData.kargozarNo = kargozarNo;
			localStorage.setItem('sanadForm', JSON.stringify(storedData));
		}
	};
	useEffect(() => {
		saveToLocalStorage();
	}, [selectedData]);

	const handleRadioChange = (value: string) => {
		setSelectedOption(prevValue => (prevValue === value ? '' : value));
	};

	const handleConfirm = () => {
		if (nationalCodeBuyer && nationalCodeBuyer.length !== 0) {
			const storedData = JSON.parse(localStorage.getItem('sanadForm') || '{}');
			storedData.nationalCodeBuyer = nationalCodeBuyer;
			localStorage.setItem('sanadForm', JSON.stringify(storedData));
		}
	};

	const handleSearch = () => {
		props.getTransformationOffice(searchKargozarNo, searchAdress);
	};

	const PostData = () => {
		props.PostofficeData(storedData);
		localStorage.removeItem('sanadForm');
		setTimeout(() => {
			history('/tamato/trade-document');
		}, 1000);
	};
	const handledelet = () => {
		setSearchKargozarNo('');
		setSearchAdress('');
	};

	// const filter = props.transformationRequest.data &&
	//   props.transformationRequest.data.filter((obj: any) => obj.sanadStatus === 0 || obj.sanadStatus === 1);

	const CreateSubmitHandler = (e: any) => {
		e.preventDefault();
		props.getTransformationOffice(values.address, values.branchCode);
	};

	return (
		<>
			<NapLoading
				loading={
					props.transformationOffice.loading || props.transformationRequest.loading || props.transformationPostOffice.loading
				}
			/>
			<div className='complete-information-panel'>
				<>
					<form onSubmit={CreateSubmitHandler}>
						<div className='searchBarinOfficeList'>
							<div className='searchBarinOfficeList'>
								<div className='col mb-2'>
									<input
										type='text'
										name='address'
										className='form-control'
										placeholder='آدرس'
										value={searchAdress}
										onChange={e => {
											onChangeHandler(e);
										}}
									/>
								</div>
								<div className='col mb-2'>
									<input
										type='text'
										className='form-control'
										name='branchCode'
										value={searchKargozarNo}
										placeholder='کارگزاری'
										onChange={e => onChangeHandler(e)}
									/>
								</div>
							</div>
							<div className='searchBarinOfficeList'>
								<div className='flex'>
									<div className='col'>
										<button type='submit' className='btn bodyOfBuyWay '>
											جستجو
										</button>
									</div>
									<div className='col'>
										<button className='btn bodyOfBuyWay' onClick={handledelet}>
											حذف
										</button>
									</div>
								</div>
							</div>
						</div>
					</form>
					<strong className='text-danger mt-4 row justify-around'>شما می توانید کارگزاری خود را انتخاب کنید</strong>

					<div className='marginforBox'>
						{props.transformationOffice.data.map((row: MapType, index: number) => (
							<CardOffice
								key={index}
								value={row}
								onClick={() => {
									handleRowClick(index);
								}}
							/>
						))}
					</div>

					<div className='row mt-3'>
						<div className='col-md-6'>
							<div className='mx-2'>
								<input
									type='checkbox'
									id='donorRadio'
									value='surrender'
									checked={selectedOption === 'surrender'}
									onChange={() => handleRadioChange('surrender')}
								/>
								<label className='mx-2 mt-2' htmlFor='donorRadio'>
									در صورتی که قصد دارید، اولویت خود را به فرد خاصی انتقال دهید کد ملی را وارد نماید
								</label>
							</div>
						</div>
						{selectedOption === 'surrender' && (
							<div className='flex flex-row mr-2'>
								<div className='mx-2'>
									<input
										type='text'
										value={nationalCodeBuyer}
										placeholder='کد ملی'
										className='form-control mr-2'
										onChange={e => setNationalCodeBuyer(e.target.value)}
									/>
								</div>
								<div className='mr-2'>
									<button className='btn button mx-4 ' onClick={handleConfirm}>
										تایید
									</button>
								</div>
							</div>
						)}
					</div>
					<div className='mt-4'>
						<button className='btn button' onClick={PostData}>
							ثبت
						</button>
					</div>
					<ListRequestShiftSanad />
				</>
			</div>
		</>
	);
};

export default connect(
	(state: IApplicationState) => state.transformation,
	transformationActions
)(TamatoSelectOfficeSellPage as ComponentType);
