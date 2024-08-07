import { IGeneralEnumWithFaTitle } from '../typs/general.types';

export const serviceTypes: IGeneralEnumWithFaTitle[] = [
	{ name: 'Tamato', nameFa: 'تمتع', id: 1 },
	{ name: 'Omreh', nameFa: 'عمره', id: 2 },
	{ name: 'Atabat', nameFa: 'عتبات', id: 3 },
	{ name: 'Arbaein', nameFa: 'اربعین', id: 4 },
	{ name: 'Soria', nameFa: 'سوریه', id: 5 }
];

export const subServiceTypes: IGeneralEnumWithFaTitle[] = [
	{ name: 'General', nameFa: 'عمومی', id: 1 },
	{ name: 'Register', nameFa: 'ثبت نام', id: 2 }
];

export const configTypes: IGeneralEnumWithFaTitle[] = [
	{ name: 'Haj', nameFa: 'حج', id: 1 },
	{ name: 'Omreh', nameFa: 'عمره', id: 2 }
];

export const booleanDefaultValuesArray = [
	{ value: false, label: 'خیر' },
	{ value: true, label: 'بلی' }
];

export const booleanIsActiveValuesArray = [
	{ value: false, label: 'غیر فعال' },
	{ value: true, label: 'فعال' }
];

export const oneKB: number = 1_024;
export const oneMB: number = 1_024_000;

export enum UPLOAD_FILE_SIZES {
	announcementMaxImageSize = oneKB * 200
}
