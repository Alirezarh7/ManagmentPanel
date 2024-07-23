export interface ICreateFaqContentDto {
	question: string;
	answer: string;
	serviceType: string;
	serviceTypeId: number;
	subServiceType: string;
	subServiceTypeId: number;
}

export interface IEditFaqContentDto extends ICreateFaqContentDto {
	id: string;
}

export interface IFaqContentResponse extends ICreateFaqContentDto {
	id: string;
}
