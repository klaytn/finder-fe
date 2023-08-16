import { IconProps } from './type'

const BagIcon = ({ size, color = '#19171C' }: IconProps) => {
    return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M3 10C3 8.89543 3.89543 8 5 8H27C28.1046 8 29 8.89543 29 10V26C29 27.1046 28.1046 28 27 28H5C3.89543 28 3 27.1046 3 26V10ZM27 10H5V26H27V10Z"
                fill={color}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M16 5C14.9391 5 13.9217 5.42143 13.1716 6.17157C12.4214 6.92172 12 7.93913 12 9V13C12 13.5523 11.5523 14 11 14C10.4477 14 10 13.5523 10 13V9C10 7.4087 10.6321 5.88258 11.7574 4.75736C12.8826 3.63214 14.4087 3 16 3C17.5913 3 19.1174 3.63214 20.2426 4.75736C21.3679 5.88258 22 7.4087 22 9V13C22 13.5523 21.5523 14 21 14C20.4477 14 20 13.5523 20 13V9C20 7.93913 19.5786 6.92172 18.8284 6.17157C18.0783 5.42143 17.0609 5 16 5Z"
                fill={color}
            />
        </svg>
    )
}

export default BagIcon
