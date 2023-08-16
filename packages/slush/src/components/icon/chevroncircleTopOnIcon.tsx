import { IconProps } from './type'

const ChevroncircleTopOmIcon = ({ size, color = '#19171C' }: IconProps) => {
    return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M3 16C3 8.8203 8.8203 3 16 3C23.1797 3 29 8.8203 29 16C29 23.1797 23.1797 29 16 29C8.8203 29 3 23.1797 3 16ZM16.7433 12.331C16.5537 12.1203 16.2835 12 16 12C15.7165 12 15.4464 12.1203 15.2567 12.331L10.7567 17.331C10.3873 17.7415 10.4205 18.3738 10.831 18.7433C11.2416 19.1128 11.8738 19.0795 12.2433 18.669L16 14.4948L19.7567 18.669C20.1262 19.0795 20.7585 19.1128 21.169 18.7433C21.5795 18.3738 21.6128 17.7415 21.2433 17.331L16.7433 12.331Z"
                fill={color}
            />
        </svg>
    )
}

export default ChevroncircleTopOmIcon
