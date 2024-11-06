import ManagementAxiosInstance from '../configs/managementAxiosInstance';
import { useMutation, useQuery } from '@tanstack/react-query';
import { IDeleteRedisCacheDto, IRedisCacheDto, IRedisCacheGetAllResponse } from '../typs/redisCache.types';

const getRedisCacheKeysFn = async (page: number) => {
	const url = `/Redis/GetAllKeys?page=${page}`;
	const response = await ManagementAxiosInstance.get<IRedisCacheGetAllResponse>(url);

	return response.data;
};
const useGetRedisCacheKeys = (page: number) => {
	return useQuery({
		queryKey: ['getRedisCacheKeys', page],
		queryFn: () => getRedisCacheKeysFn(page)
	});
};

const getRedisCacheValueFn = async (cacheKey: string) => {
	const response = await ManagementAxiosInstance.get<string>(`/Redis/GetValue/${cacheKey}`);

	return response.data;
};
const useGetRedisCacheValue = (cacheKey: string) => {
	return useQuery({
		queryKey: ['getRedisCacheValue', cacheKey],
		queryFn: () => getRedisCacheValueFn(cacheKey),
		staleTime: 0,
		gcTime: 0,
		retry: 0
	});
};
const editRedisCacheFn = (data: IRedisCacheDto) => {
	return ManagementAxiosInstance.put('/Redis/UpdateValue', data);
};
const useEditRedisCache = () => {
	return useMutation({ mutationFn: editRedisCacheFn });
};

const deleteRedisCacheKeyFn = (data: IDeleteRedisCacheDto) => {
	return ManagementAxiosInstance.delete('/Redis/DeleteKey', { data });
};
const useDeleteRedisCacheKey = () => {
	return useMutation({ mutationFn: deleteRedisCacheKeyFn });
};

const deleteAllRedisCacheKeysFn = () => {
	return ManagementAxiosInstance.delete('/Redis/DeleteAllKeys');
};
const useDeleteAllRedisCacheKeys = () => {
	return useMutation({ mutationFn: deleteAllRedisCacheKeysFn });
};

export { useGetRedisCacheKeys, useGetRedisCacheValue, useEditRedisCache, useDeleteRedisCacheKey, useDeleteAllRedisCacheKeys };
