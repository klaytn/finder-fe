import { IconProps } from './type'

const CurrencyKztIcon = ({ size, color = '#19171C' }: IconProps) => {
    return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M6 12C6 11.4477 6.44772 11 7 11H25C25.5523 11 26 11.4477 26 12C26 12.5523 25.5523 13 25 13H7C6.44772 13 6 12.5523 6 12Z"
                fill={color}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M6 7C6 6.44772 6.44772 6 7 6H25C25.5523 6 26 6.44772 26 7C26 7.55228 25.5523 8 25 8H7C6.44772 8 6 7.55228 6 7Z"
                fill={color}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M16 11C16.5523 11 17 11.4477 17 12V27C17 27.5523 16.5523 28 16 28C15.4477 28 15 27.5523 15 27V12C15 11.4477 15.4477 11 16 11Z"
                fill={color}
            />
        </svg>
    )
}

export default CurrencyKztIcon
