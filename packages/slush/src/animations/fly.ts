import { keyframes } from 'styled-components'

export const flyIn = keyframes`
    from {
        opacity: 0;
        transform: translate(-50%, -20%);
    }

    to {
        opacity: 1;
        transform: translate(-50%, 0%);
    }
`

export const flyOut = keyframes`
    from {
        opacity: 1;
        transform: translate(-50%, 0%);
    }

    to {
        opacity: 0;
        transform: translate(-50%, -20%);
    }
`
