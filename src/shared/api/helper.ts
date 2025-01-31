type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

interface ApiConfig {
    url: string;
    method: HttpMethod;
    meta?: { requiresAuth?: boolean };
    body?: Record<string, unknown> | FormData;
}

export const createApiConfig = (
    method: HttpMethod,
    url: string,
    requiresAuth: boolean = false,
    body?: Record<string, unknown> | FormData,
): ApiConfig => ({
    url,
    method,
    meta: { requiresAuth }, //токен подставлять для роутеров админа
    ...(body && { body })
});