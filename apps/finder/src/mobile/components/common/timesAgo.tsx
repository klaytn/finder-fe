import { timesAgo } from '../../../functions/Functions'
import useTimer from '../../../hooks/useTimer'

type TimesAgoProps = {
    datetime: Date
    short?: boolean
}

const TimesAgo = ({ datetime, short = false }: TimesAgoProps) => {
    const current = useTimer()

    return <>{timesAgo(datetime.toString(), current, short ? 'short' : undefined)}</>
}

export default TimesAgo
