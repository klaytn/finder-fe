import { IconProps } from './type'

const IndentUprightIcon = ({ size, color = '#19171C' }: IconProps) => {
    return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M7 10C7 9.44772 7.44772 9 8 9H26C26.5523 9 27 9.44772 27 10C27 10.5523 26.5523 11 26 11H9V24C9 24.5523 8.55228 25 8 25C7.44772 25 7 24.5523 7 24V10Z"
                fill={color}
            />
        </svg>
    )
}

export default IndentUprightIcon
