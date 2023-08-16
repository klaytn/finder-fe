import { ChangeEvent, useCallback, useState } from 'react'

type UseFormValueOptions = {
    initialValue?: string
    transformOnSelect?: (value: string) => string
}
const useFormValue = ({ initialValue = '', transformOnSelect }: UseFormValueOptions = {}) => {
    const [value, setValue] = useState(initialValue)

    const handleChange = useCallback(({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
        setValue(value)
    }, [])

    const handleClear = useCallback(() => setValue(initialValue), [initialValue])

    const handleSelect = useCallback(
        (value: string) => {
            const transformedValue = transformOnSelect?.(value) || value
            setValue(transformedValue)
        },
        [transformOnSelect],
    )

    return [value, handleChange, handleClear, handleSelect, setValue] as const
}

export default useFormValue
