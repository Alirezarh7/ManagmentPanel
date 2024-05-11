import React, { ComponentType, useState } from 'react';
import { callCompleteInformationActions } from './Tamato/Actions/CallCompleteInformations/action';
import { ICallCompleteInformationState } from './Tamato/Actions/CallCompleteInformations/model';
import { connect } from 'react-redux';
import { IApplicationState } from '../store/state';
import { useNavigate } from 'react-router-dom';
import NapLoading from '../components/general/NapLoading/NapLoading';
import { shareData } from '../shareData';
import CustomButton from '../components/general/Buttons/CustomButton';

type IProps = typeof callCompleteInformationActions & ICallCompleteInformationState;

function ReplaceUser(props: IProps) {
	const [newSsn, setNewSsn] = useState<string>('');
	const [newBirthDate, setNewBirthDate] = useState<string>('');
	const [loading, setLoading] = useState(false);
	const history = useNavigate();
	const replaceUser = () => {
		if (newSsn === '' || newSsn.length !== 10) {
			props.pushAlert({
				description: '',
				title: 'کد ملی نامعتبر است',
				variant: 'danger'
			});
			return;
		}
		if (newBirthDate === '' || newBirthDate.length !== 10) {
			props.pushAlert({
				description: '',
				title: 'تاریخ تولد نامعتبر است',
				variant: 'danger'
			});
			return;
		}
		setLoading(true);
		localStorage.setItem(shareData.CONSTANT.REPLACE_SSN, JSON.stringify(newSsn));
		localStorage.setItem(shareData.CONSTANT.REPLACE_BIRTH_DATE, JSON.stringify(newBirthDate));
		window.location.reload();
		props.pushAlert({
			description: '',
			title: 'بروز رسانی کاربر با موفقیت انجام شد',
			variant: 'success'
		});
	};

	return (
		<>
			<NapLoading loading={loading} />
			<div className='max-w-screen-xl w-full mx-auto'>
				<h4 className='my-3 text-base font-semibold'>بروز رسانی کاربر</h4>
				<div className='mt-4 w-full max-w-[400px] flex flex-col md:flex-row justify-start items-center gap-4'>
					<input
						className='form-control form-control-sm mx-2'
						type='text'
						name='newNationalCode'
						placeholder={'کد ملی'}
						value={newSsn}
						onChange={(value: any) => setNewSsn(value.target.value)}
					/>
					<input
						className='form-control form-control-sm mx-2'
						type='text'
						name='newBirthDate'
						placeholder={'تاریخ تولد میلادی'}
						value={newBirthDate}
						onChange={(value: any) => setNewBirthDate(value.target.value)}
					/>
					<CustomButton variant={'primary'} type={'button'} label='تایید' onClick={replaceUser} />
				</div>
			</div>
		</>
	);
}

export default connect(
	(state: IApplicationState) => state.callCompleteInformation,
	callCompleteInformationActions
)(ReplaceUser as ComponentType);
