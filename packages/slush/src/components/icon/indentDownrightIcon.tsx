import { IconProps } from './type'

const IndentDownrightIcon = ({ size, color = '#19171C' }: IconProps) => {
    return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M8 8C8.55228 8 9 8.44772 9 9V22H26C26.5523 22 27 22.4477 27 23C27 23.5523 26.5523 24 26 24H8C7.44772 24 7 23.5523 7 23V9C7 8.44772 7.44772 8 8 8Z"
                fill={color}
            />
        </svg>
    )
}

export default IndentDownrightIcon
