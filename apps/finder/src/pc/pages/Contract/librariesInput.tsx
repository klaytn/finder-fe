import { ChangeEvent, useCallback, useMemo, useState } from 'react'
import styled from 'styled-components'

import { Button, colors, Input, MathMinusIcon, MathPlusIcon, typos } from '@klaytn/slush'

import { Library } from '../../../api/contract'
import { removeItem, replaceItem } from '../../../functions/array'
import { getThemeColor } from '../../../functions/colorMap'

type LibrariesInputProps = {
    libraries: Library[]
    onChange(libraries: Library[]): void
}

const LibrariesInput = ({ libraries, onChange }: LibrariesInputProps) => {
    const [showCount, setShowCount] = useState(0)

    const handleAdd = useCallback(() => {
        setShowCount((prev) => prev + 1)
    }, [])

    const handleDeleteList = useMemo(() => {
        const createHandleDelete = (index: number) => () => {
            const nextLibraries = [...removeItem(libraries, index), { name: '', address: '' }]
            setShowCount((prev) => prev - 1)
            onChange(nextLibraries)
        }

        return Array.from({ length: libraries.length }).map((_, index) => createHandleDelete(index))
    }, [libraries, onChange])

    const handleChangeList = useMemo(() => {
        const createHandleChange = (index: number) => (library: Library) => {
            const nextLibraries = replaceItem(libraries, index, library)
            onChange(nextLibraries)
        }

        return Array.from({ length: libraries.length }).map((_, index) => createHandleChange(index))
    }, [libraries, onChange])

    return (
        <Container>
            <AddButton
                buttonType="third"
                type="button"
                leftIcon={MathPlusIcon}
                onClick={handleAdd}
                disabled={showCount === libraries.length}
            >
                Add Library
            </AddButton>
            {showCount > 0 && <Header />}
            {Array.from({ length: showCount }).map((_, index) => (
                <LibraryRow
                    key={index}
                    index={index + 1}
                    library={libraries[index]}
                    onDelete={handleDeleteList[index]}
                    onChange={handleChangeList[index]}
                />
            ))}
        </Container>
    )
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 12px;
`

const AddButton = styled(Button)`
    width: 145px;
    margin: 16px 0px 12px 0px;
`

const Header = () => {
    return (
        <RowContainer>
            <RowHeaderColumn>No.</RowHeaderColumn>
            <RowHeaderColumn>Library Name</RowHeaderColumn>
            <RowHeaderColumn>Library Contract Address</RowHeaderColumn>
        </RowContainer>
    )
}

type LibraryRowProps = {
    index: number
    library: Library
    onDelete(): void
    onChange(library: Library): void
}

const LibraryRow = ({ index, library, onDelete, onChange }: LibraryRowProps) => {
    const handleNameChange = useCallback(
        ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
            onChange({
                ...library,
                name: value,
            })
        },
        [onChange, library],
    )

    const handleNameClear = useCallback(() => {
        onChange({
            ...library,
            name: '',
        })
    }, [onChange, library])

    const handleAddressChange = useCallback(
        ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
            onChange({
                ...library,
                address: value,
            })
        },
        [onChange, library],
    )

    const handleAddressClear = useCallback(() => {
        onChange({
            ...library,
            address: '',
        })
    }, [onChange, library])

    return (
        <RowContainer>
            <RowColumn>{index}</RowColumn>
            <RowColumn>
                <Input value={library.name} hasClearButton onChange={handleNameChange} onClear={handleNameClear} />
            </RowColumn>
            <RowColumn>
                <Input
                    value={library.address}
                    hasClearButton
                    onChange={handleAddressChange}
                    onClear={handleAddressClear}
                />
            </RowColumn>
            <RowColumn>
                <DeleteButton buttonType="forth" leftIcon={MathMinusIcon} onClick={onDelete} type="button" />
            </RowColumn>
        </RowContainer>
    )
}

const RowContainer = styled.div`
    display: flex;
    flex-direction: row;
    gap: 12px;

    & > :nth-child(1) {
        width: 60px;
    }

    & > :nth-child(2) {
        width: 320px;
    }

    & > :nth-child(3) {
        width: 496px;
    }

    & > :nth-child(4) {
        width: 40px;
    }
`

const RowHeaderColumn = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    ${typos.suit['12.16_400']};
    color: ${getThemeColor(colors.black[400])};
`

const RowColumn = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    ${typos.suit['14.18_400']};
    color: ${getThemeColor(colors.black[300])};
`

const DeleteButton = styled(Button)`
    margin: 0;
`

export default LibrariesInput
