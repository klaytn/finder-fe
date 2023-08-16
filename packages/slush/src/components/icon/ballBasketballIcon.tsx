import { IconProps } from './type'

const BallBasketballIcon = ({ size, color = '#19171C' }: IconProps) => {
    return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M16 5C9.92487 5 5 9.92487 5 16C5 22.0751 9.92487 27 16 27C22.0751 27 27 22.0751 27 16C27 9.92487 22.0751 5 16 5ZM3 16C3 8.8203 8.8203 3 16 3C23.1797 3 29 8.8203 29 16C29 23.1797 23.1797 29 16 29C8.8203 29 3 23.1797 3 16Z"
                fill={color}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M6.79382 6.81687C7.18485 6.42686 7.81801 6.42769 8.20803 6.81872C10.6387 9.25573 12.0026 12.558 12 15.9999C12.0026 19.4419 10.6387 22.7441 8.20803 25.1811C7.81801 25.5721 7.18485 25.5729 6.79382 25.1829C6.40278 24.7929 6.40196 24.1598 6.79197 23.7687C8.84849 21.7068 10.0023 18.9129 10 16.0007V15.9991C10.0023 13.0869 8.84849 10.293 6.79197 8.23109C6.40196 7.84005 6.40278 7.20689 6.79382 6.81687ZM12 15.9999C12 16.0002 12 16.0004 12 16.0007L11 15.9999L12 15.9991C12 15.9994 12 15.9996 12 15.9999Z"
                fill={color}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M25.2055 6.81621C25.5969 7.20585 25.5983 7.83902 25.2087 8.23042C23.1541 10.2942 22.0007 13.0878 22.0007 15.9999C22.0007 18.912 23.1541 21.7056 25.2087 23.7694C25.5983 24.1608 25.5969 24.794 25.2055 25.1836C24.8141 25.5732 24.1809 25.5718 23.7913 25.1804C21.3636 22.7418 20.0007 19.4409 20.0007 15.9999C20.0007 12.5589 21.3636 9.258 23.7913 6.81939C24.1809 6.42799 24.8141 6.42656 25.2055 6.81621Z"
                fill={color}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M3 16C3 15.4477 3.44772 15 4 15H28C28.5523 15 29 15.4477 29 16C29 16.5523 28.5523 17 28 17H4C3.44772 17 3 16.5523 3 16Z"
                fill={color}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M16 3C16.5523 3 17 3.44772 17 4V28C17 28.5523 16.5523 29 16 29C15.4477 29 15 28.5523 15 28V4C15 3.44772 15.4477 3 16 3Z"
                fill={color}
            />
        </svg>
    )
}

export default BallBasketballIcon
