import useWindowSize from '../../hooks/useWindowSize';
import TransformationRules from '../../components/tamato/documentTransferAgreement/TransformationRuls';
import '../../components/tamato/documentTransferAgreement/callCompleteTransformation.css';

const TamatoDocumentTransferAgreementPage = () => {
	const { width } = useWindowSize();
	return (
		<>
			<div className='w-full max-w-screen-xl mx-auto'>
				<div className='mt-4'>
					<h2 style={{ fontSize: width <= 780 ? '20px' : '30px' }}>سامانه واگذاری اولویت تشرف به حج تمتع</h2>
				</div>
				<TransformationRules />
			</div>
		</>
	);
};

export default TamatoDocumentTransferAgreementPage;
