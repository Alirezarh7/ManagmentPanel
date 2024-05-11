import React, { ComponentType, useEffect, useState } from 'react';
import SearchBar from './Search/SearchBar';
import OmreCardData from './Card/Cardkarevan';
import { IRegistrationState } from '../../../Actions/Registration/model';
import { registrationActions } from '../../../Actions/Registration/action';
import { IApplicationState } from '../../../../../store/state';
import { connect } from 'react-redux';
import './StepOnePage.css';
import Modall from './Modal/Modal';
import { useNavigate } from 'react-router-dom';
import NapAlerts from '../../../../../components/general/NapAlerts/NapAlerts';
import NapLoading from '../../../../../components/general/NapLoading/NapLoading';
import DataSummary from '../../../../../components/general/DataSummary';
import { shareData } from '../../../../../shareData';
// import InfiniteLoading from 'react-infinite-scroll-component'
import InfiniteScroll from 'react-infinite-scroll-component';

type MapType = {
	karGroupID: number;
	branchCode: number;
	sanadStatus: number;
	address: string;
	officeName: string;
	kargozarNo: string;
	flightDate: string;
	cap: any;
	cost: any;
	flyPortName: any;
};

type IProps = typeof registrationActions &
	IRegistrationState & {
		onNext: () => void;
		onPrev: () => void;
	};
const StepOnePage = (props: IProps) => {
	const [selectedRow, setSelectedRow] = useState(null);
	const [selectedData, setSelectedData] = useState<MapType>();
	const [showModall, setShowModall] = useState<boolean>(false);
	const [modalData, setModalData] = useState<any>({});
	const [karGroupID, setKarGroupID] = useState<any>();
	const [provinceId, setProvinceId] = useState<any>();
	const [startRowIndex, setStartRowIndex] = useState<any>(1);
	const [maximumRows, setMaximumRows] = useState<any>(5);
	const Quantity = sessionStorage.getItem('Quantity');
	const history = useNavigate();

	useEffect(() => {
		return () => {
			props.clearPersonInfo();
		};
	}, []);

	const handleRowClick = (index: any) => {
		setSelectedRow(index);
		const selectedDataRow = props.personInfo.data[index];
		setSelectedData(selectedDataRow);
		const karGroupid = props.personInfo.data[index].karGroupID;
		const provinceId = props.personInfo.data[index].provinceId;
		setProvinceId(provinceId);
		setKarGroupID(karGroupid);
		const kargozarNo = props.personInfo.data[index].kargozarNo;
		const officeName = props.personInfo.data[index].officeName;
		const flightDate = props.personInfo.data[index].flightDate;

		const nationalCode = sessionStorage.getItem('nationalCode');
		const dataTosend: any = {
			karGroupID,
			Quantity,
			nationalCode
		};
		const dataShow: any = {
			kargozarNo,
			officeName,
			flightDate
		};
		setModalData(dataShow);

		setShowModall(true);
	};

	const handelSetShowModal = () => {
		setShowModall(false);
	};
	const getDataforAvction = () => {
		registrationActions.pushCommonAlert('201');

		const storedData: any = JSON.parse(localStorage.getItem(shareData.CONSTANT.GOV_STORAGE_KEY) as any);
		const nationalCode = storedData.profile.nationalCode;
		const finalData = {
			nationalCode,
			kargroupId: karGroupID,
			passengerGroupId: props.passengerGroup.data.passengerGroupId
		};

		props.getBeginReserve(finalData, history, handelSetShowModal);
	};

	const fetchData = () => {
		setStartRowIndex(startRowIndex + 1);
	};

	return (
		<>
			<NapLoading
				loading={
					props.personInfo.loading ||
					props.isChechPromise.loading ||
					props.cancelUserRegistration.loading ||
					props.beginReserve.loading
				}
			/>
			<NapAlerts alerts={props.alerts} clearAlerts={() => props.clearAlerts()} />
			{showModall ? <Modall oncancel={handelSetShowModal} onClick={getDataforAvction} show={true} value={modalData} /> : ''}
			<div className='flex flex-column cardDataInfo '>
				<DataSummary legendTitle={'جستجو کارگزاری'}>
					<SearchBar
						GetSearchPackage={props.GetSearchPackage}
						passengerGroupId={props.passengerGroup.data.passengerGroupId}
						StartRowIndex={startRowIndex}
						MaximumRows={maximumRows}
					/>
				</DataSummary>
				<div className='mt-4 m-auto omre__card__wrapper'>
					{props.personInfo.data &&
						props.personInfo.data.length > 0 &&
						props.personInfo.data.map((row: MapType, index: number) => (
							<InfiniteScroll
								dataLength={index}
								next={fetchData}
								hasMore={true}
								loader
								endMessage={<p>.تمامی داده ها نمایش داده شدند</p>}
								children={
									<OmreCardData
										value={row}
										onClick={() => {
											handleRowClick(index);
										}}
									/>
								}
							/>
						))}
				</div>
			</div>
			<button
				className=' btn buttonBuyRequestGroup'
				onClick={() => {
					props.onPrev();
				}}>
				بازگشت
			</button>
		</>
	);
};

export default connect((state: IApplicationState) => state.registration, registrationActions)(StepOnePage as ComponentType<any>);
