import { IconProps } from './type'

const ArrowcircleUpleftIcon = ({ size, color = '#19171C' }: IconProps) => {
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
                d="M11.5 12.5C11.5 11.9477 11.9477 11.5 12.5 11.5H18.5C19.0523 11.5 19.5 11.9477 19.5 12.5C19.5 13.0523 19.0523 13.5 18.5 13.5H13.5V18.5C13.5 19.0523 13.0523 19.5 12.5 19.5C11.9477 19.5 11.5 19.0523 11.5 18.5V12.5Z"
                fill={color}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M11.7929 11.7929C12.1834 11.4024 12.8166 11.4024 13.2071 11.7929L20.2071 18.7929C20.5976 19.1834 20.5976 19.8166 20.2071 20.2071C19.8166 20.5976 19.1834 20.5976 18.7929 20.2071L11.7929 13.2071C11.4024 12.8166 11.4024 12.1834 11.7929 11.7929Z"
                fill={color}
            />
        </svg>
    )
}

export default ArrowcircleUpleftIcon
