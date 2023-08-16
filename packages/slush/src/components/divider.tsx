import styled from 'styled-components'

type DividerProps = {
    reversePadding?: number
}

export const Divider = styled.p<DividerProps>`
    width: ${({ reversePadding = 0 }) => `calc(100% + ${reversePadding * 2}px)`};
    transform: ${({ reversePadding = 0 }) => `translateX(-${reversePadding}px)`};
    border-bottom: 1px solid ${({ theme }) => theme.divider.color};
    margin: 0px;
    padding: 0px;
`

type VerticalDividerProps = {
    reversePadding?: number
    margin?: number
}

export const VerticalDivider = styled.p<VerticalDividerProps>`
    height: ${({ reversePadding = 0 }) => `calc(100% + ${reversePadding * 2}px)`};
    transform: ${({ reversePadding = 0 }) => `translateY(-${reversePadding}px)`};
    border-right: 1px solid ${({ theme }) => theme.divider.color};
    margin: ${({ margin = 0 }) => margin}px;
    padding: 0px;
`
