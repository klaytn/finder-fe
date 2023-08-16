import { IconProps } from './type'

const ArrowcircleBottomIcon = ({ size, color = '#19171C' }: IconProps) => {
    return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M16 5C9.92487 5 5 9.92487 5 16C5 22.0751 9.92487 27 16 27C22.0751 27 27 22.0751 27 16C27 9.92487 22.0751 5 16 5ZM3 16C3 8.8203 8.8203 3 16 3C23.1797 3 29 8.8203 29 16C29 23.1797 23.1797 29 16 29C8.8203 29 3 23.1797 3 16Z"
                fill={color}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M11.0554 16.0556C11.4459 15.6651 12.0791 15.6651 12.4696 16.0556L16 19.586L19.5304 16.0556C19.9209 15.6651 20.5541 15.6651 20.9446 16.0556C21.3351 16.4461 21.3351 17.0793 20.9446 17.4698L16.7071 21.7073C16.3166 22.0978 15.6834 22.0978 15.2929 21.7073L11.0554 17.4698C10.6649 17.0793 10.6649 16.4461 11.0554 16.0556Z"
                fill={color}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M16 10C16.5523 10 17 10.4477 17 11V21C17 21.5523 16.5523 22 16 22C15.4477 22 15 21.5523 15 21V11C15 10.4477 15.4477 10 16 10Z"
                fill={color}
            />
        </svg>
    )
}

export default ArrowcircleBottomIcon
