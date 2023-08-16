import { IconProps } from './type'

const ShoppingbagIcon = ({ size, color = '#19171C' }: IconProps) => {
    return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M3 7C3 5.89543 3.89543 5 5 5H27C28.1046 5 29 5.89543 29 7V25C29 26.1046 28.1046 27 27 27H5C3.89543 27 3 26.1046 3 25V7ZM27 7H5V25H27V7Z"
                fill={color}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M11 10C11.5523 10 12 10.4477 12 11C12 12.0609 12.4214 13.0783 13.1716 13.8284C13.9217 14.5786 14.9391 15 16 15C17.0609 15 18.0783 14.5786 18.8284 13.8284C19.5786 13.0783 20 12.0609 20 11C20 10.4477 20.4477 10 21 10C21.5523 10 22 10.4477 22 11C22 12.5913 21.3679 14.1174 20.2426 15.2426C19.1174 16.3679 17.5913 17 16 17C14.4087 17 12.8826 16.3679 11.7574 15.2426C10.6321 14.1174 10 12.5913 10 11C10 10.4477 10.4477 10 11 10Z"
                fill={color}
            />
        </svg>
    )
}

export default ShoppingbagIcon
