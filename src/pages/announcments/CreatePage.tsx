import React, { useState } from 'react';
import Breadcrumb from '../../components/Layout/Breadcrumb';
import { PATHS } from '../../router/paths';
import { Controller, useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { ICreateAnnouncementDto } from '../../typs/announcement.types';
import { ObjectSchema } from 'yup';
import CustomButton from '../../components/general/Buttons/CustomButton';
import { isValidUploadedImageType } from '../../utils/uploadFileUtils';

const AnnouncementsCreatePage = () => {
	const [image, setImage] = useState<File | undefined>(undefined);

	const defaultFormValues: ICreateAnnouncementDto = {
		subject: '',
		body: '',
		serviceTypeId: 0,
		image: ''
	};

	const createAnnouncementsSchema = Yup.object().shape({
		subject: Yup.string().required(),
		body: Yup.string().required(),
		serviceTypeId: Yup.number().required().min(1),
		image: Yup.string().required()
	});

	const {
		control,
		handleSubmit,
		formState: { errors }
	} = useForm<ICreateAnnouncementDto>({
		defaultValues: defaultFormValues,
		resolver: yupResolver(createAnnouncementsSchema)
	});

	const onSubmitFormHandler = (submittedData: ICreateAnnouncementDto) => {
		console.log(submittedData);
	};

	const onFormErrorHandler = (error: any) => {
		console.log(error);
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
				<div className='border'>
					<form className='flex flex-col gap-6' onSubmit={handleSubmit(onSubmitFormHandler, onFormErrorHandler)}>
						<Controller
							name='subject'
							control={control}
							render={({ field }) => (
								<div>
									<label className='form-label'>موضوع اطلاعیه</label>
									<input type='text' className='form-control' {...field} />
								</div>
							)}
						/>
						<Controller
							name='body'
							control={control}
							render={({ field }) => (
								<div>
									<label className='form-label'>متن اطلاعیه</label>
									<input type='text' className='form-control' {...field} />
								</div>
							)}
						/>
						<Controller
							name='serviceTypeId'
							control={control}
							render={({ field }) => (
								<div>
									<label className='form-label'>موضوع</label>
									<input type='text' className='form-control' {...field} />
								</div>
							)}
						/>
						<Controller
							name='image'
							control={control}
							render={({ field }) => (
								<div className='flex flex-col justify-center items-center gap-4 py-2'>
									<label
										htmlFor='image-uploader'
										className='w-full cursor-pointer flex flex-col justify-center items-center gap-4 border !border-green-600'
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
							)}
						/>
						<div>
							<CustomButton variant={'primary'} type={'submit'} label={'ذخیره'} onClick={() => {}} />
						</div>
					</form>
				</div>
			</div>
		</>
	);
};

export default AnnouncementsCreatePage;
