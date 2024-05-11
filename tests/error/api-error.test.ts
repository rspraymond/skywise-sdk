import axios from 'axios';
import { ApiError } from '../../src/error/ApiError';

describe('api error', () => {
    it('create api error object', async () => {
        try {
            await axios.get('https://dummyjson.com/products/9999?a=1'); // this is a real 404 error
            expect(true).toBe(false); // should not reach here
        } catch (err) {
            const apiError = new ApiError('Api error', err);

            expect(apiError.toObj()).toEqual({
                error: {
                    code: 404,
                    detail: undefined,
                    title: 'Api error - Request failed with status code 404',
                },
                meta: {
                    request: {
                        url: 'https://dummyjson.com/products/9999?a=1',
                    },
                    response: {
                        data: {
                            message: "Product with id '9999' not found",
                        },
                    },
                },
            });
        }
    });
});
