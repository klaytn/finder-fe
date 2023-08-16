import { selector } from 'recoil'

import { ContextMenuItem } from '@klaytn/slush'

import { getTransactionTypes } from '../api/transaction'

export const transactionTypesQuery = selector({
    key: 'transactionTypes',
    async get() {
        const { data } = await getTransactionTypes()

        const result: ContextMenuItem[] = [
            {
                label: 'SHOW ALL',
                subItems: [],
            },
        ]

        for (const [title, subtypeList] of Object.entries(data)) {
            const subItems: ContextMenuItem[] = []

            for (const [subtile, type] of Object.entries(subtypeList)) {
                if (!subtile || !type) {
                    continue
                }
                subItems.push({ label: subtile, value: type })
            }

            result.push({
                label: title,
                subItems,
            })
        }

        return result
    },
})

export const transactionTypeMapQuery = selector({
    key: 'transactionTypeMapQuery',
    get({ get }) {
        const transactionTypes = get(transactionTypesQuery)

        const result = new Map<string, string>()
        for (const { subItems = [] } of transactionTypes) {
            for (const { label, value } of subItems) {
                result.set(value || '', label)
            }
        }

        return result
    },
})

export const transactionTypeMultipleQuery = selector({
    key: 'transactionTypeMultipleQuery',
    get({ get }) {
        const transactionTypes = get(transactionTypesQuery)

        let order = 0
        return transactionTypes
            .filter(({ label }) => label !== 'SHOW ALL')
            .map((item) => {
                const result: ContextMenuItem[] = []

                result.push({
                    label: item.label,
                    isTitle: true,
                    collapse: 'open',
                })

                item.subItems?.forEach((subItem) => {
                    result.push({
                        ...subItem,
                        label: subItem.label,
                        indent: 1,
                        sortOrder: order++,
                    })
                })

                return result
            })
            .reduce((prev, cur) => [...prev, ...cur], [])
    },
})
