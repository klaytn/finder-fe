import { IconProps } from './type'

const MaccommandIcon = ({ size, color = '#19171C' }: IconProps) => {
    return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M22.5 7C21.837 7 21.2011 7.26339 20.7322 7.73223C20.2634 8.20107 20 8.83696 20 9.5V12H22.5C23.163 12 23.7989 11.7366 24.2678 11.2678C24.7366 10.7989 25 10.163 25 9.5C25 8.83696 24.7366 8.20107 24.2678 7.73223C23.7989 7.26339 23.163 7 22.5 7ZM22.5 5C23.6935 5 24.8381 5.47411 25.682 6.31802C26.5259 7.16193 27 8.30653 27 9.5C27 10.6935 26.5259 11.8381 25.682 12.682C24.8381 13.5259 23.6935 14 22.5 14H19C18.4477 14 18 13.5523 18 13V9.5C18 8.30653 18.4741 7.16193 19.318 6.31802C20.1619 5.47411 21.3065 5 22.5 5Z"
                fill={color}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M14 13C14 13.5523 13.5523 14 13 14H9.5C8.30653 14 7.16193 13.5259 6.31802 12.682C5.47411 11.8381 5 10.6935 5 9.5C5 8.30653 5.47411 7.16193 6.31802 6.31802C7.16193 5.47411 8.30653 5 9.5 5C10.6935 5 11.8381 5.47411 12.682 6.31802C13.5259 7.16193 14 8.30653 14 9.5V13ZM12 12V9.5C12 8.83696 11.7366 8.20107 11.2678 7.73223C10.7989 7.26339 10.163 7 9.5 7C8.83696 7 8.20107 7.26339 7.73223 7.73223C7.26339 8.20107 7 8.83696 7 9.5C7 10.163 7.26339 10.7989 7.73223 11.2678C8.20107 11.7366 8.83696 12 9.5 12H12Z"
                fill={color}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M18 19C18 18.4477 18.4477 18 19 18H22.5C23.6935 18 24.8381 18.4741 25.682 19.318C26.5259 20.1619 27 21.3065 27 22.5C27 23.6935 26.5259 24.8381 25.682 25.682C24.8381 26.5259 23.6935 27 22.5 27C21.3065 27 20.1619 26.5259 19.318 25.682C18.4741 24.8381 18 23.6935 18 22.5V19ZM20 20V22.5C20 23.163 20.2634 23.7989 20.7322 24.2678C21.2011 24.7366 21.837 25 22.5 25C23.163 25 23.7989 24.7366 24.2678 24.2678C24.7366 23.7989 25 23.163 25 22.5C25 21.837 24.7366 21.2011 24.2678 20.7322C23.7989 20.2634 23.163 20 22.5 20H20Z"
                fill={color}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M9.5 25C10.163 25 10.7989 24.7366 11.2678 24.2678C11.7366 23.7989 12 23.163 12 22.5V20H9.5C8.83696 20 8.20107 20.2634 7.73223 20.7322C7.26339 21.2011 7 21.837 7 22.5C7 23.163 7.26339 23.7989 7.73223 24.2678C8.20107 24.7366 8.83696 25 9.5 25ZM9.5 27C8.30653 27 7.16193 26.5259 6.31802 25.682C5.47411 24.8381 5 23.6935 5 22.5C5 21.3065 5.47411 20.1619 6.31802 19.318C7.16193 18.4741 8.30653 18 9.5 18H13C13.5523 18 14 18.4477 14 19L14 22.5C14 23.6935 13.5259 24.8381 12.682 25.682C11.8381 26.5259 10.6935 27 9.5 27Z"
                fill={color}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12 13C12 12.4477 12.4477 12 13 12H19C19.5523 12 20 12.4477 20 13V19C20 19.5523 19.5523 20 19 20H13C12.4477 20 12 19.5523 12 19V13ZM14 14V18H18V14H14Z"
                fill={color}
            />
        </svg>
    )
}

export default MaccommandIcon
