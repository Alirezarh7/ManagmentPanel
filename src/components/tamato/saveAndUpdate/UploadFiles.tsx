import React, { ComponentType, useEffect, useReducer } from 'react';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { IApplicationState } from '../../../store/state';
import '../myDocuments/callCompleteInformations.css';
import { useLocation } from 'react-router-dom';
import { callCompleteInformationActions } from '../../../pages/Tamato/Actions/CallCompleteInformations/action';
import { ICallCompleteInformationState } from '../../../pages/Tamato/Actions/CallCompleteInformations/model';
import NapLoading from '../../general/NapLoading/NapLoading';
import { global_getBase64 } from '../../../shareData/fn';
import NapAlerts from '../../general/NapAlerts/NapAlerts';

type IProps = typeof callCompleteInformationActions &
	ICallCompleteInformationState & {
		onNext: () => void;
		onPrev: () => void;
	};

function reducer(state: any, action: any) {
	switch (action.type) {
		case '@@type/NationalCardFrontPage': {
			return {
				...state,
				NationalCardFrontPage: {
					title: 'NationalCardFrontPage',
					form: action.payload.form,
					base64: action.payload.base64,
					edited: action.payload.edited,
					attachmentType: action.payload.attachmentType
				}
			};
		}
		case '@@type/NationalCardBackPage': {
			return {
				...state,
				NationalCardBackPage: {
					title: 'NationalCardBackPage',
					form: action.payload.form,
					base64: action.payload.base64,
					edited: action.payload.edited,
					attachmentType: action.payload.attachmentType
				}
			};
		}
		case '@@type/DepositDocument': {
			return {
				...state,
				DepositDocument: {
					title: 'DepositDocument',
					form: action.payload.form,
					base64: action.payload.base64,
					edited: action.payload.edited,
					attachmentType: action.payload.attachmentType
				}
			};
		}
		case '@@type/IdentityCertificateDescPage': {
			return {
				...state,
				IdentityCertificateDescPage: {
					title: 'IdentityCertificateDescPage',
					form: action.payload.form,
					base64: action.payload.base64,
					edited: action.payload.edited,
					attachmentType: action.payload.attachmentType
				}
			};
		}
		case '@@type/IdentityCertificateFirstPage': {
			return {
				...state,
				IdentityCertificateFirstPage: {
					title: 'IdentityCertificateFirstPage',
					form: action.payload.form,
					base64: action.payload.base64,
					edited: action.payload.edited,
					attachmentType: action.payload.attachmentType
				}
			};
		}
	}
	return state;
}

const initialState = {
	NationalCardFrontPage: {
		title: '',
		form: null,
		base64: '',
		edited: false,
		attachmentType: 1
	},
	NationalCardBackPage: {
		title: '',
		form: null,
		base64: '',
		edited: false,
		attachmentType: 2
	},
	DepositDocument: {
		title: '',
		form: null,
		base64: '',
		edited: false,
		attachmentType: 5
	},
	IdentityCertificateDescPage: {
		title: '',
		form: null,
		base64: '',
		edited: false,
		attachmentType: 4
	},
	IdentityCertificateFirstPage: {
		title: '',
		form: null,
		base64: '',
		edited: false,
		attachmentType: 3
	}
};

