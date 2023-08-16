import { MouseEvent, ReactNode, useCallback } from 'react'
import { useNavigate } from 'react-router'
import styled from 'styled-components'

import { ArrowBottomIcon, ArrowTopIcon, colors, FixedTooltip, MathCloseIcon, typos, useToggle } from '@klaytn/slush'

import { LocalStorageKey } from '../../constants/storage'
import { getThemeColor } from '../../functions/colorMap'
import { useFinderThemeColor } from '../../hooks/useFinderThemeColor'
import useQuery from '../../hooks/useQuery'

type ToggleSortDirectionProps = {
    children: ReactNode
}

const ToggleSortDirection = ({ children }: ToggleSortDirectionProps) => {
    const query = useQuery()
    const navigate = useNavigate()
    const sortDirection = query.get('sortDirection') || 'DESC'

    const hasClosed = localStorage.getItem(LocalStorageKey.TimeAgoSortDirectionTooltip) === 'true'
    const { isShow, off } = useToggle(!hasClosed)

    const handleCloseTooltip = useCallback(
        (event?: MouseEvent<HTMLSpanElement>) => {
            if (event) {
                event.stopPropagation()
            }

            if (isShow) {
                localStorage.setItem(LocalStorageKey.TimeAgoSortDirectionTooltip, 'true')
                off()
            }
        },
        [off, isShow],
    )

    const toggleSortDirection = useCallback(() => {
        const nextSortDirection = sortDirection === 'DESC' ? 'ASC' : 'DESC'
        query.set('sortDirection', nextSortDirection)

        navigate('?' + query.toString())
        handleCloseTooltip()
    }, [sortDirection, query, navigate, handleCloseTooltip])

    const ArrowIcon = sortDirection === 'DESC' ? ArrowBottomIcon : ArrowTopIcon
    const iconColor = useFinderThemeColor(colors.blue[400])

    return (
        <Container onClick={toggleSortDirection}>
            <FixedTooltip
                message={
                    <TooltipContainer>
                        <TooltipContents>
                            You can change the sort
                            <br /> order by clicking here
                        </TooltipContents>
                        <TooltipCloseButton onClick={handleCloseTooltip}>
                            <MathCloseIcon size={16} color={iconColor} />
                        </TooltipCloseButton>
                    </TooltipContainer>
                }
                show={isShow}
                direction="bottom"
                margin={20}
            >
                <InnerContainer>
                    <ContentsContainer>{children}</ContentsContainer>
                    <IconContainer>
                        <ArrowIcon size={16} color={iconColor} />
                    </IconContainer>
                </InnerContainer>
            </FixedTooltip>
        </Container>
    )
}

const Container = styled.button`
    display: flex;
    flex-direction: row;
    background: none;
    border: none;
    outline: none;
    padding: 0;
    margin: 0;
    text-align: inherit;
    cursor: pointer;

    &:focus {
        border: none;
        outline: none;
    }
`

const InnerContainer = styled.div`
    display: flex;
    flex-direction: row;
    text-align: inherit;
`

const ContentsContainer = styled.div`
    color: inherit;
    text-align: inherit;
    color: ${getThemeColor(colors.blue[400])};
    ${typos.suit['14.18_900']};
`

const IconContainer = styled.div`
    display: flex;
`

const TooltipContainer = styled.div`
    display: flex;
    flex-direction: row;
    padding: 6px 4px 6px 0px;
    gap: 16px;
`

const TooltipContents = styled.div`
    text-align: left;
    ${typos.suit['12.16_900']};
    color: ${getThemeColor(colors.blue[400])};
`

const TooltipCloseButton = styled.span`
    display: flex;
    flex-direction: row;
    padding: 0;
    border: none;
    outline: none;
    background: none;
    cursor: pointer;
    pointer-events: all;
`

export default ToggleSortDirection
