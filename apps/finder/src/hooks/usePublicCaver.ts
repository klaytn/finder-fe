import Caver from 'caver-js'

import { useConfig } from '../context/configProvider'
import { memoize } from '../functions/memoize'

const getPublicCaver = memoize((publicEn: string) => new Caver(publicEn))

const usePublicCaver = () => {
    const { publicEn, network } = useConfig()
    if (process.env.NODE_ENV === 'development') {
        return getPublicCaver(`http://localhost:3000/v1/${network}`)
    }

    return getPublicCaver(publicEn)
}

export default usePublicCaver
