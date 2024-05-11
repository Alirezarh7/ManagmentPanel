import React, { useState, useEffect, useRef } from 'react';
import DatePicker from './Jalali/DatePicker/DatePicker';
import NDate from '@nepo/ndate';
import MaskedInput from 'react-text-mask';
import './Style.css';

export interface IDateObject {
	year: number;
	month: number;
	day: number;
	hour: number;
	minute: number;
}
type IProps = {
	required?: boolean;
	setTime?: boolean;
	calendar?: true;
	headerImage?: string;
	placeholder?: string;
	className?: string;
	position?: 'bottom' | 'right';
	name?: string;
	id?: string;
	onChange?: (value: string) => void;
	max?: string;
	min?: string;
	defaultValue?: string;
};
const Calendar: React.FC<IProps> = (props: IProps) => {
	const [inputValue, setInputValue] = useState<string>('');
	const [calendarModal, showCalendar] = useState<boolean>(false);
	const [mainDateSelected, setMainDate] = useState<string>('');
	useEffect(() => {
		if (props.defaultValue) {
			datepickerHandler(new NDate(props.defaultValue));
		}
	}, []);
	const dateHandler = (data: IDateObject) => {
		const newDate = new NDate(`${data.year}-${data.month}-${data.day} ${data.hour}:${data.minute}`);

		if (props.setTime) {
			// setInputValue(newDate.format("YYYY/MM/DD HH:mm"))
			datepickerHandler(newDate);
		} else {
			// setInputValue(newDate.format("YYYY/MM/DD"))
			datepickerHandler(newDate);
		}
		showCalendar(false);
	};

	const onChangeHandler = (event: any) => {
		const e = event.target.value;
		let stripedval = e.replace(/_/g, '');
		if ((!props.setTime && stripedval.length === 10) || (props.setTime && stripedval.length === 16)) {
			const y = event.target.value.substr(0, 4);
			const m = event.target.value.substr(5, 2);
			const d = event.target.value.substr(8, 2);

			let targetDate = new NDate([+y, +m, +d]);
			if (props.min && targetDate.date < new NDate(props.min).date) {
				datepickerHandler(new NDate(props.min));
			} else if (props.max && new NDate(props.max).date < targetDate.date) {
				datepickerHandler(new NDate(props.max));
			} else {
				datepickerHandler(targetDate);
			}
		}
	};

	const datepickerHandler = (value: NDate) => {
		showCalendar(false);
		setInputValue(value.formatJalali('YYYY/MM/DD'));
		setMainDate(value.format('YYYY-MM-DD'));
		if (props.onChange) {
			props.onChange(value.format('YYYY-MM-DD'));
		}
	};

	const createAutoCorrectedDatePipe = (dateFormat: any) => (conformedValue: any) => {
		const indexesOfPipedChars: any[] = [];
		const dateFormatArray = dateFormat.split(/[^dmyHMS]+/);
		const maxValue: any = { dd: 31, mm: 12, yy: 99, yyyy: 9999, HH: 23, MM: 59, SS: 59 };
		const minValue: any = { dd: 1, mm: 1, yy: 0, yyyy: 1, HH: 0, MM: 0, SS: 0 };
		const conformedValueArr = conformedValue.split('');
		dateFormatArray.forEach((format: any) => {
			const position = dateFormat.indexOf(format);
			const maxFirstDigit = parseInt(maxValue[format].toString().substr(0, 1), 10);

			if (parseInt(conformedValueArr[position], 10) > maxFirstDigit) {
				conformedValueArr[position + 1] = conformedValueArr[position];
				conformedValueArr[position] = 0;
				indexesOfPipedChars.push(position);
			}
		});

		const isInvalid = dateFormatArray.some((format: any) => {
			const position = dateFormat.indexOf(format);
			const length = format.length;
			const textValue = conformedValue.substr(position, length).replace(/\D/g, '');
			const value = parseInt(textValue, 10);
			return value > maxValue[format] || (textValue.length === length && value < minValue[format]);
		});

		if (isInvalid) {
			return false;
		}

		return {
			indexesOfPipedChars,
			value: conformedValueArr.join('')
		};
	};
	const autoCorrectedDatePipe = props.setTime
		? createAutoCorrectedDatePipe('yyyy/mm/dd HH:MM')
		: createAutoCorrectedDatePipe('yyyy/mm/dd');
	const theDate = mainDateSelected ? mainDateSelected : props.defaultValue ? props.defaultValue : '';
	return (
		<div className='w-full Main'>
			<>
				{calendarModal && (
					<React.Fragment>
						<div className='datePickerCloser' onClick={() => showCalendar(false)}></div>
						<DatePicker
							position={props.position}
							setTime={props.setTime}
							max={props.max ? new NDate(props.max).date : undefined}
							min={props.min ? new NDate(props.min).date : undefined}
							theDate={theDate ? new Date(theDate) : new Date()}
							headerImage={props.headerImage}
							sendDate={newDate => dateHandler(newDate)}
						/>
					</React.Fragment>
				)}

				<MaskedInput
					className={' ' + props.className}
					id={props.id}
					onClick={() => showCalendar(true)}
					name={props.name}
					value={inputValue}
					keepCharPositions={true}
					guide={true}
					pipe={autoCorrectedDatePipe}
					onChange={onChangeHandler}
					placeholder={props.placeholder}
					required={props.required}
					mask={
						props.setTime
							? [/\d/, /\d/, /\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, ' ', /\d/, /\d/, ':', /\d/, /\d/]
							: [/\d/, /\d/, /\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/]
					}
				/>
			</>
		</div>
	);
};

export default Calendar;
