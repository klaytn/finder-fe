import { IconProps } from './type'

const TimerIcon = ({ size, color = '#19171C' }: IconProps) => {
    return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M16 6C10.4772 6 6 10.4772 6 16C6 21.5228 10.4772 26 16 26C21.5228 26 26 21.5228 26 16C26 10.4772 21.5228 6 16 6ZM4 16C4 9.37258 9.37258 4 16 4C22.6274 4 28 9.37258 28 16C28 22.6274 22.6274 28 16 28C9.37258 28 4 22.6274 4 16Z"
                fill={color}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M21.6571 10.3429C22.0476 10.7335 22.0476 11.3666 21.6571 11.7572L16.7071 16.7072C16.3166 17.0977 15.6834 17.0977 15.2929 16.7072C14.9024 16.3166 14.9024 15.6835 15.2929 15.2929L20.2429 10.3429C20.6334 9.95242 21.2666 9.95242 21.6571 10.3429Z"
                fill={color}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12 1C12 0.447715 12.4477 0 13 0H19C19.5523 0 20 0.447715 20 1C20 1.55228 19.5523 2 19 2H13C12.4477 2 12 1.55228 12 1Z"
                fill={color}
            />
        </svg>
    )
}

export default TimerIcon
