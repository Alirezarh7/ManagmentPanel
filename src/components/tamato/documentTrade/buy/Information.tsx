import React, { ComponentType, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import '../callCompleteTransformation.css';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { transformationActions } from '../../../../pages/Tamato/Actions/Transformation/action';
import { ITransformationState } from '../../../../pages/Tamato/Actions/Transformation/model';
import { IApplicationState } from '../../../../store/state';
import ListRequest from './ListRequest';
import './Buy.css';
import { callCompleteInformationActions } from '../../../../pages/Tamato/Actions/CallCompleteInformations/action';
import { shareData } from '../../../../shareData';
import useFormControl from '../../../general/NapFormControl/NapFormControl';

type DataType = {
	birthPlace: string | number | undefined;
	marriageStatus: any;
	tellNumber: string | number | undefined;
	religionId: number;
	nationalCode: string | number | undefined;
	provinceId: number | undefined;
	birthPlac: string | number | undefined;
};
type IProps = typeof transformationActions & ITransformationState & typeof callCompleteInformationActions;
const TransformationInformation = (props: IProps) => {
	const [t] = useTranslation();
	const history = useNavigate();
	/*    const [birthPlace, setBirthPlace] = useState<any>("");
        const [mariagesStatus, setMariagesStatus] = useState<any>();
        const [religionId, setReligionId] = useState<any>()
        const [tellNumber, setTellNumber] = useState<string>();
        const [allFieldsFilled, setAllFieldsFilled] = useState<boolean>(false);*/

	const { values, onChangeHandler, onFormSubmit, resetForm, GetRequired, setValue, setValues, GetError } = useFormControl({
		birthPlace: [{ required: true }],
		mariagesStatus: [{ required: true }],
		religionId: [{ required: true }],
		tellNumber: [{ required: true, maxLength: 12 }]
	});

	const transformationInformation =
		localStorage.getItem('transformationInformation') && JSON.parse(localStorage.getItem('transformationInformation') as string);

	const oidcUserString: any = localStorage.getItem(shareData.CONSTANT.GOV_STORAGE_KEY)
		? localStorage.getItem(shareData.CONSTANT.GOV_STORAGE_KEY)
		: localStorage.getItem(shareData.CONSTANT.ORGANIZATION_STORAGE_KEY);

	const oidcUser = JSON.parse(oidcUserString);
	const nationalCode = oidcUser.profile?.nationalCode;
	const provinceID = oidcUser.profile?.provinceId;

	/*    useEffect(() => {
            const checkAllFieldsFilled = () => {
                setAllFieldsFilled(
                    birthPlace !== '' &&
                    mariagesStatus !== undefined &&
                    tellNumber !== '' &&
                    religionId !== undefined
                );
            };


            checkAllFieldsFilled();
        }, [birthPlace, mariagesStatus, tellNumber, religionId]);*/

	useEffect(() => {
		props.GetProfilePersonShiftSanad();
	}, []);

	useEffect(() => {
		props.GetRequestList('Buy');
	}, []);
	useEffect(() => {
		props.GetCityProfile(provinceID);
	}, []);
	const citiesData = props.getCityProfile.data;

	const handleSaveToLocalStorage = () => {
		if (onFormSubmit()) {
			const dataToSave: any = {
				birthPlace: values.birthPlace,
				mariagesStatus: values.mariagesStatus,
				tellNumber: values.tellNumber,
				religionId: Number(values.religionId),
				nationalCode,
				provinceID
			};

			localStorage.setItem('transformationInformation', JSON.stringify(dataToSave) as any);

			history('/tamato/buy-document-grid');
		}
	};

	const filter =
		props.transformationRequest.data &&
		props.transformationRequest.data.filter((obj: any) => obj.sanadStatus === 0 || obj.sanadStatus === 1);

	useEffect(() => {
		if (localStorage.getItem('transformationInformation')) {
			const transformationInformation = JSON.parse(localStorage.getItem('transformationInformation') as string);
			setValues([
				{ birthPlace: transformationInformation.birthPlace },
				{ mariagesStatus: transformationInformation.mariagesStatus },
				{ tellNumber: transformationInformation.tellNumber },
				{ religionId: transformationInformation.religionId }
			]);
		}
	}, []);

	return (
		<>
			<div className='w-full max-w-screen-xl m-auto'>
				{filter.length > 0 ? (
					<div>
						<ListRequest />
					</div>
				) : (
					<div>
						<div className='mb-4 flex justify-center'>
							<strong className='text-danger'>لطفا اطلاعات ضروری زیر را جهت ادامه فرایند کامل بفرمایید</strong>
						</div>
						<div className='row'>
							{/* Row 1 */}
							<div className='col-12 col-md-6 mb-4'>
								<div className='flex flex-col'>
									<div className='mb-1'>
										محل تولد<span className='required-star text-danger mx-1'>*</span>
									</div>
									<select
										className='form-control'
										name='birthPlace'
										value={values && values.birthPlace}
										onChange={e => setValue('birthPlace', e.target.value)}>
										<option>انتخاب کنید</option>
										{Array.isArray(citiesData) &&
											citiesData.map((city: any, index: any) => (
												<option key={index} value={city.label}>
													{city.label}
												</option>
											))}
									</select>
								</div>
								<GetError name='birthPlace' />
							</div>
							{/* Row 2 */}
							<div className='col-12 col-md-6 mb-4'>
								<div className='flex flex-col '>
									<div className='mb-1'>
										وضعیت تاهل<span className='required-star text-danger mx-1'>*</span>
									</div>
									<select
										className='form-control'
										name='mariagesStatus'
										value={values && values.mariagesStatus}
										onChange={e => setValue('mariagesStatus', e.target.value)}>
										<option>انتخاب کنید</option>
										<option value={1}>مجرد</option>
										<option value={2}>متاهل</option>
									</select>
								</div>
								<GetError name='mariagesStatus' />
							</div>
							<div className='col-12 col-md-6 mb-4'>
								<div className='flex flex-col'>
									<div className='mb-1'>
										تلفن ضروری<span className='required-star text-danger mx-1'>*</span>
									</div>
									<input
										name='tellNumber'
										className='form-control'
										value={values && values.tellNumber}
										onChange={e => setValue('tellNumber', e.target.value)}
									/>
								</div>
								<GetError name='tellNumber' />
							</div>
							<div className='col-12 col-md-6 mb-4'>
								<div className='flex flex-col '>
									<div className='mb-1'>
										مذهب<span className='required-star text-danger mx-1'>*</span>
									</div>
									<select
										className='form-control'
										name='religionId'
										value={values && values.religionId}
										onChange={e => setValue('religionId', e.target.value)}>
										<option>انتخاب کنید</option>
										<option value={1}>شیعه</option>
										<option value={2}>اهل تسنن</option>
									</select>
								</div>
								<GetError name='religionId' />
							</div>
						</div>
						<div className='mt-2 flex justify-center'>
							<div className='requirements-btns-group text-center'>
								<button onClick={handleSaveToLocalStorage} type='button' className='btn button btn-block'>
									ثبت و ادامه
								</button>
							</div>
						</div>
					</div>
				)}
			</div>
		</>
	);
};

export default connect(
	(state: IApplicationState) => state.transformation,
	transformationActions
)(TransformationInformation as ComponentType);
