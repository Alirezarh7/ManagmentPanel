import React, { useEffect } from 'react';
import Breadcrumb from '../../components/Layout/Breadcrumb';
import { PATHS } from '../../router/paths';
import { Controller, useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import CustomButton from '../../components/general/Buttons/CustomButton';
import { serviceTypes } from '../../constants/general.const';
import CustomInput from '../../components/general/inputs/CustomInput';
import CustomTextEditor from '../../components/general/textEditor/CustomTextEditor';
import { enqueueSnackbar } from 'notistack';
import { useNavigate, useParams } from 'react-router-dom';
import CustomLineSpinner from '../../components/general/spinners/CustomLineSpinner';
import { useQueryClient } from '@tanstack/react-query';
import { useEditContent, useGetContentById } from '../../services/content.service';
import { ICreateContentDto, IEditContentDto } from '../../typs/content.types';
import { contentLocations } from '../../constants/content.const';

const ContentsEditPage = () => {
	const { id } = useParams();
	const queryClient = useQueryClient();
	const { data: contentData, isLoading, isFetching, isError: isErrorForGetById } = useGetContentById(id ?? '');
	const { mutate, isPending } = useEditContent();
	const navigate = useNavigate();

	useEffect(() => {
		if (isErrorForGetById && !isLoading) {
			enqueueSnackbar('خطا در دریافت محتوا ', { variant: 'error' });
			navigate(PATHS.contents.index);
		}
	}, [isErrorForGetById]);

	const defaultFormValues: ICreateContentDto = {
		subject: '',
		body: '',
		serviceType: '',
		serviceTypeId: 0,
		subServiceType: '',
		subServiceTypeId: 0,
		contentLocation: '',
		contentLocationId: 0
	};

	const editContentSchema = Yup.object().shape({
		subject: Yup.string().required('این فیلد اجباری است'),
		body: Yup.string().required('این فیلد اجباری است'),
		serviceType: Yup.string().required('این فیلد اجباری است'),
		serviceTypeId: Yup.number().required('این فیلد اجباری است').min(1, 'لطفا یک گزینه انتخاب کنید'),
		subServiceType: Yup.string().required('این فیلد اجباری است'),
		subServiceTypeId: Yup.number().required('این فیلد اجباری است').min(1, 'لطفا یک گزینه انتخاب کنید'),
		contentLocation: Yup.string().required('این فیلد اجباری است'),
		contentLocationId: Yup.number().required('این فیلد اجباری است').min(1, 'لطفا یک گزینه انتخاب کنید')
	});

	const {
		control,
		handleSubmit,
		formState: { errors },
		setValue
	} = useForm<ICreateContentDto>({
		defaultValues: defaultFormValues,
		resolver: yupResolver(editContentSchema)
	});

	useEffect(() => {
		if (contentData) {
			setValue('subject', contentData.subject);
			setValue('body', contentData.body);
			setValue('serviceType', contentData.serviceType);
			setValue('serviceTypeId', contentData.serviceTypeId);
			setValue('contentLocation', contentData.contentLocation);
			setValue('contentLocationId', contentData.contentLocationId);
		}
	}, [contentData]);

	const onSubmitFormHandler = async (submittedData: ICreateContentDto) => {
		// validation ****************************************************************************************
		if (!contentData) {
			return;
		}
		// validation ****************************************************************************************
		const data: IEditContentDto = {
			...submittedData,
			id: contentData.id
		};

		mutate(data, {
			onSuccess: () => {
				enqueueSnackbar('محتوا با موفقیت ایجاد شد', { variant: 'success' });
				queryClient.invalidateQueries({
					queryKey: ['getContents']
				});
				navigate(PATHS.contents.index);
			},
			onError: error => {
				enqueueSnackbar('خطا در ویرایش محتوا', { variant: 'error' });
			}
		});
	};

	return (
		<div className='space-y-4'>
			<Breadcrumb items={[{ label: 'محتویات', url: PATHS.contents.index }, { label: 'ویرایش' }]} />
			<h1 className='text-xl mb-3'>ویرایش محتوا </h1>

			{isLoading || isFetching ? <CustomLineSpinner /> : null}

			<div className='max-w-screen-xl w-full mx-auto flex flex-col'>
				<form className='flex flex-col gap-6' onSubmit={handleSubmit(onSubmitFormHandler)}>
					<div className='grid grid-cols-2 gap-6'>
						<Controller
							name='serviceTypeId'
							control={control}
							render={({ field: { value, onChange } }) => (
								<div>
									<label>سرویس محتوا</label>
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
							name='contentLocationId'
							control={control}
							render={({ field: { value, onChange } }) => (
								<div>
									<label>مکان محتوا</label>
									<select
										value={value}
										onChange={e => {
											const newValue = e.target.value;
											const stringContentLocation = contentLocations.find(q => q.id === Number(newValue));
											setValue('contentLocation', stringContentLocation?.name ?? 'unknown');
											onChange(newValue);
										}}
										className={`${errors.contentLocation || errors.contentLocationId ? '!border-danger' : ''}`}>
										<option value={0}>انتخاب کنید</option>
										{contentLocations.map(item => (
											<option key={item.id} value={item.id}>
												{item.nameFa}
											</option>
										))}
									</select>
									{errors.contentLocation ? <span className='text-danger'>{errors.contentLocation.message + ' '}</span> : null}
									{errors.contentLocationId ? <span className='text-danger'>{errors.contentLocationId.message}</span> : null}
								</div>
							)}
						/>
					</div>
					<Controller
						name='subject'
						control={control}
						render={({ field: { value, onChange } }) => (
							<CustomInput
								type={'text'}
								label='موضوع محتوا'
								className='md:col-span-2'
								value={value}
								onChange={onChange}
								error={errors.subject && errors.subject.message}
							/>
						)}
					/>
					<Controller
						name='body'
						control={control}
						render={({ field: { value, onChange } }) => (
							<CustomTextEditor
								showPreview={true}
								label='متن محتوا'
								value={value}
								onChange={onChange}
								error={errors.body && errors.body.message}
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

export default ContentsEditPage;
