import { IconProps } from './type'

const ArrowTopIcon = ({ size, color = '#19171C' }: IconProps) => {
    return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M16 28C15.4477 28 15 27.5523 15 27L15 5C15 4.44772 15.4477 4 16 4C16.5523 4 17 4.44772 17 5L17 27C17 27.5523 16.5523 28 16 28Z"
                fill={color}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M25.7071 14.7071C25.3166 15.0976 24.6834 15.0976 24.2929 14.7071L16 6.41421L7.70711 14.7071C7.31658 15.0976 6.68342 15.0976 6.29289 14.7071C5.90237 14.3166 5.90237 13.6834 6.29289 13.2929L15.2929 4.29289C15.6834 3.90237 16.3166 3.90237 16.7071 4.29289L25.7071 13.2929C26.0976 13.6834 26.0976 14.3166 25.7071 14.7071Z"
                fill={color}
            />
        </svg>
    )
}

export default ArrowTopIcon
