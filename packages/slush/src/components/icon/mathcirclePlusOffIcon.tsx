import { IconProps } from './type'

const MathcirclePlusOffIcon = ({ size, color = '#19171C' }: IconProps) => {
    return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M16 5C9.92487 5 5 9.92487 5 16C5 22.0751 9.92487 27 16 27C22.0751 27 27 22.0751 27 16C27 9.92487 22.0751 5 16 5ZM3 16C3 8.8203 8.8203 3 16 3C23.1797 3 29 8.8203 29 16C29 23.1797 23.1797 29 16 29C8.8203 29 3 23.1797 3 16Z"
                fill={color}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M10 16C10 15.4477 10.4477 15 11 15H21C21.5523 15 22 15.4477 22 16C22 16.5523 21.5523 17 21 17H11C10.4477 17 10 16.5523 10 16Z"
                fill={color}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M16 10C16.5523 10 17 10.4477 17 11V21C17 21.5523 16.5523 22 16 22C15.4477 22 15 21.5523 15 21V11C15 10.4477 15.4477 10 16 10Z"
                fill={color}
            />
        </svg>
    )
}

export default MathcirclePlusOffIcon
