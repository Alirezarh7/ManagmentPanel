export interface AnnouncementServiceType {
	name: string;
	nameFa: string;
	id: number;
}

export interface ICreateAnnouncementDto {
	subject: string;
	body: string;
	isActive: boolean;
	isDisplayMainPage: boolean;
	serviceTypeId: number;
	showDuration: number;
	showFromDate: string;
}

export interface ICreateAnnouncementFnDto extends ICreateAnnouncementDto {
	image: string;
}

export interface IEditAnnouncementFnDto extends ICreateAnnouncementDto {
	id: string;
	image: string;
}

export interface IAnnouncementResponse extends ICreateAnnouncementDto {
	id: string;
	image: string;
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
