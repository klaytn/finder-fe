import { IconProps } from './type'

const CrosshairNormalIcon = ({ size, color = '#19171C' }: IconProps) => {
    return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M16 6C10.4772 6 6 10.4772 6 16C6 21.5228 10.4772 26 16 26C21.5228 26 26 21.5228 26 16C26 10.4772 21.5228 6 16 6ZM4 16C4 9.37258 9.37258 4 16 4C22.6274 4 28 9.37258 28 16C28 22.6274 22.6274 28 16 28C9.37258 28 4 22.6274 4 16Z"
                fill={color}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M16 1.5C16.5523 1.5 17 1.94772 17 2.5V7.5C17 8.05228 16.5523 8.5 16 8.5C15.4477 8.5 15 8.05228 15 7.5V2.5C15 1.94772 15.4477 1.5 16 1.5Z"
                fill={color}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M1.5 16C1.5 15.4477 1.94772 15 2.5 15H7.5C8.05228 15 8.5 15.4477 8.5 16C8.5 16.5523 8.05228 17 7.5 17H2.5C1.94772 17 1.5 16.5523 1.5 16Z"
                fill={color}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M16 23.5C16.5523 23.5 17 23.9477 17 24.5V29.5C17 30.0523 16.5523 30.5 16 30.5C15.4477 30.5 15 30.0523 15 29.5V24.5C15 23.9477 15.4477 23.5 16 23.5Z"
                fill={color}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M23.5 16C23.5 15.4477 23.9477 15 24.5 15H29.5C30.0523 15 30.5 15.4477 30.5 16C30.5 16.5523 30.0523 17 29.5 17H24.5C23.9477 17 23.5 16.5523 23.5 16Z"
                fill={color}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M16 13C14.3431 13 13 14.3431 13 16C13 17.6569 14.3431 19 16 19C17.6569 19 19 17.6569 19 16C19 14.3431 17.6569 13 16 13ZM11 16C11 13.2386 13.2386 11 16 11C18.7614 11 21 13.2386 21 16C21 18.7614 18.7614 21 16 21C13.2386 21 11 18.7614 11 16Z"
                fill={color}
            />
        </svg>
    )
}

export default CrosshairNormalIcon
