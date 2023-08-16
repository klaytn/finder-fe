import styled, { css } from 'styled-components'

import { colors, Flex, typos } from '@klaytn/slush'

import { CodeCard } from '../../../../components/pc/codeCard'
import { CodeViewer } from '../../../../components/pc/viewer/codeViewer'
import { JsonViewer } from '../../../../components/pc/viewer/jsonViewer'
import { getThemeColor } from '../../../../functions/colorMap'
import { ContractCodeVO } from '../../../../vo/contractCode'

type ViewCodeSubTabProps = {
    contractCode: ContractCodeVO
}

const ViewCodeSubTab = ({ contractCode }: ViewCodeSubTabProps) => {
    return (
        <div>
            <div>
                <TitleSpan>Contract Source Code Matched</TitleSpan> <TitleGraySpan>(Similar match)</TitleGraySpan>
            </div>
            <Flex direction="row" style={{ marginTop: 24 }}>
                <TitleDiv style={{ width: 130 }}>Contract Name</TitleDiv>
                <TitleWhiteDiv>{contractCode.name}</TitleWhiteDiv>
            </Flex>
            <Flex direction="row" style={{ marginTop: 8 }}>
                <TitleDiv style={{ width: 130 }}>Compiler Version</TitleDiv>
                <TitleWhiteDiv>{contractCode.compilerVersion}</TitleWhiteDiv>
            </Flex>
            <Desc style={{ marginTop: 24 }}>
                Note: Code has been submitted. Klaytnfinder provides submitted code information as-is, and cannot vouch
                for their security and/or trustworthiness. This contract matches the deployed ByteCode of the Source
                Code for Contract {contractCode.address}
            </Desc>

            {!!contractCode.sourceCode && (
                <CodeCard title="Contract Source Code" description="(Solidity)">
                    <CodeViewer code={contractCode.sourceCode} language="solidity" showLineNumbers />
                </CodeCard>
            )}

            {!!contractCode.rawAbi && (
                <CodeCard title="Contract ABI">
                    <JsonViewer data={contractCode.abi} collapsed={2} paddingLeft={36} />
                </CodeCard>
            )}

            {!!contractCode.creationCode && (
                <CodeCard title="Contract Creation Code">
                    <CodeViewer
                        code={contractCode.creationCode}
                        language="text"
                        wrapLongLines
                        lineBreak
                        paddingLeft={36}
                    />
                </CodeCard>
            )}

            {!!contractCode.abiEncodedValue && (
                <CodeCard title="ABI-encoded Value">
                    <CodeViewer
                        code={contractCode.abiEncodedValue}
                        language="text"
                        wrapLongLines
                        lineBreak
                        paddingLeft={36}
                    />
                </CodeCard>
            )}
        </div>
    )
}

const TitleStyle = css`
    ${typos.suit['14.18_900']};
`

const TitleDiv = styled.div`
    ${TitleStyle}
    color: ${getThemeColor(colors.blue[200])};
`

const TitleSpan = styled.span`
    ${TitleStyle}
    color: ${getThemeColor(colors.blue[100])};
`

const TitleGraySpan = styled.span`
    ${typos.suit['14.18_400']};
    color: ${getThemeColor(colors.black[500])};
`

const TitleWhiteDiv = styled.div`
    ${typos.suit['14.18_400']};
    color: ${getThemeColor(colors.white)};
`

const Desc = styled.div`
    ${typos.suit['12.16_400']};
    color: ${getThemeColor(colors.black[100])};
`

export default ViewCodeSubTab
