import { IconProps } from './type'

const BracketSquareIcon = ({ size, color = '#19171C' }: IconProps) => {
    return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M4 5C4 4.44772 4.44772 4 5 4H10C10.5523 4 11 4.44772 11 5C11 5.55228 10.5523 6 10 6H6V26H10C10.5523 26 11 26.4477 11 27C11 27.5523 10.5523 28 10 28H5C4.44772 28 4 27.5523 4 27V5Z"
                fill={color}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M21 5C21 4.44772 21.4477 4 22 4H27C27.5523 4 28 4.44772 28 5V27C28 27.5523 27.5523 28 27 28H22C21.4477 28 21 27.5523 21 27C21 26.4477 21.4477 26 22 26H26V6H22C21.4477 6 21 5.55228 21 5Z"
                fill={color}
            />
        </svg>
    )
}

export default BracketSquareIcon
