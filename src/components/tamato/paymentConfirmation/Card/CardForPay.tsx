import React from 'react';
import './CardPeyment.css';
import { currentPaymentBaseUrl } from '../../../../shareData/baseUrls';
interface IProps {
	fishInfo: any;
}
const CardForPay = ({ fishInfo }: IProps) => {
	return (
		<div className='flex justify-center mt-4'>
			<div className='flex flex-col  cardInformationPeyment mb-2'>
				<div className='flex justify-center cardTitleInformationPeyment'>
					<strong>پرداخت</strong>
				</div>
				{fishInfo.map((paymentItem: any, index: number) => (
					<div key={index} className={'peymentContanerFirst '}>
						<div className={'peymentContanerSecend'}>
							<div className={'peymentContanerThird mt-2 mb-3'}>
								<div className={'peymentContanerEnd'}>
									<p className={'peymentText '}>نوع پرداخت : </p>
									<p>{paymentItem.paymentType}</p>
								</div>
							</div>
							<div className={'peymentContanerThird mt-2 mb-3'}>
								<div className={'peymentContanerEnd'}>
									<p className={'peymentText '}>وضعیت پرداخت :</p>
									<p>{paymentItem.paymentStatus} </p>
								</div>
							</div>
							<div className={`peymentContanerThird mt-2 mb-3`}>
								<button
									onClick={() =>
										(window.location.href = `${currentPaymentBaseUrl}/PaymentRedirectToSadad?filecontent=${encodeURIComponent(paymentItem.content)}`)
									}
									className={`peymentButtonPay ${paymentItem.payable === 1 && !paymentItem.payed ? 'UnDisable' : 'disable'}`}>
									پرداخت
								</button>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default CardForPay;
