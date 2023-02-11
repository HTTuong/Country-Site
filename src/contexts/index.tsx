import { ThemeContextProvider } from './ThemeContext'
import { CountryContextProvider } from './CountryContext'

function combineContexts(...components: any) {
    return components.reduce(
        (AccumulatedComponents: any, CurrentComponent: any) => {
            return ({ children }: any) => {
                return (
                    <AccumulatedComponents>
                        <CurrentComponent>{children}</CurrentComponent>
                    </AccumulatedComponents>
                )
            }
        },
        ({ children }: any) => <>{children}</>,
    )
}

const contextList = [ThemeContextProvider, CountryContextProvider]

const AppContextProvider = combineContexts(...contextList)

export default AppContextProvider
