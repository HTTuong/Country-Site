import React from 'react'
import { THEME_HIGHLIGHT_COLOR, THEME_BACKGROUND_COLOR } from '~root/theme/theme.interface'

interface IThemeContext {
    color: THEME_HIGHLIGHT_COLOR
    background: THEME_BACKGROUND_COLOR
    setColor: React.Dispatch<React.SetStateAction<THEME_HIGHLIGHT_COLOR>>
    setBackground: React.Dispatch<React.SetStateAction<THEME_BACKGROUND_COLOR>>
}

const DEFAULT_CONTEXT: IThemeContext = {
    color: 'blue',
    background: 'light',
    setColor: () => {},
    setBackground: () => {},
}

const ThemeContext = React.createContext<IThemeContext>(DEFAULT_CONTEXT)

const checkForTheme = () => {
    const themeConfigs = JSON.parse(localStorage.getItem('themeConfigs') ?? '{}')

    if (themeConfigs?.color && themeConfigs?.background) {
        return themeConfigs
    }
    return undefined
}

export const ThemeContextProvider: React.FC<{ children: any }> = ({ children }) => {
    const [color, setColor] = React.useState<THEME_HIGHLIGHT_COLOR>(
        checkForTheme()?.color || DEFAULT_CONTEXT.color,
    )
    const [background, setBackground] = React.useState<THEME_BACKGROUND_COLOR>(
        checkForTheme()?.background || DEFAULT_CONTEXT.background,
    )

    React.useLayoutEffect(() => {
        if (color && background) {
            document.body.className = `theme-background-${color} bg-theme-background-${background}`
            localStorage.setItem('themeConfigs', JSON.stringify({ color, background }))
        }
    }, [color, background])

    const value: IThemeContext = React.useMemo(
        () => ({
            color,
            background,
            setColor,
            setBackground,
        }),
        [background, color],
    )

    return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export default ThemeContext
