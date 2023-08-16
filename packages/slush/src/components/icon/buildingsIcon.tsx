import { IconProps } from './type'

const BuildingsIcon = ({ size, color = '#19171C' }: IconProps) => {
    return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M1 27C1 26.4477 1.44772 26 2 26H30C30.5523 26 31 26.4477 31 27C31 27.5523 30.5523 28 30 28H2C1.44772 28 1 27.5523 1 27Z"
                fill={color}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H17C17.5304 3 18.0391 3.21071 18.4142 3.58579C18.7893 3.96086 19 4.46957 19 5V27C19 27.5523 18.5523 28 18 28C17.4477 28 17 27.5523 17 27L17 5H5L5 27C5 27.5523 4.55228 28 4 28C3.44772 28 3 27.5523 3 27V5C3 4.46957 3.21071 3.96086 3.58579 3.58579Z"
                fill={color}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M17 12C17 11.4477 17.4477 11 18 11H27C27.5304 11 28.0391 11.2107 28.4142 11.5858C28.7893 11.9609 29 12.4696 29 13V27C29 27.5523 28.5523 28 28 28C27.4477 28 27 27.5523 27 27L27 13L18 13C17.4477 13 17 12.5523 17 12Z"
                fill={color}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M7 9C7 8.44772 7.44772 8 8 8H12C12.5523 8 13 8.44772 13 9C13 9.55228 12.5523 10 12 10H8C7.44772 10 7 9.55228 7 9Z"
                fill={color}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M9 17C9 16.4477 9.44772 16 10 16H14C14.5523 16 15 16.4477 15 17C15 17.5523 14.5523 18 14 18H10C9.44772 18 9 17.5523 9 17Z"
                fill={color}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M7 22C7 21.4477 7.44772 21 8 21H12C12.5523 21 13 21.4477 13 22C13 22.5523 12.5523 23 12 23H8C7.44772 23 7 22.5523 7 22Z"
                fill={color}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M21 22C21 21.4477 21.4477 21 22 21H24C24.5523 21 25 21.4477 25 22C25 22.5523 24.5523 23 24 23H22C21.4477 23 21 22.5523 21 22Z"
                fill={color}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M21 17C21 16.4477 21.4477 16 22 16H24C24.5523 16 25 16.4477 25 17C25 17.5523 24.5523 18 24 18H22C21.4477 18 21 17.5523 21 17Z"
                fill={color}
            />
        </svg>
    )
}

export default BuildingsIcon
