import { IconProps } from './type'

const MathEqualsIcon = ({ size, color = '#19171C' }: IconProps) => {
    return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M4 20C4 19.4477 4.44772 19 5 19H27C27.5523 19 28 19.4477 28 20C28 20.5523 27.5523 21 27 21H5C4.44772 21 4 20.5523 4 20Z"
                fill={color}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M4 12C4 11.4477 4.44772 11 5 11H27C27.5523 11 28 11.4477 28 12C28 12.5523 27.5523 13 27 13H5C4.44772 13 4 12.5523 4 12Z"
                fill={color}
            />
        </svg>
    )
}

export default MathEqualsIcon
