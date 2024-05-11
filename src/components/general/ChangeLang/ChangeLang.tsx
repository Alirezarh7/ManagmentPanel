import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import cookie from 'react-cookies';

const ChangeLang = () => {
	const [t, i18n] = useTranslation();
	const [lang, setLang] = useState<string>(cookie.load('lang'));

	useEffect(() => {
		changeLanguage(lang);
	}, []);

	const changeLanguage = (lng: any) => {
		i18n.changeLanguage(lng);
	};

	const handleChange = (e: any) => {
		changeLanguage(e.target.value);
		setLang(e.target.value);
		cookie.save('lang', e.target.value, { path: '/' });
	};
	return (
		<div className='form-group col-3 col-md-4 flex mx-3 text-left'>
			<label className='inline-flex col-6 col-lg-6 col-md-3 text-left mt-2'>{t('language')}:</label>
			<select id='RootLang' className='form-control col-3 col-md-4 text-center' defaultValue={lang} onChange={handleChange}>
				{' '}
				<option value='fa'>{t('persian')}</option>
				<option value='en'>{t('english')}</option>
			</select>
		</div>
	);
};

export default ChangeLang;
