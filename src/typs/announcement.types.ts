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
	omreh: string;
	atabat: string;
	arbaein: string;
	soria: string;
}

export type TAnnouncementShowType = 'all' | 'mainPage';
