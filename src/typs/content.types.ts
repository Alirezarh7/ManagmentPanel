export interface ICreateContentDto {
	subject: string;
	body: string;
	serviceType: string;
	serviceTypeId: number;
	contentLocation: string;
	contentLocationId: number;
}

export interface IEditContentDto extends ICreateContentDto {
	id: string;
}

export interface IContentResponse extends ICreateContentDto {
	id: string;
}
