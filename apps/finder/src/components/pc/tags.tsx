import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

import { Label, LabelSize } from '@klaytn/slush'

import { getSearchResultPageUri } from '../../hooks/useSearchBar'

type TagsProps = {
    tags: ReadonlyArray<string>
    size?: LabelSize
}

export const Tags = ({ tags, size }: TagsProps) => {
    return (
        <Container>
            {tags.map((tag) => (
                <Tag key={tag} name={tag} size={size} />
            ))}
        </Container>
    )
}

const Container = styled.div`
    display: flex;
    flex-direction: row;
    gap: 8px;
`

type TagProps = {
    name: string
    size?: LabelSize
}
const Tag = ({ name, size }: TagProps) => {
    const to = useMemo(() => getSearchResultPageUri(`#${name}`), [name])

    return (
        <TagContainer to={to}>
            <Label size={size} color="black">
                #{name}
            </Label>
        </TagContainer>
    )
}

const TagContainer = styled(Link)`
    height: 28px;
`
