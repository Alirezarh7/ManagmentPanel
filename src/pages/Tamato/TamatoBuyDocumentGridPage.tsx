import { ComponentType, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { IApplicationState } from '../../store/state';
import { transformationActions } from './Actions/Transformation/action';
import { ITransformationState } from './Actions/Transformation/model';
import Calendar from '../../components/general/Calendar';
import useFormControl from '../../components/general/NapFormControl/NapFormControl';
import CardBuy from '../../components/tamato/buyDocumentGrid/Buy/CardBuy';
import ListRequest from '../../components/tamato/buyDocumentGrid/Buy/ListRequest';
import TamatoSelectOfficeByPage from './TamatoSelectOfficeByPage';
import '../../components/tamato/buyDocumentGrid/callCompleteTransformation.css';
import '../../components/tamato/buyDocumentGrid/Buy.css';

type MapType = {
	shiftSanadID: string;
	address: string;
	cityName: string;
	sellerMobile: string;
	kargozarNo: any;
	olaviateDate: string;
};
type IProps = typeof transformationActions & ITransformationState;
const TamatoBuyDocumentGridPage = (props: IProps) => {
	const history = useNavigate();

	const [Submit, setSubmit] = useState<boolean>(true);
	const [branchCode, setBranchCode] = useState<string>('');
	const [sanadNo, setSanadNo] = useState<string>('');
	const [fromDate, setFromDate] = useState('');
	const [toDate, setToDate] = useState('');
	const [selectedRow, setSelectedRow] = useState(null);
	const [selectedData, setSelectedData] = useState<MapType>();

	const [showOfficeforBuy, setShowOfficeforBuy] = useState(false);

	const { values, onChangeHandler, setValue } = useFormControl({
		fromDate: [{ required: false }],
		toDate: [{ required: false }]
	});

	useEffect(() => {
		props.GetSanadForSale();
	}, []);

	useEffect(() => {
		props.GetRequestList('Buy');
	}, []);

	const handleRowClick = (index: any) => {
		setSelectedRow(index);
		const selectedDataRow = props.transformationSallSanad.data[index];
		setSelectedData(selectedDataRow);

		const { sellerMobile, shiftSanadID, kargozarNo } = selectedDataRow;
		const existingData = localStorage.getItem('transformationInformation');
		let newData;

		if (existingData) {
			const parsedData = JSON.parse(existingData);
			newData = {
				...parsedData,
				kargozarNo,
				shiftSanadID,
				sellerMobile
			};
		}

		localStorage.setItem('transformationInformation', JSON.stringify(newData));
	};

	const handleDelet = () => {
		setToDate('');
		setFromDate('');
		setBranchCode('');
		setSanadNo('');
		window.location.reload();
	};

	const PostData = () => {
		const transformationInformationString = JSON.parse(localStorage.getItem('transformationInformation') as any);
		history('/tamato/trade-document');
		props.CreateRequestReceivedSalesSanad(transformationInformationString);
	};

	const CreateSubmitHandler = (e: any) => {
		e.preventDefault();

		if ((values.fromDate && !values.toDate) || (!values.fromDate && values.toDate)) {
			return props.pushAlert({
				description: 'مقدار تا تاریخ را وارد نماید',
				title: 'خطا در داده های ورودی',
				variant: 'warning'
			});
		} else {
			props.GetSanadForSale(values.fromDate, values.toDate, values.sandNo, values.branchCode);
		}
	};

	return (
		<div className='w-full max-w-screen-xl mx-auto mt-4'>
			{showOfficeforBuy ? (
				<TamatoSelectOfficeByPage />
			) : (
				<>
					<form onSubmit={CreateSubmitHandler} className='flex flex-col md:flex-row gap-4 '>
						<div className='flex-1 grid grid-cols-1 md:grid-cols-4  items-center gap-4'>
							<input
								type='text'
								name='branchCode'
								placeholder='کدشعبه'
								onChange={e => {
									onChangeHandler(e);
								}}
							/>
							<input
								type='text'
								placeholder='شماره سند'
								name='sandNo'
								onChange={e => {
									onChangeHandler(e);
								}}
							/>
							<Calendar
								name='fromDate'
								placeholder='از تاریخ'
								onChange={value => {
									setValue('fromDate', value);
								}}
							/>
							<Calendar
								name='toDate'
								placeholder='تا تاریخ'
								onChange={value => {
									setValue('toDate', value);
								}}
							/>
						</div>
						<div className='max-md:w-full  flex max-md:justify-evenly items-center gap-4 '>
							<button type='submit' className='btn bodyOfBuyWay '>
								جستجو
							</button>
							<button className='btn bodyOfBuyWay' onClick={handleDelet}>
								حذف
							</button>
						</div>
					</form>

					<div className='mt-4'>
						{props.transformationSallSanad.data.map((row: MapType, index: number) => (
							<CardBuy
								key={index}
								value={row}
								onClick={() => {
									handleRowClick(index);
								}}
							/>
						))}
					</div>
					<div className='mt-2'>
						<div className={'requirements-btns-group'}>
							{selectedData ? (
								<>
									{selectedData.kargozarNo ? (
										<button className={`requirements-link bodyOfBuyWay`} onClick={PostData}>
											ثبت
										</button>
									) : (
										<button className={`requirements-link bodyOfBuyWay`} onClick={() => setShowOfficeforBuy(true)}>
											ادامه
										</button>
									)}
								</>
							) : null}
						</div>
					</div>
				</>
			)}
			{props.transformationRequest.data.length < 0 ? <ListRequest /> : ''}
		</div>
	);
};

export default connect(
	(state: IApplicationState) => state.transformation,
	transformationActions
)(TamatoBuyDocumentGridPage as ComponentType);
