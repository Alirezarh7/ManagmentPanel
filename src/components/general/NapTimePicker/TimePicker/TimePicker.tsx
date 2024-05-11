import React, { useState, useEffect } from 'react';
import HoursModal from './hourModal';
import MinutesModal from './minuteModal';
import SecondsModal from './secondModal';
import DigitalHourModal from './digitalHourModal';
import DigitalMinuteModal from './digitalMinuteModal';
import DigitalSecondModal from './digitalSecondModal';

export interface ITimeObject {
	hour: number;
	minute: number;
	second: number;
}
type IProps = {
	value: ITimeObject;
	max?: ITimeObject;
	min?: ITimeObject;
	withSecond?: boolean;
	setTimeFormat: (newTimeFormat: 'am' | 'pm') => void;
	sendTime: (newTime: ITimeObject) => void;
	position?: 'bottom' | 'right';
	clockType: 'analog' | 'digital' | 'duration';
	timeFormat: 'am' | 'pm';
};

const TimePickerPage: React.FC<IProps> = (props: IProps) => {
	const [mainTime, setTime] = useState<ITimeObject>(props.value);
	const [hourShow, setHourShow] = useState<boolean>(true);
	const [minuteShow, setMinuteShow] = useState<boolean>(false);
	const [secondShow, setSecondShow] = useState<boolean>(false);

	const [hourDigitalShow, setHourDigitalShow] = useState<boolean>(false);
	const [minuteDigitalShow, setMinuteDigitalShow] = useState<boolean>(false);
	const [secondDigitalShow, setSecondDigitalShow] = useState<boolean>(false);

	const [modalsOpacity, setOpacity] = useState<number>(1);
	const hours = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
	const secoundHours = [13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 0];
	const minutes = (): number[] => {
		let minutes: number[] = [];
		for (let m = 1; m < 60; m++) {
			minutes.push(m);
		}
		minutes.push(0);
		return minutes;
	};
	const minutes1 = (): number[] => {
		let minutes: number[] = [];
		for (let m = 0; m < 60; m++) {
			minutes.push(m);
		}
		return minutes;
	};
	useEffect(() => {
		setTime(props.value);
	}, []);
	const resetModals = () => {
		setOpacity(0);
		setHourShow(false);
		setMinuteShow(false);
		setSecondShow(false);
		setHourDigitalShow(false);
		setMinuteDigitalShow(false);
		setSecondDigitalShow(false);
	};
	const changeView = () => {
		setTimeout(() => {
			setOpacity(1);
		}, 100);
	};
	const theHourSelected = (h: number) => {
		if (props.min && props.min.hour > h) h = props.min.hour;
		if (props.max && props.max.hour < h) h = props.max.hour;
		setTime({ hour: h, minute: mainTime.minute, second: mainTime.second });
		resetModals();
		setMinuteShow(true);
		changeView();
	};
	const theMinuteSelected = (m: number) => {
		if (props.min && props.min.hour == mainTime.hour && props.min.minute > m) m = props.min.minute;
		if (props.max && props.max.hour == mainTime.hour && props.max.minute < m) m = props.max.minute;
		setTime({ hour: mainTime.hour, minute: m, second: mainTime.second });
		resetModals();
		if (props.clockType == 'analog' && !props.withSecond) {
			setHourShow(true);
			props.sendTime({ hour: mainTime.hour, minute: m, second: 0 });
		} else setSecondShow(true);
		changeView();
	};
	const theSecondSelected = (s: number) => {
		if (props.min && props.min.hour == mainTime.hour && props.min.minute == mainTime.minute && props.min.second > s)
			s = props.min.second;
		if (props.max && props.max.hour == mainTime.hour && props.max.minute == mainTime.minute && props.max.second < s)
			s = props.max.second;
		setTime({ hour: mainTime.hour, minute: mainTime.minute, second: s });
		resetModals();
		changeView();
		if (props.clockType == 'analog') props.sendTime({ hour: mainTime.hour, minute: mainTime.minute, second: s });
	};
	return (
		<div className='napTimePicker' style={props.position === 'bottom' ? { bottom: '100%' } : { top: '100%' }}>
			<div className='timePickerHeader'>
				<span>زمان را انتخاب کنید</span>
			</div>
			{props.clockType == 'analog' ? (
				hourShow || minuteShow || secondShow ? (
					<div style={{ position: 'relative' }}>
						{hourShow && (
							<HoursModal
								hour={mainTime.hour}
								opacity={modalsOpacity}
								showHour={hourShow}
								hours={hours}
								secoundHours={secoundHours}
								timeFormat={props.timeFormat}
								setTimeFormat={props.setTimeFormat}
								hourSelected={hour => theHourSelected(hour)}
							/>
						)}
						{minuteShow && (
							<MinutesModal
								minute={mainTime.minute}
								opacity={modalsOpacity}
								minutes={minutes()}
								minuteSelected={min => theMinuteSelected(min)}
							/>
						)}
						{secondShow && (
							<SecondsModal
								second={mainTime.second}
								opacity={modalsOpacity}
								seconds={minutes()}
								secondSelected={sec => theSecondSelected(sec)}
							/>
						)}
					</div>
				) : null
			) : (
				<React.Fragment>
					{!hourDigitalShow && !minuteDigitalShow && !secondDigitalShow ? (
						<div className='digitalClockModal py-3' style={{ opacity: modalsOpacity }}>
							<div className='flex justify-center pl-3 pr-4' style={{ width: '100%', direction: 'ltr' }}>
								<div className='digitalTimeNumber col-2' onClick={() => setHourDigitalShow(true)}>
									{mainTime.hour > 9 ? mainTime.hour : ('0' + mainTime.hour).substr(0, 2)}
								</div>
								<div className='col-1'>
									<span style={{ fontSize: 'x-large' }}>:</span>
								</div>
								<div className='digitalTimeNumber col-2' onClick={() => setMinuteDigitalShow(true)}>
									{mainTime.minute > 9 ? mainTime.minute : ('0' + mainTime.minute).substr(0, 2)}
								</div>
								{props.withSecond && (
									<React.Fragment>
										<div className='col-1'>
											<span style={{ fontSize: 'x-large' }}>:</span>
										</div>
										<div className='digitalTimeNumber col-2' onClick={() => setSecondDigitalShow(true)}>
											{mainTime.second > 9 ? mainTime.second : ('0' + mainTime.second).substr(0, 2)}
										</div>
									</React.Fragment>
								)}
								{props.clockType != 'duration' && (
									<div className='digitalTimeAMPM ml-2 col-2' style={{ fontSize: 'inherit', paddingTop: '10px' }}>
										{props.timeFormat.toUpperCase()}
									</div>
								)}
							</div>
							<div className='mx-3 mt-3' style={{ width: '100%' }}>
								<button
									className='btn btn-sm btn-success'
									style={{ width: '100%' }}
									onClick={() => props.sendTime({ hour: mainTime.hour, minute: mainTime.minute, second: mainTime.second })}>
									<span className='mdi mdi-18px mdi-check-all' />
								</button>
							</div>
						</div>
					) : (
						''
					)}
					{hourDigitalShow && (
						<DigitalHourModal
							hours={props.timeFormat == 'am' ? hours : secoundHours}
							opacity={modalsOpacity}
							timeFormat={props.timeFormat}
							setTimeFormat={props.setTimeFormat}
							hourSelected={hour => theHourSelected(hour)}
						/>
					)}
					{minuteDigitalShow && (
						<DigitalMinuteModal
							minutes={minutes1()}
							opacity={modalsOpacity}
							minuteSelected={minute => theMinuteSelected(minute)}
						/>
					)}
					{secondDigitalShow && (
						<DigitalSecondModal
							seconds={minutes1()}
							opacity={modalsOpacity}
							secondSelected={second => theSecondSelected(second)}
						/>
					)}
				</React.Fragment>
			)}
		</div>
	);
};

export default TimePickerPage;
