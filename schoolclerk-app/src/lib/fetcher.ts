import { Fetcher } from "swr";

const API_URL = 'http://localhost:8080'

interface FetcherArgType {
    method?: 'POST' | 'GET' | 'DELETE' | 'PUT' | 'PATCH',
    body?: any
}

export const fetcher = (...args: any) =>{ console.log(args) 
    const [url, {arg}] = args as any[];
    const option = arg as FetcherArgType
//@ts-ignore
    return fetch(`${API_URL}${url}`, {
        method: option.method,
        body: JSON.stringify(option.body),
        headers: {
            Accept: '*/*',
            'Content-Type': 'application/json'
        }
    }).then(res => res.json())
}