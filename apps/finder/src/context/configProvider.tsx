import Axios from 'axios'
import { createContext, ReactNode, useCallback, useContext, useEffect, useState } from 'react'
import { useLocation } from 'react-router'

import { getMaintenanceInfo, Maintenance } from '../api/common'
import { ROUTES } from '../constants/routes'
import { Config, getConfig } from '../variants/config'
import { getResources, Resources } from '../variants/resource'

type ConfigContextProps = {
    config?: Config
    maintenanceInfo?: Maintenance
    resources?: Resources
}
const ConfigContext = createContext<ConfigContextProps>({})

type ConfigProviderProps = {
    children: ReactNode
}

async function check(pathname: string) {
    try {
        const {
            data: { application, config },
        } = await getMaintenanceInfo()

        // If it's a maintenance page and there's no error, redirect to the home page
        if (pathname === ROUTES.ERROR.MAINTENANCE) {
            window.location.replace(ROUTES.HOME)
        } else {
            return {
                application,
                config,
            }
        }
    } catch (error) {
        if (!Axios.isAxiosError(error)) {
            return
        }

        if (error.response?.status === 401) {
            // Redirect to maintenance page on authentication error
            if (pathname !== ROUTES.ERROR.MAINTENANCE) {
                window.location.replace(ROUTES.ERROR.MAINTENANCE)
            }
            return
        }

        if (error.response?.status !== 503) {
            return
        }

        if (pathname === ROUTES.ERROR.MAINTENANCE) {
            return
        }

        // Redirect to maintenance page only if under maintenance
        window.location.replace(ROUTES.ERROR.MAINTENANCE)
    }
}

const ConfigProvider = ({ children }: ConfigProviderProps) => {
    const [config, setConfig] = useState<Config>()
    const [maintenanceInfo, setMaintenanceInfo] = useState<Maintenance>()
    const [resources, setResources] = useState<Resources>()

    const location = useLocation()

    const checkAndUpdateMaintenanceInfo = useCallback(async () => {
        const newMaintenanceInfo = await check(location.pathname)
        if (!newMaintenanceInfo) {
            return
        }

        if (JSON.stringify(maintenanceInfo) !== JSON.stringify(newMaintenanceInfo)) {
            setMaintenanceInfo(newMaintenanceInfo)
        }
    }, [maintenanceInfo, location.pathname])

    useEffect(() => {
        checkAndUpdateMaintenanceInfo()
    }, [checkAndUpdateMaintenanceInfo])

    useEffect(() => {
        ;(async () => {
            const config = await getConfig()
            setConfig(config)

            if (config) {
                const resources = await getResources(config)
                setResources(resources)
            }
        })()
    }, [])

    if (!config || !maintenanceInfo || !resources) {
        return null
    }

    return <ConfigContext.Provider value={{ config, maintenanceInfo, resources }}>{children}</ConfigContext.Provider>
}

export const useConfig = () => {
    const { config } = useContext(ConfigContext)

    if (!config) {
        throw new Error('Not loaded config')
    }

    return config
}

export const useFeatures = () => {
    const { maintenanceInfo } = useContext(ConfigContext)

    if (!maintenanceInfo) {
        throw new Error('Not loaded maintenanceInfo')
    }

    return maintenanceInfo.config.client
}

export const useResources = () => {
    const { resources } = useContext(ConfigContext)

    if (!resources) {
        throw new Error('Not loaded resources')
    }

    return resources
}

export const useServerConfig = () => {
    const { maintenanceInfo } = useContext(ConfigContext)

    if (!maintenanceInfo) {
        throw new Error('Not loaded maintenanceInfo')
    }

    return maintenanceInfo.config.server
}

export default ConfigProvider
