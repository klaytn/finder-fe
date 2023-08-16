import { useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router'

import { defaultBlockResponse, getBlock } from '../../../api/block'
import TabErrorBoundary from '../../../components/TabErrorBoundary'
import { BlockTitle } from '../../../components/Title'
import { useResources } from '../../../context/configProvider'
import useAsyncError from '../../../hooks/useAsyncError'
import { BlockVO } from '../../../vo/block'
import BlockSummary from './BlockSummary'
import BlockTabContainer from './BlockTabContainer'
import GenesisBlock from './GenesisBlock'

const DEFAULT_BLOCK_VO = new BlockVO(defaultBlockResponse)

const Block = () => {
    const params = useParams()
    const throwError = useAsyncError()
    const blockId = Number(params.blockId)
    const { genesisBlock } = useResources()

    const [block, setBlock] = useState<BlockVO>(DEFAULT_BLOCK_VO)

    const fetchBlock = useCallback(
        async (blockId: number) => {
            if (blockId === 0) {
                setBlock(BlockVO.from(genesisBlock))
                return
            }

            try {
                const { data } = await getBlock(blockId)
                setBlock(new BlockVO(data))
            } catch (e) {
                throwError(e)
            }
        },
        [throwError, genesisBlock],
    )

    useEffect(() => {
        fetchBlock(blockId)
    }, [blockId, fetchBlock])

    const { isGenesisBlock, id } = block

    if (block.hash === '') {
        return null
    }

    return (
        <>
            <BlockTitle id={id} isGenesisBlock={isGenesisBlock} />

            {isGenesisBlock ? (
                <GenesisBlock block={block} />
            ) : (
                <>
                    <BlockSummary block={block} />
                    <TabErrorBoundary>
                        <BlockTabContainer blockId={blockId} />
                    </TabErrorBoundary>
                </>
            )}
        </>
    )
}

export default Block
