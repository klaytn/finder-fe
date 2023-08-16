import { IconProps } from './type'

const CurrencyCurrencyinrIcon = ({ size, color = '#19171C' }: IconProps) => {
    return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M8 10C8 9.44772 8.44772 9 9 9H25C25.5523 9 26 9.44772 26 10C26 10.5523 25.5523 11 25 11H9C8.44772 11 8 10.5523 8 10Z"
                fill={color}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M8 5C8 4.44772 8.44772 4 9 4H25C25.5523 4 26 4.44772 26 5C26 5.55228 25.5523 6 25 6H9C8.44772 6 8 5.55228 8 5Z"
                fill={color}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12.5 5C12.5 4.44772 12.9478 4 13.5 4C15.4892 4 17.3968 4.79018 18.8033 6.1967C20.2099 7.60322 21 9.51088 21 11.5C21 13.4891 20.2099 15.3968 18.8033 16.8033C17.3968 18.2098 15.4892 19 13.5 19H11.5866L20.6727 27.2601C21.0814 27.6316 21.1115 28.264 20.74 28.6727C20.3685 29.0813 19.736 29.1114 19.3274 28.7399L8.32737 18.7399C8.02167 18.462 7.91834 18.0247 8.06732 17.6394C8.21629 17.2541 8.5869 17 9.00004 17H13.5C14.9587 17 16.3577 16.4205 17.3891 15.3891C18.4206 14.3576 19 12.9587 19 11.5C19 10.0413 18.4206 8.64236 17.3891 7.61091C16.3577 6.57946 14.9587 6 13.5 6C12.9478 6 12.5 5.55228 12.5 5Z"
                fill={color}
            />
        </svg>
    )
}

export default CurrencyCurrencyinrIcon
