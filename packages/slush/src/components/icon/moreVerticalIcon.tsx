import { IconProps } from './type'

const MoreVerticalIcon = ({ size, color = '#19171C' }: IconProps) => {
    return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M16 17.5C16.8284 17.5 17.5 16.8284 17.5 16C17.5 15.1716 16.8284 14.5 16 14.5C15.1716 14.5 14.5 15.1716 14.5 16C14.5 16.8284 15.1716 17.5 16 17.5Z"
                fill={color}
            />
            <path
                d="M16 9.5C16.8284 9.5 17.5 8.82843 17.5 8C17.5 7.17157 16.8284 6.5 16 6.5C15.1716 6.5 14.5 7.17157 14.5 8C14.5 8.82843 15.1716 9.5 16 9.5Z"
                fill={color}
            />
            <path
                d="M16 25.5C16.8284 25.5 17.5 24.8284 17.5 24C17.5 23.1716 16.8284 22.5 16 22.5C15.1716 22.5 14.5 23.1716 14.5 24C14.5 24.8284 15.1716 25.5 16 25.5Z"
                fill={color}
            />
        </svg>
    )
}

export default MoreVerticalIcon
