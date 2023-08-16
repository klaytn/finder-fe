import { IconProps } from './type'

const ChevroncircleTopOffIcon = ({ size, color = '#19171C' }: IconProps) => {
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
                d="M16 12C16.2835 12 16.5537 12.1203 16.7433 12.331L21.2433 17.331C21.6128 17.7415 21.5795 18.3738 21.169 18.7433C20.7585 19.1128 20.1262 19.0795 19.7567 18.669L16 14.4948L12.2433 18.669C11.8738 19.0795 11.2416 19.1128 10.831 18.7433C10.4205 18.3738 10.3873 17.7415 10.7567 17.331L15.2567 12.331C15.4464 12.1203 15.7165 12 16 12Z"
                fill={color}
            />
        </svg>
    )
}

export default ChevroncircleTopOffIcon
