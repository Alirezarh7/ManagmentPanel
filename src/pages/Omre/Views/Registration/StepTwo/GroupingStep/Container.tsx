import React, { ComponentType, useEffect, useState } from 'react';
import { IApplicationState } from '../../../../../../store/state';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import NapSteper from './../../../../../../components/general/NapSteper/NapSteper';
import { registrationActions } from '../../../../Actions/Registration/action';
import { IRegistrationState } from '../../../../Actions/Registration/model';
import StepTwoPage from '../StepTwoPage';
import { useLocation } from 'react-router-dom';
import CheckInformation from './CheckInformation';
import StepOnePage from '../../StepOne/StepOnePage';
import useTitle from '../../../../../../hooks/useTitle';
type IProps = typeof registrationActions & IRegistrationState;

const OmreStep = (props: IProps) => {
	const [t] = useTranslation();
	const location = useLocation();
	useTitle('mainSettings', 'groupSelect');
	const [currentStep, setCurrentStep] = useState(0);
	const next = (): any => {
		if (currentStep <= 2) setCurrentStep(currentStep + 1);
	};
	const prev = (): any => {
		if (currentStep > 0) setCurrentStep(currentStep - 1);
	};

	let steps: any[] = ['گروه بندی', 'تایید نهایی ', 'جستجو کاروان'];
	let getContent = () => {
		switch (currentStep) {
			case 0:
				return <StepTwoPage onNext={next} />;
			case 1:
				return <CheckInformation onPrev={prev} onNext={next} />;
			case 2:
				return <StepOnePage onPrev={prev} onNext={next} />;
		}
	};

	const groupStateCode = props.omreSanad.data;
	const dataList: any = [];
	if (Array.isArray(groupStateCode)) {
		groupStateCode.forEach(Code => {
			dataList.push(Code.groupStateCode);
		});
	}

	const steptwo = dataList[0];

	useEffect(() => {
		props.setCrumbs([
			{ title: t('discounts'), link: '' },
			{ title: t('OmreSanad'), link: '/OmreMofrade/myDocuments' },
			{ title: t('groupSelect'), link: '' }
		]);
		if (steptwo === 'Confirmed') {
			setCurrentStep(1);
		}
	}, [steptwo]);

	return (
		<React.Fragment>
			<div className='flex-fill'>
				<div className='p-4'>
					<div className='bg-white rounded p-3 shadow-sm'>
						<NapSteper steps={steps} content={getContent()} currentStep={currentStep} onNext={next} onPrev={prev} />
					</div>
				</div>
			</div>
		</React.Fragment>
	);
};

export default connect((state: IApplicationState) => state.registration, registrationActions)(OmreStep as ComponentType<any>);
