import React from 'react'
import useFetch from '../core/useFetch'
import { TApiFunctionReturn, TRunRequestFunction } from '../core/useFetch.d'
import { BASE_EXAMPLE_API_URL } from '~root/constants'

const getCountry: TApiFunctionReturn = () => {
    const { data, isLoading, error, execute } = useFetch(BASE_EXAMPLE_API_URL)

    const run: TRunRequestFunction = React.useCallback(
        (params, searchValue: any) => {
            execute({ method: 'GET', path: `name/${searchValue}`, ...params })
        },
        [execute],
    )

    return [{ data, isLoading, error }, run]
}

export default getCountry
