import React from 'react';
import { useTranslation } from 'react-i18next';
import './styles.css';
import Select from 'react-select';
import { Divider } from 'antd';
import { shareData } from '../../../../../shareData';

interface IProps {
	handleChangeTab: (event: any, state: string) => void;
	formControl: any;
}

const Completation = (props: IProps) => {
	const { t } = useTranslation();
	const formControl = props.formControl;

	const removeAllValues = (value: React.ChangeEvent<HTMLInputElement>) => {
		if (value.target.checked) {
			formControl.values.heartDisease = false;
			formControl.values.epilepsy = false;
			formControl.values.wheelchair = false;
			formControl.values.respiratoryDisease = false;
			formControl.values.diabetes = false;
			formControl.values.alzheimer = false;
		}
	};

	return (
		<form
			onSubmit={e => props.handleChangeTab(e, 'passport')}
			className='w-full p-md-5 p-3 m-auto mx-md-0 mx-5 flex items-center flex-col'>
			<div className='row w-full'>
				<div className='form-group col-lg-4'>
					<label htmlFor='mariagesStatus'>
						{t('marriageStatus')}
						<span className='text-danger mr-1'>*</span>
					</label>
					<Select
						options={shareData.martialStatus}
						isRtl={true}
						value={formControl.values ? formControl.values.mariagesStatus : null}
						onChange={(data: any) => {
							formControl.setValue('mariagesStatus', data);
						}}
						placeholder={t('placeHselect')}
					/>
					<formControl.GetError name='mariagesStatus' />
				</div>
				<div className='form-group col-lg-4'>
					<label htmlFor='education'>
						{t('education')}
						<span className='text-danger mr-1'>*</span>
					</label>
					<Select
						options={shareData.education}
						isRtl={true}
						value={formControl.values ? formControl.values.education : null}
						onChange={(data: any) => {
							formControl.setValue('education', data);
						}}
						placeholder={t('placeHselect')}
					/>
					<formControl.GetError name='education' />
				</div>
				<div className='form-group col-lg-4'>
					<label htmlFor='job'>
						{t('work')}
						<span className='text-danger mr-1'>*</span>
					</label>
					<Select
						options={shareData.jobs}
						isRtl={true}
						value={formControl.values ? formControl.values.job : null}
						onChange={(data: any) => {
							formControl.setValue('job', data);
						}}
						placeholder={t('placeHselect')}
					/>
					<formControl.GetError name='job' />
				</div>
				<div className='form-group col-lg-4'>
					<label htmlFor='religion'>
						{t('religion')}
						<span className='text-danger mr-1'>*</span>
					</label>
					<Select
						options={shareData.religion}
						isRtl={true}
						value={formControl.values ? formControl.values.religion : null}
						onChange={(data: any) => {
							formControl.setValue('religion', data);
						}}
						placeholder={t('placeHselect')}
					/>
					<formControl.GetError name='religion' />
				</div>
				<div className='form-group col-lg-4'>
					<label htmlFor='marja'>
						{t('marja')}
						<span className='text-danger mr-1'>*</span>
					</label>
					<Select
						name={'marja'}
						options={shareData.marja}
						isRtl={true}
						value={formControl.values ? formControl.values.marja : null}
						onChange={(data: any) => {
							formControl.setValue('marja', data);
						}}
						placeholder={t('placeHselect')}
					/>
					<formControl.GetError name='marja' />
				</div>
				<div className='form-group col-lg-4'>
					<label htmlFor='bloodType'>
						{t('bloodType')}
						<span className='text-danger mr-1'>*</span>
					</label>
					<Select
						options={shareData.bloodTypes}
						isRtl={true}
						value={formControl.values ? formControl.values.bloodType : null}
						onChange={(data: any) => {
							formControl.setValue('bloodType', data);
						}}
						placeholder={t('placeHselect')}
					/>
					<formControl.GetError name='bloodType' />
				</div>
				<Divider />
				<p>اطلاعات بیماری</p>
				<div className='flex items-center jusitfy-content-md-evenly jusitfy-content-center w-full'>
					<div className='mx-md-4 mx-1 flex flex-md-row flex-col items-center jusityf-content-center'>
						<input
							type={'checkbox'}
							name='heartDisease'
							checked={formControl.values.heartDisease}
							onChange={value => {
								formControl.values.none = false;
								formControl.onChangeHandler(value);
							}}
						/>
						<span className='mr-2'>{t('heartDisease')}</span>
					</div>
					<div className='mx-md-4 mx-1 flex flex-md-row flex-col items-center jusityf-content-center'>
						<input
							type={'checkbox'}
							name='epilepsy'
							checked={formControl.values.epilepsy}
							onChange={value => {
								formControl.values.none = false;
								formControl.onChangeHandler(value);
							}}
						/>
						<span className='mr-2'>{t('epilepsy')}</span>
					</div>
					<div className='mx-md-4 mx-1 flex flex-md-row flex-col items-center jusityf-content-center'>
						<input
							type={'checkbox'}
							name='wheelchair'
							checked={formControl.values.wheelchair}
							onChange={value => {
								formControl.values.none = false;
								formControl.onChangeHandler(value);
							}}
						/>
						<span className='mr-2'>{t('wheelchair')}</span>
					</div>
					<div className='mx-md-4 mx-1 flex flex-md-row flex-col items-center jusityf-content-center'>
						<input
							type={'checkbox'}
							name='respiratoryDisease'
							checked={formControl.values.respiratoryDisease}
							onChange={value => {
								formControl.values.none = false;
								formControl.onChangeHandler(value);
							}}
						/>
						<span className='mr-2'>{t('respiratoryDisease')}</span>
					</div>
				</div>
				<div className='flex items-center jusitfy-content-md-evenly jusitfy-content-center w-full mt-3'>
					<div className='mx-md-4 mx-1 flex flex-md-row flex-col items-center jusityf-content-center'>
						<input
							type={'checkbox'}
							name='diabetes'
							checked={formControl.values.diabetes}
							onChange={value => {
								formControl.values.none = false;
								formControl.onChangeHandler(value);
							}}
						/>
						<span className='mr-2'>{t('diabetes')}</span>
					</div>
					<div className='mx-md-4 mx-1 flex flex-md-row flex-col items-center jusityf-content-center'>
						<input
							type={'checkbox'}
							name='alzheimer'
							checked={formControl.values.alzheimer}
							onChange={value => {
								formControl.values.none = false;
								formControl.onChangeHandler(value);
							}}
						/>
						<span className='mr-2'>{t('alzheimer')}</span>
					</div>
					<div className='mx-md-4 mx-1 flex flex-md-row flex-col items-center jusityf-content-center'>
						<input
							type={'checkbox'}
							name='none'
							checked={formControl.values.none}
							onChange={value => {
								removeAllValues(value);
								formControl.onChangeHandler(value);
							}}
						/>
						<span className='mr-2'>{t('noDisease')}</span>
					</div>
				</div>
			</div>
			{/*  <div className='w-full flex items-center justify-end mt-5'>
                <button className='btn btn-success accept_and_next_level' type='submit'> مرحله بعد</button>
            </div>*/}
		</form>
	);
};

export default Completation;
