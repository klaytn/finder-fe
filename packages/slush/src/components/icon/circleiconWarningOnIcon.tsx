import { IconProps } from './type'

const CircleiconWarningOnIcon = ({ size, color = '#19171C' }: IconProps) => {
    return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M3 16C3 8.8203 8.8203 3 16 3C23.1797 3 29 8.8203 29 16C29 23.1797 23.1797 29 16 29C8.8203 29 3 23.1797 3 16ZM16 9C16.5523 9 17 9.44771 17 10V17C17 17.5523 16.5523 18 16 18C15.4477 18 15 17.5523 15 17V10C15 9.44771 15.4477 9 16 9ZM17.5 21.5C17.5 22.3284 16.8284 23 16 23C15.1716 23 14.5 22.3284 14.5 21.5C14.5 20.6716 15.1716 20 16 20C16.8284 20 17.5 20.6716 17.5 21.5Z"
                fill={color}
            />
        </svg>
    )
}

export default CircleiconWarningOnIcon
