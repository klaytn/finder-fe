import { IconProps } from './type'

const ArrowarcRightdownIcon = ({ size, color = '#19171C' }: IconProps) => {
    return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12.2929 21.2929C12.6834 20.9024 13.3166 20.9024 13.7071 21.2929L19 26.5858L24.2929 21.2929C24.6834 20.9024 25.3166 20.9024 25.7071 21.2929C26.0976 21.6834 26.0976 22.3166 25.7071 22.7071L19.7071 28.7071C19.3166 29.0976 18.6834 29.0976 18.2929 28.7071L12.2929 22.7071C11.9024 22.3166 11.9024 21.6834 12.2929 21.2929Z"
                fill={color}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M6 4C6 3.44772 6.44772 3 7 3C10.4478 3 13.7544 4.36964 16.1924 6.80761C18.6304 9.24558 20 12.5522 20 16V28C20 28.5523 19.5523 29 19 29C18.4477 29 18 28.5523 18 28V16C18 13.0826 16.8411 10.2847 14.7782 8.22183C12.7153 6.15893 9.91738 5 7 5C6.44772 5 6 4.55228 6 4Z"
                fill={color}
            />
        </svg>
    )
}

export default ArrowarcRightdownIcon
