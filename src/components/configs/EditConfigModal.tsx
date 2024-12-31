import React from 'react';
import CustomModal from '../general/Modal/CustomModal';
import CustomButton from '../general/Buttons/CustomButton';
import { enqueueSnackbar } from 'notistack';
import { useQueryClient } from '@tanstack/react-query';
import { IConfigResponse, IEditConfigDto } from '../../typs/config.types';
import { useEditConfig } from '../../services/configs.service';
import * as Yup from 'yup';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { booleanIsActiveValuesArray } from '../../constants/general.const';
import CustomRadioButton from '../general/radioButton/CustomRadioButton';

interface IProps {
	data: IConfigResponse;
	isOpen: boolean;
	onSuccess: () => void;
	onCancel: () => void;
	acceptLabel?: string;
	cancelLabel?: string;
}

const EditConfigModal = ({ data, isOpen, onSuccess, onCancel }: IProps) => {
	const queryClient = useQueryClient();
	const { mutate, isPending } = useEditConfig();

	const defaultFormValues: IEditConfigDto = {
		id: data.id,
		isOpenCompletion: data.isOpenCompletion,
		isOpenPassengerGroup: data.isOpenPassengerGroup,
		isOpenReserve: data.isOpenReserve,
		isOpenPayment: data.isOpenPayment,
		isActive: data.isActive
	};

	const editConfigSchema = Yup.object().shape({
		id: Yup.string().required(),
		isOpenCompletion: Yup.boolean().required('این فیلد اجباری است'),
		isOpenPassengerGroup: Yup.boolean().required('این فیلد اجباری است'),
		isOpenReserve: Yup.boolean().required('این فیلد اجباری است'),
		isOpenPayment: Yup.boolean().required('این فیلد اجباری است'),
		isActive: Yup.boolean().required('این فیلد اجباری است')
	});

	const {control, handleSubmit, formState: { errors }} = useForm<IEditConfigDto>({
		defaultValues: defaultFormValues,
		resolver: yupResolver(editConfigSchema)
	});

	const onSubmitFormHandler = (data: IEditConfigDto) => {
		mutate(data, {
			onSuccess: () => {
				enqueueSnackbar('تنظیمات انتخاب شده با موفقیت ویرایش شد', { variant: 'success' });
				queryClient.invalidateQueries({
					queryKey: ['getConfigs']
				});
				onSuccess();
			},
			onError: error => {
				enqueueSnackbar('خطا در ویرایش تنظیمات انتخاب شده ', { variant: 'error' });
			}
		});
	};

	return (
		<CustomModal isOpen={isOpen} title='ویرایش تنظیمات سایت' onDismiss={onCancel}>
			<div className='m-3 flex flex-col gap-4 '>
				<p className='text-lg'>لطفا وضعیت موارد مورد نظر را ویرایش کنید</p>
				<form
					className={`flex flex-col gap-6 ${isPending ? 'blur-sm pointer-events-none' : ''}`}
					onSubmit={handleSubmit(onSubmitFormHandler)}>
					<Controller
						name='isOpenCompletion'
						control={control}
						render={({ field: { value, onChange } }) => (
							<div className='px-2 border !border-gray-300 rounded-md'>
								<label>تکمیل اطلاعات</label>
								<div className='px-4 py-2 text-base bg-white flex flex-col gap-2'>
									{booleanIsActiveValuesArray.map(item => (
										<div key={item.label} className={`flex items-center gap-2 ${value === item.value ? 'text-blue-500' : ''}`}>
											<CustomRadioButton value={item.value} checked={value === item.value} onClick={onChange} />
											<span>{item.label}</span>
										</div>
									))}
								</div>
								{errors.isOpenCompletion ? <span className='text-danger'>{errors.isOpenCompletion.message}</span> : null}
							</div>
						)}
					/>
					<Controller
						name='isOpenPassengerGroup'
						control={control}
						render={({ field: { value, onChange } }) => (
							<div className='px-2 border !border-gray-300 rounded-md'>
								<label>گروه بندی</label>
								<div className='px-4 py-2 text-base bg-white flex flex-col gap-2'>
									{booleanIsActiveValuesArray.map(item => (
										<div key={item.label} className={`flex items-center gap-2 ${value === item.value ? 'text-blue-500' : ''}`}>
											<CustomRadioButton value={item.value} checked={value === item.value} onClick={onChange} />
											<span>{item.label}</span>
										</div>
									))}
								</div>
								{errors.isOpenPassengerGroup ? <span className='text-danger'>{errors.isOpenPassengerGroup.message}</span> : null}
							</div>
						)}
					/>
					<Controller
						name='isOpenReserve'
						control={control}
						render={({ field: { value, onChange } }) => (
							<div className='px-2 border !border-gray-300 rounded-md'>
								<label>رزرو</label>
								<div className='px-4 py-2 text-base bg-white flex flex-col gap-2'>
									{booleanIsActiveValuesArray.map(item => (
										<div key={item.label} className={`flex items-center gap-2 ${value === item.value ? 'text-blue-500' : ''}`}>
											<CustomRadioButton value={item.value} checked={value === item.value} onClick={onChange} />
											<span>{item.label}</span>
										</div>
									))}
								</div>
								{errors.isOpenReserve ? <span className='text-danger'>{errors.isOpenReserve.message}</span> : null}
							</div>
						)}
					/>
					<Controller
						name='isOpenPayment'
						control={control}
						render={({ field: { value, onChange } }) => (
							<div className='px-2 border !border-gray-300 rounded-md'>
								<label>پرداخت</label>
								<div className='px-4 py-2 text-base bg-white flex flex-col gap-2'>
									{booleanIsActiveValuesArray.map(item => (
										<div key={item.label} className={`flex items-center gap-2 ${value === item.value ? 'text-blue-500' : ''}`}>
											<CustomRadioButton value={item.value} checked={value === item.value} onClick={onChange} />
											<span>{item.label}</span>
										</div>
									))}
								</div>
								{errors.isOpenPayment ? <span className='text-danger'>{errors.isOpenPayment.message}</span> : null}
							</div>
						)}
					/>
					<Controller
						name='isActive'
						control={control}
						render={({ field: { value, onChange } }) => (
							<div className='px-2 border !border-gray-300 rounded-md'>
								<label>بروز رسانی</label>
								<div className='px-4 py-2 text-base bg-white flex flex-col gap-2'>
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
					<div className='flex flex-col md:flex-row gap-4 mt-10'>
						<CustomButton variant={'primary'} type={'submit'} label={'ویرایش'} onClick={() => {}} loading={isPending} />
						<CustomButton variant={'danger'} type={'button'} label='انصراف' onClick={onCancel} disabled={isPending} />
					</div>
				</form>
			</div>
		</CustomModal>
	);
};

export default EditConfigModal;
