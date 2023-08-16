import { IconProps } from './type'

const ArrowelbowLeftupIcon = ({ size, color = '#19171C' }: IconProps) => {
    return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M9.29289 5.29289C9.68342 4.90237 10.3166 4.90237 10.7071 5.29289L16.7071 11.2929C17.0976 11.6834 17.0976 12.3166 16.7071 12.7071C16.3166 13.0976 15.6834 13.0976 15.2929 12.7071L10 7.41421L4.70711 12.7071C4.31658 13.0976 3.68342 13.0976 3.29289 12.7071C2.90237 12.3166 2.90237 11.6834 3.29289 11.2929L9.29289 5.29289Z"
                fill={color}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M10 5C10.5523 5 11 5.44772 11 6V23H28C28.5523 23 29 23.4477 29 24C29 24.5523 28.5523 25 28 25H10C9.44772 25 9 24.5523 9 24V6C9 5.44772 9.44772 5 10 5Z"
                fill={color}
            />
        </svg>
    )
}

export default ArrowelbowLeftupIcon
