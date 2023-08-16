import { Component } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { darcula, materialLight } from 'react-syntax-highlighter/dist/esm/styles/prism'
import styled from 'styled-components'

import { colors, Flex, Text, Theme, typos } from '@klaytn/slush'

import { useAccountContractCode } from '../../../../api/account'
import { useFinderTheme } from '../../../../context/finderThemeProvider'
import { NotFoundError } from '../../../../errors/networkErrors'
import { getThemeColorOnAttrs } from '../../../../functions/colorMap'
import ExpandableContent from './expandableContent'
import NotSubmitted from './notSubmitted'

type AccountContractTabProps = {
    address: string
}

class AccountContractTab extends Component<AccountContractTabProps, { hasError: boolean }> {
    state = {
        hasError: false,
    }

    static getDerivedStateFromError(error: unknown) {
        if (error instanceof NotFoundError) {
            return { hasError: true }
        }

        throw error
    }

    render() {
        if (this.state.hasError) {
            return <NotSubmitted />
        }

        return <AccountContractTabInner address={this.props.address} />
    }
}

const AccountContractTabInner = ({ address }: AccountContractTabProps) => {
    const { name, compilerVersion, sourceCode, rawAbi, abiEncodedValue, creationCode } = useAccountContractCode(address)
    const {
        theme: { slush },
    } = useFinderTheme()
    const isDarkMode = slush === Theme.dark

    return (
        <Container>
            <TitleText>Contract Source Code Matched</TitleText>
            <SubTitleText>(Similar match)</SubTitleText>

            <DescRow title="Contract Name" value={name} />
            <DescRow title="Compiler Version" value={compilerVersion} />

            <NoteText>
                Note: Code has been submitted. Klaytnfinder provides submitted code information as-is, and cannot vouch
                for their security and/or trustworthiness. This contract matches the deployed ByteCode of the Source
                Code for Contract {address}
            </NoteText>

            <SourceCodeTitleRow>
                <SourceCodeTitleText>Contract Source Code</SourceCodeTitleText>
                <SourceCodeSubTitleText> (Solidity)</SourceCodeSubTitleText>
            </SourceCodeTitleRow>

            <SyntaxHighlighter
                style={isDarkMode ? darcula : materialLight}
                language="solidity"
                showLineNumbers
                wrapLongLines
                customStyle={{ height: 197, marginBottom: 32 }}
            >
                {sourceCode}
            </SyntaxHighlighter>

            <ExpandableContent title="Contract ABI" value={rawAbi} />
            <ExpandableContent title="Contract Creation Code" value={creationCode} />
            {abiEncodedValue && <ExpandableContent title="ABI-encoded Value" value={abiEncodedValue} />}
        </Container>
    )
}

const Container = styled(Flex)``

const TitleText = styled(Text).attrs(
    getThemeColorOnAttrs({
        typo: typos.suit['14.18_900'],
        color: colors.white,
    }),
)`
    margin-bottom: 4px;
`

const SubTitleText = styled(Text).attrs(
    getThemeColorOnAttrs({
        typo: typos.suit['14.18_400'],
        color: colors.black[400],
    }),
)`
    margin-bottom: 24px;
`

type DescRowProps = {
    title: string
    value: string
}

const DescRow = ({ title, value }: DescRowProps) => {
    return (
        <DescContainer>
            <DescTitleText>{title}</DescTitleText>
            <DescValueText>{value}</DescValueText>
        </DescContainer>
    )
}

const DescContainer = styled(Flex).attrs({
    direction: 'row',
})`
    margin-bottom: 8px;
`

const DescTitleText = styled(Text).attrs(
    getThemeColorOnAttrs({
        typo: typos.suit['14.18_900'],
        color: colors.blue[200],
    }),
)`
    width: 150px;
    min-width: 150px;
`

const DescValueText = styled(Text).attrs(
    getThemeColorOnAttrs({
        typo: typos.suit['14.18_400'],
        color: colors.white,
    }),
)`
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`

const NoteText = styled(Text).attrs(
    getThemeColorOnAttrs({
        typo: typos.suit['12.16_400'],
        color: colors.black[400],
    }),
)`
    margin-top: 16px;
    margin-bottom: 32px;
`

const SourceCodeTitleRow = styled(Flex).attrs({
    direction: 'row',
})`
    margin-bottom: 24px;
`

const SourceCodeTitleText = styled(TitleText)`
    margin-bottom: 0px;
    margin-right: 4px;
`

const SourceCodeSubTitleText = styled(SubTitleText)`
    margin-bottom: 0px;
`

export default AccountContractTab
