import { IconProps } from './type'

const ArrowtriangleRightIcon = ({ size, color = '#19171C' }: IconProps) => {
    return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M13 8L21 16L13 24" fill={color} />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12.6173 7.07615C12.991 6.92137 13.4211 7.00692 13.7071 7.29292L21.7071 15.2929C22.0976 15.6834 22.0976 16.3166 21.7071 16.7071L13.7071 24.7071C13.4211 24.9931 12.991 25.0787 12.6173 24.9239C12.2436 24.7691 12 24.4045 12 24V8.00003C12 7.59557 12.2436 7.23093 12.6173 7.07615ZM14 10.4142V21.5858L19.5858 16L14 10.4142Z"
                fill={color}
            />
        </svg>
    )
}

export default ArrowtriangleRightIcon
