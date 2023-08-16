import { IconProps } from './type'

const MathPlusminusIcon = ({ size, color = '#19171C' }: IconProps) => {
    return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M25.7071 6.29289C26.0976 6.68342 26.0976 7.31658 25.7071 7.70711L7.70711 25.7071C7.31658 26.0976 6.68342 26.0976 6.29289 25.7071C5.90237 25.3166 5.90237 24.6834 6.29289 24.2929L24.2929 6.29289C24.6834 5.90237 25.3166 5.90237 25.7071 6.29289Z"
                fill={color}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M3 9C3 8.44772 3.44772 8 4 8H14C14.5523 8 15 8.44772 15 9C15 9.55228 14.5523 10 14 10H4C3.44772 10 3 9.55228 3 9Z"
                fill={color}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M9 3C9.55228 3 10 3.44772 10 4V14C10 14.5523 9.55228 15 9 15C8.44772 15 8 14.5523 8 14V4C8 3.44772 8.44772 3 9 3Z"
                fill={color}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M17 23C17 22.4477 17.4477 22 18 22H28C28.5523 22 29 22.4477 29 23C29 23.5523 28.5523 24 28 24H18C17.4477 24 17 23.5523 17 23Z"
                fill={color}
            />
        </svg>
    )
}

export default MathPlusminusIcon
