export interface ICreateContentDto {
	subject: string;
	body: string;
	serviceType: string;
	serviceTypeId: number;
	subServiceType: string;
	subServiceTypeId: number;
	contentLocation: string;
	contentLocationId: number;
}

export interface IEditContentDto extends ICreateContentDto {
	id: string;
}

export interface IContentResponse extends ICreateContentDto {
	id: string;
}
