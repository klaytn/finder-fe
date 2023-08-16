import { atom } from 'recoil'

export interface IFinderKlayPrice {
    usd_price: string
    btc_price: string
    usd_price_changes: string
    daily_active_wallet: string
    market_cap: string
    total_supply: string
}

export const finderKlayPriceState = atom<IFinderKlayPrice>({
    key: 'finderKlayPrice',
    default: {
        usd_price: '',
        btc_price: '',
        usd_price_changes: '',
        daily_active_wallet: '',
        market_cap: '',
        total_supply: '',
    },
})
