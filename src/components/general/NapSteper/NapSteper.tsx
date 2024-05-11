import React from 'react';
import { useTranslation } from 'react-i18next';
import './NapSteper.css';

export interface IProps {
	steps: string[];
	content: any;
	currentStep: number;
	onNext: () => void;
	onPrev: () => void;
}

const NapSteper = (props: IProps) => {
	const [t] = useTranslation();
	return (
		<React.Fragment>
			<div className='row justify-around mx-md-5 mb-2 border-bottom' style={{}}>
				{props.steps.map((step: string, index: number) => {
					return (
						<React.Fragment>
							<div>
								<div className='stepColumnNumber mb-1'>
									<div
										className={
											props.currentStep >= index
												? props.currentStep == index
													? 'prevNumberCircle current'
													: 'prevNumberCircle'
												: 'nextNumberCircle'
										}>
										{props.currentStep > index ? <span className='mdi mdi-18px mdi-check-all' /> : index + 1}
									</div>
								</div>
								<span style={{ fontSize: '12px' }}>{t(step)}</span>
							</div>
							{index < props.steps.length - 1 ? (
								<svg height='2' className='mt-3 svg-line'>
									<line
										x1='0'
										y1='0'
										x2='2000'
										y2='0'
										style={{ stroke: props.currentStep > index ? '#4f96ff' : '#e0e0e0', strokeWidth: '5' }}
									/>
								</svg>
							) : (
								''
							)}
						</React.Fragment>
					);
				})}
			</div>
			{props.content}
			{/* <button className="btn btn-sm btn-secondary" disabled={props.currentStep >= props.steps.length - 1} onClick={() => props.onNext()}>بعدی</button>
            <button className="btn btn-sm btn-secondary" disabled={props.currentStep <= 0} onClick={() => props.onPrev()}>قبلی</button> */}
		</React.Fragment>
	);
};

export default NapSteper;
