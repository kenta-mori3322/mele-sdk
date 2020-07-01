import fetch from 'cross-fetch'
import queryString from 'query-string'

type Headers = any[] & { [key: string]: any }
type supportedMethods = 'GET' | 'POST' | 'PUT' | 'DELETE'

export default class IndexerApi {
    static get(
        endpoint: string,
        action: string,
        query?: any,
        data?: any,
        headers?: Headers | undefined
    ): Promise<any> {
        return IndexerApi.call(endpoint, 'GET', action, query, data, headers)
    }

    static post(
        endpoint: string,
        action: string,
        query?: any,
        data?: any,
        headers?: Headers | undefined
    ): Promise<any> {
        return IndexerApi.call(endpoint, 'POST', action, query, data, headers)
    }

    private static call(
        endpoint: string,
        method: supportedMethods,
        action: string,
        query: any,
        data: any,
        headers: Headers | undefined
    ): Promise<any> {
        let callHeaders: any = { 'Content-Type': 'application/json;charset=UTF-8' }
        if (headers) {
            for (let key of Object.keys(headers)) {
                callHeaders[key] = headers[key]
            }
        }

        const contents: RequestInit = {
            method: method || 'NO_METHOD_SPECIFIED',
            headers: callHeaders,
            cache: 'no-cache',
        }

        if (data) {
            contents.body = JSON.stringify(data)
        }

        if (query) {
            action = `${action}?${queryString.stringify(query)}`
        }

        let status: Number
        return fetch(`${endpoint}/${action}`, contents)
            .then(response => {
                status = response.status
                return response.json()
            })
            .then(json => {
                if (status >= 200 && status < 300) {
                    return json
                }

                const error = IndexerApi.identifyError(json)
                return Promise.reject(error)
            })
    }

    private static identifyError(error: any): string {
        if (!error || !error.error) {
            return 'Unknown error.'
        }

        return error.error
    }
}
