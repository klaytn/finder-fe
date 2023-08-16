import { IconProps } from './type'

const BrowserMultiIcon = ({ size, color = '#19171C' }: IconProps) => {
    return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M3 11C3 9.89543 3.89543 9 5 9H23C24.1046 9 25 9.89543 25 11V25C25 26.1046 24.1046 27 23 27H5C3.89543 27 3 26.1046 3 25V11ZM23 11H5V25H23V11Z"
                fill={color}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M7.58579 5.58579C7.96086 5.21071 8.46957 5 9 5H27C27.5304 5 28.0391 5.21071 28.4142 5.58579C28.7893 5.96086 29 6.46957 29 7V21C29 21.5304 28.7893 22.0391 28.4142 22.4142C28.0391 22.7893 27.5304 23 27 23H24C23.4477 23 23 22.5523 23 22C23 21.4477 23.4477 21 24 21H27V7L9 7L9 10C9 10.5523 8.55228 11 8 11C7.44772 11 7 10.5523 7 10V7C7 6.46957 7.21071 5.96086 7.58579 5.58579Z"
                fill={color}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M3 14C3 13.4477 3.44772 13 4 13H24C24.5523 13 25 13.4477 25 14C25 14.5523 24.5523 15 24 15H4C3.44772 15 3 14.5523 3 14Z"
                fill={color}
            />
        </svg>
    )
}

export default BrowserMultiIcon
