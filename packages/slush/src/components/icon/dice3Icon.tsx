import { IconProps } from './type'

const Dice3Icon = ({ size, color = '#19171C' }: IconProps) => {
    return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M8 6C6.89543 6 6 6.89543 6 8V24C6 25.1046 6.89543 26 8 26H24C25.1046 26 26 25.1046 26 24V8C26 6.89543 25.1046 6 24 6H8ZM4 8C4 5.79086 5.79086 4 8 4H24C26.2091 4 28 5.79086 28 8V24C28 26.2091 26.2091 28 24 28H8C5.79086 28 4 26.2091 4 24V8Z"
                fill={color}
            />
            <path
                d="M11.5 13C12.3284 13 13 12.3284 13 11.5C13 10.6716 12.3284 10 11.5 10C10.6716 10 10 10.6716 10 11.5C10 12.3284 10.6716 13 11.5 13Z"
                fill={color}
            />
            <path
                d="M16 17.5C16.8284 17.5 17.5 16.8284 17.5 16C17.5 15.1716 16.8284 14.5 16 14.5C15.1716 14.5 14.5 15.1716 14.5 16C14.5 16.8284 15.1716 17.5 16 17.5Z"
                fill={color}
            />
            <path
                d="M20.5 22C21.3284 22 22 21.3284 22 20.5C22 19.6716 21.3284 19 20.5 19C19.6716 19 19 19.6716 19 20.5C19 21.3284 19.6716 22 20.5 22Z"
                fill={color}
            />
        </svg>
    )
}

export default Dice3Icon
