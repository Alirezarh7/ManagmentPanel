import Breadcrumb from '../../components/Layout/Breadcrumb';
import { PATHS } from '../../router/paths';
import { Controller, useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import CustomButton from '../../components/general/Buttons/CustomButton';
import { announcementServiceTypes } from '../../constants/announcement.const';
import CustomInput from '../../components/general/inputs/CustomInput';
import CustomTextEditor from '../../components/general/textEditor/CustomTextEditor';
import { enqueueSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
import { useCreateContent } from '../../services/content.service';
import { ICreateContentDto } from '../../typs/content.types';
import { contentLocations } from '../../constants/content.const';

const ContentsCreatePage = () => {
	const { mutate, isPending } = useCreateContent();

	const navigate = useNavigate();

	const defaultFormValues: ICreateContentDto = {
		subject: '',
		body: '',
		serviceType: '',
		serviceTypeId: 0,
		contentLocation: '',
		contentLocationId: 0
	};

	const createContentSchema = Yup.object().shape({
		subject: Yup.string().required('این فیلد اجباری است'),
		body: Yup.string().required('این فیلد اجباری است'),
		serviceType: Yup.string().required('این فیلد اجباری است'),
		serviceTypeId: Yup.number().required('این فیلد اجباری است').min(1, 'لطفا یک گزینه انتخاب کنید'),
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
		resolver: yupResolver(createContentSchema)
	});

	const onSubmitFormHandler = async (submittedData: ICreateContentDto) => {
		mutate(submittedData, {
			onSuccess: () => {
				enqueueSnackbar('محتوا با موفقیت ایجاد شد', { variant: 'success' });
				navigate(PATHS.contents.index);
			},
			onError: error => {
				enqueueSnackbar('خطا در ایجاد محتوای جدید', { variant: 'error' });
			}
		});
	};

	return (
		<div className='space-y-4'>
			<Breadcrumb items={[{ label: 'محتویات', url: PATHS.contents.index }, { label: 'ایجاد' }]} />
			<h1 className='text-xl mb-3'>ایجاد محتوای جدید</h1>

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
											const stringServiceType = announcementServiceTypes.find(q => q.id === Number(newValue));
											setValue('serviceType', stringServiceType?.name ?? 'unknown');
											onChange(newValue);
										}}
										className={`${errors.serviceType || errors.serviceTypeId ? '!border-danger' : ''}`}>
										<option value={0}>انتخاب کنید</option>
										{announcementServiceTypes.map(item => (
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

export default ContentsCreatePage;
