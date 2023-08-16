import { IconProps } from './type'

const ArrowBottomIcon = ({ size, color = '#19171C' }: IconProps) => {
    return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M16 4C16.5523 4 17 4.44772 17 5V27C17 27.5523 16.5523 28 16 28C15.4477 28 15 27.5523 15 27V5C15 4.44772 15.4477 4 16 4Z"
                fill={color}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M6.29289 17.2929C6.68342 16.9024 7.31658 16.9024 7.70711 17.2929L16 25.5858L24.2929 17.2929C24.6834 16.9024 25.3166 16.9024 25.7071 17.2929C26.0976 17.6834 26.0976 18.3166 25.7071 18.7071L16.7071 27.7071C16.3166 28.0976 15.6834 28.0976 15.2929 27.7071L6.29289 18.7071C5.90237 18.3166 5.90237 17.6834 6.29289 17.2929Z"
                fill={color}
            />
        </svg>
    )
}

export default ArrowBottomIcon
