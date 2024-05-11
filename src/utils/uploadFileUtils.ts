export const isValidUploadedImageType = (file: File) => {
	const fileExtension = file.name.split('.').at(-1) || '';

	const validFileExtensions = ['jpeg', 'png', 'jpg', 'webp'];

	return validFileExtensions.includes(fileExtension);
};
