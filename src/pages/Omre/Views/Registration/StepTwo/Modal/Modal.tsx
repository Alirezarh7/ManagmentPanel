import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';

interface Props {
	show: boolean;
	handleClose: () => void;
	data: string[];
}

function OmreStepTwoModal({ show, handleClose, data }: Props) {
	const [city, setCity] = useState<string>('');

	return (
		<>
			<Modal show={show} onHide={handleClose} size='xl'>
				<Modal.Header>
					<Modal.Title>ایجاد گروه</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<div className='col-12'>
						<div className='flex flex-column'>
							<div className='mb-1'>
								استان محل اعزام
								<span className='required-star text-danger mx-1'>*</span>
							</div>
							<select className='form-control' name='birthPlace' value={city} onChange={e => setCity(e.target.value)}>
								<option>انتخاب کنید</option>
								{data.map((cityLabel, index) => (
									<option key={index}>{cityLabel}</option>
								))}
							</select>
						</div>
					</div>
				</Modal.Body>
				<Modal.Footer>
					<button onClick={handleClose} className='btn btn-outline-danger btn-sm'>
						انتخاب
					</button>
				</Modal.Footer>
			</Modal>
		</>
	);
}

export default OmreStepTwoModal;
