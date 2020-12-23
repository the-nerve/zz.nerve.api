export type Response = Promise<{
    statusCode: number;
    message: string;
    body: string;
}>;
