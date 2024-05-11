import defaultAxios, { AxiosRequestConfig } from 'axios';
import { getCache, setCache } from './cache';

type customAxiosConfig = {
    cacheTTL?: number;
};

export const get = async <T = any>(url: string, config?: AxiosRequestConfig & customAxiosConfig) => {
    const cacheTTL = config?.cacheTTL;
    const params = config?.params;

    if (cacheTTL) {
        const cached = getCache<T>(cacheTTL, url, params);
        if (cached) {
            return cached;
        } else {
            delete config.cacheTTL;
        }
    }

    const freshResponse = await defaultAxios.get<T>(url, config);
    const minifiedResponse = { data: freshResponse.data };

    if (cacheTTL) {
        setCache(minifiedResponse, url, params);
    }

    return minifiedResponse;
};

export const post = defaultAxios.post;

export const put = defaultAxios.put;

export const putForm = defaultAxios.putForm;