const UploadFiles = (props: IProps) => {
	const [t] = useTranslation();
	const location = useLocation();
	const [state, dispatch] = useReducer(reducer, initialState);
	const formData = new FormData();

	const fileChangeHandler = async (file: React.ChangeEvent<HTMLInputElement>): Promise<void> => {
		const name = file.target.name;
		file.persist();
		const base64: any = await global_getBase64((file.target.files as any)[0]);
		dispatch({
			type: `@@type/${name}`,
			payload: {
				form: (file.target.files as any)[0],
				base64,
				edited: true,
				attachmentType:
					name === 'NationalCardFrontPage'
						? '1'
						: name === 'NationalCardBackPage'
							? '2'
							: name === 'IdentityCertificateFirstPage'
								? '3'
								: name === 'IdentityCertificateDescPage'
									? '4'
									: name === 'DepositDocument'
										? '5'
										: null
			}
		});
	};

	/*    const identityCertificateFirstPageFileHandler = async (file: React.ChangeEvent<HTMLInputElement>): Promise<void> => {
            console.log(file.target.name)
            file.persist();
            const base64: any = await global_getBase64((file.target.files as any)[0]);
            dispatch({
                type: '@@type/IdentityCertificateFirstPage',
                payload: {form: (file.target.files as any)[0], base64, edited: true}
            });
        }
        const identityCertificateDescPageFileHandler = async (file: React.ChangeEvent<HTMLInputElement>): Promise<void> => {
            file.persist();
            const base64 = await global_getBase64((file.target.files as any)[0]);
            dispatch({
                type: '@@type/IdentityCertificateDescPage',
                payload: {form: (file.target.files as any)[0], base64, edited: true}
            });
        }
        const depositDocumentFileHandler = async (file: React.ChangeEvent<HTMLInputElement>): Promise<void> => {
            file.persist();
            const base64 = await global_getBase64((file.target.files as any)[0]);
            dispatch({
                type: '@@type/DepositDocument',
                payload: {form: (file.target.files as any)[0], base64, edited: true}
            });
        }
        const nationalCardBackPageFileHandler = async (file: React.ChangeEvent<HTMLInputElement>): Promise<void> => {
            file.persist();
            const base64 = await global_getBase64((file.target.files as any)[0]);
            dispatch({
                type: '@@type/NationalCardBackPage',
                payload: {form: (file.target.files as any)[0], base64, edited: true}
            });
        }
        const nationalCardFrontPageFileHandler = async (file: React.ChangeEvent<HTMLInputElement>): Promise<void> => {
            file.persist();
            const base64 = await global_getBase64((file.target.files as any)[0]);
            dispatch({
                type: '@@type/NationalCardFrontPage',
                payload: {form: (file.target.files as any)[0], base64, edited: true}
            });
        }*/

	useEffect(() => {
		props.getUploadDocuments((location.state as any).zaernumber);
	}, []);

	const createSubmitHandler = (e: any) => {
		const getKeys: any[] = [
			state.NationalCardFrontPage,
			state.NationalCardBackPage,
			state.IdentityCertificateFirstPage,
			state.IdentityCertificateDescPage,
			state.DepositDocument
		];
		formData.append('Zaernumber', (location.state as any).zaernumber);
		formData.append('AttachmentTypes', state.NationalCardFrontPage.attachmentType);
		formData.append('AttachmentTypes', state.NationalCardBackPage.attachmentType);
		formData.append('AttachmentTypes', state.IdentityCertificateFirstPage.attachmentType);
		formData.append('AttachmentTypes', state.IdentityCertificateDescPage.attachmentType);
		formData.append('AttachmentTypes', state.DepositDocument.attachmentType);
		formData.append('File', state.NationalCardFrontPage.form);
		formData.append('File', state.NationalCardBackPage.form);
		formData.append('File', state.IdentityCertificateFirstPage.form);
		formData.append('File', state.IdentityCertificateDescPage.form);
		formData.append('File', state.DepositDocument.form);

		const validation = getKeys.find(key => key.title === '');
		if (validation) {
			props.pushAlert({
				title: t('userError'),
				description: t('DataIsIncomplete'),
				variant: 'warning'
			});
		} else {
			props.setUploadDocuments(formData, props.onNext);
		}
	};

	const editSubmitHandler = (): void => {
		const stateToList: [string, any][] = Object.entries(state);
		const filterAttachEdited: [string, any][] = stateToList.filter(eachArray => eachArray.find(obj => obj.edited === true));
		if (filterAttachEdited.length) {
			Promise.all(
				filterAttachEdited.map((value: any[], index) => {
					return new Promise((resolve): void => {
						const formData = new FormData();
						resolve(index);
						formData.append('Zaernumber', (location.state as any).zaernumber);

						if (props.previewDocuments.files.find(prevDoc => prevDoc.attachmentType === Number(state[value[0]].attachmentType))) {
							formData.append('AttachmentTypes', value[0]);
						} else {
							formData.append(
								'AttachmentTypes',
								value[0] === 'NationalCardFrontPage'
									? '1'
									: value[0] === 'NationalCardBackPage'
										? '2'
										: value[0] === 'IdentityCertificateFirstPage'
											? '3'
											: value[0] === 'IdentityCertificateDescPage'
												? '4'
												: value[0] === 'DepositDocument'
													? '5'
													: 'null'
							);
						}
						formData.append('File', value[1].form);
						if (props.previewDocuments.files.find(prevDoc => prevDoc.attachmentType === Number(state[value[0]].attachmentType))) {
							props.updateDocuments(formData);
						} else {
							props.setUploadDocuments(formData);
						}
					});
				})
			).then((): void => {
				/*  props.pushAlert({
                      title: 'فایل های بارگزاری شده با موفقیت بروز رسانی شدند',
                      variant: "success",
                      description: ""
                  })*/
				props.onNext();
			});
		} else {
			props.onNext();
		}
	};
	return (
		<>
			<NapAlerts alerts={props.alerts} clearAlerts={props.clearAlerts} />
			<NapLoading loading={props.uploadDocuments.loading || props.previewDocuments.loading} />
			<div className='flex items-center justify-start flex-wrap'>
				<div className='file-input-wrapper flex items-start flex-col justify-center mx-4 my-5'>
					تصویر صفحه اول شناسنامه
					<label className='custom-file-label-uploader' htmlFor='zero'>
						<input
							accept='image/*'
							onChange={file => fileChangeHandler(file)}
							type='file'
							className='custom-file-input hidden'
							name='IdentityCertificateFirstPage'
							id='zero'
						/>
						{((props.previewDocuments.files.length && props.previewDocuments.files.find(file => file.attachmentType === 3)) ||
							state.IdentityCertificateFirstPage.base64) && (
							<img
								src={
									props.previewDocuments.files.find(file => file.attachmentType === 3) &&
									!state.IdentityCertificateFirstPage.base64
										? props.previewDocuments.files.find(file => file.attachmentType === 3).thumbnailFileContent
										: state.IdentityCertificateFirstPage.base64
								}
								alt={'تصویر انتخاب شده'}
								style={{ width: '100%', height: '130px', marginBottom: '20px' }}
							/>
						)}
						{state.IdentityCertificateFirstPage.form ||
						(props.previewDocuments.files.length &&
							props.previewDocuments.files.find(file => file.attachmentType === 3) &&
							props.previewDocuments.files.find(file => file.attachmentType === 3).thumbnailFileContent)
							? 'بروز رسانی فایل ...'
							: 'انتخاب فایل ...'}
					</label>
				</div>

				<div className='file-input-wrapper flex items-start flex-col justify-center mx-4 my-5'>
					تصویر صفحه توضیحات شناسنامه
					<label className='custom-file-label-uploader' htmlFor='first'>
						<input
							accept='image/*'
							onChange={file => fileChangeHandler(file)}
							type='file'
							className='custom-file-input hidden'
							name='IdentityCertificateDescPage'
							id='first'
						/>
						{((props.previewDocuments.files.length && props.previewDocuments.files.find(file => file.attachmentType === 4)) ||
							state.IdentityCertificateDescPage.base64) && (
							<img
								src={
									props.previewDocuments.files.find(file => file.attachmentType === 4) &&
									!state.IdentityCertificateDescPage.base64
										? props.previewDocuments.files.find(file => file.attachmentType === 4).thumbnailFileContent
										: state.IdentityCertificateDescPage.base64
								}
								alt={'تصویر انتخاب شده'}
								style={{ width: '100%', height: '130px', marginBottom: '20px' }}
							/>
						)}
						{state.IdentityCertificateDescPage.form ||
						(props.previewDocuments.files.length &&
							props.previewDocuments.files.find(file => file.attachmentType === 4) &&
							props.previewDocuments.files.find(file => file.attachmentType === 4).thumbnailFileContent)
							? 'بروز رسانی فایل ...'
							: 'انتخاب فایل ...'}
					</label>
				</div>

				<div className='file-input-wrapper flex items-start flex-col justify-center mx-4 my-5'>
					تصویر سند ودیعه
					<label className='custom-file-label-uploader' htmlFor='second'>
						<input
							accept='image/*'
							onChange={file => fileChangeHandler(file)}
							name='DepositDocument'
							type='file'
							className='custom-file-input hidden'
							id='second'
						/>
						{((props.previewDocuments.files.length && props.previewDocuments.files.find(file => file.attachmentType === 5)) ||
							state.DepositDocument.base64) && (
							<img
								src={
									props.previewDocuments.files.find(file => file.attachmentType === 5) && !state.DepositDocument.base64
										? props.previewDocuments.files.find(file => file.attachmentType === 5).thumbnailFileContent
										: state.DepositDocument.base64
								}
								alt={'تصویر انتخاب شده'}
								style={{ width: '100%', height: '130px', marginBottom: '20px' }}
							/>
						)}
						{state.DepositDocument.form ||
						(props.previewDocuments.files.length &&
							props.previewDocuments.files.find(file => file.attachmentType === 5) &&
							props.previewDocuments.files.find(file => file.attachmentType === 5).thumbnailFileContent)
							? 'بروز رسانی فایل ...'
							: 'انتخاب فایل ...'}
					</label>
				</div>

				<div className='file-input-wrapper flex items-start flex-col justify-center mx-4 my-5'>
					تصویر روی کارت ملی
					<label className='custom-file-label-uploader' htmlFor='third'>
						<input
							accept='image/*'
							onChange={file => fileChangeHandler(file)}
							name='NationalCardFrontPage'
							type='file'
							className='custom-file-input hidden'
							id='third'
						/>
						{((props.previewDocuments.files.length && props.previewDocuments.files.find(file => file.attachmentType === 1)) ||
							state.NationalCardFrontPage.base64) && (
							<img
								src={
									props.previewDocuments.files.find(file => file.attachmentType === 1) && !state.NationalCardFrontPage.base64
										? props.previewDocuments.files.find(file => file.attachmentType === 1).thumbnailFileContent
										: state.NationalCardFrontPage.base64
								}
								alt={'تصویر انتخاب شده'}
								style={{ width: '100%', height: '130px', marginBottom: '20px' }}
							/>
						)}
						{state.NationalCardFrontPage.form ||
						(props.previewDocuments.files.length &&
							props.previewDocuments.files.find(file => file.attachmentType === 1) &&
							props.previewDocuments.files.find(file => file.attachmentType === 1).thumbnailFileContent)
							? 'بروز رسانی فایل ...'
							: 'انتخاب فایل ...'}
					</label>
				</div>

				<div className='file-input-wrapper flex items-start flex-col justify-center mx-4 my-5'>
					تصویر پشت کارت ملی
					<label className='custom-file-label-uploader' htmlFor='fourth'>
						<input
							accept='image/*'
							onChange={file => fileChangeHandler(file)}
							name='NationalCardBackPage'
							type='file'
							className='custom-file-input hidden'
							id='fourth'
						/>
						{((props.previewDocuments.files.length && props.previewDocuments.files.find(file => file.attachmentType === 2)) ||
							state.NationalCardBackPage.base64) && (
							<img
								src={
									props.previewDocuments.files.find(file => file.attachmentType === 2) && !state.NationalCardBackPage.base64
										? props.previewDocuments.files.find(file => file.attachmentType === 2).thumbnailFileContent
										: state.NationalCardBackPage.base64
								}
								alt={'تصویر انتخاب شده'}
								style={{ width: '100%', height: '130px', marginBottom: '20px' }}
							/>
						)}
						{state.NationalCardBackPage.form ||
						(props.previewDocuments.files.length &&
							props.previewDocuments.files.find(file => file.attachmentType === 2) &&
							props.previewDocuments.files.find(file => file.attachmentType === 2).thumbnailFileContent)
							? 'بروز رسانی فایل ...'
							: 'انتخاب فایل ...'}
					</label>
				</div>
			</div>
			<div className='flex flex-md-row flex-col mt-4'>
				<div className='step-one-btn-wrapper mt-md-0 mt-5 px-2 '>
					<button onClick={() => props.onPrev()} type={'button'} className='prev-information-step-btn'>
						{t('returnToPrev')}
					</button>
				</div>
				<div className='step-one-btn-wrapper mt-md-0 mt-2 px-2 mr-md-auto'>
					{/* {props.previewDocuments.files.length >= 5 ?
                        <button onClick={props.onNext}
                                type="submit" className='next-information-step-btn'>
                            {t("accept")}
                        </button> :*/}
					<button
						onClick={props.previewDocuments.files.length ? editSubmitHandler : createSubmitHandler}
						type='submit'
						className='next-information-step-btn'>
						{t('accept')}
					</button>
					{/*}*/}
				</div>
			</div>
		</>
	);
};

export default connect(
	(state: IApplicationState) => state.callCompleteInformation,
	callCompleteInformationActions
)(UploadFiles as ComponentType<any>);
