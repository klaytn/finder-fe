import { IconProps } from './type'

const IndentDownleftIcon = ({ size, color = '#19171C' }: IconProps) => {
    return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M24 8C24.5523 8 25 8.44772 25 9V23C25 23.5523 24.5523 24 24 24H6C5.44772 24 5 23.5523 5 23C5 22.4477 5.44772 22 6 22H23V9C23 8.44772 23.4477 8 24 8Z"
                fill={color}
            />
        </svg>
    )
}

export default IndentDownleftIcon
