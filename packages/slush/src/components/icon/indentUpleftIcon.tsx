import { IconProps } from './type'

const IndentUpleftIcon = ({ size, color = '#19171C' }: IconProps) => {
    return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M5 10C5 9.44772 5.44772 9 6 9H24C24.5523 9 25 9.44772 25 10V24C25 24.5523 24.5523 25 24 25C23.4477 25 23 24.5523 23 24V11H6C5.44772 11 5 10.5523 5 10Z"
                fill={color}
            />
        </svg>
    )
}

export default IndentUpleftIcon
