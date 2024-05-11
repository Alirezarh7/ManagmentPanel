import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import userManager from '../../../../store/userManager';

const LogIn = () => {
	const history = useLocation();
	const [t] = useTranslation();
	const login = () => {
		userManager.signinRedirect({
			data: { path: history.pathname }
		});
	};
	return (
		<a className='link text-info' onClick={login}>
			<span className='mdi mdi-18px mdi-login ml-1'></span>
			{t('login')}
		</a>
	);
};

export default LogIn;
