import { atom } from 'recoil'

export const timerState = atom<number>({
    key: 'timer',
    default: Date.now(),
})
