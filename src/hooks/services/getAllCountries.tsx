import React from 'react'
import useFetch from '../core/useFetch'
import { TApiFunctionReturn, TRunRequestFunction } from '../core/useFetch.d'
import { BASE_EXAMPLE_API_URL } from '~root/constants'

const getAllCountries: TApiFunctionReturn = () => {
    const { data, isLoading, error, execute } = useFetch(BASE_EXAMPLE_API_URL)

    const run: TRunRequestFunction<ResponseType> = React.useCallback(
        (params) => {
            execute({ method: 'GET', path: `/all`, ...params })
        },
        [execute],
    )

    return [{ data, isLoading, error }, run]
}

export default getAllCountries
