import { useCallback, useEffect, useRef } from 'react'

export function useOutsideClick<TargetElement extends HTMLElement>(onOutsideClick: (event: MouseEvent) => void) {
    const ref = useRef<TargetElement | null>(null)

    const handleClickOutside = useCallback(
        function (event: MouseEvent) {
            if (ref.current?.contains?.(event.target as Node)) {
                return
            }

            onOutsideClick(event)
        },
        [onOutsideClick],
    )

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [handleClickOutside])

    return {
        ref,
    }
}
