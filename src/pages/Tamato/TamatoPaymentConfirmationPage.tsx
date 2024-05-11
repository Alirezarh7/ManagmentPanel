import { ComponentType, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useMutation, useQuery } from '@tanstack/react-query';
import { IApplicationState } from '../../store/state';
import { reserveAndRegisterActions } from './Actions/ReserveAndRegister/action';
import useFormControl from '../../components/general/NapFormControl/NapFormControl';
import NapAlerts from '../../components/general/NapAlerts/NapAlerts';
import NapLoading from '../../components/general/NapLoading/NapLoading';
import API from '../../components/general/baseURL';
import ModalPeyment from '../../components/tamato/paymentConfirmation/Modal/ModalPeyment';
import SearchBarTamato from '../../components/tamato/paymentConfirmation/SearchBarTamato/SearchBarTamato';
import CardInformation from '../../components/tamato/paymentConfirmation/Card/CardInformation';
import CardRulesForpayment from '../../components/tamato/paymentConfirmation/Card/CardRulesForpayment';
import CardForPay from '../../components/tamato/paymentConfirmation/Card/CardForPay';
import CardPayInformation from '../../components/tamato/paymentConfirmation/Card/CardPayInformation';
import '../../components/tamato/paymentConfirmation/PaymentConfirmation.css';

type IProps = typeof reserveAndRegisterActions & IApplicationState;

const TamatoPaymentConfirmationPage = (props: IProps) => {
	console.log('render');
	const [showMoreInfoKarvan, setShowMoreInfoKarvan] = useState(false);
	const [codeTracking, setCodeTracking] = useState<string | undefined>(undefined);
	const [showPaymentModal, setShowPaymentModal] = useState(false);
	const handleClose = () => setShowPaymentModal(false);

	const getPaymentDatesFn = async () => {
		const ssn = props.oidc.user.profile.nationalCode;
		const response = await API.get(`/Legacy/PaymentZaer?NationalCode=${ssn}&CodeTrackingFromKarevan=${codeTracking}`);
		return response.data;
	};
	const {
		data: mutationResult,
		mutate,
		isPending
	} = useMutation({
		mutationFn: getPaymentDatesFn,
		onSuccess: data => {
			if (data.errorCode === 0) {
				reserveAndRegisterActions.pushAlert({
					title: 'اطلاعات شما دریافت شد',
					description: '',
					variant: 'success',
					dismissTime: 2000
				});
			} else {
				reserveAndRegisterActions.pushAlert({
					title: data.errorMessage,
					description: '',
					variant: 'warning',
					dismissTime: 2000
				});
			}
		},
		onError: error => {
			console.log(error);
		}
	});
	console.log(mutationResult);
	const setCodeTrackingHandler = (e: any) => {
		setCodeTracking(e.target.value);
	};
	const paymentHadler = () => {
		mutate();
	};

	const { values, onChangeHandler, GetError, onFormSubmit } = useFormControl({
		nationalCode: [{ required: true, isStringNumber: true, isNationalCode: true }]
	});

	useEffect(() => {
		props.getIsChechPromise();
	}, []);

	useEffect(() => {
		if (!props.reserveAndRegister.isChechPromise.data) {
			setShowPaymentModal(true);
		}
	}, [props.reserveAndRegister.isChechPromise.data]);

	return (
		<>
			<NapLoading loading={isPending} />
			{props.reserveAndRegister.isChechPromise.data !== null && props.reserveAndRegister.isChechPromise.data === false ? (
				<>
					<ModalPeyment show={showPaymentModal} handleClose={handleClose} />
				</>
			) : (
				''
			)}

			<NapAlerts alerts={props.reserveAndRegister.alerts} clearAlerts={() => props.clearAlerts()} />

			<div className='flex flex-col w-full max-w-screen-xl mx-auto'>
				<SearchBarTamato
					CodeTrackingHandler={e => setCodeTrackingHandler(e)}
					paymentHadler={() => paymentHadler()}
					codeTracking={codeTracking}
				/>

				{mutationResult && mutationResult.paymentZaer ? (
					<CardInformation
						fullName={mutationResult.paymentZaer.fullName}
						mobileNo={mutationResult.paymentZaer.mobileNo}
						nationalCode={mutationResult.paymentZaer.nationalCode}
						karevanNo={mutationResult.paymentZaer.karevanNo}
					/>
				) : null}

				{mutationResult &&
					mutationResult.hajDetailOperations.map((row: any, index: number) => (
						<CardPayInformation
							branchCode={row.zaerNumber}
							paymentDate={row.paymentDate}
							paymentTime={row.paymentTime}
							paymentType={row.paymentType}
							amount={row.amount}
							sibaTraceTracking={row.sibaTraceTracking}
						/>
					))}

				{mutationResult && mutationResult.paymentZaer ? (
					<CardRulesForpayment duplicateEzam={mutationResult.paymentZaer.duplicateEzam} />
				) : null}

				{mutationResult && mutationResult.paymentZaer ? <CardForPay fishInfo={mutationResult.fishInfo} /> : null}
			</div>
		</>
	);
};
export default connect(
	(state: IApplicationState) => state,
	reserveAndRegisterActions
)(TamatoPaymentConfirmationPage as ComponentType);
