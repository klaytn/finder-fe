import { useCallback } from 'react'
import styled from 'styled-components'

import { Button, CircleiconWarningOffIcon, colors, setTransition, typos } from '@klaytn/slush'

import { getThemeColor } from '../../../functions/colorMap'
import { toPascalCase } from '../../../functions/string'
import { useFinderThemeColor } from '../../../hooks/useFinderThemeColor'
import { WalletType } from '../../../states/wallet'

type NotInstalledStepProps = {
    selectedType: WalletType
}

const Links: Record<WalletType, string> = {
    KAIKAS: 'https://chrome.google.com/webstore/detail/kaikas/jblndlipeogpafnldhgmapagcccfchpi',
    METAMASK: 'https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn',
    KLIP: 'https://klipwallet.com',
    NONE: '',
}

export const NotInstalledStep = ({ selectedType }: NotInstalledStepProps) => {
    const iconColor = useFinderThemeColor(colors.yellow[500])

    const handleClickStoreButton = useCallback(() => {
        const link = Links[selectedType]
        if (!link) {
            return
        }

        window.open(link, '_blank', 'noopener')
    }, [selectedType])

    const handleRefresh = useCallback(() => {
        window.location.reload()
    }, [])

    return (
        <Container>
            <TopContainer>
                <CircleiconWarningOffIcon size={64} color={iconColor} />
                <Title>
                    Please Install
                    <br />
                    the {toPascalCase(selectedType)} Chrome Extension
                </Title>
                <Description>
                    To connect a wallet,
                    <br />
                    you need to install the extension.
                </Description>
            </TopContainer>

            <ChromeStoreButton onClick={handleClickStoreButton}>
                <ChromeStoreLogo />
            </ChromeStoreButton>

            <RefreshGuide>Installed the extension?</RefreshGuide>
            <RefreshButton buttonType="forth" onClick={handleRefresh}>
                Refresh to Connect Again
            </RefreshButton>
        </Container>
    )
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 32px;
`

const TopContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 16px;
`

const Title = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    text-align: center;
    color: ${getThemeColor(colors.white)};
    ${typos.suit['18.24_900']};
`

const Description = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    text-align: center;
    color: ${getThemeColor(colors.black[300])};
    ${typos.suit['14.18_400']};
`

const ChromeStoreButton = styled.button`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 4px 8px;
    width: 100%;
    border: 1px solid ${getThemeColor(colors.black[600])};
    border-radius: 14px;
    outline: none;
    background: none;
    cursor: pointer;
    ${setTransition('opacity')};

    &:hover {
        opacity: 0.8;
    }

    &:active {
        opacity: 1;
    }
`

const ChromeStoreLogo = () => {
    return (
        <svg width="150" height="46" viewBox="0 0 150 46" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="150" height="46" fill="url(#pattern0)" />
            <mask id="mask0_3741_60087" maskUnits="userSpaceOnUse" x="0" y="0" width="150" height="46">
                <rect width="150" height="46" fill="url(#pattern1)" />
            </mask>
            <g mask="url(#mask0_3741_60087)">
                <g opacity="0.5">
                    <rect x="45" y="11" width="98" height="25" fill="#D9D9D9" />
                </g>
            </g>
            <defs>
                <pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1">
                    <use
                        xlinkHref="#image0_3741_60087"
                        transform="translate(-0.00702222) scale(0.00204444 0.00666667)"
                    />
                </pattern>
                <pattern id="pattern1" patternContentUnits="objectBoundingBox" width="1" height="1">
                    <use
                        xlinkHref="#image0_3741_60087"
                        transform="translate(-0.00702222) scale(0.00204444 0.00666667)"
                    />
                </pattern>
                <image
                    id="image0_3741_60087"
                    width="496"
                    height="150"
                    xlinkHref="data:image/png;base64,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"
                />
            </defs>
        </svg>
    )
}

const RefreshGuide = styled.div`
    display: flex;
    flex-direction: column;
    text-align: center;
    color: ${getThemeColor(colors.black[300])};
    ${typos.suit['12.16_400']};
    margin-bottom: -20px;
`

const RefreshButton = styled(Button)`
    width: 100%;
`
