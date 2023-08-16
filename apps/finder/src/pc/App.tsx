import { lazy, Suspense, useEffect } from 'react'
import { useLocation, Route, Routes } from 'react-router'
import styled from 'styled-components'

import PageError from '../components/PageError'
import PageErrorBoundary from '../components/PageErrorBoundary'
import { ERROR_CONTENT } from '../components/pc/error'
import { KlipQRCodePopup } from '../components/pc/wallet/klipQRCodePopup'
import { WalletConnectPopup } from '../components/pc/walletConnectPopup'
import { WrongNetworkToast } from '../components/pc/wrongNetworkToast'
import { ROUTES } from '../constants/routes'
import { useFeatures } from '../context/configProvider'
import { useWalletManager } from '../hooks/useWalletManager'
import Layout from '../layouts/Layout'
import Maintenance from './pages/Error/Maintenance'

const Account = lazy(() => import('./pages/Account'))
const Block = lazy(() => import('./pages/Block'))
const Blocks = lazy(() => import('./pages/Blocks'))
const ContractForm = lazy(() => import('./pages/Contract'))
const ContractResult = lazy(() => import('./pages/Contract/contractResult'))
const Home = lazy(() => import('./pages/Home'))
const Nft = lazy(() => import('./pages/Nft'))
const NftItem = lazy(() => import('./pages/NftItem'))
const Nfts = lazy(() => import('./pages/Nfts'))
const SearchAll = lazy(() => import('./pages/Search/SearchAll'))
const Token = lazy(() => import('./pages/Token'))
const Tokens = lazy(() => import('./pages/Tokens'))
const Transaction = lazy(() => import('./pages/Transaction'))
const Transactions = lazy(() => import('./pages/Transactions'))
const RedirectAccount = lazy(() => import('../components/RedirectAccount'))
const MyPage = lazy(() => import('./pages/My'))

function App() {
    const { walletConnect = false, myPage = false, contractCode = false } = useFeatures()
    const { pathname } = useLocation()
    const isHome = pathname === ROUTES.HOME

    const { walletManager } = useWalletManager()

    useEffect(() => {
        walletManager.autoConnect()
    }, [walletManager])

    return (
        <AppContainer>
            <Layout hideLayout={isHome}>
                <PageErrorBoundary pathname={pathname} fallback={PageError}>
                    <Suspense fallback={null}>
                        {walletConnect && (
                            <>
                                <WrongNetworkToast />
                                <WalletConnectPopup />
                            </>
                        )}
                        <Routes>
                            <Route path={ROUTES.HOME} element={<Home />} />
                            <Route path={ROUTES.BLOCK.LIST} element={<Blocks />} />
                            <Route path={ROUTES.BLOCK.DETAIL} element={<Block />} />
                            <Route path={ROUTES.TX.LIST} element={<Transactions />} />
                            <Route path={ROUTES.TX.DETAIL} element={<Transaction />} />
                            <Route path={ROUTES.TOKEN.LIST} element={<Tokens />} />
                            <Route path={ROUTES.TOKEN.DETAIL} element={<Token />} />
                            <Route path={ROUTES.NFT.LIST} element={<Nfts />} />
                            <Route path={ROUTES.NFT.DETAIL} element={<Nft />} />
                            <Route path={ROUTES.NFT.DETAIL_TOKEN} element={<NftItem />} />
                            <Route path={ROUTES.ACCOUNT.DETAIL} element={<Account />} />
                            <Route path={ROUTES.SEARCH} element={<SearchAll />} />
                            {contractCode && (
                                <>
                                    <Route path={ROUTES.CONTRACT.INPUT} element={<ContractForm />} />
                                    <Route path={ROUTES.CONTRACT.DONE} element={<ContractResult />} />
                                </>
                            )}
                            <Route path={ROUTES.ERROR.MAINTENANCE} element={<Maintenance />} />
                            <Route path={ROUTES.ACCOUNT.REDIRECT} element={<RedirectAccount />} />
                            {myPage && <Route path={ROUTES.MY} element={<MyPage />} />}
                            <Route path="*" element={<PageError content={ERROR_CONTENT.PAGE} />} />
                        </Routes>
                        <KlipQRCodePopup />
                    </Suspense>
                </PageErrorBoundary>
            </Layout>
        </AppContainer>
    )
}

const AppContainer = styled.div`
    height: 100vh;
    width: 1440px;
    margin: 0 auto;
`

export default App
