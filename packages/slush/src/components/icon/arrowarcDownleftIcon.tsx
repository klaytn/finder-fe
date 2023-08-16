import { IconProps } from './type'

const ArrowarcDownleftIcon = ({ size, color = '#19171C' }: IconProps) => {
    return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M10.7071 12.2929C11.0976 12.6834 11.0976 13.3166 10.7071 13.7071L5.41421 19L10.7071 24.2929C11.0976 24.6834 11.0976 25.3166 10.7071 25.7071C10.3166 26.0976 9.68342 26.0976 9.29289 25.7071L3.29289 19.7071C2.90237 19.3166 2.90237 18.6834 3.29289 18.2929L9.29289 12.2929C9.68342 11.9024 10.3166 11.9024 10.7071 12.2929Z"
                fill={color}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M28 6C28.5523 6 29 6.44772 29 7C29 10.4478 27.6304 13.7544 25.1924 16.1924C22.7544 18.6304 19.4478 20 16 20H4C3.44772 20 3 19.5523 3 19C3 18.4477 3.44772 18 4 18H16C18.9174 18 21.7153 16.8411 23.7782 14.7782C25.8411 12.7153 27 9.91738 27 7C27 6.44772 27.4477 6 28 6Z"
                fill={color}
            />
        </svg>
    )
}

export default ArrowarcDownleftIcon
