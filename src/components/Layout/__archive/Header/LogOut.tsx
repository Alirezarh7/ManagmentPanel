import React, {ComponentType, useRef, useState} from 'react';
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
import {RiArrowDropDownLine, RiArrowDropUpLine} from "react-icons/ri";

type IProps = typeof dashboardActions & IApplicationState;

const LogOut = ({oidc,clearUserClaims,dashboard}: IProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [t] = useTranslation();
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
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
      <NapLoading loading={dashboard.userPassUpdate.loading}/>
      <div className="z-10 mx-2 md:mx-10">
        <div ref={dropdownRef}>
          <button
            type="button"
            className="w-fit h-10 items-center text-sm font-medium rounded-lg border border-goldColor bg-white text-gray-800 shadow-sm hover:bg-gray-50"
            onClick={toggleDropdown}>
            <div className="flex justify-around w-full items-center ">
              <strong className="font-weight-bold text-gray-800 px-4">
                {oidc.user?.profile?.firstName} {oidc.user?.profile?.lastName}
              </strong>
              <div className="border-r p-1 border-goldColor">
                {isOpen ? (
                  <RiArrowDropUpLine className="h-6 w-6 text-goldColor "/>
                ) : (
                  <RiArrowDropDownLine className="h-6 w-6 text-goldColor "/>
                )}
              </div>
            </div>
          </button>
          <div className={`${!isOpen ? 'hidden' : ''} w-fit mt-2 py-2 p-2 absolute rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5`}>
            <Link
              className='w-full flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100'
              to={'/user-information'} title={t('userAccount')}>
              <MdAccountBox/>
              {t('userAccount')}
            </Link>
          <button
            className='w-full flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100'
            onClick={event => logout(event)}>
            <TbLogout/>
            {t('logOut')}
          </button>
        </div>
      </div>
      <ChangePass/>

      </div>
    </React.Fragment>
  );
};

export default connect((state: IApplicationState) => state, dashboardActions)(LogOut as ComponentType);
