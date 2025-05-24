import React, {ComponentType} from 'react';
import {Link} from 'react-router-dom';
import {useTranslation} from 'react-i18next';
import userManager from '../../../../store/userManager';
import {IApplicationState} from '../../../../store/state';
import {connect} from 'react-redux';
import {dashboardActions} from '../../../../pages/PublicPages/Actions/Dashboard/action';
import ChangePass from '../../../../pages/PublicPages/Views/User/ChangePass';
import NapLoading from '../../../general/NapLoading/NapLoading';
import {shareData} from '../../../../shareData';
import {MdAccountBox} from "react-icons/md";
import {TbLogout} from "react-icons/tb";

type IProps = typeof dashboardActions & IApplicationState;

const LogOut = ({oidc,toggleLogoutConfirm,clearUserClaims,dashboard}: IProps) => {
  const [t] = useTranslation();
  const logout = (event: any) => {
    event.preventDefault();
    window.localStorage.getItem(shareData.CONSTANT.SSO_APPROACH) === 'organization' && userManager.signoutRedirect();
    userManager.removeUser();
    userManager.clearStaleState();
    clearUserClaims();
    window.localStorage.getItem(shareData.CONSTANT.SSO_APPROACH) === 'mygov' && window.location.reload();
    localStorage.clear();
    window.location.replace('/');
  };
  const oidcUserString: any = localStorage.getItem(shareData.CONSTANT.GOV_STORAGE_KEY)
    ? localStorage.getItem(shareData.CONSTANT.GOV_STORAGE_KEY)
    : localStorage.getItem(shareData.ORGANIZATION_STORAGE_KEY);
  const oidcUser = JSON.parse(oidcUserString);
  const nationalCode = oidcUser.profile?.nationalCode;
  const vipNationCode: any = {
    alireza: '0020537352',
    ghahri: '3932822404',
    moltamesi: '4132346064',
    fekri: '0017375525',
    moazen: '0062263668',
    arsalanNori: '0022143602',
    sehat: '0062138741',
    aminzade: '0071740988',
    safi: '0011073519',
    taheri: '3490010086'
  };

  const isVipUser = Object.values(vipNationCode).includes(nationalCode);

  return (
    <React.Fragment>
      <div className='dropdown inline mx-2  border p-2 rounded-md shadow-sm'>
				<span
          className='dropdown-toggle cup'
          id='dropdownMenuButton'
          data-toggle='dropdown'
          aria-haspopup='true'
          aria-expanded='false'>
					<span className='mdi mdi-account-outline line-height-20px mdi-20px ml-1'></span>
					<span>
						{oidc.user?.profile?.firstName} {oidc.user?.profile?.lastName}
					</span>
				</span>
        <div className='dropdown-menu shadow border-0' aria-labelledby='dropdownMenuButton'>
          <Link
            className='dropdown-item flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100'
            to={'/user-information'} title={t('userAccount')}>
            <MdAccountBox/>
            {t('userAccount')}
          </Link>
          {isVipUser && (
            <Link className='dropdown-item' to={'/replace-user'} title={'بروز رسانی کاربر'}>
              {'بروز رسانی کاربر'}
            </Link>
          )}
          <button
            className='dropdown-item flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100'
            onClick={event => logout(event)}>
            <TbLogout/>
            {t('logOut')}
          </button>
        </div>
      </div>
      <ChangePass/>
      <NapLoading loading={dashboard.userPassUpdate.loading}/>
    </React.Fragment>
  );
};

export default connect((state: IApplicationState) => state, dashboardActions)(LogOut as ComponentType);
