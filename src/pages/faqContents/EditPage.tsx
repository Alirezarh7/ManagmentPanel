import React, { useEffect } from 'react';
import Breadcrumb from '../../components/Layout/Breadcrumb';
import { PATHS } from '../../router/paths';
import { Controller, useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import CustomButton from '../../components/general/Buttons/CustomButton';
import { serviceTypes, subServiceTypes } from '../../constants/general.const';
import CustomInput from '../../components/general/inputs/CustomInput';
import CustomTextEditor from '../../components/general/textEditor/CustomTextEditor';
import { enqueueSnackbar } from 'notistack';
import { useNavigate, useParams } from 'react-router-dom';
import CustomLineSpinner from '../../components/general/spinners/CustomLineSpinner';
import { useQueryClient } from '@tanstack/react-query';
import { useEditFaqContent, useGetFaqContentById } from '../../services/faqContent.service';
import { ICreateFaqContentDto, IEditFaqContentDto } from '../../typs/faqContent.types';

const FaqContentsEditPage = () => {
	const { id } = useParams();
	const queryClient = useQueryClient();
	const { data: faqContentData, isLoading, isFetching, isError: isErrorForGetById } = useGetFaqContentById(id ?? '');
	const { mutate, isPending } = useEditFaqContent();
	const navigate = useNavigate();

	useEffect(() => {
		if (isErrorForGetById && !isLoading) {
			enqueueSnackbar('خطا در دریافت سوال ', { variant: 'error' });
			navigate(PATHS.faqContents.index);
		}
	}, [isErrorForGetById]);

	const defaultFormValues: ICreateFaqContentDto = {
		question: '',
		answer: '',
		serviceType: '',
		serviceTypeId: 0,
		subServiceType: '',
		subServiceTypeId: 0
	};

	const editFaqContentSchema = Yup.object().shape({
		question: Yup.string().required('این فیلد اجباری است'),
		answer: Yup.string().required('این فیلد اجباری است'),
		serviceType: Yup.string().required('این فیلد اجباری است'),
		serviceTypeId: Yup.number().required('این فیلد اجباری است').min(1, 'لطفا یک گزینه انتخاب کنید'),
		subServiceType: Yup.string().required('این فیلد اجباری است'),
		subServiceTypeId: Yup.number().required('این فیلد اجباری است').min(1, 'لطفا یک گزینه انتخاب کنید')
	});

	const {
		control,
		handleSubmit,
		formState: { errors },
		setValue
	} = useForm<ICreateFaqContentDto>({
		defaultValues: defaultFormValues,
		resolver: yupResolver(editFaqContentSchema)
	});

	useEffect(() => {
		if (faqContentData) {
			setValue('question', faqContentData.question);
			setValue('answer', faqContentData.answer);
			setValue('serviceType', faqContentData.serviceType);
			setValue('serviceTypeId', faqContentData.serviceTypeId);
			setValue('subServiceType', faqContentData.subServiceType);
			setValue('subServiceTypeId', faqContentData.subServiceTypeId);
		}
	}, [faqContentData]);

	const onSubmitFormHandler = async (submittedData: ICreateFaqContentDto) => {
		// validation ****************************************************************************************
		if (!faqContentData) {
			return;
		}
		// validation ****************************************************************************************
		const data: IEditFaqContentDto = {
			...submittedData,
			id: faqContentData.id
		};

		mutate(data, {
			onSuccess: () => {
				enqueueSnackbar('سوال با موفقیت ویرایش شد', { variant: 'success' });
				queryClient.invalidateQueries({
					queryKey: ['getFaqContents']
				});
				navigate(PATHS.faqContents.index);
			},
			onError: error => {
				enqueueSnackbar('خطا در ویرایش سوال', { variant: 'error' });
			}
		});
	};

	return (
		<div className='space-y-4'>
			<Breadcrumb items={[{ label: 'سوالات پرتکرار', url: PATHS.faqContents.index }, { label: 'ویرایش' }]} />
			<h1 className='text-xl mb-3'>ویرایش سوال پرتکرار </h1>

			{isLoading || isFetching ? <CustomLineSpinner /> : null}

			<div className='max-w-screen-xl w-full mx-auto flex flex-col'>
				<form
					className={`flex flex-col gap-6 ${isLoading || isFetching ? 'blur-sm pointer-events-none' : ''}`}
					onSubmit={handleSubmit(onSubmitFormHandler)}>
					<div className='grid grid-cols-2 gap-6'>
						<Controller
							name='serviceTypeId'
							control={control}
							render={({ field: { value, onChange } }) => (
								<div>
									<label>انتخاب نوع خدمت</label>
									<select
										value={value}
										onChange={e => {
											const newValue = e.target.value;
											const stringServiceType = serviceTypes.find(q => q.id === Number(newValue));
											setValue('serviceType', stringServiceType?.name ?? 'unknown');
											onChange(newValue);
										}}
										className={`${errors.serviceType || errors.serviceTypeId ? '!border-danger' : ''}`}>
										<option value={0}>انتخاب کنید</option>
										{serviceTypes.map(item => (
											<option key={item.id} value={item.id}>
												{item.nameFa}
											</option>
										))}
									</select>
									{errors.serviceType ? <span className='text-danger'>{errors.serviceType.message + ' '}</span> : null}
									{errors.serviceTypeId ? <span className='text-danger'>{errors.serviceTypeId.message}</span> : null}
								</div>
							)}
						/>
						<Controller
							name='subServiceTypeId'
							control={control}
							render={({ field: { value, onChange } }) => (
								<div>
									<label>انتخاب نوع زیر-خدمت</label>
									<select
										value={value}
										onChange={e => {
											const newValue = e.target.value;
											const stringSubServiceType = subServiceTypes.find(q => q.id === Number(newValue));
											setValue('subServiceType', stringSubServiceType?.name ?? 'unknown');
											onChange(newValue);
										}}
										className={`${errors.subServiceType || errors.subServiceType ? '!border-danger' : ''}`}>
										<option value={0}>انتخاب کنید</option>
										{subServiceTypes.map(item => (
											<option key={item.id} value={item.id}>
												{item.nameFa}
											</option>
										))}
									</select>
									{errors.subServiceType ? <span className='text-danger'>{errors.subServiceType.message + ' '}</span> : null}
									{errors.subServiceType ? <span className='text-danger'>{errors.subServiceType.message}</span> : null}
								</div>
							)}
						/>
					</div>
					<Controller
						name='question'
						control={control}
						render={({ field: { value, onChange } }) => (
							<CustomInput
								type={'text'}
								label='سوال'
								className='md:col-span-2'
								value={value}
								onChange={onChange}
								error={errors.question?.message}
							/>
						)}
					/>
					<Controller
						name='answer'
						control={control}
						render={({ field: { value, onChange } }) => (
							<CustomTextEditor
								showPreview={true}
								label='جواب'
								value={value}
								onChange={onChange}
								error={errors.answer && errors.answer.message}
							/>
						)}
					/>
					<div>
						<CustomButton variant={'primary'} type={'submit'} label={'ذخیره'} onClick={() => {}} loading={isPending} />
					</div>
				</form>
			</div>
		</div>
	);
};

export default FaqContentsEditPage;
