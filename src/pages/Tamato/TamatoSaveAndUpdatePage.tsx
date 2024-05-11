import { ComponentType, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import { IApplicationState } from '../../store/state';
import { callCompleteInformationActions } from './Actions/CallCompleteInformations/action';
import { ICallCompleteInformationState } from './Actions/CallCompleteInformations/model';
import NapLoading from '../../components/general/NapLoading/NapLoading';
import NapSteper from '../../components/general/NapSteper/NapSteper';
import MainInformation from '../../components/tamato/saveAndUpdate/MainInformation';
import AdditionalInformation from '../../components/tamato/saveAndUpdate/AdditionalInformation';
import UploadFiles from '../../components/tamato/saveAndUpdate/UploadFiles';

type IProps = typeof callCompleteInformationActions & ICallCompleteInformationState;

const TamatoSaveAndUpdatePage = (props: IProps) => {
	const [t] = useTranslation();
	const [currentStep, setCurrentStep] = useState<number>(
		localStorage.getItem('tamatoeStep') ? JSON.parse(localStorage.getItem('tamatoeStep') as any) : 0
	);
	const location = useLocation();

	let steps: any[];
	const moreSanadData = JSON.parse(localStorage.getItem('moreSanadData') as any);
	moreSanadData && moreSanadData.isRequiredFileUpload === true
		? (steps = ['اطلاعات اصلی', 'بارگزاری مدارک', 'اطلاعات تکمیلی'])
		: (steps = ['اطلاعات اصلی', 'اطلاعات تکمیلی']);

	let getContent;
	getContent =
		moreSanadData && moreSanadData.isRequiredFileUpload === true
			? () => {
					switch (currentStep) {
						case 0:
							return <MainInformation onNext={next} />;
						case 1:
							return <UploadFiles onNext={next} onPrev={prev} />;
						case 2:
							return <AdditionalInformation onNext={next} onPrev={prev} />;
					}
				}
			: () => {
					switch (currentStep) {
						case 0:
							return <MainInformation onNext={next} />;
						case 1:
							return <AdditionalInformation onNext={next} onPrev={prev} />;
						/*case 2:
                    return <ConfirmInformation />*/
					}
				};

	useEffect(() => {
		if (!localStorage.getItem('tamatoeStep')) {
			localStorage.setItem('tamatoeStep', '0');
		}
		props.setCrumbs([
			{ title: t('tamatu'), link: '' },
			{ title: t('mySanads'), link: '/tamato/my-documents' },
			{ title: location.state.edit ? 'ویرایش اطلاعات' : t('completeTamatoeInformation'), link: '' }
		]);
	}, []);
	const next = (): any => {
		let getStep = JSON.parse(localStorage.getItem('tamatoeStep') as any);
		if (getStep <= 2) getStep += 1;

		localStorage.setItem('tamatoeStep', JSON.stringify(getStep));
		setCurrentStep(getStep);
	};
	const prev = (): any => {
		let getStep = JSON.parse(localStorage.getItem('tamatoeStep') as any);
		if (getStep > 0) getStep -= 1;

		localStorage.setItem('tamatoeStep', JSON.stringify(getStep));
		setCurrentStep(getStep);
	};

	return (
		<>
			<NapLoading loading={props.provinceList.loading} />
			<div className='flex-fill'>
				<div className='p-4'>
					<div className='bg-white rounded p-3 shadow-sm'>
						<NapSteper steps={steps} content={getContent()} currentStep={currentStep} onNext={next} onPrev={prev} />
					</div>
				</div>
			</div>
		</>
	);
};

export default connect(
	(state: IApplicationState) => state.callCompleteInformation,
	callCompleteInformationActions
)(TamatoSaveAndUpdatePage as ComponentType);
