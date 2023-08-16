import { createContext, useContext, PropsWithChildren } from 'react'

type SwitchContextState = {
    value: unknown
}

const switchContext = createContext<SwitchContextState>({
    value: null,
})

const useSwitchContext = () => {
    const context = useContext(switchContext)
    if (!context) {
        throw new Error('Can not use switchContext. You must wrap <Switch> Component.')
    }
    return context
}

function Switch({ variable, children }: PropsWithChildren<{ variable: unknown }>) {
    return (
        <switchContext.Provider
            value={{
                value: variable,
            }}
        >
            {children}
        </switchContext.Provider>
    )
}

function Case({ value, children }: PropsWithChildren<{ value: unknown }>) {
    const { value: contextValue } = useSwitchContext()

    if (contextValue !== value) {
        return null
    }

    return <>{children}</>
}

Switch.Case = Case

export default Switch
