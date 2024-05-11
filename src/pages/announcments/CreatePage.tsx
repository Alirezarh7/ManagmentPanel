import React, { useState } from 'react';
import Breadcrumb from '../../components/Layout/Breadcrumb';
import { PATHS } from '../../router/paths';
import { Controller, useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { ICreateAnnouncementDto } from '../../typs/announcement.types';
import CustomButton from '../../components/general/Buttons/CustomButton';
import { convertToBase64, isValidUploadedImageType } from '../../utils/fileUtils';
import { AnnouncementServiceTypes } from '../../constants/announcement.const';
import CustomInput from '../../components/general/inputs/CustomInput';
import { useCreateAnnouncement } from '../../services/announcement.service';

const AnnouncementsCreatePage = () => {
	const [image, setImage] = useState<File | undefined>(undefined);
	const { mutate, isPending } = useCreateAnnouncement();

	const defaultFormValues: ICreateAnnouncementDto = {
		subject: '',
		body: '',
		serviceTypeId: 0
	};

	const createAnnouncementsSchema = Yup.object().shape({
		subject: Yup.string().required('این فیلد اجباری است'),
		body: Yup.string().required('این فیلد اجباری است'),
		serviceTypeId: Yup.number().required('این فیلد اجباری است').min(1, 'لطفا یک گزینه انتخاب کنید')
	});

	const {
		control,
		handleSubmit,
		formState: { errors }
	} = useForm<ICreateAnnouncementDto>({
		defaultValues: defaultFormValues,
		resolver: yupResolver(createAnnouncementsSchema)
	});

	const onSubmitFormHandler = async (submittedData: ICreateAnnouncementDto) => {
		if (!image) {
			alert('آپلود عکس اجباری است');
			return;
		}

		const base64: any = await convertToBase64(image);
		const data = { ...submittedData, image: base64 };
		console.log(data);
		mutate(data, {
			onSuccess: () => {
				alert('موفق');
			},
			onError: error => {
				console.log(error);
			}
		});
	};

	const uploadOrDropFileHandler = (event: any) => {
		event.preventDefault();

		const isChangeEvent: boolean = event.type !== 'change' && event?.target?.value;
		if (event.type !== 'change' && event.type !== 'drop') {
			return;
		}

		// Validations *******************************************************
		const files: FileList | null = event.type === 'change' ? event?.target?.files : event?.dataTransfer?.files;
		if (files?.length === 0 || !files?.length) return;
		const file = files[0];
		if (!file || !isValidUploadedImageType(file)) {
			alert('فایل نامعتبر');
			return;
		}
		// Validations *******************************************************

		setImage(file);
		if (isChangeEvent) {
			event.target.value = '';
		}
	};

	return (
		<>
			<Breadcrumb items={[{ label: 'اطلاعیه ها', url: PATHS.announcements.index }, { label: 'ایجاد' }]} />
			<h1 className='text-xl mb-3'>ایجاد اطلاعیه جدید</h1>

			<div className='max-w-screen-xl w-full mx-auto flex flex-col'>
				<form className='flex flex-col gap-6' onSubmit={handleSubmit(onSubmitFormHandler)}>
					<div className='grid md:grid-cols-3 gap-6'>
						<Controller
							name='subject'
							control={control}
							render={({ field: { value, onChange } }) => (
								<CustomInput
									type={'text'}
									label='موضوع اطلاعیه'
									className='md:col-span-2'
									value={value}
									onChange={onChange}
									error={errors.subject && errors.subject.message}
								/>
							)}
						/>
						<Controller
							name='serviceTypeId'
							control={control}
							render={({ field: { value, onChange } }) => (
								<div>
									<label>نوع سرویس</label>
									<select
										value={value}
										onChange={e => onChange(e.target.value)}
										className={`${errors.serviceTypeId ? '!border-danger' : ''}`}>
										<option value={0}>انتخاب کنید</option>
										{AnnouncementServiceTypes.map(item => (
											<option key={item.id} value={item.id}>
												{item.nameFa}
											</option>
										))}
									</select>
									{errors.serviceTypeId ? <span className='text-danger'>{errors.serviceTypeId.message}</span> : null}
								</div>
							)}
						/>
					</div>

					<Controller
						name='body'
						control={control}
						render={({ field }) => (
							<div>
								<label className='form-label'>متن اطلاعیه</label>
								<textarea rows={10} {...field} className={`${errors.body ? '!border-danger' : ''}`}></textarea>
								{errors.body ? <span className='text-danger'>{errors.body.message}</span> : null}
							</div>
						)}
					/>

					<div className='flex flex-col justify-center items-center gap-4 py-2'>
						<label
							htmlFor='image-uploader'
							className={`w-full cursor-pointer flex flex-col justify-center items-center gap-4 border ${image ? '!border-gray-300' : '!border-red-300'}`}
							onDrop={event => uploadOrDropFileHandler(event)}
							onDragOver={event => event.preventDefault()}>
							<span>جهت آپلود کلیک کنید</span>
							<span>یا عکس را اینجا رها کنید</span>
							<input
								className='relative z-10'
								type='file'
								accept='.jpeg, .png, .jpg, .webp, .mp4, .webm, image/jpeg, image/png, image/webp'
								id='image-uploader'
								hidden
								multiple={false}
								disabled={false}
								onChange={event => uploadOrDropFileHandler(event)}
							/>
						</label>
						{image ? <img src={URL.createObjectURL(image)} alt='پیش نمایش موقت' className='max-w-96' /> : null}
					</div>
					<div>
						<CustomButton variant={'primary'} type={'submit'} label={'ذخیره'} onClick={() => {}} />
					</div>
				</form>
			</div>
		</>
	);
};

export default AnnouncementsCreatePage;
