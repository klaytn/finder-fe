import { IconProps } from './type'

const Dice2Icon = ({ size, color = '#19171C' }: IconProps) => {
    return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M8 6C6.89543 6 6 6.89543 6 8V24C6 25.1046 6.89543 26 8 26H24C25.1046 26 26 25.1046 26 24V8C26 6.89543 25.1046 6 24 6H8ZM4 8C4 5.79086 5.79086 4 8 4H24C26.2091 4 28 5.79086 28 8V24C28 26.2091 26.2091 28 24 28H8C5.79086 28 4 26.2091 4 24V8Z"
                fill={color}
            />
            <path
                d="M13.5 15C14.3284 15 15 14.3284 15 13.5C15 12.6716 14.3284 12 13.5 12C12.6716 12 12 12.6716 12 13.5C12 14.3284 12.6716 15 13.5 15Z"
                fill={color}
            />
            <path
                d="M18.5 20C19.3284 20 20 19.3284 20 18.5C20 17.6716 19.3284 17 18.5 17C17.6716 17 17 17.6716 17 18.5C17 19.3284 17.6716 20 18.5 20Z"
                fill={color}
            />
        </svg>
    )
}

export default Dice2Icon
