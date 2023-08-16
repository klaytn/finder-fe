import { Icon, IconProps } from '@klaytn/slush'

const TokenIcon: Icon = ({ size, color }: IconProps) => {
    return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M16 1C7.71573 1 1 7.71573 1 16C1 24.2843 7.71573 31 16 31C24.2843 31 31 24.2843 31 16C31 7.71573 24.2843 1 16 1ZM3.30769 16C3.30769 8.99023 8.99023 3.30769 16 3.30769C23.0098 3.30769 28.6923 8.99023 28.6923 16C28.6923 23.0098 23.0098 28.6923 16 28.6923C8.99023 28.6923 3.30769 23.0098 3.30769 16Z"
                fill={color}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M8.61538 11.3846C8.61538 10.7474 9.13198 10.2308 9.76923 10.2308H22.2308C22.868 10.2308 23.3846 10.7474 23.3846 11.3846C23.3846 12.0219 22.868 12.5385 22.2308 12.5385H9.76923C9.13198 12.5385 8.61538 12.0219 8.61538 11.3846Z"
                fill={color}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M16 10.4615C16.6373 10.4615 17.1538 10.9781 17.1538 11.6154V22.2308C17.1538 22.868 16.6373 23.3846 16 23.3846C15.3627 23.3846 14.8462 22.868 14.8462 22.2308V11.6154C14.8462 10.9781 15.3627 10.4615 16 10.4615Z"
                fill={color}
            />
        </svg>
    )
}

export default TokenIcon
