import { AxiosError } from 'axios';
import { IValidationErrorResponse } from '../typs/general.types';

export const extractAxiosValidationErrors = (error: AxiosError<IValidationErrorResponse, any>) => {
	const errorsArray: string[] = [];

	const data = error.response?.data as IValidationErrorResponse;

	if (data?.errors) {
		const errorMessages = Object.values(data.errors).flat();
		errorMessages.forEach(text => errorsArray.push(text));
	} else {
		errorsArray.push('خطا در انجام عملیات. لطفا با مدیر سیستم تماس بگیرید.');
	}

	return errorsArray;
};
