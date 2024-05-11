import React, { ComponentType } from 'react';
import { connect } from 'react-redux';

import { IApplicationState } from '../../../../store/state';
import { useTranslation } from 'react-i18next';
import { dashboardActions } from '../../Actions/Dashboard/action';
import './UserInfoData.css';

type IProps = typeof dashboardActions & IApplicationState;
type DataType = {
	firstName: string;
	lastName: string;
	fatherName: string;
	birthDatePersian: string;
	nationalCode: string;
	mobileNo: string;
	sex: string;
	postalCode: string;
	provinceName: string;
	address: string;
	[key: string]: string | number;
};

const UserInfo = (props: IProps) => {
	const [t] = useTranslation();

	// useEffect(() => {
	//   props.oidc.user.profile
	// }, [])

	const renderInputs = () => {
		if (!props.oidc.user.profile) {
			return null;
		}

		const userData = props.oidc.user.profile;

		const desiredFields = [
			'نام',
			'نام خانوادگی',
			'نام پدر',
			'تاریخ تولد',
			'کدملی',
			'شماره همراه',
			'جنسیت',
			'کد پستی',
			'استان',
			'آدرس'
		];

		const valuess = [
			'firstName',
			'lastName',
			'fatherName',
			'birthDatePersian',
			'nationalCode',
			'mobileNo',
			'sex',
			'postalCode',
			'provinceName',
			'address'
		];

		const sex = userData.sex === 'Man' ? 'مرد' : 'زن';
		console.log(userData);

		const inputFields = desiredFields.map((key, index) => {
			const label = t(key);
			const value = key === 'جنسیت' ? sex : (userData as any)[valuess[index]];
			return (
				<div key={key} className='mb-3 col-6'>
					<label className='form-label'>{label}</label>
					<input type='text' className='form-control' value={value} readOnly />
				</div>
			);
		});

		return inputFields;
	};

	return (
		<>
			<div className='max-w-screen-xl w-full mx-auto flex flex-col'>
				<h4 className='my-3 text-base font-semibold'>{t('userinformation')}</h4>
				<div className=' p-4 relative flex-grow-1' style={{ overflowY: 'auto' }}>
					<form className='row'>{renderInputs()}</form>
				</div>
			</div>
		</>
	);
};

export default connect((state: IApplicationState) => state, dashboardActions)(UserInfo as ComponentType);
