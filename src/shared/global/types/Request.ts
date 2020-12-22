export interface Request<TBody = Record<string, unknown>> {
    version: string;
    routeKey: string;
    rawPath: string;
    rawQueryString: string;
    headers: {
        [key: string]: unknown;
    };
    requestContext: {
        http: {
            method: 'POST' | 'PUT' | 'GET' | 'DELETE';
            path: string;
        };
        routeKey: string;
    };
    body: TBody;
}
