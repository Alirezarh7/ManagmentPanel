import React from 'react';

type IProps = {
	hours: number[];
	opacity: number;
	timeFormat: 'am' | 'pm';
	setTimeFormat: (val: 'am' | 'pm') => void;
	hourSelected: (val: number) => void;
};
const DigitalHourModal = (props: IProps) => {
	return (
		<React.Fragment>
			<div className='row justify-center mt-2'>
				<div
					className={'digitalAm col' + (props.timeFormat == 'am' ? ' active' : '')}
					style={{ padding: 0 }}
					onClick={() => props.setTimeFormat('am')}>
					<span className='p-1'>AM</span>
				</div>
				<div
					className={'digitalPm col' + (props.timeFormat == 'pm' ? ' active' : '')}
					style={{ padding: 0 }}
					onClick={() => props.setTimeFormat('pm')}>
					<span className='p-1'>PM</span>
				</div>
			</div>
			<div className='digitalHourModal' style={{ opacity: props.opacity }}>
				{props.hours.map((hour, i) => {
					return (
						<div key={i} className='hourName' onClick={() => props.hourSelected(hour)}>
							<span>{hour}</span>
						</div>
					);
				})}
			</div>
		</React.Fragment>
	);
};

export default DigitalHourModal;
