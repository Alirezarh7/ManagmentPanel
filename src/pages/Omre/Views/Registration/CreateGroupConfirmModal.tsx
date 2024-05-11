import React, { ComponentType, useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import { connect } from 'react-redux';
import { IApplicationState } from '../../../../store/state';
import { registrationActions } from '../../Actions/Registration/action';
import { IRegistrationState } from '../../Actions/Registration/model';
import useFormControl from '../../../../components/general/NapFormControl/NapFormControl';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import useWindowSize from '../../../../hooks/useWindowSize';
import { List } from 'antd';

interface IInternalProps {
	show: boolean;
	setShow: (state: boolean) => void;
}

type IProps = typeof registrationActions & IRegistrationState & IInternalProps;
const CreateGroupConfirmModal = (props: IProps) => {
	const { values, onChangeHandler, GetRequired, setValue, GetError, onFormSubmit } = useFormControl({
		dispatchProvinceId: [{ required: true }]
	});
	const { t } = useTranslation();
	const history = useNavigate();
	const window = useWindowSize();

	useEffect(() => {
		props.getOmreDocument(undefined, undefined, undefined, undefined, history, true);
	}, []);

	useEffect(() => {
		props.getProvinces();
		return () => setValue('dispatchProvinceId', null);
	}, []);

	const item = props.omreSanad.data;

	const handleSubmit = () => {
		if (onFormSubmit()) {
			const totalData = {
				dispatchProvinceId: values.dispatchProvinceId,
				sanadNo: item[0].sanadNo,
				priority: item[0].priority,
				bank: item[0].bankId,
				createPassengerInfo: {
					firstName: item[0].firstName,
					lastName: item[0].lastName,
					fatherName: item[0].fatherName,
					nationalCode: item[0].ssn,
					birthDate: item[0].birthDateEn,
					idNumber: item[0].idNumber,
					sex: 0,
					deathStatus: 0
				}
			};
			props.createGroup(history, totalData);
		} else {
			props.pushAlert({
				title: t('userError'),
				description: 'کاربر گرامی استان محل اعزام را انتخاب نمایید',
				variant: 'warning'
			});
		}
	};

	const handleSelectProvince = (province: any): void => {
		setValue('dispatchProvinceId', province.id);
	};

	return (
		<>
			<Modal dialogClassName={'h-100'} scrollable show={props.show} onHide={() => props.setShow(false)}>
				<Modal.Header closeButton>
					<Modal.Title>ایجاد گروه</Modal.Title>
				</Modal.Header>
				<Modal.Body className='pb-5 pt-2 px-3'>
					<div className='row w-full m-auto '>
						<div className='form-group col-12'>
							<label htmlFor='dispatchProvinceId' style={{ fontSize: '16px' }}>
								{t('theProvinceOfThePlaceOfDispatch')}
								<GetRequired name='dispatchProvinceId' />
							</label>
							<p id='dispatchProvinceId' className='text-secondary' style={{ fontSize: '12px' }}>
								برای ایجاد گروه یکی از موارد زیر را انتخاب نمایید
							</p>
							{/* <Select
                options={props.provinceList.data}
                isRtl={true}
                onChange={(data: any) => {
                  setValue("dispatchProvinceId", data ? data.id : null);
                }}
                placeholder={t("placeHselect")}
              />*/}
							<List
								size='small'
								bordered
								dataSource={props.provinceList.data}
								renderItem={item => (
									<List.Item
										className='province-select-create-group-item'
										onClick={() => handleSelectProvince(item)}
										style={{
											marginTop: 0,
											display: 'flex',
											paddingTop: '15px',
											paddingBottom: '15px',
											cursor: 'pointer',
											backgroundColor: item.id === values.dispatchProvinceId ? '#086500' : '#fff',
											color: item.id === values.dispatchProvinceId ? '#fff' : '#000'
										}}>
										{item.title}{' '}
									</List.Item>
								)}
							/>
							<GetError name='dispatchProvinceId' />
						</div>
					</div>
				</Modal.Body>
				<Modal.Footer>
					<button
						disabled={props.createPassengerGroup && props.createPassengerGroup.loading}
						onClick={() => props.setShow(false)}
						className='btn btn-outline-danger'>
						انصراف
					</button>
					<button
						disabled={props.createPassengerGroup && props.createPassengerGroup.loading}
						onClick={handleSubmit}
						className='btn btn-outline-success'>
						تایید
					</button>
				</Modal.Footer>
			</Modal>
		</>
	);
};

export default connect(
	(state: IApplicationState) => state.registration,
	registrationActions
)(CreateGroupConfirmModal as ComponentType<any>);
