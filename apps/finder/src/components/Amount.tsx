import BigNumber from 'bignumber.js'

import styles from './Amount.module.css'

interface IAmountProps {
    value: string | number
    fixedLength?: number
}

const Amount = ({ value, fixedLength = 2 }: IAmountProps) => {
    const amount = new BigNumber(value).toFixed(fixedLength).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')

    return <div className={styles.container}>{amount}</div>
}

export default Amount
