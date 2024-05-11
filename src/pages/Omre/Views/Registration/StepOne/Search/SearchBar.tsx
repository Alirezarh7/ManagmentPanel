import React, { useEffect, useState } from 'react';
import useFormControl from '../../../../../../components/general/NapFormControl/NapFormControl';
import Select from 'react-select';
import { useTranslation } from 'react-i18next';
import { FlyportDestination, shareData } from '../../../../../../shareData';
import './Search.css';
import Calendar from '../../../../../../components/general/Calendar';

export const SearchBar = (props: any) => {
	// const [dates,setDates] = useState<DateObject|DateObject[]|null>(null);
	const [quantityError, setQuantityError] = useState('');
	const [flyportDestinationError, setFlyportDestinationError] = useState('');

	const [t] = useTranslation();
	const { values, onChangeHandler, GetError, setValue, onFormSubmit } = useFormControl({
		FlightDateFrom: [{ required: true }],
		FlightDateTo: [{ required: true }],
		FlyportDestination: [{ required: true }]
		// Quantity: [{ required: true }],
	});

	const CreateSubmitSearch = (e: any): void => {
		e.preventDefault();
		if (onFormSubmit()) {
			const Quantity = 1;
			props.GetSearchPackage(
				props.passengerGroupId,
				values.FlyportDestination,
				values.FlightDateFrom,
				values.FlightDateTo,
				props.MaximumRows,
				props.StartRowIndex,
				values.KargozarNo,
				values.PriceFrom,
				values.PriceTo,
				values.Office,
				values.Address
			);
		}
	};

	return (
		<form onSubmit={CreateSubmitSearch} className='row p-4'>
			{/* <div className="form-group col-lg-2">
                <Select
                    name='Quantity'
                    isRtl={true}
                    options={Quantity}
                    onChange={(value) => { setValue('Quantity', value?.value) }
                    }
                    placeholder={'تعداد رزرو گروهی'}
                />

                <GetError name="Quantity" />
            </div> */}
			<div className='form-group col-lg-2'>
				<Select
					name='FlyportDestination'
					isRtl={true}
					options={FlyportDestination}
					onChange={value => {
						setValue('FlyportDestination', value?.value);
					}}
					placeholder={'پرواز'}
				/>

				<GetError name='FlyportDestination' />
			</div>

			<div className='form-group col-lg-2'>
				<Calendar
					name='FlightDateFrom'
					placeholder='از تاریخ'
					className='form-control'
					onChange={value => {
						setValue('FlightDateFrom', value);
					}}
				/>
				<GetError name='FlightDateFrom' />
			</div>
			<div className='form-group col-lg-2'>
				<Calendar
					name='FlightDateTo'
					className='form-control'
					placeholder='تا تاریخ'
					onChange={value => {
						setValue('FlightDateTo', value);
					}}
				/>
				<GetError name='FlightDateTo' />
			</div>

			<div className='form-group col-lg-2'>
				<input
					className='form-control form-control-sm'
					type='text'
					name='PriceFrom'
					onChange={e => {
						onChangeHandler(e);
					}}
					placeholder={'قیمت از'}
				/>
				<GetError name='PriceFrom' />
			</div>
			<div className='form-group col-lg-2'>
				<input
					className='form-control form-control-sm'
					type='text'
					name='PriceTo'
					onChange={e => {
						onChangeHandler(e);
					}}
					placeholder={'قیمت تا'}
				/>
				<GetError name='PriceTo' />
			</div>
			<div className='form-group col-lg-2'>
				<input
					className='form-control form-control-sm'
					type='text'
					name='Office'
					onChange={e => {
						onChangeHandler(e);
					}}
					placeholder={'دفتر زیارتی'}
				/>
			</div>
			<div className='form-group col-lg-2'>
				<input
					className='form-control form-control-sm'
					type='text'
					name='KargozarNo'
					onChange={e => {
						onChangeHandler(e);
					}}
					placeholder={'شماره کارگزاری'}
				/>
			</div>
			<div className='form-group col-lg-4'>
				<input
					className='form-control form-control-sm'
					type='text'
					name='Address'
					onChange={e => {
						onChangeHandler(e);
					}}
					placeholder={'آدرس'}
				/>
			</div>

			<div className='text-left mt-3 w-full'>
				<button type='submit' className='chose__karvan__btn' onChange={CreateSubmitSearch}>
					جستجو کاروان
				</button>
			</div>
		</form>
	);
};

export default SearchBar;
