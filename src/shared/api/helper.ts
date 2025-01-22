interface CreateApiConfigProps {
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' ; 
    url: string;
    body?: Record<string, any> | null;
    cookies?: string;
}

export const createApiConfig = ({
    method,
    url,
    body,
    cookies,
}: CreateApiConfigProps) => ({
    method,
    url,
    cookies,
    ...(body && { body })
})