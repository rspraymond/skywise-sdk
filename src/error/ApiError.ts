import { AxiosError, isAxiosError } from 'axios';
import { ErrorApiResponse } from '../types/api';

export class ApiError extends Error {
    public name = 'ApiError';
    public code: ErrorApiResponse['error']['code'];
    public title: ErrorApiResponse['error']['title'];
    public detail: ErrorApiResponse['error']['detail'];
    public meta: Record<string, any>;

    constructor(title: string, error?: unknown) {
        super(title);

        const err = error as AxiosError | Error;

        this.meta = {};
        this.title = `${title} - ${err?.message || 'Unknown error'}`;

        if (isAxiosError(err)) {
            this.code = err.response?.status || 520;
            this.meta.request = {
                url: err.config?.url,
            };
            this.meta.response = {
                data: err.response?.data,
            };
        } else {
            this.code = 520;
        }
    }

    toObj(): ErrorApiResponse {
        return {
            meta: this.meta,
            error: {
                code: this.code,
                title: this.title,
                detail: this.detail,
            },
        };
    }
}
