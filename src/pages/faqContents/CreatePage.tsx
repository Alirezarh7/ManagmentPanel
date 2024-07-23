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
import { useNavigate } from 'react-router-dom';
import { useCreateFaqContent } from '../../services/faqContent.service';
import { ICreateFaqContentDto } from '../../typs/faqContent.types';

const FaqContentsCreatePage = () => {
	const { mutate, isPending } = useCreateFaqContent();

	const navigate = useNavigate();

	const defaultFormValues: ICreateFaqContentDto = {
		question: '',
		answer: '',
		serviceType: '',
		serviceTypeId: 0,
		subServiceType: '',
		subServiceTypeId: 0
	};

	const createFaqContentSchema = Yup.object().shape({
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
		resolver: yupResolver(createFaqContentSchema)
	});

	const onSubmitFormHandler = async (submittedData: ICreateFaqContentDto) => {
		mutate(submittedData, {
			onSuccess: () => {
				enqueueSnackbar('سوال جدید با موفقیت ایجاد شد', { variant: 'success' });
				navigate(PATHS.faqContents.index);
			},
			onError: error => {
				enqueueSnackbar('خطا در ایجاد سوال جدید', { variant: 'error' });
			}
		});
	};

	return (
		<div className='space-y-4'>
			<Breadcrumb items={[{ label: 'سوالات پرتکرار', url: PATHS.faqContents.index }, { label: 'ایجاد' }]} />
			<h1 className='text-xl mb-3'>ایجاد سوال پرتکرار جدید</h1>

			<div className='max-w-screen-xl w-full mx-auto flex flex-col'>
				<form className='flex flex-col gap-6' onSubmit={handleSubmit(onSubmitFormHandler)}>
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
										className={`${errors.subServiceType || errors.subServiceTypeId ? '!border-danger' : ''}`}>
										<option value={0}>انتخاب کنید</option>
										{subServiceTypes.map(item => (
											<option key={item.id} value={item.id}>
												{item.nameFa}
											</option>
										))}
									</select>
									{errors.subServiceType ? <span className='text-danger'>{errors.subServiceType.message + ' '}</span> : null}
									{errors.subServiceTypeId ? <span className='text-danger'>{errors.subServiceTypeId.message}</span> : null}
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

export default FaqContentsCreatePage;
