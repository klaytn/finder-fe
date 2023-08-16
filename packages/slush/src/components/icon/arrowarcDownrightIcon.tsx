import { IconProps } from './type'

const ArrowarcDownrightIcon = ({ size, color = '#19171C' }: IconProps) => {
    return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M21.2929 12.2929C21.6834 11.9024 22.3166 11.9024 22.7071 12.2929L28.7071 18.2929C29.0976 18.6834 29.0976 19.3166 28.7071 19.7071L22.7071 25.7071C22.3166 26.0976 21.6834 26.0976 21.2929 25.7071C20.9024 25.3166 20.9024 24.6834 21.2929 24.2929L26.5858 19L21.2929 13.7071C20.9024 13.3166 20.9024 12.6834 21.2929 12.2929Z"
                fill={color}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M4 6C4.55228 6 5 6.44772 5 7C5 9.91738 6.15893 12.7153 8.22183 14.7782C10.2847 16.8411 13.0826 18 16 18H28C28.5523 18 29 18.4477 29 19C29 19.5523 28.5523 20 28 20H16C12.5522 20 9.24558 18.6304 6.80761 16.1924C4.36964 13.7544 3 10.4478 3 7C3 6.44772 3.44772 6 4 6Z"
                fill={color}
            />
        </svg>
    )
}

export default ArrowarcDownrightIcon
