import { IconProps } from './type'

const MoreOutlineIcon = ({ size, color = '#19171C' }: IconProps) => {
    return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M16 14C14.8954 14 14 14.8954 14 16C14 17.1046 14.8954 18 16 18C17.1046 18 18 17.1046 18 16C18 14.8954 17.1046 14 16 14ZM12 16C12 13.7909 13.7909 12 16 12C18.2091 12 20 13.7909 20 16C20 18.2091 18.2091 20 16 20C13.7909 20 12 18.2091 12 16Z"
                fill={color}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M6 14C4.89543 14 4 14.8954 4 16C4 17.1046 4.89543 18 6 18C7.10457 18 8 17.1046 8 16C8 14.8954 7.10457 14 6 14ZM2 16C2 13.7909 3.79086 12 6 12C8.20914 12 10 13.7909 10 16C10 18.2091 8.20914 20 6 20C3.79086 20 2 18.2091 2 16Z"
                fill={color}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M26 14C24.8954 14 24 14.8954 24 16C24 17.1046 24.8954 18 26 18C27.1046 18 28 17.1046 28 16C28 14.8954 27.1046 14 26 14ZM22 16C22 13.7909 23.7909 12 26 12C28.2091 12 30 13.7909 30 16C30 18.2091 28.2091 20 26 20C23.7909 20 22 18.2091 22 16Z"
                fill={color}
            />
        </svg>
    )
}

export default MoreOutlineIcon
