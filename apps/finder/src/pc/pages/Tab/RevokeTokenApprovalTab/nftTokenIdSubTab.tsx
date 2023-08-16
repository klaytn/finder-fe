import { useState } from 'react'
import styled from 'styled-components'

import { Button, ChevronRightIcon, useToggle } from '@klaytn/slush'

import { useApprovedNftsByTokenId } from '../../../../api/my'
import Empty from '../../../../components/commons/empty'
import { Table, TableHeader, TableHeaders, TableRow } from '../../../../components/commons/table/basic'
import {
    TableBlockIdCell,
    TableHashCell,
    TableNameWithIconCell,
    TableTimesAgoCell,
    TableTokenIdCell,
} from '../../../../components/commons/table/variants'
import Page from '../../../../components/Page'
import { ROUTES } from '../../../../constants/routes'
import useQuery from '../../../../hooks/useQuery'
import { useWalletManager } from '../../../../hooks/useWalletManager'
import { ApprovedNftVO } from '../../../../vo/approvedToken'
import RevokeDialog, { NftTokenIdProps } from './revokeDialog'

const NftTokenIdSubTab = () => {
    const { selectedAddress } = useWalletManager()
    const query = useQuery()
    const page = query.get('page') || '1'
    const tabId = query.get('tabId')
    const subTabId = query.get('subTabId')

    const { data, refresh } = useApprovedNftsByTokenId(selectedAddress, page, 20)
    const { results, currentPage, totalPage, totalCount } = data

    const [dialogState, setDialogState] = useState<NftTokenIdProps>({})
    const { isShow, on, off } = useToggle()

    const handleRevoke = (item: ApprovedNftVO) => {
        setDialogState({
            tokenId: item.approvedTokenId,
            contractSummary: item.contractSummary,
            lastUpdated: item.timestamp,
            spenderAccount: item.spenderAccount,
        })
        on()
    }

    return (
        <>
            <RevokeDialog type="nft-token-id" refresh={refresh} open={isShow} onClose={off} {...dialogState} />
            {totalPage === 0 ? (
                <Empty />
            ) : (
                <>
                    <Table columnSizeList={[224, 220, 200, 120, 160, 236]} totalCount={totalCount}>
                        <TableHeaders>
                            <TableHeader>Assets</TableHeader>
                            <TableHeader>Approved Spender</TableHeader>
                            <TableHeader>Token ID</TableHeader>
                            <TableHeader>Last Update (Times ago)</TableHeader>
                            <TableHeader>TX Hash</TableHeader>
                            <TableHeader>Blocks #</TableHeader>
                        </TableHeaders>

                        {results.map((item) => (
                            <TableRow key={`${item.txHash}`}>
                                <TableNameWithIconCell
                                    name={item.contractSummary.name}
                                    iconUri={item.contractSummary.icon}
                                    link={`${ROUTES.NFT.DETAIL.replace(
                                        ':address',
                                        item.contractSummary.contractAddress,
                                    )}`}
                                />
                                <TableHashCell value={item.spenderAccount} icon />
                                <TableTokenIdCell
                                    contractAddress={item.contractSummary.contractAddress}
                                    tokenId={item.approvedTokenId}
                                    align="left"
                                    copyButtonPosition="left"
                                />
                                <TableTimesAgoCell value={item.timestamp} />
                                <TableHashCell value={item.txHash} />
                                <TableBlockIdCell value={item.blockNumber} padding={116} />
                                <ButtonContainer>
                                    <RevokeButton onClick={() => handleRevoke(item)}>Revoke</RevokeButton>
                                </ButtonContainer>
                            </TableRow>
                        ))}
                    </Table>

                    <Page
                        current={currentPage}
                        total={totalPage}
                        query={{
                            tabId,
                            subTabId,
                        }}
                    />
                </>
            )}
        </>
    )
}

const ButtonContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`

const RevokeButton = styled(Button).attrs({
    rightIcon: ChevronRightIcon,
    size: 32,
    buttonType: 'forth',
})`
    width: 88px;
    margin: 0;
`

export default NftTokenIdSubTab
