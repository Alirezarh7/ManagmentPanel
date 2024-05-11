import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
	const [t] = useTranslation();
	return (
		<div className='flex overflow-hidden flex-grow-1'>
			<div className='w-full bgi-size-cover bgi-no-repeat' style={{ backgroundImage: 'url("content/images/404.jpg")' }}>
				<h1 className='font-weight-boldest text-dark-75 mt-5 ml-5' style={{ fontSize: '10rem', textAlign: 'left' }}>
					404
				</h1>
				<p className='font-size-h3 text-muted font-weight-normal ml-5' style={{ fontSize: '1.5rem', textAlign: 'left' }}>
					{t('notFoundPage')}
				</p>
				<div className='flex items-end justify-end'>
					<Link className='btn btn-dark' style={{ marginLeft: '95px' }} to={'/'}>
						برگرد به صفحه اصلی
					</Link>
				</div>
			</div>
		</div>
	);
};

export default NotFoundPage;
