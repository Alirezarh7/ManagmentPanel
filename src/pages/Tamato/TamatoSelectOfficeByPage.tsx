import { ComponentType, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { IApplicationState } from '../../store/state';
import { transformationActions } from './Actions/Transformation/action';
import { ITransformationState } from './Actions/Transformation/model';
import ListRequest from '../../components/tamato/documentTrade/buy/ListRequest';
import useFormControl from '../../components/general/NapFormControl/NapFormControl';
import CardOffice from '../../components/tamato/selectOfficeBy/Sell/CardOffice';
import '../../components/tamato/selectOfficeBy/Office.css';
import '../../components/tamato/selectOfficeBy/callCompleteTransformation.css';

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
	nationalCodeBuyerFollow: string;
	provinceId: number;
};

type IProps = typeof transformationActions & ITransformationState;

const TamatoSelectOfficeByPage = (props: IProps) => {
	const history = useNavigate();

	const [searchAdress, setSearchAdress] = useState<string>('');
	const [searchKargozarNo, setSearchKargozarNo] = useState<string>('');
	const [selectedData, setSelectedData] = useState<DataType | null>(null);

	const { values, onFormSubmit, onChangeHandler, GetError, setValue, GetRequired } = useFormControl({});

	useEffect(() => {
		props.getTransformationOffice();
	}, []);

	useEffect(() => {
		props.GetRequestList('Buy');
	}, []);

	let TotalData = props.transformationOffice.data;
	const storedData = JSON.parse(localStorage.getItem('transformationInformation') as any);

	const handleRowClick = (index: number) => {
		const selectedDataRow = TotalData[index];
		setSelectedData(selectedDataRow);
	};

	const saveToLocalStorage = () => {
		if (selectedData !== null) {
			let { kargozarNo } = selectedData;
			storedData.kargozarNo = Number(kargozarNo);
			localStorage.setItem('transformationInformation', JSON.stringify(storedData));
		}
	};
	useEffect(() => {
		saveToLocalStorage();
	}, [selectedData]);

	const handledelet = () => {
		setSearchKargozarNo('');
		setSearchAdress('');
	};

	const PostData = () => {
		const data = localStorage.getItem('transformationInformation') as any;
		const finalData = JSON.parse(data);
		props.PostCreateRequestReceivedSalesSanad(finalData);
		setTimeout(() => {
			history('/tamato/trade-document');
		}, 1000);
	};

	const CreateSubmitHandler = (e: any) => {
		e.preventDefault();
		props.getTransformationOffice(values.address, values.branchCode);
	};

	return (
		<>
			<div className='complete-information-panel'>
				<form onSubmit={CreateSubmitHandler}>
					<div className='searchBarinOfficeList'>
						<div className='searchBarinOfficeList'>
							<div className='col mb-2'>
								<input
									type='text'
									name='address'
									className='form-control'
									placeholder='آدرس'
									// value={searchKargozarNo}
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
				<div>
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
				{selectedData !== null ? (
					<div className='mt-4'>
						<button className='btn buttonOffice' onClick={PostData}>
							ثبت
						</button>
					</div>
				) : (
					''
				)}
				{props.transformationRequest.data.length > 0 ? <ListRequest /> : ''}
			</div>
		</>
	);
};

export default connect(
	(state: IApplicationState) => state.transformation,
	transformationActions
)(TamatoSelectOfficeByPage as ComponentType);
