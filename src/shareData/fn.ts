export const global_getBase64 = (file: File): Promise<string | ArrayBuffer | null> => {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = () => {
			resolve(reader.result);
		};
		reader.onerror = error => {
			reject(error);
		};
	});
};

export abstract class Helper {
	static readonly SortNumbers = (parameter: number | string): string | number | undefined => {
		const parameterToString = parameter.toString();
		if (parameterToString.length <= 3 || parameterToString.length <= 2) return parameter;

		switch (parameterToString.length) {
			case 4:
				return Helper.CheckParameterOfSortNumber(parameterToString, 1);
			case 5:
				return Helper.CheckParameterOfSortNumber(parameterToString, 2);
			case 6:
				return Helper.CheckParameterOfSortNumber(parameterToString, 3);
			case 7:
				return Helper.CheckParameterOfSortNumber(parameterToString, 1, 5);
			case 8:
				return Helper.CheckParameterOfSortNumber(parameterToString, 2, 6);
			case 9:
				return Helper.CheckParameterOfSortNumber(parameterToString, 3, 7);
			case 10:
				return Helper.CheckParameterOfSortNumber(parameterToString, 1, 5, 9);
			case 11:
				return Helper.CheckParameterOfSortNumber(parameterToString, 2, 6, 10);
		}
	};

	static readonly ConvertBooleanToYesNo = (parameter: boolean): string => {
		switch (parameter) {
			case true:
				return 'Yes';
			case false:
				return 'No';
			default:
				return '---';
		}
	};

	private static CheckParameterOfSortNumber = (
		parameter: string,
		numberIndex: number,
		numberIndexSecond?: number,
		numberIndexThird?: number
	): string => {
		const convertParameterToArray = parameter.split('');
		convertParameterToArray.splice(numberIndex, 0, ',');
		numberIndexSecond && convertParameterToArray.splice(numberIndexSecond, 0, ',');
		numberIndexThird && convertParameterToArray.splice(numberIndexThird, 0, ',');
		return convertParameterToArray.join('');
	};
}
