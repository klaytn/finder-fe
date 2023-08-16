import styled from 'styled-components'

import BlockHash from '../../../components/BlockHash'
import Copy from '../../../components/commons/Copy'
import Summary, { SummaryContainer, SummaryInnerContainer } from '../../../components/Summary'
import SummaryItem from '../../../components/SummaryItem'
import { useResources } from '../../../context/configProvider'
import { formatDatetime, withCommas } from '../../../functions/Functions'
import TimesAgo from '../../../mobile/components/common/timesAgo'
import { BlockVO } from '../../../vo/block'

interface IGenesisBlockProps {
    block: BlockVO
}

const WIDTH = 1200
const TITLE_WIDTH = 120

const GenesisBlock = ({ block }: IGenesisBlockProps) => {
    const { genesisBlock } = useResources()

    return (
        <>
            <SummaryContainer>
                <SummaryInnerContainer>
                    <Summary width={WIDTH}>
                        <SummaryItem>
                            <SummaryItem.Key width={TITLE_WIDTH}>Time</SummaryItem.Key>
                            <SummaryItem.Value width={WIDTH - TITLE_WIDTH}>
                                <TimesAgo datetime={block.datetime} />
                                <span style={{ color: '#968FA3', marginLeft: 12 }}>
                                    ({formatDatetime(block.datetime)})
                                </span>
                            </SummaryItem.Value>
                        </SummaryItem>
                        <SummaryItem>
                            <SummaryItem.Key width={TITLE_WIDTH}>Hash</SummaryItem.Key>
                            <SummaryItem.Value width={WIDTH - TITLE_WIDTH}>
                                <div className="flex" style={{ alignItems: 'center' }}>
                                    <BlockHash value={block.hash} />
                                    <Copy value={block.hash} />
                                </div>
                            </SummaryItem.Value>
                        </SummaryItem>
                        <SummaryItem>
                            <SummaryItem.Key width={TITLE_WIDTH}>Block Size</SummaryItem.Key>
                            <SummaryItem.Value width={WIDTH - TITLE_WIDTH}>
                                {withCommas(block.size)} bytes
                            </SummaryItem.Value>
                        </SummaryItem>
                        <SummaryItem freeHeight>
                            <SummaryItem.Key width={TITLE_WIDTH}>Names</SummaryItem.Key>
                            <SummaryItem.Value width={WIDTH - TITLE_WIDTH}>
                                {block.committee.blockProposer.label}
                            </SummaryItem.Value>
                        </SummaryItem>
                    </Summary>
                </SummaryInnerContainer>
            </SummaryContainer>

            <ImgContainer>
                <GenesisImg src={genesisBlock.filepath} />
            </ImgContainer>
        </>
    )
}

const ImgContainer = styled.div`
    display: flex;
    margin-top: 40px;
`

const GenesisImg = styled.img`
    width: 100%;
`

export default GenesisBlock
