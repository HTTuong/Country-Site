import React from 'react'

export default function useDebounce(value: string, delayTime: number) {
    const [enteredValue, setEnteredValue] = React.useState<string>()

    React.useLayoutEffect(() => {
        const debounce = window.setTimeout(() => {
            setEnteredValue(value)
        }, delayTime)

        return () => {
            clearTimeout(debounce)
        }
    }, [delayTime, value])

    return enteredValue
}
