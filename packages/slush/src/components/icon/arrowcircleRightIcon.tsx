import { IconProps } from './type'

const ArrowcircleRightIcon = ({ size, color = '#19171C' }: IconProps) => {
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
                d="M16.0554 11.0556C16.4459 10.6651 17.0791 10.6651 17.4696 11.0556L21.7071 15.2931C22.0976 15.6836 22.0976 16.3168 21.7071 16.7073L17.4696 20.9448C17.0791 21.3353 16.4459 21.3353 16.0554 20.9448C15.6649 20.5543 15.6649 19.9211 16.0554 19.5306L19.5858 16.0002L16.0554 12.4698C15.6649 12.0793 15.6649 11.4461 16.0554 11.0556Z"
                fill={color}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M10 16C10 15.4477 10.4477 15 11 15H21C21.5523 15 22 15.4477 22 16C22 16.5523 21.5523 17 21 17H11C10.4477 17 10 16.5523 10 16Z"
                fill={color}
            />
        </svg>
    )
}

export default ArrowcircleRightIcon
