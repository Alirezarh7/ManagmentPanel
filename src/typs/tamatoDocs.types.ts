export interface TamatoDocsTypes {
	branchCode: number;
	codeTrackingPreregistered: number;
	flagConfirm: boolean;
	isRegistered: boolean;
	isReserved: boolean;
	nationalCode: string;
	olaveyatDate: string;
	personalInfoRegistration: boolean;
	statusTitle: string;
	zaernumber: number;
}

export interface ButtonInfoProps {
	sanadInfo: TamatoDocsTypes;
}
