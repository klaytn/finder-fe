import { IconProps } from './type'

const ArrowcircleLeftIcon = ({ size, color = '#19171C' }: IconProps) => {
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
                d="M15.9446 11.0556C16.3351 11.4461 16.3351 12.0793 15.9446 12.4698L12.4142 16.0002L15.9446 19.5306C16.3351 19.9211 16.3351 20.5543 15.9446 20.9448C15.5541 21.3353 14.9209 21.3353 14.5304 20.9448L10.2929 16.7073C10.1054 16.5198 10 16.2654 10 16.0002C10 15.735 10.1054 15.4806 10.2929 15.2931L14.5304 11.0556C14.9209 10.6651 15.5541 10.6651 15.9446 11.0556Z"
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

export default ArrowcircleLeftIcon
