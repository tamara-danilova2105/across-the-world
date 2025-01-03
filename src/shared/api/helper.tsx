interface CreateApiConfigProps {
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' ; 
    url: string;
    body?: Record<string, any> | null;
}

export const createApiConfig = ({
    method,
    url,
    body,
}: CreateApiConfigProps) => ({
    url,
    method,
    ...(body && { body }),
});