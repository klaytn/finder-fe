import { IconProps } from './type'

const ControllercirclePlayIcon = ({ size, color = '#19171C' }: IconProps) => {
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
                d="M13.5281 11.1183C13.8533 10.9443 14.2478 10.9634 14.5547 11.168L20.5547 15.168C20.8329 15.3534 21 15.6656 21 16C21 16.3344 20.8329 16.6466 20.5547 16.8321L14.5547 20.8321C14.2478 21.0366 13.8533 21.0557 13.5281 20.8817C13.203 20.7077 13 20.3688 13 20V12C13 11.6312 13.203 11.2923 13.5281 11.1183ZM15 13.8685V18.1315L18.1972 16L15 13.8685Z"
                fill={color}
            />
        </svg>
    )
}

export default ControllercirclePlayIcon
