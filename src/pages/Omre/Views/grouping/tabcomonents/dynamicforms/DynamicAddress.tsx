import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

interface IInternalProps {
	addressHandler: (neState: any, index: number) => void;
	address: any;
}
const DynamicAddress = (props: IInternalProps) => {
	const { t } = useTranslation();
	// const formControl = props.formControl;
	const [values, setValues] = useState({
		postalCode: props.address && props.address.postalCode,
		landLine: props.address && props.address.landLine,
		detail: props.address && props.address.detail,
		id: props.address && props.address.id
	});
	return (
		<>
			<div className='row w-full'>
				<div className='form-group col-md-4 col-12 flex items-end'>
					<div>
						<label htmlFor='postalCode'>{t('zipCode')}</label>
						<input
							className='form-control form-control-sm'
							type='text'
							name='postalCode'
							value={values.postalCode}
							onChange={e => {
								setValues({
									...values,
									postalCode: e.target.value
								});
								props.addressHandler({ ...values, postalCode: e.target.value }, props.address.id);
							}}
							placeholder={t('placeHenter')}
						/>
					</div>
				</div>
				<div className='form-group col-md-4 col-12'>
					<label htmlFor='landline'>{t('landlinePhone')}</label>
					<input
						className='form-control form-control-sm'
						type='text'
						name='landline'
						value={values.landLine}
						onChange={e => {
							setValues({
								...values,
								landLine: e.target.value
							});
							props.addressHandler({ ...values, landLine: e.target.value }, props.address.id);
						}}
						placeholder={t('placeHenter')}
					/>
				</div>
				<div className='form-group col-md-8 col-12'>
					<label htmlFor='detail'>{t('address')}</label>
					<input
						className='form-control form-control-sm'
						type='text'
						name='detail'
						value={values.detail}
						disabled
						placeholder={t('placeHenter')}
					/>
				</div>
			</div>
		</>
	);
};

export default DynamicAddress;
