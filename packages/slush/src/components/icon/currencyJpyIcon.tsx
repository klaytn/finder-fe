import { IconProps } from './type'

const CurrencyJpyIcon = ({ size, color = '#19171C' }: IconProps) => {
    return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M9 21C9 20.4477 9.44772 20 10 20H22C22.5523 20 23 20.4477 23 21C23 21.5523 22.5523 22 22 22H10C9.44772 22 9 21.5523 9 21Z"
                fill={color}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M9 17C9 16.4477 9.44772 16 10 16H22C22.5523 16 23 16.4477 23 17C23 17.5523 22.5523 18 22 18H10C9.44772 18 9 17.5523 9 17Z"
                fill={color}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M16 16C16.5523 16 17 16.4477 17 17V27C17 27.5523 16.5523 28 16 28C15.4477 28 15 27.5523 15 27V17C15 16.4477 15.4477 16 16 16Z"
                fill={color}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M6.36679 5.22607C6.79424 4.87635 7.42426 4.93935 7.77399 5.36679L16 15.4208L24.2261 5.36679C24.5758 4.93935 25.2058 4.87635 25.6333 5.22607C26.0607 5.5758 26.1237 6.20582 25.774 6.63327L16.774 17.6333C16.5841 17.8654 16.3 18 16 18C15.7001 18 15.416 17.8654 15.2261 17.6333L6.22607 6.63327C5.87635 6.20582 5.93935 5.5758 6.36679 5.22607Z"
                fill={color}
            />
        </svg>
    )
}

export default CurrencyJpyIcon
