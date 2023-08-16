import { selector } from 'recoil'

import { getContractCode } from '../api/contract'

export const contractCodeQuery = selector({
    key: 'contractCodeQuery',
    async get() {
        const { data } = await getContractCode()
        return data
    },
})
