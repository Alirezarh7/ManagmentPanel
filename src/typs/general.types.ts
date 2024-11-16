export interface IGeneralEnumWithFaTitle {
	name: string;
	nameFa: string;
	id: number;
}

export interface IValidationErrorResponse {
	type: string;
	title: string;
	status: number;
	errors?: Record<string, string[]>;
	traceId: string;
}