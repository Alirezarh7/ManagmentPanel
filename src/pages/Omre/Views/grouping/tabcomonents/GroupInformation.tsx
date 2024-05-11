import React from 'react';
import { useTranslation } from 'react-i18next';
import './styles.css';
import Select from 'react-select';

interface IProps {
	handleChangeTab: (event: any, state: string) => void;
	formControl: any;
}

const GroupInformation = (props: IProps) => {
	const { t } = useTranslation();
	const formControl = props.formControl;

	return (
		<form onSubmit={e => props.handleChangeTab(e, 'address')} className='w-full p-md-5 p-3 m-auto mx-md-0 mx-5'>
			<div className='form-group col-lg-4'>
				<label htmlFor='relationWithManager'>
					{t('relationWithManager')}
					<span className='text-danger mr-1'>*</span>
				</label>
				<Select
					// options={props.provinceList.data}
					isRtl={true}
					value={formControl.values ? formControl.values.relationWithManager : null}
					onChange={(data: any) => {
						formControl.setValue('relationWithManager', data);
					}}
					placeholder={t('placeHselect')}
				/>
				<formControl.GetError name='relationWithManager' />
			</div>
		</form>
	);
};

export default GroupInformation;
