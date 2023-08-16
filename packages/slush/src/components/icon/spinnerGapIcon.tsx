import { IconProps } from './type'

const SpinnerGapIcon = ({ size, color = '#19171C' }: IconProps) => {
    return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M16 3C16.5523 3 17 3.44772 17 4V8C17 8.55228 16.5523 9 16 9C15.4477 9 15 8.55228 15 8V4C15 3.44772 15.4477 3 16 3Z"
                fill={color}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M23 16C23 15.4477 23.4477 15 24 15H28C28.5523 15 29 15.4477 29 16C29 16.5523 28.5523 17 28 17H24C23.4477 17 23 16.5523 23 16Z"
                fill={color}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M20.9555 20.9555C21.346 20.565 21.9792 20.565 22.3697 20.9555L25.1947 23.7805C25.5852 24.171 25.5852 24.8042 25.1947 25.1947C24.8042 25.5852 24.171 25.5852 23.7805 25.1947L20.9555 22.3697C20.565 21.9792 20.565 21.346 20.9555 20.9555Z"
                fill={color}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M16 23C16.5523 23 17 23.4477 17 24V28C17 28.5523 16.5523 29 16 29C15.4477 29 15 28.5523 15 28V24C15 23.4477 15.4477 23 16 23Z"
                fill={color}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M11.0446 20.9555C11.4351 21.346 11.4351 21.9792 11.0446 22.3697L8.21956 25.1947C7.82903 25.5852 7.19587 25.5852 6.80534 25.1947C6.41482 24.8042 6.41482 24.171 6.80534 23.7805L9.63034 20.9555C10.0209 20.565 10.654 20.565 11.0446 20.9555Z"
                fill={color}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M3 16C3 15.4477 3.44772 15 4 15H8C8.55228 15 9 15.4477 9 16C9 16.5523 8.55228 17 8 17H4C3.44772 17 3 16.5523 3 16Z"
                fill={color}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M6.80534 6.80559C7.19587 6.41506 7.82903 6.41506 8.21956 6.80559L11.0446 9.63059C11.4351 10.0211 11.4351 10.6543 11.0446 11.0448C10.654 11.4353 10.0209 11.4353 9.63034 11.0448L6.80534 8.2198C6.41482 7.82928 6.41482 7.19611 6.80534 6.80559Z"
                fill={color}
            />
        </svg>
    )
}

export default SpinnerGapIcon
