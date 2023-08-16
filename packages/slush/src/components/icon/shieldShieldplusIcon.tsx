import { IconProps } from './type'

const ShieldShieldplusIcon = ({ size, color = '#19171C' }: IconProps) => {
    return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M4.58579 5.58579C4.96086 5.21071 5.46957 5 6 5H26C26.5304 5 27.0391 5.21071 27.4142 5.58579C27.7893 5.96086 28 6.46957 28 7V14.3375C28 25.5235 18.5029 29.2256 16.6406 29.8447C16.2264 29.9931 15.7736 29.9931 15.3594 29.8447C13.4971 29.2256 4 25.5235 4 14.3375V7C4 6.46957 4.21071 5.96086 4.58579 5.58579ZM26 7L6 7L6 14.3375C6 24.1201 14.2747 27.3787 16 27.9501C17.7253 27.3787 26 24.1201 26 14.3375V7Z"
                fill={color}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M11 16C11 15.4477 11.4477 15 12 15H20C20.5523 15 21 15.4477 21 16C21 16.5523 20.5523 17 20 17H12C11.4477 17 11 16.5523 11 16Z"
                fill={color}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M16 11C16.5523 11 17 11.4477 17 12V20C17 20.5523 16.5523 21 16 21C15.4477 21 15 20.5523 15 20V12C15 11.4477 15.4477 11 16 11Z"
                fill={color}
            />
        </svg>
    )
}

export default ShieldShieldplusIcon
