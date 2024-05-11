import React from 'react';
import { Modal } from 'react-bootstrap';
import { CloseOutlined, CreditCardOutlined, FormOutlined, PlusOutlined, PrinterOutlined, SendOutlined } from '@ant-design/icons';

type MapType = {
	kargozarNo: number;
	officeName: string;
	flightDate: string;
};

type CardProps = {
	value: MapType;
	onClick: () => void;
	show: boolean;
	oncancel: () => void;
	className?: string;
};

const Modall = (props: CardProps) => {
	const { kargozarNo, officeName, flightDate } = props.value;
	return (
		<div style={{ marginTop: '10px', borderRadius: '5px' }} className='flex items-center action-my-document-btn-cancel'>
			{/* <span className='text-center w-full inline-block px-1 py-2 text-white ml-1 text-danger'
                style={{ cursor: "pointer" }}
                onClick={props.oncancel} ><CloseOutlined className={'text-danger'} /> انصراف رزرو  </span>*/}
			<Modal onHide={props.oncancel} show={props.show}>
				<Modal.Header closeButton>
					<Modal.Title></Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<div>
						<strong>آیا از انتخاب خود مطمئن هستید ؟</strong>
					</div>
					<hr />
					<div>
						<div className='flex items-center w-full justify-between'>
							<div>
								<strong>کد کارگزاری</strong>
							</div>
							<p>----------------------------------------------</p>
							<p>{kargozarNo}</p>
						</div>
						<div className='flex items-center w-full justify-between'>
							<div>
								<strong>دفتر زیارتی</strong>
							</div>
							<p>----------------------------------------------</p>
							<p>{officeName}</p>
						</div>
						<div className='flex items-center w-full justify-between'>
							<div>
								<strong>تاریخ پرواز </strong>
							</div>
							<p>----------------------------------------------</p>
							<p>{flightDate}</p>
						</div>
					</div>
				</Modal.Body>
				<Modal.Footer>
					<button onClick={props.oncancel} className='btn btn-outline-danger btn-md'>
						خیر
					</button>
					<button onClick={props.onClick} className='btn btn-outline-success mx-3 btn-md'>
						بله
					</button>
				</Modal.Footer>
			</Modal>
		</div>
	);
};

export default Modall;
