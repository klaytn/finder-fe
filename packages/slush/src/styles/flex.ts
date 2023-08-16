import { css } from 'styled-components'

export const flexs = {
    row: {
        start: css`
            display: flex;
            justify-content: flex-start;
            align-items: center;
        `,
        center: css`
            display: flex;
            justify-content: center;
            align-items: center;
        `,
        end: css`
            display: flex;
            justify-content: flex-end;
            align-items: center;
        `,
        between: css`
            display: flex;
            justify-content: space-between;
            align-items: center;
        `,
        around: css`
            display: flex;
            justify-content: space-around;
            align-items: center;
        `,
        evenly: css`
            display: flex;
            justify-content: space-evenly;
            align-items: center;
        `,
    },
    column: {
        start: css`
            display: flex;
            justify-content: center;
            align-items: flex-start;
        `,
        center: css`
            display: flex;
            justify-content: center;
            align-items: center;
        `,
        end: css`
            display: flex;
            justify-content: center;
            align-items: flex-end;
        `,
    },
}
