import { IconProps } from './type'

const ArrowcomboOutsimpleIcon = ({ size, color = '#19171C' }: IconProps) => {
    return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M19 6C19 5.44772 19.4477 5 20 5H26C26.5523 5 27 5.44772 27 6V12C27 12.5523 26.5523 13 26 13C25.4477 13 25 12.5523 25 12V7H20C19.4477 7 19 6.55228 19 6Z"
                fill={color}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M26.7071 5.29289C27.0976 5.68342 27.0976 6.31658 26.7071 6.70711L19.7071 13.7071C19.3166 14.0976 18.6834 14.0976 18.2929 13.7071C17.9024 13.3166 17.9024 12.6834 18.2929 12.2929L25.2929 5.29289C25.6834 4.90237 26.3166 4.90237 26.7071 5.29289Z"
                fill={color}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M6 19C6.55228 19 7 19.4477 7 20V25H12C12.5523 25 13 25.4477 13 26C13 26.5523 12.5523 27 12 27H6C5.44772 27 5 26.5523 5 26V20C5 19.4477 5.44772 19 6 19Z"
                fill={color}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M13.7071 18.2929C14.0976 18.6834 14.0976 19.3166 13.7071 19.7071L6.70711 26.7071C6.31658 27.0976 5.68342 27.0976 5.29289 26.7071C4.90237 26.3166 4.90237 25.6834 5.29289 25.2929L12.2929 18.2929C12.6834 17.9024 13.3166 17.9024 13.7071 18.2929Z"
                fill={color}
            />
        </svg>
    )
}

export default ArrowcomboOutsimpleIcon
