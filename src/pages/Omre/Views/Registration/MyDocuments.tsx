import { ComponentType, useEffect } from 'react';
import { connect } from 'react-redux';
import { IApplicationState } from '../../../../store/state';
import { useTranslation } from 'react-i18next';
import useTitle from '../../../../hooks/useTitle';
import NapAlerts from '../../../../components/general/NapAlerts/NapAlerts';
import * as CryptoJS from 'crypto-js';
import { registrationActions } from '../../Actions/Registration/action';
import { IRegistrationState } from '../../Actions/Registration/model';
import MyDocumentsDetail from './MyDocumentsDetail';
type IProps = typeof registrationActions & IRegistrationState;
const ReservationIndex = (props: IProps) => {
	useTitle('mainSettings', 'OmreReservation');
	const [t] = useTranslation();

	useEffect(() => {
		props.getOmreDocument();
	}, []);

	return (
		<>
			<NapAlerts clearAlerts={() => props.clearAlerts()} alerts={props.alerts} />
			{/*<NapLoading loading={props.documentsFromBank.loading}/>*/}
			<div className='w-full max-w-screen-xl mx-auto '>
				<MyDocumentsDetail />
			</div>
		</>
	);
};
export default connect(
	(state: IApplicationState) => state.registration,
	registrationActions
)(ReservationIndex as ComponentType<any>);
