import * as React from 'react';
import { SignoutResponse } from 'oidc-client';
import userManager from '../../../../store/userManager';
import { useNavigate } from 'react-router-dom';
import { SignoutCallbackComponent } from 'redux-oidc';
import { useTranslation } from 'react-i18next';
import NapLoading from '../../../../components/general/NapLoading/NapLoading';

const SignOutCallbackPage = () => {
  const [t] = useTranslation()
  const history = useNavigate();

  const successCallback = (response: SignoutResponse) => {
    userManager.removeUser();
    localStorage.clear();
    userManager.clearStaleState();
    userManager.signinRedirect({ data: { path: "/" } });
  };

  const errorCallback = (error: Error) => {
    //console.log(error);
    history('/');
  };

  return (
      // @ts-ignore
    <SignoutCallbackComponent userManager={userManager} successCallback={successCallback} errorCallback={errorCallback}>
      <NapLoading loading={true} description={t("logOut")} />
    </SignoutCallbackComponent>
  )
};

export default SignOutCallbackPage;
