import { IconProps } from './type'

const ArrowfatlineBottomIcon = ({ size, color = '#19171C' }: IconProps) => {
    return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M16 3C16.5523 3 17 3.44772 17 4V23C17 23.5523 16.5523 24 16 24C15.4477 24 15 23.5523 15 23V4C15 3.44772 15.4477 3 16 3Z"
                fill={color}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M6.29289 13.2929C6.68342 12.9024 7.31658 12.9024 7.70711 13.2929L16 21.5858L24.2929 13.2929C24.6834 12.9024 25.3166 12.9024 25.7071 13.2929C26.0976 13.6834 26.0976 14.3166 25.7071 14.7071L16.7071 23.7071C16.3166 24.0976 15.6834 24.0976 15.2929 23.7071L6.29289 14.7071C5.90237 14.3166 5.90237 13.6834 6.29289 13.2929Z"
                fill={color}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M4 27C4 26.4477 4.44772 26 5 26H27C27.5523 26 28 26.4477 28 27C28 27.5523 27.5523 28 27 28H5C4.44772 28 4 27.5523 4 27Z"
                fill={color}
            />
        </svg>
    )
}

export default ArrowfatlineBottomIcon
