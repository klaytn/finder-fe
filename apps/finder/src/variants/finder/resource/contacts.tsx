import { colors, Icon, IconProps, SnsInstagramWhiteIcon, SnsMediumWhiteIcon, SnsTwitterWhiteIcon } from '@klaytn/slush'

import { useFinderThemeColor } from '../../../hooks/useFinderThemeColor'
import { Contact } from '../../resource'

const KlaytnContactIcon: Icon = ({ size }: IconProps) => {
    const bgColor = useFinderThemeColor(colors.white)
    const color = useFinderThemeColor(colors.black[900])

    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="24" height="24" rx="12" fill={bgColor} />
            <path
                d="M16.4768 6.66255C15.2488 5.64383 13.7528 5.10865 12.2418 5.05603L8.6748 14.4102L16.4768 6.66255Z"
                fill={color}
            />
            <path
                d="M17.3667 7.54724L12.8857 11.9965L17.3657 16.4447C19.5307 13.875 19.5307 10.1179 17.3667 7.54724Z"
                fill={color}
            />
            <path
                d="M10.4887 6.12341L5.01371 11.5596C4.90671 13.2614 5.42572 14.994 6.57372 16.3881L10.4887 6.12341Z"
                fill={color}
            />
            <path
                d="M11.9947 12.8801L7.51367 17.3294C10.1027 19.478 13.8867 19.478 16.4747 17.3284L11.9947 12.8801Z"
                fill={color}
            />
        </svg>
    )
}

export const contacts: Contact[] = [
    {
        // Official Website
        icon: KlaytnContactIcon,
        link: 'https://klaytn.foundation/',
    },
    {
        // Medium
        icon: SnsMediumWhiteIcon,
        link: 'https://medium.com/klaytn',
    },
    {
        // Official Twitter
        icon: SnsTwitterWhiteIcon,
        link: 'https://twitter.com/klaytn_official',
    },
    {
        // Instagram
        icon: SnsInstagramWhiteIcon,
        link: 'https://www.instagram.com/klaytnofficial/',
    },
]
