import React from 'react';

type IProps = {
	hour: number;
	opacity: number;
	showHour: boolean;
	hours: number[];
	secoundHours: number[];
	timeFormat: 'am' | 'pm';
	hourSelected: (val: number) => void;
	setTimeFormat: (val: 'am' | 'pm') => void;
};
const HoursModal = (props: IProps) => {
	const { hour, opacity, showHour, hours, secoundHours, timeFormat, hourSelected } = props;
	return (
		<div className='hourModal clock' style={{ opacity: opacity }}>
			<div className='hourHandleBase' style={{ transform: `rotate(${180 + hour * 30}deg)` }}>
				<div className='hourHandle'>
					{' '}
					<div className='hourHandHead'>&nbsp;</div>{' '}
				</div>
			</div>
			{showHour
				? timeFormat === 'am'
					? hours.map((hour, i) => {
							return (
								<div key={'h' + hour} className='hours' style={{ transform: `rotateZ(calc(30deg * ${i + 1}))` }}>
									<span style={{ transform: `rotateZ(calc(-30deg * ${i + 1}))` }} onClick={() => hourSelected(hour)}>
										{hour}
									</span>
								</div>
							);
						})
					: secoundHours.map((hour, i) => {
							return (
								<div key={'h2' + hour} className='hours' style={{ transform: `rotateZ(calc(30deg * ${i + 1}))` }}>
									<span style={{ transform: `rotateZ(calc(-30deg * ${i + 1}))` }} onClick={() => hourSelected(hour)}>
										{' '}
										{hour}{' '}
									</span>
								</div>
							);
						})
				: null}
			<div className='row AmPm justify-center'>
				<div
					className={'analogAm col' + (timeFormat == 'am' ? ' active' : '')}
					style={{ padding: 0 }}
					onClick={() => props.setTimeFormat('am')}>
					<span className='p-1'>AM</span>
				</div>
				<div
					className={'analogPm col' + (timeFormat == 'pm' ? ' active' : '')}
					style={{ padding: 0 }}
					onClick={() => props.setTimeFormat('pm')}>
					<span className='p-1'>PM</span>
				</div>
			</div>
		</div>
	);
};

export default HoursModal;
