import { IconProps } from './type'

const ArrowfatlineDownleftIcon = ({ size, color = '#19171C' }: IconProps) => {
    return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M22.7071 10.2929C23.0976 10.6834 23.0976 11.3166 22.7071 11.7071L8.70711 25.7071C8.31658 26.0976 7.68342 26.0976 7.29289 25.7071C6.90237 25.3166 6.90237 24.6834 7.29289 24.2929L21.2929 10.2929C21.6834 9.90237 22.3166 9.90237 22.7071 10.2929Z"
                fill={color}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M8 11.5C8.55228 11.5 9 11.9477 9 12.5V24H20.5C21.0523 24 21.5 24.4477 21.5 25C21.5 25.5523 21.0523 26 20.5 26H8C7.44772 26 7 25.5523 7 25V12.5C7 11.9477 7.44772 11.5 8 11.5Z"
                fill={color}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M4 5C4 4.44772 4.44772 4 5 4H27C27.5523 4 28 4.44772 28 5C28 5.55228 27.5523 6 27 6H5C4.44772 6 4 5.55228 4 5Z"
                fill={color}
            />
        </svg>
    )
}

export default ArrowfatlineDownleftIcon
