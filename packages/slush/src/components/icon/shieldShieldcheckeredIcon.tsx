import { IconProps } from './type'

const ShieldShieldcheckeredIcon = ({ size, color = '#19171C' }: IconProps) => {
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
                d="M4.07495 16C4.07495 15.4477 4.52267 15 5.07495 15H26.9249C27.4772 15 27.9249 15.4477 27.9249 16C27.9249 16.5523 27.4772 17 26.9249 17H5.07495C4.52267 17 4.07495 16.5523 4.07495 16Z"
                fill={color}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M16 5C16.5523 5 17 5.44772 17 6V28.95C17 29.5023 16.5523 29.95 16 29.95C15.4477 29.95 15 29.5023 15 28.95V6C15 5.44772 15.4477 5 16 5Z"
                fill={color}
            />
        </svg>
    )
}

export default ShieldShieldcheckeredIcon
