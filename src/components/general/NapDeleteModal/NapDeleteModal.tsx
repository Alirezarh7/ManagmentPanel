import React from 'react';
import { useTranslation } from 'react-i18next';
import NapModal from '../NapModal/NapModal';
import './nap-delete-modal.css';

export interface IProps {
	visible: boolean;
	onAccept: () => void;
	onCancel: () => void;
	disabled?: boolean;
	customClass?: string;
}

const NapDeleteModal = (props: IProps) => {
	const [t] = useTranslation();
	const Buttons = () => {
		return (
			<React.Fragment>
				<button type='button' className='btn btn-outline-danger px-4' onClick={() => props.onCancel()} disabled={props.disabled}>
					{t('no')}
				</button>
				<button
					className={`btn btn-success px-4 py-1 ml-1 position-relative ${props.customClass}`}
					onClick={() => props.onAccept()}
					disabled={props.disabled}>
					<span className='btn-text'>{t('yes')}</span>
				</button>
			</React.Fragment>
		);
	};
	return (
		<NapModal ModalTitle={t('remove')} Visible={props.visible} onCancel={() => props.onCancel()} buttons={<Buttons />}>
			<div className='modal-body'>
				<div className='flex flex-col justify-center text-center'>
					<span className='mdi mdi-48px mdi-delete text-danger'></span>
					<div className='mt-4'>{t('removeConfirm')}</div>
				</div>
			</div>
		</NapModal>
	);
};
export default NapDeleteModal;
