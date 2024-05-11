import React, { ComponentType, useEffect } from 'react';
import { connect } from 'react-redux';
import { IApplicationState } from '../../store/state';
import { callCompleteInformationActions } from './Actions/CallCompleteInformations/action';
import { ICallCompleteInformationState } from './Actions/CallCompleteInformations/model';
import NapLoading from '../../components/general/NapLoading/NapLoading';
import { useTranslation } from 'react-i18next';
import useTitle from '../../hooks/useTitle';
import TamatoMyDocumentsContents from '../../components/tamato/myDocuments';
import '../../components/tamato/myDocuments/callCompleteInformations.css';
import NapAlerts from '../../components/general/NapAlerts/NapAlerts';

type IProps = typeof callCompleteInformationActions & ICallCompleteInformationState & { provinceid: string; title: string };
const TamatoMyDocumentsPage = (props: IProps) => {
	useTitle('mainSettings', 'callCompleteInformations');
	const [t] = useTranslation();

	useEffect(() => {
		props.getDocumentsFromBank();
	}, []);
	localStorage.removeItem('validReserve');
	localStorage.removeItem('data');

	return (
		<>
			<NapAlerts clearAlerts={() => props.clearAlerts()} alerts={props.alerts} />
			<NapLoading loading={props.documentsFromBank.loading} />
			<div className='w-full max-w-screen-xl mx-auto'>
				<TamatoMyDocumentsContents />
			</div>
		</>
	);
};
export default connect(
	(state: IApplicationState) => state.callCompleteInformation,
	callCompleteInformationActions
)(TamatoMyDocumentsPage as ComponentType);
