import React from 'react';
import './CardPeyment.css';
import PeymentCardZaerInfo from '../../../../assets/peymentCard.jpg';
import { useTranslation } from 'react-i18next';

const fields: {
	id: number;
	name: string;
	label: string;
}[] = [
	{ id: 0, name: 'fullName', label: 'نام و نام خانوادگی ' },
	{ id: 1, name: 'nationalCode', label: 'کدملی' },
	{ id: 2, name: 'mobileNo', label: 'شماره تلفن' },
	{ id: 3, name: 'karevanNo', label: 'شماره کارگزاری' }
];

interface IProps {
	fullName: string;
	nationalCode: string;
	mobileNo: string | number;
	karevanNo: number;
}
const CardInformation = (props: IProps) => {
	const [t] = useTranslation();

	const inputFields = fields.map(item => {
		return (
			<div key={item.id} className='flex justify-center'>
				<div>
					<strong className='mx-3'>{item.label}:</strong>
				</div>
				<div className=''>
					<p>{props[item.name as keyof IProps]}</p>
				</div>
			</div>
		);
	});

	return (
		<div className='flex justify-center mt-3'>
			<div className='flex flex-col cardInformationPeyment justify-center'>
				<div className='flex justify-center cardTitleInformationPeyment'>
					<strong>اطلاعات زائر</strong>
				</div>
				<div className='buxData'>
					<div className='flex justify-center items-center'>
						<img
							alt='zayerLogo'
							src={PeymentCardZaerInfo}
							style={{
								borderRadius: '50%',
								width: '100px',
								height: '100px'
							}}
						/>
					</div>
					<div className='parent mx-4 select__section__ForPeyment'>
						{inputFields.map((field, index) => (
							<div key={index} className='child mt-2'>
								{field}
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default CardInformation;
