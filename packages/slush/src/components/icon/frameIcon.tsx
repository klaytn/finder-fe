import { IconProps } from './type'

const FrameIcon = ({ size, color = '#19171C' }: IconProps) => {
    return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M19 10C19 9.44772 19.4477 9 20 9H24C24.5523 9 25 9.44772 25 10V14C25 14.5523 24.5523 15 24 15C23.4477 15 23 14.5523 23 14V11H20C19.4477 11 19 10.5523 19 10Z"
                fill={color}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M8 17C8.55228 17 9 17.4477 9 18V21H12C12.5523 21 13 21.4477 13 22C13 22.5523 12.5523 23 12 23H8C7.44772 23 7 22.5523 7 22V18C7 17.4477 7.44772 17 8 17Z"
                fill={color}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M3 7C3 5.89543 3.89543 5 5 5H27C28.1046 5 29 5.89543 29 7V25C29 26.1046 28.1046 27 27 27H5C3.89543 27 3 26.1046 3 25V7ZM27 7H5V25H27V7Z"
                fill={color}
            />
        </svg>
    )
}

export default FrameIcon
