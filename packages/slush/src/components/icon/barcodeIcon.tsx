import { IconProps } from './type'

const BarcodeIcon = ({ size, color = '#19171C' }: IconProps) => {
    return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M22 6C22 5.44772 22.4477 5 23 5H28C28.5523 5 29 5.44772 29 6V11C29 11.5523 28.5523 12 28 12C27.4477 12 27 11.5523 27 11V7H23C22.4477 7 22 6.55228 22 6Z"
                fill={color}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M4 20C4.55228 20 5 20.4477 5 21V25H9C9.55228 25 10 25.4477 10 26C10 26.5523 9.55228 27 9 27H4C3.44772 27 3 26.5523 3 26V21C3 20.4477 3.44772 20 4 20Z"
                fill={color}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M28 20C28.5523 20 29 20.4477 29 21V26C29 26.5523 28.5523 27 28 27H23C22.4477 27 22 26.5523 22 26C22 25.4477 22.4477 25 23 25H27V21C27 20.4477 27.4477 20 28 20Z"
                fill={color}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M3 6C3 5.44772 3.44772 5 4 5H9C9.55228 5 10 5.44772 10 6C10 6.55228 9.55228 7 9 7H5V11C5 11.5523 4.55228 12 4 12C3.44772 12 3 11.5523 3 11V6Z"
                fill={color}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M10 10C10.5523 10 11 10.4477 11 11V21C11 21.5523 10.5523 22 10 22C9.44772 22 9 21.5523 9 21V11C9 10.4477 9.44772 10 10 10Z"
                fill={color}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M22 10C22.5523 10 23 10.4477 23 11V21C23 21.5523 22.5523 22 22 22C21.4477 22 21 21.5523 21 21V11C21 10.4477 21.4477 10 22 10Z"
                fill={color}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M18 10C18.5523 10 19 10.4477 19 11V21C19 21.5523 18.5523 22 18 22C17.4477 22 17 21.5523 17 21V11C17 10.4477 17.4477 10 18 10Z"
                fill={color}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M14 10C14.5523 10 15 10.4477 15 11V21C15 21.5523 14.5523 22 14 22C13.4477 22 13 21.5523 13 21V11C13 10.4477 13.4477 10 14 10Z"
                fill={color}
            />
        </svg>
    )
}

export default BarcodeIcon
