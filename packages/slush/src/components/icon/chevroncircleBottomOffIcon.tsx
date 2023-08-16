import { IconProps } from './type'

const ChevroncircleBottomOffIcon = ({ size, color = '#19171C' }: IconProps) => {
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
                d="M10.831 13.7567C11.2416 13.3873 11.8738 13.4205 12.2433 13.831L16 18.0052L19.7567 13.831C20.1262 13.4205 20.7585 13.3873 21.169 13.7567C21.5795 14.1262 21.6128 14.7585 21.2433 15.169L16.7433 20.169C16.5537 20.3797 16.2835 20.5 16 20.5C15.7165 20.5 15.4464 20.3797 15.2567 20.169L10.7567 15.169C10.3873 14.7585 10.4205 14.1262 10.831 13.7567Z"
                fill={color}
            />
        </svg>
    )
}

export default ChevroncircleBottomOffIcon
