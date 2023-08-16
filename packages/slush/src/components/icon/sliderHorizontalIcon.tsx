import { IconProps } from './type'

const SliderHorizontalIcon = ({ size, color = '#19171C' }: IconProps) => {
    return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M4 21.5C4 20.9477 4.44772 20.5 5 20.5H18.5C19.0523 20.5 19.5 20.9477 19.5 21.5C19.5 22.0523 19.0523 22.5 18.5 22.5H5C4.44772 22.5 4 22.0523 4 21.5Z"
                fill={color}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M22.5 21.5C22.5 20.9477 22.9477 20.5 23.5 20.5H27C27.5523 20.5 28 20.9477 28 21.5C28 22.0523 27.5523 22.5 27 22.5H23.5C22.9477 22.5 22.5 22.0523 22.5 21.5Z"
                fill={color}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M21 20C20.1716 20 19.5 20.6716 19.5 21.5C19.5 22.3284 20.1716 23 21 23C21.8284 23 22.5 22.3284 22.5 21.5C22.5 20.6716 21.8284 20 21 20ZM17.5 21.5C17.5 19.567 19.067 18 21 18C22.933 18 24.5 19.567 24.5 21.5C24.5 23.433 22.933 25 21 25C19.067 25 17.5 23.433 17.5 21.5Z"
                fill={color}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M4 10.5C4 9.94772 4.44772 9.5 5 9.5H10.5C11.0523 9.5 11.5 9.94772 11.5 10.5C11.5 11.0523 11.0523 11.5 10.5 11.5H5C4.44772 11.5 4 11.0523 4 10.5Z"
                fill={color}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M14.5 10.5C14.5 9.94772 14.9477 9.5 15.5 9.5H27C27.5523 9.5 28 9.94772 28 10.5C28 11.0523 27.5523 11.5 27 11.5H15.5C14.9477 11.5 14.5 11.0523 14.5 10.5Z"
                fill={color}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M13 9C12.1716 9 11.5 9.67157 11.5 10.5C11.5 11.3284 12.1716 12 13 12C13.8284 12 14.5 11.3284 14.5 10.5C14.5 9.67157 13.8284 9 13 9ZM9.5 10.5C9.5 8.567 11.067 7 13 7C14.933 7 16.5 8.567 16.5 10.5C16.5 12.433 14.933 14 13 14C11.067 14 9.5 12.433 9.5 10.5Z"
                fill={color}
            />
        </svg>
    )
}

export default SliderHorizontalIcon
