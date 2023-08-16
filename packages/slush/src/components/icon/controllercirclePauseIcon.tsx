import { IconProps } from './type'

const ControllercirclePauseIcon = ({ size, color = '#19171C' }: IconProps) => {
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
                d="M13 11C13.5523 11 14 11.4477 14 12V20C14 20.5523 13.5523 21 13 21C12.4477 21 12 20.5523 12 20V12C12 11.4477 12.4477 11 13 11Z"
                fill={color}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M19 11C19.5523 11 20 11.4477 20 12V20C20 20.5523 19.5523 21 19 21C18.4477 21 18 20.5523 18 20V12C18 11.4477 18.4477 11 19 11Z"
                fill={color}
            />
        </svg>
    )
}

export default ControllercirclePauseIcon
