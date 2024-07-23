export interface ICreateAnnouncementDto {
	subject: string;
	body: string;
	isActive: boolean;
	isDisplayMainPage: boolean;
	serviceType: string;
	serviceTypeId: number;
	showDuration: number;
	showFromDate: string;
}

export interface ICreateAnnouncementFnDto extends ICreateAnnouncementDto {
	base64Image: string;
}

export interface IEditAnnouncementFnDto extends ICreateAnnouncementDto {
	id: string;
	base64Image: string;
}

export interface IAnnouncementResponse extends ICreateAnnouncementDto {
	id: string;
	base64Image: string;
	endShowDate: string;
}

export interface IAnnouncementsStatistics {
	all: string;
	allActive: string;
	tamato: string;
	tamatoActive: string;
	omreh: string;
	omrehActive: string;
	atabat: string;
	atabatActive: string;
	arbaein: string;
	arbaeinActive: string;
	soria: string;
	soriaActive: string;
}

export type TAnnouncementShowType = 'all' | 'mainPage';
