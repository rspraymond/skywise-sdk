// https://google.github.io/styleguide/jsoncstyleguide.xml
// https://jsonapi.org/format/#document-structure

interface ApiResponse {
    version?: number;
    meta?: Record<string, any>;
}

export interface SuccessApiResponse<T extends object> extends ApiResponse {
    data: T;
}

export interface ErrorApiResponse extends ApiResponse {
    error: {
        code: number;
        title: string;
        detail?: string;
    };
}
