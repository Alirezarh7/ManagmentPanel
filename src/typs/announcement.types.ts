export interface AnnouncementServiceType {
	name: string;
	nameFa: string;
	id: number;
}

export interface ICreateAnnouncementDto {
	subject: string;
	body: string;
	serviceTypeId: number;
}

export interface ICreateAnnouncementFnDto extends ICreateAnnouncementDto {
	image: string;
}
