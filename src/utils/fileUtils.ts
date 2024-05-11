export const isValidUploadedImageType = (file: File) => {
	const fileExtension = file.name.split('.').at(-1) || '';

	const validFileExtensions = ['jpeg', 'png', 'jpg', 'webp'];

	return validFileExtensions.includes(fileExtension);
};

export const convertToBase64 = (file: File): Promise<string | ArrayBuffer | null> => {
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
