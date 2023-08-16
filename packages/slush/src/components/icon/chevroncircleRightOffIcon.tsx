import { IconProps } from './type'

const ChevroncircleRightOffIcon = ({ size, color = '#19171C' }: IconProps) => {
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
                d="M13.7567 10.831C14.1262 10.4205 14.7585 10.3873 15.169 10.7567L20.169 15.2567C20.3797 15.4464 20.5 15.7165 20.5 16C20.5 16.2835 20.3797 16.5537 20.169 16.7433L15.169 21.2433C14.7585 21.6128 14.1262 21.5795 13.7567 21.169C13.3873 20.7585 13.4205 20.1262 13.831 19.7567L18.0052 16L13.831 12.2433C13.4205 11.8738 13.3873 11.2416 13.7567 10.831Z"
                fill={color}
            />
        </svg>
    )
}

export default ChevroncircleRightOffIcon
