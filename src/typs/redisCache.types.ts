export interface IRedisCacheDto {
	key: string;
	value: string;
}

export interface IDeleteRedisCacheDto {
	key: string;
}

export interface IRedisCacheGetAllResponse {
	keys: string[];
	currentPage: number;
	pageCount: number;
}
