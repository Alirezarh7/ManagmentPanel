import React from 'react';
import NapModal from '../NapModal/NapModal';
import { useTranslation } from 'react-i18next';

export interface IProps {
	title: string;
	description: string;
	visible: boolean;
	onAccept: () => void;
	onCancel: () => void;
}

const NapQuestionModal = (props: IProps) => {
	const [t] = useTranslation();
	const Buttons = () => {
		return (
			<React.Fragment>
				<button type='button' className='btn btn-outline-danger' onClick={() => props.onCancel()}>
					{t('no')}
				</button>
				<button className='btn btn-success px-4 ml-1' onClick={() => props.onAccept()}>
					{t('yes')}
				</button>
			</React.Fragment>
		);
	};
	return (
		<NapModal ModalTitle={t(props.title)} Visible={props.visible} onCancel={() => props.onCancel()} buttons={<Buttons />}>
			<div className='modal-body'>
				<div className='flex flex-col justify-center text-center'>
					<span className='mdi mdi-48px mdi-help-circle text-danger'></span>
					<div className='mt-4'>{t(props.description)}</div>
				</div>
			</div>
		</NapModal>
	);
};
export default NapQuestionModal;
