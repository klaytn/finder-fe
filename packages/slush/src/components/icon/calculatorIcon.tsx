import { IconProps } from './type'

const CalculatorIcon = ({ size, color = '#19171C' }: IconProps) => {
    return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M9 8C9 7.44772 9.44772 7 10 7H22C22.5523 7 23 7.44772 23 8V14C23 14.5523 22.5523 15 22 15H10C9.44772 15 9 14.5523 9 14V8ZM11 9V13H21V9H11Z"
                fill={color}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M25 3C26.1046 3 27 3.89543 27 5V27C27 28.1046 26.1046 29 25 29H7C5.89543 29 5 28.1046 5 27V5C5 3.89543 5.89543 3 7 3L25 3ZM25 27V5L7 5V27H25Z"
                fill={color}
            />
            <path
                d="M11 20C11.8284 20 12.5 19.3284 12.5 18.5C12.5 17.6716 11.8284 17 11 17C10.1716 17 9.5 17.6716 9.5 18.5C9.5 19.3284 10.1716 20 11 20Z"
                fill={color}
            />
            <path
                d="M16 20C16.8284 20 17.5 19.3284 17.5 18.5C17.5 17.6716 16.8284 17 16 17C15.1716 17 14.5 17.6716 14.5 18.5C14.5 19.3284 15.1716 20 16 20Z"
                fill={color}
            />
            <path
                d="M21 20C21.8284 20 22.5 19.3284 22.5 18.5C22.5 17.6716 21.8284 17 21 17C20.1716 17 19.5 17.6716 19.5 18.5C19.5 19.3284 20.1716 20 21 20Z"
                fill={color}
            />
            <path
                d="M11 25C11.8284 25 12.5 24.3284 12.5 23.5C12.5 22.6716 11.8284 22 11 22C10.1716 22 9.5 22.6716 9.5 23.5C9.5 24.3284 10.1716 25 11 25Z"
                fill={color}
            />
            <path
                d="M16 25C16.8284 25 17.5 24.3284 17.5 23.5C17.5 22.6716 16.8284 22 16 22C15.1716 22 14.5 22.6716 14.5 23.5C14.5 24.3284 15.1716 25 16 25Z"
                fill={color}
            />
            <path
                d="M21 25C21.8284 25 22.5 24.3284 22.5 23.5C22.5 22.6716 21.8284 22 21 22C20.1716 22 19.5 22.6716 19.5 23.5C19.5 24.3284 20.1716 25 21 25Z"
                fill={color}
            />
        </svg>
    )
}

export default CalculatorIcon
