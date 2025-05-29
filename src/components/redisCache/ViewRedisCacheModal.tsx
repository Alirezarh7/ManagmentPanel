import React from 'react';
import CustomModal from '../general/Modal/CustomModal';
import CustomButton from '../general/Buttons/CustomButton';
import { useGetRedisCacheValue } from '../../services/redis.service';
import CustomInput from '../general/inputs/CustomInput';
import CustomTextArea from '../general/inputs/CustomTextArea';

interface IProps {
	cacheKey: string;
	isOpen: boolean;
	onSuccess: () => void;
	onCancel: () => void;
}

const ViewRedisCacheModal = ({ cacheKey, isOpen, onSuccess, onCancel }: IProps) => {
	const { data: cacheValue, isLoading, isFetching, isError } = useGetRedisCacheValue(cacheKey);

	const isFormInLoadingState = isLoading || isFetching;

	return (
		<CustomModal isOpen={isOpen} title='مشاهده محتویات کش ردیس' onDismiss={onCancel} >
			<div className={`flex flex-col gap-6 ${isFormInLoadingState ? 'blur-sm pointer-events-none' : ''}`}>
				<p className='text-lg rtl'>مشاهده محتویات کش ردیس</p>
				<CustomInput
					type={'text'}
					label='کلید'
					className='w-full'
					inputClassName='text-left'
					value={cacheKey}
					onChange={() => {}}
					disabled={true}
				/>
				<CustomTextArea
					label='مقدار'
					className='w-full'
					inputClassName='text-left ltr'
					value={cacheValue !== undefined ? JSON.stringify(cacheValue) : ''}
					onChange={() => {}}
					disabled={true}
				/>
				<div className='flex flex-col md:flex-row gap-4 mt-10'>
					<CustomButton variant={'Cancel'} type={'button'} label='بستن' onClick={onCancel} disabled={isFormInLoadingState} />
				</div>
			</div>
		</CustomModal>
	);
};

export default ViewRedisCacheModal;
