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
