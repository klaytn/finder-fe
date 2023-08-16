import { IconProps } from './type'

const PrinterIcon = ({ size, color = '#19171C' }: IconProps) => {
    return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M7 5C7 4.44772 7.44772 4 8 4H24C24.5523 4 25 4.44772 25 5V10C25 10.5523 24.5523 11 24 11C23.4477 11 23 10.5523 23 10V6H9V10C9 10.5523 8.55228 11 8 11C7.44772 11 7 10.5523 7 10V5Z"
                fill={color}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M7 19C7 18.4477 7.44772 18 8 18H24C24.5523 18 25 18.4477 25 19V27.5C25 28.0523 24.5523 28.5 24 28.5H8C7.44772 28.5 7 28.0523 7 27.5V19ZM9 20V26.5H23V20H9Z"
                fill={color}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M5.6625 11C4.95171 11 4.5 11.5249 4.5 12V21H8C8.55228 21 9 21.4477 9 22C9 22.5523 8.55228 23 8 23H3.5C2.94772 23 2.5 22.5523 2.5 22V12C2.5 10.2751 3.99829 9 5.6625 9H26.3375C28.0017 9 29.5 10.2751 29.5 12V22C29.5 22.5523 29.0523 23 28.5 23H24C23.4477 23 23 22.5523 23 22C23 21.4477 23.4477 21 24 21H27.5V12C27.5 11.5249 27.0483 11 26.3375 11H5.6625Z"
                fill={color}
            />
            <path
                d="M23.5 16C24.3284 16 25 15.3284 25 14.5C25 13.6716 24.3284 13 23.5 13C22.6716 13 22 13.6716 22 14.5C22 15.3284 22.6716 16 23.5 16Z"
                fill={color}
            />
        </svg>
    )
}

export default PrinterIcon
