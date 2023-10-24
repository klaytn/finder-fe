import { datadogRum } from '@datadog/browser-rum'
import React, { lazy, Suspense } from 'react'
import ReactDOM from 'react-dom'
import ReactGA from 'react-ga4'
import { BrowserRouter } from 'react-router-dom'
import { RecoilRoot } from 'recoil'
import { ReportHandler } from 'web-vitals'

import packageInfo from '../package.json'
import TitleSetter from './components/commons/gaTitleSetter'
import GlobalStyle from './components/commons/globalStyle'
import MobileSwitcher from './components/commons/MobileSwitcher'
import { getRouteFromPath } from './constants/routes'
import ConfigProvider from './context/configProvider'
import FinderThemeProvider from './context/finderThemeProvider'
import ScrollToTop from './hooks/ScrollToTop'
import WSConnector from './layouts/WSConnector'
import reportWebVitals from './reportWebVitals'
import { getConfig, RumConfig, Target } from './variants/config'
import './index.css'

const slushPackage = import('@klaytn/slush')
const ProgressCircle = lazy(() => slushPackage.then(({ ProgressCircle }) => ({ default: ProgressCircle })))
const Popup = lazy(() => import('./components/commons/Popup'))

function setupTitle(target: string) {
    if (target === 'prod') {
        return
    }

    const titleElm = document.querySelector('title')
    if (titleElm) {
        titleElm.innerText = `[${target}] ${titleElm.innerText}`
    } else {
        setTimeout(() => setupTitle(target), 100)
    }
}

function setupMonitoring(rumConfig: RumConfig, target: Target, network: string) {
    if (Object.values(rumConfig).some((config) => !config)) {
        return
    }

    const { applicationId, clientToken } = rumConfig
    datadogRum.init({
        applicationId,
        clientToken,
        site: 'datadoghq.com',
        service: network,
        env: target,
        sampleRate: 100,
        premiumSampleRate: 100,
        trackInteractions: true,
        defaultPrivacyLevel: 'allow',
        version: packageInfo.version,
    })

    datadogRum.startSessionReplayRecording()
}

async function main() {
    const { rumConfig, gaId, target, network } = await getConfig()

    setupMonitoring(rumConfig, target, network)

    setupTitle(target)

    ReactDOM.render(
        <React.StrictMode>
            <FinderThemeProvider>
                <GlobalStyle />
                <BrowserRouter>
                    <TitleSetter />
                    <RecoilRoot>
                        <Suspense fallback={null}>
                            <ConfigProvider>
                                <WSConnector>
                                    <Suspense fallback={<ProgressCircle show />}>
                                        <ScrollToTop />
                                        <MobileSwitcher />
                                        <Popup />
                                    </Suspense>
                                </WSConnector>
                            </ConfigProvider>
                        </Suspense>
                    </RecoilRoot>
                </BrowserRouter>
            </FinderThemeProvider>
        </React.StrictMode>,
        document.getElementById('root'),
    )

    if (gaId) {
        ReactGA.initialize(gaId, {
            testMode: process.env.NODE_ENV === 'development',
        })

        const route = getRouteFromPath(location.pathname)
        const tab = new URLSearchParams(location.search).get('tabId')
        const pageTitle = tab ? `${network}-${route}-${tab}` : `${network}-${route}`
        ReactGA.set({
            page_title: pageTitle,
        })

        // For initial page load, send to Google Analytics
        ReactGA.send('pageview')

        const sendToAnalytics: ReportHandler = ({ id, name, value }) => {
            ReactGA.event({
                category: 'Web Vitals',
                action: name,
                value: Math.round(name === 'CLS' ? value * 1000 : value), // values must be integers
                label: id, // id unique to current page load
                nonInteraction: true, // avoids affecting bounce rate
            })
        }

        // If you want to start measuring performance in your app, pass a function
        // to log results (for example: reportWebVitals(console.log))
        // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
        reportWebVitals(sendToAnalytics)
    }
}

main()
