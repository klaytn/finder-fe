import { lazy, Suspense } from 'react'
import { Route, Routes, useMatch, useLocation } from 'react-router'

import { ProgressCircle } from '@klaytn/slush'

import PageErrorBoundary from '../components/PageErrorBoundary'
import { ROUTES } from '../constants/routes'
import NotFound, { MOBILE_ERROR_CONTENT } from './components/notFound/notFound'
import MaintenancePage from './pages/maintenancePage'

const GenesisBlockPage = lazy(() => import('./components/block/genesisBlock'))
const MobileLayout = lazy(() => import('./components/common/mobileLayout'))
const AccountPage = lazy(() => import('./pages/accountPage'))
const BlockPage = lazy(() => import('./pages/blockPage'))
const BlocksPage = lazy(() => import('./pages/blocksPage'))
const HomePage = lazy(() => import('./pages/homePage'))
const NftPage = lazy(() => import('./pages/nftPage'))
const NftItemPage = lazy(() => import('./pages/nftItemPage'))
const NftsPage = lazy(() => import('./pages/nftsPage'))
const SearchPage = lazy(() => import('./pages/searchPage'))
const TokenPage = lazy(() => import('./pages/tokenPage'))
const TokensPage = lazy(() => import('./pages/tokensPage'))
const TransactionPage = lazy(() => import('./pages/transactionPage'))
const TransactionSimplePage = lazy(() => import('./pages/transactionSimplePage'))
const TransactionsPage = lazy(() => import('./pages/transactionsPage'))
const RedirectAccount = lazy(() => import('../components/RedirectAccount'))

const MobileApp = () => {
    const isHomePage = !!useMatch(ROUTES.HOME)
    const isTransactionSimplePage = !!useMatch(ROUTES.TX.SIMPLE)
    const isMaintenancePage = !!useMatch(ROUTES.ERROR.MAINTENANCE)
    const { pathname } = useLocation()

    if (isMaintenancePage) {
        return <MaintenancePage />
    }

    return (
        <MobileLayout
            noSearchBar={isHomePage || isTransactionSimplePage}
            noHeader={isTransactionSimplePage}
            noFooter={isTransactionSimplePage}
        >
            <Suspense fallback={<ProgressCircle show />}>
                <PageErrorBoundary pathname={pathname} fallback={NotFound}>
                    <Routes>
                        <Route path={ROUTES.HOME} element={<HomePage />} />
                        <Route path={ROUTES.BLOCK.LIST} element={<BlocksPage />} />
                        <Route path={ROUTES.BLOCK.GENESIS} element={<GenesisBlockPage />} />
                        <Route path={ROUTES.BLOCK.DETAIL} element={<BlockPage />} />
                        <Route path={ROUTES.TX.LIST} element={<TransactionsPage />} />
                        <Route path={ROUTES.TX.DETAIL} element={<TransactionPage />} />
                        <Route path={ROUTES.TX.SIMPLE} element={<TransactionSimplePage />} />
                        <Route path={ROUTES.TOKEN.LIST} element={<TokensPage />} />
                        <Route path={ROUTES.TOKEN.DETAIL} element={<TokenPage />} />
                        <Route path={ROUTES.NFT.LIST} element={<NftsPage />} />
                        <Route path={ROUTES.NFT.DETAIL} element={<NftPage />} />
                        <Route path={ROUTES.NFT.DETAIL_TOKEN} element={<NftItemPage />} />
                        <Route path={ROUTES.ACCOUNT.DETAIL} element={<AccountPage />} />
                        <Route path={ROUTES.SEARCH} element={<SearchPage />} />
                        <Route path={ROUTES.ACCOUNT.REDIRECT} element={<RedirectAccount />} />
                        <Route path="*" element={<NotFound content={MOBILE_ERROR_CONTENT.PAGE} />} />
                    </Routes>
                </PageErrorBoundary>
            </Suspense>
        </MobileLayout>
    )
}

export default MobileApp
