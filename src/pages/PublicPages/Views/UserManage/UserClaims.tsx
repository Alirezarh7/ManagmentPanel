import React, { ComponentType, useEffect } from 'react';
import { connect } from 'react-redux';
import { IApplicationState } from '../../../../store/state';
import { userManageActions } from '../../Actions/UserManage/action';
import { IUserManageState } from '../../Actions/UserManage/model';
import NapLoading from '../../../../components/general/NapLoading/NapLoading';
import { useTranslation } from 'react-i18next';
import ReturnButton from '../../../../components/general/Buttons/ReturnButton';
import useTitle from '../../../../hooks/useTitle';

type IProps = typeof userManageActions & IUserManageState & { userid: string; title: string };

const RoleClaims = (props: IProps) => {
	useTitle('mainSettings', 'roleClaims');

	const [t] = useTranslation();
	useEffect(() => {
		props.getUserClaimsList(props.userid);
	}, []);
	const goBack = () => {
		window.history.back();
	};
	const submitClaims = () => {
		if (props.userid != '') {
			props.saveUserClaims(props.userid, window.history);
		} else {
			props.pushAlert({ title: t('userError'), description: t('DataIsIncomplete'), variant: 'warning' });
		}
	};
	return (
		<React.Fragment>
			<NapLoading loading={props.accessList.loading || props.userClaimsCreate.loading} />
			<div className='flex overflow-hidden flex-grow-1'>
				<div className='p-4 w-full overflow-auto'>
					<div className='flex flex-col h-100 bg-white shadow-sm overflow-hidden'>
						<div className='panel-subject flex justify-between items-center font-weight-bold border-bottom p-3'>
							{t('userClaims') + ' ' + props.title}
							<div>
								<button className='btn btn-sm btn-success ml-1' onClick={submitClaims}>
									<span className='mdi mdi-18px mdi-check-all ml-1'></span>
									{t('save')}
								</button>
								{/* <button onClick={goBack} className="btn btn-sm btn-outline-secondary">
                                    <span className="mdi mdi-18px mdi-chevron-right"></span>
                                    {t("return")}
                                </button> */}
								<ReturnButton onclick={goBack} customClass='btn-sm' />
							</div>
						</div>
						<div className='p-4 row' style={{ overflowY: 'auto' }}>
							<div className='col-3'>
								<div className='list-group' id='list-tab' role='tablist'>
									{props.accessList.data.map((service: any, i: number) => {
										return (
											<a
												className={'list-group-item list-group-item-action' + (i == 0 ? ' active' : '')}
												id={'list-' + service.serviceName + '-list'}
												data-toggle='list'
												href={'#list-' + service.serviceName}
												role='tab'
												aria-controls={service.serviceName}>
												{service.description}
											</a>
										);
									})}
								</div>
							</div>
							<div className='col-9 card py-3'>
								<div className='tab-content' id='nav-tabContent'>
									{props.accessList.data.map((service: any, i: number) => {
										return (
											<div
												className={'tab-pane fade' + (i == 0 ? ' show active' : '')}
												id={'list-' + service.serviceName}
												role='tabpanel'
												aria-labelledby={'list-' + service.serviceName + '-list'}>
												<div className='card'>
													<div className='card-header'>
														<div className='form-check'>
															<input
																className='form-check-input'
																type='checkbox'
																id={'service-' + service.serviceName}
																checked={service.selected}
																onClick={() => props.setServiceSelected(service.serviceName)}
															/>
															<label
																className='form-check-label mr-3'
																htmlFor={'service-' + service.serviceName}
																onClick={() => props.setServiceSelected(service.serviceName)}>
																{service.description}
															</label>
														</div>
													</div>
													<div className='card-body'>
														<div className='flex flex-col' style={{ width: '100%' }}>
															{service.controllerDatas.map((controllerData: any) => {
																return (
																	<div className='col mt-2'>
																		<div className='card'>
																			<div className='card-header'>
																				<div className='form-check'>
																					<input
																						className='form-check-input'
																						type='checkbox'
																						id={'controller-' + controllerData.controllerName}
																						checked={controllerData.selected}
																						onClick={() =>
																							props.setControllerSelected(service.serviceName, controllerData.controllerName)
																						}
																					/>
																					<label
																						className='form-check-label mr-3'
																						htmlFor={'controller-' + controllerData.controllerName}>
																						{controllerData.description}
																					</label>
																				</div>
																			</div>
																			<div className='card-body'>
																				<div className='row'>
																					{controllerData.actionDatas.map((actionData: any) => {
																						return (
																							<div className='col-4 form-check'>
																								<input
																									className='form-check-input'
																									type='checkbox'
																									id={'action-' + actionData.actionName}
																									checked={actionData.selected}
																									onClick={() =>
																										props.setActionSelected(
																											service.serviceName,
																											controllerData.controllerName,
																											actionData.actionName
																										)
																									}
																								/>
																								<label
																									className='form-check-label mr-3'
																									htmlFor={'action-' + actionData.actionName}>
																									{actionData.description}
																								</label>
																							</div>
																						);
																					})}
																				</div>
																			</div>
																		</div>
																	</div>
																);
															})}
														</div>
													</div>
												</div>
											</div>
										);
									})}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</React.Fragment>
	);
};
export default connect((state: IApplicationState) => state.userManage, userManageActions)(RoleClaims as ComponentType);
