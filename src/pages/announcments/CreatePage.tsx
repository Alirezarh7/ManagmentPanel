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
import DatePicker, { DateObject } from 'react-multi-date-picker';
import persian from 'react-date-object/calendars/persian';
import persian_fa from 'react-date-object/locales/persian_fa';
import CustomTextEditor from '../../components/general/textEditor/CustomTextEditor';
import { enqueueSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
import CustomRadioButton from '../../components/general/radioButton/CustomRadioButton';
import { booleanDefaultValuesArray, booleanIsActiveValuesArray, oneKB, UPLOAD_FILE_SIZES } from '../../constants/general.const';
import { MdOutlineCloudUpload } from 'react-icons/md';
import CustomAlert from '../../components/general/alerts/CustomAlert';
import TimePicker from 'react-multi-date-picker/plugins/time_picker';

const AnnouncementsCreatePage = () => {
	const [image, setImage] = useState<File | undefined>(undefined);
	const [isDateUpdated, setIsDateUpdated] = useState<boolean>(false);
	const { mutate, isPending } = useCreateAnnouncement();

	const maxImageSizeMessage = 'حداکثر حجم تصویر بایستی ' + UPLOAD_FILE_SIZES.announcementMaxImageSize / oneKB + ' کیلوبایت باشد.';

	const navigate = useNavigate();

	const defaultFormValues: ICreateAnnouncementDto = {
		subject: '',
		body: '',
		isActive: true,
		isDisplayMainPage: true,
		serviceType: '',
		serviceTypeId: 0,
		showDuration: 0,
		showFromDate: new DateObject().convert(persian).toString()
	};

	const createAnnouncementsSchema = Yup.object().shape({
		subject: Yup.string().required('این فیلد اجباری است'),
		body: Yup.string().required('این فیلد اجباری است'),
		isActive: Yup.boolean().required('این فیلد اجباری است'),
		isDisplayMainPage: Yup.boolean().required('این فیلد اجباری است'),
		serviceType: Yup.string().required('این فیلد اجباری است'),
		serviceTypeId: Yup.number().required('این فیلد اجباری است').min(1, 'لطفا یک گزینه انتخاب کنید'),
		showDuration: Yup.number()
			.required('این فیلد اجباری است')
			.min(1, 'لطفا یک گزینه انتخاب کنید')
			.max(255, 'حداکثر عدد 255 قابل قبول است'),
		showFromDate: Yup.string()
			.required('این فیلد اجباری است')
			.test('validDate', 'زمان شروع نمایش باید بعد از لحظه جاری باشد', function (value) {
				if (!isDateUpdated) return true;
				const newDate = new Date().toISOString();
				return value > newDate;
			})
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
			enqueueSnackbar('آپلود عکس اجباری است', { variant: 'error' });
			return;
		}

		const base64: any = await convertToBase64(image);
		const data = {
			...submittedData,
			showFromDate: isDateUpdated ? submittedData.showFromDate : new Date().toISOString(),
			base64Image: base64
		};
		console.log(data);
		mutate(data, {
			onSuccess: () => {
				enqueueSnackbar('اطلاعیه با موفقیت ایجاد شد', { variant: 'success' });
				navigate(PATHS.announcements.index);
			},
			onError: error => {
				enqueueSnackbar('خطا در ایجاد اطلاعیه جدید', { variant: 'error' });
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
			enqueueSnackbar('فایل نامعتبر', { variant: 'error' });
			if (isChangeEvent) {
				event.target.value = '';
			}
			return;
		}
		if (file.size > UPLOAD_FILE_SIZES.announcementMaxImageSize) {
			enqueueSnackbar(maxImageSizeMessage, { variant: 'error' });
			if (isChangeEvent) {
				event.target.value = '';
			}
			return;
		}
		// Validations *******************************************************

		setImage(file);
		if (isChangeEvent) {
			event.target.value = '';
		}
	};

	return (
		<div className='space-y-4'>
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
										className={`${errors.serviceType ? '!border-danger' : ''}`}>
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
						render={({ field: { value, onChange } }) => (
							<CustomTextEditor
								showPreview={true}
								label='متن اطلاعیه'
								value={value}
								onChange={onChange}
								error={errors.body && errors.body.message}
							/>
						)}
					/>
					<div className='grid md:grid-cols-2 gap-6'>
						<Controller
							name='isActive'
							control={control}
							render={({ field: { value, onChange } }) => (
								<div>
									<label>وضعیت فعال بودن اطلاعیه</label>
									<div className='px-4 py-2 text-base bg-white border !border-gray-300 rounded-md flex flex-col gap-2'>
										{booleanIsActiveValuesArray.map(item => (
											<div key={item.label} className={`flex items-center gap-2 ${value === item.value ? 'text-blue-500' : ''}`}>
												<CustomRadioButton value={item.value} checked={value === item.value} onClick={onChange} />
												<span>{item.label}</span>
											</div>
										))}
									</div>
									{errors.isActive ? <span className='text-danger'>{errors.isActive.message}</span> : null}
								</div>
							)}
						/>
						<Controller
							name='isDisplayMainPage'
							control={control}
							render={({ field: { value, onChange } }) => (
								<div>
									<label>آیا اطلاعیه در صفحه اصلی نمایش داده شود؟</label>
									<div className='px-4 py-2 text-base bg-white border !border-gray-300 rounded-md flex flex-col gap-2'>
										{booleanDefaultValuesArray.map(item => (
											<div key={item.label} className={`flex items-center gap-2 ${value === item.value ? 'text-blue-500' : ''}`}>
												<CustomRadioButton value={item.value} checked={value === item.value} onClick={onChange} />
												<span>{item.label}</span>
											</div>
										))}
									</div>
									{errors.isDisplayMainPage ? <span className='text-danger'>{errors.isDisplayMainPage.message}</span> : null}
								</div>
							)}
						/>
					</div>

					<div className='grid md:grid-cols-2 gap-6'>
						<Controller
							name='showDuration'
							control={control}
							render={({ field: { value, onChange } }) => (
								<CustomInput
									type={'number'}
									label='مدت نمایش (به روز)'
									value={value.toString()}
									onChange={onChange}
									error={errors.showDuration && errors.showDuration.message}
								/>
							)}
						/>
						<Controller
							name='showFromDate'
							control={control}
							render={({ field: { value, onChange } }) => (
								<div>
									<label>زمان شروع نمایش</label>
									<DatePicker
										monthYearSeparator='|'
										format='YYYY/MM/DD --- HH:mm:ss'
										editable={false}
										disableYearPicker
										containerClassName='!block'
										inputClass=' w-full px-4 py-2 text-base border border-gray-300 rounded-md outline-none focus:outline-none focus:shadow-lg'
										calendar={persian}
										locale={persian_fa}
										minDate={new DateObject()}
										plugins={[<TimePicker position='bottom' />]}
										value={value}
										onChange={date => {
											if (date instanceof DateObject) {
												onChange(date.toDate().toISOString());
												setIsDateUpdated(true);
											}
										}}
									/>
									{errors.showFromDate ? <span className='text-danger'>{errors.showFromDate.message}</span> : null}
								</div>
							)}
						/>
					</div>

					<div className='py-2 grid md:grid-cols-2 justify-center items-start gap-4 border rounded-md'>
						<label
							htmlFor='image-uploader'
							className={`w-full flex flex-col justify-center items-center gap-4 border-2 !border-dashed 
							${image ? '!border-gray-300 text-black' : '!border-red-300 text-red-300'} cursor-pointer rounded-md overflow-hidden`}
							onDrop={event => uploadOrDropFileHandler(event)}
							onDragOver={event => event.preventDefault()}>
							<CustomAlert variant={'alert'} shouldHaveIcon={true} message={maxImageSizeMessage} />
							<div className='flex flex-col justify-center items-center '>
								<MdOutlineCloudUpload className='w-20 h-20' />
								<span>جهت آپلود کلیک کنید یا عکس را اینجا رها کنید</span>
							</div>
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
						<div className='flex justify-center items-center'>
							{image ? <img src={URL.createObjectURL(image)} alt='پیش نمایش موقت' className='max-w-96 rounded-md' /> : null}
						</div>
					</div>

					<div>
						<CustomButton variant={'primary'} type={'submit'} label={'ذخیره'} onClick={() => {}} loading={isPending} />
					</div>
				</form>
			</div>
		</div>
	);
};

export default AnnouncementsCreatePage;
