import { IconProps } from './type'

const CurrencyRubIcon = ({ size, color = '#19171C' }: IconProps) => {
    return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M6 22C6 21.4477 6.44772 21 7 21H18C18.5523 21 19 21.4477 19 22C19 22.5523 18.5523 23 18 23H7C6.44772 23 6 22.5523 6 22Z"
                fill={color}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M10 5C10 4.44772 10.4477 4 11 4H18.5C20.4891 4 22.3968 4.79018 23.8033 6.1967C25.2098 7.60322 26 9.51088 26 11.5C26 13.4891 25.2098 15.3968 23.8033 16.8033C22.3968 18.2098 20.4891 19 18.5 19H12V27C12 27.5523 11.5523 28 11 28C10.4477 28 10 27.5523 10 27V19H7C6.44772 19 6 18.5523 6 18C6 17.4477 6.44772 17 7 17H10V5ZM12 17H18.5C19.9587 17 21.3576 16.4205 22.3891 15.3891C23.4205 14.3576 24 12.9587 24 11.5C24 10.0413 23.4205 8.64236 22.3891 7.61091C21.3576 6.57946 19.9587 6 18.5 6H12V17Z"
                fill={color}
            />
        </svg>
    )
}

export default CurrencyRubIcon
