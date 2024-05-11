import * as axios from '../axios';
import { SuccessApiResponse } from '../types/api';

// ====================

const API = 'https://data.mongodb-api.com/app/skywise-sl-lptdr/endpoint/rating/v1';
const API_PROXY = 'https://cache-proxy.lemonapi.com/skywise/rating/v1';

// ====================

export type ApiResRatings = SuccessApiResponse<
    Record<
        string,
        {
            count: number;
            rating: string;
        }
    >
>;

// ====================

export async function loadRatings(collection: string, ids: string[], proxyTTL = 300) {
    try {
        const { data } = await axios.get<ApiResRatings>(
            `${proxyTTL ? API_PROXY : API}?action=load&ttl=${proxyTTL}&collection=${collection}&keys=${ids.join(',')}`,
            { cacheTTL: 3600 }
        );

        return data.data;
    } catch (e) {
        console.error('Failed to load ratings:', e);
        return {};
    }
}

export function postRating(collection: string, id: string, rating: number) {
    return axios.post<{ rating: number }, ApiResRatings>(
        `${API}?action=rate&collection=${collection}&keys=${id}&rating=${rating}`,
        { rating }
    );
}
