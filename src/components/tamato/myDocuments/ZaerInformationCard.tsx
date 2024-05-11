import React, { ReactNode } from 'react';
import Flex from '../../general/DataSummary/Flex';
import { Divider, Tag } from 'antd';
import { shareData } from '../../../shareData';

interface IProps {
	doc: any;
	Menus: (doc: any) => ReactNode;
	MobileMenus: (doc: any) => ReactNode;
}
const ZaerInformationCard = ({ doc, Menus, MobileMenus }: IProps) => {
	return (
		<>
			<div
				className='sanad-cart p-3 m-5 sm:flex max-sm:hidden items-center justify-start md:justify-around flex-wrap rounded bg-white'
				style={{ border: '1px solid #aaa', boxShadow: '1px 1px 3px #ccc' }}>
				<Flex value={doc.zaernumber} label={'شماره ثبت نام'} />
				<Flex value={doc.branchCode} label={'کد شعبه'} />
				<Flex value={doc.nationalCode} label={'کد ملی'} />
				<Flex value={doc.statusTitle} label={'وضعیت'} />
				<Flex value={doc.olaveyatDate} label={'تاریخ اولویت'} />
				{Menus(doc)}
			</div>

			<div
				className='sanad-cart bg-white p-3  m-3 sm:hidden flex items-center justify-start rounded flex-col'
				style={{ border: '1px solid #aaa', boxShadow: '1px 1px 3px #ccc' }}>
				<Tag color={doc.statusTitle === shareData.DOCUMENT_FROM_BANK_STATUS.NOT_COMPLETED_INFORMATION ? 'danger' : 'success'}>
					{doc.statusTitle}
				</Tag>
				<div className='flex items-center justify-between w-full mt-3'>
					<span>شماره ثبت نام</span>
					<Divider
						style={{
							width: '50%',
							height: '0.5px',
							background: '#ccc',
							minWidth: 'unset'
						}}
						orientation='left'
						plain
					/>
					<span>{doc.zaernumber}</span>
				</div>
				<div className='flex items-center justify-between w-full mt-3'>
					<span>کد شعبه</span>
					<Divider
						style={{
							width: '50%',
							height: '0.5px',
							background: '#ccc',
							minWidth: 'unset'
						}}
						orientation='left'
						plain
					/>
					<span>{doc.branchCode}</span>
				</div>
				<div className='flex items-center justify-between w-full mt-3'>
					<span>کد ملی</span>
					<Divider
						style={{
							width: '50%',
							height: '0.5px',
							background: '#ccc',
							minWidth: 'unset'
						}}
						orientation='left'
						plain
					/>
					<span>{doc.nationalCode}</span>
				</div>

				<div className='flex items-center justify-between w-full mt-3'>
					<span>تاریخ اولویت</span>
					<Divider
						style={{
							width: '50%',
							height: '0.5px',
							background: '#ccc',
							minWidth: 'unset'
						}}
						orientation='left'
						plain
					/>
					<span>{doc.olaveyatDate}</span>
				</div>
				{MobileMenus(doc)}
			</div>
		</>
	);
};

export default ZaerInformationCard;
