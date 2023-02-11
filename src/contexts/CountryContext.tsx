import React from 'react'

interface ICountryContext {
    searchValue: string
    setSearchValue: React.Dispatch<React.SetStateAction<string>>
}

const DEFAULT_CONTEXT: ICountryContext = {
    searchValue: '',
    setSearchValue: () => {},
}

const CountryContext = React.createContext<ICountryContext>(DEFAULT_CONTEXT)

export const CountryContextProvider: React.FC<{ children: any }> = ({ children }) => {
    const [searchValue, setSearchValue] = React.useState<string>('')

    const value: ICountryContext = React.useMemo(
        () => ({
            searchValue,
            setSearchValue,
        }),
        [searchValue],
    )

    return <CountryContext.Provider value={value}>{children}</CountryContext.Provider>
}

export default CountryContext
