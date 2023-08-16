import { IconProps } from './type'

const ArrowtriangleLeftIcon = ({ size, color = '#19171C' }: IconProps) => {
    return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19 24L11 16L19 8" fill={color} />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M19.3827 7.07615C19.7564 7.23093 20 7.59557 20 8.00003V24C20 24.4045 19.7564 24.7691 19.3827 24.9239C19.009 25.0787 18.5789 24.9931 18.2929 24.7071L10.2929 16.7071C9.90237 16.3166 9.90237 15.6834 10.2929 15.2929L18.2929 7.29292C18.5789 7.00692 19.009 6.92137 19.3827 7.07615ZM12.4142 16L18 21.5858V10.4142L12.4142 16Z"
                fill={color}
            />
        </svg>
    )
}

export default ArrowtriangleLeftIcon
