import React, { useState, useEffect, ComponentType } from 'react';
import { connect } from 'react-redux';
import { IApplicationState } from '../../../../store/state';
import { userManageActions } from '../../Actions/UserManage/action';
import { IUserManageState } from '../../Actions/UserManage/model';
import { useTranslation } from 'react-i18next';
import Select from 'react-select';
import useFormControl from '../../../../components/general/NapFormControl/NapFormControl';
import API from '../../../../components/general/baseURL';

type IProps = typeof userManageActions & IUserManageState;

const GenderAuthorization = (props: IProps) => {
	const [isShow, setIsShow] = useState<boolean>(false);
	const [claim, setClaim] = useState<any>(null);
	const [claimId, setClaimId] = useState<any>(null);
	const [allClaims, setAllClaims] = useState<any>(null);

	const [t] = useTranslation();
	const {
		values,
		onChangeHandler,
		onFormSubmit,
		GetError,
		GetValue,
		setValue,
		resetForm,
		setValues,
		setInitialValues,
		GetRequired
	} = useFormControl({
		userId: [],
		claimType: [],
		claimValue: []
	});
	const loadClaims = async () => {
		const result = await API.get('/Accounts/Users/' + props.genderAuthorization.item.id + '/Claims/gender');
		if (result.data.claims && result.data.claims.length > 0) {
			setClaim(result.data.claims[0].claimValue);
			setAllClaims(result.data.claims);
			setClaimId(result.data.claims[0].claimId);
		}
	};
	useEffect(() => {
		props.genderAuthorization.Visible && loadClaims();
		setIsShow(props.genderAuthorization.Visible);
		resetForm();
	}, [props.genderAuthorization.Visible]);

	const FromGroupSubmitHandler = async (e: any) => {
		e.preventDefault();
		if (onFormSubmit()) {
			values.userId = props.genderAuthorization.item.id;
			values.claimType = 'gender';
			values.claimValue = claim;

			if (claimId) {
				API.delete('/Accounts/Users/' + props.genderAuthorization.item.id + `/Claims?claimId=${claimId}`).then(response => {
					try {
						API.post('/Accounts/Users/Claim', values).then(response => {
							if (response.status == 200) {
								props.pushAlert({
									title: 'information',
									description: 'SuccessfulOperation',
									variant: 'success'
								});
								props.toggleGenderAuthorizationModal({}, false);
								setClaim(null);
							}
						});
					} catch (err) {
						props.pushAlert({ title: t('userError'), description: t('DataIsIncomplete'), variant: 'warning' });
					}
				});
			}

			if (!claimId) {
				try {
					API.post('/Accounts/Users/Claim', values).then(response => {
						if (response.status == 200) {
							props.pushAlert({
								title: 'information',
								description: 'SuccessfulOperation',
								variant: 'success'
							});
							props.toggleGenderAuthorizationModal({}, false);
							setClaim(null);
						}
					});
				} catch (err) {
					props.pushAlert({ title: t('userError'), description: t('DataIsIncomplete'), variant: 'warning' });
				}
			}
		}
	};
	const onCloseHandler = () => {
		setIsShow(false);
		setTimeout(() => {
			props.toggleGenderAuthorizationModal({}, false);
		}, 250);
	};

	const genderAuthorizationOptions = [
		{ label: 'زن', value: '1' },
		{ label: 'مرد', value: '2' },
		{ label: 'هردو', value: '3' }
	];

	return (
		<React.Fragment>
			{!props.genderAuthorization.Visible ? (
				''
			) : (
				<div
					className={
						'panel panel-right bg-light border-left p-3 overflow-auto flex flex-col flex-shrink-0 ' + (isShow ? 'open' : '')
					}>
					<h6 className='modal-header'>{t('create')}</h6>
					<form onSubmit={FromGroupSubmitHandler}>
						<div className='form-group'>
							<label htmlFor='genderAuthorization'>{t('genderAuthorization')}</label>
							<Select
								options={genderAuthorizationOptions}
								isRtl={true}
								value={claim ? genderAuthorizationOptions.find(x => x.value === claim) : null}
								onChange={(data: any) => setClaim(data.value)}
								placeholder={t('placeHselect')}
								name='genderAuthorization'
							/>
							<GetError name='genderAuthorization' />
						</div>
						<div className='text-left modal-footer'>
							<button type='button' className='btn btn-sm btn-outline-secondary mr-1' onClick={() => onCloseHandler()}>
								{t('cancel')}
							</button>
							<button type='submit' className='btn btn-sm btn-success px-1'>
								{t('save')}
							</button>
						</div>
					</form>
				</div>
			)}
		</React.Fragment>
	);
};

export default connect((state: IApplicationState) => state.userManage, userManageActions)(GenderAuthorization as ComponentType);
