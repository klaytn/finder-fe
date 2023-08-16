import { useRecoilValue } from 'recoil'

import { timerState } from '../states/timer'

function useTimer() {
    return useRecoilValue<number>(timerState)
}
export default useTimer
