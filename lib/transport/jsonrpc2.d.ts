export declare type JsonRpcVersion = '2.0';
export declare type JsonRpcReservedMethod = string;
export declare type JsonRpcId = number | string | void;
export interface JsonRpcNotification<T> {
    jsonrpc: JsonRpcVersion;
    method: string;
    params?: T;
}
export interface JsonRpcRequest<T> extends JsonRpcNotification<T> {
    id: JsonRpcId;
}
export interface JsonRpcResponseBase {
    jsonrpc: JsonRpcVersion;
    id: JsonRpcId;
}
export interface JsonRpcSuccess<T = object> extends JsonRpcResponseBase {
    result: T;
}
export declare function isJsonRpcSuccess(response: object): response is JsonRpcSuccess;
export interface JsonRpcFailure<T> extends JsonRpcResponseBase {
    error: JsonRpcError<T>;
}
export interface JsonRpcError<T = object> {
    code: number;
    message: string;
    data?: T;
}
export declare type JsonRpcResponse<T> = JsonRpcSuccess<T> | JsonRpcFailure<T>;
export declare const PARSE_ERROR = -32700;
export declare const INVALID_REQUEST = -32600;
export declare const METHOD_NOT_FOUND = -32601;
export declare const INVALID_PARAMS = -32602;
export declare const INTERNAL_ERROR = -32603;
