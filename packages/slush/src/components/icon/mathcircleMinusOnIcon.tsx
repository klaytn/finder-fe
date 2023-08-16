import { IconProps } from './type'

const MathcircleMinusOnIcon = ({ size, color = '#19171C' }: IconProps) => {
    return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M3 16C3 8.8203 8.8203 3 16 3C23.1797 3 29 8.8203 29 16C29 23.1797 23.1797 29 16 29C8.8203 29 3 23.1797 3 16ZM11 15C10.4477 15 10 15.4477 10 16C10 16.5523 10.4477 17 11 17H21C21.5523 17 22 16.5523 22 16C22 15.4477 21.5523 15 21 15H11Z"
                fill={color}
            />
        </svg>
    )
}

export default MathcircleMinusOnIcon
