import { IconProps } from './type'

const ControllercircleSkipbackIcon = ({ size, color = '#19171C' }: IconProps) => {
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
                d="M19.9719 11.1183C20.297 11.2923 20.5 11.6312 20.5 12V20C20.5 20.3688 20.297 20.7077 19.9719 20.8817C19.6467 21.0557 19.2522 21.0366 18.9453 20.8321L12.9453 16.8321C12.6671 16.6466 12.5 16.3344 12.5 16C12.5 15.6656 12.6671 15.3534 12.9453 15.168L18.9453 11.168C19.2522 10.9634 19.6467 10.9443 19.9719 11.1183ZM15.3028 16L18.5 18.1315V13.8685L15.3028 16Z"
                fill={color}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12.5 11C13.0523 11 13.5 11.4477 13.5 12V20C13.5 20.5523 13.0523 21 12.5 21C11.9477 21 11.5 20.5523 11.5 20V12C11.5 11.4477 11.9477 11 12.5 11Z"
                fill={color}
            />
        </svg>
    )
}

export default ControllercircleSkipbackIcon
