import { IconProps } from './type'

const ChevroncircleBottomOmIcon = ({ size, color = '#19171C' }: IconProps) => {
    return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M3 16C3 8.8203 8.8203 3 16 3C23.1797 3 29 8.8203 29 16C29 23.1797 23.1797 29 16 29C8.8203 29 3 23.1797 3 16ZM12.2433 13.831C11.8738 13.4205 11.2416 13.3873 10.831 13.7567C10.4205 14.1262 10.3873 14.7585 10.7567 15.169L15.2567 20.169C15.4464 20.3797 15.7165 20.5 16 20.5C16.2835 20.5 16.5537 20.3797 16.7433 20.169L21.2433 15.169C21.6128 14.7585 21.5795 14.1262 21.169 13.7567C20.7585 13.3873 20.1262 13.4205 19.7567 13.831L16 18.0052L12.2433 13.831Z"
                fill={color}
            />
        </svg>
    )
}

export default ChevroncircleBottomOmIcon
