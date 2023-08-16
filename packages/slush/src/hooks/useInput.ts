import { ChangeEventHandler, useCallback, useMemo, useState } from 'react'

export function useInput(initialValue = '') {
    const [value, setValue] = useState(initialValue)

    const handleChange: ChangeEventHandler<HTMLInputElement> = useCallback(({ target: { value } }) => {
        setValue(value)
    }, [])

    const handleClear = useCallback(() => {
        setValue('')
    }, [])

    const result = useMemo(
        () => ({
            value,
            setValue,
            handleChange,
            handleClear,
        }),
        [handleChange, value, handleClear],
    )

    return result
}
