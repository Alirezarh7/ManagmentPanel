import React from 'react';
import { useTranslation } from 'react-i18next';

const NapNoAccessPage = () => {
	const [t] = useTranslation();
	return (
		<div className='flex flex-col flex-root flex-grow-1'>
			<div
				className='w-full flex flex-row-fluid bgi-size-cover bgi-position-center'
				style={{ backgroundImage: 'url("content/images/401.jpg")' }}>
				<div className='flex flex-col flex-row-fluid text-center'>
					<h1 className='error-title font-weight-boldest text-white mb-12 mt-5' style={{ fontSize: '10rem' }}>
						401
					</h1>
					<p className='display-4 font-weight-bold text-white' style={{ width: '100%' }}>
						{t('UnauthorizedError')}
					</p>
				</div>
			</div>
		</div>
	);
};

export default NapNoAccessPage;
