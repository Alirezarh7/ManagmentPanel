import React, { useEffect } from 'react';
import CustomModal from '../general/Modal/CustomModal';
import CustomButton from '../general/Buttons/CustomButton';
import { enqueueSnackbar } from 'notistack';
import * as Yup from 'yup';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEditRedisCache, useGetRedisCacheValue } from '../../services/redis.service';
import { IRedisCacheDto } from '../../typs/redisCache.types';
import CustomInput from '../general/inputs/CustomInput';
import CustomTextArea from '../general/inputs/CustomTextArea';
import { useQueryClient } from '@tanstack/react-query';

interface IProps {
	cacheKey: string;
	isOpen: boolean;
	onSuccess: () => void;
	onCancel: () => void;
	acceptLabel?: string;
	cancelLabel?: string;
}

const EditRedisCacheModal = ({ cacheKey, isOpen, onSuccess, onCancel }: IProps) => {
	const { data: cacheValue, isLoading, isFetching, isError } = useGetRedisCacheValue(cacheKey);
	const { mutate, isPending } = useEditRedisCache();
	const queryClient = useQueryClient();

	const defaultFormValues: IRedisCacheDto = {
		key: cacheKey,
		value: ''
	};

	const isFormInLoadingState = isLoading || isFetching || isPending;

	const formSchema = Yup.object().shape({
		key: Yup.string().required('این فیلد اجباری است'),
		value: Yup.string().required('این فیلد اجباری است')
	});

	const {
		control,
		handleSubmit,
		setValue,
		formState: { errors }
	} = useForm<IRedisCacheDto>({
		defaultValues: defaultFormValues,
		resolver: yupResolver(formSchema)
	});

	useEffect(() => {
		if (cacheValue != undefined) {
			setValue('value', JSON.stringify(cacheValue));
		}
	}, [cacheValue]);

	const onSubmitFormHandler = (data: IRedisCacheDto) => {
		mutate(data, {
			onSuccess: () => {
				enqueueSnackbar('مقادیر وارد شده با موفقیت در ردیس ذخیره شدند', { variant: 'success' });
				queryClient.invalidateQueries({
					queryKey: ['getRedisCacheKeys']
				});
				onSuccess();
			},
			onError: error => {
				enqueueSnackbar('خطا در ذخیره مقادیر وارد شده ', { variant: 'error' });
			}
		});
	};

	return (
		<CustomModal isOpen={isOpen} title='ویرایش محتویات کش ردیس' onDismiss={onCancel} size={'xlg'}>
			<div className='m-3 flex flex-col gap-4 '>
				<p className='text-lg'>لطفا محتویات کش مورد نظر را ویرایش کنید</p>
				<form
					className={`flex flex-col gap-6 ${isFormInLoadingState ? 'blur-sm pointer-events-none' : ''}`}
					onSubmit={handleSubmit(onSubmitFormHandler)}>
					<Controller
						name='key'
						control={control}
						render={({ field: { value, onChange } }) => (
							<div className='px-2'>
								<CustomInput
									type={'text'}
									label='کلید'
									className='w-full'
									inputClassName='text-left'
									value={value}
									onChange={onChange}
									error={errors.key?.message}
								/>
							</div>
						)}
					/>
					<Controller
						name='value'
						control={control}
						render={({ field: { value, onChange } }) => (
							<div className='px-2'>
								<CustomTextArea
									label='مقدار'
									className='w-full'
									inputClassName='text-left ltr'
									value={value}
									onChange={onChange}
									error={errors.key?.message}
								/>
							</div>
						)}
					/>

					<div className='flex flex-col md:flex-row gap-4 mt-10'>
						<CustomButton
							variant={'primary'}
							type={'submit'}
							label={'ویرایش'}
							onClick={() => {}}
							loading={isFormInLoadingState}
						/>
						<CustomButton variant={'danger'} type={'button'} label='انصراف' onClick={onCancel} disabled={isFormInLoadingState} />
					</div>
				</form>
			</div>
		</CustomModal>
	);
};

export default EditRedisCacheModal;
