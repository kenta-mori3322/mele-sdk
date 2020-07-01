declare type Headers = any[] & {
    [key: string]: any;
};
export default class IndexerApi {
    static get(endpoint: string, action: string, query?: any, data?: any, headers?: Headers | undefined): Promise<any>;
    static post(endpoint: string, action: string, query?: any, data?: any, headers?: Headers | undefined): Promise<any>;
    private static call;
    private static identifyError;
}
export {};
