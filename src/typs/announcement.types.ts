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
