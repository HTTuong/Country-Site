import React from 'react'
import axios from 'axios'
import { TExecuteParams, IRequestResponse } from './useFetch.d'

export default function useFetch(
    baseURL: string,
): IRequestResponse<ResponseType> & { execute: (params: TExecuteParams) => void } {
    const [data, setData] = React.useState<ResponseType>(undefined as unknown as ResponseType)
    const [error, setError] = React.useState()
    const [isLoading, setIsLoading] = React.useState<boolean>(false)
    const [executeParams, setExecuteParams] = React.useState<TExecuteParams>()

    React.useEffect(() => {
        if (!executeParams?.path) return
        const abortController = new AbortController()

        const requestBody = {}

        if (executeParams?.method === 'POST') {
            Object.assign(requestBody, executeParams.body)
        }

        setIsLoading(true)

        axios({
            baseURL: baseURL + executeParams.path,
            data: requestBody,
            method: executeParams.method,
            signal: abortController.signal,
        })
            .then((response) => {
                setData(response.data)
                if (typeof executeParams.callbackAfterSuccess === 'function') {
                    executeParams.callbackAfterSuccess(response.data)
                }
            })
            .catch((error) => {
                setError(error)
            })
            .finally(() => {
                setIsLoading(false)
            })

        return () => {
            abortController.abort()
        }
    }, [baseURL, executeParams])

    const execute = React.useCallback((params: TExecuteParams) => {
        setExecuteParams(params)
    }, [])

    return {
        data: data as ResponseType,
        error,
        isLoading,
        execute,
    }
}
